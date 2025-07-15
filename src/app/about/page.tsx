
'use client';

import Header from '@/components/layout/header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Github, Heart } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-1 p-6 md:p-10 flex items-center justify-center">
        <Card className="w-full max-w-2xl bg-card border border-border rounded-xl shadow-lg">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
                <Avatar className="h-24 w-24">
                    <AvatarImage src="https://github.com/voiscko.png" alt="Creator's Avatar" data-ai-hint="person code" />
                    <AvatarFallback>V</AvatarFallback>
                </Avatar>
            </div>
            <CardTitle className="text-3xl font-bold">About StudyBuddy</CardTitle>
            <CardDescription className="text-muted-foreground mt-2">
              A student project created with passion.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-6 px-6 pb-8">
            <p className="text-lg">
              This application is a student project developed by{' '}
              <Link href="https://t.me/voiscko" target="_blank" rel="noopener noreferrer" className="text-primary font-bold hover:underline">
                voiscko
              </Link>.
            </p>
            <div className="text-muted-foreground">
              <p>It was created as part of a university assignment at the request of Katja Fiscella.</p>
              <p className="mt-4">This project demonstrates the implementation of modern web technologies to create a helpful study tool.</p>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                    <Heart className="h-4 w-4 text-primary" />
                     <Link href="https://t.me/voiscko" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                        Contact: Telegram @voiscko
                    </Link>
                </div>
                <div className="flex items-center gap-2">
                    <Github className="h-4 w-4" />
                     <Link href="https://github.com/voiscko" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                        GitHub: voiscko
                    </Link>
                </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
