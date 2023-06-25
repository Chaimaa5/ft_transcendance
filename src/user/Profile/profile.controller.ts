import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { User } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';
@Controller('profile')
@ApiTags('profile')
@UseGuards(AuthGuard('jwt'))
export class ProfileController {
    constructor(private readonly profile: ProfileService){}

    //Home
    @Get('/bestranked')
    async bestRanked() {
        return this.profile.bestRanked();
    }
    
    // @Get('/userstatistics/')
    // async UserStatistics(@Req() req: Request) {
        //     const user : User = req.user as User;
        //     return this.profile.UserStatistics(user.id);
        // }
        
        // @Get('/statistics/')
        // async Statistics(@Req() req: Request) {
            //     const user : User = req.user as User;
            //     return this.profile.Statistics(user.id);
            // }
            
            @Get('/navbar/')
            async NavBar(@Req() req: Request) {
                const user : User = req.user as User;
                return this.profile.NavBar(user.id);
            }
            
            @Get('/onlinefriends/')
            async OnlineFriends(@Req() req: Request) {
                const user : User = req.user as User;
                return this.profile.OnlineFriends(user.id);
            }
            
    //---------Profile
    @Get('')
    async Profile(@Req() req: Request){
        const user : User = req.user as User;
        return this.profile.Profile(user.id);
    }
    //Acheivments
    @Get('/badges')
    async Badges(@Req() req: Request){
        const user : User = req.user as User;
        return this.profile.Badges(user.id);
    }
    //user data of number of games
    @Get('/games')
    async Games(@Req() req: Request){
        const user : User = req.user as User;
        return this.profile.Games(user.id);
    }
    //Percentage in profile
    @Get('/statistics')
    async Statistics(@Req() req: Request){
        const user : User = req.user as User;
        return this.profile.CalculatePercentage(user.id);
    }
    //MatchHistory --- Not Complete
    @Get('/history')
    async MatchHistory(@Req() req: Request){
        const user : User = req.user as User;
        return this.profile.MatchHistory(user.id);
    }
    //List of friends in profile
    @Get('/friends')
    async Friends(@Req() req: Request){
        const user : User = req.user as User;
        return this.profile.Friends(user.id);
    }


}


