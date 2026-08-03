import { memo } from 'react';
import type { FilterGroupKey, HeroFilters } from '../types/hero';
import type { FilterOption } from '../data/filter-options';

interface FilterGroupProps<K extends FilterGroupKey> {
  groupKey: K;
  label: string;
  options: FilterOption<K>[];
  currentState: HeroFilters[K];
  onToggle: (groupKey: K, value: HeroFilters[K][number]) => void;
}

function FilterGroupComponent<K extends FilterGroupKey>({
  groupKey,
  label,
  options,
  currentState,
  onToggle,
}: FilterGroupProps<K>) {
  return (
    <fieldset className="filter-row">
      <legend className="filter-row__label">{label}</legend>
      <div className="filter-row__options">
        {options.map((option) => {
          const isActive = (currentState as string[]).includes(option.value);
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onToggle(groupKey, option.value)}
              aria-pressed={isActive}
              className={`chip ${isActive ? 'chip--active' : ''}`}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

export const FilterGroup = memo(FilterGroupComponent) as typeof FilterGroupComponent;
