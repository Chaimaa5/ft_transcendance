import { Module } from '@nestjs/common';
import { AuthController } from './auth/auth.controller';
// import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
// import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    AuthModule
  ],
  controllers: [AuthController],
  providers: [],
})
export class AppModule {}
