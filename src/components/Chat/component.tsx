import ChatSendBox from '@/components/Chat/ChatSendBox';
import ModelSwitcher from '@/components/Chat/ModelSwitcher';
import { TerminalIcon } from '@/components/SvgIcon';
import { MessageData } from '@/services/dataManager';
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

const Chat: React.FC<{ model: string }> = ({ model }) => {
  const [sending, setSending] = useState(false);
  const [currentModel, setModel] = useState<string>(model);
  const [messages, setMessages] = useState<MessageData[]>([]);
  const { id: chatId } = useParams(); // 获取 chatId
  const [searchParams] = useSearchParams();
  const [botId, setBotId] = useState(searchParams.get('bot'));
  const [bot, setBot] = useState<Bot>(new Bot(botId));
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
      if (bot) {
        if (botId || gpt.chat?.botId) {
          bot.setId(botId || gpt.chat?.botId);
          const nowBot = await bot.get();
          setBot(nowBot);
        }
      }
    } catch (e) {
      setBotId(null);
      setBot(new Bot());
    }
  };

  const initChat = async () => {
    if (chatId) {
      gpt.setId(chatId);
      await gpt.init(currentModel);
      const messages = gpt.messages.map((msg) => msg);
      setModel(gpt.chat?.model as string);
      setMessages(messages);
      if (!gpt?.chat?.title) {
        await gpt.generateChatName();
      }
      if (gpt.chat?.botId) {
        setBotId(gpt.chat?.botId.toString());
        initBot();
      } else {
        setBotId(null);
        setBot(new Bot());
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

    gpt.addEventListener(
      'messageReceived',
      handleMessageReceived as EventListener,
    );

    return () => {
      gpt.removeEventListener(
        'messageReceived',
        handleMessageReceived as EventListener,
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
    <TerminalIcon style={{ fontSize: '18px', color: '#999' }} />
  );

  const sendMsg = async (msg: string) => {
    if (sending) {
      return;
    }
    setSending(true);
    let newChat = false;
    if (!gpt.chat) {
      if (botId) {
        gpt.setBot(parseInt(botId));
      }
      await gpt.init(currentModel);
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
    if (newChat) {
      history.push(`/chat/${gpt.id}`);
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Layout className={styles.mainChatLayout}>
        <Header className={styles.mainChatLayoutHeader}>
          {botId ? (
            <h2>{bot.title}</h2>
          ) : (
            <ModelSwitcher
              currentModel={currentModel}
              onChange={modelOnChange}
            />
          )}
        </Header>
        <Content className={styles.mainChatLayoutContent}>
          <MessageList messages={messages} />
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
          prompt={gpt.chat?.systemPrompt || bot.systemPrompt}
          onPromptChange={() => {}}
        />
      </Sider>
    </Layout>
  );
};

export default Chat;
