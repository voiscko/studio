'use client';

import { useState } from 'react';
import type { StudyScheduleOutput } from '@/ai/flows/study-schedule-generator';
import Header from '@/components/layout/header';
import StudyTimer from '@/components/dashboard/study-timer';
import ProgressChart from '@/components/dashboard/progress-chart';
import StudyForm from '@/components/dashboard/study-form';
import StudySchedule from '@/components/dashboard/study-schedule';
import { getStudySchedule } from '@/app/actions';
import { useToast } from "@/hooks/use-toast"

export default function Home() {
  const [schedule, setSchedule] = useState<StudyScheduleOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast()

  const handleGenerateSchedule = async (data: any) => {
    setIsLoading(true);
    setSchedule(null);
    const result = await getStudySchedule(data);
    if (result.error) {
       toast({
        variant: "destructive",
        title: "Error Generating Schedule",
        description: result.error,
      })
    } else {
      setSchedule(result.schedule);
    }
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 p-4 sm:p-6 md:p-8 space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <StudyForm onGenerateSchedule={handleGenerateSchedule} isLoading={isLoading} />
          </div>
          <div className="space-y-8">
            <StudyTimer />
            <ProgressChart />
          </div>
        </div>
        <div>
          <StudySchedule schedule={schedule} isLoading={isLoading} />
        </div>
      </main>
    </div>
  );
}
