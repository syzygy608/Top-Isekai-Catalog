import React, { useState, useMemo, useCallback } from 'react';
import heroesData from './heroes.json';
import './index.css';

const FILTER_OPTIONS = {
  factions: ['真理 Truth', '才藝 Prowess', '熱情 Passion', '富饒 Wealth', '榮耀 Glory'],
  positions: ['主將', '主攻手', '守護者'],
  tacticalRoles: ['集結', '攻城','駐防', '突擊', '減體', '通用'],
  skillEffects: [
    '普攻傷害增加', '技能傷害增加', '對其他玩家傷害增加',
    '普攻傷害減少', '技能傷害減少', '提升行車速度',
    '單兵出擊冒險者容量', '集結車冒險者容量', '駐防建築/總部', '攻擊建築', '攻擊總部'
  ],
  tags: ['新手適合', '低課適合', '重課專屬', '祈願']
};

const FILTER_LABELS = {
  factions: '所屬陣營',
  positions: '定位',
  tacticalRoles: '戰術場景',
  skillEffects: '技能效果',
  tags: '標籤'
};

const RARITY_ACCENT = {
  'ur': '#B14C8A',
  'ssr': '#D4A843',
  'sr': '#9900FF',
  'r': '#00FFFF',
};
const DEFAULT_RARITY_ACCENT = '#8A96B3';

function getRarityColor(rarity) {
  if (!rarity) return DEFAULT_RARITY_ACCENT;
  const key = rarity.trim().toLowerCase();
  return RARITY_ACCENT[key] || DEFAULT_RARITY_ACCENT;
}
// 陣營對應色
const FACTION_ACCENT = {
  '真理 Truth': '#5B7FD4',
  '才藝 Prowess': '#B15BFF',
  '熱情 Passion': '#FF7575',
  '富饒 Wealth': '#FFFF6F',
  '榮耀 Glory': '#96FED1'
};
const DEFAULT_ACCENT = '#7C8AA5';

