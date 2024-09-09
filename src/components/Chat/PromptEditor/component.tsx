import { Flex } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import styles from './component.less';

export default function PromptEditor({
  prompt,
  onPromptChange,
}: {
  prompt: string | undefined;
  onPromptChange: (prompt: string) => void;
}) {
  const handleChange = (e: { target: { value: string } }) => {
    onPromptChange(e.target.value);
  };

  return (
    <Flex className={styles.promptEditor} vertical>
      <h3>System Prompt</h3>
      <TextArea
        className={styles.systemPromotTextarea}
        value={prompt}
        onChange={handleChange}
      />
    </Flex>
  );
}
