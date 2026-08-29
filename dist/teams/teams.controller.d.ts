import { TeamsService } from './teams.service.js';
export declare class TeamsController {
    private readonly teamsService;
    constructor(teamsService: TeamsService);
    findAll(): Promise<{
        status: string;
        data: {
            teams: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                nameEn: string;
                nameAr: string;
                shortName: string;
                logo: string;
            }[];
        };
    }>;
    findOne(id: string): Promise<{
        status: string;
        data: {
            team: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                nameEn: string;
                nameAr: string;
                shortName: string;
                logo: string;
            } | null;
        };
    }>;
}
