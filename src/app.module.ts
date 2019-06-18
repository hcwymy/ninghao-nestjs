import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './modules/posts/posts.module';
import { DemoMiddleware } from './core/middlewares/demo.middleware';
import { APP_GUARD } from '@nestjs/core';
import { DemoRolseGuard } from './core/guards/demo-rolse.guard';

@Module({
  imports: [PostsModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: DemoRolseGuard
    }
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer){
    consumer
      .apply(DemoMiddleware)
      .forRoutes('posts');
  }
}
