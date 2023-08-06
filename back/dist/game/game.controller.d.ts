import { GameService } from "./game.service";
import { Request } from "express";
export declare class GameController {
    private gameService;
    constructor(gameService: GameService);
    CreateChallengeMode(req: Request, body: any): Promise<void>;
    CreateTrainingMode(req: Request, body: any): Promise<void>;
}
