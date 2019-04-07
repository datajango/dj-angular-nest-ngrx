import * as mongoose from 'mongoose';
import { DB_PROVIDER } from '../../server/src/constants'; 

export const databaseProviders = [
    {
        provide: DB_PROVIDER,
        useFactory: async () => {
            (mongoose as any).Promise = global.Promise;
            return await mongoose.connect('mongodb://mongodb:27017/school');
            
        },
    },
];