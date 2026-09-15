import { heroRecords } from '../src/data/hero-records';
import { resolveHeroes } from '../src/data/resolve-heroes';
import { skillCatalog } from '../src/data/skill-catalog';
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

export function validateStoredData(
  records: readonly unknown[],
  catalog: Readonly<Record<string, unknown>>,
): string[] {
  const errors: string[] = [];
  const ids = new Set<string>();
  const effectCodes = new Set<string>(EFFECT_TYPES);
  const unitCodes = new Set<string>(EFFECT_UNITS);

  for (const [skillId, value] of Object.entries(catalog)) {
    if (!skillId.trim()) errors.push('world skill catalog has an empty id');
    if (!isRecord(value) || !hasString(value.description) || !Array.isArray(value.effects)) {
      errors.push(`${skillId} has invalid skill definition`);
      continue;
    }
    for (const effect of value.effects) {
      if (!isRecord(effect) || !hasString(effect.type) || !effectCodes.has(effect.type)) {
        errors.push(`${skillId} has invalid effect type ${isRecord(effect) ? String(effect.type) : String(effect)}`);
        continue;
      }
      if (effect.value !== undefined && (typeof effect.value !== 'number' || !Number.isFinite(effect.value))) {
        errors.push(`${skillId} has invalid effect value`);
      }
      if (effect.unit !== undefined && (typeof effect.unit !== 'string' || !unitCodes.has(effect.unit))) {
        errors.push(`${skillId} has invalid effect unit ${String(effect.unit)}`);
      }
    }
  }

  for (const [index, value] of records.entries()) {
    if (!isRecord(value)) {
      errors.push(`hero ${index} must be an object`);
      continue;
    }
    const id = hasString(value.id) ? value.id : `hero ${index}`;
    if (!hasString(value.id)) errors.push(`${id} has an empty id`);
    else if (ids.has(id)) errors.push(`${id} has a duplicate hero id`);
    ids.add(id);
    if (!hasString(value.name)) errors.push(`${id} has an empty name`);
    if (typeof value.faction !== 'string' || !new Set<string>(FACTIONS).has(value.faction)) errors.push(`${id} has invalid faction`);
    if (typeof value.rarity !== 'string' || !new Set<string>(RARITIES).has(value.rarity)) errors.push(`${id} has invalid rarity`);
    validateCodeArray(value.positions, POSITIONS, `${id}.positions`, errors);
    validateCodeArray(value.tacticalRoles, TACTICAL_ROLES, `${id}.tacticalRoles`, errors);
    if (!Array.isArray(value.worldSkillIds) || value.worldSkillIds.length !== 3) {
      errors.push(`${id} must contain exactly three world skill IDs`);
    } else for (const [slot, skillId] of value.worldSkillIds.entries()) {
      if (!hasString(skillId) || !Object.hasOwn(catalog, skillId)) errors.push(`${id} slot ${slot + 1} references missing world skill ${String(skillId)}`);
    }
    if (!Array.isArray(value.tags) || value.tags.some((tag) => !hasString(tag))) errors.push(`${id} has invalid tags`);
    if (!Array.isArray(value.synergyPartnerIds)) errors.push(`${id} synergyPartnerIds must be an array`);
  }
  for (const value of records) {
    if (!isRecord(value) || !Array.isArray(value.synergyPartnerIds)) continue;
    const id = String(value.id);
    for (const partnerId of value.synergyPartnerIds) {
      if (!hasString(partnerId) || !ids.has(partnerId)) errors.push(`${id} references missing synergy partner ${String(partnerId)}`);
      else if (partnerId === id) errors.push(`${id} cannot be its own synergy partner`);
    }
  }
  return errors;
}

if (import.meta.main) {
  const storedErrors = validateStoredData(heroRecords, skillCatalog);
  const errors = storedErrors.length > 0
    ? storedErrors
    : validateHeroes(resolveHeroes(heroRecords, skillCatalog));
  if (errors.length > 0) {
    console.error(errors.join('\n'));
    process.exit(1);
  }
  console.log(`Validated ${heroRecords.length} heroes and ${Object.keys(skillCatalog).length} world skill definitions successfully.`);
}
