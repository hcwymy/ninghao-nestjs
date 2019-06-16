import { Controller, Get, Req, Query, Headers, Param, Body, Post } from '@nestjs/common';
import { CreatePostDto } from './post.dto';

@Controller('posts')
export class PostsController {
    @Get()
    index(@Headers('authorization') headers){
        console.log(headers)

        return [
            {
                'title':  'help'
            }
        ]
    }

    @Get(':id')
    Show(@Param() params){
        return {
            title: `Post ${params.id}`
        }
    }

    @Post()
    Store(@Body() post: CreatePostDto){
        console.log(post.title)
    }
}
