import ChatListItem from '@/components/Chat/ChatListItem';
import MainMenuFooterRender from '@/components/MainMenuFooterRender/component';
import { ChatData } from '@/services/dataManager';
import Gpt from '@/services/gpt/Gpt';
import { PlusOutlined } from '@ant-design/icons';
import { ProLayout } from '@ant-design/pro-components';
import { history } from '@umijs/max';
import { Button, Flex } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Outlet } from 'umi';
import styles from './index.less';
const groupAndSortChats = (chats: ChatData[]): Record<string, ChatData[]> => {
  const today = moment().startOf('day');
  const groups: Record<string, ChatData[]> = {
    今天: [],
    前几天: [],
    前30天: [],
    更早: [],
  };

  chats.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

  chats.forEach((chat) => {
    const chatDate = moment(chat.createdAt);
    if (chatDate.isSame(today, 'day')) {
      groups['今天'].push(chat);
    } else if (chatDate.isAfter(today.clone().subtract(7, 'days'))) {
      groups['前几天'].push(chat);
    } else if (chatDate.isAfter(today.clone().subtract(30, 'days'))) {
      groups['前30天'].push(chat);
    } else {
      groups['更早'].push(chat);
    }
  });

  return groups;
};

export default () => {
  const [groupedChats, setGroupedChats] = useState<Record<string, ChatData[]>>(
    {},
  );

  const initChats = async () => {
    const chats = await Gpt.getChats();
    const groupedChats = groupAndSortChats(chats);
    setGroupedChats(groupedChats);
  };

  useEffect(() => {
    initChats();
  }, []);

  const handleDeleteChat = async (chatId: string) => {
    const updatedChats = { ...groupedChats };

    Object.keys(updatedChats).forEach((group) => {
      updatedChats[group] = updatedChats[group].filter(
        (chat) => chat.id !== chatId,
      );
    });

    setGroupedChats(updatedChats);

    if (location.pathname.match(chatId)) {
      history.push('/');
    }
  };

  const menuHeaderRender = () => {
    const createPage = () => {
      //history.push(location.pathname.split('/').slice(0, 2).join('/'));
      history.push('/chat');
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
    const staticMenuItems: any[] = [];
    const dynamicMenuItems: any[] = [];

    Object.keys(groupedChats).forEach((group) => {
      dynamicMenuItems.push({
        name: group,
        path: '/group/' + group,
        disabled: true,
        type: 'group',
        className: styles.mainMenuGroup,
      });

      dynamicMenuItems.push(
        ...groupedChats[group].map((chat) => ({
          path: `/chat/${chat.id}`,
          name: chat.title || 'Untitled Chat',
          type: 'chat',
          key: chat.id,
        })),
      );
    });

    return [...staticMenuItems, ...dynamicMenuItems];
  };

  const menuItemRender = (item: any, dom: React.ReactNode) => {
    if (item.type === 'group') {
      return <div className={styles.mainMenuGroupTitle}>{item.name}</div>;
    }
    if (item.type === 'chat') {
      return (
        <ChatListItem item={item} onDelete={handleDeleteChat}></ChatListItem>
      );
    }
    return dom;
  };
  const menuFooterRender = () => {
    return MainMenuFooterRender({ page: 'chat' });
  };

  return (
    <ProLayout
      className={styles.mainLayout}
      siderWidth={240}
      contentStyle={{ padding: 0 }}
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
