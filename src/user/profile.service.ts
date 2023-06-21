import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';


@Injectable()
export class ProfileService {
    prisma = new PrismaClient();
    constructor(){}

    async bestRanked() {
       return await this.prisma.user.findMany({
        take: 5,
        orderBy: {
            XP: 'desc',
        },
        select: {
            username: true,
            avatar: true,
            XP: true,
            level: true,
            topaz: true,
        }

       });
    }
    async getUser(id : string) {
        return await this.prisma.user.findFirst({
            where: {id: id},
            select: {
                username: true,
                avatar: true,
                XP: true,
                level: true,
                win: true,
                loss: true,
                games: true,
                badge: true,
            }
    
           });
           
    }


    async NavBar(id : string) {
        return await this.prisma.user.findFirst({
            where: {id: id},
            select: {
                XP: true,
                level: true,
            }
           });
    }
    async getStatus(id : string) {
        return await this.prisma.user.findFirst({
            where: {id: id},
            select: {
                username: true,
                // status: true,
            }
    
           });
    }
    
    
    
}
