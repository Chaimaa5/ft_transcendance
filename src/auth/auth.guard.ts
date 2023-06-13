// import { ExecutionContext, Injectable } from "@nestjs/common";
// import { AuthGuard } from "@nestjs/passport";
// // import { JwtService } from '@nestjs/jwt';
// @Injectable()
// export class FortyTwoAuthGuard extends AuthGuard('42') {
//     // constructor(private readonly jwtService: JwtService) { super(); }
//     async canActive(context: ExecutionContext) {
//         console.log("here");
//         const activate = (await super.canActivate(context)) as boolean;
//         const request = context.switchToHttp().getRequest();
//         const user = request.user;
//         console.log(user);
//         // const payload = {userId: user.id};
//         // const jwtToken = this.generateToken(payload);
//         // console. log(jwtToken);
//         return true;
//     }

//     // async generateToken(payload: any): Promise<string> {
//     //     const token = await this.jwtService.signAsync(payload);
//     //     console.log(token);
//     //     return token;
//     // }
// }
