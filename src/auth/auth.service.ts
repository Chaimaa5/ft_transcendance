import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'jsonwebtoken';

@Injectable()
export class AuthService {
    // constructor(private readonly jwtService: JwtService){}
    
    // async login(user: any): Promise<{ access_token: string }> {
    //   const payload: JwtPayload = { username: user.username }; // Customize the payload as per your requirements
    //   const access_token = this.jwtService.sign(payload);
    //   return { access_token };
    // }


        // in the login function: const token = await this->LoginToken({id: foundUser.id, username: foundUser.username});
        // res.cookie('token', token);
        // then return res.send({message: 'Logged is succefully});
    // async LoginToken(args: {id:string, username: string}){
    //     const payload = args;

    //     console.log(payload);
    //     return this.jwt.signAsync(payload, {secret: jwtSecret})
    // }

    // async signOut(){
    //     res.clearCookie('');
    // }    
}
