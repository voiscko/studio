
import QuizClientPage from '@/components/quiz/quiz-client-page';

const germanVocabularyQuestions = [
  {
    question: "What is the German word for 'house'?",
    options: ["Auto", "Haus", "Stuhl"],
    answer: "Haus",
  },
  {
    question: "What does 'danke' mean in English?",
    options: ["Please", "Sorry", "Thank you"],
    answer: "Thank you",
  },
  {
    question: "Which word means 'to eat'?",
    options: ["trinken", "lesen", "essen"],
    answer: "essen",
  },
  {
    question: "What is 'the water' in German?",
    options: ["das Wasser", "der Wein", "die Milch"],
    answer: "das Wasser",
  },
  {
    question: "What is the German word for 'friend'?",
    options: ["Feind", "Freund", "Familie"],
    answer: "Freund",
  },
];

export default function GermanVocabularyPage() {
    return <QuizClientPage questions={germanVocabularyQuestions} topic="German Vocabulary" />;
}
