import bot from "./src/bot"

// Stopping the bot when the Node.js process
// is about to be terminated
process.once("SIGINT", () => bot.stop());
process.once("SIGTERM", () => bot.stop());
bot.start({
    onStart: (botInfo) => {
        console.log(`Bot started as ${botInfo.username}`);
    }
})