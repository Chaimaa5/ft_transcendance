import { Body, Controller, Delete, Get, OnApplicationShutdown, Param, Patch, Post, Put, Req, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { Request, Response} from 'express';
import { AuthGuard } from '@nestjs/passport';
import { User } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';
import { ChatService } from './chat.service';
import { AddMember, CreateChannel, CreateRoom } from './dto/Chat.dto';



@Controller('chat')
@ApiTags('chat')
@UseGuards(AuthGuard('jwt'))
export class ChatController{
    constructor(private readonly chatService: ChatService){}
    

    @Get('/rooms')
    async GetJoinedRooms(@Req() req: Request){
        const user = req.user as User
        // if (user)
            return await this.chatService.GetJoinedRooms(user.id);
    }

    @Post('create/:id')
    async CreateRoom(@Req() req: Request, @Body() body: CreateRoom){
        const user = req.user as User
        return await this.chatService.CreateRoom(user.id, body);
    }

    @Post('createchannel/')
    async CreateChannel(@Req() req: Request, @Body() body: CreateChannel){
        const user = req.user as User
        return await this.chatService.CreateChannel(user.id, body);
    }

    @Post('/add')
    async AddMember(@Req() req: Request, @Body() body: AddMember ){
        const user = req.user as User
        return await this.chatService.AddMember(user.id, body);
    }
   

}


