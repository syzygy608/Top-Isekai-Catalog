import type { FilterGroupKey, HeroFilters } from '../types/hero';
import { FILTER_GROUPS } from '../data/filter-options';
import { FilterGroup } from './FilterGroup';

interface FilterPanelProps {
  filters: HeroFilters;
  resultCount: number;
  expanded: boolean;
  onExpandedChange: (expanded: boolean) => void;
  onToggle: <K extends FilterGroupKey>(groupKey: K, value: HeroFilters[K][number]) => void;
  onClear: () => void;
}

export function FilterPanel({
  filters,
  resultCount,
  expanded,
  onExpandedChange,
  onToggle,
  onClear,
}: FilterPanelProps) {
  const activeCount = Object.values(filters).reduce((total, values) => total + values.length, 0);

  return (
    <section className="command-panel" aria-labelledby="filter-panel-title">
      <div className="command-panel__bar">
        <div className="command-panel__bar-left">
          <h2 id="filter-panel-title" className="command-panel__title">篩選面板</h2>
          {activeCount > 0 && <span className="badge-dot">已套用 {activeCount} 個條件</span>}
        </div>
        <div className="command-panel__bar-right">
          <span className="command-panel__count command-panel__count--desktop" aria-live="polite">
            共找到 <strong>{resultCount}</strong> 位
          </span>
          {activeCount > 0 && (
            <button type="button" className="clear-button" onClick={onClear}>清除條件</button>
          )}
          <button
            type="button"
            className="command-panel__toggle"
            aria-expanded={expanded}
            aria-controls="filter-panel-body"
            onClick={() => onExpandedChange(!expanded)}
          >
            {expanded ? '收起' : '展開'}
            <span aria-hidden="true" className={`chevron ${expanded ? 'chevron--up' : ''}`}>▾</span>
          </button>
        </div>
      </div>

      {expanded && (
        <div id="filter-panel-body" className="command-panel__body">
          {FILTER_GROUPS.map((group) => (
            <FilterGroup
              key={group.key}
              groupKey={group.key}
              label={group.label}
              options={group.options}
              currentState={filters[group.key]}
              onToggle={onToggle}
            />
          ))}
          <div className="command-panel__count command-panel__count--mobile" aria-live="polite">
            共找到 <strong>{resultCount}</strong> 位
          </div>
        </div>
      )}
    </section>
  );
}
