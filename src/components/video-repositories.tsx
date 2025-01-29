'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { ViewToggle } from '@/components/view-toggle';
import { ZoomControl } from '@/components/zoom-control';
import { Clock, GitBranch, GitCommit, MoreVertical, Play } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export function VideoRepositories() {
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [zoom, setZoom] = useState(3); // Default to 3 columns
  const [repositories, setRepositories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load zoom preference from localStorage
  useEffect(() => {
    const savedZoom = localStorage.getItem('videoGitZoom');
    if (savedZoom) {
      setZoom(Number(savedZoom));
    }
  }, []);

  // Fetch repositories from API
  useEffect(() => {
    const fetchRepositories = async () => {
      try {
        const response = await fetch('http://localhost:4300/api/repo/repos');
        if (!response.ok) {
          throw new Error('Failed to fetch repositories');
        }
        const data = await response.json();
        setRepositories(data.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchRepositories();
  }, []);

  // Save zoom preference to localStorage
  const handleZoomChange = (newZoom: number) => {
    setZoom(newZoom);
    localStorage.setItem('videoGitZoom', String(newZoom));
  };

  if (loading) {
    return <p>Loading repositories...</p>;
  }
  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Video Repositories</h2>
        <div className="flex items-center gap-4">
          {view === 'grid' && <ZoomControl zoom={zoom} onZoomChange={handleZoomChange} />}
          <ViewToggle view={view} onViewChange={setView} />
          <Button variant="outline">Sort by</Button>
        </div>
      </div>
      {view === 'grid'
        ? (
            <div
              className={`grid gap-4 transition-all duration-200
          ${zoom === 2 ? 'md:grid-cols-2' : ''}
          ${zoom === 3 ? 'md:grid-cols-2 lg:grid-cols-3' : ''}
          ${zoom === 4 ? 'md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : ''}
          ${zoom === 5 ? 'md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5' : ''}
          ${zoom === 6 ? 'md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6' : ''}
        `}
            >
              {repositories.map(repo => (
                <Link href={`/repo/${repo.id}`} key={repo.id} className="group">
                  <Card className="overflow-hidden transition-all hover:shadow-lg dark:hover:shadow-primary/5">
                    <CardHeader className="p-0">
                      <div className="relative aspect-video overflow-hidden">
                        <img
                          src={repo.thumbnail || '/placeholder.svg'}
                          alt={repo.name}
                          className="object-cover transition-transform group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-background/20" />
                        <div className="absolute inset-x-3 bottom-3 flex items-center justify-between">
                          <Badge variant="secondary" className="backdrop-blur-sm">
                            {repo.duration || 'N/A'}
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
                          <h3 className="font-semibold leading-none tracking-tight">{repo.name}</h3>
                          <p className="text-sm text-muted-foreground">{repo.description}</p>
                        </div>
                        <Button variant="ghost" size="icon" className="size-8 shrink-0">
                          <MoreVertical className="size-4" />
                        </Button>
                      </div>
                    </CardContent>
                    <CardFooter className="grid gap-2 border-t p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <GitCommit className="size-4" />
                            {repo.branches.reduce((sum: number, branch: any) => sum + branch.commits.length, 0)}
                          </div>
                          <div className="flex items-center gap-1">
                            <GitBranch className="size-4" />
                            {repo.branches.length}
                          </div>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Clock className="size-4" />
                          {new Date(repo.updatedAt).toLocaleDateString()}
                        </div>
                      </div>
                      <Badge
                        variant={repo.status === 'Published' ? 'default' : repo.status === 'In Progress' ? 'secondary' : 'outline'}
                        className="w-fit"
                      >
                        {repo.status}
                      </Badge>
                    </CardFooter>
                  </Card>
                </Link>
              ))}
            </div>
          )
        : (
            <div className="grid gap-4">
              {repositories.map(repo => (
                <Link href={`/repo/${repo.id}`} key={repo.id} className="group">
                  <Card className="overflow-hidden transition-all hover:shadow-lg dark:hover:shadow-primary/5">
                    <div className="flex flex-col sm:flex-row">
                      <div className="relative w-full sm:w-[240px]">
                        <img
                          src={repo.thumbnail || '/placeholder.svg'}
                          alt={repo.name}
                          className="size-full object-cover transition-transform group-hover:scale-105"
                        />
                      </div>
                      <div className="flex flex-1 flex-col">
                        <CardContent className="grid gap-2 p-4">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <h3 className="font-semibold tracking-tight">{repo.name}</h3>
                              <p className="text-sm text-muted-foreground">{repo.description}</p>
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
