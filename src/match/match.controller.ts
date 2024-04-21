import { Controller, Get, Query, HttpException } from '@nestjs/common';
import { MatchService } from './match.service';

@Controller('match')
export class MatchController {
  constructor(private matchService: MatchService) {}

  @Get()
  async getMatch(@Query('fullname') fullname: string) {
    try {
      return await this.matchService.createMatch(fullname);
    } catch (e) {
      if (e instanceof Error) {
        if (e.message === 'User Not Found') {
          throw new HttpException('User Not Found', 404);
        } else if (e.message === 'Match Not Found') {
          throw new HttpException('Match Not Found', 404);
        } else {
          console.error(e);
          throw new HttpException('Internal Server Error', 500);
        }
      }
    }
  }
}
