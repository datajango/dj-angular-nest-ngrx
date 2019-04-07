import { Document } from 'mongoose';

export interface Lesson extends Document {
    readonly description: string;
    readonly duration: string;
    readonly seqNo: string;
    readonly courseId: number;
}