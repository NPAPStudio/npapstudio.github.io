import {
  defaultModel,
  maxDisplayRounds,
  maxMemoryRounds,
} from '@/config/modelsConfig';
import { OPENAI } from '@/config/openaiConfig';
import { v4 as uuidv4 } from 'uuid';
import { ChatData, MessageData, db } from '../dataManager';

class Gpt extends EventTarget {
  id?: string;
  chat?: ChatData | null;
  botId?: number;
  messages: MessageData[] = [];

  constructor(id?: string) {
    super();
    if (id) {
      this.id = id;
    } else {
      this.id = uuidv4();
    }
  }

  setId(id: string) {
    this.id = id;
  }

  setBot(botId: number) {
    this.botId = botId;
  }

  async init(model?: string) {
    this.chat = await db.getData('Chats', this.id as string);
    if (this.chat === null) {
      this.chat = {
        id: this.id as string,
        title: '',
        createdAt: new Date(),
        systemPrompt: '',
        model: model || defaultModel,
      };
      if (this.botId) {
        this.chat.botId = this.botId;
        const bot = await db.getData('Bots', this.botId);
        if (bot) {
          this.chat.systemPrompt = bot.systemPrompt;
          this.chat.model = bot.model;
        }
      }
      await db.addData('Chats', this.chat);
    } else {
      this.messages = (
        (await db.getAllDataByIndex(
          'Messages',
          'chatId',
          this.id as string,
        )) as MessageData[]
      ).slice(-maxDisplayRounds * 2);
    }
  }

  async changeModel(model: string) {
    if (!this.chat) {
      throw new Error('Chat is not initialized');
    }
    this.chat.model = model;
    await db.updateData('Chats', this.chat);
  }

  async renameChat(newName: string) {
    if (!this.chat) {
      throw new Error('Chat is not initialized');
    }
    this.chat.title = newName;
    await db.updateData('Chats', this.chat);
  }

  async deleteChat() {
    if (!this.chat) {
      throw new Error('Chat is not initialized');
    }
    await db.deleteData('Chats', this.chat.id);
    await db.deleteDataByIndex('Messages', 'chatId', this.chat.id);
  }

  async sendMessage(message: string) {
    const openaiConfig = JSON.parse(
      localStorage.getItem('openai_config') || '{}',
    );
    if (!this.chat) {
      throw new Error('Chat is not initialized');
    }
    const data: MessageData = {
      chatId: this.chat.id,
      content: message,
      createdAt: new Date(),
      isUser: true,
    };
    this.messages.push(data);
    if (this.messages.length > maxMemoryRounds * 2) {
      this.messages.shift();
    }

    await db.addData('Messages', data);
    let messagesInReq = [
      {
        role: 'system',
        content: this.chat.systemPrompt,
      },
    ];

    this.messages.slice(-maxMemoryRounds * 2).forEach((msg) => {
      messagesInReq.push({
        role: msg.isUser ? 'user' : 'assistant',
        content: msg.content,
      });
    });

    const response = await fetch(
      `${openaiConfig.end_point}/v1/chat/completions`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${openaiConfig.api_key}`,
        },
        body: JSON.stringify({
          model: this.chat.model,
          messages: messagesInReq,
          stream: true,
        }),
      },
    );

    const reader = response.body?.getReader();
    const decoder = new TextDecoder('utf-8');
    let assistantMessageContent = '';

    while (true) {
      const { done, value } = await reader!.read();
      if (done) break;
      const chunk = decoder.decode(value, { stream: true });
      const lines = chunk.split('\n');
      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const data = line.slice(6);
          if (data === '[DONE]') break;
          const json = (() => {
            try {
              return JSON.parse(data);
            } catch (e) {
              return {};
            }
          })();
          const content = (() => {
            if (json?.choices) {
              return json?.choices[0]?.delta?.content;
            }
            return null;
          })();
          if (content) {
            assistantMessageContent += content;
            this.dispatchEvent(
              new CustomEvent('messageReceived', { detail: content }),
            );
          }
        }
      }
    }

    const assistantData: MessageData = {
      chatId: this.chat.id,
      content: assistantMessageContent,
      createdAt: new Date(),
      isUser: false,
    };
    this.messages.push(assistantData);
    if (this.messages.length > maxMemoryRounds * 2) {
      this.messages.shift();
    }
    await db.addData('Messages', assistantData);
  }

  async generateChatName() {
    const openaiConfig = JSON.parse(
      localStorage.getItem('openai_config') || '{}',
    );

    if (!this.chat) {
      throw new Error('Chat is not initialized');
    }
    let messagesInReq = [
      {
        role: 'system',
        content: OPENAI.titleGeneratorPrompt,
      },
    ];
    let allContent = `system: ${this.chat.systemPrompt}\n`;
    this.messages.forEach((msg) => {
      allContent += `${msg.isUser ? 'user' : 'assistant'}: ${msg.content}\n`;
    });
    messagesInReq.push({
      role: 'user',
      content: allContent,
    });

    const response = await fetch(
      `${openaiConfig.end_point}/v1/chat/completions`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${openaiConfig.api_key}`,
        },
        body: JSON.stringify({
          model: OPENAI.titleGeneratorModel,
          messages: messagesInReq,
          stream: false,
        }),
      },
    );
    const responseBody = await response.json();
    const title = responseBody.choices[0].message.content;
    this.chat.title = title;
    await db.updateData('Chats', this.chat);
    return title;
  }
  static async getChats() {
    try {
      return (await db.getAllData('Chats')) as ChatData[];
    } catch (error) {
      console.error('Error getting chats', error);
      return [];
    }
  }
}

export default Gpt;
