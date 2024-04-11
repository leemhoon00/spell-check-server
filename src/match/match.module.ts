import { Module } from '@nestjs/common';
import { MatchController } from './match.controller';
import { MatchService } from './match.service';
import { RiotModule } from 'src/riot/riot.module';

@Module({
  imports: [RiotModule],
  controllers: [MatchController],
  providers: [MatchService],
})
export class MatchModule {}
