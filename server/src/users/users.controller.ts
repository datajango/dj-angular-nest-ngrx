import { Controller, Get, Post, Param, Body, Delete, Put } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
import { IUser } from './interfaces/user.interface';
import { ErrorMsg } from '../common/ErrorMsg';
import { SuccessMsg } from '../common/SuccessMsg';
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<IUser | ErrorMsg> {
    return this.usersService.create(createUserDto);
  }

  @Get()
  async findAll(): Promise<IUser[] | ErrorMsg> {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<IUser | ErrorMsg> {
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

  @Put(':id')
  async findByIdAndUpdate(@Param('id') id: string, @Body() data: UpdateUserDto): Promise<IUser | ErrorMsg> {
    return this.usersService.findByIdAndUpdate(id, data);
  }
}

