interface EmptyStateProps {
  onClear: () => void;
}

export function EmptyState({ onClear }: EmptyStateProps) {
  return (
    <div className="empty-state" role="status">
      <p className="empty-state__title">沒有找到符合條件的英雄</p>
      <p className="empty-state__hint">請嘗試放寬或清除部分篩選條件</p>
      <button type="button" className="clear-button empty-state__clear" onClick={onClear}>清除全部條件</button>
    </div>
  );
}
