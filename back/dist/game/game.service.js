"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
let GameService = exports.GameService = class GameService {
    constructor() {
        this.prisma = new client_1.PrismaClient();
    }
    async CreateTrainingMode(user, body) {
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
        });
    }
    async CreateMultiplayerMode(user, body) {
        await this.prisma.game.create({
            data: {
                playerId1: user.id,
                playerId2: body.playerId2,
                mode: 'Multiplayer',
                rounds: 3,
                maxScore: 5,
            }
        });
    }
    async CreateChallengeMode(user, body) {
        if (user) {
            const id = user.id;
            await this.prisma.game.create({
                data: {
                    playerId1: id,
                    mode: 'Challenge',
                    rounds: body.Rounds,
                    maxScore: body.Points,
                    flashyMode: body.isFlashy,
                    decreasingpaddleSize: body.PaddleSize
                }
            });
        }
    }
};
exports.GameService = GameService = __decorate([
    (0, common_1.Injectable)({})
], GameService);
//# sourceMappingURL=game.service.js.map