'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Timer, Play, Pause, RefreshCw } from 'lucide-react';

export default function StudyTimer() {
  const [time, setTime] = useState(1500); // 25 minutes in seconds
  const [isActive, setIsActive] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };
  
  const startTimer = useCallback(() => {
    if (time > 0) {
      setIsActive(true);
    }
  }, [time]);
  
  const pauseTimer = useCallback(() => {
    setIsActive(false);
  }, []);
  
  const resetTimer = useCallback(() => {
    setIsActive(false);
    setTime(1500);
  }, []);

  useEffect(() => {
    if (isActive && time > 0) {
      timerRef.current = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (!isActive || time === 0) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      if (time === 0) {
        setIsActive(false);
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isActive, time]);


  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium">Study Timer</CardTitle>
        <Timer className="h-5 w-5 text-muted-foreground" />
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center space-y-4">
        <div
          className="relative h-48 w-48 rounded-full border-8 border-muted flex items-center justify-center"
          role="timer"
          aria-live="polite"
        >
          <div className="absolute top-0 left-0 w-full h-full rounded-full" style={{ background: `conic-gradient(hsl(var(--primary)) ${(1500 - time) / 1500 * 360}deg, transparent 0deg)` }}></div>
          <div className="relative z-10 text-5xl font-mono font-bold text-foreground">
            {formatTime(time)}
          </div>
        </div>
        <div className="flex space-x-3">
          <Button onClick={isActive ? pauseTimer : startTimer} size="lg" aria-label={isActive ? 'Pause timer' : 'Start timer'}>
            {isActive ? <Pause /> : <Play />}
            <span className="ml-2">{isActive ? 'Pause' : 'Start'}</span>
          </Button>
          <Button onClick={resetTimer} variant="outline" size="lg" aria-label="Reset timer">
            <RefreshCw />
            <span className="ml-2">Reset</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
