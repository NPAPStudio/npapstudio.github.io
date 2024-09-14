import { defaultModel, maxDisplayRounds, maxMemoryRounds } from '@/config/modelsConfig';
import { BotData, db } from '../dataManager';
class Bot {
  id?: number;
  title?: string;
  createdAt?: Date;
  systemPrompt?: string;
  model?: string;
  helperChatId?: string;
  frequency_penalty?: number;
  presence_penalty?: number;
  max_tokens?: number;
  temperature?: number;
  top_p?: number;
  stop?: string[];
  maxDisplayRounds?: number;
  maxMemoryRounds?: number;
  constructor(id?: any) {
    if (id) {
      this.id = parseInt(id);
    } else {
      this.title = '';
      this.createdAt = new Date();
      this.systemPrompt = '';
      this.model = defaultModel;
      this.frequency_penalty = 0;
      this.presence_penalty = 0;
      this.temperature = 1;
      this.top_p = 1;
      this.stop = [];
      this.maxDisplayRounds = maxDisplayRounds;
      this.maxMemoryRounds = maxMemoryRounds;
    }
  }

  setId(id: any) {
    this.id = parseInt(id);
  }
  async create(data: BotData) {
    const id: IDBValidKey = await db.addData('Bots', data);
    this.id = id as number;
    const historyData = { ...data, botId: this.id, updateAt: new Date() };
    await db.addData('BotHistories', historyData);
    return await this.get();
  }
  async update(data: BotData) {
    if (!this.id) {
      throw new Error('Bot id is required');
    }
    await db.updateData('Bots', { ...data, id: this.id });
    const historyData = { ...data, botId: this.id, updateAt: new Date() };
    await db.addData('BotHistories', historyData);
    return await this.get();
  }

  async delete() {
    if (!this.id) {
      throw new Error('Bot id is required');
    }
    await db.deleteData('Bots', this.id);
    await db.deleteDataByIndex('BotHistories', 'botId', this.id);
  }

  async get() {
    if (!this.id) {
      throw new Error('Bot id is required');
    }
    const botData = await db.getData('Bots', this.id);
    this.title = botData?.title || '';
    this.createdAt = botData?.createdAt || new Date();
    this.systemPrompt = botData?.systemPrompt || '';
    this.model = botData?.model || defaultModel;
    this.frequency_penalty = botData?.frequency_penalty || 0;
    this.presence_penalty = botData?.presence_penalty || 0;
    this.temperature = botData?.temperature || 1;
    this.top_p = botData?.top_p || 1;
    this.stop = botData?.stop || [];
    this.maxDisplayRounds = botData?.maxDisplayRounds || maxDisplayRounds;
    this.maxMemoryRounds = botData?.maxMemoryRounds || maxMemoryRounds;
    return botData;
  }

  async getHistory(id: number) {
    return await db.getDataByIndex('BotHistories', 'botId', id);
  }

  static async getAll() {
    return await db.getAllData('Bots');
  }
}

export default Bot;
