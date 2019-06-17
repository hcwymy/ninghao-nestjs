import { Controller, Get, Req, Query, Headers, Param, Body, Post, HttpException, HttpStatus, ForbiddenException } from '@nestjs/common';
import { CreatePostDto } from './post.dto';
import { DemoService } from './providers/demo/demo.service';

@Controller('posts')
export class PostsController {

    constructor(private readonly demoService: DemoService){}

    @Get()
    index(){
        return this.demoService.findAll();
    }

    @Get(':id')
    Show(@Param() params){
        return {
            title: `Post ${params.id}`
        }
    }

    @Post()
    Store(@Body() post: CreatePostDto){
        throw new ForbiddenException('没有权限！');
       // this.demoService.create(post);
    }
}
