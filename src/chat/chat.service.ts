import { Injectable, Res, UnauthorizedException } from '@nestjs/common';
import { Membership, PrismaClient } from '@prisma/client';
import { Response } from 'express';
import { NOTFOUND } from 'dns';
import { AddMember, CreateChannel, CreateRoom, UpdateChannel } from './dto/Chat.dto';

@Injectable()
export class ChatService {
   
   
    
    prisma = new PrismaClient();
    constructor(){}

    //avatar
    //username
    // last message

    async GetJoinedRooms(id : string){
        const rooms =  await this.prisma.room.findMany({
            where: {

                    isChannel: true
            },
            include: {
                membership: {
                    where: {userId: id},
                },
                // id: true,
                // name: true,
                // image: true,
                // type: true
            }
        })
        return rooms

    }
    async CreateRoom(ownerId: string, data: CreateRoom) {

        // image should be parsed and uploaded
        const room = await this.prisma.room.create({
            data: {
                name: data.name as string,
                image: data.image as string,
                type: 'private',
                ownerId: ownerId,
                isChannel: false,

            }
        })

        await this.prisma.membership.createMany({
            data: [
                {
                    roomId: room.id,
                    userId: ownerId,
                    role: 'member',
                    isBanned: false,
                    isMuted: false
                },
                {
                    roomId: room.id,
                    userId: data.memberId as string,
                    role: 'member',
                    isBanned: false,
                    isMuted: false
                }
             ]
        })
    }

    async AddMember(id: string, data: AddMember) {
        if (id){
            const membership = await this.prisma.room.findUnique({
                where: {id: data.roomId}
            }).membership({where: {userId: id}}) 

            if(membership)
                if (membership[0].role != 'member'){
                    await this.prisma.membership.create({
                        data: {
                            roomId: data.roomId,
                            userId: data.userId as string,
                            role: 'member',
                            isBanned: false,
                            isMuted: false
                        }
                    })
                }
        }
    }

    async CreateChannel(ownerId: string, data: CreateChannel) {
        const room = await this.prisma.room.create({
            data: {
                name: data.name as string,
                image: data.image as string,
                type: data.type as string,
                ownerId: ownerId,
                isChannel: true,
            }
        })

        const createMembers = []
        for (const member of data.members){
            const {userId, role} = member
            const createMember = await this.prisma.membership.createMany({
                data: {
                    roomId: room.id,
                    userId: userId as string,
                    role: role as string,
                    isBanned: false,
                    isMuted: false
                }
            })
            createMembers.push(createMember)
        }
        //hash password
        //upload image

    }
    
    
    async kick(ownerId: string, roomId: number, memberId: number){
        const member = await this.prisma.room.findUnique({
            where: {id:  roomId}
        }).membership({where: {userId: ownerId}}) 
        if(member)
        {
            //need membership id
            if(member[0].role != 'member')
                await this.prisma.membership.delete({where: {id:  memberId}})
        }

        
    }

    async leaveChannel(membershipId: number){
        const membership = await this.prisma.membership.findUnique({where: {id: membershipId}})
        this.deleteMembership(membershipId)
        if(membership?.role === 'owner')
        {
            //set owner
            const newOwner = await this.prisma.membership.findFirst({
                where: {roomId: membership.roomId}
            })

            if (newOwner){
                await this.prisma.membership.update({
                    where: {id: newOwner.id},
                    data: {
                        role: 'owner'
                    }
                })

                await this.prisma.room.update({
                    where: {id: membership.roomId},
                    data: {ownerId: newOwner.userId}
                })
            }
        }
        
    }

    async setAdmin(id : string, membershipId: number){

        const membership = await this.prisma.membership.findUnique({where: {id: membershipId}})
        const owner = await this.prisma.room.findFirst({where:{
            AND:[
                {id: membership?.roomId},
                {ownerId: id}
            ]
        }})
        if(owner){
            await this.prisma.membership.update({where: {id: membershipId},
            data: {role: 'admin'}})
        }
        else
            throw new UnauthorizedException('User Is Not Owner')
    }

    async changePrivacy(roomId: number, id: string, type: string){
        //check if type is protected and add password
        await this.prisma.room.update({
            where: {id: roomId},
            data: {type: type}
        })
    }


    // async UpdateChennel(room : UpdateChannel){
    //     const {name, image, type, password} = room
    //     await this.prisma.room.update({where: {id: room.roomId},
    //         data: room  
    //     })
    // }

    async deleteMembership(id: number){
        await this.prisma.membership.delete({
            where: {id: id}
        })
    }

    async deleteRoom(id: number){
        await this.prisma.room.delete({where: {id: id}})
    }

    async deleteMessages(roomId: number, memberId: string){
        await this.prisma.message.deleteMany({
            where:{
                AND:[
                    {roomId: roomId},
                    {userId: memberId}
                ]
            }
        })
    }
}