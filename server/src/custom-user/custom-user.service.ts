import * as jwt from 'jsonwebtoken';
import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types, PassportLocalModel } from 'mongoose';
import { CustomUserSchema } from './schema/custom-user.schema';
import { CreateCustomUserDto } from './dto/create-custom-user.dto';
import { ICustomUser } from './custom-user.interface';
import { ErrorMsg } from '../common/ErrorMsg';
import { SuccessMsg } from '../common/SuccessMsg';
import { RegistrationStatus } from '../common/RegistrationStatus';
import { debug } from 'console';


@Injectable()
export class CustomUserService {

    constructor(@InjectModel('CustomUser') private readonly userModel: PassportLocalModel<ICustomUser>) { }

    async register(user: CreateCustomUserDto): Promise<RegistrationStatus> {
        console.log('create', user);
        try {
            // const createdUser = new this.userModel(user);
            // console.log('createdUser', createdUser);
            // let createResults = await createdUser.save();
            // console.log(createResults);
            let status: RegistrationStatus = { success: true, message: 'user register success' };
            
            let userAccount = await new this.userModel(
                {
                    username: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName
                });

            // let results = await this.userModel.register(userAccount, user.password, (err) => {
            //         if (err) {
            //             debug(err);
            //             status = { success: false, message: err };
            //         }
            //     });

            let results = await this.userModel.register(userAccount, user.password);

            console.log('results:', results);

            return status;

        } catch (err) {
            let status: RegistrationStatus = { success: false, message: err };
            return status;
        }
    }

    async create(createUserDto: CreateCustomUserDto): Promise<ICustomUser | ErrorMsg> {
        console.log('create', createUserDto);
        try {
            const createdUser = new this.userModel(createUserDto);
            console.log('createdUser', createdUser);
            return await createdUser.save();
        } catch (err) {
            return { msg: err };
        }
    }

    createToken(user) {
        console.log('get the expiration');
        const expiresIn = 3600;
        console.log('sign the token');
        console.log(user);

        const payload = {
            id: user.id,
            username: user.username,
            firstname: user.firstName,
            lastname: user.lastName
        };
        
        console.log(payload);

        const accessToken = jwt.sign(payload, 'ILovePokemon', { expiresIn });
        console.log('return the token');
        console.log(accessToken);
        return {
            expiresIn,
            accessToken,
        };
    }


    async findAll(): Promise<ICustomUser[] | ErrorMsg> {
        try {
            return await this.userModel.find().exec();
        } catch (err) {
            return { msg: err };
        }
    }

    async findOne(options: object): Promise<ICustomUser | ErrorMsg> {
        try {
            return await this.userModel.findOne(options).exec();
        } catch (err) {
            return { msg: err };
        }
    }

    // this method retrieves only one entry, by entry ID
    async findById(id: string): Promise<ICustomUser | ErrorMsg> {

        console.log(`findById ${id}`);

        try {
            let query: any = await this.userModel.findById(id).exec();
            return query;
        } catch (err) {
            return { msg: err };
        }
    }

    async deleteAll(): Promise<SuccessMsg | ErrorMsg> {
        try {
            let results = await this.userModel.deleteMany({}).exec();
            console.log('deleteAll:', results);
            //return await this.userModel.find().exec();
            return { msg: 'Success' };
        } catch (err) {
            return { msg: err };
        }
    }

    async findByIdAndDelete(id: string): Promise<SuccessMsg | ErrorMsg> {
        try {
            let results = await this.userModel.findByIdAndDelete(id).exec();
            console.log('findByIdAndDelete:', results);
            return { msg: 'Success' };
        } catch (err) {
            return { msg: err };
        }
    }

    // async findByIdAndUpdate(id: string, data: UpdateUserDto): Promise<IUser|ErrorMsg> {
    //     try {
    //         return await this.userModel.findByIdAndUpdate(id, data).exec();
    //     } catch (err) {
    //         return { msg: err };
    //     }
    // }

    async update(ID: number, newValue: ICustomUser): Promise<ICustomUser> {
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
