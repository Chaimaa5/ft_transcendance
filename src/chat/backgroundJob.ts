import { PrismaClient } from "@prisma/client"

    const prisma = new PrismaClient

    async function updateMutes(){
        const time = new Date();

        const expiredMute = await this.prisma.membership.findMany({
            where: {
                isMuted: true,
                muteExpiration: {
                    lte: time.toString()
                }
            }
        })


        for (const mute of expiredMute){
            await this.prisma.membership.update({
                where: {
                    AND: [
                        {roomId: mute.roomId},
                        {userId: mute.userId}
                    ]
                },
                data: {
                    isMuted: false,
                    muteExpiration: null
                }
            });
        }
    }

    export default updateMutes;
    //run it in the app main
    // setInterval(updateMutes, 10 * 60 * 1000)