import type { EffectType, Faction, Position, Rarity, TacticalRole } from '../types/hero';

export const factionLabels: Record<Faction, string> = {
  truth: '真理 Truth',
  prowess: '才藝 Prowess',
  passion: '熱情 Passion',
  wealth: '富饒 Wealth',
  glory: '榮耀 Glory',
};

export const positionLabels: Record<Position, string> = {
  captain: '主將',
  striker: '主攻手',
  defender: '守護者',
};

export const tacticalRoleLabels: Record<TacticalRole, string> = {
  rally: '集結',
  siege: '攻城',
  garrison: '駐防',
  assault: '突擊',
  stamina: '減體',
  general: '通用',
};

export const effectTypeLabels: Record<EffectType, string> = {
  periodicDamage: '週期傷害',
  normalAttackDamageUp: '普攻傷害增加',
  normalAttackDamageDown: '普攻傷害減少',
  skillDamageUp: '技能傷害增加',
  skillDamageDown: '技能傷害減少',
  playerDamageUp: '對其他玩家傷害增加',
  worldGuardianDamageUp: '對世界守衛傷害增加',
  marchSpeedUp: '提升行車速度',
  staminaCostDown: '減少行動力消耗',
  soloCapacityUp: '單兵出擊冒險者容量',
  rallyCapacityUp: '集結車冒險者容量',
  garrisonDamagePerSecond: '駐防建築/總部',
  buildingDamagePerSecond: '攻擊建築',
  headquartersDamagePerSecond: '攻擊總部',
};

export const rarityLabels: Record<Rarity, string> = {
  ur: 'UR',
  ssr: 'SSR',
  sr: 'SR',
  r: 'R',
};
