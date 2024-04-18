import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Participant } from './types';

@Injectable()
export class RiotService {
  private header: { 'X-Riot-Token': string };
  private asiaUrl = 'https://asia.api.riotgames.com';
  private krUrl = 'https://kr.api.riotgames.com';

  constructor(private configService: ConfigService) {
    const apiKey = this.configService.get<string>('RIOT_API_KEY');
    if (!apiKey) {
      throw new Error('API_KEY is not defined');
    }
    this.header = {
      'X-Riot-Token': apiKey,
    };
  }

  async getPuuidByNameAndTag(name: string, tag: string): Promise<string> {
    const result = await fetch(
      this.asiaUrl + '/riot/account/v1/accounts/by-riot-id/' + name + '/' + tag,
      {
        method: 'GET',
        headers: this.header,
      },
    );
    if (result.status === 404) {
      throw new Error('User Not Found');
    }
    const data = await result.json();
    return data.puuid;
  }

  async getMatchByPuuid(puuid: string): Promise<Participant[]> {
    const result = await fetch(
      this.krUrl + '/lol/spectator/v5/active-games/by-summoner/' + puuid,
      {
        method: 'GET',
        headers: this.header,
      },
    );
    if (result.status === 404) {
      throw new Error('Match Not Found');
    }
    const data = await result.json();
    return data.participants.map((participant: any) => {
      return {
        championId: participant.championId,
        parkIds: participant.perks.perkIds,
        teamId: participant.teamId,
        puuid: participant.puuid,
        spell1Id: participant.spell1Id,
        spell2Id: participant.spell2Id,
      };
    });
  }
}
