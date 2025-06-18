import React, { useState } from 'react';
import './App.css';

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const questions = [
    {
      id: 1,
      question: "Sence bugün nasıl bir gün?",
      options: ["Harika bir gün!", "Güzel bir gün", "Normal bir gün", "Özel bir gün"],
      correctAnswer: 0
    },
    {
      id: 2,
      question: "En sevdiğin renk hangisi?",
      options: ["Mavi", "Kırmızı", "Mor", "Yeşil"],
      correctAnswer: 2
    },
    {
      id: 3,
      question: "Hangi mevsimi daha çok seversin?",
      options: ["İlkbahar", "Yaz", "Sonbahar", "Kış"],
      correctAnswer: 1
    }
  ];

  const handleAnswerClick = (selectedAnswer: number) => {
    if (selectedAnswer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
      setFeedback("Doğru! 🎉");
    } else {
      setFeedback("Yanlış! 💪");
    }

    setTimeout(() => {
      setFeedback(null);
      const nextQuestion = currentQuestion + 1;
      if (nextQuestion < questions.length) {
        setCurrentQuestion(nextQuestion);
      } else {
        setShowScore(true);
      }
    }, 1000);
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setFeedback(null);
  };

  return (
    <div className="app">
      <div className="container">
        <div className="quiz-box">
          <h1 className="title">❤️ Aşk Testi ❤️</h1>
          
          {feedback && (
            <p className={`feedback ${feedback.includes("Doğru") ? "correct" : "wrong"}`}>
              {feedback}
            </p>
          )}
          
          {showScore ? (
            <div className="score-section">
              <p className="score-text">Quiz tamamlandı! 🎉</p>
              <p className="final-score">Puanın: {score} / {questions.length}</p>
              <button className="restart-button" onClick={restartQuiz}>
                Yeniden Başla
              </button>
            </div>
          ) : (
            <div className="question-section">
              <div className="question-box">
                <p className="question-count">
                  Soru {currentQuestion + 1}/{questions.length}
                </p>
                <p className="question-text">
                  {questions[currentQuestion].question}
                </p>
              </div>
              <div className="answer-section">
                {questions[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    className="answer-button"
                    onClick={() => handleAnswerClick(index)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
