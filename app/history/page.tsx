"use client";

import { useEffect, useState } from "react";
import { getQuizHistory } from "../lib/indexedDB";

type QuizResult = {
  id: number;
  score: number;
  totalQuestions: number;
  timestamp: string;
};

const History = () => {
  const [history, setHistory] = useState<QuizResult[]>([]);

  useEffect(() => {
    async function fetchHistory() {
      const data = await getQuizHistory();
      setHistory(data as QuizResult[]);
    }
    fetchHistory();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Quiz History</h1>
      {history.length === 0 ? (
        <p>No quiz history available.</p>
      ) : (
        <ul className="space-y-4">
          {history.map((quiz) => (
            <li key={quiz.id} className="border p-4 rounded-lg shadow">
              <p><strong>Score:</strong> {quiz.score}/{quiz.totalQuestions}</p>
              <p><strong>Date:</strong> {new Date(quiz.timestamp).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default History;

