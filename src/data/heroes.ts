import { heroRecords } from './hero-records';
import { resolveHeroes } from './resolve-heroes';
import { skillCatalog } from './skill-catalog';

/** Expanded view used by cards and filters; only records and catalog are stored. */
export const heroes = resolveHeroes(heroRecords, skillCatalog);
