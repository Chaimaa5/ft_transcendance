import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
// import { SocketGateway } from 'src/socket/socket.gateway';

@Module({
  imports: [],
  controllers: [UserController, ProfileController],
  providers: [UserService, ProfileService],
  exports: [UserService]
})
export class UserModule {}
