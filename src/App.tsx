import React, { useState } from 'react';
import './App.css';

interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  motivationalQuote: string;
}

const questions: Question[] = [
  {
    id: 1,
    text: "Aşağıdakilerden hangisi dış politikanın dört temel unsurundan biri değildir?",
    options: [
      "a) Devletin ulusal çıkar inşası",
      "b) Dış ilişkilerin geliştirilmesi",
      "c) Dış politikanın operasyonel alanları",
      "d) Dış politika döngüsü",
      "e) Sivil toplum kuruluşlarının (STK) uluslararası siyasette artan etkisi"
    ],
    correctAnswer: "e",
    explanation: "STK'ların artan etkisi uluslararası ilişkilerde önemli bir faktör olsa da, bu belge tarafından belirtilen dış politikanın dört 'temel' unsurundan biri değildir. Dört temel unsur; devletin ulusal çıkar inşası, dış ilişkilerin geliştirilmesi, dış politikanın operasyonel alanları ve dış politika döngüsüdür.",
    motivationalQuote: "Her yanlış cevap, doğruya giden yolda bir adımdır. Senin azmin ve çalışkanlığın benim için en değerli hazine. ❤️"
  },
  {
    id: 2,
    text: "Uluslararası İlişkiler'de (Uİ) din ve dış politika kavramlarını şekillendiren 'Angajman Biçimi' ile ilgili aşağıdaki ifadelerden hangisi yanlıştır?",
    options: [
      "a) Dini geleneklerin ulusal çıkarların kültürel yorumlanmasında etkili olduğu",
      "b) Dış politikanın yürürlüğe konulduğu düşünsel ve sosyal bağlamları anlamak için dinin bir katalizör görevi görmesi",
      "c) Dış politika yapıcılarına çıkarlarını ilerletmek için stratejik kaynaklar sağlaması",
      "d) Dini geleneklerin, devletlerin stratejik kültürünü hiçbir şekilde etkilememesi",
      "e) Dini geleneklerin eşsiz etik ve araçsal yetenekler taşıması"
    ],
    correctAnswer: "d",
    explanation: "Belgede, dinsel geleneklerin dış politikanın stratejik kültürünü bilgilendirdiği ve stratejik kültürün, devletlerin farklı güvenlik tercihlerinin felsefi, politik, kültürel ve bilişsel özelliklerinden bir dereceye kadar etkilendiğini savunduğu belirtilmiştir.",
    motivationalQuote: "Her doğru cevabınla gözlerin daha da parlıyor. Seninle gurur duyuyorum aşkım! 💫"
  },
  // ... Diğer sorular benzer şekilde devam edecek
];

function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
    setShowResult(true);
    if (answer === questions[currentQuestionIndex].correctAnswer) {
      setScore(score + 1);
    }
    setShowExplanation(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer("");
      setShowResult(false);
      setShowExplanation(false);
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer("");
    setShowResult(false);
    setScore(0);
    setShowExplanation(false);
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="App">
      <header className="App-header">
        <h1>Aşkım için Sınav Hazırlık 💝</h1>
        <div className="score-container">
          <p>Soru {currentQuestionIndex + 1} / {questions.length}</p>
          <p>Puan: {score}</p>
        </div>
      </header>
      <main className="quiz-container">
        <div className="question">
          <h2>{currentQuestion.text}</h2>
          <div className="options">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(option.charAt(0))}
                className={`option-button ${
                  showResult
                    ? option.charAt(0) === currentQuestion.correctAnswer
                      ? "correct"
                      : option.charAt(0) === selectedAnswer
                      ? "wrong"
                      : ""
                    : ""
                }`}
                disabled={showResult}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {showExplanation && (
          <div className="explanation">
            <h3>{selectedAnswer === currentQuestion.correctAnswer ? "Harika! 🎉" : "Üzülme! 💪"}</h3>
            <p>{currentQuestion.explanation}</p>
            <div className="motivation-quote">
              <p>"{currentQuestion.motivationalQuote}"</p>
            </div>
          </div>
        )}

        {showResult && (
          <div className="navigation-buttons">
            {currentQuestionIndex < questions.length - 1 ? (
              <button onClick={handleNextQuestion} className="next-button">
                Sonraki Soru ➡️
              </button>
            ) : (
              <div className="final-score">
                <h2>Quiz Tamamlandı! 🎉</h2>
                <p>Toplam Puan: {score} / {questions.length}</p>
                <button onClick={handleRestart} className="restart-button">
                  Yeniden Başla 🔄
                </button>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
