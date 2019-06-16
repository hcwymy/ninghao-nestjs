import { Controller, Get, Req, Query, Headers, Param, Body } from '@nestjs/common';

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
    Store(@Body() body){
        console.log(body)
    }
}
