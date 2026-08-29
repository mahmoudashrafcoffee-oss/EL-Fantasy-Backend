import { Controller, Get, Param } from '@nestjs/common';
import { TeamsService } from './teams.service.js';

@Controller('api/v1/teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @Get()
  async findAll() {
    const teams = await this.teamsService.findAll();
    return {
      status: 'success',
      data: {
        teams,
      },
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const team = await this.teamsService.findOne(id);
    return {
      status: 'success',
      data: {
        team,
      },
    };
  }
}
