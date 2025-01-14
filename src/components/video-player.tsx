/* eslint-disable jsx-a11y/media-has-caption */
'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Pause, Play, SkipBack, SkipForward } from 'lucide-react';
import { useState } from 'react';

export function VideoPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <Card className="overflow-hidden">
      <div className="relative aspect-video bg-black">
        <video
          src="/placeholder.mp4"
          className="size-full"
          poster="/placeholder.svg?height=400&width=600"
        />
      </div>
      <div className="p-4">
        <div className="flex items-center justify-center gap-2">
          <Button variant="outline" size="icon">
            <SkipBack className="size-4" />
          </Button>
          <Button
            size="icon"
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying
              ? (
                  <Pause className="size-4" />
                )
              : (
                  <Play className="size-4" />
                )}
          </Button>
          <Button variant="outline" size="icon">
            <SkipForward className="size-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
