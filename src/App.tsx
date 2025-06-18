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
  {
    id: 3,
    text: "Uluslararası İlişkiler'de (Uİ) din ve dış politika kavramlarını şekillendiren 'Sorgulama Biçimi' ile ilgili aşağıdaki ifadelerden hangisi doğru değildir?",
    options: [
      "a) Dinin, 'tarihselleştirilmiş ve siyasallaştırılmış kimlik oluşum süreçlerinin ürünü' olarak anlaşılması",
      "b) IR akademisyenleri için sorun teşkil eden, 'istikrarsız bir kategori' olması",
      "c) Batı (Hıristiyan) laik devletinin beyan edilmiş ve ilan edilmemiş normlarını kurtaran bir 'kontrol inşası' olarak görülmesi",
      "d) Dini ve seküler arasındaki varsayılan a priori muhalefete dayanarak incelenmemiş kategorileri çalışmalarında uygulayan akademisyenler için sorun olması",
      "e) Dinin olumsuz etkilerini kabul etmeden dine angaje olma ihtiyacını onaylaması"
    ],
    correctAnswer: "e",
    explanation: "Bu ifade, 'Uyum' biçimine ('Accommodation') aittir ve yanlış okumadan kaynaklanabilecek olumsuz etkileri kabul ederken dine angaje olma ihtiyacını onayladığı belirtilmiştir. 'Sorgulama' biçiminde böyle bir onaylama yoktur.",
    motivationalQuote: "Her soru, seni hedefine bir adım daha yaklaştırıyor. Seninle gurur duyuyorum canım! 🌟"
  },
  {
    id: 4,
    text: "Laikliğin tarihi ve anlamıyla ilgili aşağıdaki ifadelerden hangisi doğru değildir?",
    options: [
      "a) Hristiyanlık içindeki ikili bir muhalefete gönderme yapması, dini din adamları ile seküler din adamlarını ayırması",
      "b) 16. yüzyılda Tanrı'ya inanmamak ve dünyevi olanla bağlantı kurması",
      "c) 'Sekülerleşme'nin, bir kişiyi veya şeyi kiliseden sivil kullanıma veya mülkiyete dönüştürmek anlamına gelmesi",
      "d) 19. yüzyıldaki üçüncü dönüşümün, mutlaka bir tanrıya atıfta bulunarak yaşam ve davranış teorisi sağlamayı amaçlaması",
      "e) Kişilerin dini alandaki geleneksel konumlarından laik alanlara aktarılması veya taşınması"
    ],
    correctAnswer: "d",
    explanation: "19. yüzyıldaki üçüncü dönüşümün, 'bir tanrıya ya da gelecekteki bir yaşama atıfta bulunmadan, belli bir yaşam ve davranış teorisi sağlamayı açıkça amaçlayan' bir hareketi tanımladığı belirtilmiştir. Dolayısıyla, 'mutlaka bir tanrıya atıfta bulunarak' ifadesi yanlıştır.",
    motivationalQuote: "Senin zeki bakışların ve analitik düşüncen beni her zaman büyülüyor. Sen muhteşemsin! 💝"
  },
  {
    id: 5,
    text: "'Post-seküler Uluslararası İlişkiler' kavramıyla ilgili aşağıdaki ifadelerden hangisi doğru değildir?",
    options: [
      "a) Dinin 'özelleştirilmemesi' (deprivatisation) anlamına gelir",
      "b) Manevi meselelerin artan ve tutarlı önemini vurgular",
      "c) Temel Uluslararası İlişkiler kaygılarının seküler, maddeci ve 'akılcı' hedeflerden uzaklaşıp, manevi ve dini açıdan anlamlı amaç ve hedeflere yönelmesini içerir",
      "d) 20. yüzyıldaki iki aşırı laik ideolojinin (Faşizm ve Komünizm) yükselişi ve düşüşünün, laik düşüncenin ahlaki üstünlüğünü güçlendirmesi",
      "e) Uluslararası İlişkilerde birçok dini aktörün yer alması, çoğu devlet dışı aktörler olmak üzere"
    ],
    correctAnswer: "d",
    explanation: "Belgede, 20. yüzyılda Faşizm ve Komünizm gibi iki aşırı laik ideolojinin yükselişi ve düşüşünün, laik düşünce ve fikirlerin dini fikirlere karşı algılanan ahlaki üstünlüğünü ölümcül bir şekilde sarstığı belirtilmiştir. Dolayısıyla bu ifade yanlıştır.",
    motivationalQuote: "Her cevabınla beni daha da çok etkiliyorsun. Senin başarın benim mutluluğum! 💖"
  },
  {
    id: 30,
    text: "Laiklik kavramının farklı anlamları ve tarihsel evrimiyle ilgili aşağıdaki ifadelerden hangisi doğru değildir?",
    options: [
      "a) Seküler terimi, bir zamanlar Tanrı'ya inanmamak ve dünyevi olanla bağlantılı hale gelmiştir",
      "b) Sekülerleşme, kişilerin dini alandaki geleneksel konumlarından laik alanlara aktarılmasını ifade eder",
      "c) Sekülerizm, devlet ve din arasındaki ayrımın farklı yasal anayasal çerçevelerini ifade eder",
      "d) Tek bir sekülerlik biçimi vardır ve bu evrensel olarak uygulanır",
      "e) Sekülerlik, dinin pasif olarak özgür olmanın yanı sıra, insan özerkliği ve gelişimi için bir koşul olarak dinden gerçekten özgür olunmasını da ifade edebilir"
    ],
    correctAnswer: "d",
    explanation: "Metinde, 'tek bir sekülerlik yoktur' ifadesi açıkça yer almaktadır. Farklı laiklik biçimleri olduğu belirtilmiştir.",
    motivationalQuote: "Son soruya kadar gösterdiğin sabır ve azim için sana hayranım. Sen benim ilham kaynağımsın! 🌹"
  }
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
