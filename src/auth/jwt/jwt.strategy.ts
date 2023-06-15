import { Injectable } from "@nestjs/common";
import { PassportStrategy} from "@nestjs/passport";
import { PrismaClient } from "@prisma/client";
import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy, 'jwt'){
     constructor(){
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([(request:Request) => {
                let data = request?.cookies["access_token"];
                return data.token
            } ]),
            secretOrKey: process.env.JWT_REFRESH_SECRET,
          });
    }

    async validate(payload: JwtPayload){
        const prisma = new PrismaClient();
        const user = await prisma.user.findUnique({
            where:{id: parseInt(payload.id, 10),},
        });
        return{user, payload};
    }
}