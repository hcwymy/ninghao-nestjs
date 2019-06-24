import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { Repository } from 'typeorm';
import { PostDto } from './post.dto';
import { User } from '../user/user.entity';

@Injectable()
export class PostService {
    constructor(
        @InjectRepository(Post)
        private readonly postRespository: Repository<Post>
    ){ }

    async store(data: PostDto, user: User) {
        const entity = await this.postRespository.create(data);
        await this.postRespository.save({
            ...entity,
            user
        });
        return entity;
    }

    async index(){
        const entities = await this.postRespository.find({
            relations: ['user']
        });
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

    async vote(id: number, user: User){
        await this.postRespository
            .createQueryBuilder()
            .relation(User, 'voted')
            .of(user)
            .add(id);
    }
}
