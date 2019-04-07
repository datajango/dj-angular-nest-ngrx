import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { TodoSchema } from './schemas/todo.schema';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './interfaces/todo.interface';
//import { TODO_MODEL } from '../constants';
import { ErrorMsg } from '../common/ErrorMsg';
import { SuccessMsg } from '../common/SuccessMsg';

@Injectable()
export class TodosService {

    constructor(@InjectModel('Todo') private readonly todoModel: Model<Todo>) { }
    //constructor(@Inject(TODO_MODEL) private readonly todoModel: Model<Todo>) {}

    async create(createTodoDto: CreateTodoDto): Promise<Todo|ErrorMsg> {
        //let _id: number = new Types.ObjectId();
        console.log('create', createTodoDto);

        try {
            const createdTodo = new this.todoModel(createTodoDto);

            console.log('createdTodo', createdTodo);


            return await createdTodo.save();
        } catch (err) {
            return { msg: err };
        }
    }

    async findAll(): Promise<Todo[]|ErrorMsg> {
        try {
            return await this.todoModel.find().exec();
        } catch (err) {
            return { msg: err };
        }
    }

    // this method retrieves only one entry, by entry ID
    async findById(id: string): Promise<Todo|ErrorMsg> {

        console.log(`findById ${id}`);

        try {
            let query: any = await this.todoModel.findById(id).exec();
            return query;
        } catch (err) {
            return { msg: err };
        }
    }

    async deleteAll(): Promise<SuccessMsg|ErrorMsg> {
        try {
            let results = await this.todoModel.deleteMany({}).exec();
            console.log('deleteAll:', results);
            //return await this.todoModel.find().exec();
            return { msg: 'Success' };
        } catch (err) {
            return { msg: err };
        }
    }

    async findByIdAndDelete(id: string): Promise<SuccessMsg|ErrorMsg> {
        try {
            let results = await this.todoModel.findByIdAndDelete(id).exec();
            console.log('findByIdAndDelete:', results);
            return { msg: 'Success' };
        } catch (err) {
            return { msg: err };
        }
    }

    async findByIdAndUpdate(id: string, data: UpdateTodoDto): Promise<Todo|ErrorMsg> {
        try {
            return await this.todoModel.findByIdAndUpdate(id, data).exec();
        } catch (err) {
            return { msg: err };
        }
    }
    

}
