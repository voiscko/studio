
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/layout/header';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, PlusCircle } from 'lucide-react';

export default function DashboardPage() {
  const [user, setUser] = useState<{ username: string } | null>(null);
  const router = useRouter();

  useEffect(() => {
    const authData = localStorage.getItem('studybuddy-auth');
    if (authData) {
      setUser(JSON.parse(authData));
    } else {
      router.replace('/');
    }
  }, [router]);

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
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your latest study sessions and progress.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">No recent activity yet.</p>
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
