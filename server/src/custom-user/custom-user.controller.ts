import * as jwt from 'jsonwebtoken';

import { Controller, Get, Post, Param, Body, Delete, Headers, Put, Response, HttpStatus, Head } from '@nestjs/common';
import { CreateCustomUserDto } from './dto/create-custom-user.dto';
//import { UpdateUserDto } from './dto/update-user.dto';
import { CustomUserService } from './custom-user.service';
import { ICustomUser } from './custom-user.interface';
import { ErrorMsg } from '../common/ErrorMsg';
import { SuccessMsg } from '../common/SuccessMsg';
import { LoginCustomUserDto } from './dto/login-custom-user.dto';

@Controller('customusers')
export class CustomUserController {
  constructor(private readonly usersService: CustomUserService) { }

  @Post('register')
  async register(@Response() res, @Body() createUserDto: CreateCustomUserDto): Promise<ICustomUser | ErrorMsg> {
    const result = await this.usersService.register(createUserDto);

      if (!result.success){
        return res.status(HttpStatus.BAD_REQUEST).json(result);
      }
  
    return res.status(HttpStatus.OK).json(result);    
  }
      

  @Post('login')
  async login(@Response() res, @Body() login: LoginCustomUserDto): Promise<any> {

    console.log('login:', login);

    return await this.usersService.findOne({ username: login.email}).then(user => {
        if (!user) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                message: 'User Not Found',
            });
        } else {
            console.log('start getting the token');
            const token = this.usersService.createToken(user);
            console.log(token);
            return res.status(HttpStatus.OK).json(token);
        }
    });  
  }

  @Post('verify')
  async verify(@Headers() headers: any, @Response() res, @Body() body: any): Promise<any> {

    //console.log('verify:', headers);

    let token = headers['x-access-token'] || headers['authorization']; // Express headers are auto converted to lowercase
    if (token.startsWith('Bearer ')) {
      // Remove Bearer from string
      token = token.slice(7, token.length);
    }
  
    if (token) {
      jwt.verify(token, 'ILovePokemon', (err, decoded) => {
        
        
        if (err) {
          return res.json({
            success: false,
            message: 'Token is not valid'
          });
        } else {
          let myDecoded = decoded;
          
          let data = {
            id: myDecoded.id,
            firstName: myDecoded.firstname,
            lastName: myDecoded.lastname,
            username: myDecoded.username
          };          

          
          return res.status(HttpStatus.OK).json(data);
        }
      });
    } else {
      return res.json({
        success: false,
        message: 'Auth token is not supplied'
      });
    }

   
  }



  @Post()
  async create(@Body() createUserDto: CreateCustomUserDto): Promise<ICustomUser | ErrorMsg> {
    return this.usersService.create(createUserDto);
  }

  @Get()
  async findAll(): Promise<ICustomUser[] | ErrorMsg> {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<ICustomUser | ErrorMsg> {
    return this.usersService.findById(id);
  }

  @Delete()
  async deleteAll(): Promise<SuccessMsg | ErrorMsg> {
    return this.usersService.deleteAll();
  }

  @Delete(':id')
  async findByIdAndDelete(@Param('id') id: string): Promise<SuccessMsg | ErrorMsg> {
    return this.usersService.findByIdAndDelete(id);
  }

//   @Put(':id')
//   async findByIdAndUpdate(@Param('id') id: string, @Body() data: UpdateUserDto): Promise<IUser | ErrorMsg> {
//     return this.usersService.findByIdAndUpdate(id, data);
//   }
}

