import { ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaClient, User } from '@prisma/client';
import { JwtPayload } from 'jsonwebtoken';

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService){}
    
    async CreateUser(user: any)
    {
        const prisma = new PrismaClient();
        const UserExists = await prisma.user.findUnique({
            where:{id: parseInt(user.id, 10),},
        });
        if(UserExists){
            console.log('User already exists');
        }
        else{
              const newUser = await prisma.user.create({
                data:{
                    id: parseInt(user.id, 10),
                    username: user.username,
                    fullname: user.fullname,
                    avatar: user.avatar,        // Add the required properties
                    TFA: false,
                    TFASecret: '',
                    XP: 0,
                    win: 0,
                    loss: 0,
                    draw: 0,
                    badge: '',
                    createdAt: new Date(),
                }
            });
            return true;
        }
        return false;
    }
    
    async findUser(user: any) {
        const UserExists = await this.CreateUser(user);
        // const payload: JwtPayload = {id: user.id,  username: user.username }; 
        // if (UserExists)
        //     this.generateToken(payload);
    }

    generateToken(user: any) : string {
        const payload: JwtPayload = {id: user.id,  username: user.username }; 
        return this.jwtService.sign(payload);
    }


    // async signOut(){
    //     res.clearCookie('');
    // }    
}


