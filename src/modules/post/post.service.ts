import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PostService {
    constructor(
        @InjectRepository(Post)
        private readonly postRespository: Repository<Post>
    ){ }

    async store(data) {
        const entity = await this.postRespository.create(data);
        await this.postRespository.save(entity);
        return entity;
    }

    async index(){
        const entities = await this.postRespository.find();
        return entities;
    }
}
