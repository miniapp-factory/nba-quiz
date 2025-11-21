"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Share } from "@/components/share";
import { url } from "@/lib/metadata";

type Question = {
  question: string;
  answers: string[];
  correct: string;
};

const QUESTIONS: Question[] = [
  {
    question: "Who won the NBA MVP award in 2023?",
    answers: ["Giannis Antetokounmpo", "Nikola Jokić", "Luka Dončić", "Joel Embiid"],
    correct: "Giannis Antetokounmpo",
  },
  {
    question: "Which team drafted LeBron James in 2003?",
    answers: ["Cleveland Cavaliers", "Miami Heat", "Los Angeles Lakers", "Boston Celtics"],
    correct: "Cleveland Cavaliers",
  },
  {
    question: "What year did the NBA merge with the ABA?",
    answers: ["1976", "1979", "1980", "1983"],
    correct: "1976",
  },
  {
    question: "Who holds the record for most points in a single NBA game?",
    answers: ["Michael Jordan", "Kareem Abdul-Jabbar", "Wilt Chamberlain", "LeBron James"],
    correct: "Wilt Chamberlain",
  },
  {
    question: "Which player has the most NBA championships?",
    answers: ["Bill Russell", "Michael Jordan", "Tim Duncan", "Kareem Abdul-Jabbar"],
    correct: "Bill Russell",
  },
  {
    question: "Which team won the first NBA championship?",
    answers: ["Boston Celtics", "Philadelphia Warriors", "New York Knicks", "Los Angeles Lakers"],
    correct: "Philadelphia Warriors",
  },
  {
    question: "Who was the first African-American head coach in the NBA?",
    answers: ["Lenny Wilkens", "Pat Riley", "Gregg Popovich", "Phil Jackson"],
    correct: "Lenny Wilkens",
  },
  {
    question: "Which player was nicknamed 'The Greek Freak'?",
    answers: ["Giannis Antetokounmpo", "Kyrie Irving", "Stephen Curry", "Kevin Durant"],
    correct: "Giannis Antetokounmpo",
  },
  {
    question: "What is the maximum number of points a player can score in a single quarter?",
    answers: ["50", "60", "70", "80"],
    correct: "60",
  },
  {
    question: "Which team has the most NBA Finals appearances?",
    answers: ["Los Angeles Lakers", "Boston Celtics", "Chicago Bulls", "San Antonio Spurs"],
    correct: "Los Angeles Lakers",
  },
];

function shuffleArray<T>(array: T[]): T[] {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export default function Quiz() {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [answers, setAnswers] = useState<string[]>([]);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    if (finished) return;
    if (timeLeft === 0) {
      handleAnswer("");
      return;
    }
    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, finished]);

  const handleAnswer = (choice: string) => {
    const q = QUESTIONS[current];
    if (choice === q.correct) setScore(score + 1);
    setAnswers([...answers, choice]);
    if (current + 1 < QUESTIONS.length) {
      setCurrent(current + 1);
      setTimeLeft(10);
    } else {
      setFinished(true);
    }
  };

  const resetQuiz = () => {
    setCurrent(0);
    setScore(0);
    setTimeLeft(10);
    setAnswers([]);
    setFinished(false);
  };

  if (finished) {
    return (
      <Card className="w-full max-w-md">
        <CardHeader>
          <h2 className="text-xl font-semibold">Quiz Completed!</h2>
        </CardHeader>
        <CardContent>
          <p>Your score: {score} / {QUESTIONS.length}</p>
          <Share text={`I scored ${score} out of ${QUESTIONS.length} in the NBA Quiz! ${url}`} />
        </CardContent>
        <CardFooter>
          <Button onClick={resetQuiz}>Retake Quiz</Button>
        </CardFooter>
      </Card>
    );
  }

  const q = QUESTIONS[current];
  const shuffledAnswers = shuffleArray(q.answers);

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <h2 className="text-xl font-semibold">{q.question}</h2>
        <p className="text-muted-foreground">Time left: {timeLeft}s</p>
      </CardHeader>
      <CardContent>
        {shuffledAnswers.map((ans) => (
          <Button
            key={ans}
            variant="outline"
            className="w-full mb-2"
            onClick={() => handleAnswer(ans)}
          >
            {ans}
          </Button>
        ))}
      </CardContent>
    </Card>
  );
}
