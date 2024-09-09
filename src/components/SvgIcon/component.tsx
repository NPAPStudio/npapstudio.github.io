import Icon from '@ant-design/icons';
import type { GetProps } from 'antd';

type CustomIconComponentProps = GetProps<typeof Icon>;
const TerminalSvg = () => (
  <svg viewBox="0 0 1024 1024" width="1em" height="1em" fill="currentColor">
    <path d="M89.6 806.4h844.8V217.6H89.6v588.8zM0 128h1024v768H0V128z m242.816 577.536L192 654.72l154.304-154.368L192 346.048l50.816-50.816L448 500.352l-205.184 205.184z m584.32 13.248H512V640h315.072v78.72z"></path>
  </svg>
);

const TerminalIcon = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={TerminalSvg} {...props} />
);

const SvgIcon = {
  TerminalIcon,
};
// Export the HeartIcon and PandaIcon components
export { TerminalIcon };
export default SvgIcon;
