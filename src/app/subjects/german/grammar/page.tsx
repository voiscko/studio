
import QuizClientPage from '@/components/quiz/quiz-client-page';

const germanGrammarQuestions = [
  {
    question: "Welcher Artikel ist korrekt: ___ Apfel?",
    options: ["der", "die", "das"],
    answer: "der",
  },
  {
    question: "Wie lautet der Plural von 'das Buch'?",
    options: ["die Buch", "die Buchen", "die Bücher"],
    answer: "die Bücher",
  },
  {
    question: "Wähle das richtige Präteritum von 'gehen'.",
    options: ["ging", "gegangen", "gehte"],
    answer: "ging",
  },
  {
    question: "Welches Wort passt in die Lücke: 'Ich habe ___ Hund.'",
    options: ["ein", "einen", "einem"],
    answer: "einen",
  },
  {
    question: "Welche Präposition ist korrekt: 'Ich warte ___ dich.'",
    options: ["auf", "für", "mit"],
    answer: "auf",
  },
];

export default function GermanGrammarPage() {
    return <QuizClientPage questions={germanGrammarQuestions} topic="German Grammar" />;
}
