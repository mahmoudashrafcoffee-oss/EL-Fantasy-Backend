import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class TeamsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.team.findMany({
      orderBy: {
        nameEn: 'asc',
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.team.findUnique({
      where: { id },
    });
  }
}
