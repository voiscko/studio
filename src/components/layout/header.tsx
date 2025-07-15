import { ChevronLeft, ChevronRight, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="flex items-center justify-between p-4 sm:px-6 bg-background/80 backdrop-blur-sm sticky top-0 z-40">
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2 mr-4">
          <span className="w-3 h-3 bg-red-500 rounded-full"></span>
          <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
          <span className="w-3 h-3 bg-green-500 rounded-full"></span>
        </div>
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
        <Button variant="secondary" className="rounded-full">
            Sign Up
        </Button>
        <Button variant="default" className="rounded-full bg-white text-black hover:bg-gray-200">
          Sign In
        </Button>
      </div>
    </header>
  );
}
