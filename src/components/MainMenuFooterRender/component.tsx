import SettingModal from '@/components/SettingModal';
import {
  MessageOutlined,
  RobotOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { history } from '@umijs/max';
import { Menu, MenuProps } from 'antd';
import { useState } from 'react';
import styles from './component.less';

const MainMenuFooterRender = ({ page }: { page: string }) => {
  const openaiConfig = JSON.parse(
    localStorage.getItem('openai_config') || '{}',
  );
  const [isSettingModalOpen, setIsSettingModalOpen] = useState(
    openaiConfig.api_key ? false : true,
  );

  type MenuItem = Required<MenuProps>['items'][number];

  const items: MenuItem[] = [
    { key: 'setting', icon: <SettingOutlined />, label: 'Setting' },
  ];

  if (page === 'chat') {
    items.unshift({ key: 'bot', icon: <RobotOutlined />, label: 'Bots' });
  }
  if (page === 'bot') {
    items.unshift({ key: 'chat', icon: <MessageOutlined />, label: 'Chats' });
  }

  const handleFooterMenuClick = (item: MenuItem) => {
    if (item && item.key === 'setting') {
      setIsSettingModalOpen(true);
    } else {
      history.push(`/${item?.key}`);
    }
  };

  const handleSettingOk = () => {
    if (JSON.parse(localStorage.getItem('openai_config') || '{}').api_key) {
      setIsSettingModalOpen(false);
    }
  };

  const handleSettingCancel = () => {
    setIsSettingModalOpen(false);
  };

  return (
    <div className={styles.mainMenuFooter}>
      <Menu items={items} onClick={handleFooterMenuClick} selectable={false} />
      <SettingModal
        isSettingModalOpen={isSettingModalOpen}
        handleSettingOk={handleSettingOk}
        handleSettingCancel={handleSettingCancel}
      />
    </div>
  );
};

export default MainMenuFooterRender;
