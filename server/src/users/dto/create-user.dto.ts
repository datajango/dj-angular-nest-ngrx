import { ApiModelProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiModelProperty()
    readonly _id: number;

    @ApiModelProperty()
    readonly firstName: string;

    @ApiModelProperty()
    readonly lastName: string;

    //@ApiModelProperty()
    //readonly username: string;

    @ApiModelProperty()
    readonly password: string;
    
    @ApiModelProperty()
    readonly username: string;
    
    @ApiModelProperty()
    readonly added_on: Date;

}