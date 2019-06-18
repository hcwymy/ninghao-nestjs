import { Controller, Get, Req, Query, Headers, Param, Body, Post, HttpException, HttpStatus, ForbiddenException, UseFilters, UsePipes, ValidationPipe, ParseIntPipe, UseGuards } from '@nestjs/common';
import { CreatePostDto } from './post.dto';
import { DemoService } from './providers/demo/demo.service';
import { DemoFilter } from '../../core/filters/demo.filter';
import { DemoAuthGuard } from '../../core/guards/demo-auth.guard';

@Controller('posts')
//@UseFilters(DemoFilter)
@UseGuards(DemoAuthGuard)
export class PostsController {

    constructor(private readonly demoService: DemoService){}

    @Get()
    index(){
        return this.demoService.findAll();
    }

    @Get(':id')
    Show(@Param('id', ParseIntPipe) id){
        console.log('id:', typeof id);

        return {
            title: `Post ${id}`
        }
    }

    @Post()
    //@UseFilters(DemoFilter)
    @UsePipes(ValidationPipe)
    Store(@Body() post: CreatePostDto){
        // throw new ForbiddenException('没有权限！');
        this.demoService.create(post);
    }
}
