import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';


@Injectable()
export class ProfileService {
  
    prisma = new PrismaClient();
    constructor(){}

    async bestRanked() {
       return await this.prisma.user.findMany({
        take: 5,
        orderBy: {
            XP: 'desc',
        },
        select: {
            username: true,
            avatar: true,
            XP: true,
            level: true,
            topaz: true,
        }

       });
    }
    async UserStatistics(id : string) {
        return await this.prisma.user.findFirst({
            where: {id: id},
            select: {
                username: true,
                XP: true,
                level: true,
            }
           });
           
    }
    async Statistics(id : string) {
        return await this.prisma.user.findFirst({
            where: {id: id},
            select: {
                username: true,
                avatar: true,
                XP: true,
                level: true,
                win: true,
                loss: true,
                games: true,
                badge: true,
            }
    
           });
           
    }


    async NavBar(id : string) {
        return await this.prisma.user.findFirst({
            where: {id: id},
            select: {
                XP: true,
                level: true,
            }
           });
    }

    async OnlineSttus(id : string) {
        return await this.prisma.user.findFirst({
            where: {id: id},
            select: {
                username: true,
                status: true,
            }
    
           });
    }
    
    async OnlineFriends(id: string) {
        // need to exclude user
        const res = await this.prisma.friendship.findMany({
            where: {
                AND: [
                  {
                    OR: [
                      { senderId: id },
                      { receiverId: id }
                    ]
                  },
                  { status: 'accepted' }
                ],
            },
            include:{
                sender: {
                    select:{
                        status: true,
                        avatar: true,
                    },
                },
                receiver: {
                    select:{
                        status: true,
                        avatar: true
                    }
                },
            }
        });
        return res;
    }

    async Badges(id: string) {
        return await this.prisma.user.findUnique({where:{id : id},
            select: {
                badge: true,
            }
        });
    }

    async Friends(id: string) {
        const sentPromise = await this.prisma.user.findUnique({
             where: { id: id },
           }).sentFriendships({
             where: {
               status: 'accepted',
             },
             select: {
               receiver: {
                 select: {
                     id: true,
                     username: true,
                     avatar: true,
                     XP: true,
                     level: true,
                 },
               },
             },
           });
           const receivedPromise = await this.prisma.user.findUnique({
             where: { id: id },
           }).receivedFriendships({
             where: {
               status: 'accepted',
             },
             select: {
               sender: {
                 select: {
                   id: true,
                   username: true,
                   avatar: true,
                   XP: true,
                   level: true,
                 },
               },
             },
           });
           const Friendships = receivedPromise?.map((friendship) => friendship.sender);
           const Friendships2 = sentPromise?.map((friendship) => friendship.receiver);

           return{
            ...Friendships, ...Friendships2
            
        }
    }
    async MatchHistory(id: string) {
        //should add the result
       return await this.prisma.game.findMany({
        where: {
            OR: [
              { playerId1: id },
              { playerId2: id }
            ],
        },
        include: {
            player1: {
                select: {
                    username: true,
                }
            },
            player2: {
                select: {
                    username: true,
                }
            }
        },

       });
    }

    async Games(id: string) {
        return await this.prisma.user.findUnique({where:{id : id},
            select: {
                games: true,
                win: true,
                loss: true,
            }
        });
    }

    async CountFriends(id: string){
        const number = await this.prisma.friendship.count({
            where: {
                status: 'accepted',
                OR: [
                  { senderId: id },
                  { receiverId: id },
                ],
            }
        });
        return number;
    }

    async CalculatePercentage(id: string): Promise<{loss: number, win: number}>{
        const losses = await this.prisma.user.findUnique({
            where: {id: id},
            select: {
                loss: true,
            }
        }).then((user) => user?.loss ?? 0);

        const wins = await this.prisma.user.findUnique({
            where: {id: id},
            select: {
                win: true,
            }
        }).then((user) => user?.win ?? 0);
        const games = await this.prisma.user.findUnique({
            where: {id: id},
            select: {
                games: true,
            }
        }).then((user) => user?.games ?? 0);
        const winPer = games > 0 ? (wins / games) * 100 : 0;
        const lossPer = games > 0 ? (losses / games) * 100 : 0;
        const [win, loss] = await Promise.all([winPer, lossPer]);
        return {
            win: winPer,
            loss: lossPer,
        };
    }
    async Profile(id: string) {
        const friends = await this.CountFriends(id);
        const user = await this.prisma.user.findUnique({where:{id : id},
            select: {
                level: true,
                XP: true,
                rank: true,
            }
        });
        return{
            'level':user?.level,
            'xp': user?.XP,
            'rank': user?.rank,
            'friend':friends
        }
    }
    
    
}
