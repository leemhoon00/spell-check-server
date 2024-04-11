import { Module } from '@nestjs/common';
import { AccountsController } from './accounts.controller';
import { AccountsService } from './accounts.service';
import { RiotModule } from 'src/riot/riot.module';

@Module({
  imports: [RiotModule],
  controllers: [AccountsController],
  providers: [AccountsService],
})
export class AccountsModule {}
