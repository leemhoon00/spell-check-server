import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RiotService {
  private header: { 'X-Riot-Token': string };
  private asiaUrl = 'https://asia.api.riotgames.com';
  private krUrl = 'https://kr.api.riotgames.com';

  constructor(private configService: ConfigService) {
    const apiKey = this.configService.get<string>('API_KEY');
    if (!apiKey) {
      throw new Error('API_KEY is not defined');
    }
    this.header = {
      'X-Riot-Token': apiKey,
    };
  }

  async getPuuidByNameAndTag(name: string, tag: string) {
    const result = await fetch(
      this.krUrl + '/riot/account/v1/accounts/by-riot-id/' + name + '/' + tag,
      {
        method: 'GET',
        headers: this.header,
      },
    );
    return await result.json();
  }
}
