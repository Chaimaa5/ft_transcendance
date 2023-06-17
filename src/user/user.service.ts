import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { UpdateUserDTO } from './dto/updatedto.dto'
import { CreateFriendshipDTO } from './dto/createFriendship.dto';

@Injectable()
export class UserService {
    prisma = new PrismaClient();
    constructor(){}
    
    
    UpdateUser(id: string, UserData: UpdateUserDTO) {
        return this.prisma.user.update({where: {id: id}, data: UserData as any});
    }
    
    async UpdateRefreshToken(id: string, Rt: string) {
        const prisma = new PrismaClient();
        return prisma.user.update({where: {id: id}, data: {refreshToken : Rt}});
    }
    
    GetMany() {
        const prisma = new PrismaClient();
        return prisma.user.findMany();
    }
    DeleteUser(id: string) {
        const prisma = new PrismaClient();
        return prisma.user.delete({where: {id: id}});
    }
    async FindbyID(id: string) {
        const prisma = new PrismaClient();
        return prisma.user.findUnique({where:  {id: id}});
    }
    FindbyName(username: string) {
        const prisma = new PrismaClient();
        return prisma.user.findFirst({where: {username: username}});
    }

    //addFriend
    //status: pending
    //        accepted
    //        blocked
    //        removed
              
    async addFriend(dto :CreateFriendshipDTO){
        const {senderId, receiverId} = dto;
        await this.prisma.friendship.create({
            data: {
                sender: {connect: {id: senderId}},
                receiver: {connect: {id: receiverId}},
                status: 'pending',
            },
        });
    }

    async removeFriend(dto :CreateFriendshipDTO){
        const {senderId, receiverId} = dto;
        await this.prisma.friendship.deleteMany({
            where: {
                OR: [
                    {senderId: senderId, receiverId: receiverId},
                    {senderId: receiverId, receiverId: senderId},
                ],
            },
        });
    }

    async acceptFriend(dto :CreateFriendshipDTO){
        const {senderId, receiverId} = dto;
        await this.prisma.friendship.updateMany({
            where: {
                OR: [
                    {senderId: senderId, receiverId: receiverId},
                    {senderId: receiverId, receiverId: senderId},
                ],
            },
            data: {
                status: 'accepted',
            },
        });
    }

    async blockFriend(dto :CreateFriendshipDTO){
        const {senderId, receiverId} = dto;
        await this.prisma.friendship.updateMany({
            where: {
                OR: [
                    {senderId: senderId, receiverId: receiverId},
                    {senderId: receiverId, receiverId: senderId},
                ],
            },
            data: {
                status: 'blocked',
            },
        });
    }

    //should be updated
    async getFriends(dto :CreateFriendshipDTO){
        const {senderId} = dto;
        await this.prisma.friendship.findMany({where: {
            OR: [
                {senderId: senderId},
                {receiverId: senderId},
            ],
        },});
    }

    //should be updated
    async getFriend(dto :CreateFriendshipDTO){
        const {senderId} = dto;
        await this.prisma.friendship.findFirst({where: {
                receiverId: senderId }
        });
    }

}
