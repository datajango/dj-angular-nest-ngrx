import { Connection } from 'mongoose';

import { LessonSchema } from './lessons.schema';
import { LESSON_MODEL_PROVIDER, DB_PROVIDER } from '../../server/src/constants';

export const lessonsProviders = [
    {
        provide: LESSON_MODEL_PROVIDER,
        useFactory: (connection: Connection) => connection.model('Lesson', LessonSchema),
        inject: [DB_PROVIDER],
    },
];