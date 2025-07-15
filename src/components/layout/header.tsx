import { ChevronLeft, ChevronRight, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="flex items-center justify-between p-4 sm:px-6 bg-background/80 backdrop-blur-sm sticky top-0 z-40">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" className="h-8 w-8 rounded-full bg-black/50 border-none text-white">
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" className="h-8 w-8 rounded-full bg-black/50 border-none text-white">
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex items-center gap-4">
        <Button variant="ghost" asChild>
          <Link href="/pricing">
            Upgrade
          </Link>
        </Button>
        <Button variant="default" className="bg-white text-black hover:bg-gray-200 rounded-full">
            Sign Up
        </Button>
        <Button variant="ghost" className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src="https://placehold.co/40x40.png" alt="User profile" data-ai-hint="profile person" />
            <AvatarFallback>
              <User />
            </AvatarFallback>
          </Avatar>
        </Button>
      </div>
    </header>
  );
}
