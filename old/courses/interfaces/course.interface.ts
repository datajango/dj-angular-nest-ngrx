import { Document } from 'mongoose';

export interface Course extends Document {
    readonly description: string;
    readonly iconUrl: string;
    readonly courseListIcon: string;
    readonly longDescription: string;
    readonly category: string;
    readonly lessonsCount: number;
    readonly promo: boolean;
}