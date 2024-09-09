import { modelOptions } from '@/config/modelsConfig';
import { DownOutlined } from '@ant-design/icons';
import { Button, Dropdown } from 'antd';
import React, { useEffect, useState } from 'react';
import styles from './component.less';

interface ModelSwitcherProps {
  currentModel: string;
  onChange?: (model: string) => void;
}

const ModelSwitcher: React.FC<ModelSwitcherProps> = ({
  currentModel,
  onChange,
}) => {
  const [selectedLabel, setSelectedLabel] = useState('');

  useEffect(() => {
    const currentOption = modelOptions.find(
      (option) => option.key === currentModel,
    );
    if (currentOption) {
      setSelectedLabel(currentOption.label);
    }
  }, [currentModel]);

  const handleMenuClick = (e: any) => {
    const selectedKey = e.key;
    const selectedOption = modelOptions.find(
      (option) => option.key === selectedKey,
    );
    if (selectedOption) {
      setSelectedLabel(selectedOption.label);
      if (onChange) {
        onChange(selectedKey);
      }
    }
  };
  const menu = {
    onClick: handleMenuClick,
    items: modelOptions.map((model) => {
      return {
        key: model.key,
        label: model.label,
      };
    }),
  };

  return (
    <Dropdown menu={menu} className={styles.modelSwitcher}>
      <Button size="large" style={{ border: 'none' }}>
        {selectedLabel} <DownOutlined />
      </Button>
    </Dropdown>
  );
};

export default ModelSwitcher;
