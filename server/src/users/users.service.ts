import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types, PassportLocalModel } from 'mongoose';
import { UserSchema } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IUser } from './interfaces/user.interface';
import { ErrorMsg } from '../common/ErrorMsg';
import { SuccessMsg } from '../common/SuccessMsg';
import { debug } from 'console';
import { IUsersService } from './interfaces/iusers.service';

@Injectable()
//export class UsersService implements IUsersService {
export class UsersService  {

    //constructor(@InjectModel('User') private readonly userModel: Model<IUser>) { }
    constructor(@InjectModel('User') private readonly userModel: PassportLocalModel<IUser>) {}

    async create(createUserDto: CreateUserDto): Promise<IUser|ErrorMsg> {
        console.log('create', createUserDto);
        try {
            const createdUser = new this.userModel(createUserDto);
            console.log('createdUser', createdUser);
            return await createdUser.save();
        } catch (err) {
            return { msg: err };
        }
    }

    async findAll(): Promise<IUser[]|ErrorMsg> {
        try {
            return await this.userModel.find().exec();
        } catch (err) {
            return { msg: err };
        }
    }

    async findOne(options: object): Promise<IUser|ErrorMsg> {
        try {
            return await this.userModel.findOne(options).exec();
        } catch (err) {
            return { msg: err };
        }                
    }

    // this method retrieves only one entry, by entry ID
    async findById(id: string): Promise<IUser|ErrorMsg> {

        console.log(`findById ${id}`);

        try {
            let query: any = await this.userModel.findById(id).exec();
            return query;
        } catch (err) {
            return { msg: err };
        }
    }

    async deleteAll(): Promise<SuccessMsg|ErrorMsg> {
        try {
            let results = await this.userModel.deleteMany({}).exec();
            console.log('deleteAll:', results);
            //return await this.userModel.find().exec();
            return { msg: 'Success' };
        } catch (err) {
            return { msg: err };
        }
    }

    async findByIdAndDelete(id: string): Promise<SuccessMsg|ErrorMsg> {
        try {
            let results = await this.userModel.findByIdAndDelete(id).exec();
            console.log('findByIdAndDelete:', results);
            return { msg: 'Success' };
        } catch (err) {
            return { msg: err };
        }
    }

    async findByIdAndUpdate(id: string, data: UpdateUserDto): Promise<IUser|ErrorMsg> {
        try {
            return await this.userModel.findByIdAndUpdate(id, data).exec();
        } catch (err) {
            return { msg: err };
        }
    }

    async update(ID: number, newValue: IUser): Promise<IUser> {
        const user = await this.userModel.findById(ID).exec();

        if (!user._id) {
            debug('user not found');
        }

        await this.userModel.findByIdAndUpdate(ID, newValue).exec();
        return await this.userModel.findById(ID).exec();
    }

    async delete(ID: number): Promise<string> {
        try {
            await this.userModel.findByIdAndRemove(ID).exec();
            return 'The user has been deleted';
        }
        catch (err) {
            debug(err);
            return 'The user could not be deleted';
        }
    }    
}
