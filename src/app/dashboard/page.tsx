
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/layout/header';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, PlusCircle, Brain } from 'lucide-react';

export default function DashboardPage() {
  const [user, setUser] = useState<{ username: string } | null>(null);
  const [studySessions, setStudySessions] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const authData = localStorage.getItem('studybuddy-auth');
    if (authData) {
      const parsedUser = JSON.parse(authData);
      setUser(parsedUser);
      
      const sessionData = localStorage.getItem(`studybuddy-sessions-${parsedUser.username}`);
      if (sessionData) {
        setStudySessions(JSON.parse(sessionData));
      }

    } else {
      router.replace('/');
    }
  }, [router]);

  useEffect(() => {
    if (user) {
      localStorage.setItem(`studybuddy-sessions-${user.username}`, JSON.stringify(studySessions));
    }
  }, [studySessions, user]);

  const handleNewSession = () => {
    setStudySessions(prev => prev + 1);
  };

  if (!user) {
    return (
        <div className="flex flex-col min-h-screen bg-background text-foreground">
            <Header />
            <main className="flex-1 flex items-center justify-center">
                <p>Loading...</p>
            </main>
        </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-1 p-6 md:p-10">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Welcome, {user.username}!</h1>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>My Subjects</CardTitle>
                <CardDescription>Access your study materials for different subjects.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                        <div className="flex items-center gap-3">
                            <BookOpen className="h-5 w-5 text-primary" />
                            <span>Mathematics</span>
                        </div>
                        <Button variant="ghost" size="sm">View</Button>
                    </div>
                     <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                        <div className="flex items-center gap-3">
                            <BookOpen className="h-5 w-5 text-primary" />
                            <span>German</span>
                        </div>
                        <Button variant="ghost" size="sm">View</Button>
                    </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Study Stats</CardTitle>
                <CardDescription>Your learning progress at a glance.</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center h-full">
                <div className="text-center">
                  <p className="text-6xl font-bold text-primary">{studySessions}</p>
                  <p className="text-muted-foreground mt-2">Total Sessions Completed</p>
                </div>
                <Button onClick={handleNewSession} className="mt-6 w-full">
                    <Brain className="mr-2 h-4 w-4" />
                    Start a new study session
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Create New</CardTitle>
                <CardDescription>Start a new study set or note.</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    New Flashcard Deck
                </Button>
                <Button variant="secondary">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    New Note
                </Button>
              </CardContent>
            </Card>

          </div>
        </div>
      </main>
    </div>
  );
}
