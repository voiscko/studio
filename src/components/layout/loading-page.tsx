
'use client';

import { LoaderCircle } from 'lucide-react';
import Header from './header';

interface LoadingPageProps {
    message?: string;
}

export default function LoadingPage({ message = "Loading..." }: LoadingPageProps) {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center gap-4">
        <LoaderCircle className="h-12 w-12 animate-spin text-primary" />
        <p className="text-muted-foreground">{message}</p>
      </main>
    </div>
  );
}
