'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import DashboardLayout from '@/components/layout/DashboardLayout';

interface Question {
  id: number;
  type: 'multiple_choice' | 'fill_blank' | 'correction' | 'short_answer' | 'translation';
  question: string;
  options?: string[];
  correctAnswer: string;
  explanation?: string;
  userAnswer?: string;
}

function QuizContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams?.get('session');
  const materialCode = searchParams?.get('material');

  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutes
  const [userAnswers, setUserAnswers] = useState<Record<number, any>>({});
  const [showResults, setShowResults] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string>('');

  // 模拟题目数据（占位 - 后续从API获取）
  const questions: Question[] = [
    {
      id: 1,
      type: 'multiple_choice',
      question: 'She ______ to the store yesterday.',
      options: ['go', 'goes', 'went', 'gone'],
      correctAnswer: 'went',
      explanation: '"Went" is the simple past tense of "go". The sentence refers to a completed action in the past ("yesterday"), so we use simple past tense.',
    },
    {
      id: 2,
      type: 'fill_blank',
      question: 'They ______ dinner together last night.',
      correctAnswer: 'ate',
      explanation: '"Ate" is the correct past tense form of "eat".',
    },
    {
      id: 3,
      type: 'correction',
      question: 'Incorrect: I seed the movie last weekend.',
      correctAnswer: 'I saw the movie last weekend.',
      explanation: '"Seed" is incorrect. The past tense of "see" is "saw".',
    },
    {
      id: 4,
      type: 'short_answer',
      question: 'Explain the difference between "I have eaten" and "I ate" in terms of tense and usage.',
      correctAnswer: '"I have eaten" is present perfect tense, used to describe an action that happened at an unspecified time before now or has a connection to the present. "I ate" is simple past tense, used for a completed action at a specific time in the past.',
    },
    {
      id: 5,
      type: 'translation',
      question: 'Translate: 我昨天学习了英语语法。',
      correctAnswer: 'I studied English grammar yesterday.',
    },
  ];

  const totalQuestions = questions.length;

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitQuiz();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerChange = (answer: string) => {
    setUserAnswers({ ...userAnswers, [currentQuestion]: answer });
    setSelectedOption(answer);
  };

  const handleNext = () => {
    if (currentQuestion < totalQuestions) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(userAnswers[currentQuestion + 1] || '');
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 1) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedOption(userAnswers[currentQuestion - 1] || '');
    }
  };

  const handleSubmitQuiz = () => {
    // 计算分数（占位逻辑）
    let finalScore = 0;
    questions.forEach((q) => {
      const userAns = userAnswers[q.id];
      if (userAns && userAns.toLowerCase().trim() === q.correctAnswer.toLowerCase().trim()) {
        finalScore++;
      }
    });
    setScore(finalScore);
    setShowResults(true);
  };

  const calculateGrade = () => {
    const percentage = (score / totalQuestions) * 100;
    if (percentage >= 90) return 'A';
    if (percentage >= 80) return 'B';
    if (percentage >= 70) return 'C';
    if (percentage >= 60) return 'D';
    return 'F';
  };

  const currentQ = questions[currentQuestion - 1];
  const progressPercent = (currentQuestion / totalQuestions) * 100;

  return (
    <div className="min-h-screen bg-gray-900 bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-primary text-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Grammar Practice Quiz</h1>
              <p className="text-white/80 mt-1">Test your understanding</p>
            </div>
            <div className="text-right">
              <div className="text-sm opacity-90">Material: {materialCode || 'ENG-2025-U3-A'}</div>
              <div className="text-sm opacity-90">Time: {formatTime(timeLeft)}</div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex justify-between text-sm mb-2">
              <span>Question {currentQuestion} of {totalQuestions}</span>
              <span>Score: {score}/{totalQuestions}</span>
            </div>
            <div className="w-full bg-white bg-opacity-20 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Content */}
        {!showResults ? (
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-text-primary mb-4">
                <span className="text-primary font-bold">{currentQuestion}.</span> {currentQ.question}
              </h2>

              {/* Multiple Choice */}
              {currentQ.type === 'multiple_choice' && currentQ.options && (
                <div className="space-y-3">
                  {currentQ.options.map((option, idx) => (
                    <div
                      key={idx}
                      onClick={() => handleAnswerChange(option)}
                      className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                        selectedOption === option
                          ? 'border-primary bg-primary/10'
                          : 'border-border-light hover:border-primary hover:bg-primary/5'
                      }`}
                    >
                      <div className="flex items-center">
                        <span className="w-6 h-6 border-2 border-border-light rounded-full flex items-center justify-center mr-3 text-sm font-medium">
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span className="text-text-primary">{option}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Fill Blank / Correction / Translation */}
              {(currentQ.type === 'fill_blank' || currentQ.type === 'correction' || currentQ.type === 'translation') && (
                <input
                  type="text"
                  value={selectedOption}
                  onChange={(e) => handleAnswerChange(e.target.value)}
                  placeholder="Type your answer here..."
                  className="w-full px-4 py-3 border-2 border-border-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-lg"
                />
              )}

              {/* Short Answer */}
              {currentQ.type === 'short_answer' && (
                <textarea
                  value={selectedOption}
                  onChange={(e) => handleAnswerChange(e.target.value)}
                  rows={4}
                  placeholder="Type your answer here..."
                  className="w-full px-4 py-3 border-2 border-border-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-lg resize-none"
                />
              )}
            </div>
          </div>
        ) : (
          // Results
          <div className="p-6 text-center">
            <div className="w-24 h-24 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-6">
              <i className="fas fa-trophy text-primary text-3xl"></i>
            </div>
            <h2 className="text-3xl font-bold text-text-primary mb-2">Quiz Completed!</h2>
            <p className="text-lg text-text-secondary mb-6">Great job! Here are your results:</p>

            <div className="bg-gray-50 rounded-xl p-6 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-1">{score}/{totalQuestions}</div>
                  <div className="text-sm text-text-secondary">Score</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-secondary mb-1">
                    {Math.round((score / totalQuestions) * 100)}%
                  </div>
                  <div className="text-sm text-text-secondary">Percentage</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-accent mb-1">{calculateGrade()}</div>
                  <div className="text-sm text-text-secondary">Grade</div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <button
                onClick={() => router.push(`/tutor/chat?material=${materialCode}`)}
                className="px-8 py-3 bg-primary text-white rounded-lg hover:bg-secondary transition-colors"
              >
                Return to Tutoring
              </button>
            </div>
          </div>
        )}

        {/* Footer */}
        {!showResults && (
          <div className="bg-gray-50 border-t border-border-light p-6">
            <div className="flex items-center justify-between">
              <div className="text-sm text-text-secondary">
                <i className="fas fa-clock mr-2"></i>
                <span>{formatTime(timeLeft)}</span>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={handlePrevious}
                  disabled={currentQuestion === 1}
                  className="px-6 py-2 border border-border-light text-text-secondary rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <i className="fas fa-chevron-left mr-2"></i>Previous
                </button>
                {currentQuestion < totalQuestions ? (
                  <button
                    onClick={handleNext}
                    className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-secondary transition-colors"
                  >
                    Next<i className="fas fa-chevron-right ml-2"></i>
                  </button>
                ) : (
                  <button
                    onClick={handleSubmitQuiz}
                    className="px-6 py-2 bg-secondary text-white rounded-lg hover:bg-accent transition-colors"
                  >
                    Submit Quiz
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function QuizPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <QuizContent />
    </Suspense>
  );
}

