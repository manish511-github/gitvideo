import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { FileVideo, LogOut, Settings, User } from 'lucide-react';
import Link from 'next/link';

export function UserSidebar() {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-4 p-4">
        <Avatar className="size-16">
          <AvatarImage src="/placeholder.svg?height=64&width=64" alt="@manish511" />
          <AvatarFallback>MS</AvatarFallback>
        </Avatar>
        <div>
          <div className="font-semibold">Manish Singh</div>
          <div className="text-sm text-muted-foreground">@manish511</div>
        </div>
      </div>
      <Separator />
      <ScrollArea className="flex-1">
        <div className="space-y-1 p-2">
          <Button variant="ghost" className="w-full justify-start gap-2" asChild>
            <Link href="/profile">
              <User className="size-4" />
              Profile
            </Link>
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-2" asChild>
            <Link href="/repositories">
              <FileVideo className="size-4" />
              Your repositories
            </Link>
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-2" asChild>
            <Link href="/settings">
              <Settings className="size-4" />
              Settings
            </Link>
          </Button>
        </div>
      </ScrollArea>
      <Separator />
      <div className="p-2">
        <Button variant="ghost" className="w-full justify-start gap-2 text-red-500 hover:text-red-500">
          <LogOut className="size-4" />
          Sign out
        </Button>
      </div>
    </div>
  );
}
