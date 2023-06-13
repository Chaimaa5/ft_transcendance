import { Controller, Get,  UseGuards,  Res, Req} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
// import { Request, Response } from 'express';
import { Request, Response } from 'express';


@Controller('')
export class AuthController {
    constructor(private readonly authservice: AuthService){}
    @Get('/login')
    @UseGuards(AuthGuard('42'))
    handleLogin(){}

    @Get('/redirect')
    @UseGuards(AuthGuard('42'))
    async handleRedirect(@Req() req: Request, @Res() res: Response){
        const UserExists = await this.authservice.findUser(req.user);
        const Token = this.authservice.generateToken(req.user);
        res.set('authorization', Token);
        res.json(req.user);
        return {messgae: 'success'};
    }

}
