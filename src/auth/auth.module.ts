import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { FortyTwoStrategy } from './auth.strategy';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';


@Module({
  imports:  [ PassportModule],
  providers: [FortyTwoStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
