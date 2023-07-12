import { Controller, Get,  UseGuards,  Res, Req, Headers} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { ApiTags } from '@nestjs/swagger';


@Controller('')
@ApiTags('auth')

export class AuthController {
    constructor(private readonly authservice: AuthService){}
    @Get('/login')
    @UseGuards(AuthGuard('42'))
    handleLogin(){}

 
    @Get('/auth')
    @UseGuards(AuthGuard('42'))
    async handleAuth(@Req() req: Request, @Res() res: Response){
        // console.log(req.user);
       await this.authservice.signIn(res, req);
       return res.send('access');
    }

    // @Get('/redirect')
    // @UseGuards(AuthGuard('42'))
    // async handleAuth(@Req() req: Request, @Res() res: Response){
    //     // console.log(req.user);
    //    await this.authservice.signIn(res, req);
    //    return res.send('access');
    // }
    @Get('/refresh')
    @UseGuards(AuthGuard('jwt'))
    async RefreshToken(@Req() req: Request, @Res() res: Response){
        res.clearCookie('access_token');
        res.clearCookie('refresh_token');
        await this.authservice.RefreshTokens(req, res);
        return res.send('refreshed');

    }
    
    @Get('/logout')
    async handleLogout(@Req() req: Request, @Res() res: Response){
        this.authservice.signOut(res);
    }

    @Get('/enable')
    async handletfa(@Req() req: Request, @Res() res: Response){
        const qr= await this.authservice.generateQRCode(req.originalUrl);
        console.log(qr);
        return qr;
    }

}
