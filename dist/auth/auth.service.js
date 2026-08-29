var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
let AuthService = class AuthService {
    prisma;
    jwtService;
    constructor(prisma, jwtService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
    }
    async register(registerDto) {
        const { email, phoneNumber, password, ...rest } = registerDto;
        const existingUser = await this.prisma.user.findFirst({
            where: {
                OR: [{ email }, { phoneNumber }],
            },
        });
        if (existingUser) {
            if (existingUser.email === email) {
                throw new ConflictException('Email already exists');
            }
            throw new ConflictException('Phone number already exists');
        }
        const hashedPassword = await argon2.hash(password);
        const user = await this.prisma.user.create({
            data: {
                email,
                phoneNumber,
                password: hashedPassword,
                ...rest,
            },
        });
        const payload = { sub: user.id, email: user.email };
        const accessToken = this.jwtService.sign(payload);
        const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });
        const { password: _, ...userWithoutPassword } = user;
        return {
            status: 'success',
            message: 'User registered successfully',
            data: {
                user: userWithoutPassword,
                tokens: {
                    accessToken,
                    refreshToken,
                },
            },
        };
    }
};
AuthService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService,
        JwtService])
], AuthService);
export { AuthService };
//# sourceMappingURL=auth.service.js.map