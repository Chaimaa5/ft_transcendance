import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaClient } from '@prisma/client';
import { JwtPayload, VerifyOptions } from 'jsonwebtoken';
import { Request, Response } from 'express';
import * as crypto from 'crypto';
import { UserService } from 'src/user/user.service';
import { ConfigService } from 'src/config/config.service';


@Injectable()
export class AuthService {
    
    constructor(private readonly jwtService: JwtService, private readonly userService: UserService,
        private configService: ConfigService ){}
    secretKey = 'process.env.JWT_REFRESH_SECRET';
    async CreateUser(user: any)
    {
        const prisma = new PrismaClient();
        
        const UserExists = await prisma.user.findUnique({
            where:{id: parseInt(user.id, 10),},
        });
        if(UserExists){
            console.log('User already exists');
            return user;
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
            return user;
        }
        return false;
    }
    
    async findUser(user: any) {
        const UserExists = await this.CreateUser(user);
        return UserExists;
    }
    encryptToken(token: string) {
        const cipher = crypto.createCipher('aes-256-cbc', this.secretKey);
        let encrypted = cipher.update(JSON.stringify(token), 'utf8', 'hex');
        encrypted += cipher.final('hex');
        return encrypted;
      }
      
      // Decrypt and retrieve the original payload
    decryptToken(encryptedToken: string) {
        const decipher = crypto.createDecipher('aes-256-cbc', this.secretKey);
        let decrypted = decipher.update(encryptedToken, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        return JSON.parse(decrypted);
    }

    generateToken(user: any) : string {
        const payload: JwtPayload = {id: user.id,  username: user.username }; 
        return this.jwtService.sign(payload);
    }

    generateRefreshToken(user: any) : string  {
        const payload: JwtPayload = {id: user.id,  username: user.username }; 
        return this.jwtService.sign(payload, {expiresIn: '30d'});
    }

    async signIn(res: Response, req: Request) {
        //check is a user
        const check = await this.findUser(req.user);
        const Access_Token = this.generateToken(req.user);
        const Refresh_Token = this.generateRefreshToken(req.user);
        res.cookie('access_token', Access_Token, {httpOnly: true, secure: true,});
        res.cookie('refresh_token', Refresh_Token, {httpOnly: true, secure: true,});
        const encryptedToken = this.encryptToken(Refresh_Token);
        this.userService.UpdateRefreshToken(parseInt(check.id, 10) , encryptedToken)
        res.redirect('http://localhost:5173/home');
    }

    signOut(res: Response) {
        res.clearCookie('access_token');
        res.clearCookie('refresh_token');
        res.redirect('http://localhost:5173/login');
    } 

    async RefreshTokens(req: Request, res: Response) {
        const user = await this.findUser(req.user);
        if (!user)
            throw new ForbiddenException('Access Denied');
        const decryptedToken = this.decryptToken(user.refreshToken);
        const decodedToken = this.jwtService.verify(decryptedToken) ;
        const cookieToken = this.jwtService.verify(req.cookies['refresh_token']);
        if (decodedToken != cookieToken)
            throw new ForbiddenException('Access Denied');
        else{
            const Access_Token = this.generateToken(req.user);
            const Refresh_Token = this.generateRefreshToken(req.user);
            res.cookie('access_token', Access_Token, {httpOnly: true, secure: true,});
            res.cookie('refresh_token', Refresh_Token, {httpOnly: true, secure: true,});
            const encryptedToken = this.encryptToken(Refresh_Token);
            this.userService.UpdateRefreshToken(parseInt(user.id, 10) , encryptedToken)
        }
    }
}


