import { MessageData } from '@/services/dataManager';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Flex } from 'antd';
import { useEffect } from 'react';
import MarkdownContent from '../MarkdownContent';
import styles from './component.less';

export default function MessageList({ messages }: { messages: MessageData[] }) {
  useEffect(() => {
    const mainMsgList = document.querySelector(`.${styles.mainMsgList}`);
    if (mainMsgList) {
      mainMsgList.scrollTop = mainMsgList.scrollHeight;
    }
  }, [messages]);
  return (
    <div className={styles.mainMsgList}>
      {messages.map((msg, index) => (
        <Flex
          gap="middle"
          justify={msg.isUser ? 'end' : 'start'}
          align="start"
          key={index}
          className={styles.chatItem}
        >
          {msg.isUser ? '' : <Avatar size={36} icon={<UserOutlined />} />}
          <span
            className={`${styles.chatContent} ${
              msg.isUser ? styles.userContent : styles.assistantContent
            }`}
          >
            <MarkdownContent content={msg.content} />
          </span>
        </Flex>
      ))}
    </div>
  );
}
