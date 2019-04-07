import { Connection } from 'mongoose';
import { TodoSchema } from './schemas/todo.schema';
import { TODO_MODEL } from '../constants';

export const todosProviders = [
  {
    provide: TODO_MODEL,
    useFactory: (connection: Connection) => connection.model('Todo', TodoSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
