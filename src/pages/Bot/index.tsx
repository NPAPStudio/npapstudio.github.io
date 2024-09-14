import { defaultGenerateBotModel, defaultModel, maxDisplayRounds, maxMemoryRounds } from '@/config/modelsConfig';

import { history, useParams } from '@umijs/max';
import { Button, Flex } from 'antd';
import React, { useEffect, useState } from 'react';
import styles from './index.less';
import Chat, { ChatType } from '@/components/Chat';
import BotForm from '@/components/Bot/BotForm';
import Bot from '@/services/gpt/Bot';
import { BotData } from '@/services/dataManager';

const BotPage: React.FC = () => {
  const { id : IdInSearchParams } = useParams();

  const getBotId = () => {
    if (IdInSearchParams !== undefined) {
      return parseInt(IdInSearchParams);
    } else {
      return undefined;
    }
  };  
  const [currentBot, setCurrentBot] = useState<number | undefined>(getBotId());
  const [botTitle, setBotTitle] = useState('Edit Bot');
  const [helperChat, setHelperChat] = useState<string>('');
  const model = defaultGenerateBotModel;


  const updateHelperChat = async () => { 
    const bot = new Bot(currentBot);
    const data = await bot.get();
    if (data.helperChatId) {
      setHelperChat(data.helperChatId);
    }
  }
  useEffect(() => { 
    if (currentBot) { 
      updateHelperChat();
    }
  }, [currentBot]);

  useEffect(() => {
    setCurrentBot(getBotId());
  }, [IdInSearchParams]);

  const onFormUpdate = async (bot: Bot) => {
    if (bot.id) {
      const data = await bot.get();
      setBotTitle(data.title);
      if (helperChat && bot.helperChatId !== helperChat) {
        data.helperChatId = helperChat;
        await bot.update(data);
      }
      setCurrentBot(bot.id);
    }
  }
  const chatIdUpdate = async (chatId: string) => {
    setHelperChat(chatId);
    if (currentBot) {
      const bot = new Bot(currentBot);
      const data = await bot.get();
      if (helperChat && bot.helperChatId !== helperChat) {
        data.helperChatId = helperChat;
        await bot.update(data);
      }
    }
  }

  const handleHelperChatMsg = async (msg: string) => {
    const regex = /```json\s*([\s\S]*?)\s*```/;
    const match = msg.match(regex);

    if (match) {
      const jsonString = match[1];
      try {
        const json = JSON.parse(jsonString);
        if (json) {
          if (currentBot) {
            const bot = new Bot(currentBot);
            const data = await bot.get();
            data.systemPrompt = json.prompt;
            data.title = json.title;
            const botData = await bot.update(data);
            setCurrentBot(botData.id);
          } else {
            const data: BotData = {
              title: json.title,
              createdAt: new Date(),
              model: defaultModel,
              systemPrompt: json.prompt,
              frequency_penalty: 0,
              presence_penalty: 0,
              temperature: 1,
              top_p: 1,
              stop: [],
              maxDisplayRounds: maxDisplayRounds,
              maxMemoryRounds: maxMemoryRounds
            };
            const bot = new Bot();
            const botData = await bot.create(data);
            setCurrentBot(botData.id);
          }
        }
      } catch (error) {
        console.error("Invalid JSON format:", error);
      }
    } else {
      console.log("No JSON found.");
    }
  }

  return (
    <div className={styles.mainContainter}>
      <Flex justify="space-between" className={styles.pageTitle}>
        <h2>{currentBot ? botTitle : 'New Bot'}</h2>
        {currentBot ? (
          <Button
            type="primary"
            onClick={() => {
              history.push('/?bot=' + currentBot);
            }}
          >
            New Chat
          </Button>
        ) : (
          ''
        )}
      </Flex>
      <Flex className={styles.mainContent}>
        <div className={styles.GenerateBotChat}>
          <Chat model={model} chat={helperChat} bot={currentBot} type={ChatType.GenerateBot} chatIdUpdate={chatIdUpdate} messageHandler={handleHelperChatMsg} />
        </div>
        <Flex
          className={styles.GenerateBotForm}
        >
          <BotForm botId={currentBot} onUpdate={onFormUpdate} />
        </Flex>

      </Flex>
    </div>
  );
};

export default BotPage;
