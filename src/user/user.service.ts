import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { UpdateUserDTO } from './dto/updatedto.dto'

@Injectable()
export class UserService {
    constructor(){}


    UpdateUser(id: number, UserData: UpdateUserDTO) {
        const prisma = new PrismaClient();
        return prisma.user.update({where: {id: id}, data: UserData as any});
    }

    async UpdateRefreshToken(id: number, Rt: string) {
        const prisma = new PrismaClient();
        return prisma.user.update({where: {id: id}, data: {refreshToken : Rt}});
    }

    GetMany(id: number, UserData: UpdateUserDTO) {
        const prisma = new PrismaClient();
        return prisma.user.findMany();
    }
    DeleteUser(id: number) {
        const prisma = new PrismaClient();
        return prisma.user.delete({where: {id}});
    }
    async FindbyID(id: number) {
        const prisma = new PrismaClient();
        return prisma.user.findUnique({where:  {id}});
    }

}
