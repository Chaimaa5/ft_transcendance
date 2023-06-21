import { Body, Controller, Delete, Get, Param, Post, Put, Req } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { Request } from 'express';
@Controller('profile')
export class UserController {
    constructor(private readonly profile: ProfileService){}

    @Get('/bestranked')
    async bestRanked() {
        return this.profile.bestRanked();
    }

    @Get('/user/:id')
    async getUser(@Param('id') id: string) {
        return this.profile.getUser(id);
    }

    //best 5 ranked
    // level and xp
    // friends with status
    // username games wiins losses + lv  + xp acheivments
}


