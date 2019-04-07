import { Get, Post, Controller, Body, UseGuards } from '@nestjs/common';
import { ItemsService } from './items.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';

@Controller('items')
export class ItemsController {

    constructor(private readonly itemsService: ItemsService) { }

    // @Get()
    // async findAll(): Promise<string[]> {
    //     return ['Pizza', 'Coke'];
    // }

    // @Post()
    // async create() {
    //     return 'Not yet implemented';
    // }

    @Get()
    //@UseGuards(AuthGuard('local'))
    @UseGuards(RolesGuard)
    async findAll(): Promise<string[]> {
        return this.itemsService.findAll();
    }

    @Post()
    async create(@Body() body: any) {

        console.log(body);
        this.itemsService.create(body.item);
    }

}
