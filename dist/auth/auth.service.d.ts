import { PrismaService } from '../prisma/prisma.service.js';
import { RegisterDto } from './dto/register.dto.js';
import { LoginDto } from './dto/login.dto.js';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private prisma;
    private jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    register(registerDto: RegisterDto): Promise<{
        status: string;
        message: string;
        data: {
            user: {
                firstName: string;
                lastName: string;
                age: number;
                email: string;
                phoneNumber: string;
                favouriteTeamId: string | null;
                nationalityId: string | null;
                id: number;
                createdAt: Date;
                updatedAt: Date;
            };
            tokens: {
                accessToken: string;
                refreshToken: string;
            };
        };
    }>;
    login(loginDto: LoginDto): Promise<{
        status: string;
        message: string;
        data: {
            user: {
                firstName: string;
                lastName: string;
                age: number;
                email: string;
                phoneNumber: string;
                favouriteTeamId: string | null;
                nationalityId: string | null;
                id: number;
                createdAt: Date;
                updatedAt: Date;
            };
            tokens: {
                accessToken: string;
                refreshToken: string;
            };
        };
    }>;
}
