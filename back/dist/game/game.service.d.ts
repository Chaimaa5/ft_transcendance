import { PrismaClient, User } from "@prisma/client";
export declare class GameService {
    prisma: PrismaClient<import(".prisma/client").Prisma.PrismaClientOptions, never, import("@prisma/client/runtime/library").DefaultArgs>;
    CreateTrainingMode(user: User, body: any): Promise<void>;
    CreateMultiplayerMode(user: User, body: any): Promise<void>;
    CreateChallengeMode(user: User, body: any): Promise<void>;
}
