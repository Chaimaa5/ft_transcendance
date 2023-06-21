import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { UpdateUserDTO } from './dto/updatedto.dto'
import { CreateFriendshipDTO } from './dto/createFriendship.dto';

@Injectable()
export class UserService {
    updateOnlineStatus(id: string, status: boolean) {
        throw new Error('Method not implemented.');
    }
    getUser() {
        throw new Error('Method not implemented.');
    }
    bestRanked() {
        throw new Error('Method not implemented.');
    }

    prisma = new PrismaClient();
    constructor(){}
    
    
    UpdateUser(id: string, UserData: UpdateUserDTO) {
        return this.prisma.user.update({where: {id: id}, data: UserData as any});
    }
    
    async UpdateRefreshToken(id: string, Rt: string) {
        const prisma = new PrismaClient();
        console.log('updating refresh to ');
        console.log(Rt);
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
        console.log(username);
        return prisma.user.findFirst({where: {username: username}});
    }

    //Friendship

              
    async addFriend(id : string, dto :CreateFriendshipDTO){
        const {receiverId} = dto;
        await this.prisma.friendship.create({
            data: {
                sender: {connect: {id: id}},
                receiver: {connect: {id: receiverId}},
                status: 'pending',
            },
        });
    }

    async removeFriend(id : string, dto :CreateFriendshipDTO){
        const {receiverId} = dto;
        await this.prisma.friendship.deleteMany({
            where: {
                OR: [
                    {senderId: id, receiverId: receiverId},
                    {senderId: receiverId, receiverId: id},
                ],
            },
        });
    }

    async acceptFriend(id : string, dto :CreateFriendshipDTO){
        const {receiverId} = dto;
        await this.prisma.friendship.updateMany({
            where: {
                OR: [
                    {senderId: id, receiverId: receiverId},
                    {senderId: receiverId, receiverId: id},
                ],
            },
            data: {
                status: 'accepted',
            },
        });
    }

    async blockFriend(id : string, dto :CreateFriendshipDTO){
        const {receiverId} = dto;
        await this.prisma.friendship.updateMany({
            where: {
                OR: [
                    {senderId: id, receiverId: receiverId},
                    {senderId: receiverId, receiverId: id},
                ],

            },
            data: {
                status: 'blocked',
            },
        });
    }

    //should be updated
    async getFriends(id : string){
        const res = await this.prisma.friendship.findMany({where: {
            AND:[{
                OR: [
                    {senderId: id},
                    {receiverId: id},
                ],
            },
            {status: 'accepted'},
            ],
            
        },});
        return res;
    }

    //should be updated
    async getFriend(id : string, dto :CreateFriendshipDTO){
        const {receiverId} = dto;
        const res = await this.prisma.friendship.findFirst({ where: {
            AND:[{
                OR: [
                    {senderId: id, receiverId: receiverId},
                    {senderId: receiverId, receiverId: id},
                ],
            },
            {status: 'accepted'},
            ],
        },
        });
        return res;
    }

    async getPendings(id : string){
        const res = await this.prisma.friendship.findMany({where: {
            AND:[{
                OR: [
                    {senderId: id},
                    {receiverId: id},
                ],
            },
            {status: 'pending'},
            ],
            
        },});
        return res;
    }

    async getBlocked(id : string){
        const res = await this.prisma.friendship.findMany({where: {
            AND:[{
                OR: [
                    {senderId: id},
                    {receiverId: id},
                ],
            },
            {status: 'blocked'},
            ],
            
        },});
        return res;
    }

    // async firstUpdate(data: Body) {
    //     return this.prisma.user.update({where: {id: id}, data: data as any});
    // }
}
