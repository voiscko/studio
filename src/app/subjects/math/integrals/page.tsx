
import QuizClientPage from '@/components/quiz/quiz-client-page';

const integralQuestions = [
  {
    question: "What is the integral of 2x?",
    options: ["x^2 + C", "2x^2 + C", "x + C"],
    answer: "x^2 + C",
  },
  {
    question: "What is the integral of cos(x)?",
    options: ["-sin(x) + C", "sin(x) + C", "-cos(x) + C"],
    answer: "sin(x) + C",
  },
  {
    question: "What is the integral of e^x?",
    options: ["e^x + C", "x*e^x + C", "ln(x) + C"],
    answer: "e^x + C",
  },
  {
    question: "What is the integral of 1/x?",
    options: ["-1/x^2 + C", "1 + C", "ln|x| + C"],
    answer: "ln|x| + C",
  },
  {
    question: "What is the definite integral of 3x^2 from 0 to 1?",
    options: ["1", "3", "0"],
    answer: "1",
  },
];

export default function IntegralsPage() {
    return <QuizClientPage questions={integralQuestions} topic="Integrals" />;
}
