
'use client';

import Header from '@/components/layout/header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bot, Send } from 'lucide-react';
import { Input } from '@/components/ui/input';

export default function AiTutorPage() {

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center p-6 md:p-10">
        <Card className="w-full max-w-3xl h-[70vh] flex flex-col bg-card border border-border rounded-xl shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-3">
                <Bot className="h-8 w-8 text-primary" />
                <div>
                    <CardTitle className="text-2xl font-bold">AI Tutor</CardTitle>
                    <CardDescription className="text-muted-foreground mt-1">
                        Your personal AI-powered learning assistant.
                    </CardDescription>
                </div>
            </div>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col justify-between gap-4">
            <div className="flex-1 flex items-center justify-center text-center text-muted-foreground">
                <p>Ask me anything about your subjects!</p>
            </div>
            <div className="flex gap-2">
                <Input placeholder="Type your question..." className="flex-1" />
                <Button>
                    <Send className="h-4 w-4" />
                </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
