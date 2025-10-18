import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  // ایدی عددی کاربر
  userId: {
    type: Number,
    required: true,
    unique: true,
    index: true
  },
  
  // اسم کاربر
  firstName: {
    type: String,
    required: true
  },
  
  // نام خانوادگی کاربر (اختیاری)
  lastName: {
    type: String,
    default: ''
  },
  
  // یوزرنیم کاربر در صورت وجود
  username: {
    type: String,
    default: null,
    sparse: true // اجازه می‌دهد چندین کاربر username خالی داشته باشند
  },
  
  // تاریخ و ساعت جوین شدن
  joinDate: {
    type: Date,
    default: Date.now
  },
  
  // تعداد فیلم‌های دانلود شده کاربر
  downloadedVideos: {
    type: Number,
    default: 0,
    min: 0
  },
  
  // بن بودن یا نبودن کاربر
  isBanned: {
    type: Boolean,
    default: false
  },
  
  // تاریخ بن شدن (اختیاری)
  banDate: {
    type: Date,
    default: null
  },
  
  // دلیل بن شدن (اختیاری)
  banReason: {
    type: String,
    default: null
  }
}, {
  timestamps: true, // اضافه کردن createdAt و updatedAt خودکار
});

// متدهای کمکی
userSchema.methods.incrementDownloadCount = function() {
  this.downloadedVideos += 1;
  return this.save();
};

userSchema.methods.banUser = function(reason = null) {
  this.isBanned = true;
  this.banDate = new Date();
  this.banReason = reason;
  return this.save();
};

userSchema.methods.unbanUser = function() {
  this.isBanned = false;
  this.banDate = null;
  this.banReason = null;
  return this.save();
};

// استاتیک متد برای پیدا کردن کاربر بر اساس userId
userSchema.statics.findByUserId = function(userId) {
  return this.findOne({ userId });
};

// استاتیک متد برای پیدا کردن کاربر بر اساس username
userSchema.statics.findByUsername = function(username) {
  return this.findOne({ username });
};

// استاتیک متد برای گرفتن آمار کاربران
userSchema.statics.getUserStats = function() {
  return this.aggregate([
    {
      $group: {
        _id: null,
        totalUsers: { $sum: 1 },
        bannedUsers: { $sum: { $cond: ['$isBanned', 1, 0] } },
        activeUsers: { $sum: { $cond: ['$isBanned', 0, 1] } },
        totalDownloads: { $sum: '$downloadedVideos' }
      }
    }
  ]);
};

const User = mongoose.model('User', userSchema);

export default User;
