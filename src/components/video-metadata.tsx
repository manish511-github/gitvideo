import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, FileVideo, GitBranch, GitCommit, Share2 } from 'lucide-react';

export function VideoMetadata() {
  return (
    <div className="space-y-4">
      <Button className="w-full">
        <Share2 className="mr-2 size-4" />
        Share
      </Button>
      <Card>
        <CardHeader>
          <CardTitle>About</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="flex items-center gap-2 text-sm">
            <FileVideo className="size-4 text-muted-foreground" />
            <span>1920x1080 MP4</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Clock className="size-4 text-muted-foreground" />
            <span>3:24 duration</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <GitCommit className="size-4 text-muted-foreground" />
            <span>5 commits</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <GitBranch className="size-4 text-muted-foreground" />
            <span>2 branches</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
