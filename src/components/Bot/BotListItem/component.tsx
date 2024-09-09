import Bot from '@/services/gpt/Bot';
import { EllipsisOutlined } from '@ant-design/icons';
import { Link } from '@umijs/max';
import { Button, Dropdown, Flex, MenuProps } from 'antd';

interface BotListItemProps {
  item: {
    path: string;
    name: string;
    type: string;
    key: string;
    botId: number;
  }; // 必选
  onRename?: (oldName: string, newName: string) => void; // 可选
  onDelete?: (botId: number) => void; // 可选
}

export default function BotListItem({ item, onDelete }: BotListItemProps) {
  const bot = new Bot(item.botId);
  const handleDelete = async () => {
    await bot.delete();
    if (onDelete) {
      onDelete(item.botId);
    }
  };
  const actions: MenuProps['items'] = [
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
        <span>{item.name}</span>
      </Link>
      <Dropdown
        menu={{ items: actions }}
        trigger={['click']}
        className="main-menu-action"
      >
        <Button icon={<EllipsisOutlined />} size="small" type="text" />
      </Dropdown>
    </Flex>
  );
}
