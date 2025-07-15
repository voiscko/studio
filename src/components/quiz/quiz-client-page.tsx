
'use client';

import { useState } from 'react';
import Header from '@/components/layout/header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, XCircle, ArrowRight, RotateCw, Trophy } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import Image from 'next/image';

interface Question {
  question: string;
  options: string[];
  answer: string;
}

interface QuizClientPageProps {
  questions: Question[];
  topic: string;
}

export default function QuizClientPage({ questions, topic }: QuizClientPageProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex) / questions.length) * 100;

  const handleCheckAnswer = () => {
    if (!selectedAnswer) return;

    const correct = selectedAnswer === currentQuestion.answer;
    setIsCorrect(correct);
    setIsAnswered(true);
    if (correct) {
      setScore(prev => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      resetQuestionState();
    } else {
      setQuizFinished(true);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    resetQuestionState();
    setQuizFinished(false);
  };

  const resetQuestionState = () => {
    setSelectedAnswer(null);
    setIsAnswered(false);
    setIsCorrect(false);
  };

  if (quizFinished) {
    return (
      <div className="flex flex-col min-h-screen bg-background text-foreground">
        <Header />
        <main className="flex-1 flex items-center justify-center p-6">
          <Card className="w-full max-w-2xl text-center">
            <CardHeader>
              <div className="flex justify-center mb-4">
                  <Trophy className="h-16 w-16 text-primary" />
              </div>
              <CardTitle className="text-3xl">Quiz Complete!</CardTitle>
              <CardDescription>Topic: {topic}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold mb-4">
                Your Score: {score} / {questions.length}
              </p>
              <p className="text-muted-foreground mb-6">
                You answered {((score / questions.length) * 100).toFixed(0)}% of the questions correctly.
              </p>
              <Button onClick={handleRestartQuiz}>
                <RotateCw className="mr-2 h-4 w-4" />
                Try Again
              </Button>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-1 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <p className="text-sm text-muted-foreground mb-2">
              Question {currentQuestionIndex + 1} of {questions.length}
            </p>
            <Progress value={progress} className="w-full" />
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Topic: {topic}</CardTitle>
              <CardDescription className="pt-4 text-lg text-foreground">
                {currentQuestion.question}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={selectedAnswer ?? ''}
                onValueChange={setSelectedAnswer}
                disabled={isAnswered}
                className="space-y-4"
              >
                {currentQuestion.options.map((option, index) => (
                  <Label
                    key={index}
                    htmlFor={`option-${index}`}
                    className={`flex items-center p-4 rounded-lg border cursor-pointer transition-colors ${
                      isAnswered && option === currentQuestion.answer ? 'border-primary bg-primary/10' : ''
                    } ${
                      isAnswered && option !== currentQuestion.answer && option === selectedAnswer ? 'border-destructive bg-destructive/10' : ''
                    }`}
                  >
                    <RadioGroupItem value={option} id={`option-${index}`} className="mr-4" />
                    <span>{option}</span>
                  </Label>
                ))}
              </RadioGroup>

              {isAnswered && (
                <div className="mt-6 flex items-center justify-between gap-6">
                  <Alert className={`flex-1 ${isCorrect ? 'border-primary' : 'border-destructive'}`}>
                      {isCorrect ? <CheckCircle className="h-4 w-4 text-primary" /> : <XCircle className="h-4 w-4 text-destructive" />}
                    <AlertTitle>{isCorrect ? 'Correct!' : 'Incorrect'}</AlertTitle>
                    <AlertDescription>
                      {isCorrect
                        ? 'Great job! You selected the right answer.'
                        : `The correct answer is: ${currentQuestion.answer}`}
                    </AlertDescription>
                  </Alert>
                  <div className="hidden md:block flex-shrink-0 w-32 h-32 relative">
                     <Image 
                        src={isCorrect ? "https://i.imgur.com/2GFxskf.png" : "https://i.imgflip.com/1k26so.jpg"} 
                        alt={isCorrect ? "Cool smiley face meme" : "Y U NO meme"}
                        layout="fill"
                        objectFit="contain"
                        className="rounded-lg"
                        unoptimized
                     />
                  </div>
                </div>
              )}

              <div className="mt-8 flex justify-end">
                {isAnswered ? (
                  <Button onClick={handleNextQuestion}>
                    {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <Button onClick={handleCheckAnswer} disabled={!selectedAnswer}>
                    Check Answer
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
