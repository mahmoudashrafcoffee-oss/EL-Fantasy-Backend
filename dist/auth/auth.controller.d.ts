import { AuthService } from './auth.service.js';
import { RegisterDto } from './dto/register.dto.js';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
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
}
