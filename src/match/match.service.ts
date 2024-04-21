import { Injectable } from '@nestjs/common';
import { RiotService } from 'src/riot/riot.service';
import { MatchRepository } from './match.repository';

@Injectable()
export class MatchService {
  constructor(
    private riotService: RiotService,
    private matchRepository: MatchRepository,
  ) {}

  async createMatch(fullname: string) {
    const participants = await this.getMatchByFullname(fullname);
    const playerInput = participants.map((participant) => {
      return {
        championCode: participant.championId,
        spell1Code: participant.spell1Id,
        spell2Code: participant.spell2Id,
        runeBoost: participant.perkIds.find((perkId) => perkId === 8347)
          ? true
          : false,
      };
    });
    return this.matchRepository.createMatch(playerInput);
  }

  async getMatchByFullname(fullname: string) {
    const [name, tag] = fullname.split('#');
    const puuid = await this.riotService.getPuuidByNameAndTag(name, tag);
    return await this.riotService.getParticipantsByPuuid(puuid);
  }
}
