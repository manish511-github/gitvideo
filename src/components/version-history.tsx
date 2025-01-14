import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { GitCommit } from 'lucide-react';

export function VersionHistory() {
  const commits = [
    {
      id: 'abc123',
      message: 'Updated intro sequence',
      author: 'Sarah Chen',
      date: '2 hours ago',
      avatar: '/placeholder.svg?height=40&width=40',
    },
    {
      id: 'def456',
      message: 'Fixed audio sync issues',
      author: 'Mike Johnson',
      date: '1 day ago',
      avatar: '/placeholder.svg?height=40&width=40',
    },
    {
      id: 'ghi789',
      message: 'Added new product features section',
      author: 'Alex Kim',
      date: '2 days ago',
      avatar: '/placeholder.svg?height=40&width=40',
    },
  ];

  return (
    <div className="space-y-4">
      {commits.map(commit => (
        <div key={commit.id} className="flex items-start gap-4 rounded-lg p-4 hover:bg-muted/50">
          <Avatar className="size-8">
            <AvatarImage src={commit.avatar} />
            <AvatarFallback>{commit.author[0]}</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">{commit.message}</p>
            <div className="flex items-center gap-2">
              <p className="text-sm text-muted-foreground">{commit.author}</p>
              <span className="text-sm text-muted-foreground">•</span>
              <p className="text-sm text-muted-foreground">{commit.date}</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="size-8">
            <GitCommit className="size-4" />
          </Button>
        </div>
      ))}
    </div>
  );
}
