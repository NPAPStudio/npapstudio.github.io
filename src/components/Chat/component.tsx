import ChatSendBox from '@/components/Chat/ChatSendBox';
import ModelSwitcher from '@/components/Chat/ModelSwitcher';
import { TerminalIcon } from '@/components/SvgIcon';
import { ChatType, MessageData } from '@/services/dataManager';
import Bot from '@/services/gpt/Bot';
import Gpt from '@/services/gpt/Gpt';
import { useParams, useSearchParams } from '@umijs/max';
import { Layout } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { history } from 'umi';
import styles from './component.less';
import MessageList from './MessageList';
import PromptEditor from './PromptEditor';

const { Header, Footer, Sider, Content } = Layout;

const Chat: React.FC<{
  chat?: string,
  bot?: number,
  model: string,
  type: ChatType,
  chatIdUpdate: (chatId: string) => void,
  messageHandler?: (msg: string) => void
}> = ({ chat, bot, model, type, chatIdUpdate, messageHandler }) => {
  const [sending, setSending] = useState(false);
  const [currentModel, setModel] = useState<string>(model);
  const [messages, setMessages] = useState<MessageData[]>([]);
  const chatId = chat;
  // const chatId = (() => {
  //   if (type === ChatType.Chat) {
  //     const { id: realChatId } = useParams(); // 获取 chatId
  //     return realChatId;
  //   } else if (type === ChatType.GenerateBot) {
  //     const { id: realBotId } = useParams(); // 获取 botID
  //     if (realBotId) {
  //       return 'generate-bot-chat-' + realBotId;
  //     }
  //     return '';
  //   }
  // })();
  
  const [botId, setBotId] = useState(bot);
  const [currentBot, setCurrentBot] = useState<Bot>(new Bot(botId));
  const gptRef = useRef<Gpt>(new Gpt(chatId));
  const [gpt] = useState<Gpt>(gptRef.current);
  const [currentAssistantMessage, setCurrentAssistantMessage] =
    useState<MessageData | null>(null);

  const modelOnChange = (model: string) => {
    setModel(model);
    if (gpt.chat) {
      gpt.changeModel(model);
    }
  };

  const initBot = async () => {
    try {
      if (currentBot) {
        if (botId || gpt.chat?.botId) {
          currentBot.setId(botId || gpt.chat?.botId);
          const nowBot = await currentBot.get();
          setCurrentBot(nowBot);
        }
      }
    } catch (e) {
      setBotId(undefined);
      setCurrentBot(new Bot());
    }
  };

  const initChat = async () => {
    if (chatId) {
      gpt.setId(chatId);
      await gpt.init(type, currentModel);
      const messages = gpt.messages.map((msg) => msg);
      setModel(gpt.chat?.model as string);
      setMessages(messages);
      if (!gpt?.chat?.title) {
        await gpt.generateChatName();
      }
      if (gpt.chat?.botId) {
        setBotId(gpt.chat?.botId);
        initBot();
      } else {
        setBotId(undefined);
        setCurrentBot(new Bot());
      }
    }
  };

  useEffect(() => {
    initChat();
  }, [chatId]);

  useEffect(() => {
    initBot();
  }, [botId]);

  useEffect(() => {
    const handleMessageReceived = (event: CustomEvent) => {
      setCurrentAssistantMessage((prevMessage) => {
        const updatedMessage = prevMessage
          ? { ...prevMessage, content: prevMessage.content + event.detail }
          : {
              chatId: gpt.id as string,
              content: event.detail,
              createdAt: new Date(),
              isUser: false,
            };

        return updatedMessage;
      });
    };
    const handleMessageReceivedDone = (event : CustomEvent) => { 
      if (messageHandler) {
        messageHandler(event.detail);
      }
    }



    gpt.addEventListener(
      'messageReceived',
      handleMessageReceived as EventListener,
    );

    gpt.addEventListener(
      'messageReceivedDone',
      handleMessageReceivedDone as EventListener,
    );
    
    return () => {
      gpt.removeEventListener(
        'messageReceived',
        handleMessageReceived as EventListener,
      );

          gpt.addEventListener(
      'messageReceivedDone',
      handleMessageReceivedDone as EventListener,
    );
    };
  }, [gpt]);

  useEffect(() => {
    if (currentAssistantMessage) {
      setMessages((prevMessages) => {
        if (
          prevMessages.length > 0 &&
          !prevMessages[prevMessages.length - 1].isUser
        ) {
          return [
            ...prevMessages.slice(0, prevMessages.length - 1),
            currentAssistantMessage,
          ];
        } else {
          return [...prevMessages, currentAssistantMessage];
        }
      });
    }
  }, [currentAssistantMessage]);

  const sidebarTrigger = (
    <TerminalIcon className={styles.mainChatRightSidebarTrigger} />
  );

  const sendMsg = async (msg: string) => {
    if (sending) {
      return;
    }
    if (!msg) { 
      return;
    }
    setSending(true);
    let newChat = false;
    if (!gpt.chat) {
      if (botId) {
        gpt.setBot(botId);
      }
      await gpt.init(type,currentModel);
      newChat = true;
    }
    const userMsg: MessageData = {
      chatId: gpt.id as string,
      content: msg,
      createdAt: new Date(),
      isUser: true,
    };
    setMessages((prevMessages) => [...prevMessages, userMsg]);

    setCurrentAssistantMessage({
      chatId: gpt.id as string,
      content: '',
      createdAt: new Date(),
      isUser: false,
    });

    await gpt.sendMessage(msg);
    setSending(false);

    if (newChat && chatIdUpdate) {
      if (gpt.id) { 
        chatIdUpdate(gpt.id);
      }
    }
  };

  const handleMsgAction = async (action: string, msgId: number | undefined) => {
    if (action === 'delete') {
      if (msgId) {
        await gpt.deleteMessage(msgId);
        setMessages(gpt.messages.map((msg) => msg));
      }
    }
  }

  return (
    <Layout className={`${styles.chatLayout} ${styles[type]}`}>
      <Layout className={styles.mainChatLayout}>
        <Header className={styles.mainChatLayoutHeader}>
          {botId ? (
            <h2>{currentBot.title}</h2>
          ) : (
            <ModelSwitcher
              currentModel={currentModel}
              onChange={modelOnChange}
            />
          )}
        </Header>
        <Content className={styles.mainChatLayoutContent}>
          <MessageList messages={messages} handleMsgAction={handleMsgAction} />
        </Content>
        <Footer className={styles.mainChatLayoutFooter}>
          <ChatSendBox onSend={sendMsg} sending={sending} />
        </Footer>
      </Layout>
      <Sider
        style={{
          backgroundColor: 'rgba(0,0,0,0)',
          borderLeft: '1px solid #f0f0f0',
        }}
        collapsible={true}
        defaultCollapsed={true}
        reverseArrow={true}
        width={500}
        collapsedWidth={0}
        zeroWidthTriggerStyle={{
          width: 30,
          height: 30,
          borderRadius: 0,
          top: 0,
          left: -30,
          backgroundColor: 'rgba(0,0,0,0)',
        }}
        trigger={sidebarTrigger}
      >
        <PromptEditor
          prompt={gpt.chat?.systemPrompt || currentBot.systemPrompt}
          onPromptChange={() => {}}
        />
      </Sider>
    </Layout>
  );
};

export default Chat;
export { ChatType };