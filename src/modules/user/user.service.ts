import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UserDto, UpdatePasswordDto } from './user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ){}

    async store(data: UserDto){
        const {name} = data;
        const user = await this.userRepository.findOne({ name });

        if(user){
            throw new BadRequestException('用户名已存在')
        }

        const entity = await this.userRepository.create(data);
        await this.userRepository.save(entity);
        return entity;
    }

    async show(id: string){
        const entity = await this.userRepository.findOne(id,{
            relations: ['posts']
        });

        if(!entity){
            throw new NotFoundException('没找到用户');
        }

        return entity;
    }

    async updatePassword(id: string, data: UpdatePasswordDto){
        const { password, newpassword } = data;
        const entity = await this.userRepository.findOne(id);

        if(!entity){
            throw new NotFoundException('未找到用户');
        }

        const pass = await entity.comparePassword(password);

        if (!pass){
            throw new BadRequestException('密码验证失败，请重新输入正确密码。');
        }

        entity.password =  newpassword;
        return await this.userRepository.save(entity);
    }

    async findByname(name: string, password?: boolean){
        const queryBuilder =  await this.userRepository
            .createQueryBuilder('user');

        queryBuilder.where('user.name = :name', {name});

        if(password){
            queryBuilder.addSelect('user.password');
        }

        const entity = queryBuilder.getOne();

        return entity;
    }

    async liked(id: number){
        return this.userRepository
            .findOne(id, {relations:['voted', 'voted.user']});
    }











}
