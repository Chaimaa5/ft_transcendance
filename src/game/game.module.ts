import { Module } from '@nestjs/common';

import { GameService } from './game.service';
import { GameController } from './game.controller';
import { GameGateway } from './game.gateway';

@Module({
  imports: [],
  controllers: [GameController ],
  //add  GameGateway
  providers: [GameService, GameGateway],
  exports: []
})
export class GameModule {}
