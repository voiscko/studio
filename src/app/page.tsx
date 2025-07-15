
'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/layout/header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Target, Clock, PlusCircle, Cookie, ArrowRight, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';


const features = [
  {
    icon: <BookOpen className="h-8 w-8 text-primary" />,
    title: 'Smart Flashcards',
    description: 'Create, share, and study with intelligent flashcards that adapt to your learning pace.',
  },
  {
    icon: <Target className="h-8 w-8 text-primary" />,
    title: 'Goal Tracking',
    description: 'Set and track your study goals to stay motivated and measure your progress effectively.',
  },
  {
    icon: <Clock className="h-8 w-8 text-primary" />,
    title: 'Focus Timer',
    description: 'Use the integrated Pomodoro timer to manage your study sessions and maximize focus.',
  },
];

const testimonials = [
  {
    name: 'Sarah L.',
    role: 'University Student',
    quote: "StudyBuddy has been a game-changer for my exam preparation. The smart flashcards are brilliant!",
    avatar: 'https://placehold.co/40x40.png',
    dataAiHint: 'person student'
  },
  {
    name: 'Mike T.',
    role: 'High School Student',
    quote: "I love the focus timer! It helps me stay on track and I feel so much more productive.",
    avatar: 'https://placehold.co/40x40.png',
    dataAiHint: 'person student'
  },
  {
    name: 'Jessica P.',
    role: 'Medical Student',
    quote: "The best study app I've used. It's intuitive, powerful, and has all the features I need.",
    avatar: 'https://placehold.co/40x40.png',
    dataAiHint: 'person student'
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
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-primary/20 via-background to-background text-foreground">
      <Header />
      <main className="flex-1 flex flex-col items-center">
        {/* Hero Section */}
        <section className="text-center py-20 px-6 w-full">
          <h1 className="text-5xl font-extrabold tracking-tight mb-4">
            Your Ultimate Companion for Academic Success
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            StudyBuddy provides the tools you need to study smarter, not harder. Organize notes, track progress, and ace your exams.
          </p>
          <Button size="lg" className="rounded-full">
            Get Started for Free <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </section>

        {/* Features Section */}
        <section className="bg-transparent py-20 px-6 w-full">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Everything You Need to Succeed</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="text-center p-6 rounded-lg bg-card/50 hover:bg-card/80 transition-colors">
                  <div className="flex justify-center mb-4">
                    <div className="bg-background p-4 rounded-full">
                      {feature.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 px-6 bg-transparent w-full">
            <div className="max-w-5xl mx-auto">
                <h2 className="text-3xl font-bold text-center mb-12">Loved by Students Everywhere</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <Card key={index} className="bg-card/50 border-border/50 flex flex-col justify-between hover:bg-card/80 transition-colors">
                            <CardContent className="pt-6">
                                <div className="flex mb-4">
                                    {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 text-primary fill-current" />)}
                                </div>
                                <p className="text-foreground mb-4">"{testimonial.quote}"</p>
                            </CardContent>
                            <CardHeader className="flex flex-row items-center gap-4 pt-0">
                                <Avatar>
                                    <AvatarImage src={testimonial.avatar} alt={testimonial.name} data-ai-hint={testimonial.dataAiHint} />
                                    <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <CardTitle className="text-base">{testimonial.name}</CardTitle>
                                    <CardDescription>{testimonial.role}</CardDescription>
                                </div>
                            </CardHeader>
                        </Card>
                    ))}
                </div>
            </div>
        </section>

        {/* Final CTA Section */}
        <section className="bg-primary/90 text-primary-foreground text-center py-20 px-6 w-full">
            <div className="max-w-xl mx-auto">
                <h2 className="text-3xl font-bold mb-4">Ready to Boost Your Grades?</h2>
                <p className="max-w-xl mx-auto mb-8">
                    Join thousands of students who are already studying smarter with StudyBuddy.
                </p>
                <Button variant="secondary" size="lg" className="bg-white text-primary hover:bg-gray-200 rounded-full">
                    Sign Up Now
                </Button>
            </div>
        </section>
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
