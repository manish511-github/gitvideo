'use client';

import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { LayoutGrid, List } from 'lucide-react';

type ViewToggleProps = {
  view: 'grid' | 'list';
  onViewChange: (view: 'grid' | 'list') => void;
};

export function ViewToggle({ view, onViewChange }: ViewToggleProps) {
  return (
    <ToggleGroup type="single" value={view} onValueChange={value => value && onViewChange(value as 'grid' | 'list')}>
      <ToggleGroupItem value="grid" aria-label="Grid view">
        <LayoutGrid className="size-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="list" aria-label="List view">
        <List className="size-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