const FilterGroup = React.memo(function FilterGroup({ groupKey, options, currentState, onToggle }) {
  return (
    <div className="filter-row">
      <span className="filter-row__label">{FILTER_LABELS[groupKey]}</span>
      <div className="filter-row__options">
        {options.map(opt => {
          const isActive = currentState.includes(opt);
          return (
            <button
              key={opt}
              type="button"
              onClick={() => onToggle(groupKey, opt)}
              aria-pressed={isActive}
              className={`chip ${isActive ? 'chip--active' : ''}`}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
});

export default function HeroDex() {
  const [filters, setFilters] = useState({
    factions: [],
    positions: [],
    tacticalRoles: [],
    skillEffects: [],
    tags: []
  });
  const [isFilterExpanded, setIsFilterExpanded] = useState(true);

  const toggleSelection = useCallback((groupKey, value) => {
    setFilters(prev => {
      const current = prev[groupKey];
      const next = current.includes(value)
        ? current.filter(item => item !== value)
        : [...current, value];
      return { ...prev, [groupKey]: next };
    });
  }, []);

  const filteredHeroes = useMemo(() => {
      const { factions, positions, tacticalRoles, skillEffects, tags } = filters;

      const filtered = heroesData.filter(hero => {
        const matchFaction = factions.length === 0 || factions.includes(hero.faction);
        const matchPosition = positions.length === 0 ||
                  positions.some(pos => hero.tacticalRoles.includes(pos));
        const matchTactical = tacticalRoles.length === 0 ||
          tacticalRoles.some(role => hero.tacticalRoles.includes(role));
        const matchEffect = skillEffects.length === 0 ||
          skillEffects.some(selected =>
            hero.skillEffects.some(heroEffect => heroEffect.includes(selected))
          );
        const matchTags = tags.length === 0 ||
          tags.some(tag => hero.tags.includes(tag));

        return matchFaction && matchTactical && matchEffect && matchTags && matchPosition;
      });

      return filtered.sort((a, b) => a.id.localeCompare(b.id));
    }, [filters]);

  const hasActiveFilters = useMemo(
    () => Object.values(filters).some(arr => arr.length > 0),
    [filters]
  );

  return (
    <div className="hero-dex">
      <header className="hero-dex__header">
        <h1 className="hero-dex__title">最強異世界 同伴圖鑑</h1>
        <p className="hero-dex__subtitle">依陣營、戰術定位與技能效果篩選你的最佳陣容，圖鑑已蒐集所有 SSR 以及 特殊 SR 一位 (Update at: 2026/07/28)</p>
      </header>

      <div className="command-panel">
        <div
          className="command-panel__bar"
          onClick={() => setIsFilterExpanded(!isFilterExpanded)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setIsFilterExpanded(!isFilterExpanded); }}
        >
          <div className="command-panel__bar-left">
            <span className="command-panel__title">篩選面板</span>
            {hasActiveFilters && !isFilterExpanded && (
              <span className="badge-dot">已套用條件</span>
            )}
          </div>
          <div className="command-panel__bar-right">
            <span className="command-panel__count command-panel__count--desktop">
              共找到 <strong>{filteredHeroes.length}</strong> 位
            </span>
            <button type="button" className="command-panel__toggle">
              {isFilterExpanded ? '收起' : '展開'}
              <span className={`chevron ${isFilterExpanded ? 'chevron--up' : ''}`}>▾</span>
            </button>
          </div>
        </div>

        {isFilterExpanded && (
          <div className="command-panel__body">
            {Object.entries(FILTER_OPTIONS).map(([key, options]) => (
              <FilterGroup
                key={key}
                groupKey={key}
                options={options}
                currentState={filters[key]}
                onToggle={toggleSelection}
              />
            ))}
            <div className="command-panel__count command-panel__count--mobile">
              共找到 <strong>{filteredHeroes.length}</strong> 位
            </div>
          </div>
        )}
      </div>

      <div className="hero-grid">
              {filteredHeroes.map(hero => {
                const accent = FACTION_ACCENT[hero.faction] || DEFAULT_ACCENT;
                return (
                  <article
                    key={hero.id}
                    className="hero-card"
                    style={{ '--accent': accent }}
                  >
                    <div className="hero-card__top">
                      <h2 className="hero-card__name">{hero.name}</h2>
                      <span
                        className="hero-card__rarity"
                        style={{ '--rarity': getRarityColor(hero.rarity) }}
                      >
                        {hero.rarity}
                      </span>
                    </div>

                    <div className="hero-card__meta">
                      <p>
                        <span className="hero-card__meta-label">陣營</span>
                        <span className="faction-tag" style={{ '--accent': accent }}>{hero.faction}</span>
                      </p>
                      <p className="hero-card__roles">
                        <span className="hero-card__meta-label">定位</span>
                        {hero.tacticalRoles.map(r => (
                          <span key={r} className="role-tag">{r}</span>
                        ))}
                      </p>
                    </div>

                    <div className="hero-card__effects">
                      <span className="hero-card__effects-label">
                        技能效果 <span className="mono">({hero.skillEffects.length})</span>
                      </span>
                      <div className="effect-list">
                        {hero.skillEffects.map((effect, index) => (
                          <span key={`${effect}-${index}`} className="effect-chip">{effect}</span>
                        ))}
                      </div>
                    </div>

                    {hero.synergyPartners.length > 0 && (
                      <p className="hero-card__synergy">
                        <strong>搭檔</strong> {hero.synergyPartners.join('、')}
                      </p>
                    )}

                    <div className="hero-card__tags">
                      {hero.tags.map(tag => (
                        <span key={tag} className="tag-pill">#{tag}</span>
                      ))}
                    </div>
                  </article>
                );
              })}
            </div>

      {filteredHeroes.length === 0 && (
        <div className="empty-state">
          <p className="empty-state__title">沒有找到符合條件的英雄</p>
          <p className="empty-state__hint">請嘗試放寬或清除部分篩選條件</p>
        </div>
      )}
      <div className="hero-dex__footer">
        <p className="hero-dex__subtitle">有任何錯誤或建議，請聯絡 S1 杏仁沐洛</p>
      </div>

    </div>
  );
}
