import IndexedDBService from './IndexedDBService';
// 定义数据类型
interface ChatData {
  id: string;
  title: string;
  createdAt: Date;
  systemPrompt: string;
  model: string;
  botId?: number;
}
interface BotData {
  id?: number;
  title: string;
  createdAt: Date;
  systemPrompt: string;
  model: string;
  frequency_penalty?: number;
  presence_penalty?: number;
  max_tokens?: number;
  temperature?: number;
  top_p?: number;
  stop?: string[];
}
interface BotHistoryData {
  id?: number;
  botId: number;
  title: string;
  createdAt: Date;
  updateAt: Date;
  systemPrompt: string;
  model: string;
  frequency_penalty?: number;
  presence_penalty?: number;
  max_tokens?: number;
  temperature?: number;
  top_p?: number;
  stop?: string[];
}
interface MessageData {
  id?: number;
  chatId: string;
  content: string;
  createdAt: Date;
  isUser: boolean;
}
// 初始化 IndexedDB 服务
const dbConfig = {
  dbName: 'GptPlayground',
  version: 4,
  stores: [
    { name: 'Chats', keyPath: 'id', options: { autoIncrement: false } },
    {
      name: 'Messages',
      keyPath: 'id',
      options: { autoIncrement: true },
      indexes: [{ name: 'chatId', keyPath: 'chatId' }],
    },
    { name: 'Bots', keyPath: 'id', options: { autoIncrement: true } },
    {
      name: 'BotHistories',
      keyPath: 'id',
      options: { autoIncrement: true },
      indexes: [{ name: 'botId', keyPath: 'botId' }],
    },
  ],
};

const db = new IndexedDBService<any>(dbConfig);

export { BotData, BotHistoryData, ChatData, MessageData, db, dbConfig };
