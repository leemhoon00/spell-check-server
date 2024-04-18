export type Champion = {
  id: string;
  key: string;
};

export type Spell = {
  id: string;
  name: string;
  cooldown: [number];
  key: string;
};
