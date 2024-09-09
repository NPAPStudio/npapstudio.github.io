import Gpt from '@/services/gpt/Gpt';
import { EllipsisOutlined } from '@ant-design/icons';
import { Link } from '@umijs/max';
import { Button, Dropdown, Flex, Input, MenuProps } from 'antd';
import { useState } from 'react';

interface ChatListItemProps {
  item: { path: string; name: string; type: string; key: string }; // 必选
  onRename?: (oldName: string, newName: string) => void; // 可选
  onDelete?: (name: string) => void; // 可选
}

export default function ChatListItem({
  item,
  onRename,
  onDelete,
}: ChatListItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [newChatName, setNewChatName] = useState(item.name);
  const gpt = new Gpt(item.key);
  const handleRename = async () => {
    console.log(item.key, newChatName);
    await gpt.init();
    await gpt.renameChat(newChatName);

    if (onRename) {
      onRename(item.key, newChatName);
    }
    setIsEditing(false);
  };

  const handleDelete = async () => {
    await gpt.init();
    await gpt.deleteChat();

    if (onDelete) {
      onDelete(item.key);
    }
  };
  const actions: MenuProps['items'] = [
    {
      key: 'rename',
      label: <span onClick={() => setIsEditing(true)}>Rename</span>,
    },
    {
      key: 'delete',
      danger: true,
      label: <span onClick={() => handleDelete()}>Delete</span>,
    },
  ];

  return (
    <Flex
      gap="0"
      className="main-menu-item"
      justify="space-between"
      align="center"
      style={{ width: '100%' }}
    >
      <Link to={item.path} className="main-menu-link">
        {isEditing ? (
          <Input
            value={newChatName}
            onChange={(e) => setNewChatName(e.target.value)}
            onPressEnter={handleRename} // 用户按下回车键后调用重命名
            onBlur={handleRename} // 用户点击其他地方后调用重命名
          />
        ) : (
          <span>{newChatName}</span>
        )}
      </Link>
      {isEditing ? null : (
        <Dropdown
          menu={{ items: actions }}
          trigger={['click']}
          className="main-menu-action"
        >
          <Button icon={<EllipsisOutlined />} size="small" type="text" />
        </Dropdown>
      )}
    </Flex>
  );
}
