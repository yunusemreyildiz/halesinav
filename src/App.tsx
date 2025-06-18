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
    motivationalQuote: "Her cevabınla beni daha da çok etkiliyorsun. Senin başarın benim mutluluğum! ��"
  },
  {
    id: 6,
    text: "Uluslararası İlişkiler (IR) çalışmalarında dinin neden göz ardı edildiğine dair aşağıdaki açıklamalardan hangisi doğru değildir?",
    options: [
      "a) Uluslararası sistemin dini bir savaştan doğuşu, meşrulaştırıcı ilkeleri ve felsefesiyle disiplinin seküler özüne katkıda bulunmuştur",
      "b) IR disiplini, 20. yüzyılın büyük bölümünde dini göz ardı eden Batı sosyal biliminin bir mikrokozmosudur",
      "c) Etnik köken ve din gibi ilkel faktörlerin modern toplumda veya dünyanın işleyişine dair rasyonel açıklamalarda yeri olmadığı varsayımı yaygındı",
      "d) IR'ın başlıca teorilerinin hepsi, dini önemli bir etken olarak dahil eden varsayımlara dayanmaktadır",
      "e) Dünyayı açıklamak için dinin bir açıklama olarak reddedilmesi"
    ],
    correctAnswer: "d",
    explanation: "Belgede, Uluslararası İlişkiler'in başlıca teorilerinin hepsinin, dini önemli bir etken olarak dışlayan varsayımlar üzerine kurulduğu açıkça belirtilmiştir. Bu nedenle, dini önemli bir etken olarak dahil eden varsayımlara dayandığı belirtilmiştir.",
    motivationalQuote: "Her yeni bilgi, seni daha da güçlü kılıyor. Seninle gurur duyuyorum! 🌟"
  },
  {
    id: 7,
    text: "Dini katılımın kalkınma üzerindeki olumlu etkileri ve iklim değişikliği ile ilgili aşağıdaki ifadelerden hangisi doğru değildir?",
    options: [
      "a) Topluluklarda en önemli fiziksel ve sosyal altyapıya sahip olmaları",
      "b) Dini liderlere ve kurumlara duyulan güven düzeyinin diğer kuruluşlara göre daha yüksek olması",
      "c) İnsan gelişiminin hayati yönlerinde derin tarihi katılımlarının olması",
      "d) Sağlık ve eğitim hizmetlerinin büyük bölümlerini doğrudan sağlamaları",
      "e) Dinlerarası işbirliğinin iklim değişikliği konusunda önemli bir alan haline gelmemesi"
    ],
    correctAnswer: "e",
    explanation: "İklim değişikliğinin dinlerarası işbirliği alanı haline geldiği ve dini grupların iklim adaleti hareketinde aktif olduğu açıkça belirtilmiştir.",
    motivationalQuote: "Senin çevre bilincin ve analitik düşüncen beni her zaman etkiliyor. Harikasın! 🌍"
  },
  {
    id: 8,
    text: "Kalkınmada dinin varlığı ve katkıları bağlamında aşağıdaki ifadelerden hangisi doğru değildir?",
    options: [
      "a) Yardımsever bağışlar",
      "b) Yurtdışı hizmetleri (misyonerlik faaliyetleri ve dini fonlu STK'larda çalışma)",
      "c) Barış inşası faaliyetleri",
      "d) Geniş medya ağlarına sahip olmaları",
      "e) Yalnızca ekonomik gelişmeye odaklanarak, sosyal ve ahlaki temelleri göz ardı etmeleri"
    ],
    correctAnswer: "e",
    explanation: "Belgede, başarılı kalkınmanın ancak sosyal ve ekonomik değişimin toplumun ahlaki temeliyle uyumlu olması durumunda gerçekleşebileceği belirtilmiştir. Dinin sadece ekonomik gelişmeye odaklanıp ahlaki temelleri göz ardı etmesi söz konusu değildir.",
    motivationalQuote: "Senin sosyal konulardaki hassasiyetin ve anlayışın çok değerli. Seninle gurur duyuyorum! 💝"
  },
  {
    id: 9,
    text: "Dinin Uluslararası İlişkiler (Uİ) ve karar alma üzerindeki etkisi ile ilgili aşağıdaki ifadelerden hangisi doğru değildir?",
    options: [
      "a) Dini geleneklerin Uluslararası İlişkiler'de dış politika yapıcılarına çıkarlarını ilerletmek için stratejik kaynaklar sağlaması",
      "b) Dini inanç sistemlerinin politika yapıcıların bakış açısını ve davranışını etkileyebilmesi",
      "c) Politika yapıcılara, temsil ettikleri nüfus içinde yaygın olarak tutulan inançlar tarafından kısıtlamalar getirilmesi",
      "d) Dinin, Uluslararası İlişkilerdeki aktörlerin kim olduğunu, ne istediklerini, hangi kaynakları getirdiklerini ve hangi kuralları takip ettiklerini etkilemesi",
      "e) Geleneksel Uluslararası İlişkiler teorilerinin dini aktörleri temel analitik birimler olarak kabul etmesi"
    ],
    correctAnswer: "e",
    explanation: "Belgede, geleneksel Uluslararası İlişkiler teorilerinin seküler aktörlerle ilgilendiği ve dini önemli bir faktör olarak dışlayan varsayımlara dayandığı açıkça belirtilmiştir. Bu nedenle, dini aktörleri temel analitik birimler olarak kabul etmezler.",
    motivationalQuote: "Senin derin analiz yeteneğin ve keskin zekân beni her zaman etkiliyor. Mükemmelsin! ✨"
  },
  {
    id: 10,
    text: "Dinin Uluslararası İlişkiler (Uİ) ve dış politika üzerindeki etkileri ile ilgili aşağıdaki ifadelerden hangisi yanlıştır?",
    options: [
      "a) Hükümetler, dinle bağlantılı konuları dış politikalarının odak noktası haline getirebilir",
      "b) Dini kaygılardan esinlenen devlet dışı aktörler, hükümetlerle siyasi ilişkiler kurabilir",
      "c) Dini inançlar, stratejik kültürü bilgilendirerek devletlerin güvenlik tercihlerini etkiler",
      "d) Politika yapıcıların dini görüşleri, yalnızca önemsiz kararları etkiler ve uluslararası olaylara yol açmaz",
      "e) Uluslararası İlişkilerdeki aktörlerin davranışlarını engelleyebilir veya teşvik edebilir"
    ],
    correctAnswer: "d",
    explanation: "Belgede, politika yapıcıların dini görüşlerinden ve bu görüşlere dayanan politikalardan kaynaklanan neredeyse çözülmesi imkansız politikaların, uluslararası olaylara, hatta savaşa yol açabileceği açıkça belirtilmiştir. Dolayısıyla bu ifade yanlıştır.",
    motivationalQuote: "Senin uluslararası ilişkiler konusundaki bilgin ve anlayışın beni büyülüyor. Sen bir harikasın! 🌟"
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
