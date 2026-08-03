import { heroes } from '../src/data/heroes';
import {
  EFFECT_TYPES,
  EFFECT_UNITS,
  FACTIONS,
  POSITIONS,
  RARITIES,
  TACTICAL_ROLES,
} from '../src/types/hero';

type DataRecord = Record<string, unknown>;

function isRecord(value: unknown): value is DataRecord {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function hasString(value: unknown): value is string {
  return typeof value === 'string' && value.length > 0;
}

function validateCodeArray(
  value: unknown,
  validCodes: readonly string[],
  path: string,
  errors: string[],
): void {
  if (!Array.isArray(value)) {
    errors.push(`${path} must be an array`);
    return;
  }

  for (const code of value) {
    if (typeof code !== 'string' || !validCodes.includes(code)) {
      errors.push(`${path} contains invalid value ${String(code)}`);
    }
  }
}

export function validateHeroes(input: readonly unknown[]): string[] {
  const errors: string[] = [];
  const heroIds = new Set<string>();

  for (const [heroIndex, value] of input.entries()) {
    if (!isRecord(value)) {
      errors.push(`hero ${heroIndex} must be an object`);
      continue;
    }

    const id = value.id;
    const path = hasString(id) ? id : `hero ${heroIndex}`;
    if (!hasString(id)) errors.push(`${path} has an empty id`);
    else if (heroIds.has(id)) errors.push(`${id} has a duplicate hero id`);
    else heroIds.add(id);

    if (typeof value.faction !== 'string' || !new Set<string>(FACTIONS).has(value.faction)) {
      errors.push(`${path} has invalid faction ${String(value.faction)}`);
    }
    if (typeof value.rarity !== 'string' || !new Set<string>(RARITIES).has(value.rarity)) {
      errors.push(`${path} has invalid rarity ${String(value.rarity)}`);
    }
    validateCodeArray(value.positions, POSITIONS, `${path}.positions`, errors);
    validateCodeArray(value.tacticalRoles, TACTICAL_ROLES, `${path}.tacticalRoles`, errors);

    if (!Array.isArray(value.worldSkills)) {
      errors.push(`${path}.worldSkills must be an array`);
      continue;
    }
    if (value.worldSkills.length !== 3) {
      errors.push(`${path} must contain exactly three world skills`);
    }

    const slots = new Set<number>();
    for (const skillValue of value.worldSkills) {
      if (!isRecord(skillValue)) {
        errors.push(`${path} has an invalid world skill`);
        continue;
      }
      const slot = skillValue.slot;
      if (typeof slot !== 'number' || ![1, 2, 3].includes(slot)) {
        errors.push(`${path} has invalid world skill slot ${String(slot)}`);
      } else if (slots.has(slot)) {
        errors.push(`${path} has duplicate world skill slot ${slot}`);
      } else {
        slots.add(slot);
      }

      if (!hasString(skillValue.description)) {
        errors.push(`${path} slot ${String(slot)} has an empty description`);
      }
      if (!Array.isArray(skillValue.effects)) {
        errors.push(`${path} slot ${String(slot)} effects must be an array`);
        continue;
      }

      for (const effectValue of skillValue.effects) {
        if (!isRecord(effectValue)) {
          errors.push(`${path} slot ${String(slot)} has an invalid effect`);
          continue;
        }
        if (typeof effectValue.type !== 'string' || !new Set<string>(EFFECT_TYPES).has(effectValue.type)) {
          errors.push(`${path} slot ${String(slot)} has invalid effect type ${String(effectValue.type)}`);
        }
        if (effectValue.value !== undefined &&
          (typeof effectValue.value !== 'number' || !Number.isFinite(effectValue.value))) {
          errors.push(`${path} slot ${String(slot)} has invalid effect value`);
        }
        if (effectValue.unit !== undefined &&
          (typeof effectValue.unit !== 'string' || !new Set<string>(EFFECT_UNITS).has(effectValue.unit))) {
          errors.push(`${path} slot ${String(slot)} has invalid effect unit ${String(effectValue.unit)}`);
        }
      }
    }
  }

  for (const [heroIndex, value] of input.entries()) {
    if (!isRecord(value) || !Array.isArray(value.synergyPartnerIds)) continue;
    const id = hasString(value.id) ? value.id : `hero ${heroIndex}`;
    for (const partnerId of value.synergyPartnerIds) {
      if (!hasString(partnerId) || !heroIds.has(partnerId)) {
        errors.push(`${id} references missing synergy partner ${String(partnerId)}`);
      } else if (partnerId === id) {
        errors.push(`${id} cannot be its own synergy partner`);
      }
    }
  }

  return errors;
}

if (import.meta.main) {
  const errors = validateHeroes(heroes);
  if (errors.length > 0) {
    console.error(errors.join('\n'));
    process.exit(1);
  }
  console.log(`Validated ${heroes.length} heroes successfully.`);
}
