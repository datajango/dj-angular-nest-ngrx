import { Connection } from 'mongoose';

import { CourseSchema } from './courses.schema';
import { COURSE_MODEL_PROVIDER, DB_PROVIDER } from '../../server/src/constants';

export const coursesProviders = [
    {
        provide: COURSE_MODEL_PROVIDER,
        useFactory: (connection: Connection) => connection.model('Course', CourseSchema),
        inject: [DB_PROVIDER],
    },
];