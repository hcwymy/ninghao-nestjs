import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { truncate } from 'fs';
import { PostModule } from './modules/post/post.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { CategoryModule } from './modules/category/category.module';
import { TagModule } from './modules/tag/tag.module';


@Module({
  imports: [
    TypeOrmModule.forRoot(//{
      //type: 'mysql', 
     // host: 'localhost',
     // port: 3306,
    //  username: 'nest',
     // password: 'nest',
    //  database: 'nest',
    //  synchronize: true,
    //  entities: [__dirname + '/**/*.entity{.ts,.js}']}
    ),
    PostModule,
    UserModule,
    AuthModule,
    CategoryModule,
    TagModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
