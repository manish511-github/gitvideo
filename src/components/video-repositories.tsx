/* eslint-disable style/multiline-ternary */
'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { ViewToggle } from '@/components/view-toggle';
import { Clock, GitBranch, GitCommit, MoreVertical, Play } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export function VideoRepositories() {
  const [view, setView] = useState<'grid' | 'list'>('grid');

  const repositories = [
    {
      id: 1,
      name: 'Product Demo v2.0',
      description: 'Updated product demonstration video with new features',
      lastUpdated: '2 hours ago',
      commits: 5,
      branches: 2,
      thumbnail: '/placeholder.svg?height=200&width=360',
      duration: '3:24',
      status: 'Updated',
      author: {
        name: 'Sarah Chen',
        avatar: '/placeholder.svg?height=32&width=32',
      },
    },
    {
      id: 2,
      name: 'Company Overview',
      description: 'Main company overview and mission video',
      lastUpdated: '1 day ago',
      commits: 8,
      branches: 3,
      thumbnail: '/placeholder.svg?height=200&width=360',
      duration: '5:12',
      status: 'In Progress',
      author: {
        name: 'Mike Johnson',
        avatar: '/placeholder.svg?height=32&width=32',
      },
    },
    {
      id: 3,
      name: 'Tutorial Series',
      description: 'Video tutorials for onboarding new users',
      lastUpdated: '3 days ago',
      commits: 12,
      branches: 4,
      thumbnail: '/placeholder.svg?height=200&width=360',
      duration: '8:45',
      status: 'Published',
      author: {
        name: 'Alex Kim',
        avatar: '/placeholder.svg?height=32&width=32',
      },
    },
  ];

  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Video Repositories</h2>
        <div className="flex items-center gap-4">
          <ViewToggle view={view} onViewChange={setView} />
          <Button variant="outline">Sort by</Button>
        </div>
      </div>
      {view === 'grid' ? (
        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-3">
          {' '}
          {/* Update 1 */}
          {repositories.map(repo => (
            <Link href={`/repo/${repo.id}`} key={repo.id} className="group">
              <Card className="overflow-hidden transition-all hover:shadow-lg dark:hover:shadow-primary/5">
                <CardHeader className="p-0">
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={repo.thumbnail}
                      alt={repo.name}
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-background/20" />
                    <div className="absolute inset-x-3 bottom-3 flex items-center justify-between">
                      <Badge variant="secondary" className="backdrop-blur-sm">
                        {repo.duration}
                      </Badge>
                      <Button size="icon" variant="secondary" className="size-8 rounded-full opacity-0 transition-opacity group-hover:opacity-100">
                        <Play className="size-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="grid gap-2 p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-semibold leading-none tracking-tight">
                        {repo.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {repo.description}
                      </p>
                    </div>
                    <Button variant="ghost" size="icon" className="size-8 shrink-0">
                      <MoreVertical className="size-4" />
                    </Button>
                  </div>
                  <div className="flex items-center gap-2">
                    <img
                      src={repo.author.avatar}
                      alt={repo.author.name}
                      className="size-6 rounded-full"
                    />
                    <span className="text-sm text-muted-foreground">
                      {repo.author.name}
                    </span>
                  </div>
                </CardContent>
                <CardFooter className="grid gap-2 border-t p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <GitCommit className="size-4" />
                        {repo.commits}
                      </div>
                      <div className="flex items-center gap-1">
                        <GitBranch className="size-4" />
                        {repo.branches}
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="size-4" />
                      {repo.lastUpdated}
                    </div>
                  </div>
                  <Badge
                    variant={
                      repo.status === 'Published'
                        ? 'default'
                        : repo.status === 'In Progress'
                          ? 'secondary'
                          : 'outline'
                    }
                    className="w-fit"
                  >
                    {repo.status}
                  </Badge>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <div className="grid gap-4">
          {' '}
          {/* Update 3 */}
          {repositories.map(repo => (
            <Link href={`/repo/${repo.id}`} key={repo.id} className="group">
              <Card className="overflow-hidden transition-all hover:shadow-lg dark:hover:shadow-primary/5">
                <div className="flex flex-col sm:flex-row">
                  <div className="relative w-full sm:w-[240px]">
                    {' '}
                    {/* Update 2 */}
                    <div className="relative aspect-video sm:h-[120px]">
                      <img
                        src={repo.thumbnail}
                        alt={repo.name}
                        className="size-full object-cover transition-transform group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-background/20 sm:bg-gradient-to-r" />
                      <div className="absolute bottom-3 left-3 flex items-center gap-2">
                        <Badge variant="secondary" className="backdrop-blur-sm">
                          {repo.duration}
                        </Badge>
                      </div>
                      <Button
                        size="icon"
                        variant="secondary"
                        className="absolute right-3 top-3 size-8 rounded-full opacity-0 transition-opacity group-hover:opacity-100"
                      >
                        <Play className="size-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col">
                    <CardContent className="grid gap-2 p-4">
                      {' '}
                      {/* Update 2 */}
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold tracking-tight">
                              {repo.name}
                            </h3>
                            <Badge
                              variant={
                                repo.status === 'Published'
                                  ? 'default'
                                  : repo.status === 'In Progress'
                                    ? 'secondary'
                                    : 'outline'
                              }
                              className="hidden sm:inline-flex"
                            >
                              {repo.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {repo.description}
                          </p>
                        </div>
                        <Button variant="ghost" size="icon" className="size-8 shrink-0">
                          <MoreVertical className="size-4" />
                        </Button>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <img
                            src={repo.author.avatar}
                            alt={repo.author.name}
                            className="size-6 rounded-full"
                          />
                          <span className="text-sm text-muted-foreground">
                            {repo.author.name}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <GitCommit className="size-4" />
                            {repo.commits}
                          </div>
                          <div className="flex items-center gap-1">
                            <GitBranch className="size-4" />
                            {repo.branches}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="size-4" />
                            {repo.lastUpdated}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
