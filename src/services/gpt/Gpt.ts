import {
  defaultGenerateBotModel,
  defaultModel,
  generateBotPrompt,
  maxDisplayRounds,
  maxMemoryRounds,
} from '@/config/modelsConfig';
import { OPENAI } from '@/config/openaiConfig';
import { v4 as uuidv4 } from 'uuid';
import { ChatData, ChatType, ContentPart, MessageData, db } from '../dataManager';

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

  async init(type?: ChatType, model?: string) {
    this.chat = await db.getData('Chats', this.id as string);
    if (this.chat === null || this.chat === undefined) {
      this.chat = {
        id: this.id as string,
        title: (type === ChatType.GenerateBot) ? 'Generate Bot' : '',
        createdAt: new Date(),
        systemPrompt: (type === ChatType.GenerateBot) ? generateBotPrompt : '',
        type: type || ChatType.Chat,
        model: (type === ChatType.GenerateBot) ? (model || defaultGenerateBotModel) : (model || defaultModel),
        maxDisplayRounds: (type === ChatType.GenerateBot) ? 100 : maxDisplayRounds,
        maxMemoryRounds: (type === ChatType.GenerateBot) ? 100 : maxMemoryRounds,
      };
      if (this.botId && this.chat.type === ChatType.Chat) {
        this.chat.botId = this.botId;
        const bot = await db.getData('Bots', this.botId);
        if (bot) {
          this.chat.systemPrompt = bot.systemPrompt;
          this.chat.model = bot.model;
          this.chat.maxDisplayRounds = bot.maxDisplayRounds;
          this.chat.maxMemoryRounds = bot.maxMemoryRounds;
        }
      }

      await db.addData('Chats', this.chat);
    } else {
      this.chat.maxDisplayRounds = this.chat?.maxDisplayRounds || maxDisplayRounds;
      this.chat.maxMemoryRounds = this.chat?.maxMemoryRounds || maxMemoryRounds;
      this.messages = (
        (await db.getAllDataByIndex(
          'Messages',
          'chatId',
          this.id as string,
        )) as MessageData[]
      ).slice(-this.chat.maxDisplayRounds * 2);
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

  async sendMessage(message: string | Array<ContentPart>) {
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
    const userMessageId = await db.addData('Messages', data);

    data.id = parseInt(userMessageId.toString());

    this.messages.push(data);
    if (this.messages.length > (this.chat?.maxMemoryRounds || maxMemoryRounds) * 2) {
      this.messages.shift();
    }

    this.dispatchEvent(
      new CustomEvent('userMessageId', { detail: userMessageId }),
    );

    let messagesInReq:Array<Object> = [
      {
        role: 'system',
        content: this.chat.systemPrompt,
      },
    ];

    this.messages.slice(-(this.chat?.maxMemoryRounds || maxMemoryRounds) * 2).forEach((msg) => {
      const data = {
        role: msg.isUser ? 'user' : 'assistant',
        content: msg.content,
      };
      messagesInReq.push(data);
    });

    const requestData = {
      "url": `${openaiConfig.end_point}/v1/chat/completions`,
      "method": "POST",
      "headers": {},
      body: JSON.stringify({
        model: this.chat.model,
        messages: messagesInReq,
        stream: true,
        stream_options: {
          include_usage : true
        }
      })
    };
    if (requestData.url.match('azure')) {
      requestData.url = openaiConfig.end_point;
      requestData.headers = {
        "Content-Type": "application/json",
        "api-key": openaiConfig.api_key
      };
    } else if (requestData.url.match('cloudsway')) {
      requestData.url = `${openaiConfig.end_point}/chat/completions`;
      requestData.headers = {
        "Content-Type": 'application/json',
        "Authorization": `Bearer ${openaiConfig.api_key}`,
      };
    } else {
      requestData.headers = {
        "Content-Type": 'application/json',
        "Authorization": `Bearer ${openaiConfig.api_key}`,
      };
    }

    const response = await fetch(
      requestData.url,
      {
        method: requestData.method,
        headers: requestData.headers,
        body: requestData.body,
      },
    );

    const reader = response.body?.getReader();
    const decoder = new TextDecoder('utf-8');
    let assistantMessageContent = '';

    while (true) {
      const { done, value } = await reader!.read();
      if (done) {
        break;
      }
      const chunk = decoder.decode(value, { stream: true });
      const lines = chunk.split('\n');
      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const data = line.slice(6);
          if (data === '[DONE]') {
            this.dispatchEvent(
              new CustomEvent('messageReceivedDone', { detail: assistantMessageContent }),
            );
            break;
          }
          const json = (() => {
            try {
              return JSON.parse(data);
            } catch (e) {
              return {};
            }
          })();
          const content = (() => {
            if (json?.usage) {
              this.dispatchEvent(
                new CustomEvent('usageReceived', { detail: json.usage }),
              );
            }
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
    let assistantMessageId = await db.addData('Messages', assistantData);

    assistantData.id = parseInt(assistantMessageId.toString());

    this.messages.push(assistantData);
    if (this.messages.length > (this.chat?.maxMemoryRounds || maxMemoryRounds) * 2) {
      this.messages.shift();
    }
    this.dispatchEvent(
      new CustomEvent('assistantMessageId', { detail: assistantMessageId }),
    );
  }

  async deleteMessage(messageId: number) {
    const message = this.messages.find((msg) => msg.id === messageId);
    if (!message) {
      return;
    }
    await db.deleteData('Messages', messageId);
    this.messages = this.messages.filter((msg) => msg.id !== messageId);
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

    const requestData = {
      "url": `${openaiConfig.end_point}/v1/chat/completions`,
      "method": "POST",
      "headers": {
      },
      body: JSON.stringify({
        model: OPENAI.titleGeneratorModel,
        messages: messagesInReq,
        stream: false,
      })
    };
    if (requestData.url.match('azure')) {
      requestData.url = openaiConfig.end_point;
      requestData.headers = {
        "Content-Type": "application/json",
        "api-key": openaiConfig.api_key
      };
    } else if (requestData.url.match('cloudsway')) { 
      requestData.url = `${openaiConfig.end_point}/chat/completions`;
      requestData.headers = {
        "Content-Type": 'application/json',
        "Authorization": `Bearer ${openaiConfig.api_key}`,
      };
    } else {
      requestData.headers = {
        "Content-Type": 'application/json',
        "Authorization": `Bearer ${openaiConfig.api_key}`,
      };
    }
    const response = await fetch(
      requestData.url,
      {
        method: requestData.method,
        headers: requestData.headers,
        body: requestData.body,
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
      return (await db.getAllDataByIndex('Chats', 'type', ChatType.Chat)) as ChatData[];
    } catch (error) {
      console.error('Error getting chats', error);
      return [];
    }
  }
}

export default Gpt;
