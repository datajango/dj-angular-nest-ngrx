import * as jwt from 'jsonwebtoken';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { Model, PassportLocalModel } from 'mongoose';
import { IUser } from '../users/interfaces/user.interface';
import { InjectModel } from '@nestjs/mongoose';
import { debug } from 'console';
import { RegistrationStatus } from './interfaces/registrationStatus.interface';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsersService,
        @InjectModel('User') private readonly userModel: PassportLocalModel<IUser>) { }

    //async register(user: IUser) {
    async register(user: CreateUserDto) {

        let status: RegistrationStatus = { success: true, message: 'user register' };

        let userAccount = await new this.userModel(
            {
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName
            });

        let results = await this.userModel.register(userAccount, user.password, (err) => {
                if (err) {
                    debug(err);
                    status = { success: false, message: err };
                }
            });
        console.log('results:', results);

        return status;
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

    async validateUser(payload: JwtPayload): Promise<any> {
        return await this.usersService.findById(payload.id);
    }
}
