import { Module } from '@nestjs/common';
import { EventsGateway } from './events.gateway';
import { MatchModule } from 'src/match/match.module';

@Module({
  imports: [MatchModule],
  providers: [EventsGateway],
  exports: [EventsGateway],
})
export class EventsModule {}
