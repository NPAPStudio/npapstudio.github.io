import Chat from '@/components/Chat';
import { defaultModel } from '@/config/modelsConfig';

const HomePage: React.FC = () => {
  const model = defaultModel;
  return <Chat model={model} />;
};

export default HomePage;
