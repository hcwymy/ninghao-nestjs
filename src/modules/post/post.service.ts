import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { Repository } from 'typeorm';
import { PostDto } from './post.dto';
import { User } from '../user/user.entity';
import { ListOptionsInterface } from '../../core/interfaces/list-options.interface';
import { Tag } from '../tag/tag.entity';

@Injectable()
export class PostService {
    constructor(
        @InjectRepository(Post)
        private readonly postRespository: Repository<Post>,

        @InjectRepository(Tag)
        private readonly tagRepository: Repository<Tag>
    ){ }

    async beforeTag(tags: Partial<Tag>[]){
        const _tags = tags.map(async item => {
            const { id, name } = item;

            if (id){
                const _tag =await this.tagRepository.findOne(id);

                if (_tag){
                    return _tag;
                }

                return;
            }

            if (name){
                const _tag = await this.tagRepository.findOne({name});

                if(_tag){
                    return _tag;
                }

                return await this.tagRepository.save(item);
            }
        });

        return Promise.all(_tags);
    }

    async store(data: PostDto, user: User) {
        const {tags} = data;

        if(tags){
            data.tags = await this.beforeTag(tags);
        }

        const entity = await this.postRespository.create(data);
        await this.postRespository.save({
            ...entity,
            user
        });

        return entity;
    }

    async index(options: ListOptionsInterface){
        const {categories, tags} = options;
        const queryBuilder = await this.postRespository
        .createQueryBuilder('post');

        queryBuilder.leftJoinAndSelect('post.user', 'user');
        queryBuilder.leftJoinAndSelect('post.category', 'category');
        queryBuilder.leftJoinAndSelect('post.tags', 'tag');

        if(categories){
            queryBuilder.where('category.alias IN (:...categories)', {categories}); 
        }

        if(tags){
            queryBuilder.andWhere('tag.name IN (:...tags)', { tags });
        }

        const entities = queryBuilder.getMany();
        return entities;
    }

    async show(id: string){
        const entity = await this.postRespository.findOne(id);
        return entity;
    }

    async update(id: string, data: Partial<PostDto>){
        const { tags } = data;
        delete data.tags;
        await this.postRespository.update(id, data);
        const entity = await this.postRespository
            .findOne(id, {relations: ['category', 'tags']});
        
        if(tags){
            entity.tags = await this.beforeTag(tags);
        }

        return await this.postRespository.save(entity);
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

    async unVote(id: number, user: User){
        await this.postRespository
            .createQueryBuilder()
            .relation(User, 'voted')
            .of(user)
            .remove({ id });
    }

    async liked(id: number){
        return await this.postRespository
            .createQueryBuilder()
            .relation(Post, 'liked')
            .of(id)
            .loadMany();
    }
}
