import * as mongoose from 'mongoose';

export const LessonSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
    },
    duration: {
        type: String,
        required: true,
    },
    seqNo: {
        type: Number,
        required: true,
    },    
    courseId: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
    }
});