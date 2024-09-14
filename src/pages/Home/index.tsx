import Chat, { ChatType } from '@/components/Chat';
import { defaultModel } from '@/config/modelsConfig';
import { history, useParams, useSearchParams } from '@umijs/max';
const HomePage: React.FC = () => {
  const model = defaultModel;
  const [searchParams] = useSearchParams();
  const botId = (() => { 
    let IdInSearchParams = searchParams.get('bot');
    if (IdInSearchParams !== null) {
      return parseInt(IdInSearchParams);
    } else { 
      return undefined;
    }
  })();

  const chatId = (() => {
      const { id: realChatId } = useParams(); // 获取 chatId
      return realChatId;
    }
  )();

  const chatIdUpdate = async (chatId: string) => {
    if (chatId) { 
      history.push(`/chat/${chatId}`);
    }

  };
  return <Chat chat={chatId} bot={ botId} model={model} type={ChatType.Chat} chatIdUpdate={chatIdUpdate} />;
};

export default HomePage;
