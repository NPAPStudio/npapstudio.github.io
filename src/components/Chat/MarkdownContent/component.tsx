import { CopyOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React from 'react';
import Markdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { solarizedDarkAtom } from 'react-syntax-highlighter/dist/esm/styles/prism';
import styles from './component.less';
interface MarkdownContentProps {
  content: string;
}

const CopyButton: React.FC<{ code: string }> = ({ code }) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(code).then(
      () => {},
      (err) => {
        console.error('Failed to copy code: ', err);
      },
    );
  };

  return (
    <Button
      icon={<CopyOutlined />}
      size="small"
      type="text"
      className={styles.copyButton}
      onClick={copyToClipboard}
    />
  );
};

const MarkdownContent: React.FC<MarkdownContentProps> = ({ content }) => {
  return (
    <Markdown
      components={{
        code(props) {
          const { children, className, ...rest } = props;
          const match = /language-(\w+)/.exec(className || '');
          const codeString = String(children).replace(/\n$/, '');

          return match ? (
            <div className={styles.codeWrapper}>
              <CopyButton code={codeString} />
              <SyntaxHighlighter
                {...rest}
                PreTag="div"
                language={match[1]}
                style={solarizedDarkAtom}
                wrapLines={true}
                ref={React.createRef()}
              >
                {codeString}
              </SyntaxHighlighter>
            </div>
          ) : (
            <code {...rest} className={className}>
              {children}
            </code>
          );
        },
      }}
    >
      {content}
    </Markdown>
  );
};

export default MarkdownContent;
