import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-42';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class FortyTwoStrategy extends PassportStrategy(Strategy, '42') {
  constructor() {
    super({
      clientID: 'u-s4t2ud-49c2d736530779b94f8140ddc372953496ed55501ef43019c653e97dee36f776',
      clientSecret: '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',
      callbackURL: 'http://localhost:3001/redirect',
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any) {
    const prisma = new PrismaClient();

      const UserExists = await prisma.user.findUnique({
        where:{id: parseInt(profile.id, 10),},
      });
      if(UserExists){
        console.log('User already exists');
        return true;
      }
      else{
          const newUser = await prisma.user.create({
            data:{
              id: parseInt(profile.id, 10),
              username: profile.username,
              fullname: profile._json.usual_full_name,
              avatar: profile._json.image.link,        // Add the required properties
              TFA: false,
              TFASecret: '',
              XP: 0,
              win: 0,
              loss: 0,
              draw: 0,
              badge: '',
              createdAt: new Date(),
            }
          });
          console.log('New user created');
          return true;
      }
    //   console.error('Error creating user');
    // return false;
  }
}
