import { modelOptions } from '@/config/modelsConfig';
import Bot from '@/services/gpt/Bot';
import { ProForm, ProFormDigit, ProFormGroup, ProFormInstance, ProFormSelect, ProFormSlider, ProFormSwitch, ProFormText, ProFormTextArea } from '@ant-design/pro-components';
import { Button, Switch } from 'antd';
import { useEffect, useRef, useState } from 'react'
import { history } from '@umijs/max';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import styles from './component.less';

interface BotFormProps {
  botId?: number;
  onUpdate?: (bot: Bot) => void;
}

export default function BotForm({ botId, onUpdate }: BotFormProps) {
  const [bot, setBot] = useState<Bot>(new Bot(botId));
  const [readonly, setReadonly] = useState(false);
  const [showMoreOptions, setShowMoreOptions] = useState(false);

  const formRef = useRef<ProFormInstance>();


  const handleSubmit = async (values: any) => {
    if (botId) {
      await bot.update(values);
      //setReadonly(true);
      if (onUpdate) {
        onUpdate(bot);
      }
    } else {
      await bot.create(values);
      history.push('/bot/' + bot.id);
    }
  };
  const updateFormData = async () => {
    if (bot.id) {
      const data = await bot.get();
      formRef.current?.setFieldsValue(data);
      if (onUpdate) {
        onUpdate(bot);
      }
    }
  };

  useEffect(() => {
    if (botId) {
      //setReadonly(true);
    }
    setBot(new Bot(botId));
  }, [botId]);
  useEffect(() => {
    updateFormData();
  }, [bot]);

  return <ProForm
    className={ styles.botForm }
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
        return <div className={styles.formFooter}>
          {dom}

          <span className={styles.label}>More Options:</span>
          <Switch
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
            checked={showMoreOptions}
            onChange={(checked) => {
              setShowMoreOptions(checked);
            }}
          />
        </div>;
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
      return data;
    }}
    rowProps={{
      gutter: [16, 0],
    }}
  >
    <ProFormText
      name="title"
      label="Title"
      rules={[{ required: true }]}

    />
    <ProFormSelect
      name="model"
      label="Model"
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
    <ProFormTextArea
      name="systemPrompt"
      label="System Prompt"
      rules={[{ required: true}]}
      fieldProps={{
        autoSize: { minRows: showMoreOptions ? 4 : 16, maxRows: showMoreOptions ? 4 : 16 },
      }}
    />
    <ProFormGroup
      size={36}
      colProps={{ md: 12 }}
      style={{ display: showMoreOptions ? 'block' : 'none' }}
    >
      <ProFormSlider
        name="temperature"
        label="Temperature"
        layout='horizontal'
        colProps={{ md: 16 }}
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
        colProps={{ md: 6 }}
        max={2}
      />
    </ProFormGroup>
    <ProFormGroup
      size={36}
      colProps={{ md: 12 }}
      style={{ display: showMoreOptions ? 'block' : 'none' }}
    >
      <ProFormSlider
        name="frequency_penalty"
        label="Frequency Penalty"
        width={'md'}
        min={-2.0}
        max={2.0}
        colProps={{ md: 16 }}
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
        colProps={{ md: 6 }}
        max={2.0}
      />
    </ProFormGroup>
    <ProFormGroup
      size={36}
      colProps={{ md: 12 }}
      style={{ display: showMoreOptions ? 'block' : 'none' }}
    >
      <ProFormSlider
        name="presence_penalty"
        label="Presence Penalty"
        width={'md'}
        min={-2.0}
        max={2.0}
        step={0.01}
        colProps={{ md: 16 }}
        marks={{
          '-2.0': '-2.0',
          2.0: '2.0',
        }}
      />
      <ProFormDigit
        name="presence_penalty"
        label=" "
        min={-2.0}
        colProps={{ md: 6 }}
        max={2.0}
      />
    </ProFormGroup>
    <ProFormGroup
      size={36}
      colProps={{ md: 12 }}
      style={{ display: showMoreOptions ? 'block' : 'none' }}
    >
      <ProFormSlider
        name="top_p"
        label="Top P"
        width={'md'}
        min={0}
        max={1}
        step={0.01}
        colProps={{ md: 16 }}
        marks={{
          0: '0',
          1: '1',
        }}
      />
      <ProFormDigit
        name="top_p"
        label=" "
        min={0}
        colProps={{ md: 6 }}
        max={1}
      />
    </ProFormGroup>
    <ProFormGroup
      size={36}
      colProps={{ md: 12 }}
      style={{ display: showMoreOptions ? 'block' : 'none' }}
    >
      <ProFormDigit
        name="max_tokens"
        label="Max Tokens"
        width={'xs'}
        colProps={{ md: 12 }}
      />
    </ProFormGroup>

    <ProFormGroup
      size={36}
      colProps={{ md: 12 }}
      style={{ display: showMoreOptions ? 'block' : 'none' }}
    >
      <ProFormText
        name="stop"
        label="Stop"
        width={'md'}
        colProps={{ md: 24 }}
        style={{ display: showMoreOptions ? 'block' : 'none' }}
      />
    </ProFormGroup>

    <ProFormGroup
      size={36}
      colProps={{ md: 12 }}
      style={{ display: showMoreOptions ? 'block' : 'none' }}
    >
      <ProFormDigit
        name="maxDisplayRounds"
        label="Max Display Rounds"
        width={'xs'}
        colProps={{ md: 24 }}
      />
    </ProFormGroup>

    <ProFormGroup
      size={36}
      colProps={{ md: 12 }}
      style={{ display: showMoreOptions ? 'block' : 'none' }}
    >
      <ProFormDigit
        name="maxMemoryRounds"
        label="Max Memory Rounds"
        width={'xs'}
        colProps={{ md: 24 }}
      />
    </ProFormGroup>

  </ProForm>
}
