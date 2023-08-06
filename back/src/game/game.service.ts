import { Injectable } from "@nestjs/common";
import { PrismaClient, User } from "@prisma/client";

@Injectable({})
export class GameService {

    prisma =  new PrismaClient()
    async CreateTrainingMode(user: User, body: any){
        await this.prisma.game.create({
            data: {
                playerId1: user.id,
                playerId2: '1',
                mode: 'Training',
                rounds: body.rounds,
                ballSpeed: body.ballSpeed,
                paddleSize: body.paddleSize,
                lossLimit: body.lossLimit
            }
        })
    }


    async CreateMultiplayerMode(user: User, body: any){
        await this.prisma.game.create({
            data: {
                playerId1: user.id,
                playerId2: body.playerId2,
                mode: 'Multiplayer',
                rounds: 3,
                maxScore: 5,       
            }
        })
    }
    
    async CreateChallengeMode(user: User, body: any){
        if(user){
            const id = user.id as string
            await this.prisma.game.create({
                data: {
                    playerId1: id,
                    mode: 'Challenge',
                    rounds: body.Rounds,
                    maxScore: body.Points,
                    // map: body.map,
                    // ball: body.ball,
                    flashyMode: body.isFlashy,
                    decreasingpaddleSize: body.PaddleSize
               
                }
            })
        }
    }
}