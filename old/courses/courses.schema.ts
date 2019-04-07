import * as mongoose from 'mongoose';

export const CourseSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
    },
    iconUrl: {
        type: String,
        required: false,
    },
    courseListIcon: {
        type: String,
        required: false,
    },
    longDescription: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    lessonsCount: {
        type: Number,
        required: true,
    },
    promo: {
        type: Boolean,
        required: true,
    }
});