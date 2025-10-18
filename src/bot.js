import { Bot } from 'grammy';
import { config } from 'dotenv';
import connectDB from './config/database.js';
import start from './commands/start.js';

config();

if (!process.env.BOT_TOKEN) {
  throw new Error('BOT_TOKEN is not set');
}

// اتصال به دیتابیس
connectDB();

const bot = new Bot(process.env.BOT_TOKEN);
bot.use(start);

export default bot;