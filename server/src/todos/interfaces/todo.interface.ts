import { Document } from 'mongoose';

export interface Todo extends Document {
    readonly _id: string;
    readonly title: string;
    readonly text: string;
    readonly image: string;
    readonly completed: boolean;
    readonly status: string;
    readonly added_on: Date;
    readonly addecompleted_ond_on: Date;
    readonly cancelled_on: Date;
}