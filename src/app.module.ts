import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountsModule } from './accounts/accounts.module';
import { ConfigModule } from '@nestjs/config';
import { RiotModule } from './riot/riot.module';

@Module({
  imports: [
    AccountsModule,
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      cache: true,
    }),
    RiotModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
