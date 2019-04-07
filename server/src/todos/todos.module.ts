import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';
import { todosProviders } from './todos.providers';
import { TodoSchema } from './schemas/todo.schema';
import { DatabaseModule } from '../database/database.module';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Todo', schema: TodoSchema }])
        //DatabaseModule
    ],
    controllers: [TodosController],
    //providers: [TodosService, ...todosProviders]
    providers: [TodosService]
})
export class TodosModule { }
