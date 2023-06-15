import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { FortyTwoStrategy } from './auth.strategy';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
// import { UserModule } from '../user/user.module';

import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import { ConfigModule } from 'src/config/config.module';


@Module({
  imports:  [ UserModule, PassportModule,
  JwtModule.register({
      secret: 'JWT_SECRET',
      signOptions: { expiresIn: '1h' },
    }), ConfigModule],
  providers: [FortyTwoStrategy, AuthService, JwtModule, UserService],
  controllers: [AuthController]
})
export class AuthModule {}
