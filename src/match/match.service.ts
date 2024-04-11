import { Injectable } from '@nestjs/common';
import { RiotService } from 'src/riot/riot.service';

@Injectable()
export class MatchService {
  constructor(private riotService: RiotService) {}

  async getMatchByFullname(fullname: string) {
    const [name, tag] = fullname.split('#');
    const puuid = await this.riotService.getPuuidByNameAndTag(name, tag);

    const result = await this.riotService.getMatchByPuuid(puuid);
    // const participants = result.participants;
    return;
  }
}
