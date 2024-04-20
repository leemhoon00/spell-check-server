import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RiotModule } from './riot/riot.module';
import { MatchModule } from './match/match.module';
import { PrismaModule } from './prisma/prisma.module';
import { EventsModule } from './events/events.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      cache: true,
    }),
    RiotModule,
    MatchModule,
    PrismaModule,
    EventsModule,
  ],
})
export class AppModule {}
