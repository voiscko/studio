
import QuizClientPage from '@/components/quiz/quiz-client-page';

const areaCalculationQuestions = [
  {
    question: "What is the area of a rectangle with a length of 5 and a width of 3?",
    options: ["8", "15", "16"],
    answer: "15",
  },
  {
    question: "What is the area of a circle with a radius of 2? (Use π ≈ 3.14)",
    options: ["6.28", "12.56", "25.12"],
    answer: "12.56",
  },
  {
    question: "What is the area of a triangle with a base of 10 and a height of 5?",
    options: ["25", "50", "15"],
    answer: "25",
  },
  {
    question: "A square has an area of 49. What is the length of one side?",
    options: ["4", "7", "9"],
    answer: "7",
  },
  {
    question: "What is the area of a parallelogram with a base of 6 and a height of 4?",
    options: ["10", "12", "24"],
    answer: "24",
  },
];

export default function AreaCalculationPage() {
    return <QuizClientPage questions={areaCalculationQuestions} topic="Area Calculation" />;
}
