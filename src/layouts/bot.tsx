import BotListItem from '@/components/Bot/BotListItem';
import MainMenuFooterRender from '@/components/MainMenuFooterRender/component';
import { BotData } from '@/services/dataManager';
import Bot from '@/services/gpt/Bot';
import { PlusOutlined } from '@ant-design/icons';
import { ProLayout } from '@ant-design/pro-components';
import { history } from '@umijs/max';
import { Button, Flex } from 'antd';
import React, { useEffect } from 'react';
import { Outlet } from 'umi';
import styles from './index.less';

export default () => {
  const [bots, setBots] = React.useState<BotData[]>([]);
  const initBots = async () => {
    const botsData = await Bot.getAll();
    setBots(botsData);
  };
  useEffect(() => {
    initBots();
  }, []);

  useEffect(() => {
    initBots();
  }, [location.pathname]);

  const handleDeleteBot = async (botId: number) => {
    const updatedBots = bots.filter((bot) => bot.id !== botId);
    setBots(updatedBots);
    if (location.pathname.match(botId.toString())) {
      history.push('/bot');
    }
  };
  const menuHeaderRender = () => {
    const createPage = () => {
      history.push('/bot');
    };
    return (
      <Flex
        className={styles.mainMenuHeader}
        gap="small"
        justify="space-between"
        style={{ width: '100%' }}
      >
        <Button
          icon={<PlusOutlined />}
          shape="circle"
          size="small"
          onClick={createPage}
        />
      </Flex>
    );
  };

  const menuDataRender = () => {
    return bots.map((bot) => {
      return {
        botId: bot.id,
        name: bot.title,
        path: '/bot/' + bot.id,
        key: '/bot/' + bot.id,
      };
    });
  };

  const menuItemRender = (item: any, dom: React.ReactNode) => {
    return <BotListItem item={item} onDelete={handleDeleteBot}></BotListItem>;
  };
  const menuFooterRender = () => {
    return MainMenuFooterRender({ page: 'bot' });
  };

  return (
    <ProLayout
      siderWidth={240}
      contentStyle={{ padding: 0, height: '100%',minHeight:'100%',display:'flex',flex:1 }}
      menuHeaderRender={menuHeaderRender}
      menuDataRender={menuDataRender}
      menuItemRender={menuItemRender}
      menuFooterRender={menuFooterRender}
      menuProps={{
        selectable: false,
      }}
      collapsedButtonRender={() => {
        return <div></div>;
      }}
    >
      <Outlet />
    </ProLayout>
  );
};
