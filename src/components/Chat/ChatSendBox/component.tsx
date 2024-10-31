import { CloseOutlined, MinusOutlined, PictureOutlined, SendOutlined } from '@ant-design/icons';
import { Button, Flex, Input, Upload, UploadProps } from 'antd';
import React, { useEffect, useState } from 'react';
import styles from './component.less';

const { TextArea } = Input;

export default function ChatSendBox({
  onSend,
  sending,
  onHeightChanged,
}: {
  onSend: (message: string, img?:string) => void;
  sending: boolean;
  onHeightChanged?: (height: number) => void;
}) {
  const [value, setValue] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [isComposing, setIsComposing] = useState(false); // 新增：用来判断是否正在使用输入法

  useEffect(() => {}, [sending]);

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);

    if (onHeightChanged) {
      onHeightChanged(e.target.scrollHeight);
    }
  };

  const handleTextareaSubmit = () => {
    if (sending) {
      return;
    }
    onSend(value,imgUrl);
    setValue('');
    setImgUrl('');
  };

  const handleTextareaKeyDown = (
    e: React.KeyboardEvent<HTMLTextAreaElement>,
  ) => {
    if (
      e.key === 'Enter' &&
      !isComposing &&
      !e.shiftKey &&
      !e.ctrlKey &&
      !e.altKey
    ) {
      e.preventDefault();
      handleTextareaSubmit();
    }
    if ((e.key === 'Enter' && e.altKey) || (e.key === 'Enter' && e.ctrlKey)) {
      setValue(value + '\n');
    }
  };

  // 新增：检测输入法的开始和结束
  const handleCompositionStart = () => {
    setIsComposing(true); // 正在使用输入法
  };

  const handleCompositionEnd = () => {
    setIsComposing(false); // 输入法输入结束
  };

  const removeImg = () => { 
    setImgUrl('');
  }
  const handleImageUpload = (info: any) => {
    if (info.file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64Url = e.target?.result;
        // 这里可以执行其他操作，比如设置状态或显示图片
        if (typeof(base64Url) === 'string') { 
          setImgUrl(base64Url);
        }

      };
      reader.readAsDataURL(info.file);
    };
  }

  return (
    <Flex style={{ width: '100%' }} justify="center" align="center">
      <Flex className={styles.sendBoxWrapper}>
        {!imgUrl ?
          '' :
          <div className={styles.uploadedImg}>
            <img src={imgUrl} />
            <Button
              className={styles.removeImg}
              type="default"
              icon={<CloseOutlined />}
              shape="circle"
              onClick={removeImg}
            />
          </div>}
        <Upload
          beforeUpload={() => false} // 禁用上传到服务器
          onChange={handleImageUpload}
          showUploadList={false} // 设置为 false，如果不想显示上传列表
        >
          <Button
            type="default"
            icon={<PictureOutlined />}
            shape="circle"
          />
        </Upload>

        <TextArea
          rows={1}
          placeholder="请输入内容"
          autoSize={{ minRows: 1, maxRows: 5 }}
          onChange={handleTextareaChange}
          onKeyDown={handleTextareaKeyDown}
          onCompositionStart={handleCompositionStart} // 监听输入法开始事件
          onCompositionEnd={handleCompositionEnd} // 监听输入法结束事件
          value={value}
        />
        <Button
          style={{ marginLeft: '10px' }}
          type="primary"
          icon={!sending ? <SendOutlined /> : <MinusOutlined />}
          shape="circle"
          onClick={handleTextareaSubmit}
        />
      </Flex>
    </Flex>
  );
}
