import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { Repository } from 'typeorm';
import { PostDto } from './post.dto';

@Injectable()
export class PostService {
    constructor(
        @InjectRepository(Post)
        private readonly postRespository: Repository<Post>
    ){ }

    async store(data: PostDto) {
        const entity = await this.postRespository.create(data);
        await this.postRespository.save(entity);
        return entity;
    }

    async index(){
        const entities = await this.postRespository.find();
        return entities;
    }

    async show(id: string){
        const entity = await this.postRespository.findOne(id);
        return entity;
    }

    async update(id: string, data: Partial<PostDto>){
        const result = await this.postRespository.update(id, data);
        return result;
    }

    async destroy(id: string){
        const result = await this.postRespository.delete(id);
        return result;
    }
}
