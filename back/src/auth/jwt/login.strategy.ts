import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy} from "@nestjs/passport";
import { PrismaClient, User } from "@prisma/client";
import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";
import { ExtractJwt, Strategy } from "passport-jwt";
import * as jwt from 'jsonwebtoken';

@Injectable()
export class LoginStrategy extends PassportStrategy(Strategy, 'auth'){
     constructor(){
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([(request:Request) => {
                let data = request.cookies["access_token"];
                return data
            } ]),
            secretOrKey: process.env.JWT_ACCESS_SECRET,
          });
    }

    prisma = new PrismaClient();
    async validate(payload: JwtPayload){
        let auth = false
        try{
            jwt.verify(payload.token, process.env.JWT_ACCESS_SECRET as jwt.Secret)
            const user = await this.prisma.user.findUnique({
                where:{id: payload.id,},
            });
            return true

        }catch(err){
            return auth
        }
    }
}