
'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/layout/header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Target, Clock, PlusCircle, Cookie } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const studyActivities = [
  {
    icon: <BookOpen className="h-6 w-6 text-primary" />,
    title: 'Flashcards Reviewed',
    value: '1,250',
    change: '+50 today',
  },
  {
    icon: <Target className="h-6 w-6 text-primary" />,
    title: 'Study Goal',
    value: '80%',
    change: 'On track',
  },
  {
    icon: <Clock className="h-6 w-6 text-primary" />,
    title: 'Time Focused',
    value: '12h 45m',
    change: '+1.5h today',
  },
];

const recentNotes = [
  {
    title: 'Biology Chapter 5',
    excerpt: 'Cellular respiration is a set of metabolic reactions and processes that take place in the cells of organisms...',
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'biology science'
  },
  {
    title: 'History Midterm Prep',
    excerpt: 'The key events leading to the American Revolution include the Stamp Act, the Boston Tea Party, and...',
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'history book'
  },
  {
    title: 'Calculus Formulas',
    excerpt: 'Fundamental Theorem of Calculus, chain rule, product rule, quotient rule...',
    image: 'https://placehold.co/600x400.png',
    dataAiHint: 'math equations'
  },
];

const COOKIE_CONSENT_KEY = 'studybuddy-cookie-consent';

export default function HomePage() {
  const [showCookieBanner, setShowCookieBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!consent) {
      setShowCookieBanner(true);
    }
  }, []);

  const handleAcceptCookies = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'true');
    setShowCookieBanner(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-1 p-6 md:p-10">
        <div className="mb-10">
          <h1 className="text-3xl font-bold">Welcome back, Alex!</h1>
          <p className="text-muted-foreground">Let's get back to studying. What are you working on today?</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {studyActivities.map((activity, index) => (
            <Card key={index} className="bg-card">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">{activity.title}</CardTitle>
                {activity.icon}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{activity.value}</div>
                <p className="text-xs text-muted-foreground">{activity.change}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mb-10">
            <div className="flex justify-between items-center mb-6">
                 <h2 className="text-2xl font-bold">Recent Notes</h2>
                 <Button variant="outline">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    New Note
                 </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {recentNotes.map((note, index) => (
                    <Card key={index} className="bg-card border border-border rounded-xl flex flex-col overflow-hidden">
                        <Image src={note.image} alt={note.title} width={600} height={400} className="w-full h-40 object-cover" data-ai-hint={note.dataAiHint} />
                        <CardHeader>
                            <CardTitle>{note.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="flex-grow">
                            <CardDescription>{note.excerpt}</CardDescription>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
      </main>
      
      {showCookieBanner && (
        <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4 z-50">
          <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <Cookie className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <p className="text-sm text-muted-foreground">
                This is a student project for demonstration purposes and not a real, commercial product. By using this site, you acknowledge this. For more details, please see our{' '}
                <Link href="/legal" className="text-primary hover:underline">
                  Legal Notice
                </Link>.
              </p>
            </div>
            <Button onClick={handleAcceptCookies} size="sm">
              Accept & Close
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
