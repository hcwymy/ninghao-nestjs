import { Entity, PrimaryColumn, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Exclusion, BeforeInsert, BeforeUpdate, OneToMany, ManyToMany, JoinTable } from "typeorm";
import { Exclude } from 'class-transformer'
import * as bcrypt from 'bcryptjs'
import { Post } from "../post/post.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar', { unique: true })
    name: string;

    @Column()
    @Exclude()
    password: string;

    @CreateDateColumn()
    created: Date;

    @UpdateDateColumn()
    updated: Date;

    @OneToMany(type => Post, post => post.user)
    posts: Post[]

    @ManyToMany(type => Post, post => post.liked)
    @JoinTable()
    voted: Post[];

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword(){
        this.password = await bcrypt.hash(this.password, 12);
    }


    async comparePassword(password: string) {
        return  await bcrypt.compare(password, this.password);
    }
}