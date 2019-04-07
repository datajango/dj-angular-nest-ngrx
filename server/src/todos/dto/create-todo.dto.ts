import { ApiModelProperty } from '@nestjs/swagger';

export class CreateTodoDto {
    @ApiModelProperty()
    readonly _id: number;

    @ApiModelProperty()
    readonly text: string;

    @ApiModelProperty()
    readonly completed: boolean;

    @ApiModelProperty()
    readonly title: string;
    
    @ApiModelProperty()
    readonly image: string;
    
    @ApiModelProperty()
    readonly status: string;

    @ApiModelProperty()
    readonly added_on: Date;

    @ApiModelProperty()
    readonly addecompleted_ond_on: Date;

    @ApiModelProperty()
    readonly cancelled_on: Date;

}