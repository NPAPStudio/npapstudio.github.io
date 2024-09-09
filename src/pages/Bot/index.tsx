import { modelOptions } from '@/config/modelsConfig';
import Bot from '@/services/gpt/Bot';
import {
  ProFormGroup,
  ProFormInstance,
  ProFormSelect,
  ProFormSlider,
} from '@ant-design/pro-components';
import {
  ProForm,
  ProFormDigit,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-form';
import { history, useParams } from '@umijs/max';
import { Button, Flex } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import styles from './index.less';

const BotPage: React.FC = () => {
  const { id: botId } = useParams(); // 获取 botId
  const [bot, setBot] = useState<Bot>(new Bot(botId));
  const [readonly, setReadonly] = useState(false);
  const [botTitle, setBotTitle] = useState('Edit Bot');
  const formRef = useRef<ProFormInstance>();

  const handleSubmit = async (values: any) => {
    console.log('values', values);
    if (botId) {
      await bot.update(values);
      setReadonly(true);
    } else {
      await bot.create(values);
      history.push('/bot/' + bot.id);
    }
  };
  const updateFormData = async () => {
    if (bot.id) {
      const data = await bot.get();
      setBotTitle(data.title);
      formRef.current?.setFieldsValue(data);
    }
  };
  useEffect(() => {
    if (botId) {
      setReadonly(true);
    }
    setBot(new Bot(botId));
  }, [botId]);
  useEffect(() => {
    updateFormData();
  }, [bot]);
  return (
    <div className={styles.homePage}>
      <Flex justify="space-between">
        <h2>{botId ? botTitle : 'New Bot'}</h2>
        {botId ? (
          <Button
            type="primary"
            onClick={() => {
              history.push('/?bot=' + botId);
            }}
          >
            New Chat
          </Button>
        ) : (
          ''
        )}
      </Flex>
      <ProForm
        onFinish={handleSubmit}
        formRef={formRef}
        submitter={{
          render: (_, dom) => {
            if (readonly) {
              return (
                <Button
                  type="primary"
                  onClick={() => {
                    setReadonly(false);
                  }}
                >
                  Edit
                </Button>
              );
            }
            return dom;
          },
          searchConfig: {
            submitText: 'Save',
          },
        }}
        readonly={readonly}
        layout="vertical"
        grid={true}
        initialValues={bot}
        request={async () => {
          const data = await bot.get();
          setBotTitle(data.title);
          return data;
        }}
        rowProps={{
          gutter: [16, 0],
        }}
      >
        <ProFormText
          name="title"
          label="Title"
          width={'md'}
          colProps={{ md: 12 }}
        />
        <ProFormSelect
          name="model"
          label="Model"
          width={'md'}
          colProps={{ md: 24 }}
          request={async () => {
            return modelOptions.map((model) => {
              return {
                value: model.key,
                label: model.label,
              };
            });
          }}
          rules={[{ required: true, message: '请选择一个模型' }]}
        />
        <ProFormTextArea name="systemPrompt" label="System Prompt" />
        <ProFormGroup size={36} colProps={{ md: 12 }}>
          <ProFormSlider
            name="temperature"
            label="Temperature"
            colProps={{ md: 18 }}
            min={0}
            max={2}
            step={0.01}
            marks={{
              0: '0',
              2: '2',
            }}
          />
          <ProFormDigit
            name="temperature"
            label=" "
            min={0}
            colProps={{ md: 4 }}
            max={2}
          />
        </ProFormGroup>
        <ProFormGroup size={36} colProps={{ md: 12 }}>
          <ProFormSlider
            name="frequency_penalty"
            label="Frequency Penalty"
            width={'md'}
            min={-2.0}
            max={2.0}
            colProps={{ md: 18 }}
            step={0.01}
            marks={{
              '-2.0': '-2.0',
              2.0: '2.0',
            }}
          />
          <ProFormDigit
            name="frequency_penalty"
            label=" "
            min={-2.0}
            colProps={{ md: 4 }}
            max={2.0}
          />
        </ProFormGroup>
        <ProFormGroup size={36} colProps={{ md: 12 }}>
          <ProFormSlider
            name="presence_penalty"
            label="Presence Penalty"
            width={'md'}
            min={-2.0}
            max={2.0}
            step={0.01}
            colProps={{ md: 18 }}
            marks={{
              '-2.0': '-2.0',
              2.0: '2.0',
            }}
          />
          <ProFormDigit
            name="presence_penalty"
            label=" "
            min={-2.0}
            colProps={{ md: 4 }}
            max={2.0}
          />
        </ProFormGroup>
        <ProFormGroup size={36} colProps={{ md: 12 }}>
          <ProFormSlider
            name="top_p"
            label="Top P"
            width={'md'}
            min={0}
            max={1}
            step={0.01}
            colProps={{ md: 18 }}
            marks={{
              0: '0',
              1: '1',
            }}
          />
          <ProFormDigit
            name="top_p"
            label=" "
            min={0}
            colProps={{ md: 4 }}
            max={1}
          />
        </ProFormGroup>

        <ProFormDigit
          name="max_tokens"
          label="Max Tokens"
          width={'xs'}
          colProps={{ md: 12 }}
        />
        <ProFormText
          name="stop"
          label="Stop"
          width={'md'}
          colProps={{ md: 12 }}
        />
      </ProForm>
    </div>
  );
};

export default BotPage;
