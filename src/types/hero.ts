export const FACTIONS = ['truth', 'prowess', 'passion', 'wealth', 'glory'] as const;
export type Faction = (typeof FACTIONS)[number];

export const RARITIES = ['ur', 'ssr', 'sr', 'r'] as const;
export type Rarity = (typeof RARITIES)[number];

export const POSITIONS = ['captain', 'striker', 'defender'] as const;
export type Position = (typeof POSITIONS)[number];

export const TACTICAL_ROLES = [
  'rally',
  'siege',
  'garrison',
  'assault',
  'stamina',
  'general',
] as const;
export type TacticalRole = (typeof TACTICAL_ROLES)[number];

export const EFFECT_TYPES = [
  'periodicDamage',
  'normalAttackDamageUp',
  'normalAttackDamageDown',
  'skillDamageUp',
  'skillDamageDown',
  'playerDamageUp',
  'worldGuardianDamageUp',
  'marchSpeedUp',
  'staminaCostDown',
  'soloCapacityUp',
  'rallyCapacityUp',
  'garrisonDamagePerSecond',
  'buildingDamagePerSecond',
  'headquartersDamagePerSecond',
] as const;
export type EffectType = (typeof EFFECT_TYPES)[number];

export const EFFECT_UNITS = ['percent', 'flat', 'seconds'] as const;
export type EffectUnit = (typeof EFFECT_UNITS)[number];

export interface WorldSkillEffect {
  type: EffectType;
  value?: number;
  unit?: EffectUnit;
  target?: string;
  condition?: string;
}

export interface WorldSkill {
  slot: 1 | 2 | 3;
  description: string;
  effects: WorldSkillEffect[];
}

export interface Hero {
  id: string;
  name: string;
  faction: Faction;
  rarity: Rarity;
  positions: Position[];
  tacticalRoles: TacticalRole[];
  worldSkills: WorldSkill[];
  tags: string[];
  synergyPartnerIds: string[];
}

export interface HeroFilters {
  factions: Faction[];
  positions: Position[];
  tacticalRoles: TacticalRole[];
  effectTypes: EffectType[];
  tags: string[];
}

export type FilterGroupKey = keyof HeroFilters;
