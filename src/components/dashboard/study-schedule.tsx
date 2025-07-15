'use client';

import type { StudyScheduleOutput } from '@/ai/flows/study-schedule-generator';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Skeleton } from '@/components/ui/skeleton';
import { CalendarDays, Book, ClipboardCheck, Clock, Info } from 'lucide-react';

interface StudyScheduleProps {
  schedule: StudyScheduleOutput | null;
  isLoading: boolean;
}

export default function StudySchedule({ schedule, isLoading }: StudyScheduleProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Your AI-Generated Schedule</CardTitle>
        <CardDescription>
          Here is your personalized study plan. Check off tasks as you complete them.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading && <ScheduleSkeleton />}
        {!isLoading && !schedule && <InitialState />}
        {!isLoading && schedule && (
          <Accordion type="single" collapsible className="w-full" defaultValue="item-0">
            {schedule.schedule.map((day, index) => (
              <AccordionItem value={`item-${index}`} key={day.date}>
                <AccordionTrigger className="text-lg font-medium hover:no-underline">
                  <div className="flex items-center gap-3">
                    <CalendarDays className="h-5 w-5 text-primary" />
                    <span>{new Date(day.date + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4 pt-2 pl-4 border-l-2 border-primary/20 ml-2">
                    {day.tasks.map((task, taskIndex) => (
                      <div key={taskIndex} className="p-4 rounded-lg bg-muted/50">
                        <div className="flex items-center justify-between mb-2">
                            <p className="font-semibold text-foreground">{task.description}</p>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground font-mono">
                                <Clock className="h-4 w-4"/>
                                <span>{task.duration} {task.duration > 1 ? 'hrs' : 'hr'}</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1.5">
                                <Book className="h-4 w-4 text-accent" />
                                <span>{task.course}</span>
                            </div>
                            {task.assignment && (
                                <div className="flex items-center gap-1.5">
                                    <ClipboardCheck className="h-4 w-4 text-accent" />
                                    <span>{task.assignment}</span>
                                </div>
                            )}
                        </div>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}
      </CardContent>
    </Card>
  );
}

const ScheduleSkeleton = () => (
  <div className="space-y-4">
    {[...Array(3)].map((_, i) => (
      <div key={i} className="space-y-2">
        <Skeleton className="h-8 w-1/2" />
        <div className="pl-6 space-y-3">
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
        </div>
      </div>
    ))}
  </div>
);

const InitialState = () => (
    <div className="text-center py-10 px-6 border-2 border-dashed rounded-lg">
        <Info className="mx-auto h-12 w-12 text-muted-foreground" />
        <h3 className="mt-2 text-lg font-medium text-foreground">Waiting for your input</h3>
        <p className="mt-1 text-sm text-muted-foreground">Fill out the form above to generate your personalized study schedule.</p>
    </div>
)
