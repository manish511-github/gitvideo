import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { VersionHistory } from '@/components/version-history';
import { VideoMetadata } from '@/components/video-metadata';
import { VideoPlayer } from '@/components/video-player';

export default function RepoPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-background pt-16">
      <div className="container px-4 py-6">
        <div className="grid gap-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Product Demo v2.0</h1>
          </div>
          <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
            <div className="space-y-6">
              <VideoPlayer />
              <Tabs defaultValue="commits" className="w-full">
                <TabsList>
                  <TabsTrigger value="commits">Commits</TabsTrigger>
                  <TabsTrigger value="branches">Branches</TabsTrigger>
                  <TabsTrigger value="tags">Tags</TabsTrigger>
                </TabsList>
                <TabsContent value="commits">
                  <VersionHistory />
                </TabsContent>
                <TabsContent value="branches">
                  <div className="p-4 text-sm text-muted-foreground">
                    Branch information will be displayed here
                  </div>
                </TabsContent>
                <TabsContent value="tags">
                  <div className="p-4 text-sm text-muted-foreground">
                    Tag information will be displayed here
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            <VideoMetadata />
          </div>
        </div>
      </div>
    </div>
  );
}
