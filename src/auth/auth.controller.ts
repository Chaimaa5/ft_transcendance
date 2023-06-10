import { Controller, Get,  UseGuards,  Res, Req} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
// import { AuthService } from './auth.service';
import { Request, Response } from 'express';
// import { JwtPayload } from 'jsonwebtoken';


@Controller('')
export class AuthController {
    // jwtService: any;
    // constructor(private readonly authservice: AuthService){}
    @Get('/login')
    @UseGuards(AuthGuard('42'))
    handleLogin(){
        return {msg: 'Google auth'};
    }
    @Get('/redirect')
    @UseGuards(AuthGuard('42'))
    async handleRedirect(){
        return {messgae: 'success'};
        // const user: any = req.user;
        // const payload: JwtPayload = { username: user.username }; // Customize the payload as per your requirements
        // console.log(user.username);
    //     const jwt = this.jwtService.sign(payload);
    // //    const jwt = await this.authservice.login(req.user);
    //    res.set('authorization', jwt.access_token);
    //    res.json(req.user);
    }
    //    @Get('/test')
    //     @UseGuards(AuthGuard('jwt'))
    //     async test(@Res() res: Response){
    //         res.json('success');
    //     }
}
