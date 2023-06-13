import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { UpdateUserDTO } from './dto/updatedto.dto.ts'

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaClient){}

    //Should create a DTO
    // UpdateUser(id: number, UserData: UserDTO) {
    //     return  this.prisma.update({where: {id}, data: UserData})
    // }
    GetMany() {
        return this.prisma.user.findMany();
    }
    DeleteUser(id: number) {
        return this.prisma.user.delete({where: {id}});
    }
    async FindbyID(id: number) {
        return this.prisma.user.findUnique({where:  {id}});
    }
}
