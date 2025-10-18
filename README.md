# 📤 Uploader Bot

A Telegram bot built with Grammy framework and MongoDB for file uploading and user management.

## ✨ Features

- 🔐 **User Registration**: Automatic user registration and database management
- 📊 **User Statistics**: Track download counts and user activity
- 🚫 **Channel Membership Check**: Verify users are members of your channel
- 🗄️ **MongoDB Integration**: Persistent user data storage
- 🎯 **Interactive Interface**: Persian language support with inline keyboards
- ⚡ **Real-time Updates**: Live user information updates

## 🛠️ Tech Stack

- **Framework**: [Grammy](https://grammy.dev/) - Modern Telegram Bot Framework
- **Database**: [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/)
- **Runtime**: [Bun](https://bun.sh/) - Fast JavaScript runtime
- **Language**: JavaScript (ES Modules)

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- [Bun](https://bun.sh/docs/installation) (recommended) or Node.js
- [MongoDB](https://www.mongodb.com/try/download/community) (local or cloud)

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd uploader-bot
```

### 2. Install Dependencies

```bash
bun install
```

Or with npm:
```bash
npm install
```

### 3. Environment Configuration

Create a `.env` file in the root directory:

```bash
cp env.example .env
```

Edit the `.env` file with your configuration:

```env
# Bot Configuration
BOT_TOKEN=your_bot_token_here

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/uploader-bot

# Channel Configuration
CHANNEL_USERNAME=@your_channel_username
CHANNEL_ID=-1001234567890
```

## ⚙️ Configuration Guide

### Bot Token Setup

1. Open [@BotFather](https://t.me/botfather) on Telegram
2. Create a new bot with `/newbot`
3. Follow the instructions and get your bot token
4. Add the token to your `.env` file:

```env
BOT_TOKEN=1234567890:ABCdefGHIjklMNOpqrsTUVwxyz
```

### Database Configuration

#### Local MongoDB
```env
MONGODB_URI=mongodb://localhost:27017/uploader-bot
```

#### MongoDB Atlas (Cloud)
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/uploader-bot
```

### Channel Configuration

#### Getting Channel Username
1. Create a channel on Telegram
2. Set a username for your channel (e.g., `@my_uploader_channel`)
3. Add it to your `.env`:

```env
CHANNEL_USERNAME=@my_uploader_channel
```

#### Getting Channel ID
1. Add [@userinfobot](https://t.me/userinfobot) to your channel
2. Forward any message from your channel to the bot
3. Copy the channel ID (format: `-1001234567890`)
4. Add it to your `.env`:

```env
CHANNEL_ID=-1001234567890
```

## 🏃‍♂️ Running the Bot

### Development Mode

```bash
bun run app.js
```

Or with npm:
```bash
npm start
```

### Production Mode

```bash
bun --production run app.js
```

## 📁 Project Structure

```
uploader-bot/
├── src/
│   ├── bot.js              # Bot initialization and configuration
│   ├── commands/
│   │   └── start.js        # Start command handler
│   ├── config/
│   │   └── database.js     # Database connection configuration
│   └── models/
│       └── User.js         # User model schema
├── app.js                  # Application entry point
├── package.json           # Dependencies and scripts
├── .env                   # Environment variables (create this)
├── env.example           # Environment variables template
└── README.md             # This file
```

## 🗄️ Database Schema

### User Model

```javascript
{
  userId: Number,           // Telegram user ID (unique)
  firstName: String,       // User's first name
  lastName: String,        // User's last name (optional)
  username: String,        // Telegram username (optional)
  joinDate: Date,         // Registration date
  downloadedVideos: Number, // Download count
  isBanned: Boolean,      // Ban status
  banDate: Date,          // Ban date (if banned)
  banReason: String       // Ban reason (if banned)
}
```

## 🤖 Bot Commands

- `/start` - Initialize bot and check channel membership

## 🔧 Available Scripts

```bash
# Start the bot
bun run app.js

# Install dependencies
bun install

# Check for updates
bun update
```

## 🐛 Troubleshooting

### Common Issues

#### Bot Token Error
```
Error: BOT_TOKEN is not set
```
**Solution**: Make sure your `.env` file contains a valid bot token.

#### Database Connection Error
```
MongoDB connection failed
```
**Solution**: 
- Check if MongoDB is running
- Verify your `MONGODB_URI` in `.env`
- Ensure network connectivity for cloud databases

#### Channel Membership Check Error
```
Error checking channel membership
```
**Solution**:
- Verify `CHANNEL_ID` is correct
- Ensure bot is added to the channel as admin
- Check channel privacy settings

### Logs

The bot provides detailed logging:
- ✅ Successful operations
- ❌ Error messages
- 🔄 User registration/updates
- 📊 Database operations

## 📝 Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| `BOT_TOKEN` | Telegram bot token from BotFather | `1234567890:ABCdef...` |
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/uploader-bot` |
| `CHANNEL_USERNAME` | Your channel username | `@my_channel` |
| `CHANNEL_ID` | Your channel ID | `-1001234567890` |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License.

## 📞 Support

If you encounter any issues or have questions:

1. Check the troubleshooting section
2. Review the logs for error messages
3. Ensure all environment variables are correctly set
4. Verify MongoDB connection and bot permissions

---

**Happy Coding! 🚀**
