import { PrismaClient } from '@prisma/client';
import { getVersion, getChampionList, getSpellList } from './api';

const prisma = new PrismaClient();

async function main() {
  const version = await getVersion();

  await prisma.version.create({
    data: {
      version,
    },
  });

  const champions = await getChampionList(version);
  const championInput = champions.map((champion) => {
    return {
      name: champion.id,
      code: Number(champion.key),
    };
  });
  await prisma.champion.createMany({
    data: championInput,
    skipDuplicates: true,
  });

  const spells = await getSpellList(version);
  const spellInput = spells.map((spell) => {
    return {
      name: spell.id,
      code: Number(spell.key),
      cooldown: spell.cooldown[0],
    };
  });
  await prisma.spell.createMany({
    data: spellInput,
    skipDuplicates: true,
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
