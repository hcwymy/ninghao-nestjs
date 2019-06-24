import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport' 
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      secretOrPrivateKey: 'Ll7nO1oxx9BMqoA4HRuSFQUeMpk6sx45',
      signOptions: {
        expiresIn: '12h'
      }
    }),
    PassportModule.register({
      defaultStrategy: 'jwt'
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [PassportModule]
})
export class AuthModule {}
