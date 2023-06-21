import { Body, Controller, Delete, Get, OnApplicationShutdown, Param, Patch, Post, Put, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDTO } from './dto/updatedto.dto'
import { CreateFriendshipDTO } from './dto/createFriendship.dto';
import { Request } from 'express';
// import { SocketGateway } from 'src/socket/socket.gateway';
import { AuthGuard } from '@nestjs/passport';
UseGuards(AuthGuard('jwt'))
@Controller('user')
export class UserController{
    constructor(private readonly userservice: UserService
       ){}


    //User Management
    @Get()
    async FindMany() {
        return this.userservice.GetMany();
    }

    //working
    // @Get()
    // async FindbyID(@Req() req: Request){
    //     return  this.userservice.FindbyID(req.user['id']);
    // }

    //working
    @Delete(':id')
    async DeleteUser(@Param('id') id: string){
        return this.userservice.DeleteUser(id);
    }

    //working
    @Post(':id')
    async UpdateUser(@Param('id') id: string, @Body() UserData: UpdateUserDTO){
        console.log(UserData);
        return this.userservice.UpdateUser(id, UserData);
    }

    //Friendship Management
    //working
    @Post(':id/add')
    async addFriend(@Param('id') id: string, @Body() dto: CreateFriendshipDTO){
         this.userservice.addFriend(id, dto);
         return {message: 'friend added'};
    }
    @Post(':id/remove')
    async removeFriend(@Param('id') id: string, @Body() dto: CreateFriendshipDTO){
        this.userservice.removeFriend(id, dto);
        return {message: 'friend removed'};
    }
    @Post(':id/accept')
    async acceptFriend(@Param('id') id: string, @Body() dto: CreateFriendshipDTO){
        this.userservice.acceptFriend(id, dto);
        return {message: 'friend accepted'};
    }
    @Post(':id/block')
    async blockFriend(@Param('id') id: string, @Body() dto: CreateFriendshipDTO){
        this.userservice.blockFriend(id, dto);
        return {message: 'friend blocked'};
    }
    @Get(':id/friends')
    async getFriends(@Param('id') id: string){
        return this.userservice.getFriends(id);
    }
    @Post(':id/friend')
    async getFriend(@Param('id') id: string,  @Body() dto: CreateFriendshipDTO){
        console.log('here');
        return this.userservice.getFriend(id, dto);
    }
    @Get(':id/pending')
    async getPendings(@Param('id') id: string){
        return this.userservice.getPendings(id);
    }

    @Get(':id/blocked')
    async getBlocked(@Param('id') id: string){
        return this.userservice.getBlocked(id);
    }


    // @Patch('online.:id')
    // async updateOnlineStatus(@Param(':id') id : string, @Body('online') status: boolean){
    //     const user = await this.userservice.updateOnlineStatus(id, status);
    // }

    // async onApplicationShutdown(signal?: string): Promise<void>{
    //     const connectedUsers = Array.from(this.socketGateway.connectedUsers);
    //     for(const userId of connectedUsers)
    //         await this.updateOnlineStatus(userId, false);
    // }
    // @Post('/update/profile')
    // firstUpdate(@Req() req: Request ,@Body() data: Body)
    // {
    //     return this.userservice.UpdateUser(id, UserData);
    // }
}


