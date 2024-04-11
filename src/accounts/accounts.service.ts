import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RiotService } from 'src/riot/riot.service';

@Injectable()
export class AccountsService {
  constructor(
    private configService: ConfigService,
    private riotService: RiotService,
  ) {}
}
