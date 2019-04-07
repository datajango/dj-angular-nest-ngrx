import { Connection } from 'mongoose';
import { UserSchema } from './schemas/user.schema';
import { TODO_MODEL } from '../constants';

export const usersProviders = [
  {
    provide: TODO_MODEL,
    useFactory: (connection: Connection) => connection.model('User', UserSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
