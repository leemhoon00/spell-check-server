import { Champion, Spell } from './types';

const API_URL = 'https://ddragon.leagueoflegends.com';
const lang_code = 'ko_KR';

export async function getVersion(): Promise<string> {
  const result = await fetch(`${API_URL}/api/versions.json`);
  const versions = await result.json();
  return versions[0];
}

export async function getChampionList(version: string): Promise<Champion[]> {
  const result = await fetch(
    `${API_URL}/cdn/${version}/data/${lang_code}/champion.json`,
  );
  const { data } = await result.json();
  return Object.values(data);
}

export async function getSpellList(version: string): Promise<Spell[]> {
  const result = await fetch(
    `${API_URL}/cdn/${version}/data/${lang_code}/summoner.json`,
  );
  const { data } = await result.json();
  return Object.values(data);
}
