import { ChevronLeft, ChevronRight, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function Header() {
  return (
    <header className="flex items-center justify-between p-4 sm:px-6 bg-background">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" className="h-8 w-8">
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" className="h-8 w-8">
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex items-center gap-4">
        <Button variant="outline" className="bg-white text-black hover:bg-gray-200">Upgrade</Button>
        <Button variant="ghost" className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src="https://placehold.co/40x40.png" alt="User profile" data-ai-hint="profile person" />
            <AvatarFallback>
              <User />
            </AvatarFallback>
          </Avatar>
          <span>Profile</span>
        </Button>
      </div>
    </header>
  );
}
