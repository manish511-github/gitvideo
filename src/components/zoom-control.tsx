'use client';

import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { ZoomIn, ZoomOut } from 'lucide-react';

type ZoomControlProps = {
  zoom: number;
  onZoomChange: (zoom: number) => void;
};

export function ZoomControl({ zoom, onZoomChange }: ZoomControlProps) {
  const zoomLevels = [2, 3, 4, 5, 6];
  const currentIndex = zoomLevels.indexOf(zoom);

  const zoomIn = () => {
    if (currentIndex < zoomLevels.length - 1) {
      onZoomChange(zoomLevels[currentIndex + 1]);
    }
  };

  const zoomOut = () => {
    if (currentIndex > 0) {
      onZoomChange(zoomLevels[currentIndex - 1]);
    }
  };

  return (
    <TooltipProvider>
      <div className="flex items-center gap-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              onClick={zoomOut}
              disabled={currentIndex === 0}
            >
              <ZoomOut className="size-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Show larger cards</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              onClick={zoomIn}
              disabled={currentIndex === zoomLevels.length - 1}
            >
              <ZoomIn className="size-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Show smaller cards</TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
}
