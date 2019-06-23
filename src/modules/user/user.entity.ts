import { Entity, PrimaryColumn, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Exclusion, BeforeInsert } from "typeorm";
import { Exclude } from 'class-transformer'
import * as bcrypt from 'bcryptjs'

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

    @BeforeInsert()
    async hassPassword(){
        this.password = await bcrypt.hash(this.password, 12);
    }


    async comparePassword(password: string) {
        return  await bcrypt.compare(password, this.password);
    }
}