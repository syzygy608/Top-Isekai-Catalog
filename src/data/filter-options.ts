import { effectTypeLabels, factionLabels, positionLabels, tacticalRoleLabels } from './labels';
import type { FilterGroupKey, HeroFilters } from '../types/hero';

export interface FilterOption<K extends FilterGroupKey = FilterGroupKey> {
  value: HeroFilters[K][number];
  label: string;
}

export interface FilterGroupDefinition<K extends FilterGroupKey = FilterGroupKey> {
  key: K;
  label: string;
  options: FilterOption<K>[];
}

export const FILTER_GROUPS = [
  {
    key: 'factions',
    label: '所屬陣營',
    options: (['truth', 'prowess', 'passion', 'wealth', 'glory'] as const).map((value) => ({
      value,
      label: factionLabels[value],
    })),
  },
  {
    key: 'positions',
    label: '定位',
    options: (['captain', 'striker', 'defender'] as const).map((value) => ({
      value,
      label: positionLabels[value],
    })),
  },
  {
    key: 'tacticalRoles',
    label: '戰術場景',
    options: (['rally', 'siege', 'garrison', 'assault', 'stamina', 'general'] as const).map((value) => ({
      value,
      label: tacticalRoleLabels[value],
    })),
  },
  {
    key: 'effectTypes',
    label: '技能效果',
    options: ([
      'normalAttackDamageUp',
      'skillDamageUp',
      'playerDamageUp',
      'normalAttackDamageDown',
      'skillDamageDown',
      'marchSpeedUp',
      'soloCapacityUp',
      'rallyCapacityUp',
      'garrisonDamagePerSecond',
      'buildingDamagePerSecond',
      'headquartersDamagePerSecond',
    ] as const).map((value) => ({ value, label: effectTypeLabels[value] })),
  },
  {
    key: 'tags',
    label: '標籤',
    options: ['新手適合', '低課適合', '重課專屬', '祈願'].map((value) => ({ value, label: value })),
  },
] satisfies FilterGroupDefinition[];
