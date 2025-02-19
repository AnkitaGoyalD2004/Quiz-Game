
"use client";

import { useEffect, useState } from "react";
import { getQuizHistory, saveQuizResult } from "../lib/indexedDB";
import { quizQuestions } from "../lib/quizData";
import Timer from "./Timer";

export const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | number>("");
  const [score, setScore] = useState(0);
  const [quizOver, setQuizOver] = useState(false);
  const [history, setHistory] = useState<{ score: number; totalQuestions: number; timestamp: string }[]>([]);

  useEffect(() => {
    if (quizOver) {
      fetchHistory();
    }
  }, [quizOver]);

  const fetchHistory = async () => {
    const data = await getQuizHistory();
    setHistory(data as { score: number; totalQuestions: number; timestamp: string }[]);
  };

  const handleAnswer = async (option: string | number) => {
    setSelectedAnswer(option);
    setScore((prev) => (option === quizQuestions[currentQuestion].answer ? prev + 1 : prev));

    setTimeout(async () => {
      handleNextQuestion(option === quizQuestions[currentQuestion].answer);
    }, 1000);
  };

  const handleTimeout = () => {
    handleNextQuestion(false); // Move to the next question when time runs out
  };

  const handleNextQuestion = async (isCorrect: boolean) => {
    if (currentQuestion + 1 < quizQuestions.length) {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedAnswer("");
    } else {
      setQuizOver(true);
      const finalScore = isCorrect ? score + 1 : score;
      await saveQuizResult(finalScore, quizQuestions.length);
      fetchHistory();
    }
  };

  const retryQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer("");
    setScore(0);
    setQuizOver(false);
  };

  return (
    <div className="bg-white p-5 rounded-lg shadow-md">
      {quizOver ? (
        <div className="text-center">
          <h2 className="text-xl font-bold">Quiz Over!</h2>
          <p>Your Score: {score}/{quizQuestions.length}</p>
          {history.length === 0 ? (
            <p className="text-gray-500">No previous attempts.</p>
          ) : (
            <ul className="mt-2 text-left">
              {history.map((entry, index) => (
                <li key={index} className="p-2 border-b">
                  <p className="font-semibold">Attempt {history.length - index}:</p>
                  <p>Score: {entry.score} / {entry.totalQuestions}</p>
                  <p className="text-sm text-gray-500">Date: {new Date(entry.timestamp).toLocaleString()}</p>
                </li>
              ))}
            </ul>
          )}

          <button
            onClick={retryQuiz}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            Retry Quiz
          </button>
        </div>
      ) : (
        <div>
          {/* Reset Timer on question change */}
          <Timer key={currentQuestion} onTimeout={handleTimeout} />

          {quizQuestions[currentQuestion] ? (
            <div>
              <h3 className="text-lg font-semibold">
                {quizQuestions[currentQuestion].question}
              </h3>

              {quizQuestions[currentQuestion].type === "MCQ" ? (
                <div className="mt-3">
                  {quizQuestions[currentQuestion].options?.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswer(option)}
                      className={`block w-full p-2 mt-2 rounded-lg ${
                        selectedAnswer
                          ? option === quizQuestions[currentQuestion].answer
                            ? "bg-green-500 text-white"
                            : "bg-red-500 text-white"
                          : "bg-blue-500 text-white"
                      }`}
                      disabled={!!selectedAnswer}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="mt-3">
                  <input
                    type="number"
                    value={selectedAnswer}
                    onChange={(e) => setSelectedAnswer(Number(e.target.value))}
                    className="mt-2 p-2 border rounded w-full"
                    placeholder="Enter your answer"
                  />
                  <button
                    onClick={() => handleAnswer(selectedAnswer)}
                    disabled={selectedAnswer === ""}
                    className="mt-3 px-4 py-2 bg-green-500 text-white rounded-lg w-full"
                  >
                    Submit Answer
                  </button>
                </div>
              )}
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      )}
    </div>
  );
};
