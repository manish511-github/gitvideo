import { Header } from '@/components/header';
import { VideoRepositories } from '@/components/video-repositories';

export default function Page() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto p-4 pt-20">
        <VideoRepositories />
      </main>
    </div>
  );
}
