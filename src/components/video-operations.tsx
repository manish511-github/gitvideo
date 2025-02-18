'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Combine, GitCommit, Replace, Scissors, Upload } from 'lucide-react';
import { useState } from 'react';

export function VideoOperations() {
  const [isLoading, setIsLoading] = useState(false);
  const [videoTime, setVideoTime] = useState([0]);
  const [clipRange, setClipRange] = useState([0, 100]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>New Commit</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-6">
            <Tabs defaultValue="clip">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="clip">Clip</TabsTrigger>
                <TabsTrigger value="merge">Merge</TabsTrigger>
                <TabsTrigger value="insert">Insert</TabsTrigger>
                <TabsTrigger value="update">Update</TabsTrigger>
              </TabsList>
              <TabsContent value="clip" className="space-y-4">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label>Clip Range</Label>
                    <div className="px-2">
                      <Slider
                        value={clipRange}
                        max={100}
                        step={1}
                        onValueChange={setClipRange}
                        className="[&>span:first-child]:h-2"
                      />
                    </div>
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>{formatTime(clipRange[0])}</span>
                      <span>{formatTime(clipRange[1])}</span>
                    </div>
                  </div>
                  <div className="relative aspect-video rounded-lg border bg-muted">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Scissors className="size-8 text-muted-foreground" />
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="merge" className="space-y-4">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label>Select Video to Merge</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a video" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="video1">Tutorial Part 1</SelectItem>
                        <SelectItem value="video2">Product Demo</SelectItem>
                        <SelectItem value="video3">Company Overview</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="relative aspect-video rounded-lg border bg-muted">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Combine className="size-8 text-muted-foreground" />
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="insert" className="space-y-4">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label>Insert Position</Label>
                    <div className="px-2">
                      <Slider
                        value={videoTime}
                        max={100}
                        step={1}
                        onValueChange={setVideoTime}
                        className="[&>span:first-child]:h-2"
                      />
                    </div>
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>{formatTime(videoTime[0])}</span>
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label>Upload Video Segment</Label>
                    <div className="flex h-32 cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-muted-foreground/25 p-5 text-center hover:bg-muted/50">
                      <Upload className="size-8 text-muted-foreground" />
                      <div className="mt-4 flex flex-col items-center gap-1">
                        <p className="text-sm font-medium">Drop your video here</p>
                        <p className="text-xs text-muted-foreground">MP4, MOV, or WebM</p>
                        <Input id="video-upload" type="file" accept="video/*" className="hidden" />
                        <Button
                          type="button"
                          variant="secondary"
                          size="sm"
                          className="mt-2"
                          onClick={() => document.getElementById('video-upload')?.click()}
                        >
                          Select file
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="update" className="space-y-4">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label>Update Range</Label>
                    <div className="px-2">
                      <Slider
                        value={clipRange}
                        max={100}
                        step={1}
                        onValueChange={setClipRange}
                        className="[&>span:first-child]:h-2"
                      />
                    </div>
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>{formatTime(clipRange[0])}</span>
                      <span>{formatTime(clipRange[1])}</span>
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label>Upload Replacement Segment</Label>
                    <div className="flex h-32 cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-muted-foreground/25 p-5 text-center hover:bg-muted/50">
                      <Replace className="size-8 text-muted-foreground" />
                      <div className="mt-4 flex flex-col items-center gap-1">
                        <p className="text-sm font-medium">Drop your video here</p>
                        <p className="text-xs text-muted-foreground">MP4, MOV, or WebM</p>
                        <Input id="video-replace" type="file" accept="video/*" className="hidden" />
                        <Button
                          type="button"
                          variant="secondary"
                          size="sm"
                          className="mt-2"
                          onClick={() => document.getElementById('video-replace')?.click()}
                        >
                          Select file
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="commit-message">Commit message</Label>
                <Textarea id="commit-message" placeholder="Describe your changes..." className="resize-none" />
              </div>
            </div>
            <div className="flex justify-end">
              <Button type="submit" disabled={isLoading}>
                <GitCommit className="mr-2 size-4" />
                {isLoading ? 'Creating commit...' : 'Create commit'}
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

function formatTime(seconds: number) {
  const minutes = Math.floor((seconds / 100) * 10);
  const remainingSeconds = Math.floor(((seconds / 100) * 10 * 60) % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}
