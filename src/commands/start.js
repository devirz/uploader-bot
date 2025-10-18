import { Composer } from "grammy";
import User from "../models/User.js";

const start = new Composer();

start.command('start', async (ctx) => {
    try {
        const userId = ctx.from.id;
        const firstName = ctx.from.first_name || '';
        const lastName = ctx.from.last_name || '';
        const username = ctx.from.username || null;
        
        let user = await User.findByUserId(userId);
        
        if (!user) {
            user = new User({
                userId: userId,
                firstName: firstName,
                lastName: lastName,
                username: username
            });
            
            await user.save();
            console.log(`✅ New user registered: ${firstName} (${userId})`);
        } else {
            user.firstName = firstName;
            user.lastName = lastName;
            user.username = username;
            await user.save();
            console.log(`🔄 User info updated: ${firstName} (${userId})`);
        }
        
        const channelUsername = process.env.CHANNEL_USERNAME || '@your_channel_username';
        const channelId = process.env.CHANNEL_ID || '-1001234567890'; // Channel ID
        
        try {
            const member = await ctx.api.getChatMember(channelId, userId);
            
            if (member.status === 'left' || member.status === 'kicked') {
                await ctx.reply(
                    `👋 سلام ${firstName}!\n\n` +
                    `❌ شما باید ابتدا در چنل ما جوین شوید تا بتوانید از ربات استفاده کنید.\n\n` +
                    `📢 چنل ما: ${channelUsername}\n\n` +
                    `پس از جوین شدن، دوباره /start را ارسال کنید.`,
                    {
                        reply_markup: {
                            inline_keyboard: [
                                [
                                    {
                                        text: "📢 جوین شدن در چنل",
                                        url: `https://t.me/${channelUsername.replace('@', '')}`
                                    }
                                ],
                                [
                                    {
                                        text: "🔄 چک کردن مجدد",
                                        callback_data: "check_membership"
                                    }
                                ]
                            ]
                        }
                    }
                );
                return;
            }
            
            await ctx.reply(
                `👋 سلام ${firstName}!\n\n` +
                `✅ خوش آمدید به ربات آپلودر!\n\n` +
                `📊 آمار شما:\n` +
                `• تعداد دانلودها: ${user.downloadedVideos}\n` +
                `• تاریخ عضویت: ${user.joinDate.toLocaleDateString('fa-IR')}\n\n` +
                `🎯 برای شروع، فایل مورد نظر خود را ارسال کنید.`,
                {
                    reply_markup: {
                        inline_keyboard: [
                            [
                                {
                                    text: "📊 آمار من",
                                    callback_data: "my_stats"
                                },
                                {
                                    text: "ℹ️ راهنما",
                                    callback_data: "help"
                                }
                            ]
                        ]
                    }
                }
            );
            
        } catch (error) {
            console.error('❌ Error checking channel membership:', error);
            
            await ctx.reply(
                `👋 سلام ${firstName}!\n\n` +
                `✅ خوش آمدید به ربات آپلودر!\n\n` +
                `⚠️ خطا در چک کردن عضویت چنل. لطفاً مطمئن شوید که در چنل ما عضو هستید.\n\n` +
                `📢 چنل ما: ${channelUsername}\n\n`
            );
        }
        
    } catch (error) {
        console.error('❌ Error in start command:', error);
        await ctx.reply('❌ خطایی رخ داد. لطفاً دوباره تلاش کنید.');
    }
});

start.callbackQuery('check_membership', async (ctx) => {
    try {
        const userId = ctx.from.id;
        const channelId = process.env.CHANNEL_ID || '-1001234567890';
        
        const member = await ctx.api.getChatMember(channelId, userId);
        
        if (member.status === 'left' || member.status === 'kicked') {
            await ctx.answerCallbackQuery('❌ شما هنوز در چنل عضو نیستید!');
            await ctx.editMessageText(
                `❌ شما هنوز در چنل ما عضو نیستید.\n\n` +
                `📢 لطفاً ابتدا در چنل ما جوین شوید:\n` +
                `https://t.me/${process.env.CHANNEL_USERNAME?.replace('@', '') || 'your_channel'}\n\n` +
                `سپس دوباره /start را ارسال کنید.`
            );
        } else {
            await ctx.answerCallbackQuery('✅ شما در چنل عضو هستید!');
            await ctx.editMessageText(
                `✅ عالی! شما در چنل عضو هستید.\n\n` +
                `🎯 حالا می‌توانید از ربات استفاده کنید.\n\n`
            );
        }
    } catch (error) {
        console.error('❌ Error checking membership:', error);
        await ctx.answerCallbackQuery('❌ خطا در چک کردن عضویت');
    }
});

export default start;