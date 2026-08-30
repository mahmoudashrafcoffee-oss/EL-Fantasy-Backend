import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { RegisterDto } from './dto/register.dto.js';
import { LoginDto } from './dto/login.dto.js';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const { email, phoneNumber, password, ...rest } = registerDto;

    // 1. Check if user already exists
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

    // 2. Hash password
    const hashedPassword = await argon2.hash(password);

    // 3. Create user
    const user = await this.prisma.user.create({
      data: {
        email,
        phoneNumber,
        password: hashedPassword,
        ...rest,
      },
    });

    // 4. Generate Tokens
    const payload = { sub: user.id, email: user.email };
    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });

    // 5. Remove password from response
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

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    // 1. Find user by email
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // 2. Verify password
    const isPasswordValid = await argon2.verify(user.password, password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // 3. Generate Tokens
    const payload = { sub: user.id, email: user.email };
    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });

    // 4. Remove password from response
    const { password: _, ...userWithoutPassword } = user;

    return {
      status: 'success',
      message: 'Logged in successfully',
      data: {
        user: userWithoutPassword,
        tokens: {
          accessToken,
          refreshToken,
        },
      },
    };
  }
}

