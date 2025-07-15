
'use client';

import Header from '@/components/layout/header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, SpellCheck, BookText } from 'lucide-react';
import Link from 'next/link';

const germanTopics = [
    {
        name: 'Grammar Exercises',
        description: 'Practice German grammar rules with targeted exercises.',
        icon: <SpellCheck className="h-8 w-8 text-primary" />,
        href: '/subjects/german/grammar',
    },
    {
        name: 'Vocabulary Builder',
        description: 'Expand your German vocabulary with interactive quizzes.',
        icon: <BookText className="h-8 w-8 text-primary" />,
        href: '/subjects/german/vocabulary',
    }
];

export default function GermanPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-1 p-6 md:p-10">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">German</h1>
          <p className="text-muted-foreground mb-8">Select a topic to start your study session.</p>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {germanTopics.map((topic) => (
              <Card key={topic.name} className="flex flex-col">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    {topic.icon}
                    <CardTitle>{topic.name}</CardTitle>
                  </div>
                  <CardDescription className="pt-2">{topic.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow flex items-end">
                  <Link href={topic.href} className="w-full">
                    <Button className="w-full">
                      Start Learning <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
