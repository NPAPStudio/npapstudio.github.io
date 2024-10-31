import IndexedDBService from './IndexedDBService';
// 定义数据类型

enum ChatType {
  Chat = "Chat",
  GenerateBot = "GenerateBot",
}

interface ChatData {
  id: string;
  title: string;
  createdAt: Date;
  systemPrompt: string;
  model: string;
  type: ChatType;
  botId?: number;
  maxDisplayRounds?: number;
  maxMemoryRounds?: number;
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
  maxDisplayRounds?: number;
  maxMemoryRounds?: number;
  helperChatId?: string;
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
  maxDisplayRounds?: number;
  maxMemoryRounds?: number;
}

// 定义文本内容部分
interface TextContentPart {
  type: 'text'; // 内容类型
  text: string; // 文本内容
}

// 定义图像内容部分
interface ImageContentPart {
  type: 'image_url'; // 内容类型
  image_url: {
    url: string; // 图像的 URL 或 base64 编码的图像数据
    detail?: string; // 细节描述，任选，默认为 auto
  };
}

// 定义音频内容部分
interface AudioContentPart {
  type: 'input_audio'; // 内容类型
  input_audio: {
    data: string; // base64 编码的音频数据
    format: 'wav' | 'mp3'; // 音频格式
  };
}

// 定义内容类型联合
type ContentPart = TextContentPart | ImageContentPart | AudioContentPart;

interface MessageData {
  id?: number;
  chatId: string;
  content: string | Array<ContentPart>;
  createdAt: Date;
  isUser: boolean;
}
// 初始化 IndexedDB 服务
const dbConfig = {
  dbName: 'GptPlayground',
  version: 6,
  stores: [
    {
      name: 'Chats',
      keyPath: 'id',
      options: { autoIncrement: false },
      defaultValues: { type: ChatType.Chat },
      indexes: [{ name: 'type', keyPath: 'type' }],

    },
    {
      name: 'Messages',
      keyPath: 'id',
      options: { autoIncrement: true },
      indexes: [{ name: 'chatId', keyPath: 'chatId' }],
    },
    {
      name: 'Bots',
      keyPath: 'id',
      options: { autoIncrement: true }
    },
    {
      name: 'BotHistories',
      keyPath: 'id',
      options: { autoIncrement: true },
      indexes: [{ name: 'botId', keyPath: 'botId' }],
    },
  ],
};

const db = new IndexedDBService<any>(dbConfig);

export { BotData, ChatType, BotHistoryData, ChatData, MessageData, ContentPart, db, dbConfig };
