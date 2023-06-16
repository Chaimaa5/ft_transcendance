import { Controller, Get,  UseGuards,  Res, Req} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
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
        await this.authservice.signIn(res, req);
    }

    @Get('/refresh')
    @UseGuards(AuthGuard('jwt'))
    async RefreshToken(@Req() req: Request, @Res() res: Response){
        await this.authservice.RefreshTokens(req, res);
    }
    
    @Get('/logout')
    async handleLogout(@Req() req: Request, @Res() res: Response){
        this.authservice.signOut(res);
    }

}
