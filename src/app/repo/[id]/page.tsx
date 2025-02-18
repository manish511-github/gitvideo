import { VideoPlayer } from "@/components/video-player"
import { VersionHistory } from "@/components/version-history"
import { VideoMetadata } from "@/components/video-metadata"
import { VideoOperations } from "@/components/video-operations"
import { BranchSelector } from "@/components/branch-selector"

export default function RepoPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-background pt-16">
      <div className="container px-4 py-6">
        <div className="grid gap-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Product Demo v2.0</h1>
          </div>
          <div className="grid gap-6 lg:grid-cols-[1fr_400px]">
            <div>
              <VideoPlayer />
              <VideoMetadata />
            </div>
            <div className="space-y-4">
              <BranchSelector />
              <VersionHistory />
              <VideoOperations />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

