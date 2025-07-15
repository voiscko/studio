
'use client';

import Header from '@/components/layout/header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Heart } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-1 p-6 md:p-10 flex items-center justify-center">
        <Card className="w-full max-w-2xl bg-card border border-border rounded-xl shadow-lg">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
                <Avatar className="h-24 w-24">
                    <AvatarImage src="https://placehold.co/100x100.png" alt="Creator's Avatar" data-ai-hint="person code" />
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
              This application is a student project developed by <strong className="text-primary">voiscko</strong>.
            </p>
            <div className="text-muted-foreground">
              <p>It was created as part of a university assignment at the request of Katja Fiscella.</p>
              <p className="mt-4">This project demonstrates the implementation of modern web technologies to create a helpful study tool.</p>
            </div>
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <Heart className="h-4 w-4 text-primary" />
                <span>Contact: Telegram @voiscko</span>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
