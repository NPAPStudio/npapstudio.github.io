import { MessageData } from '@/services/dataManager';
import { DeleteOutlined, EllipsisOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Dropdown, Flex, Menu, MenuProps } from 'antd';
import { useEffect } from 'react';
import MarkdownContent from '../MarkdownContent';
import styles from './component.less';

export default function MessageList({ messages, handleMsgAction }: { messages: MessageData[], handleMsgAction?: (action: string, msgId: number | undefined) => void }) {

  const handleAction = (action: string, msgId: number | undefined) => {
    console.log(action, msgId);
    if (handleMsgAction) {
      handleMsgAction(action, msgId);
    }
  }
  const moreActionItems: MenuProps['items'] = [
    {
      icon: < DeleteOutlined />,
      key: 'delete',
      danger: true,
      label: 'Delete',
    },
  ];
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
          {msg.isUser ? '' : <Avatar size={36} icon={<UserOutlined />} className={styles.avatar} />}
          <span
            className={`${styles.chatContent} ${msg.isUser ? styles.userContent : styles.assistantContent
              }`}
          >
            {
              typeof (msg.content) === 'string' ?
                <MarkdownContent content={msg.content} /> :
                msg.content.map((content) => {
                  if (content.type === "text") {
                    return <MarkdownContent content={content.text} />
                  } else if (content.type === "image_url") { 
                    return <img src={ content.image_url.url} />
                  }
                })
            }

            <Dropdown
              menu={{
                selectable: false,
                onClick: (e) => {
                  handleAction(e.key, msg.id);
                },
                items: moreActionItems
              }}
              trigger={['hover']}
              className={styles.moreActionBtn}
            >
              <Button icon={<EllipsisOutlined />} size="small" type="text" />
            </Dropdown>
          </span>
        </Flex>
      ))}
    </div>
  );
}
