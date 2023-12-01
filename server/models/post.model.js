import mongoose from 'mongoose'
import crypto from 'crypto'
//const mongoose = require('mongoose');
const PostSchema = new mongoose.Schema({
    subject: {
        type: String,
        trim: true,
        required: 'Subject is required'
    },
    description: {
        type: String,
        trim: true
    },
    author: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    updated: Date,
    created: {
        type: Date,
        default: Date.now
    },
});
export default mongoose.model('Post', PostSchema);