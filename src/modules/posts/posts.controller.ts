import { Controller, Get, Req, Query, Headers, Param, Body, Post } from '@nestjs/common';
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
       this.demoService.create(post);
    }
}
