import { ApiModelProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsDefined, IsString, Length, Matches } from 'class-validator';

export class CreateCustomUserDto {
    @ApiModelProperty()
    readonly _id: number;

    @IsEmail()
    @IsNotEmpty()
    @IsDefined()
    @IsString()
    @ApiModelProperty()
    readonly email: string;

    @Length(8)
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)\S+$/)
    @IsDefined()
    @IsString()
    @ApiModelProperty()
    readonly password: string;

    readonly firstName: string;
    readonly lastName: string;

}
