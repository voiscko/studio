import { BookOpenCheck } from 'lucide-react';

export default function Header() {
  return (
    <header className="flex items-center justify-between p-4 sm:px-6 border-b bg-card">
      <div className="flex items-center gap-3">
        <BookOpenCheck className="h-7 w-7 text-primary" />
        <h1 className="text-xl sm:text-2xl font-bold text-foreground font-headline">
          StudyTrack
        </h1>
      </div>
    </header>
  );
}
