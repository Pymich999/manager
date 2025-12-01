const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Client',
      required: [true, 'Client is required'],
    },
    caption: {
      type: String,
      required: [true, 'Caption is required'],
      trim: true,
    },
    mediaUrl: {
      type: String,
      trim: true,
    },
    targetDate: {
      type: Date,
      required: [true, 'Target date is required'],
    },
    platform: {
      type: String,
      required: [true, 'Platform is required'],
      enum: ['Instagram', 'Facebook', 'Twitter', 'LinkedIn', 'TikTok', 'YouTube', 'Other'],
    },
    status: {
      type: String,
      enum: ['planned', 'posted', 'cancelled'],
      default: 'planned',
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

postSchema.index({ targetDate: 1, user: 1 });
postSchema.index({ client: 1, user: 1 });
postSchema.index({ platform: 1, user: 1 });

module.exports = mongoose.model('Post', postSchema);
