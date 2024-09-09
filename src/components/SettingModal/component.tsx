import LocalDataTransfer from '@/services/dataManager/dataTransfer';
import { InboxOutlined } from '@ant-design/icons';
import {
  Button,
  Form,
  FormProps,
  Input,
  Menu,
  MenuProps,
  Modal,
  Upload,
} from 'antd';
import React, { useEffect, useState } from 'react';
import styles from './component.less';

const { Dragger } = Upload;

interface SettingModalProps {
  isSettingModalOpen: boolean;
  handleSettingOk?: () => void;
  handleSettingCancel?: () => void;
}

type OpenaiConfigData = {
  api_key?: string;
  end_point?: string;
};

const SettingModal: React.FC<SettingModalProps> = ({
  isSettingModalOpen,
  handleSettingOk,
  handleSettingCancel,
}) => {
  type MenuItem = Required<MenuProps>['items'][number];

  const [selectedMenu, setSelectedMenu] = useState('token');
  const openaiConfig = JSON.parse(
    localStorage.getItem('openai_config') || '{}',
  );

  const [apiKey, setApiKey] = useState(openaiConfig?.api_key || '');
  const [endPoint, setEndPoint] = useState(openaiConfig?.end_point || '');

  useEffect(() => {
    let nowConfig = JSON.parse(localStorage.getItem('openai_config') || '{}');
    nowConfig.api_key = apiKey;
    nowConfig.end_point = endPoint || 'https://api.openai.com';
    localStorage.setItem('openai_config', JSON.stringify(nowConfig));
  }, [apiKey, endPoint]);

  const handleMenuClick = (e: any) => {
    setSelectedMenu(e.key);
  };

  const handleExport = async () => {
    const dataTransfer = new LocalDataTransfer();
    await dataTransfer.export();
  };

  const handleImport = async (file: any) => {
    const reader = new FileReader();
    reader.onload = async (event) => {
      const data = JSON.parse(event?.target?.result as string);
      const dataTransfer = new LocalDataTransfer();
      await dataTransfer.import(data);
      // 刷新页面
      window.location.reload();
    };
    reader.readAsText(file);
  };

  const onTokenUpdate: FormProps<OpenaiConfigData>['onFinish'] = (values) => {
    setApiKey(values.api_key);
    setEndPoint(values.end_point);
  };

  const renderContent = () => {
    if (selectedMenu === 'token') {
      return (
        <Form
          name="basic"
          labelCol={{ span: 18 }}
          wrapperCol={{ span: 18 }}
          initialValues={{ api_key: apiKey, end_point: endPoint }}
          onFinish={onTokenUpdate}
          autoComplete="off"
          layout="vertical"
        >
          <h2>API KEY Settings</h2>
          <br />
          <Form.Item<OpenaiConfigData>
            label="API KEY"
            name="api_key"
            rules={[{ required: true, message: '' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item<OpenaiConfigData>
            label="End Point"
            name="end_point"
            rules={[{ required: false, message: '' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 0, span: 24 }}>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </Form.Item>
        </Form>
      );
    }

    if (selectedMenu === 'import_export') {
      return (
        <div>
          <h2>Import & Export</h2>
          <br />
          <h3>Export</h3>
          <Button type="primary" onClick={handleExport}>
            Export
          </Button>
          <br />
          <br />
          <h3>Import</h3>
          <Dragger
            multiple={false}
            onChange={(info) => {
              if (info.file.status === 'done') {
                handleImport(info.file.originFileObj);
              }
            }}
          >
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Click or drag file to this area to upload
            </p>
          </Dragger>
        </div>
      );
    }
    return null; // fallback
  };

  const leftMenuItems: MenuItem[] = [
    {
      key: 'token',
      label: 'API KEY',
    },
    {
      key: 'import_export',
      label: 'Import & Export',
    },
  ];

  return (
    <Modal
      title=""
      open={isSettingModalOpen}
      onOk={handleSettingOk}
      onCancel={handleSettingCancel}
      footer={null}
      closeIcon={null}
      classNames={{ content: styles.settingModalContent }}
      width={'65%'} // Setting the modal width
    >
      <div style={{ display: 'flex', height: '60vh', padding: 0 }}>
        <Menu
          mode="inline"
          className={styles.settingModalMenu}
          selectedKeys={[selectedMenu]}
          onClick={handleMenuClick}
          items={leftMenuItems}
        />
        <div style={{ padding: '20px', flex: 1, overflowY: 'auto' }}>
          {renderContent()}
        </div>
      </div>
    </Modal>
  );
};

export default SettingModal;
