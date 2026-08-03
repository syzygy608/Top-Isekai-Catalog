import { useCallback, useMemo, useState } from 'react';
import { EmptyState } from '../components/EmptyState';
import { FilterPanel } from '../components/FilterPanel';
import { HeroCard } from '../components/HeroCard';
import { heroes } from '../data/heroes';
import { createEmptyFilters, filterHeroes } from '../features/hero-filter/filter-heroes';
import type { FilterGroupKey, HeroFilters } from '../types/hero';
import '../index.css';

export default function App() {
  const [filters, setFilters] = useState<HeroFilters>(createEmptyFilters);
  const [isFilterExpanded, setIsFilterExpanded] = useState(true);

  const toggleSelection = useCallback(<K extends FilterGroupKey>(
    groupKey: K,
    value: HeroFilters[K][number],
  ) => {
    setFilters((previous) => {
      const current = previous[groupKey] as string[];
      const next = current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value];
      return { ...previous, [groupKey]: next };
    });
  }, []);

  const filteredHeroes = useMemo(
    () => filterHeroes(heroes, filters).sort((a, b) => a.id.localeCompare(b.id)),
    [filters],
  );
  const heroNamesById = useMemo(
    () => new Map(heroes.map((hero) => [hero.id, hero.name])),
    [],
  );

  const clearFilters = useCallback(() => setFilters(createEmptyFilters()), []);

  return (
    <main className="hero-dex">
      <header className="hero-dex__header">
        <h1 className="hero-dex__title">最強異世界 同伴圖鑑</h1>
        <p className="hero-dex__subtitle">
          依陣營、戰術定位與世界技能效果篩選你的最佳陣容，圖鑑已蒐集所有 SSR 以及特殊 SR 一位
          （更新日期：2026/07/28）
        </p>
      </header>

      <FilterPanel
        filters={filters}
        resultCount={filteredHeroes.length}
        expanded={isFilterExpanded}
        onExpandedChange={setIsFilterExpanded}
        onToggle={toggleSelection}
        onClear={clearFilters}
      />

      <section className="hero-grid" aria-label="角色篩選結果">
        {filteredHeroes.map((hero) => (
          <HeroCard
            key={hero.id}
            hero={hero}
            partnerNames={hero.synergyPartnerIds.map((id) => heroNamesById.get(id) ?? id)}
          />
        ))}
      </section>

      {filteredHeroes.length === 0 && <EmptyState onClear={clearFilters} />}

      <footer className="hero-dex__footer">
        <p className="hero-dex__subtitle">有任何錯誤或建議，請聯絡 S1 杏仁沐洛</p>
      </footer>
    </main>
  );
}
