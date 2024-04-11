import { Controller, Get, Query, HttpException } from '@nestjs/common';
import { MatchService } from './match.service';

@Controller('match')
export class MatchController {
  constructor(private matchService: MatchService) {}

  @Get()
  async getMatch(@Query('fullname') fullname: string) {
    try {
      return await this.matchService.getMatchByFullname(fullname);
    } catch (e) {
      if (e instanceof Error) {
        throw new HttpException(e.message, 404);
      }
    }
  }
}
