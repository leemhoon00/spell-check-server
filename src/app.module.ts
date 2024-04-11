import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RiotModule } from './riot/riot.module';
import { MatchModule } from './match/match.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      cache: true,
    }),
    RiotModule,
    MatchModule,
  ],
})
export class AppModule {}
