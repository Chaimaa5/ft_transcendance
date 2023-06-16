import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { UpdateUserDTO } from './dto/updatedto.dto'

@Injectable()
export class UserService {
    constructor(){}


    UpdateUser(id: string, UserData: UpdateUserDTO) {
        const prisma = new PrismaClient();
        return prisma.user.update({where: {id: id}, data: UserData as any});
    }

    async UpdateRefreshToken(id: string, Rt: string) {
        const prisma = new PrismaClient();
        return prisma.user.update({where: {id: id}, data: {refreshToken : Rt}});
    }

    GetMany(id: string, UserData: UpdateUserDTO) {
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

}
