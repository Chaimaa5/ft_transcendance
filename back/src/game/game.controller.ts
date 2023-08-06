import {Body, Controller, Get, Post, Req, UseGuards} from "@nestjs/common";
import { GameService } from "./game.service";
// import { GameGateway } from "./game.gateway";
import { Request } from "express";
import { User } from "@prisma/client";
import { ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";

// the controller would need to call the service and then return its result to the client back to the browser
// --> but to do that the controller would need to instansiate the service class, with the help of dependency injection an instance of the service would be created for the controller
// the game service can have various functions that will manage the game and its state. (addPlayer, removePlayer, scorePoint, endGame, resetGame...)
// the game controller would handle http requests and call the service decorator 


@Controller('game')
@ApiTags('chat')
@UseGuards(AuthGuard('jwt'))
export class GameController{
	constructor(private gameService : GameService) {}

    @Post('challenge')
    async CreateChallengeMode(@Req() req: Request, @Body() body: any){
        const user : User = req.user as User
        console.log(body)
        await this.gameService.CreateChallengeMode(user, body)

    }

    @Post('training')
    async CreateTrainingMode(@Req() req: Request, @Body() body: any){
        const user : User = req.user as User
        await this.gameService.CreateTrainingMode(user, body)

    }
}