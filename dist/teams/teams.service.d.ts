import { PrismaService } from '../prisma/prisma.service.js';
export declare class TeamsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        nameEn: string;
        nameAr: string;
        shortName: string;
        logo: string;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        nameEn: string;
        nameAr: string;
        shortName: string;
        logo: string;
    } | null>;
}
