const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    likedUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Create a compound index to ensure unique likes
likeSchema.index({ userId: 1, likedUserId: 1 }, { unique: true });

module.exports = mongoose.model('Like', likeSchema); 