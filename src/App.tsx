import React, { useState, useRef } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';

interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  motivationalQuote: string;
}

interface Flashcard {
  id: number;
  question: string;
  answer: string;
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
    motivationalQuote: "Her cevabınla beni daha da çok etkiliyorsun. Senin başarın benim mutluluğum! "
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
    motivationalQuote: "Senin uluslararası ilişkiler konusundaki bilgin ve anlayışın beni büyülüyor. Sen bir harikasın! "
  },
  {
    id: 11,
    text: "Dinin Uluslararası İlişkiler (Uİ) ve dış politika ile olan ilişkisi bağlamında aşağıdakilerden hangisi yanlıştır?",
    options: [
      "a) Dini geleneklerin ulusal çıkarın kültürel yorumlanmasında etkili olması",
      "b) Dini geleneklerin dış politikanın stratejik kültürünü bilgilendirmesi",
      "c) Uluslararası İlişkiler disiplininin, 20. yüzyılın büyük bölümünde dini göz ardı etmesi",
      "d) Politika yapıcıların bakış açısını ve davranışlarını etkilememesi",
      "e) Dış politikanın operasyonel alanlarında dinin nasıl kullanılacağının, belirli devletlerin politika kültürüne bağlı olması"
    ],
    correctAnswer: "d",
    explanation: "Metinde, dini inanç sistemlerinin politika yapıcıların bakış açısını ve davranışlarını etkileyebileceği açıkça belirtilmiştir.",
    motivationalQuote: "Senin analitik düşünce yeteneğin beni her seferinde şaşırtıyor! 💫"
  },
  {
    id: 12,
    text: "'Seküler' kavramı ve 'sekülerleşme' süreci ile ilgili aşağıdaki ifadelerden hangisi doğru değildir?",
    options: [
      "a) Sekülerliğin, dini olandan farklılaştırılmış bir alanı veya gerçekliği inşa etmek, kodlamak, kavramak ve deneyimlemek için merkezi bir modern kategori olması",
      "b) Modern seküler dünyada, sekülerliğin bir anlamda dinin yerini alması",
      "c) Seküler olanın, rasyonel ve algılanabilir olanla ilgilenmesi",
      "d) Farklı dinlerin karşılaşabileceği, tartışabileceği ve fikir ayrılığına düşebileceği bir buluşma alanı sağlaması ve kaos ile şiddeti engellemesi",
      "e) Sekülerleşme sürecinin daima din dışı bir yaşamı garanti etmesi ve dini canlanma süreçlerine asla eşlik etmemesi"
    ],
    correctAnswer: "e",
    explanation: "Metinde, modernleşme süreci ile din dışı olmak arasında doğrudan bir bağlantı olmadığı ve birçok Batı dışı toplumda modernleşmenin dini canlanma süreçleri eşliğinde gerçekleştiği belirtilmiştir.",
    motivationalQuote: "Her yeni kavramı bu kadar iyi anlamanı takdir ediyorum! 🌟"
  },
  {
    id: 13,
    text: "Kalkınma ve dinin modernleşme paradigmasıyla ilişkisi hakkında aşağıdaki ifadelerden hangisi doğru değildir?",
    options: [
      "a) Modernleşme paradigması, ekonomik kalkınmanın merkeziliğini vurgular ve dini kamusal alanın dışında tutar",
      "b) Geleneksel kalkınma anlayışları ve politikalarının temelini seküler dünya görüşleri oluşturmuştur",
      "c) İnancın, modernleşme ve ekonomik kalkınma sonucunda yok olacağına dair görüşü destekleyen ikna edici kanıtlar bulunmamaktadır",
      "d) Başarılı kalkınmanın, sosyal ve ekonomik değişimin toplumun ahlaki temeliyle uyumlu olması durumunda gerçekleşebileceği düşünülür",
      "e) Kalkınma teorisi ve pratiğinde dinin daima merkezi ve önemli bir unsur olarak kabul edilmesi"
    ],
    correctAnswer: "e",
    explanation: "Metinde, modernleşme paradigmasının dini kalkınma teorisi ve pratiğinde göz ardı ettiği veya en iyi ihtimalle marjinal tuttuğu açıkça belirtilmiştir.",
    motivationalQuote: "Senin detaylara olan dikkatini çok seviyorum! 💝"
  },
  {
    id: 14,
    text: "Aşağıdakilerden hangisi, dinin Uluslararası İlişkiler (Uİ) üzerindeki etkileri ve Uİ teorilerinin dine bakış açısıyla ilgili doğru bir ifade değildir?",
    options: [
      "a) Din, Uluslararası İlişkilerdeki aktörlerin kim olduğunu etkiler",
      "b) Din, Uluslararası İlişkilerdeki aktörlerin ne istediklerini etkiler",
      "c) Din, Uluslararası İlişkilerdeki aktörlerin destek ve müttefik toplama işinde hangi kaynakları kullandıklarını etkiler",
      "d) Din, Uluslararası İlişkilerdeki aktörlerin hangi kurallara uyduklarını etkiler",
      "e) Geleneksel Uluslararası İlişkiler teorileri, dini aktörleri başlıca çalışma alanları olarak benimsemiştir"
    ],
    correctAnswer: "e",
    explanation: "Metinde, geleneksel Uluslararası İlişkiler teorilerinin seküler aktörlerle ilgilendiği ve dini önemli bir faktör olarak dışlayan varsayımlara dayandığı belirtilmiştir. Dolayısıyla dini aktörleri başlıca çalışma alanları olarak benimsememiştir.",
    motivationalQuote: "Senin eleştirel düşünce yeteneğin beni büyülüyor! ✨"
  },
  {
    id: 15,
    text: "Dinin Uluslararası İlişkilere (Uİ) 'geri dönüşünün' nedenleri ve 'Post-seküler Uİ' kavramıyla ilgili aşağıdaki ifadelerden hangisi yanlıştır?",
    options: [
      "a) Dinler devlet sınırlarını aşarak ulusötesi aktörler olarak hareket ederler",
      "b) Dinler toplumun birçok kurumunu, normunu ve değerini etkileyerek Uluslararası İlişkilerdeki aktörlerin nasıl davrandıklarını etkileyebilir",
      "c) Dinler, inananları belirli şekillerde davranmaya teşvik eden bir eylem uyarıcısı olabilir",
      "d) Dinlerin kamusal alanda artan socio-politik ilgisini tamamen reddeder",
      "e) Seküler düşünce ve fikirlerin ahlaki üstünlüğüne dair iyimserliğin çöküşünü içerir"
    ],
    correctAnswer: "d",
    explanation: "'Post-seküler Uluslararası İlişkiler' kavramı, dinin sosyo-politik ilgisinin yaygın, tutarlı ve açık bir şekilde öne sürülmesi anlamına gelir. Dolayısıyla, dinin kamusal alanda artan socio-politik ilgisini reddetmez, aksine onu kabul eder.",
    motivationalQuote: "Her yeni kavramı bu kadar iyi özümsemen beni gururlandırıyor! 🌟"
  },
  {
    id: 16,
    text: "İnanç Temelli Kuruluşların (FBO'lar) ve Birleşmiş Milletler Binyıl Kalkınma Hedefleri (MDG'ler) ile ilişkileri bağlamında aşağıdaki ifadelerden hangisi doğru değildir?",
    options: [
      "a) FBO'lar, sivil toplumun kalkınma çalışmalarına katılımına odaklanmanın artmasıyla meşru aktörler haline gelmiştir",
      "b) BM Binyıl Kalkınma Hedefleri (MDG'ler), hem devlet hem de devlet dışı aktörlerin (seküler ve inanç temelli) önemli kolektif katılımını içeriyordu",
      "c) FBO'lar, insan gelişimine odaklanan, kalkınma alanlarını devlet dışı aktörlere açan 'insan gelişimi' bakış açıları geliştirmiştir",
      "d) FBO'lar, uluslararası ajanslar ve devletler tarafından üstlenilen kalkınma çalışmalarını desteklemek için faaliyet gösterir",
      "e) BM Binyıl Kalkınma Hedefleri (MDG'ler) bağlamında, inanç temelli kuruluşların (FBO) katkıları önemsiz kabul edilmiştir"
    ],
    correctAnswer: "e",
    explanation: "BM Binyıl Kalkınma Hedefleri (MDG'ler) bağlamında, inanç temelli kuruluşların (FBO) katkılarının, hem devlet hem de devlet dışı aktörlerin, seküler ve inanç temelli aktörlerin ilk kez önemli kolektif katılımını sağladığı açıkça belirtilmiştir. Bu, katkılarının önemsiz kabul edilmediği anlamına gelir.",
    motivationalQuote: "Senin uluslararası organizasyonlar hakkındaki bilgin çok etkileyici! 💫"
  },
  {
    id: 17,
    text: "Uluslararası İlişkiler (IR) çalışmalarında dinin göz ardı edilme nedenleri hakkında aşağıdaki ifadelerden hangisi doğru değildir?",
    options: [
      "a) Uluslararası sistemin dini bir savaştan doğması, IR disiplininin seküler özüne katkıda bulunmuştur",
      "b) 20. yüzyılın büyük bölümünde Batı sosyal biliminin dini göz ardı etmesi, IR disiplinini etkilemiştir",
      "c) Etnik köken ve din gibi faktörlerin modern toplumda veya rasyonel açıklamalarda yeri olmadığı varsayımı yaygındı",
      "d) IR'ın başlıca teorileri, dini önemli bir etken olarak ele alan varsayımlara dayanmaktadır",
      "e) Hıristiyanlar ve Müslümanlar arasında ve Hıristiyanlar arasında sayısız dini savaşın olması, dinin tehlikeli ama önemsiz bir konu olarak sınıflandırılmasına yol açmıştır"
    ],
    correctAnswer: "d",
    explanation: "Metinde, Uluslararası İlişkiler'in başlıca teorilerinin hepsinin, dini önemli bir etken olarak dışlayan varsayımlar üzerine kurulduğu açıkça belirtilmiştir.",
    motivationalQuote: "Senin tarihsel analiz yeteneğin beni her zaman etkiliyor! 🌟"
  },
  {
    id: 18,
    text: "İnanç Temelli Kuruluşların (FBO'lar) kalkınma alanındaki rolü ile ilgili aşağıdaki ifadelerden hangisi yanlıştır?",
    options: [
      "a) Topluluklarda önemli fiziksel ve sosyal altyapıya sahiptirler",
      "b) Dini liderlere ve kurumlara duyulan güven düzeyi diğer kuruluşlara göre genellikle daha yüksektir",
      "c) Sağlık ve eğitim hizmetlerinin önemli bir bölümünü doğrudan sağlarlar",
      "d) İnsan gelişiminin hayati yönlerinde derin tarihi katılımları vardır",
      "e) Sadece kendi dini gruplarına hizmet verirler ve diğer gruplarla işbirliği yapmazlar"
    ],
    correctAnswer: "e",
    explanation: "FBO'lar genellikle din, etnik köken veya inanç gözetmeksizin tüm topluma hizmet verirler ve diğer dini veya seküler gruplarla işbirliği yaparlar.",
    motivationalQuote: "Senin insani değerlere olan duyarlılığın çok değerli! 💖"
  },
  {
    id: 19,
    text: "BM ve dini kuruluşların işbirliği konusunda aşağıdaki ifadelerden hangisi doğru değildir?",
    options: [
      "a) BM, dini kuruluşlarla artan bir şekilde işbirliği yapmaktadır",
      "b) Dini kuruluşlar, BM'nin sürdürülebilir kalkınma hedeflerine katkıda bulunmaktadır",
      "c) BM ve dini kuruluşlar arasındaki işbirliği sadece insani yardım alanıyla sınırlıdır",
      "d) Dini kuruluşlar, BM'nin barış inşası çabalarına destek vermektedir",
      "e) BM, dini kuruluşların yerel topluluklara erişim kapasitesinden yararlanmaktadır"
    ],
    correctAnswer: "c",
    explanation: "BM ve dini kuruluşlar arasındaki işbirliği insani yardımın yanı sıra barış inşası, sürdürülebilir kalkınma, iklim değişikliği ve diğer birçok alanı kapsamaktadır.",
    motivationalQuote: "Senin küresel işbirliği konusundaki anlayışın harika! ✨"
  },
  {
    id: 20,
    text: "İklim değişikliği ve dini grupların rolü hakkında aşağıdaki ifadelerden hangisi yanlıştır?",
    options: [
      "a) Dini gruplar iklim adaleti hareketinde aktif rol oynamaktadır",
      "b) Dinlerarası işbirliği, iklim değişikliği konusunda önemli bir alan haline gelmiştir",
      "c) Dini liderler iklim değişikliğiyle mücadelede toplumu harekete geçirmede etkilidir",
      "d) Dini gruplar çevre koruma konusunda farkındalık yaratmaktadır",
      "e) Dini gruplar iklim değişikliği konusunda bilimsel araştırmaları reddeder"
    ],
    correctAnswer: "e",
    explanation: "Birçok dini grup, iklim değişikliği konusundaki bilimsel araştırmaları kabul eder ve bu konuda bilim insanlarıyla işbirliği yapar.",
    motivationalQuote: "Senin çevre bilincin ve analitik düşüncen muhteşem! 🌍"
  },
  {
    id: 21,
    text: "Dini diplomasi ve arabuluculuk konusunda aşağıdaki ifadelerden hangisi doğru değildir?",
    options: [
      "a) Dini liderler çatışma çözümünde arabulucu rol oynayabilir",
      "b) Dini kurumlar barış inşası süreçlerine katkıda bulunabilir",
      "c) Dini diplomasi resmi diplomasinin yerini tamamen alabilir",
      "d) Dini aktörler toplumlar arası diyalogu geliştirebilir",
      "e) Dini diplomasi, geleneksel diplomasiyi tamamlayıcı bir rol oynar"
    ],
    correctAnswer: "c",
    explanation: "Dini diplomasi, resmi diplomasinin yerini almak yerine onu tamamlayıcı bir rol oynar ve resmi diplomasi kanallarıyla birlikte çalışır.",
    motivationalQuote: "Senin barış ve diyalog konusundaki hassasiyetin çok değerli! 🕊️"
  },
  {
    id: 22,
    text: "Dini özgürlükler ve uluslararası ilişkiler bağlamında aşağıdaki ifadelerden hangisi yanlıştır?",
    options: [
      "a) Dini özgürlükler insan hakları konusunun önemli bir parçasıdır",
      "b) Ülkeler arası ilişkilerde dini özgürlükler önemli bir gündem maddesi olabilir",
      "c) Dini özgürlüklerin kısıtlanması uluslararası yaptırımlara neden olabilir",
      "d) Dini özgürlükler sadece iç politika meselesidir",
      "e) Dini özgürlükler konusu uluslararası anlaşmalarda yer alır"
    ],
    correctAnswer: "d",
    explanation: "Dini özgürlükler sadece iç politika meselesi değil, aynı zamanda uluslararası ilişkileri etkileyen önemli bir konudur.",
    motivationalQuote: "Senin insan hakları konusundaki duyarlılığın takdire şayan! 💫"
  },
  {
    id: 23,
    text: "Dini radikalizm ve uluslararası güvenlik ilişkisi hakkında aşağıdaki ifadelerden hangisi doğru değildir?",
    options: [
      "a) Dini radikalizm uluslararası güvenliği tehdit edebilir",
      "b) Dini radikalizmle mücadelede uluslararası işbirliği önemlidir",
      "c) Dini radikalizm sosyo-ekonomik faktörlerden etkilenir",
      "d) Dini radikalizm sadece belirli dinlerle ilişkilidir",
      "e) Dini radikalizmle mücadelede eğitim önemli bir rol oynar"
    ],
    correctAnswer: "d",
    explanation: "Dini radikalizm herhangi bir dinde ortaya çıkabilir ve belirli dinlerle sınırlı değildir.",
    motivationalQuote: "Senin önyargısız ve objektif bakış açın çok değerli! 🌟"
  },
  {
    id: 24,
    text: "Dini kurumların insani yardım faaliyetleri konusunda aşağıdaki ifadelerden hangisi yanlıştır?",
    options: [
      "a) Dini kurumlar doğal afetlerde yardım sağlar",
      "b) Dini kurumlar mültecilere destek verir",
      "c) Dini kurumlar sadece kendi inançlarından olanlara yardım eder",
      "d) Dini kurumlar uluslararası yardım kuruluşlarıyla işbirliği yapar",
      "e) Dini kurumlar yerel topluluklara erişimde avantaja sahiptir"
    ],
    correctAnswer: "c",
    explanation: "Dini kurumlar genellikle inanç ayrımı gözetmeksizin tüm ihtiyaç sahiplerine yardım eder.",
    motivationalQuote: "Senin insani yardım konusundaki bilgin çok etkileyici! ❤️"
  },
  {
    id: 25,
    text: "Dini kurumların eğitim alanındaki uluslararası faaliyetleri hakkında aşağıdaki ifadelerden hangisi doğru değildir?",
    options: [
      "a) Dini kurumlar uluslararası öğrenci değişim programları düzenler",
      "b) Dini kurumlar gelişmekte olan ülkelerde okullar açar",
      "c) Dini kurumlar sadece dini eğitim verir",
      "d) Dini kurumlar kültürlerarası diyalogu teşvik eder",
      "e) Dini kurumlar eğitim yoluyla barış inşasına katkıda bulunur"
    ],
    correctAnswer: "c",
    explanation: "Dini kurumlar sadece dini eğitim değil, aynı zamanda genel eğitim, mesleki eğitim ve kültürel eğitim de vermektedir.",
    motivationalQuote: "Senin eğitim konusundaki vizyonun çok geniş! 📚"
  },
  {
    id: 26,
    text: "Dini kurumların çevre koruma faaliyetleri hakkında aşağıdaki ifadelerden hangisi yanlıştır?",
    options: [
      "a) Dini kurumlar çevre bilinci oluşturmada rol oynar",
      "b) Dini kurumlar sürdürülebilir kalkınmayı destekler",
      "c) Dini kurumlar iklim değişikliğiyle mücadelede aktiftir",
      "d) Dini kurumlar çevre koruma konusunda işbirliği yapar",
      "e) Dini kurumlar çevre sorunlarını görmezden gelir"
    ],
    correctAnswer: "e",
    explanation: "Dini kurumlar çevre sorunlarını görmezden gelmez, aksine bu konuda aktif rol alır ve çözüm üretmeye çalışır.",
    motivationalQuote: "Senin çevre duyarlılığın ve bilgin çok değerli! 🌱"
  },
  {
    id: 27,
    text: "Dini kurumların barış inşası süreçlerindeki rolü hakkında aşağıdaki ifadelerden hangisi doğru değildir?",
    options: [
      "a) Dini kurumlar çatışma çözümünde arabuluculuk yapar",
      "b) Dini kurumlar toplumlar arası diyalogu teşvik eder",
      "c) Dini kurumlar barış eğitimi programları düzenler",
      "d) Dini kurumlar sadece çatışma yaratır",
      "e) Dini kurumlar uzlaşma süreçlerine katkıda bulunur"
    ],
    correctAnswer: "d",
    explanation: "Dini kurumlar sadece çatışma yaratmaz, aksine birçok durumda barış inşası ve çatışma çözümünde önemli rol oynar.",
    motivationalQuote: "Senin barış konusundaki anlayışın çok değerli! 🕊️"
  },
  {
    id: 28,
    text: "Dini kurumların kültürlerarası diyalog faaliyetleri hakkında aşağıdaki ifadelerden hangisi yanlıştır?",
    options: [
      "a) Dini kurumlar kültürlerarası etkinlikler düzenler",
      "b) Dini kurumlar farklı inançlar arası diyalogu teşvik eder",
      "c) Dini kurumlar kültürel değişim programları organize eder",
      "d) Dini kurumlar sadece kendi kültürlerini yayar",
      "e) Dini kurumlar karşılıklı anlayışı geliştirmeye çalışır"
    ],
    correctAnswer: "d",
    explanation: "Dini kurumlar sadece kendi kültürlerini yaymakla kalmaz, aynı zamanda kültürlerarası diyalog ve karşılıklı anlayışı teşvik eder.",
    motivationalQuote: "Senin kültürlerarası diyalog anlayışın harika! 🌍"
  },
  {
    id: 29,
    text: "Dini kurumların uluslararası kalkınma projelerindeki rolü hakkında aşağıdaki ifadelerden hangisi doğru değildir?",
    options: [
      "a) Dini kurumlar yoksullukla mücadele projeleri yürütür",
      "b) Dini kurumlar sağlık hizmetleri sağlar",
      "c) Dini kurumlar eğitim projeleri gerçekleştirir",
      "d) Dini kurumlar sadece maddi yardım yapar",
      "e) Dini kurumlar sürdürülebilir kalkınma projelerini destekler"
    ],
    correctAnswer: "d",
    explanation: "Dini kurumlar sadece maddi yardım yapmaz, aynı zamanda eğitim, sağlık, kapasite geliştirme ve sürdürülebilir kalkınma gibi alanlarda da projeler yürütür.",
    motivationalQuote: "Senin kalkınma konusundaki vizyonun çok geniş! 🌱"
  },
  {
    id: 30,
    text: "Dini kurumların uluslararası örgütlerle ilişkileri hakkında aşağıdaki ifadelerden hangisi yanlıştır?",
    options: [
      "a) Dini kurumlar BM ile işbirliği yapar",
      "b) Dini kurumlar uluslararası STK'larla ortak projeler yürütür",
      "c) Dini kurumlar bölgesel örgütlerle çalışır",
      "d) Dini kurumlar uluslararası örgütlerle çalışmayı reddeder",
      "e) Dini kurumlar uluslararası konferanslara katılır"
    ],
    correctAnswer: "d",
    explanation: "Dini kurumlar uluslararası örgütlerle çalışmayı reddetmez, aksine BM, uluslararası STK'lar ve bölgesel örgütlerle aktif işbirliği yapar.",
    motivationalQuote: "Senin uluslararası işbirliği konusundaki bilgin çok etkileyici! 🌟"
  }
  ];

const internationalSecurityFlashcards: Flashcard[] = [
  {
    id: 1,
    question: "Uluslararası güvenliğin temel tanımı nedir?",
    answer: "Değer verilen şeylere yönelik tehditlerin azaltılması olarak tanımlanır. Bu değerler; yaşam, özgürlük, refah veya egemenlik gibi unsurları içerebilir."
  },
  {
    id: 2,
    question: "Barry Buzan'a göre güvenlik kavramının yeterince gelişmemiş olmasının beş temel nedeni nelerdir?",
    answer: "1) Kavramsal Zorluk 2) Güç ile Örtüşme 3) Gerçekçi Olmayanların İlgisizliği 4) Teknoloji ve Politikaya Odaklanma 5) Politika Yapıcıların Çıkarları"
  },
  {
    id: 3,
    question: "Negatif güvenlik ve pozitif güvenlik arasındaki fark nedir?",
    answer: "Negatif güvenlik: Tehditlerin olmaması, savaşsızlık. Pozitif güvenlik: Güven içinde yaşama özgürlüğü, temel ihtiyaçlara erişim."
  },
  {
    id: 4,
    question: "MAD (Mutual Assured Destruction) nedir?",
    answer: "Karşılıklı Kesin Yıkım prensibi. Nükleer caydırıcılık stratejisi olup, her iki tarafın da saldırı halinde kesin yıkımla karşılaşacağı varsayımına dayanır."
  },
  {
    id: 5,
    question: "Güvenlik çalışmalarının 'Altın Çağı' hangi dönemdir ve özellikleri nelerdir?",
    answer: "1950'ler ve 1960'lar. Yüksek siyaset konularına odaklanma, RAND Corporation gibi kurumlar, oyun teorisi yaklaşımları ve realizmin ana akım teori olması."
  },
  {
    id: 6,
    question: "Klasik Realizmin temel varsayımları nelerdir?",
    answer: "İnsan doğasının bencil, korkak ve hırslı olduğu varsayımı. Devletlerin de bu insani dürtülerle hareket ettiği ve güç arayışında olduğu savunulur."
  },
  {
    id: 7,
    question: "Kenneth Waltz'ın Yapısal Realizmi (Neorealizm) neyi vurgular?",
    answer: "Devlet davranışlarını uluslararası sistemin yapısıyla açıklar. Anarşik sistemde devletler 'güvenlik maksimize edicidir' ve hayatta kalmak için gerekli gücü elde etmeye çalışırlar."
  },
  {
    id: 8,
    question: "Saldırgan Realizm ile Savunmacı Realizm arasındaki temel fark nedir?",
    answer: "Saldırgan Realizm: Devletler güç maksimize edicisidir, nihai amaç bölgesel hegemonya. Savunmacı Realizm: Aşırı güç arayışı güvenlik ikilemine yol açar, dengeli davranmak daha akılcıdır."
  },
  {
    id: 9,
    question: "Güvenlik ikilemi (Security Dilemma) nedir?",
    answer: "Bir devletin güvenliğini artırmak için aldığı önlemlerin, diğer devletlerin güvenlik endişelerini artırması ve sonuçta tüm tarafların güvenliğinin azalması durumu."
  },
  {
    id: 10,
    question: "Liberalizmin güvenlik anlayışında hangi unsurlar önemlidir?",
    answer: "Ekonomik karşılıklı bağımlılık, uluslararası kurumlar, demokratik barış teorisi, insan hakları ve sivil toplum kuruluşları."
  },
  {
    id: 11,
    question: "Demokratik Barış Teorisi'nin temel argümanı nedir?",
    answer: "Demokrasilerin birbirleriyle savaşmama eğiliminde olduğu. Nedenleri: karşılıklı meşruiyet tanıma, uzlaşma kültürü, hesap verebilirlik ve şeffaflık."
  },
  {
    id: 12,
    question: "Kurumsal Liberalizm uluslararası kurumların rolünü nasıl açıklar?",
    answer: "Uluslararası kurumlar anarşik sistemde bile işbirliğini kolaylaştırır, güvenilir bilgi sağlar, müzakereleri kolaylaştırır ve 'geleceğin gölgesi' yaratır."
  },
  {
    id: 13,
    question: "Eleştirel Güvenlik Çalışmaları'nın temel amacı nedir?",
    answer: "Güvenliği 'genişletmek' (ekonomik, çevresel boyutlar) ve 'derinleştirmek' (birey, toplum, ekosistem güvenliği). Geleneksel devlet merkezli yaklaşımı eleştirme."
  },
  {
    id: 14,
    question: "Kopenhag Okulu'nun beş güvenlik sektörü nelerdir?",
    answer: "1) Askerî 2) Siyasi 3) Ekonomik 4) Toplumsal 5) Çevresel güvenlik sektörleri."
  },
  {
    id: 15,
    question: "Güvenlikleştirme Teorisi (Securitization Theory) nedir?",
    answer: "Bir konunun doğal olarak tehlikeli olmasına gerek kalmadan, bir aktörün o konuyu tehdit olarak tanımlaması ve toplumun bunu kabul etmesiyle 'güvenlikleştirilmesi' süreci."
  },
  {
    id: 16,
    question: "Aberystwyth Okulu'nun 'özgürleşme' (emancipation) kavramı neyi ifade eder?",
    answer: "Güvenliğin temel amacının bireylerin baskılardan kurtulması olduğunu vurgular. Sadece tehdit tanımlamakla kalmayıp, daha adil ve özgür bir dünya kurma amacı taşır."
  },
  {
    id: 17,
    question: "İnsan Güvenliği'nin iki temel prensibi nelerdir?",
    answer: "'Korkudan arınma' (freedom from fear) ve 'yoksunluktan arınma' (freedom from want). Kronik tehditlerden ve ani krizlerden korunmayı içerir."
  },
  {
    id: 18,
    question: "İnsan Güvenliği'nin yedi boyutu nelerdir?",
    answer: "1) Ekonomik 2) Gıda 3) Sağlık 4) Çevresel 5) Kişisel 6) Toplumsal 7) Siyasi güvenlik."
  },
  {
    id: 19,
    question: "R2P (Responsibility to Protect - Koruma Sorumluluğu) ilkesi neyi savunur?",
    answer: "İnsan hakları ihlallerine karşı uluslararası müdahaleyi meşrulaştıran ilke. Devletlerin tüm insanlara karşı koruma sorumluluğu olduğunu vurgular."
  },
  {
    id: 20,
    question: "Çevresel Güvenlik alanında 'Ekolojik Güvenlik' yaklaşımı neyi vurgular?",
    answer: "Güvenliği sağlanması gerekenin doğal çevre (ekosistemler) olduğunu vurgular ve insan faaliyetlerini temel risk kaynağı olarak görür."
  },
  {
    id: 21,
    question: "Çevresel tehditlerde 'tehdit çarpanı' kavramı nedir?",
    answer: "Kaynak kıtlığı (su, toprak) gibi çevresel değişimlerin devletlerarası çatışmaları ve savaşları tetikleyebileceği durum. 'Su savaşları' potansiyeli."
  },
  {
    id: 22,
    question: "Ekonomik yaptırımların üç temel amacı nedir?",
    answer: "1) Siyasi amaçlar (davranış değişikliği) 2) Ahlaki amaçlar (kınama) 3) Askerî amaçlar (güç zayıflatma)."
  },
  {
    id: 23,
    question: "Akıllı yaptırımlar (Smart Sanctions) neden tercih edilir?",
    answer: "Geniş kapsamlı yaptırımlar sınırlı fayda sağlar ve diktatörlükleri güçlendirebilir. Akıllı yaptırımlar bireysel aktörleri ve belirli şirketleri hedefleyerek daha etkili olmayı amaçlar."
  },
  {
    id: 24,
    question: "Küreselleşme ve ekonomik güvenlik ilişkisinde Washington Uzlaşısı neyi savunur?",
    answer: "IMF ve Dünya Bankası'nın reform paketleri, piyasaların serbestleşmesi ve devlet müdahalesinin azalması. Neoliberal politikalar."
  },
  {
    id: 25,
    question: "Uluslararası krizin beş temel bileşeni nelerdir?",
    answer: "1) Sürpriz unsuru 2) Yüksek değere sahip çıkarların tehdidi 3) Zaman baskısı 4) Belirsizlikler 5) Askerî çatışma olasılığının artması."
  },
  {
    id: 26,
    question: "Saldırgan kriz yönetimi stratejilerine örnekler verin.",
    answer: "Şantaj, Geri Alınabilir Yoklama, Kontrollü Baskı, Olup Bittiye Getirme, Yıpratma Stratejileri. Mevcut durumu değiştirmeyi hedefler."
  },
  {
    id: 27,
    question: "Savunmacı kriz yönetimi stratejilerine örnekler verin.",
    answer: "Zorlayıcı Diplomasi, Sınırlı Tırmandırma, Aynıyla Karşılık Verme, Yetenek Sınama, Kırmızı Çizgi Belirleme. Statükoyu korumayı amaçlar."
  },
  {
    id: 28,
    question: "Devletlerin nükleer silah edinme isteklerindeki güvenlik yaklaşımı neyi vurgular?",
    answer: "Temel amaç caydırıcılıktır (deterrence). Nükleer silahların yıkıcı gücü, saldırganı eylemden vazgeçirir (MAD prensibi)."
  },
  {
    id: 29,
    question: "Nükleer şemsiye (nuclear umbrella) kavramı nedir?",
    answer: "Bazı ülkelerin güçlü müttefiklerin nükleer koruması altında bulunması. Bu durum kendi nükleer silah geliştirme ihtiyacını azaltır (Japonya, G. Kore örneği)."
  },
  {
    id: 30,
    question: "Nükleer tabu (nuclear taboo) nedir?",
    answer: "Nükleer silahların kullanımı üzerindeki ahlaki ve siyasi baskı. Uluslararası hukuka ve normlara aykırılık olarak görülmesi."
  },
  {
    id: 31,
    question: "NPT (Nükleer Silahların Yayılmasını Önleme Antlaşması) neyi hedefler?",
    answer: "Yeni ülkelerin silah edinmesini (yatay yayılma) ve mevcut güçlerin silahlarını artırmasını (dikey yayılma) önlemeyi hedefler."
  },
  {
    id: 32,
    question: "Etnik kimliğin kaynağına dair üç temel yaklaşım nelerdir?",
    answer: "1) İlkselcilik (Primordialism): Doğuştan, değişmez 2) Moderncilik: Ulus-devlet, sanayileşme ile oluşan 3) Yapısalcılık: Sosyal olarak inşa edilen, değişebilir."
  },
  {
    id: 33,
    question: "Etnik çatışmalarda 'Gerçekçi Grup Çatışması Teorisi' neyi savunur?",
    answer: "Kaynak rekabetinin grup çatışmalarının temel nedeni olduğunu savunur. Kıt kaynaklar için rekabet gruplar arası düşmanlığa yol açar."
  },
  {
    id: 34,
    question: "Sosyal Kimlik Teorisi etnik çatışmaları nasıl açıklar?",
    answer: "'Biz' ve 'onlar' ayrımının grup kimliği oluşturduğunu ve bu ayrımın çatışmaları körüklediğini savunur. Grup üyeliği kimlik için kritiktir."
  },
  {
    id: 35,
    question: "Uzlaşmacı Demokrasi (Consociational Democracy) modeli nedir?",
    answer: "Çok etnili toplumlarda güç paylaşımı ve kültürel özerklik yoluyla barışçıl birlikte yaşamayı hedefleyen model. Elit işbirliği esasına dayanır."
  },
  {
    id: 36,
    question: "Terörizmin altı ana tanım unsuru nelerdir?",
    answer: "1) Şiddet kullanımı/tehdidi 2) Organize grup 3) Siyasi amaçlar 4) Hedef kitleye psikolojik etki 5) Devlet dışı aktör 6) Zayıfların silahı."
  },
  {
    id: 37,
    question: "Terörle mücadelede üç temel bakış açısı nelerdir?",
    answer: "1) Savaş gibi görmek (Warfare Model) 2) Suç olarak görmek (Crime Model) 3) Hastalık gibi görmek (Disease Model - sosyoekonomik nedenler)."
  },
  {
    id: 38,
    question: "Terörizmin bireysel düzeydeki nedenleri neler olabilir?",
    answer: "Hayal kırıklığı, psikolojik sorunlar, marjinalleşme, kimlik arayışı, radikalleşme süreci ve kişisel motivasyonlar."
  },
  {
    id: 39,
    question: "Terörle mücadelede önleme stratejilerine örnekler verin.",
    answer: "İstihbarat toplama, fiziksel güvenlik önlemleri, erken uyarı sistemleri, radikalleşme karşıtı programlar ve toplumsal entegrasyon politikaları."
  },
  {
    id: 40,
    question: "Sağlık güvenliğinde 'güvenlikleştirme' süreci nasıl işler?",
    answer: "Hızlı yayılan hastalıklar bir devletin nüfus sağlığını, ekonomisini ve toplumsal istikrarını ciddi şekilde etkileyerek sağlığın 'güvenlikleştirilmesi' sürecini tetikler."
  },
  {
    id: 41,
    question: "Biyo-güvenlik çerçevesinde temel tehditler nelerdir?",
    answer: "Biyolojik ajanların (virüs, bakteri) silah olarak kullanılması, kazara yayılması, terörist gruplar için düşük maliyetli silah potansiyeli."
  },
  {
    id: 42,
    question: "Siber güvenlikte 'asimetrik zayıflıklar' kavramı neyi ifade eder?",
    answer: "Küçük teknik güce sahip aktörlerin bile devasa sistemlere zarar verebilmesi durumu. Saldırı yöntemleri savunmadan daha hızlı gelişir."
  },
  {
    id: 43,
    question: "Siber saldırılarda kullanılan malware türleri nelerdir?",
    answer: "Virüsler, solucanlar, Truva atları gibi kötü amaçlı yazılımlar. Sistemleri bozabilir, geciktirebilir, yok edebilir veya bilgi çalabilir."
  },
  {
    id: 44,
    question: "Siber güvenlikte 'attribütasyon problemi' nedir?",
    answer: "Siber saldırı sonrası saldırganı tespit etme zorluğu. Bu durum siber alandaki mücadeleyi zorlaştırır ve cezasızlığa yol açabilir."
  },
  {
    id: 45,
    question: "Kritik altyapıların siber güvenliği neden önemlidir?",
    answer: "Elektrik, su, iletişim gibi kritik altyapıların siber saldırılara karşı korunması toplumsal yaşamın devamlılığı için kritiktir. Özelleştirme riskleri artırır."
  },
  {
    id: 46,
    question: "Stuxnet virüsü neden önemli bir örnek teşkil eder?",
    answer: "İran'ın nükleer programını hedefleyen bu virüs, siber saldırıların fiziksel altyapıya verdiği zararı gösteren önemli bir siber savaş örneğidir."
  },
  {
    id: 47,
    question: "NATO'nun Madde 5'i siber saldırılar bağlamında nasıl yorumlanır?",
    answer: "Siber alandaki saldırılar, NATO'nun ortak savunma maddesi (Madde 5) kapsamında değerlendirilebilir ve kolektif savunma yanıtını tetikleyebilir."
  },
  {
    id: 48,
    question: "Güvenlik çalışmalarında 'yüksek siyaset' ve 'düşük siyaset' ayrımı nedir?",
    answer: "Yüksek siyaset: Ulusal güvenlik, dış politika gibi hayati konular. Düşük siyaset: Ekonomi, çevre gibi ikincil görülen konular. Bu ayrım eleştirilmektedir."
  },
  {
    id: 49,
    question: "Post-seküler Uluslararası İlişkiler kavramının temel unsurları nelerdir?",
    answer: "Dinin 'özelleştirilmemesi', manevi meselelerin artan önemi, uluslararası ilişkilerde dini aktörlerin rolü ve seküler düşüncenin ahlaki üstünlüğünün sorgulanması."
  },
  {
    id: 50,
    question: "Küresel yönetişim (global governance) kavramı neyi ifade eder?",
    answer: "Küresel sorunların çözümü için devletler, uluslararası örgütler, sivil toplum ve özel sektörün işbirliği halinde yönetim süreçleri oluşturması."
  }
];

const internationalSecurityQuestions: Question[] = [
  {
    id: 1,
    text: "Günümüzde güvenlik kavramının sadece askeri tehditlerle sınırlı kalmamasının temel nedeni aşağıdakilerden hangisidir?",
    options: [
      "A) Devletlerin askeri harcamaları azaltma isteği",
      "B) Uluslararası terör örgütlerinin yükselişi",
      "C) İklim değişikliği, siber saldırılar ve ekonomik krizler gibi yeni güvenlik sorunlarının ortaya çıkması",
      "D) Sadece nükleer silahlanma yarışının devam etmesi",
      "E) Uluslararası hukukun askeri müdahaleleri yasaklaması"
    ],
    correctAnswer: "C",
    explanation: "Modern güvenlik anlayışı, savaş ve askeri tehditlerin yanı sıra iklim değişikliği, siber saldırılar, göç ve ekonomik krizler gibi askeri olmayan tehditlerin de devletler ve bireyler için güvenlik sorunu haline geldiğini kabul eder.",
    motivationalQuote: "Her yeni öğrendiğin kavram, seni daha da güçlü kılıyor aşkım! 🌟"
  },
  {
    id: 2,
    text: "\"Güvenlik\" kavramının \"özünde tartışmalı kavram (essentially contested concept)\" olarak adlandırılmasının temel nedeni aşağıdakilerden hangisidir?",
    options: [
      "A) Güvenlik tanımının sadece devletler tarafından yapılması",
      "B) Kavramın tarihsel olarak çok eski bir geçmişe sahip olması",
      "C) Herkesin güvenlikten farklı şeyler anlaması ve üzerinde tam bir fikir birliğinin olmaması",
      "D) Güvenlik çalışmalarının henüz tam olarak gelişmemiş bir disiplin olması",
      "E) Kavramın sadece askeri stratejilerle ilgili olması"
    ],
    correctAnswer: "C",
    explanation: "\"Güvenlik\" kavramı, insanlar, devletler veya kurumlar tarafından farklı şekillerde yorumlanabildiği, kimine göre askeri güvenliği, kimine göre insan haklarını veya ekonomik istikrarı ifade edebildiği için özünde tartışmalı bir kavram olarak kabul edilir.",
    motivationalQuote: "Senin analitik düşünce tarzın her zaman beni büyülüyor! 💫"
  },
  {
    id: 3,
    text: "Barry Buzan'a göre güvenlik kavramının hala tam gelişmemiş olmasının nedenlerinden biri aşağıdakilerden hangisi değildir?",
    options: [
      "A) Kavramsal zorluk, yani güvenliğin çok geniş bir alanı kapsaması",
      "B) Güvenlik ile güç arasındaki örtüşme ve karıştırılması",
      "C) Realizm dışındaki teorilerin güvenliğe uzun süre ilgi göstermemesi",
      "D) Güvenlik kavramının pratik politikalar yerine sadece teorik düzeyde tartışılması",
      "E) Politika yapıcıların güvenlik tanımını kendi çıkarlarına göre şekillendirmesi"
    ],
    correctAnswer: "D",
    explanation: "Barry Buzan'a göre güvenlik kavramının gelişimini engelleyen nedenlerden biri, güvenlik kavramının genellikle teknik ve politika düzeyinde tartışılmış, teorik boyutunun ihmal edilmiş olmasıdır. Bu seçenek ise tam tersini ifade etmektedir.",
    motivationalQuote: "Her doğru cevabın beni gururlandırıyor canım! ✨"
  },
  {
    id: 4,
    text: "Aşağıdaki ifadelerden hangisi \"pozitif güvenlik\" kavramını en iyi şekilde açıklamaktadır?",
    options: [
      "A) Askeri saldırıların ve savaşın tamamen önlenmesi durumu",
      "B) Bir devletin dış tehditlerden tamamen arınmış olması",
      "C) Bireylerin ve toplumların korku ve baskıdan uzak, onurlu ve refah içinde yaşama özgürlüğüne sahip olması",
      "D) Devletlerin kendi sınırlarını askeri güçle koruması",
      "E) Nükleer silahların yayılmasının engellenmesi yoluyla sağlanan istikrar"
    ],
    correctAnswer: "C",
    explanation: "Pozitif güvenlik, bireylerin ve toplumların güven içinde yaşamak için özgürlüğe sahip olması, yani eğitim, sağlık, barınma gibi temel ihtiyaçlara güvenli erişimle sağlanan kapsamlı bir iyi olma halidir.",
    motivationalQuote: "Senin kavrama yeteneğin gerçekten etkileyici! 💝"
  },
  {
    id: 5,
    text: "1950'ler ve 1960'ları güvenlik çalışmalarının \"altın çağı\" yapan temel özelliklerden biri aşağıdakilerden hangisidir?",
    options: [
      "A) Güvenlik kavramının toplumsal ve çevresel boyutlarının ön plana çıkması",
      "B) Nükleer silahların yayılması ve ABD ile Sovyetler arasındaki sürekli gerginlik nedeniyle savaşın önlenmesine yönelik yoğun teorik çalışmalar yapılması",
      "C) Güvenlik çalışmalarının sivil akademisyenlerden çok, askeri stratejistlerin kontrolüne geçmesi",
      "D) Uluslararası ilişkilerde işbirliğinin ve karşılıklı bağımlılığın artması",
      "E) Barış araştırmaları ve Üçüncü Dünya çalışmaları gibi muhalif yaklaşımların ana akım haline gelmesi"
    ],
    correctAnswer: "B",
    explanation: "1950-60'lar, nükleer silahların yayılması ve ABD-Sovyet gerginliği gibi faktörler nedeniyle nükleer caydırıcılık, nükleer savaş stratejileri ve kriz yönetimi gibi konulara odaklanan yoğun teorik çalışmaların yapıldığı bir dönemdir.",
    motivationalQuote: "Tarihsel bağlantıları bu kadar iyi kurabilmen muhteşem! 🏆"
  },
  {
    id: 6,
    text: "Realizm teorisinin temel özelliklerinden biri olarak aşağıdakilerden hangisi yanlıştır?",
    options: [
      "A) Uluslararası sistemin anarşik olduğu varsayımı",
      "B) Gücün uluslararası ortamın tanımlayıcı unsuru olması",
      "C) Devletlerin üniter ve rasyonel aktörler olarak kabul edilmesi",
      "D) Devletlerin iç politikalarındaki dinamiklerin dış politika davranışlarını belirlemesi",
      "E) Devletlerin hayatta kalma ve kendi kendine yardım (self-help) ilkelerine göre hareket etmesi"
    ],
    correctAnswer: "D",
    explanation: "Realizm, devletleri \"kara kutu\" olarak görür ve dış politikadaki davranışlarını açıklarken iç dinamiklere odaklanmaz. Devletlerin iç yapısı (demokratik/otoriter olması) dış politikaları için temel belirleyici değildir.",
    motivationalQuote: "Teorileri bu şekilde ayırt edebilmen harika! 🎯"
  },
  {
    id: 7,
    text: "Saldırgan realizm (offensive realism) ile savunmacı realizm (defensive realism) arasındaki en temel fark aşağıdakilerden hangisidir?",
    options: [
      "A) Saldırgan realizmin işbirliğini imkansız görmesi, savunmacı realizmin ise mümkün görmesi",
      "B) Saldırgan realizmin güç peşinde koşmayı, savunmacı realizmin ise yeterli güvenlik sağlamayı hedeflemesi",
      "C) Saldırgan realizmin devleti temel aktör olarak kabul etmesi, savunmacı realizmin ise bireyi merkeze alması",
      "D) Saldırgan realizmin dış dengelemeyi, savunmacı realizmin ise iç dengelemeyi önceliklendirmesi",
      "E) Saldırgan realizmin anarşiyi olumlu, savunmacı realizmin ise olumsuz görmesi"
    ],
    correctAnswer: "B",
    explanation: "Saldırgan realizm (John Mearsheimer), devletlerin bölgesel hegemonya kurmak için maksimum güç peşinde koştuğunu savunurken, savunmacı realizm, devletlerin aşırı güç kazanmaktan kaçınarak, sadece hayatta kalmaları için yeterli gücü elde etmeyi ve güvenliklerini maksimize etmeyi amaçladığını belirtir.",
    motivationalQuote: "Bu karmaşık teorileri bu kadar net ayırt edebilmen süper! 🌟"
  },
  {
    id: 8,
    text: "Demokratik barış teorisinin (Democratic Peace Theory) temel iddiası nedir?",
    options: [
      "A) Demokratik devletlerin otoriter devletlerle savaşma olasılığının düşük olması",
      "B) Demokrasilerin ekonomik olarak daha bağımlı oldukları için savaştan kaçınmaları",
      "C) Demokrasilerin birbirleriyle savaşmama eğiliminde olmaları",
      "D) Demokratikleşme süreçlerinin her zaman barışçıl sonuçlar doğurması",
      "E) Demokrasilerin uluslararası örgütlere daha fazla güvenmesi"
    ],
    correctAnswer: "C",
    explanation: "Demokratik barış teorisi, demokrasilerin birbirleriyle savaşma olasılığının düşük olduğunu iddia eder. Bu, teorinin en merkezi ve bilinen önermelerinden biridir.",
    motivationalQuote: "Senin siyaset bilimi anlayışın gerçekten kuvvetli! 💪"
  },
  {
    id: 9,
    text: "Eleştirel Güvenlik Çalışmaları'nın (Critical Security Studies) güvenlik anlayışına getirdiği \"genişletme (widening)\" ve \"derinleştirme (deepening)\" kavramları ne anlama gelir?",
    options: [
      "A) Genişletme güvenlik tanımını netleştirmek, derinleştirme ise askeri önlemleri artırmak anlamına gelir.",
      "B) Genişletme uluslararası işbirliğini artırmak, derinleştirme ise ulusal egemenliği güçlendirmek anlamına gelir.",
      "C) Genişletme güvenliğin kapsadığı alanları (ekonomik, çevresel vb.) artırmak, derinleştirme ise güvenliği sağlanacak aktörleri (birey, toplum vb.) çeşitlendirmek anlamına gelir.",
      "D) Genişletme güvenlik çalışmalarının coğrafi kapsamını genişletmek, derinleştirme ise tarihsel analizleri artırmak anlamına gelir.",
      "E) Genişletme pozitif güvenlik, derinleştirme ise negatif güvenlik kavramını ifade eder."
    ],
    correctAnswer: "C",
    explanation: "Genişletme (widening), güvenliğin askeri boyutun ötesine geçerek ekonomik, çevresel, toplumsal gibi yeni sektörleri kapsaması anlamına gelirken; derinleştirme (deepening), güvenliği sağlanacak \"referans nesnesinin\" sadece devlet değil, bireyler, toplumlar ve hatta insanlık gibi farklı aktörleri içermesi anlamına gelir.",
    motivationalQuote: "Bu kadar karmaşık kavramları anlayabilmen inanılmaz! 🤩"
  },
  {
    id: 10,
    text: "Kopenhag Okulu tarafından geliştirilen güvenlikleştirme teorisine (Securitization Theory) göre, bir konunun \"güvenlik tehdidi\" haline gelmesi nasıl gerçekleşir?",
    options: [
      "A) Konunun doğal olarak tehlikeli olması ve somut askeri bir tehdit oluşturmasıyla",
      "B) Uluslararası hukukun o konuyu güvenlik tehdidi olarak tanımlamasıyla",
      "C) Bir aktörün (örneğin siyasetçi) bir konuyu \"varoluşsal tehdit\" olarak tanımlaması ve bu söylemin dinleyici tarafından kabul görmesiyle",
      "D) Akademisyenlerin o konuyu güvenlik literatürüne dahil etmesiyle",
      "E) Ekonomik krizlerin veya doğal afetlerin doğrudan ve otomatik olarak güvenlik sorununa dönüşmesiyle"
    ],
    correctAnswer: "C",
    explanation: "Güvenlikleştirme teorisi, bir konunun doğal olarak tehdit olmadığını, ancak bir \"güvenlikleştirici aktör\" (securitizing actor) tarafından \"varoluşsal tehdit\" olarak tanımlanması ve bu söylemin bir \"kitle\" (audience) tarafından kabul edilmesi halinde güvenlik meselesi haline geldiğini savunur.",
    motivationalQuote: "Teorik derinliğin her geçen gün artıyor aşkım! 📚"
  },
  {
    id: 11,
    text: "Postkolonyalizmin, bilgi ve emperyalizm arasındaki ilişkiye dair temel argümanı aşağıdakilerden hangisidir?",
    options: [
      "A) Bilgi üretimi her zaman tarafsızdır ve emperyalizmin oluşumunda rol oynamaz.",
      "B) Emperyal güçler, sömürgeleştirdikleri bölgelerdeki halklar hakkında bilgi üretimi ve kontrolünü, kendi egemenliklerini meşrulaştırmak ve sürdürmek için kullanmıştır.",
      "C) Sömürgecilik döneminde bilgi akışı sadece sömürgeleştirilen toplumlardan emperyal güçlere doğru gerçekleşmiştir.",
      "D) Bilgi, emperyalizme karşı bir direniş aracı olarak kullanılamaz.",
      "E) Emperyalizm sadece toprak işgaliyle ilgilidir, bilgiyle bir bağlantısı yoktur."
    ],
    correctAnswer: "B",
    explanation: "Postkolonyalizm, emperyal güçlerin sadece toprakları değil, aynı zamanda sömürülen halklar hakkındaki bilgiyi de kontrol ettiğini ve bu bilginin emperyalist egemenliği meşrulaştırmak ve sürdürmek için kullanıldığını savunur.",
    motivationalQuote: "Eleştirel düşünme becerilerin çok gelişmiş! 🧠"
  },
  {
    id: 12,
    text: "İnsan güvenliği (Human Security) kavramının temelini oluşturan \"korkudan arınma (freedom from fear)\" ve \"yokluktan arınma (freedom from want)\" ifadeleri ne anlama gelmektedir?",
    options: [
      "A) Korkudan arınma askeri tehditlerden korunmayı, yokluktan arınma ise ekonomik büyüme sağlamayı hedefler.",
      "B) Korkudan arınma bireysel özgürlükleri, yokluktan arınma ise devletin refahını ifade eder.",
      "C) Korkudan arınma şiddet ve çatışmadan korunmayı, yokluktan arınma ise yoksulluk, açlık ve temel ihtiyaçlardan yoksunluktan korunmayı amaçlar.",
      "D) Her iki kavram da sadece askeri güvenliğin sağlanmasına odaklanır.",
      "E) Her iki kavram da devletin egemenliğinin korunmasıyla doğrudan ilişkilidir."
    ],
    correctAnswer: "C",
    explanation: "İnsan güvenliği, insanların hem şiddet ve korkudan (freedom from fear) hem de yoksulluk, açlık ve temel ihtiyaçlardan yoksunluktan (freedom from want) arınmış bir şekilde yaşamalarını sağlamayı amaçlar.",
    motivationalQuote: "İnsani yaklaşımların bu kadar önemli olduğunu anlamanı seviyorum! ❤️"
  },
  {
    id: 13,
    text: "\"Ekolojik güvenlik\" yaklaşımında güvenliği sağlanması gereken ana \"varlık (entity)\" nedir?",
    options: [
      "A) Ulus-devlet",
      "B) Bireyler ve toplumlar",
      "C) Doğal çevre (ekosistemler ve doğal süreçler)",
      "D) Uluslararası ekonomik sistem",
      "E) Askeri altyapılar"
    ],
    correctAnswer: "C",
    explanation: "Ekolojik güvenlik yaklaşımında korunması gereken ana varlık devlet ya da insan değil, doğanın kendisi, yani ekosistemler ve doğal süreçlerdir. İnsan güvenliği, ekosistemlerin sağlığına bağlıdır.",
    motivationalQuote: "Çevre konusundaki bilinçli yaklaşımın harika! 🌍"
  },
  {
    id: 14,
    text: "Ekonomik yaptırımların (economic sanctions) genellikle beklenen siyasi değişimi sağlamakta sınırlı fayda sağlamasının nedenlerinden biri aşağıdakilerden hangisi değildir?",
    options: [
      "A) Hedef ülkenin liderlerinin değil, genellikle halkın zarar görmesi",
      "B) Yaptırımların uygulandığı ülkenin alternatif pazarlar veya yollar bulabilmesi",
      "C) Yaptırımların hedef ülkelerde milliyetçi duyguları tetikleyerek rejimi güçlendirmesi",
      "D) Yaptırımların küreselleşme sayesinde kolayca aşılabiliyor olması",
      "E) Yaptırımların doğrudan askeri müdahalelerden daha etkili olması"
    ],
    correctAnswer: "E",
    explanation: "Ekonomik yaptırımlar, askeri müdahalelerden daha etkili değildir ve çoğu zaman hedefe ulaşmaz. Yaptırımlar halkı etkileyebilir, alternatif yollarla aşılabilir ve hedef ülkede milliyetçiliği güçlendirebilir.",
    motivationalQuote: "Uluslararası ilişkilerdeki karmaşıklıkları çok iyi anlıyorsun! 🌐"
  },
  {
    id: 15,
    text: "Uluslararası bir krizi tanımlayan beş temel unsurdan biri aşağıdakilerden hangisi değildir?",
    options: [
      "A) Sürpriz unsuru (Element of Surprise)",
      "B) Yüksek değere sahip çıkarların tehdit edilmesi (Threat Against High-Value Interests)",
      "C) Uzun müzakere süreci için bol zaman olması (Ample Time for Long Negotiation Process)",
      "D) Maliyet ve kazançlarla ilgili belirsizlikler (Ambiguities Regarding Costs and Benefits)",
      "E) Askeri çatışma olasılığının artması (Higher Probability of Military Clash)"
    ],
    correctAnswer: "C",
    explanation: "Uluslararası bir krizin temel unsurlarından biri \"zaman baskısı\"dır, yani tarafların çabuk karar vermesi gerekir ve olaylar hızla gelişir. Bu durum, uzun müzakere süreçleri için bol zamanın olduğu anlamına gelmez, tam tersine zamanın kısıtlı olduğunu belirtir.",
    motivationalQuote: "Kriz yönetimi konusundaki kavrayışın etkileyici! ⚡"
  },
  {
    id: 16,
    text: "Bireysel-kurumsal rekabet yaklaşımına göre devletlerin nükleer silah sahibi olmak istemesinin nedenlerinden biri aşağıdakilerden hangisidir?",
    options: [
      "A) Nükleer silahların yüksek yıkıcı gücünün caydırıcılık sağlaması",
      "B) Nükleer teknolojiye erişimin kolaylaşması",
      "C) Askeri yetkililerin ve ilgili kurumların nükleer programlar sayesinde bütçe, prestij ve siyasi etki kazanması",
      "D) Uluslararası normların nükleer silahlanmayı teşvik etmesi",
      "E) Nükleer şemsiye altında olmanın getirdiği güvenlik açığı"
    ],
    correctAnswer: "C",
    explanation: "Bireysel-kurumsal rekabet yaklaşımına göre, askeri kurumlar ve ilgili sivil aktörler (mühendisler, akademisyenler) nükleer programlar aracılığıyla bütçe, prestij ve siyasi etki kazanabilirler, bu da nükleer silah edinme isteğini besler.",
    motivationalQuote: "Nükleer politikaların arkasındaki motivasyonları anlaman süper! ☢️"
  },
  {
    id: 17,
    text: "Primordializm (İlkselcilik) yaklaşımına göre etnik kimliğin temel özelliği nedir?",
    options: [
      "A) Sanayileşme ve ulus-devletleşme süreciyle oluşması",
      "B) Medya ve siyaset tarafından sosyal olarak inşa edilmesi",
      "C) Doğuştan gelmesi, değişmez olması ve güçlü duygusal bağlar (kan bağı, dil, din) içermesi",
      "D) Küresel etkileşimler sonucunda zamanla değişebilmesi",
      "E) Sadece ekonomik çıkarlar doğrultusunda kullanılması"
    ],
    correctAnswer: "C",
    explanation: "Primordializm, etnik kimliklerin doğuştan geldiğini, değişmez olduğunu ve kan bağı, dil, din, tarih gibi güçlü duygusal bağlara dayandığını savunur.",
    motivationalQuote: "Kimlik teorilerini bu kadar net ayırt edebilmen harika! 🏛️"
  },
  {
    id: 18,
    text: "Terörizme yönelik \"hastalık gibi görmek (Terrorism as Disease)\" bakış açısı, terörle mücadelede hangi yöntemi önceliklendirir?",
    options: [
      "A) Askeri operasyonlar ve misillemeler",
      "B) Polis ve yargı gibi iç güvenlik araçlarıyla yasal süreçler yürütmek",
      "C) Terörizmin temel nedenleri olan yoksulluk, dışlanma ve radikalleşme gibi sorunları eğitim ve sosyal reformlarla çözmeye çalışmak",
      "D) Uluslararası yaptırımlar ve diplomatik izolasyon uygulamak",
      "E) Sadece fiziksel güvenlik önlemlerini artırmak"
    ],
    correctAnswer: "C",
    explanation: "Terörizmin \"hastalık gibi görmek\" bakış açısı, terörün temel sebepleri olan yoksulluk, dışlanma ve radikalleşme gibi sorunları dikkate alır ve uzun vadede eğitim, sosyal reform ve eşitlik politikaları ile çözüm aranması gerektiğini savunur.",
    motivationalQuote: "Sosyal sorunlara yaklaşımın gerçekten olgun! 🤝"
  },
  {
    id: 19,
    text: "Sağlık güvenliği bağlamında, bulaşıcı hastalıkların \"ulusal güvenlik tehdidi\" olarak görülmesinin temel nedeni nedir?",
    options: [
      "A) Hastalıkların sadece askeri personeli etkilemesi",
      "B) Hastalıkların küresel salgınlara dönüşme potansiyellerinin olmaması",
      "C) Hastalıkların nüfus sağlığını, ekonomiyi, yönetimi ve toplumsal düzeni ciddi biçimde etkileme potansiyeli taşıması",
      "D) Uluslararası örgütlerin bu konuda yeterli bilgiye sahip olmaması",
      "E) Modern tıbbın tüm hastalıkları tamamen ortadan kaldırma kapasitesine sahip olması"
    ],
    correctAnswer: "C",
    explanation: "Ulusal güvenlik çerçevesinde, bulaşıcı hastalıklar sadece sağlık değil, ulusal güvenlik tehdidi olarak görülür çünkü bir salgın nüfusu, ekonomiyi, yönetimi ve toplumsal düzeni ciddi biçimde etkileyebilir.",
    motivationalQuote: "Sağlık güvenliği konusundaki farkındalığın önemli! 🏥"
  },
  {
    id: 20,
    text: "Siber güvenliğin \"teknik söylem (Technical Discourse)\" bağlamında ele alınması, hangi unsurlara odaklanmayı gerektirir?",
    options: [
      "A) Uluslararası hukuk ve siber alanın yönetişim kuralları",
      "B) Siber suçların ve siber casusluğun motivasyonları",
      "C) Yazılım açıkları, zararlı yazılımlar (malware) ve bunlara karşı savunma sistemleri",
      "D) Siber saldırıların siyasi ve toplumsal sonuçları",
      "E) Siber alanın güç ilişkileri ve kimlik inşası üzerindeki etkisi"
    ],
    correctAnswer: "C",
    explanation: "Siber güvenliğin teknik söylemi, siber güvenliği sadece teknik bir sorun olarak ele alır ve odak noktası yazılım açıkları, zararlı yazılımlar (malware) ve bunlara karşı savunma sistemleridir.",
    motivationalQuote: "Siber güvenlik konusundaki bilgin de çok kuvvetli! Tebrikler aşkım, 20 soruyu da tamamladın! 💻🎉"
  }
];

function HomePage() {
  return (
    <div className="home-container">
      <h1>Aşkımın Ders Notları</h1>
      <p>Canım, aşağıdaki derslerden birine tıklayarak o dersin içeriğine ulaşabilirsin 💝</p>
      <div className="courses-grid">
        <div className="course-section">
          <h3>Devlet, Toplum ve Din</h3>
          <div className="course-buttons">
            <Link to="/devlet-toplum-din" className="course-card">
              <div className="course-card-content">
                <h2>Quiz</h2>
                <p>Uluslararası İlişkiler bağlamında din ve toplum ilişkisi üzerine sorular.</p>
                <div className="course-card-footer">
                  <span className="question-count">30 Soru</span>
                  <span className="start-quiz">Quiz'e Başla →</span>
                </div>
              </div>
            </Link>
            <Link to="/devlet-toplum-din/notlar" className="course-card">
              <div className="course-card-content">
                <h2>Ders Notları</h2>
                <p>Derste işlenen konuların sesli anlatımı.</p>
                <div className="course-card-footer">
                  <span className="audio-count">1 Ses Kaydı</span>
                  <span className="start-listening">Dinlemeye Başla →</span>
                </div>
              </div>
            </Link>
          </div>
        </div>
        
        <div className="course-section">
          <h3>International Security</h3>
          <div className="course-buttons">
            <Link to="/international-security/notlar" className="course-card">
              <div className="course-card-content">
                <h2>🌍 International Security</h2>
                <p>Quiz, notlar, ses kayıtları, flashcards, sınav soruları ve ezber oyunu - hepsi tek yerde!</p>
                <div className="course-card-footer">
                  <span className="notes-count">6 Farklı Araç</span>
                  <span className="start-reading">Tüm Araçlara Git →</span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function LectureNotes() {
  const [currentAudio, setCurrentAudio] = useState<number | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const lectureNotes = [
    {
      id: 1,
      title: "Din ve Dış Politika İlişkisi",
      description: "Dinin dış politika üzerindeki etkisi ve uluslararası ilişkilerdeki rolü.",
      duration: "8:00",
      file: "/halesinav/audio/din-ve-dis-politika.mp3"
    }
  ];

  const handlePlay = (id: number) => {
    if (currentAudio === id) {
      if (audioRef.current?.paused) {
        audioRef.current?.play();
      } else {
        audioRef.current?.pause();
      }
    } else {
      setCurrentAudio(id);
      if (audioRef.current) {
        audioRef.current.src = lectureNotes.find(note => note.id === id)?.file || '';
        audioRef.current.play();
      }
    }
  };

  return (
    <div className="lecture-notes-container">
      <h2>Ders Notları</h2>
      <p className="section-description">Aşkım, aşağıdaki ses kayıtlarını dinleyerek ders notlarına ulaşabilirsin 💝</p>
      <div className="audio-list">
        {lectureNotes.map(note => (
          <div key={note.id} className="audio-card">
            <div className="audio-info">
              <h3>{note.title}</h3>
              <p>{note.description}</p>
              <span className="duration">{note.duration}</span>
            </div>
            <button 
              className={`play-button ${currentAudio === note.id ? 'playing' : ''}`}
              onClick={() => handlePlay(note.id)}
            >
              {currentAudio === note.id && !audioRef.current?.paused ? '⏸️' : '▶️'}
            </button>
          </div>
        ))}
      </div>
      <audio ref={audioRef} onEnded={() => setCurrentAudio(null)} />
      <Link to="/" className="home-button">Ana Sayfaya Dön</Link>
    </div>
  );
}

function InternationalSecurityNotes() {
  const [currentSection, setCurrentSection] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState<{ [key: number]: boolean }>({});

  const handlePlay = (id: number) => {
    setIsPlaying(prev => ({ ...prev, [id]: !prev[id] }));
  };

  if (currentSection === 'quiz') {
    return <InternationalSecurityQuizApp />;
  }

  if (currentSection === 'notes') {
    return <InternationalSecurityLectureNotes />;
  }

  if (currentSection === 'audio') {
    return (
      <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
        <h2 style={{ color: '#2c3e50', textAlign: 'center', marginBottom: '30px' }}>🎧 Sesli Anlatım</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ 
            background: 'linear-gradient(135deg, #00b894 0%, #00a085 100%)', 
            color: 'white', 
            padding: '20px', 
            borderRadius: '15px',
            textAlign: 'center'
          }}>
            <h3>🎵 Dış Politika ve Güvenlik</h3>
            <audio controls style={{ width: '100%', marginTop: '10px' }}>
              <source src="/halesinav/audio/din-ve-dis-politika.mp3" type="audio/mpeg" />
              Tarayıcınız ses dosyasını desteklemiyor.
            </audio>
          </div>
          <div style={{ 
            background: 'linear-gradient(135deg, #00b894 0%, #00a085 100%)', 
            color: 'white', 
            padding: '20px', 
            borderRadius: '15px',
            textAlign: 'center'
          }}>
            <h3>🛡️ Güvenlik Kavramları</h3>
            <audio controls style={{ width: '100%', marginTop: '10px' }}>
              <source src="/halesinav/audio/guvenlik.mp3" type="audio/mpeg" />
              Tarayıcınız ses dosyasını desteklemiyor.
            </audio>
          </div>
        </div>
        <div style={{ textAlign: 'center', marginTop: '30px' }}>
          <button 
            onClick={() => setCurrentSection(null)}
            style={{
              background: 'linear-gradient(135deg, #636e72 0%, #2d3436 100%)',
              color: 'white',
              border: 'none',
              padding: '15px 30px',
              borderRadius: '25px',
              fontSize: '16px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            ← Geri Dön
          </button>
        </div>
      </div>
    );
  }

  if (currentSection === 'flashcards') {
    return <FlashcardsApp />;
  }

  if (currentSection === 'exam-questions') {
    return <InternationalSecurityExamQuestions />;
  }

  if (currentSection === 'memory-game') {
    return <InternationalSecurityMemoryGame />;
  }

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ 
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontSize: '3rem',
          fontWeight: 'bold',
          marginBottom: '10px'
        }}>
          🌍 Uluslararası Güvenlik
        </h1>
        <p style={{ fontSize: '1.2rem', color: '#7f8c8d' }}>
          Kapsamlı ders materyalleri ve etkileşimli öğrenme araçları
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '25px' }}>
        {/* Quiz */}
        <div style={{
          background: 'linear-gradient(135deg, #74b9ff 0%, #0984e3 100%)',
          borderRadius: '20px',
          padding: '30px',
          color: 'white',
          textAlign: 'center',
          cursor: 'pointer',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          boxShadow: '0 10px 30px rgba(116, 185, 255, 0.3)'
        }}
        onClick={() => setCurrentSection('quiz')}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-5px)';
          e.currentTarget.style.boxShadow = '0 15px 40px rgba(116, 185, 255, 0.4)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 10px 30px rgba(116, 185, 255, 0.3)';
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '15px' }}>📝</div>
          <h3 style={{ fontSize: '1.4rem', marginBottom: '10px' }}>Quiz</h3>
          <p>20 soruluk kapsamlı sınav</p>
        </div>

        {/* Ders Notları */}
        <div style={{
          background: 'linear-gradient(135deg, #fd79a8 0%, #e84393 100%)',
          borderRadius: '20px',
          padding: '30px',
          color: 'white',
          textAlign: 'center',
          cursor: 'pointer',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          boxShadow: '0 10px 30px rgba(253, 121, 168, 0.3)'
        }}
        onClick={() => setCurrentSection('notes')}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-5px)';
          e.currentTarget.style.boxShadow = '0 15px 40px rgba(253, 121, 168, 0.4)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 10px 30px rgba(253, 121, 168, 0.3)';
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '15px' }}>📚</div>
          <h3 style={{ fontSize: '1.4rem', marginBottom: '10px' }}>Ders Notları</h3>
          <p>Detaylı konu anlatımları</p>
        </div>

        {/* Sesli Anlatım */}
        <div style={{
          background: 'linear-gradient(135deg, #00b894 0%, #00a085 100%)',
          borderRadius: '20px',
          padding: '30px',
          color: 'white',
          textAlign: 'center',
          cursor: 'pointer',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          boxShadow: '0 10px 30px rgba(0, 184, 148, 0.3)'
        }}
        onClick={() => setCurrentSection('audio')}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-5px)';
          e.currentTarget.style.boxShadow = '0 15px 40px rgba(0, 184, 148, 0.4)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 184, 148, 0.3)';
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '15px' }}>🎧</div>
          <h3 style={{ fontSize: '1.4rem', marginBottom: '10px' }}>Sesli Anlatım</h3>
          <p>Dinleyerek öğrenme</p>
        </div>

        {/* Flashcards */}
        <div style={{
          background: 'linear-gradient(135deg, #fdcb6e 0%, #e17055 100%)',
          borderRadius: '20px',
          padding: '30px',
          color: 'white',
          textAlign: 'center',
          cursor: 'pointer',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          boxShadow: '0 10px 30px rgba(253, 203, 110, 0.3)'
        }}
        onClick={() => setCurrentSection('flashcards')}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-5px)';
          e.currentTarget.style.boxShadow = '0 15px 40px rgba(253, 203, 110, 0.4)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 10px 30px rgba(253, 203, 110, 0.3)';
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '15px' }}>🃏</div>
          <h3 style={{ fontSize: '1.4rem', marginBottom: '10px' }}>Flashcards</h3>
          <p>50 kart ile hızlı tekrar</p>
        </div>

        {/* Sınav Soruları */}
        <div style={{
          background: 'linear-gradient(135deg, #a29bfe 0%, #6c5ce7 100%)',
          borderRadius: '20px',
          padding: '30px',
          color: 'white',
          textAlign: 'center',
          cursor: 'pointer',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          boxShadow: '0 10px 30px rgba(162, 155, 254, 0.3)'
        }}
        onClick={() => setCurrentSection('exam-questions')}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-5px)';
          e.currentTarget.style.boxShadow = '0 15px 40px rgba(162, 155, 254, 0.4)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 10px 30px rgba(162, 155, 254, 0.3)';
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '15px' }}>📋</div>
          <h3 style={{ fontSize: '1.4rem', marginBottom: '10px' }}>Sınav Soruları</h3>
          <p>18 kategori kapsamlı sorular</p>
        </div>

        {/* YENİ: Ezber Oyunu */}
        <div style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: '20px',
          padding: '30px',
          color: 'white',
          textAlign: 'center',
          cursor: 'pointer',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          boxShadow: '0 10px 30px rgba(102, 126, 234, 0.3)'
        }}
        onClick={() => setCurrentSection('memory-game')}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-5px)';
          e.currentTarget.style.boxShadow = '0 15px 40px rgba(102, 126, 234, 0.4)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 10px 30px rgba(102, 126, 234, 0.3)';
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '15px' }}>🎮</div>
          <h3 style={{ fontSize: '1.4rem', marginBottom: '10px' }}>Ezber Oyunu</h3>
          <p>Eğlenceli başlık ezberleme</p>
        </div>
      </div>

      <div style={{ textAlign: 'center', marginTop: '40px' }}>
        <button 
          onClick={() => window.location.href = '/halesinav'}
          style={{
            background: 'linear-gradient(135deg, #636e72 0%, #2d3436 100%)',
            color: 'white',
            border: 'none',
            padding: '15px 30px',
            borderRadius: '25px',
            fontSize: '16px',
            cursor: 'pointer',
            fontWeight: 'bold',
            transition: 'transform 0.3s ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          ← Ana Sayfaya Dön
        </button>
      </div>
    </div>
  );
}

function InternationalSecurityLectureNotes() {
  const [currentAudio, setCurrentAudio] = useState<number | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const lectureNotes = [
    {
      id: 1,
      title: "Uluslararası Güvenlik",
      description: "Uluslararası güvenlik kavramları, teoriler ve modern tehditler üzerine kapsamlı anlatım.",
      duration: "12:00",
      file: "/halesinav/audio/guvenlik.mp3"
    }
  ];

  const handlePlay = (id: number) => {
    if (currentAudio === id) {
      if (audioRef.current?.paused) {
        audioRef.current?.play();
      } else {
        audioRef.current?.pause();
      }
    } else {
      setCurrentAudio(id);
      if (audioRef.current) {
        audioRef.current.src = lectureNotes.find(note => note.id === id)?.file || '';
        audioRef.current.play();
      }
    }
  };

  return (
    <div className="lecture-notes-container">
      <h2>International Security - Sesli Anlatım</h2>
      <p className="section-description">Aşkım, aşağıdaki ses kaydını dinleyerek uluslararası güvenlik konularını öğrenebilirsin 💝</p>
      <div className="audio-list">
        {lectureNotes.map(note => (
          <div key={note.id} className="audio-card">
            <div className="audio-info">
              <h3>{note.title}</h3>
              <p>{note.description}</p>
              <span className="duration">{note.duration}</span>
            </div>
            <button 
              className={`play-button ${currentAudio === note.id ? 'playing' : ''}`}
              onClick={() => handlePlay(note.id)}
            >
              {currentAudio === note.id && !audioRef.current?.paused ? '⏸️' : '▶️'}
            </button>
          </div>
        ))}
      </div>
      <audio ref={audioRef} onEnded={() => setCurrentAudio(null)} />
      <Link to="/" className="home-button">Ana Sayfaya Dön</Link>
    </div>
  );
}

function DevletToplumDinQuizApp() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const handleAnswerSelect = (answer: string) => {
    if (selectedAnswer) return;
    setSelectedAnswer(answer);
    setShowExplanation(true);
    if (answer === questions[currentQuestionIndex].correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setScore(0);
    setQuizCompleted(false);
  };

  if (quizCompleted) {
    const wrongAnswers = questions.length - score;
    const percentage = (score / questions.length) * 100;
    let message = "";
    let emoji = "";

    if (percentage === 100) {
      message = "Mükemmelsin aşkım! Tüm soruları doğru yanıtladın! 🎯";
      emoji = "🏆";
    } else if (percentage >= 80) {
      message = "Harikasın bebeğim! Çok iyi bir sonuç! 🌟";
      emoji = "🎉";
    } else if (percentage >= 60) {
      message = "İyi iş çıkardın canım! Biraz daha çalışarak daha da iyi olacaksın! 💪";
      emoji = "✨";
    } else {
      message = "Üzülme aşkım, birlikte çalışarak daha iyi olacağız! 💝";
      emoji = "💫";
    }

    return (
      <div className="quiz-completed-container">
        <div className="quiz-result-card">
          <h2>Quiz Tamamlandı! {emoji}</h2>
          <div className="score-details">
            <div className="score-item">
              <span className="score-label">Toplam Soru</span>
              <span className="score-value">{questions.length}</span>
            </div>
            <div className="score-item correct">
              <span className="score-label">Doğru</span>
              <span className="score-value">{score}</span>
            </div>
            <div className="score-item wrong">
              <span className="score-label">Yanlış</span>
              <span className="score-value">{wrongAnswers}</span>
            </div>
            <div className="score-item percentage">
              <span className="score-label">Başarı</span>
              <span className="score-value">%{percentage.toFixed(0)}</span>
            </div>
          </div>
          <p className="result-message">{message}</p>
          <div className="result-actions">
            <button onClick={handleRestart} className="restart-button">
              Yeniden Başla
            </button>
            <Link to="/" className="home-button">
              Ana Sayfaya Dön
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="quiz-container">
      <h2>Soru {currentQuestionIndex + 1} / {questions.length}</h2>
      <p className="question-text">{currentQuestion.text}</p>
      <div className="options-container">
        {currentQuestion.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswerSelect(option.charAt(0))}
            className={`option-button ${
              selectedAnswer === option.charAt(0)
                ? option.charAt(0) === currentQuestion.correctAnswer
                  ? 'correct'
                  : 'incorrect'
                : ''
            } ${selectedAnswer && option.charAt(0) === currentQuestion.correctAnswer ? 'correct' : ''}`}
            disabled={!!selectedAnswer}
          >
            {option}
          </button>
        ))}
      </div>
      {showExplanation && (
        <div className="explanation-container">
          <p className="explanation">{currentQuestion.explanation}</p>
          <p className="motivational-quote">{currentQuestion.motivationalQuote}</p>
          <button onClick={handleNextQuestion}>
            {currentQuestionIndex === questions.length - 1 ? 'Bitir' : 'Sonraki Soru'}
          </button>
        </div>
      )}
    </div>
  );
}

function InternationalSecurityQuizApp() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const handleAnswerSelect = (answer: string) => {
    if (selectedAnswer) return;
    setSelectedAnswer(answer);
    setShowExplanation(true);
    if (answer === internationalSecurityQuestions[currentQuestionIndex].correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < internationalSecurityQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setScore(0);
    setQuizCompleted(false);
  };

  if (quizCompleted) {
    const wrongAnswers = internationalSecurityQuestions.length - score;
    const percentage = (score / internationalSecurityQuestions.length) * 100;
    let message = "";
    let emoji = "";

    if (percentage === 100) {
      message = "Mükemmelsin aşkım! Tüm soruları doğru yanıtladın! Uluslararası güvenlik uzmanı oldun! 🎯";
      emoji = "🏆";
    } else if (percentage >= 80) {
      message = "Harikasın bebeğim! Çok iyi bir sonuç! Güvenlik teorilerini çok iyi anlıyorsun! 🌟";
      emoji = "🎉";
    } else if (percentage >= 60) {
      message = "İyi iş çıkardın canım! Biraz daha çalışarak daha da iyi olacaksın! 💪";
      emoji = "✨";
    } else {
      message = "Üzülme aşkım, birlikte çalışarak daha iyi olacağız! Bu konular zor ama sen başarabilirsin! 💝";
      emoji = "💫";
    }

    return (
      <div className="quiz-completed-container">
        <div className="quiz-result-card">
          <h2>International Security Quiz Tamamlandı! {emoji}</h2>
          <div className="score-details">
            <div className="score-item">
              <span className="score-label">Toplam Soru</span>
              <span className="score-value">{internationalSecurityQuestions.length}</span>
            </div>
            <div className="score-item correct">
              <span className="score-label">Doğru</span>
              <span className="score-value">{score}</span>
            </div>
            <div className="score-item wrong">
              <span className="score-label">Yanlış</span>
              <span className="score-value">{wrongAnswers}</span>
            </div>
            <div className="score-item percentage">
              <span className="score-label">Başarı</span>
              <span className="score-value">%{percentage.toFixed(0)}</span>
            </div>
          </div>
          <p className="result-message">{message}</p>
          <div className="result-actions">
            <button onClick={handleRestart} className="restart-button">
              Yeniden Başla
            </button>
            <Link to="/" className="home-button">
              Ana Sayfaya Dön
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = internationalSecurityQuestions[currentQuestionIndex];

  return (
    <div className="quiz-container">
      <h2>International Security Quiz - Soru {currentQuestionIndex + 1} / {internationalSecurityQuestions.length}</h2>
      <p className="question-text">{currentQuestion.text}</p>
      <div className="options-container">
        {currentQuestion.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswerSelect(option.charAt(0))}
            className={`option-button ${
              selectedAnswer === option.charAt(0)
                ? option.charAt(0) === currentQuestion.correctAnswer
                  ? 'correct'
                  : 'incorrect'
                : ''
            } ${selectedAnswer && option.charAt(0) === currentQuestion.correctAnswer ? 'correct' : ''}`}
            disabled={!!selectedAnswer}
          >
            {option}
          </button>
        ))}
      </div>
      {showExplanation && (
        <div className="explanation-container">
          <p className="explanation">{currentQuestion.explanation}</p>
          <p className="motivational-quote">{currentQuestion.motivationalQuote}</p>
          <button onClick={handleNextQuestion}>
            {currentQuestionIndex === internationalSecurityQuestions.length - 1 ? 'Bitir' : 'Sonraki Soru'}
          </button>
        </div>
      )}
    </div>
  );
}

function FlashcardsApp() {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const handleNextCard = () => {
    if (currentCardIndex < internationalSecurityFlashcards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
      setIsFlipped(false);
    }
  };

  const handlePrevCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
      setIsFlipped(false);
    }
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const currentCard = internationalSecurityFlashcards[currentCardIndex];

  return (
    <div className="flashcards-container">
      <h2>International Security - Flashcards</h2>
      <p className="section-description">
        Aşkım, kartları çevirerek önemli kavramları pekiştirebilirsin 💝
      </p>
      
      <div className="flashcard-progress">
        <span className="progress-text">
          {currentCardIndex + 1} / {internationalSecurityFlashcards.length}
        </span>
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${((currentCardIndex + 1) / internationalSecurityFlashcards.length) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="flashcard-wrapper">
        <div className={`flashcard ${isFlipped ? 'flipped' : ''}`} onClick={handleFlip}>
          <div className="flashcard-front">
            <div className="card-header">
              <span className="card-type">SORU</span>
            </div>
            <div className="card-content">
              <p>{currentCard.question}</p>
            </div>
            <div className="card-footer">
              <span className="flip-hint">Cevabı görmek için kartı çevir 👆</span>
            </div>
          </div>
          <div className="flashcard-back">
            <div className="card-header">
              <span className="card-type">CEVAP</span>
            </div>
            <div className="card-content">
              <p>{currentCard.answer}</p>
            </div>
            <div className="card-footer">
              <span className="flip-hint">Soruya dönmek için tekrar çevir 👆</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flashcard-controls">
        <button 
          className="nav-button prev" 
          onClick={handlePrevCard}
          disabled={currentCardIndex === 0}
        >
          ← Önceki
        </button>
        
        <button className="flip-button" onClick={handleFlip}>
          {isFlipped ? '🔄 Soruya Dön' : '🔄 Cevabı Göster'}
        </button>
        
        <button 
          className="nav-button next" 
          onClick={handleNextCard}
          disabled={currentCardIndex === internationalSecurityFlashcards.length - 1}
        >
          Sonraki →
        </button>
      </div>

      {currentCardIndex === internationalSecurityFlashcards.length - 1 && (
        <div className="completion-message">
          <p>🎉 Tebrikler aşkım! Tüm kartları tamamladın! Bilgilerini pekiştirdin! 💝</p>
          <button onClick={() => {setCurrentCardIndex(0); setIsFlipped(false);}} className="restart-cards">
            🔄 Baştan Başla
          </button>
        </div>
      )}
      
      <Link to="/" className="home-button">Ana Sayfaya Dön</Link>
    </div>
  );
}

function InternationalSecurityExamQuestions() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedQuestion, setSelectedQuestion] = useState<number | null>(null);

  const examQuestions = [
    {
      category: "REALISM",
      questions: [
        {
          id: 1,
          question: "Realist aile içindeki çoğu teori bazı temel varsayımları paylaşır. Bu temel özelliklerden beş tanesini listeleyin ve kısaca açıklayın.",
          answers: [
            {
              title: "Anarşik uluslararası sistem (Anarchic International System)",
              content: "Devletleri koruyacak ve kuralları uygulayacak merkezi bir dünya hükümetinin veya otoritenin olmaması, onları kendi kendine yardım durumuna zorlar."
            },
            {
              title: "Devlet merkezcilik (State-centrism)",
              content: "Devletlerin, uluslararası siyasetteki en önemli ve birincil aktörler olduğu, kurumların ve diğer aktörlerin ise ikincil olduğu görüşü."
            },
            {
              title: "Güç (Power)",
              content: "Hedeflere ulaşmak ve hayatta kalmayı sağlamak için gereken maddi kaynaklar (zenginlik, ordu, nüfus) olarak anlaşılan, uluslararası ortamın belirleyici özelliği."
            },
            {
              title: "Tekil aktör varsayımı (Unitary Actor Assumption)",
              content: "Analiz için iç siyasi bölünmeleri göz ardı ederek, devletlerin tek ve tutarlı karar alma birimleri olarak ele alınabileceği varsayımı."
            },
            {
              title: "Rasyonel aktör varsayımı (Rational Actor Assumption)",
              content: "Devletlerin stratejik davrandığı ve başta güvenlik ve hayatta kalma olmak üzere ulusal çıkarlarını maksimize etmek için hesaplanmış kararlar aldığı inancı."
            }
          ]
        },
        {
          id: 2,
          question: "Hayatta kalmayı sağlamak için Neorealizm, devletlerin tehditlere karşı iki ana dengeleme stratejisi kullandığını savunur. Bunları adlandırın ve tanımlayın.",
          answers: [
            {
              title: "İçsel dengeleme (Internal Balancing)",
              content: "Bir devletin potansiyel bir rakibe tek başına karşı koymak için kendi askeri yeteneklerini ve ekonomik gücünü artırması."
            },
            {
              title: "Dışsal dengeleme (External Balancing)",
              content: "Bir devletin, daha güçlü ve tehditkar bir devlete karşı güçlerini ve yeteneklerini birleştirmek için diğer devletlerle ittifaklar kurması."
            }
          ]
        },
        {
          id: 3,
          question: "Yapısal Realizm içinde, devletlerin güvenliği nasıl araması gerektiği konusunda temel bir tartışma vardır. İki karşıt teoriyi adlandırın ve devletler için temel tavsiyelerini açıklayın.",
          answers: [
            {
              title: "Saldırgan Realizm (Offensive Realism)",
              content: "Devletler, hayatta kalmayı sağlamanın en iyi yolu en güçlü devlet olmak olduğu için, her zaman güçlerini maksimize etmeye ve hegemonya kurmaya çalışmalıdır."
            },
            {
              title: "Savunmacı Realizm (Defensive Realism)",
              content: "Devletler gücü maksimize etmek yerine uygun bir güç seviyesi aramalıdır, çünkü çok fazla güç elde etmek korku yaratarak diğer devletlerin kendilerine karşı dengeleme yapmasına neden olabilir."
            }
          ]
        },
        {
          id: 4,
          question: "Savunmacı Realizm, bir devletin kendi güvenliğini artırma çabasının ters tepebileceğini savunur. Bu durum, rakibin güvensizliğini artıran üç ana mekanizma aracılığıyla gerçekleşir. Bu mekanizmaları listeleyin ve açıklayın.",
          answers: [
            {
              title: "Silahlanma yarışı (Arms Race)",
              content: "Bir devlet ordusunu güçlendirdiğinde, rakip de kendi ordusunu güçlendirerek karşılık verir ve bu durum her iki taraf için de güvenliği azaltabilecek bir rekabet döngüsüne yol açar."
            },
            {
              title: "Riskli askeri politikalar (Risky Military Policies)",
              content: "Güvensiz bir rakip, kriz ve kazaen savaş olasılığını artıran saldırgan askeri duruşlar veya ilk vuruş politikaları benimseyebilir."
            },
            {
              title: "Siyasi ilişkilerin bozulması (Political Relations Deterioration)",
              content: "Bir devletin askeri yığınağı, rakip tarafından düşmanca niyetlerin kanıtı olarak görülebilir ve bu da diplomasiyi zehirleyen bir güvensizlik sarmalına yol açar."
            }
          ]
        },
        {
          id: 5,
          question: "Anarşi nedeniyle Neorealistler, devletlerin işbirliğinden elde edilen kazanımların nasıl dağıtıldığı konusunda endişeli olduğunu savunur. Devletlerin dikkate aldığı iki 'kazanım' türünü belirleyerek ve tanımlayarak bunu açıklayın.",
          answers: [
            {
              title: "Mutlak kazançlar (Absolute Gains)",
              content: "Bir devletin işbirliğinden elde ettiği toplam faydalar; diğer devletlerin elde ettiği faydalarla karşılaştırılmadan, bağımsız olarak ölçülür."
            },
            {
              title: "Göreli kazançlar (Relative Gains)",
              content: "Bir devletin, bir rakibin işbirliğinden daha fazla kazanarak gücünü artırması ve gelecekte daha büyük bir tehdit oluşturması endişesi."
            }
          ]
        }
      ]
    },
    {
      category: "LIBERALISM",
      questions: [
        {
          id: 1,
          question: "Liberalizm, kendisini Realizmden ayıran birkaç belirgin özellikle karakterize edilir. Liberalist yaklaşımın dört temel özelliğini listeleyin ve kısaca açıklayın.",
          answers: [
            {
              title: "Temelde iyimser (Fundamentally Optimistic)",
              content: "Uluslararası işbirliği ve barışçıl bir dünyanın mümkün olduğuna ve çatışmanın uluslararası politikanın doğasında olmadığını savunur."
            },
            {
              title: "İçten dışa yaklaşım (Inside-out Approach)",
              content: "Devletlerin iç özellikleri (örneğin, siyasi sistem, toplumsal tercihler) dış politika davranışlarının temel belirleyicisi olduğunu savunur."
            },
            {
              title: "Çeşitli aktörlere odaklanma (Focus on Diverse Actors)",
              content: "Devletler önemli olmakla birlikte, Uluslararası Hükümetler Arası Kuruluşlar (IGO'lar), Sivil Toplum Kuruluşları (STK'lar) ve çok uluslu şirketler gibi devlet dışı aktörlerin önemli rolünü vurgular."
            },
            {
              title: "Devletlerin tekil aktör olmaması (States Not as Unitary Actors)",
              content: "Devlet eylemlerini, çeşitli iç gruplar, partiler ve bürokrasiler arasındaki rekabet ve uzlaşmanın sonucu olarak görür, tek bir ses olarak değil."
            }
          ]
        },
        {
          id: 2,
          question: "Neoliberal Kurumsalcılık, uluslararası kurumların anarşi altında bile devletlerin işbirliği yapmasına nasıl yardımcı olduğunu açıklar. Bu kurumların yerine getirdiği dört temel işlevi listeleyin ve kısaca açıklayın.",
          answers: [
            {
              title: "Güvenilir bilgi sağlama (Providing Reliable Information)",
              content: "Güvenilir bilgi üretir ve yayar, bu da devletler arasındaki belirsizliği ve güvensizliği azaltır."
            },
            {
              title: "İşlem maliyetlerini azaltma (Reducing Transaction Costs)",
              content: "Devletlerin düzenli olarak müzakere yapmasını, anlaşmalar yapmasını ve etkileşim kurmasını kolaylaştırır ve daha az maliyetli hale getirir."
            },
            {
              title: "Uyumu denetleme (Monitoring Compliance)",
              content: "Devletlerin taahhütlerine uyup uymadığını denetlemek için mekanizmalar sağlar, bu da hile yapmayı ve bedavacılığı engeller."
            },
            {
              title: "Geleceğe gölge düşürme (Shadow of the Future)",
              content: "İşbirliğini kurumsallaştırarak, devletlerin tekrarlayan etkileşimler beklemesini sağlar, iyi bir itibarın ve gelecekteki işbirliğinin değerini artırır."
            }
          ]
        },
        {
          id: 3,
          question: "Demokratik Barış Teorisi, demokrasilerin birbirleriyle savaşmadığını gözlemler. Bu demokratik barışa neden olduğuna inanılan dört faktörü veya normu listeleyin ve açıklayın.",
          answers: [
            {
              title: "Meşruiyet, saygı ve güven (Legitimacy, Respect and Trust)",
              content: "Demokrasiler, diğer demokratik hükümetleri meşru ve güvene değer görür, ortak bir siyasi-ahlaki temeli paylaşırlar."
            },
            {
              title: "Hesap verebilirlik (Accountability)",
              content: "Demokrasilerdeki liderler, savaşın maliyetlerini taşıyan ve genellikle savaşa karşı çıkan vatandaşlarına karşı hesap verebilir konumdadır, bu da çatışma başlatmayı zorlaştırır."
            },
            {
              title: "Hükümete sınırlamalar (Constraints on Government)",
              content: "Demokratik sistemlerde, savaşa gitme kararını yavaşlatan ve diplomasiye zaman tanıyan denge ve denetleme mekanizmaları (anayasalar, kuvvetler ayrılığı) bulunur."
            },
            {
              title: "Sorunları uzlaşıyla çözme (Solving Problems through Compromise)",
              content: "Demokrasiler, şiddet içermeyen çatışma çözümü ve uzlaşma normları üzerine kuruludur ve bu normları birbirleriyle olan uluslararası ilişkilerinde de uygulamaya eğilimlidirler."
            }
          ]
        },
        {
          id: 4,
          question: "Ticari Liberalizm, en eski liberal düşünce okullarından biridir. Bu yaklaşımın üç merkezi fikrini veya mekanizmasını adlandırın ve tanımlayın.",
          answers: [
            {
              title: "Ekonomik Karşılıklı Bağımlılık (Economic Interdependence)",
              content: "Ülkeler arasındaki kapsamlı ticaret ve yatırımın, savaşı refahları için çok maliyetli ve yıkıcı bir seçenek haline getirdiğini savunur."
            },
            {
              title: "Serbest Teşebbüs / Piyasa Ekonomisi (Free Enterprise / Market Economy)",
              content: "Ekonomik faaliyetin devlet kontrolü yerine piyasa güçleri tarafından yönlendirildiğinde zenginliğin en verimli şekilde üretildiğini varsayar."
            },
            {
              title: "Küreselleşme (Globalization)",
              content: "Malların, sermayenin ve fikirlerin sınırlar arası artan akışının ulusal ayrımları aşındırdığına ve tek bir küresel topluluk hissini teşvik ettiğine inanır."
            }
          ]
        },
        {
          id: 5,
          question: "İyimserliğine rağmen Liberalizm birkaç büyük eleştiriyle karşı karşıyadır. Liberalist uluslararası ilişkiler yaklaşımına yöneltilen üç önemli eleştiriyi listeleyin ve açıklayın.",
          answers: [
            {
              title: "Batı emperyalizmi (Western Imperialism)",
              content: "Liberal değerlerin (demokrasi, piyasa ekonomileri) teşvikinin, genellikle Batı çıkarlarını ilerletmek ve Batı egemenliğini sürdürmek için bir kılıf olduğunu savunur."
            },
            {
              title: "İç tutarsızlıklar (Internal Inconsistencies)",
              content: "Liberalizmin, örneğin istikrar için otokrasilerle ilişki kurmak veya insan hakları ihlalleri nedeniyle onları izole etmek gibi çelişkili tavsiyeler sunduğunu belirtir."
            },
            {
              title: "Teorik zayıflık (Theoretical Weakness)",
              content: "Demokratik barış gibi bazı temel liberal bulguların, gerçek bir nedensel ilişkiden ziyade yanıltıcı bir korelasyona dayanabileceğini iddia eder."
            }
          ]
        }
      ]
    },
    {
      category: "HISTORICAL MATERIALISM",
      questions: [
        {
          id: 1,
          question: "Notlarda Tarihsel Materyalizmin üç boyutu olduğu belirtilmektedir. Her birini adlandırın ve kısaca açıklayın.",
          answers: [
            {
              title: "Sosyal bilimsel (Social Scientific)",
              content: "Üretim biçimlerinin (kapitalizm gibi) sınıf yapılarını nasıl yarattığını ve bu sınıflar arasındaki çatışmanın tarihsel değişimi nasıl yönlendirdiğini analiz eder."
            },
            {
              title: "Felsefi (Philosophical)",
              content: "Üretken sistemlerin ve güç eşitsizliklerinin baskın fikirleri ve söylemleri nasıl şekillendirdiğini inceleyerek, sosyal gerçekliği anlamak için sistematik bir yol sunar."
            },
            {
              title: "Politik (Political)",
              content: "Kapitalizmin içsel sömürü ve yabancılaşmasını eleştiren siyasi hareketlerle (küresel adalet ve küreselleşme karşıtlığı gibi) ilişkilidir."
            }
          ]
        },
        {
          id: 2,
          question: "HM'nin kapitalizm eleştirisi, işçinin deneyimini tanımlayan iki kavrama dayanır. \"Sömürü\" ve \"Yabancılaşma\" kavramlarını tanımlayın.",
          answers: [
            {
              title: "Sömürü (Exploitation)",
              content: "İşçilere, emeklerinin yarattığı gerçek değerden daha düşük bir ücret ödenen ve kapitalistin geri kalanını kâr olarak (artı değer) kendine mal ettiği bir süreç."
            },
            {
              title: "Yabancılaşma (Alienation)",
              content: "İşçilerin kendi emekleri ve yarattıkları ürünler üzerindeki kontrol eksikliği nedeniyle yaşadıkları güçsüzlük ve ayrılık hissi."
            }
          ]
        },
        {
          id: 3,
          question: "Notlar kapitalizmi iki çelişkili yüze sahip olarak tanımlar. Onun \"ilerici\" ve \"gerici\" yönlerini açıklayın.",
          answers: [
            {
              title: "İlerici Yön (Progressive Aspect)",
              content: "Kapitalizm, insan yaratıcı kapasitelerini harekete geçirme, üretici güçleri geliştirme ve muazzam zenginlik ve teknoloji üretme konusundaki benzersiz yeteneğiyle ilerici bir nitelik taşır."
            },
            {
              title: "Gerici Yön (Regressive Aspect)",
              content: "Kapitalizm, sömürü ve yabancılaşma süreçleri aracılığıyla aynı anda büyük eşitsizlik, yoksulluk ve işçi sınıfı için güvensizlik yarattığı için gericidir."
            }
          ]
        },
        {
          id: 4,
          question: "Barış Çalışmaları ve Tarihsel Materyalizm, dolaylı zararı anlamak için ortak bir kavramı paylaşır. \"Yapısal Şiddet\"i tanımlayın ve HM'nin bunu kapitalizme nasıl bağladığını açıklayın.",
          answers: [
            {
              title: "Yapısal Şiddet (Structural Violence)",
              content: "Doğrudan güç kullanımıyla değil, bir toplumun yapısının neden olduğu (örneğin yoksulluk veya önlenebilir hastalıklardan kaynaklanan ölümler) önlenebilir acı ve ölüm."
            },
            {
              title: "HM'nin Kapitalizme Bağlantısı (HM's Connection to Capitalism)",
              content: "Tarihsel Materyalizm, kapitalizmin neden içsel olarak yapısal şiddet barındırdığına dair bir teori sunar, çünkü sistemin sömürü yoluyla kâr yaratma ihtiyacı kaçınılmaz olarak eşitsizlik ve yoksunluk üretir."
            }
          ]
        },
        {
          id: 5,
          question: "HM, Realizmde anlaşıldığı şekliyle \"ulusal çıkara\" ve Liberalizmde anlaşıldığı şekliyle \"özgürlük\" kavramına özel bir eleştiri getirir. Bu iki eleştiriyi açıklayın.",
          answers: [
            {
              title: "Realizm'in \"Ulusal Çıkarı\"na Eleştiri (Critique of Realism's National Interest)",
              content: "Tarihsel Materyalizm, \"ulusal çıkarın\" tarafsız veya zamansız bir kavram olmadığını, aksine bir devlet içindeki egemen kapitalist sınıfın belirli sınıf çıkarlarını yansıttığını savunur."
            },
            {
              title: "Liberalizm'in \"Özgürlük\" Kavramına Eleştiri (Critique of Liberalism's Freedom Concept)",
              content: "Tarihsel Materyalizm, liberal \"çalışma özgürlüğünün\", üretim araçlarına sahip olmayan işçilerin hayatta kalmak için emeklerini satmaya zorlandıkları yapısal \"özgürsüzlüğü\" gizlediğini savunur."
            }
          ]
        }
      ]
    },
    {
      category: "PEACE STUDIES",
      questions: [
        {
          id: 1,
          question: "Notlarda modern barış çalışmalarını tanımlayan yedi özellik listelenmektedir. Bu özelliklerden dört tanesini adlandırın ve kısaca açıklayın.",
          answers: [
            {
              title: "Temel Nedenler (Root Causes)",
              content: "Doğrudan şiddetin köken nedenlerini ele alma ve yapısal eşitsizliklerin üstesinden gelme yollarını keşfetme kaygısı."
            },
            {
              title: "Disiplinlerarası Yaklaşımlar (Interdisciplinary Approaches)",
              content: "Şiddetli çatışmayı anlamak için birçok akademik disiplinden çok yönlü bir yanıtın esas olduğunun kabulü."
            },
            {
              title: "Şiddet İçermeyen Dönüşümler (Non-violent Transformations)",
              content: "Anlaşmazlıkları çözmek ve potansiyel olarak şiddetli durumların şiddet içermeyen dönüşümünü başarmak için barışçıl yollar arayışı."
            },
            {
              title: "Çok Düzeyli Analiz (Multi-level Analysis)",
              content: "\"İç\" ve \"dış\" ikilemini aşmaya çalışarak, çatışmanın bireysel, grup, devlet ve devletlerarası düzeylerde analizini benimseme."
            }
          ]
        },
        {
          id: 2,
          question: "Barış çalışmalarının gündemi 1970'lerde üç büyük yeni uluslararası meseleyi içerecek şekilde genişledi. Bu üç meseleyi listeleyin ve açıklayın.",
          answers: [
            {
              title: "Ekonomik Eşitsizlikler (Economic Inequalities)",
              content: "Eski sömürgelerin, siyasi bağımsızlık kazanmalarına rağmen ekonomik bağımsızlıklarını kazanamadıkları ve küresel eşitsizliğin büyük bir sorun olduğu farkındalığı."
            },
            {
              title: "Küresel Çevre Durumu (Global Environmental Situation)",
              content: "Küresel ekosistemin artan insan etkileriyle baş edemeyeceği ve dolayısıyla ekonomik büyümeye sınırlar koyduğu yönündeki yeni kaygı."
            },
            {
              title: "Adalet Arayışı ve Şiddetin Haklılığı (Quest for Justice and Justification of Violence)",
              content: "Vietnam Savaşı ve yapısal şiddet kavramının tetiklediği, adaletin peşinde şiddetin bazen haklı olup olamayacağı üzerine bir tartışma."
            }
          ]
        },
        {
          id: 3,
          question: "Johan Galtung, barış tanımını genişleten kilit bir kavram ortaya atmıştır. \"Yapısal şiddet\"i tanımlayın ve barış çalışmaları için temel çıkarımını açıklayın.",
          answers: [
            {
              title: "Yapısal Şiddet (Structural Violence)",
              content: "Doğrudan şiddetten değil, insanların temel ihtiyaçlarını karşılamasını engelleyen adaletsiz ekonomik ve sosyal yapılardan kaynaklanan zarar veya ölüm."
            },
            {
              title: "Çıkarım (Implication)",
              content: "Gerçek bir barış halinin sadece savaşın olmaması (negatif barış) değil, aynı zamanda yapısal şiddet ve sömürünün de olmaması (pozitif barış) gerektiği anlamına geliyordu."
            }
          ]
        },
        {
          id: 4,
          question: "Notlar, geleceği şekillendirmesi muhtemel olan üç ana çatışma eğilimini tanımlamaktadır. Bu üç eğilimi listeleyin ve kısaca tanımlayın.",
          answers: [
            {
              title: "Artan insan göçü (Increasing Human Migration)",
              content: "Ekonomik, sosyal ve çevresel baskılar nedeniyle göç olasılığının artması, potansiyel olarak alıcı bölgelerde kültürel çatışmalara yol açması."
            },
            {
              title: "Çevresel ve kaynak çatışmalarının tırmanması (Escalation of Environmental and Resource Conflicts)",
              content: "Gıda, tatlı su ve fosil yakıtlar gibi kaynaklar üzerindeki çatışmaların yerel, bölgesel ve küresel düzeylerde artma olasılığı."
            },
            {
              title: "Güçsüzlerin şiddetli tepkileri (Violent Reactions of the Powerless)",
              content: "Hem devletler içinde hem de ulusötesi hareketler aracılığıyla marjinalleşmiş nüfuslardan rekabetçi ve şiddetli tepkiler beklenmesi."
            }
          ]
        },
        {
          id: 5,
          question: "Gelecekteki küresel zorluklara yanıt olarak, notlar iki ana zıt seçeneği veya yolu sunmaktadır. Bu iki potansiyel yanıtı belirleyin ve açıklayın.",
          answers: [
            {
              title: "Sürdürülebilir Kalkınma İçin Tutarlı İşbirliği (Coherent Cooperation for Sustainable Development)",
              content: "Borç hafifletme, ticaret reformu ve kalkınma yardımı ile çatışma önleme ve çözüm programlarını içeren bir yol."
            },
            {
              title: "Statükoyu Korumak / \"Liddism\" (Maintaining Status Quo / \"Liddism\")",
              content: "İnsanlığın zengin kesimlerinin, parçalanmış bir dünyayı \"sınırlandırmak\" için gerektiğinde askeri güçle desteklenen ticaret ve finansal önlemler aracılığıyla ayrıcalıklı konumlarını sürdürdüğü bir yol."
            }
          ]
        }
      ]
    },
         {
       category: "CRITICAL SECURITY STUDIES",
       questions: [
         {
           id: 1,
           question: "1994 York Üniversitesi konferansı, geleneksel güvenlik çalışmalarına üç ana cepheden meydan okuyarak CSS için bir başlangıç gündemi belirlemiştir. Bu üç meydan okumayı listeleyin ve açıklayın.",
           answers: [
             {
               title: "Referans nesnesini sorgulamak (Questioning the Reference Object)",
               content: "Geleneksel olarak güvenliği sağlanacak tek nesne olarak devlete odaklanmayı sorgular, bunun yerine bireyleri veya toplulukları önerir."
             },
             {
               title: "Güvenliği askeri güvenlikten fazlası olarak görmek (Viewing Security as More than Military Security)",
               content: "Güvenlik kavramını askeri tehditlerin ötesine, ekonomik, çevresel ve toplumsal güvensizlikleri de içerecek şekilde genişletir."
             },
             {
               title: "Güvenliğin çalışma şeklini değiştirmek (Changing How Security Works)",
               content: "Geleneksel yaklaşımların sözde nesnelliğini reddeder, bilginin arkasındaki politikayı tanıyan post-pozitivist bir bilim anlayışını savunur."
             }
           ]
         },
         {
           id: 2,
           question: "Koruma Sorumluluğu (R2P) doktrini, üç spesifik sorumluluk üzerine inşa edilmiştir. Her birini adlandırın ve kısaca tanımlayın.",
           answers: [
             {
               title: "Önleme Sorumluluğu (Responsibility to Prevent)",
               content: "İç çatışmaların ve insan kaynaklı krizlerin köken nedenlerini ve doğrudan nedenlerini ortaya çıkmadan önce ele almak."
             },
             {
               title: "Tepki Verme Sorumluluğu (Responsibility to React)",
               content: "Zorlayıcı insani ihtiyaç durumlarına uygun önlemlerle yanıt vermek, bu önlemler yaptırımları veya aşırı durumlarda askeri müdahaleyi içerebilir."
             },
             {
               title: "Yeniden İnşa Sorumluluğu (Responsibility to Rebuild)",
               content: "Özellikle askeri müdahale sonrasında iyileşme, yeniden yapılanma ve uzlaşma için tam destek sağlamak."
             }
           ]
         },
         {
           id: 3,
           question: "Ken Booth'un Aberystwyth Okulu, güvenliğe dair eleştirel bir teoriyi üç temel soruya dayandırır. Bu üç temel soruyu listeleyin.",
           answers: [
             {
               title: "Soru 1 (Question 1)",
               content: "Gerçek olan nedir?"
             },
             {
               title: "Soru 2 (Question 2)", 
               content: "Bilgi nedir? / Ondan kim faydalanır?"
             },
             {
               title: "Soru 3 (Question 3)",
               content: "Ne yapılmalı?"
             }
           ]
         },
         {
           id: 4,
           question: "Kopenhag Okulu, iki temel kavramsal gelişme ile tanımlanır. Bu iki kavramı adlandırın ve \"güvenlikleştirme\" için kısa bir tanım yapın.",
           answers: [
             {
               title: "Güvenliğin sektörel analizi (Sectoral Analysis of Security)",
               content: "Güvenlik konularının askeri, ekonomik, çevresel, toplumsal ve siyasi sektörlere ayrılması yaklaşımı."
             },
             {
               title: "Güvenlikleştirme (Securitization)",
               content: "Bir meselenin, \"söz eylemi\" aracılığıyla, normal siyasetin dışına çıkan olağanüstü önlemleri haklı kılan varoluşsal bir tehdit olarak sunulduğu süreç."
             }
           ]
         }
       ]
     },
     {
       category: "POSTCOLONIALISM",
       questions: [
         {
           id: 1,
           question: "Postkolonyal analiz, sömürge projesinin merkezinde yer alan üç farklı şiddet biçimini tanımlar. Bu üç şiddet biçimini adlandırın ve kısaca tanımlayın.",
           answers: [
             {
               title: "Maddi şiddet (Material Violence)",
               content: "Avrupa sömürgeciliğinin Amerika, Afrika ve Asya'daki nüfuslara uyguladığı muazzam fiziksel şiddet."
             },
             {
               title: "Epistemik şiddet (Epistemic Violence)",
               content: "Avrupa bilgi sistemlerinin diğer halklara dayatılması, yerel bilgi edinme yollarının aktif olarak reddedilmesi, itibarsızlaştırılması veya yok edilmesi."
             },
             {
               title: "Yapısal şiddet (Structural Violence)",
               content: "Sömürge alanlarındaki günlük yaşamı ve onun yeniden üretimini tanımlayan, sömürü ve tahakkümün sistematik ilişkileri."
             }
           ]
         },
         {
           id: 2,
           question: "Edward Said'in \"Oryantalizm\"i, Batı'nın Doğu ve Batı'ya dair hiyerarşik bir temsilini nasıl inşa ettiğini açıklar. \"Doğu\"ya atfedilen üç özelliği ve \"Batı\"ya atfedilen üç karşıt özelliği listeleyin.",
           answers: [
             {
               title: "Doğu (East)",
               content: "Gizemli, duygusal, barbar olarak karakterize edilir."
             },
             {
               title: "Batı (West)",
               content: "Bilinen, akılcı, medeni olarak karakterize edilir."
             }
           ]
         },
         {
           id: 3,
           question: "Postkolonyalizmin eleştirdiği temel bir kavram \"Avrupamerkezcilik\"tir. Avrupamerkezci bir dünya görüşünün üç ana unsurunu tanımlayın.",
           answers: [
             {
               title: "Avrupa'nın ayrık ve kendi kendini üreten olması (Europe as Distinct and Self-generating)",
               content: "Avrupa'nın, dünyanın geri kalanından ayrı, kendi içinde oluşmuş farklı bir medeniyet olarak tasvir edilmesi."
             },
             {
               title: "Avrupa'nın tarihin merkezi olması (Europe as Center of History)",
               content: "Dünya tarihinin, geçmiş ve şimdi, Avrupa'nın deneysel ve normatif merkeziliği varsayımıyla analiz edilmesi."
             },
             {
               title: "Modernliğin Batı tarafından tanımlanması (Modernity Defined by the West)",
               content: "Gelişme ve modernleşmenin son noktasının çağdaş \"Batı\" tarafından tanımlandığı varsayımı."
             }
           ]
         }
       ]
     },
    {
      category: "CONSTRUCTIVISM",
      questions: [
        {
          id: 1,
          question: "Notlarda inşacılığın üç temel ontolojik pozisyona dayandığı belirtilmektedir. Bu üç pozisyonu adlandırın ve kısaca açıklayın.",
          answers: [
            {
              title: "Normatif veya düşünsel yapılar anahtardır (Normative or Ideational Structures are Key)",
              content: "Paylaşılan fikirlerin, inançların ve normların dünya siyasetini şekillendirmede maddi güçler kadar, hatta onlardan daha önemli olduğunu savunur."
            },
            {
              title: "Kimlikler önemlidir (Identities Matter)",
              content: "Bir aktörün kimliği çok önemlidir çünkü bu, onların çıkarlarını ve dolayısıyla uluslararası sistemdeki eylemlerini belirler."
            },
            {
              title: "Özneler ve yapılar karşılıklı olarak oluşur (Agents and Structures are Mutually Constitutive)",
              content: "Devletler (özneler) ve uluslararası sistem (yapı) birbirinden ayrı değildir; etkileşim yoluyla birbirlerini şekillendirir ve yaratırlar."
            }
          ]
        },
        {
          id: 2,
          question: "Alexander Wendt \"anarşi, devletlerin ondan ne yaptığıdır\" der ve üç farklı anarşi kültürü önerir. Bu üç kültürü listeleyin ve tanımlayın.",
          answers: [
            {
              title: "Hobbesçu (Hobbesian)",
              content: "Devletlerin birbirini düşman olarak gördüğü, güvenliğin sıfır toplamlı bir oyun olduğu ve hayatta kalmanın saf askeri güce bağlı olduğu bir kültür."
            },
            {
              title: "Lockeçu (Lockean)",
              content: "Devletlerin birbirini rakip olarak gördüğü; rekabet ettikleri ve şiddet kullandıkları, ancak birbirlerinin egemenliğini kabul ederek bazı sınırlamalarla hareket ettikleri bir kültür."
            },
            {
              title: "Kantçı (Kantian)",
              content: "Devletlerin birbirini dost olarak gördüğü, anlaşmazlıkları barışçıl bir şekilde çözdüğü ve kolektif güvenlik için işbirliği yaptığı bir kültür."
            }
          ]
        },
        {
          id: 3,
          question: "İnşacılık, aktör davranışını şekillendirmede normların önemini vurgular. Notlarda tartışılan iki ana norm türünü belirleyin ve tanımlayın.",
          answers: [
            {
              title: "Kurucu (Constitutive)",
              content: "Bir aktörün kimliğini tanımlayan, ne olduklarını ve çıkarlarının ne olacağını şekillendiren normlar (örneğin, devlet egemenliği normu)."
            },
            {
              title: "Düzenleyici (Regulative)",
              content: "Zaten var olan bir kimlik için davranışı belirleyen veya yasaklayan, aktörlerin ne \"yapması gerektiğini\" veya ne \"yapmaması gerektiğini\" belirleyen normlar (örneğin, nükleer tabu)."
            }
          ]
        },
        {
          id: 4,
          question: "İnşacılık düşünce okulu, metodolojilerine göre genel olarak iki ana kampa ayrılır. Bu iki kampı adlandırın ve temel farklarını açıklayın.",
          answers: [
            {
              title: "Konvansiyonel İnşacılık (Conventional Constructivism)",
              content: "Devleti merkezi bir aktör olarak kabul etmeye eğilimlidir ve pozitivist, bilimsel yöntemler kullanarak, rasyonel teorilerle bir \"köprü\" kurmaya çalışır."
            },
            {
              title: "Eleştirel İnşacılık (Critical Constructivism)",
              content: "Pozitivizmi reddeder ve gerçeği inşa etmede dilin ve söylemin gücüne odaklanır, varsayılan kimlikleri ve güç ilişkilerini yapıbozuma uğratmayı ve sorgulamayı amaçlar."
            }
          ]
        },
        {
          id: 5,
          question: "Wendt, bir anarşi kültüründen diğerine geçişin dört \"ana değişken\" tarafından yönlendirildiğini öne sürer. Bu dört değişkeni listeleyin ve kısaca tanımlayın.",
          answers: [
            {
              title: "Karşılıklı Bağımlılık (Interdependence)",
              content: "Devletlerin birbirine karşılıklı olarak bağımlı olma derecesi, çatışma maliyetlerini artırabilir."
            },
            {
              title: "Ortak Kader (Common Fate)",
              content: "Devletlerin ancak kolektif eylemle çözülebilecek ortak tehditlerle (çevresel felaket gibi) karşı karşıya olduğunu fark etmesi."
            },
            {
              title: "Homojenizasyon (Homogenization)",
              content: "Devletlerin siyasi ve sosyal yapılarında daha benzer hale gelme süreci, paylaşılan kimlik ve güveni teşvik edebilir."
            },
            {
              title: "Kendi Kendine Kısıtlama (Self-Restraint)",
              content: "Güçlü bir devletin kendi gücünü kasıtlı olarak sınırlaması eylemi, güven inşa edebilir ve diğerlerinden karşılıklı kısıtlamayı teşvik edebilir."
            }
                     ]
         }
       ]
     },
     {
       category: "HUMAN SECURITY",
       questions: [
         {
           id: 1,
           question: "1994 UNDP İnsani Gelişme Raporu, genellikle iki temel ilke ile özetlenen insan güvenliği kavramını ortaya atmıştır. Bu iki \"özgürlüğü\" adlandırın ve tanımlayın.",
           answers: [
             {
               title: "Yoksunluktan özgürlük (Freedom from Want)",
               content: "Yaşam kalitesini düşüren açlık, hastalık ve baskı gibi kronik tehditlerden güvenlik."
             },
             {
               title: "Korkudan özgürlük (Freedom from Fear)",
               content: "Şiddet veya çatışma gibi günlük yaşamın düzenindeki ani ve acı verici kesintilerden korunma."
             }
           ]
         },
         {
           id: 2,
           question: "1994 UNDP raporu, sürekli dikkat gerektiren yedi kritik güvenlik alanı önermiştir. Bu yedi alandan beş tanesini listeleyin ve kısaca tanımlayın.",
           answers: [
             {
               title: "Ekonomik güvenlik (Economic Security)",
               content: "Genellikle üretken ve kazançlı işlerden veya kamu tarafından finanse edilen bir güvenlik ağından sağlanan güvenceli temel gelir."
             },
             {
               title: "Gıda güvenliği (Food Security)",
               content: "Herkesin her zaman temel gıdaya hem fiziksel hem de ekonomik erişiminin sağlanması."
             },
             {
               title: "Sağlık güvenliği (Health Security)",
               content: "Hastalıklar ve sağlıksız yaşam tarzlarından minimum düzeyde korunmanın garantilenmesi."
             },
             {
               title: "Çevresel güvenlik (Environmental Security)",
               content: "İnsanları doğanın kısa ve uzun vadeli tahribatlarından, doğadaki insan yapımı tehditlerden ve doğal çevrenin bozulmasından korumak."
             },
             {
               title: "Kişisel güvenlik (Personal Security)",
               content: "İnsanları, devletten veya dış devletlerden, şiddet yanlısı bireylerden ve devlet altı aktörlerden veya aile içi şiddetten kaynaklanan fiziksel şiddetten korumak."
             }
           ]
         },
         {
           id: 3,
           question: "1994 İnsani Gelişme Raporu, insan güvenliği kavramının dört ana özelliğini detaylandırmıştır. Bu dört özelliği adlandırın ve açıklayın.",
           answers: [
             {
               title: "Evrensel (Universal)",
               content: "Zengin ve yoksul tüm uluslardaki insanlar için geçerlidir, çünkü ilkeleri kültürler ve sistemler arası değere sahiptir."
             },
             {
               title: "Karşılıklı Bağımlı (Interdependent)",
               content: "İnsan güvenliğinin farklı yönleri birbiriyle bağlantılıdır, yani bir alandaki tehditler diğer alanlara yayılabilir ve güvenliği etkileyebilir."
             },
             {
               title: "Önleme Odağı (Prevention-Focused)",
               content: "Tehditleri ortaya çıktıktan sonra müdahale etmekten daha kolay ve daha az maliyetlidir."
             },
             {
               title: "İnsan Odaklı (People-Centered)",
               content: "Güvenliğin birincil referans nesnesi olarak devleti değil, insanları ve onların topluluklarını yapar."
             }
           ]
         }
       ]
     },
     {
       category: "ENVIRONMENTAL SECURITY",
       questions: [
         {
           id: 1,
           question: "Notlarda çevresel güvenliğin 1960'larda başlayan birbiriyle ilişkili dört gelişme nedeniyle önemli bir kavram olarak ortaya çıktığı belirtilmektedir. Bu gelişmelerden üçünü listeleyin ve kısaca tanımlayın.",
           answers: [
             {
               title: "Çevresel farkındalığın artması (Increased Environmental Awareness)",
               content: "\"Sessiz Bahar\" gibi kitapların ve çevresel STK'ların yükselişinin tetiklediği, çevresel konular hakkında kamu bilincinde bir artış."
             },
             {
               title: "Geleneksel güvenlik söyleminin eleştirileri (Critiques of Traditional Security Discourse)",
               content: "Akademisyenlerin güvenlik çalışmalarının dar askeri odağını sorgulamaya başlaması, çevresel risklerin de ulusal refahı tehdit ettiğini savunmaları."
             },
             {
               title: "Stratejik koşullardaki değişiklikler (Changes in Strategic Conditions)",
               content: "Soğuk Savaş'ın sona ermesi, çevre gibi \"yeni\" güvenlik konularının ana akım gündeme girmesi için entelektüel ve siyasi bir alan yarattı."
             }
           ]
         },
         {
           id: 2,
           question: "Çevresel güvenlik literatürü en az altı ana yorum içerir. Bu yorumlardan üçü için yaklaşımı, \"güvence altına alınacak varlığı\" ve \"başlıca risk kaynağını\" belirtin.",
           answers: [
             {
               title: "Ekolojik güvenlik (Ecological Security)",
               content: "Güvence Altına Alınacak Varlık: Doğal çevre, Başlıca Risk Kaynağı: İnsan faaliyetleri"
             },
             {
               title: "Çevresel şiddet (Environmental Violence)",
               content: "Güvence Altına Alınacak Varlık: Ulus-devlet, Başlıca Risk Kaynağı: Savaş"
             },
             {
               title: "İnsani güvenlik (Human Security)",
               content: "Güvence Altına Alınacak Varlık: Bireyler, Başlıca Risk Kaynağı: Çevresel değişim"
             }
           ]
         }
       ]
     },
     {
       category: "TERRORISM",
       questions: [
         {
           id: 1,
           question: "Notlar, terörizmin incelenebileceği üç farklı bakış açısı sunmaktadır. Bu üç bakış açısını adlandırın ve kısaca tanımlayın.",
           answers: [
             {
               title: "Savaş olarak terörizm (Terrorism as War)",
               content: "Terörizmi askeri yöntemlerle çözülmesi gereken bir sorun olarak görür, zaferin elde edilebileceğini varsayar."
             },
             {
               title: "Suç olarak terörizm (Terrorism as Crime)",
               content: "Terörizmi yönetmek için normal polis tekniklerine güvenir, diğer suçlar gibi sadece sınırlandırılabileceğini, ortadan kaldırılamayacağını ima eder."
             },
             {
               title: "Hastalık olarak terörizm (Terrorism as Disease)",
               content: "Hem semptomlara hem de köken nedenlerine odaklanır, kök sorunları ele almak için uzun vadeli stratejilere ihtiyaç olduğunu varsayar."
             }
           ]
         },
         {
           id: 2,
           question: "Terörizmin işlevsel bir tanımı altı temel unsur içerir. Bu unsurlardan dördünü adlandırın ve tanımlayın.",
           answers: [
             {
               title: "Şiddet kullanımı veya tehdidi (Use or Threat of Violence)",
               content: "Taktik, temelde fiziksel zarar vermeyi veya bunun korkusunu yaratmayı içerir."
             },
             {
               title: "Organize bir grup tarafından gerçekleştirilir (Carried out by an Organized Group)",
               content: "Eylem rastgele veya tek bir kişi tarafından değil, belirli bir yapıya sahip bir grup tarafından işlenir."
             },
             {
               title: "Siyasi hedeflere ulaşma amacı (Aimed at Achieving Political Goals)",
               content: "Şiddet kişisel maddi kazanç için değil, siyasi bir hedefi başarmak için tasarlanmıştır."
             },
             {
               title: "Hedef bir kitleye yöneliktir (Directed at a Target Audience)",
               content: "Şiddet, doğrudan kurbanların ötesinde daha geniş bir kitleye korku yaratmayı ve mesaj göndermeyi amaçlar."
             }
           ]
         }
       ]
     },
     {
       category: "GENDER AND SECURITY",
       questions: [
         {
           id: 1,
           question: "Notlar, toplumsal cinsiyet ve güvenlik arasındaki ilişkiyi analiz etmek için iki ana bakış açısı sunmaktadır. Bu iki yönü adlandırın ve kısaca tanımlayın.",
           answers: [
             {
               title: "Pratik yönler (Practical Aspects)",
               content: "Kadınların ordudaki somut rollerini veya askeri çatışmanın kurbanları, gözlemcileri veya kolaylaştırıcıları olarak deneyimlerini içerir."
             },
             {
               title: "Söylemsel yönler (Discursive Aspects)",
               content: "Erkeklikle militarizm ve kadınlıkla besleme ve barış fikri arasında kurulan geleneksel bağlantıları içerir."
             }
           ]
         },
         {
           id: 2,
           question: "Jean Elshtain'in çalışmaları, savaşın cinsiyetlendirilmiş inşasında temel bir ikiliği tanımlar. Onun tanımladığı iki arketipik rolü adlandırın ve tanımlayın.",
           answers: [
             {
               title: "Adil Savaşçı (Just Warrior)",
               content: "Bir savaşçı olması beklenen, fiziksel güç ve cesaret gibi erkeksi değerlerle ilişkilendirilen ve görevi savaşmak olan erkek arketipi."
             },
             {
               title: "Güzel Ruh (Beautiful Soul)",
               content: "Ev cephesi ve besleme ile ilişkilendirilen ve erkek savaşçıdan korunmaya ihtiyacı olan, muharip olmayan olması beklenen kadın arketipi."
             }
           ]
         }
       ]
     },
     {
       category: "SECURITIZATION APPROACH",
       questions: [
         {
           id: 1,
           question: "Kopenhag Okulu, beş genel güvenlik sektörü veya kategorisi belirleyerek güvenlik gündemini genişletir. Bu beş sektörü listeleyin.",
           answers: [
             {
               title: "Askeri güvenlik (Military Security)",
               content: "Geleneksel askeri tehditler ve savunma konuları."
             },
             {
               title: "Çevresel güvenlik (Environmental Security)",
               content: "Çevresel tehditler ve ekolojik güvenlik meseleleri."
             },
             {
               title: "Ekonomik güvenlik (Economic Security)",
               content: "Ekonomik istikrar ve refah tehditleri."
             },
             {
               title: "Toplumsal güvenlik (Societal Security)",
               content: "Kimlik, kültür ve toplumsal bütünlük tehditleri."
             },
             {
               title: "Siyasi güvenlik (Political Security)",
               content: "Siyasi sistem ve meşruiyet tehditleri."
             }
           ]
         },
         {
           id: 2,
           question: "Güvenlikleştirme modeli, herhangi bir kamusal konunun üç aşamadan oluşan bir yelpazede var olabileceğini öne sürer. Bu üç aşamayı adlandırın ve tanımlayın.",
           answers: [
             {
               title: "Siyasallaşmamış (Non-politicized)",
               content: "Konunun devlet eylemi için bir mesele olmadığı ve kamu tartışmalarına dahil edilmediği; özel alanda kaldığı aşama."
             },
             {
               title: "Siyasallaşmış (Politicized)",
               content: "Konunun kamu politikasının bir parçası olduğu, hükümet kararı ve kaynak tahsisi gerektirdiği ve standart siyasi sistem içinde yönetildiği aşama."
             },
             {
               title: "Güvenlikleştirilmiş (Securitized)",
               content: "Konunun, normal siyasi prosedürlerin ötesinde olağanüstü eylemler gerektiren varoluşsal bir tehdit olarak çerçevelendiği aşama."
             }
           ]
         }
       ]
     },
     {
       category: "ECONOMIC SECURITY",
       questions: [
         {
           id: 1,
           question: "Notlarda ekonomik yaptırımların en az üç farklı amaç için kullanılabileceği belirtilmektedir. Bu üç amacı adlandırın ve kısaca tanımlayın.",
           answers: [
             {
               title: "Politik (Political)",
               content: "Bir hedefin davranışını etkileyerek barış ve özgürlük gibi hedefleri ilerletmek için ekonomik gücü kullanmak."
             },
             {
               title: "Ahlaki (Moral)",
               content: "Ahlaki olarak kötü veya kınanması gereken eylemlerde ekonomik katılımı reddetmek."
             },
             {
               title: "Askeri (Military)",
               content: "Tehlikeli rejimleri izole etmek ve bölgesel ve küresel güvenliğe yönelik tehditleri zayıflatmak."
             }
           ]
         }
       ]
     },
     {
       category: "INTERNATIONAL CRISIS",
       questions: [
         {
           id: 1,
           question: "Notlar, bir dış politika krizini tanımlayan beş gerekli koşulu listelemektedir. Bu koşullardan dördünü adlandırın ve kısaca tanımlayın.",
           answers: [
             {
               title: "Sürpriz Unsuru (Element of Surprise)",
               content: "Durum genellikle aniden ortaya çıkar ve karar vericiler tarafından beklenmez."
             },
             {
               title: "Yüksek değerli çıkarlara yönelik tehdit (Threat to High-Value Interests)",
               content: "Kriz, devletin bir veya daha fazla temel değerine veya yüksek öncelikli çıkarına yönelik bir tehdit oluşturur."
             },
             {
               title: "Zaman Baskısı (Time Pressure)",
               content: "Kararların ve eylemlerin sınırlı veya kısa bir süre içinde alınması gerektiği algısı vardır."
             },
             {
               title: "Daha yüksek askeri çatışma olasılığı (Higher Probability of Military Conflict)",
               content: "Askeri düşmanlıkların veya silahlı çatışmanın normal koşullara göre daha yüksek olduğu algısı."
             }
           ]
         }
       ]
     },
     {
       category: "NUCLEAR SECURITY",
       questions: [
         {
           id: 1,
           question: "Notlar, \"Devletler neden nükleer silahlara sahip olmak ister?\" sorusunu cevaplamak için dört ana yaklaşım olduğunu açıklamaktadır. Bu dört yaklaşımı adlandırın.",
           answers: [
             {
               title: "Güvenlik Yaklaşımı (Security Approach)",
               content: "Devletlerin güvenlik tehditlerine karşı nükleer silahları caydırıcı olarak görmesi."
             },
             {
               title: "Kişisel-Kurumsal Rekabet Yaklaşımı (Personal-Institutional Competition Approach)",
               content: "İç politik grupların kendi çıkarları için nükleerleşmeyi desteklemesi."
             },
             {
               title: "Sosyo-Psikolojik Yaklaşım (Socio-Psychological Approach)",
               content: "Prestij, statü ve ulusal kimlik gibi faktörlerin nükleer silah arayışını etkilemesi."
             },
             {
               title: "Normatif Yaklaşım (Normative Approach)",
               content: "Uluslararası normlar ve değerlerin nükleer silah politikalarını şekillendirmesi."
             }
           ]
         }
       ]
     },
     {
       category: "ETHNIC CONFLICT",
       questions: [
         {
           id: 1,
           question: "Notlar, etnik kimliğin kaynağını açıklamak için üç farklı teorik yaklaşım sunmaktadır. Bu üç yaklaşımı adlandırın ve kısaca tanımlayın.",
           answers: [
             {
               title: "Primordialist Yaklaşım (Primordialist Approach)",
               content: "Bu yaklaşım, etnik kimliği akrabalık, dil veya din gibi değişmez özelliklere dayalı, sabit, doğal ve tarihsel olarak eski olarak görür."
             },
             {
               title: "Modernist Yaklaşım (Modernist Approach)",
               content: "Bu yaklaşım, etnik ve ulusal kimliklerin sanayileşme ve devlet inşası gibi süreçler nedeniyle modern çağda ortaya çıkan yeni olgular olduğunu savunur."
             },
             {
               title: "İnşacı Yaklaşım (Constructivist Approach)",
               content: "Bu yaklaşım, etnik kimliklerin bireylerin ve grupların siyasi, sosyal ve psikolojik ihtiyaçlarını karşılamak için etkileşim yoluyla sosyal olarak nasıl inşa edildiğine odaklanır."
             }
           ]
         }
       ]
     },
     {
       category: "HEALTH SECURITY",
       questions: [
         {
           id: 1,
           question: "Notlar, sağlık ve güvenlik arasındaki bağlantının üç farklı güvenlik çerçevesi aracılığıyla anlaşılabileceğini açıklamaktadır. Bu üç çerçeveyi adlandırın ve kısaca tanımlayın.",
           answers: [
             {
               title: "İnsan güvenliği çerçevesi (Human Security Framework)",
               content: "Sıradan bireylerin sağlığına ve esenliğine odaklanır, iyi sağlığı güvenliğin hem esas hem de aracı olarak görür."
             },
             {
               title: "Ulusal güvenlik çerçevesi (National Security Framework)",
               content: "Yaygın bulaşıcı hastalıkları bir devletin nüfusuna, ekonomisine ve siyasi istikrarına yönelik tehditler olarak görür."
             },
             {
               title: "Biyogüvenlik çerçevesi (Biosecurity Framework)",
               content: "Terörist grupların veya diğer aktörlerin kasten hastalığa neden olan biyolojik ajanları salma olasılığıyla ilgilenir."
             }
           ]
         }
       ]
     },
     {
       category: "CYBER SECURITY",
       questions: [
         {
           id: 1,
           question: "Notlar, siber güvenlik hikayesinin birbiriyle bağlantılı ancak farklı üç söylem aracılığıyla anlatılabileceğini belirtmektedir. Bu üç söylemi adlandırın ve kısaca tanımlayın.",
           answers: [
             {
               title: "Teknik Söylem (Technical Discourse)",
               content: "Bu söylem, virüsler ve solucanlar gibi kötü amaçlı yazılımların neden olduğu bilgisayar ve ağ kesintilerine odaklanır."
             },
             {
               title: "Siber Suç ve Siber Casusluk Söylemi (Cybercrime and Cyber Espionage Discourse)",
               content: "Bu söylem, kişisel kazanç için hackleme ve devlet destekli casusluk dahil olmak üzere bilgisayarların ve ağların suç faaliyetleri için kullanımını ele alır."
             },
             {
               title: "Siber Çatışmalar / Askeri-Sivil Savunma Söylemi (Cyber Conflicts / Military-Civil Defense Discourse)",
               content: "Bu söylem, siber güvenliği ulusal güvenlik açısından ele alır, bilgi savaşı, siber savaş ve kritik ulusal altyapının korunmasına odaklanır."
             }
           ]
         }
       ]
     }
   ];



  if (selectedCategory && selectedQuestion !== null) {
    const category = examQuestions.find(cat => cat.category === selectedCategory);
    const question = category?.questions[selectedQuestion];
    
    if (question) {
      return (
        <div className="exam-question-detail">
          <button 
            onClick={() => setSelectedQuestion(null)}
            className="back-button"
          >
            ← {selectedCategory} Sorularına Dön
          </button>
          
          <div className="question-container">
            <h3>Soru {question.id}</h3>
            <p className="question-text">{question.question}</p>
            
            <div className="answers-list">
              {question.answers.map((answer, index) => (
                <div key={index} className="answer-item">
                  <h4>{answer.title}</h4>
                  <p>{answer.content}</p>
                </div>
              ))}
            </div>
          </div>
          
          <Link to="/" className="home-button">Ana Sayfaya Dön</Link>
        </div>
      );
    }
  }

  if (selectedCategory) {
    const category = examQuestions.find(cat => cat.category === selectedCategory);
    
    return (
      <div className="exam-category-detail">
        <button 
          onClick={() => setSelectedCategory(null)}
          className="back-button"
        >
          ← Tüm Kategorilere Dön
        </button>
        
        <h2>{selectedCategory} - Sınav Soruları</h2>
        <p className="section-description">Aşkım, bu bölümde {selectedCategory.toLowerCase()} konusundaki detaylı sınav sorularını bulabilirsin 💝</p>
        
        <div className="questions-grid">
          {category?.questions.map((question, index) => (
            <div 
              key={question.id} 
              className="question-card"
              onClick={() => setSelectedQuestion(index)}
            >
              <h3>Soru {question.id}</h3>
              <p>{question.question.substring(0, 120)}...</p>
              <div className="question-meta">
                <span className="answer-count">{question.answers.length} Cevap</span>
                <span className="view-question">Görüntüle →</span>
              </div>
            </div>
          ))}
        </div>
        
        <Link to="/" className="home-button">Ana Sayfaya Dön</Link>
      </div>
    );
  }

  return (
    <div className="exam-questions-container">
      <h2>International Security - Sınav Soruları</h2>
      <p className="section-description">
        Canım, burada International Security dersinin kapsamlı sınav sorularını kategori kategori bulabilirsin. 
        Her kategori, teorilerin derinlemesine anlaşılması için detaylı sorular ve cevaplar içeriyor 📚💝
      </p>
      
      <div className="categories-grid">
        {examQuestions.map((category) => (
          <div 
            key={category.category} 
            className="category-card"
            onClick={() => setSelectedCategory(category.category)}
          >
            <h3>{category.category}</h3>
            <div className="category-meta">
              <span className="question-count">{category.questions.length} Soru</span>
              <span className="view-category">Kategoriye Gir →</span>
            </div>
          </div>
        ))}
      </div>
      
      <Link to="/" className="home-button">Ana Sayfaya Dön</Link>
    </div>
  );
}



function InternationalSecurityMemoryGame() {
  // InternationalSecurityExamQuestions'dan tüm sınav sorularını kullan - TÜM KATEGORİLER
  const [isMixedMode, setIsMixedMode] = useState(false);
  const [mixedQuestions, setMixedQuestions] = useState<any[]>([]);
  const [currentMixedIndex, setCurrentMixedIndex] = useState(0);
  const [mixedResults, setMixedResults] = useState<any[]>([]);
  const [showMixedResults, setShowMixedResults] = useState(false);
  const [mixedScore, setMixedScore] = useState(0);

  const examQuestions = [
    {
      category: "REALISM",
      questions: [
        {
          id: 1,
          question: "Realist aile içindeki çoğu teori bazı temel varsayımları paylaşır. Bu temel özelliklerden beş tanesini listeleyin ve kısaca açıklayın.",
          answers: [
            {
              title: "Anarşik uluslararası sistem (Anarchic International System)",
              content: "Devletleri koruyacak ve kuralları uygulayacak merkezi bir dünya hükümetinin veya otoritenin olmaması, onları kendi kendine yardım durumuna zorlar."
            },
            {
              title: "Devlet merkezcilik (State-centrism)",
              content: "Devletlerin, uluslararası siyasetteki en önemli ve birincil aktörler olduğu, kurumların ve diğer aktörlerin ise ikincil olduğu görüşü."
            },
            {
              title: "Güç (Power)",
              content: "Hedeflere ulaşmak ve hayatta kalmayı sağlamak için gereken maddi kaynaklar (zenginlik, ordu, nüfus) olarak anlaşılan, uluslararası ortamın belirleyici özelliği."
            },
            {
              title: "Tekil aktör varsayımı (Unitary Actor Assumption)",
              content: "Analiz için iç siyasi bölünmeleri göz ardı ederek, devletlerin tek ve tutarlı karar alma birimleri olarak ele alınabileceği varsayımı."
            },
            {
              title: "Rasyonel aktör varsayımı (Rational Actor Assumption)",
              content: "Devletlerin stratejik davrandığı ve başta güvenlik ve hayatta kalma olmak üzere ulusal çıkarlarını maksimize etmek için hesaplanmış kararlar aldığı inancı."
            }
          ]
        },
        {
          id: 2,
          question: "Hayatta kalmayı sağlamak için Neorealizm, devletlerin tehditlere karşı iki ana dengeleme stratejisi kullandığını savunur. Bunları adlandırın ve tanımlayın.",
          answers: [
            {
              title: "İçsel dengeleme (Internal Balancing)",
              content: "Bir devletin potansiyel bir rakibe tek başına karşı koymak için kendi askeri yeteneklerini ve ekonomik gücünü artırması."
            },
            {
              title: "Dışsal dengeleme (External Balancing)",
              content: "Bir devletin, daha güçlü ve tehditkar bir devlete karşı güçlerini ve yeteneklerini birleştirmek için diğer devletlerle ittifaklar kurması."
            }
          ]
        },
        {
          id: 3,
          question: "Yapısal Realizm içinde, devletlerin güvenliği nasıl araması gerektiği konusunda temel bir tartışma vardır. İki karşıt teoriyi adlandırın ve devletler için temel tavsiyelerini açıklayın.",
          answers: [
            {
              title: "Saldırgan Realizm (Offensive Realism)",
              content: "Devletler, hayatta kalmayı sağlamanın en iyi yolu en güçlü devlet olmak olduğu için, her zaman güçlerini maksimize etmeye ve hegemonya kurmaya çalışmalıdır."
            },
            {
              title: "Savunmacı Realizm (Defensive Realism)",
              content: "Devletler gücü maksimize etmek yerine uygun bir güç seviyesi aramalıdır, çünkü çok fazla güç elde etmek korku yaratarak diğer devletlerin kendilerine karşı dengeleme yapmasına neden olabilir."
            }
          ]
        },
        {
          id: 4,
          question: "Savunmacı Realizm, bir devletin kendi güvenliğini artırma çabasının ters tepebileceğini savunur. Bu durum, rakibin güvensizliğini artıran üç ana mekanizma aracılığıyla gerçekleşir. Bu mekanizmaları listeleyin ve açıklayın.",
          answers: [
            {
              title: "Silahlanma yarışı (Arms Race)",
              content: "Bir devlet ordusunu güçlendirdiğinde, rakip de kendi ordusunu güçlendirerek karşılık verir ve bu durum her iki taraf için de güvenliği azaltabilecek bir rekabet döngüsüne yol açar."
            },
            {
              title: "Riskli askeri politikalar (Risky Military Policies)",
              content: "Güvensiz bir rakip, kriz ve kazaen savaş olasılığını artıran saldırgan askeri duruşlar veya ilk vuruş politikaları benimseyebilir."
            },
            {
              title: "Siyasi ilişkilerin bozulması (Political Relations Deterioration)",
              content: "Bir devletin askeri yığınağı, rakip tarafından düşmanca niyetlerin kanıtı olarak görülebilir ve bu da diplomasiyi zehirleyen bir güvensizlik sarmalına yol açar."
            }
          ]
        },
        {
          id: 5,
          question: "Anarşi nedeniyle Neorealistler, devletlerin işbirliğinden elde edilen kazanımların nasıl dağıtıldığı konusunda endişeli olduğunu savunur. Devletlerin dikkate aldığı iki 'kazanım' türünü belirleyerek ve tanımlayarak bunu açıklayın.",
          answers: [
            {
              title: "Mutlak kazançlar (Absolute Gains)",
              content: "Bir devletin işbirliğinden elde ettiği toplam faydalar; diğer devletlerin elde ettiği faydalarla karşılaştırılmadan, bağımsız olarak ölçülür."
            },
            {
              title: "Göreli kazançlar (Relative Gains)",
              content: "Bir devletin, bir rakibin işbirliğinden daha fazla kazanarak gücünü artırması ve gelecekte daha büyük bir tehdit oluşturması endişesi."
            }
          ]
        }
      ]
    },
    {
      category: "LIBERALISM",
      questions: [
        {
          id: 1,
          question: "Liberalizm, kendisini Realizmden ayıran birkaç belirgin özellikle karakterize edilir. Liberalist yaklaşımın dört temel özelliğini listeleyin ve kısaca açıklayın.",
          answers: [
            {
              title: "Temelde iyimser (Fundamentally Optimistic)",
              content: "Uluslararası işbirliği ve barışçıl bir dünyanın mümkün olduğuna ve çatışmanın uluslararası politikanın doğasında olmadığını savunur."
            },
            {
              title: "İçten dışa yaklaşım (Inside-out Approach)",
              content: "Devletlerin iç özellikleri (örneğin, siyasi sistem, toplumsal tercihler) dış politika davranışlarının temel belirleyicisi olduğunu savunur."
            },
            {
              title: "Çeşitli aktörlere odaklanma (Focus on Diverse Actors)",
              content: "Devletler önemli olmakla birlikte, Uluslararası Hükümetler Arası Kuruluşlar (IGO'lar), Sivil Toplum Kuruluşları (STK'lar) ve çok uluslu şirketler gibi devlet dışı aktörlerin önemli rolünü vurgular."
            },
            {
              title: "Devletlerin tekil aktör olmaması (States Not as Unitary Actors)",
              content: "Devlet eylemlerini, çeşitli iç gruplar, partiler ve bürokrasiler arasındaki rekabet ve uzlaşmanın sonucu olarak görür, tek bir ses olarak değil."
            }
          ]
        },
        {
          id: 2,
          question: "Neoliberal Kurumsalcılık, uluslararası kurumların anarşi altında bile devletlerin işbirliği yapmasına nasıl yardımcı olduğunu açıklar. Bu kurumların yerine getirdiği dört temel işlevi listeleyin ve kısaca açıklayın.",
          answers: [
            {
              title: "Güvenilir bilgi sağlama (Providing Reliable Information)",
              content: "Güvenilir bilgi üretir ve yayar, bu da devletler arasındaki belirsizliği ve güvensizliği azaltır."
            },
            {
              title: "İşlem maliyetlerini azaltma (Reducing Transaction Costs)",
              content: "Devletlerin düzenli olarak müzakere yapmasını, anlaşmalar yapmasını ve etkileşim kurmasını kolaylaştırır ve daha az maliyetli hale getirir."
            },
            {
              title: "Uyumu denetleme (Monitoring Compliance)",
              content: "Devletlerin taahhütlerine uyup uymadığını denetlemek için mekanizmalar sağlar, bu da hile yapmayı ve bedavacılığı engeller."
            },
            {
              title: "Geleceğe gölge düşürme (Shadow of the Future)",
              content: "İşbirliğini kurumsallaştırarak, devletlerin tekrarlayan etkileşimler beklemesini sağlar, iyi bir itibarın ve gelecekteki işbirliğinin değerini artırır."
            }
          ]
        },
        {
          id: 3,
          question: "Demokratik Barış Teorisi, demokrasilerin birbirleriyle savaşmadığını gözlemler. Bu demokratik barışa neden olduğuna inanılan dört faktörü veya normu listeleyin ve açıklayın.",
          answers: [
            {
              title: "Meşruiyet, saygı ve güven (Legitimacy, Respect and Trust)",
              content: "Demokrasiler, diğer demokratik hükümetleri meşru ve güvene değer görür, ortak bir siyasi-ahlaki temeli paylaşırlar."
            },
            {
              title: "Hesap verebilirlik (Accountability)",
              content: "Demokrasilerdeki liderler, savaşın maliyetlerini taşıyan ve genellikle savaşa karşı çıkan vatandaşlarına karşı hesap verebilir konumdadır, bu da çatışma başlatmayı zorlaştırır."
            },
            {
              title: "Hükümete sınırlamalar (Constraints on Government)",
              content: "Demokratik sistemlerde, savaşa gitme kararını yavaşlatan ve diplomasiye zaman tanıyan denge ve denetleme mekanizmaları (anayasalar, kuvvetler ayrılığı) bulunur."
            },
            {
              title: "Sorunları uzlaşıyla çözme (Solving Problems through Compromise)",
              content: "Demokrasiler, şiddet içermeyen çatışma çözümü ve uzlaşma normları üzerine kuruludur ve bu normları birbirleriyle olan uluslararası ilişkilerinde de uygulamaya eğilimlidirler."
            }
          ]
        },
        {
          id: 4,
          question: "Ticari Liberalizm, en eski liberal düşünce okullarından biridir. Bu yaklaşımın üç merkezi fikrini veya mekanizmasını adlandırın ve tanımlayın.",
          answers: [
            {
              title: "Ekonomik Karşılıklı Bağımlılık (Economic Interdependence)",
              content: "Ülkeler arasındaki kapsamlı ticaret ve yatırımın, savaşı refahları için çok maliyetli ve yıkıcı bir seçenek haline getirdiğini savunur."
            },
            {
              title: "Serbest Teşebbüs / Piyasa Ekonomisi (Free Enterprise / Market Economy)",
              content: "Ekonomik faaliyetin devlet kontrolü yerine piyasa güçleri tarafından yönlendirildiğinde zenginliğin en verimli şekilde üretildiğini varsayar."
            },
            {
              title: "Küreselleşme (Globalization)",
              content: "Malların, sermayenin ve fikirlerin sınırlar arası artan akışının ulusal ayrımları aşındırdığına ve tek bir küresel topluluk hissini teşvik ettiğine inanır."
            }
          ]
        },
        {
          id: 5,
          question: "İyimserliğine rağmen Liberalizm birkaç büyük eleştiriyle karşı karşıyadır. Liberalist uluslararası ilişkiler yaklaşımına yöneltilen üç önemli eleştiriyi listeleyin ve açıklayın.",
          answers: [
            {
              title: "Batı emperyalizmi (Western Imperialism)",
              content: "Liberal değerlerin (demokrasi, piyasa ekonomileri) teşvikinin, genellikle Batı çıkarlarını ilerletmek ve Batı egemenliğini sürdürmek için bir kılıf olduğunu savunur."
            },
            {
              title: "İç tutarsızlıklar (Internal Inconsistencies)",
              content: "Liberalizmin, örneğin istikrar için otokrasilerle ilişki kurmak veya insan hakları ihlalleri nedeniyle onları izole etmek gibi çelişkili tavsiyeler sunduğunu belirtir."
            },
            {
              title: "Teorik zayıflık (Theoretical Weakness)",
              content: "Demokratik barış gibi bazı temel liberal bulguların, gerçek bir nedensel ilişkiden ziyade yanıltıcı bir korelasyona dayanabileceğini iddia eder."
            }
          ]
        }
      ]
    },
    {
      category: "HISTORICAL MATERIALISM",
      questions: [
        {
          id: 1,
          question: "Notlarda Tarihsel Materyalizmin üç boyutu olduğu belirtilmektedir. Her birini adlandırın ve kısaca açıklayın.",
          answers: [
            {
              title: "Sosyal bilimsel (Social Scientific)",
              content: "Üretim biçimlerinin (kapitalizm gibi) sınıf yapılarını nasıl yarattığını ve bu sınıflar arasındaki çatışmanın tarihsel değişimi nasıl yönlendirdiğini analiz eder."
            },
            {
              title: "Felsefi (Philosophical)",
              content: "Üretken sistemlerin ve güç eşitsizliklerinin baskın fikirleri ve söylemleri nasıl şekillendirdiğini inceleyerek, sosyal gerçekliği anlamak için sistematik bir yol sunar."
            },
            {
              title: "Politik (Political)",
              content: "Kapitalizmin içsel sömürü ve yabancılaşmasını eleştiren siyasi hareketlerle (küresel adalet ve küreselleşme karşıtlığı gibi) ilişkilidir."
            }
          ]
        },
        {
          id: 2,
          question: "HM'nin kapitalizm eleştirisi, işçinin deneyimini tanımlayan iki kavrama dayanır. \"Sömürü\" ve \"Yabancılaşma\" kavramlarını tanımlayın.",
          answers: [
            {
              title: "Sömürü (Exploitation)",
              content: "İşçilere, emeklerinin yarattığı gerçek değerden daha düşük bir ücret ödenen ve kapitalistin geri kalanını kâr olarak (artı değer) kendine mal ettiği bir süreç."
            },
            {
              title: "Yabancılaşma (Alienation)",
              content: "İşçilerin kendi emekleri ve yarattıkları ürünler üzerindeki kontrol eksikliği nedeniyle yaşadıkları güçsüzlük ve ayrılık hissi."
            }
          ]
        },
        {
          id: 3,
          question: "Notlar kapitalizmi iki çelişkili yüze sahip olarak tanımlar. Onun \"ilerici\" ve \"gerici\" yönlerini açıklayın.",
          answers: [
            {
              title: "İlerici Yön (Progressive Aspect)",
              content: "Kapitalizm, insan yaratıcı kapasitelerini harekete geçirme, üretici güçleri geliştirme ve muazzam zenginlik ve teknoloji üretme konusundaki benzersiz yeteneğiyle ilerici bir nitelik taşır."
            },
            {
              title: "Gerici Yön (Regressive Aspect)",
              content: "Kapitalizm, sömürü ve yabancılaşma süreçleri aracılığıyla aynı anda büyük eşitsizlik, yoksulluk ve işçi sınıfı için güvensizlik yarattığı için gericidir."
            }
          ]
        },
        {
          id: 4,
          question: "Barış Çalışmaları ve Tarihsel Materyalizm, dolaylı zararı anlamak için ortak bir kavramı paylaşır. \"Yapısal Şiddet\"i tanımlayın ve HM'nin bunu kapitalizme nasıl bağladığını açıklayın.",
          answers: [
            {
              title: "Yapısal Şiddet (Structural Violence)",
              content: "Doğrudan güç kullanımıyla değil, bir toplumun yapısının neden olduğu (örneğin yoksulluk veya önlenebilir hastalıklardan kaynaklanan ölümler) önlenebilir acı ve ölüm."
            },
            {
              title: "HM'nin Kapitalizme Bağlantısı (HM's Connection to Capitalism)",
              content: "Tarihsel Materyalizm, kapitalizmin neden içsel olarak yapısal şiddet barındırdığına dair bir teori sunar, çünkü sistemin sömürü yoluyla kâr yaratma ihtiyacı kaçınılmaz olarak eşitsizlik ve yoksunluk üretir."
            }
          ]
        },
        {
          id: 5,
          question: "HM, Realizmde anlaşıldığı şekliyle \"ulusal çıkara\" ve Liberalizmde anlaşıldığı şekliyle \"özgürlük\" kavramına özel bir eleştiri getirir. Bu iki eleştiriyi açıklayın.",
          answers: [
            {
              title: "Realizm'in \"Ulusal Çıkarı\"na Eleştiri (Critique of Realism's National Interest)",
              content: "Tarihsel Materyalizm, \"ulusal çıkarın\" tarafsız veya zamansız bir kavram olmadığını, aksine bir devlet içindeki egemen kapitalist sınıfın belirli sınıf çıkarlarını yansıttığını savunur."
            },
            {
              title: "Liberalizm'in \"Özgürlük\" Kavramına Eleştiri (Critique of Liberalism's Freedom Concept)",
              content: "Tarihsel Materyalizm, liberal \"çalışma özgürlüğünün\", üretim araçlarına sahip olmayan işçilerin hayatta kalmak için emeklerini satmaya zorlandıkları yapısal \"özgürsüzlüğü\" gizlediğini savunur."
            }
          ]
        }
      ]
    },
    {
      category: "PEACE STUDIES",
      questions: [
        {
          id: 1,
          question: "Notlarda modern barış çalışmalarını tanımlayan yedi özellik listelenmektedir. Bu özelliklerden dört tanesini adlandırın ve kısaca açıklayın.",
          answers: [
            {
              title: "Temel Nedenler (Root Causes)",
              content: "Doğrudan şiddetin köken nedenlerini ele alma ve yapısal eşitsizliklerin üstesinden gelme yollarını keşfetme kaygısı."
            },
            {
              title: "Disiplinlerarası Yaklaşımlar (Interdisciplinary Approaches)",
              content: "Şiddetli çatışmayı anlamak için birçok akademik disiplinden çok yönlü bir yanıtın esas olduğunun kabulü."
            },
            {
              title: "Şiddet İçermeyen Dönüşümler (Non-violent Transformations)",
              content: "Anlaşmazlıkları çözmek ve potansiyel olarak şiddetli durumların şiddet içermeyen dönüşümünü başarmak için barışçıl yollar arayışı."
            },
            {
              title: "Çok Düzeyli Analiz (Multi-level Analysis)",
              content: "\"İç\" ve \"dış\" ikilemini aşmaya çalışarak, çatışmanın bireysel, grup, devlet ve devletlerarası düzeylerde analizini benimseme."
            }
          ]
        },
        {
          id: 2,
          question: "Barış çalışmalarının gündemi 1970'lerde üç büyük yeni uluslararası meseleyi içerecek şekilde genişledi. Bu üç meseleyi listeleyin ve açıklayın.",
          answers: [
            {
              title: "Ekonomik Eşitsizlikler (Economic Inequalities)",
              content: "Eski sömürgelerin, siyasi bağımsızlık kazanmalarına rağmen ekonomik bağımsızlıklarını kazanamadıkları ve küresel eşitsizliğin büyük bir sorun olduğu farkındalığı."
            },
            {
              title: "Küresel Çevre Durumu (Global Environmental Situation)",
              content: "Küresel ekosistemin artan insan etkileriyle baş edemeyeceği ve dolayısıyla ekonomik büyümeye sınırlar koyduğu yönündeki yeni kaygı."
            },
            {
              title: "Adalet Arayışı ve Şiddetin Haklılığı (Quest for Justice and Justification of Violence)",
              content: "Vietnam Savaşı ve yapısal şiddet kavramının tetiklediği, adaletin peşinde şiddetin bazen haklı olup olamayacağı üzerine bir tartışma."
            }
          ]
        },
        {
          id: 3,
          question: "Johan Galtung, barış tanımını genişleten kilit bir kavram ortaya atmıştır. \"Yapısal şiddet\"i tanımlayın ve barış çalışmaları için temel çıkarımını açıklayın.",
          answers: [
            {
              title: "Yapısal Şiddet (Structural Violence)",
              content: "Doğrudan şiddetten değil, insanların temel ihtiyaçlarını karşılamasını engelleyen adaletsiz ekonomik ve sosyal yapılardan kaynaklanan zarar veya ölüm."
            },
            {
              title: "Çıkarım (Implication)",
              content: "Gerçek bir barış halinin sadece savaşın olmaması (negatif barış) değil, aynı zamanda yapısal şiddet ve sömürünün de olmaması (pozitif barış) gerektiği anlamına geliyordu."
            }
          ]
        },
        {
          id: 4,
          question: "Notlar, geleceği şekillendirmesi muhtemel olan üç ana çatışma eğilimini tanımlamaktadır. Bu üç eğilimi listeleyin ve kısaca tanımlayın.",
          answers: [
            {
              title: "Artan insan göçü (Increasing Human Migration)",
              content: "Ekonomik, sosyal ve çevresel baskılar nedeniyle göç olasılığının artması, potansiyel olarak alıcı bölgelerde kültürel çatışmalara yol açması."
            },
            {
              title: "Çevresel ve kaynak çatışmalarının tırmanması (Escalation of Environmental and Resource Conflicts)",
              content: "Gıda, tatlı su ve fosil yakıtlar gibi kaynaklar üzerindeki çatışmaların yerel, bölgesel ve küresel düzeylerde artma olasılığı."
            },
            {
              title: "Güçsüzlerin şiddetli tepkileri (Violent Reactions of the Powerless)",
              content: "Hem devletler içinde hem de ulusötesi hareketler aracılığıyla marjinalleşmiş nüfuslardan rekabetçi ve şiddetli tepkiler beklenmesi."
            }
          ]
        },
        {
          id: 5,
          question: "Gelecekteki küresel zorluklara yanıt olarak, notlar iki ana zıt seçeneği veya yolu sunmaktadır. Bu iki potansiyel yanıtı belirleyin ve açıklayın.",
          answers: [
            {
              title: "Sürdürülebilir Kalkınma İçin Tutarlı İşbirliği (Coherent Cooperation for Sustainable Development)",
              content: "Borç hafifletme, ticaret reformu ve kalkınma yardımı ile çatışma önleme ve çözüm programlarını içeren bir yol."
            },
            {
              title: "Statükoyu Korumak / \"Liddism\" (Maintaining Status Quo / \"Liddism\")",
              content: "İnsanlığın zengin kesimlerinin, parçalanmış bir dünyayı \"sınırlandırmak\" için gerektiğinde askeri güçle desteklenen ticaret ve finansal önlemler aracılığıyla ayrıcalıklı konumlarını sürdürdüğü bir yol."
            }
          ]
        }
      ]
    },
         {
       category: "CRITICAL SECURITY STUDIES",
       questions: [
         {
           id: 1,
           question: "1994 York Üniversitesi konferansı, geleneksel güvenlik çalışmalarına üç ana cepheden meydan okuyarak CSS için bir başlangıç gündemi belirlemiştir. Bu üç meydan okumayı listeleyin ve açıklayın.",
           answers: [
             {
               title: "Referans nesnesini sorgulamak (Questioning the Reference Object)",
               content: "Geleneksel olarak güvenliği sağlanacak tek nesne olarak devlete odaklanmayı sorgular, bunun yerine bireyleri veya toplulukları önerir."
             },
             {
               title: "Güvenliği askeri güvenlikten fazlası olarak görmek (Viewing Security as More than Military Security)",
               content: "Güvenlik kavramını askeri tehditlerin ötesine, ekonomik, çevresel ve toplumsal güvensizlikleri de içerecek şekilde genişletir."
             },
             {
               title: "Güvenliğin çalışma şeklini değiştirmek (Changing How Security Works)",
               content: "Geleneksel yaklaşımların sözde nesnelliğini reddeder, bilginin arkasındaki politikayı tanıyan post-pozitivist bir bilim anlayışını savunur."
             }
           ]
         },
         {
           id: 2,
           question: "Koruma Sorumluluğu (R2P) doktrini, üç spesifik sorumluluk üzerine inşa edilmiştir. Her birini adlandırın ve kısaca tanımlayın.",
           answers: [
             {
               title: "Önleme Sorumluluğu (Responsibility to Prevent)",
               content: "İç çatışmaların ve insan kaynaklı krizlerin köken nedenlerini ve doğrudan nedenlerini ortaya çıkmadan önce ele almak."
             },
             {
               title: "Tepki Verme Sorumluluğu (Responsibility to React)",
               content: "Zorlayıcı insani ihtiyaç durumlarına uygun önlemlerle yanıt vermek, bu önlemler yaptırımları veya aşırı durumlarda askeri müdahaleyi içerebilir."
             },
             {
               title: "Yeniden İnşa Sorumluluğu (Responsibility to Rebuild)",
               content: "Özellikle askeri müdahale sonrasında iyileşme, yeniden yapılanma ve uzlaşma için tam destek sağlamak."
             }
           ]
         },
         {
           id: 3,
           question: "Ken Booth'un Aberystwyth Okulu, güvenliğe dair eleştirel bir teoriyi üç temel soruya dayandırır. Bu üç temel soruyu listeleyin.",
           answers: [
             {
               title: "Soru 1 (Question 1)",
               content: "Gerçek olan nedir?"
             },
             {
               title: "Soru 2 (Question 2)", 
               content: "Bilgi nedir? / Ondan kim faydalanır?"
             },
             {
               title: "Soru 3 (Question 3)",
               content: "Ne yapılmalı?"
             }
           ]
         },
         {
           id: 4,
           question: "Kopenhag Okulu, iki temel kavramsal gelişme ile tanımlanır. Bu iki kavramı adlandırın ve \"güvenlikleştirme\" için kısa bir tanım yapın.",
           answers: [
             {
               title: "Güvenliğin sektörel analizi (Sectoral Analysis of Security)",
               content: "Güvenlik konularının askeri, ekonomik, çevresel, toplumsal ve siyasi sektörlere ayrılması yaklaşımı."
             },
             {
               title: "Güvenlikleştirme (Securitization)",
               content: "Bir meselenin, \"söz eylemi\" aracılığıyla, normal siyasetin dışına çıkan olağanüstü önlemleri haklı kılan varoluşsal bir tehdit olarak sunulduğu süreç."
             }
           ]
         }
       ]
     },
     {
       category: "POSTCOLONIALISM",
       questions: [
         {
           id: 1,
           question: "Postkolonyal analiz, sömürge projesinin merkezinde yer alan üç farklı şiddet biçimini tanımlar. Bu üç şiddet biçimini adlandırın ve kısaca tanımlayın.",
           answers: [
             {
               title: "Maddi şiddet (Material Violence)",
               content: "Avrupa sömürgeciliğinin Amerika, Afrika ve Asya'daki nüfuslara uyguladığı muazzam fiziksel şiddet."
             },
             {
               title: "Epistemik şiddet (Epistemic Violence)",
               content: "Avrupa bilgi sistemlerinin diğer halklara dayatılması, yerel bilgi edinme yollarının aktif olarak reddedilmesi, itibarsızlaştırılması veya yok edilmesi."
             },
             {
               title: "Yapısal şiddet (Structural Violence)",
               content: "Sömürge alanlarındaki günlük yaşamı ve onun yeniden üretimini tanımlayan, sömürü ve tahakkümün sistematik ilişkileri."
             }
           ]
         },
         {
           id: 2,
           question: "Edward Said'in \"Oryantalizm\"i, Batı'nın Doğu ve Batı'ya dair hiyerarşik bir temsilini nasıl inşa ettiğini açıklar. \"Doğu\"ya atfedilen üç özelliği ve \"Batı\"ya atfedilen üç karşıt özelliği listeleyin.",
           answers: [
             {
               title: "Doğu (East)",
               content: "Gizemli, duygusal, barbar olarak karakterize edilir."
             },
             {
               title: "Batı (West)",
               content: "Bilinen, akılcı, medeni olarak karakterize edilir."
             }
           ]
         },
         {
           id: 3,
           question: "Postkolonyalizmin eleştirdiği temel bir kavram \"Avrupamerkezcilik\"tir. Avrupamerkezci bir dünya görüşünün üç ana unsurunu tanımlayın.",
           answers: [
             {
               title: "Avrupa'nın ayrık ve kendi kendini üreten olması (Europe as Distinct and Self-generating)",
               content: "Avrupa'nın, dünyanın geri kalanından ayrı, kendi içinde oluşmuş farklı bir medeniyet olarak tasvir edilmesi."
             },
             {
               title: "Avrupa'nın tarihin merkezi olması (Europe as Center of History)",
               content: "Dünya tarihinin, geçmiş ve şimdi, Avrupa'nın deneysel ve normatif merkeziliği varsayımıyla analiz edilmesi."
             },
             {
               title: "Modernliğin Batı tarafından tanımlanması (Modernity Defined by the West)",
               content: "Gelişme ve modernleşmenin son noktasının çağdaş \"Batı\" tarafından tanımlandığı varsayımı."
             }
           ]
         }
       ]
     },
    {
      category: "CONSTRUCTIVISM",
      questions: [
        {
          id: 1,
          question: "Notlarda inşacılığın üç temel ontolojik pozisyona dayandığı belirtilmektedir. Bu üç pozisyonu adlandırın ve kısaca açıklayın.",
          answers: [
            {
              title: "Normatif veya düşünsel yapılar anahtardır (Normative or Ideational Structures are Key)",
              content: "Paylaşılan fikirlerin, inançların ve normların dünya siyasetini şekillendirmede maddi güçler kadar, hatta onlardan daha önemli olduğunu savunur."
            },
            {
              title: "Kimlikler önemlidir (Identities Matter)",
              content: "Bir aktörün kimliği çok önemlidir çünkü bu, onların çıkarlarını ve dolayısıyla uluslararası sistemdeki eylemlerini belirler."
            },
            {
              title: "Özneler ve yapılar karşılıklı olarak oluşur (Agents and Structures are Mutually Constitutive)",
              content: "Devletler (özneler) ve uluslararası sistem (yapı) birbirinden ayrı değildir; etkileşim yoluyla birbirlerini şekillendirir ve yaratırlar."
            }
          ]
        },
        {
          id: 2,
          question: "Alexander Wendt \"anarşi, devletlerin ondan ne yaptığıdır\" der ve üç farklı anarşi kültürü önerir. Bu üç kültürü listeleyin ve tanımlayın.",
          answers: [
            {
              title: "Hobbesçu (Hobbesian)",
              content: "Devletlerin birbirini düşman olarak gördüğü, güvenliğin sıfır toplamlı bir oyun olduğu ve hayatta kalmanın saf askeri güce bağlı olduğu bir kültür."
            },
            {
              title: "Lockeçu (Lockean)",
              content: "Devletlerin birbirini rakip olarak gördüğü; rekabet ettikleri ve şiddet kullandıkları, ancak birbirlerinin egemenliğini kabul ederek bazı sınırlamalarla hareket ettikleri bir kültür."
            },
            {
              title: "Kantçı (Kantian)",
              content: "Devletlerin birbirini dost olarak gördüğü, anlaşmazlıkları barışçıl bir şekilde çözdüğü ve kolektif güvenlik için işbirliği yaptığı bir kültür."
            }
          ]
        },
        {
          id: 3,
          question: "İnşacılık, aktör davranışını şekillendirmede normların önemini vurgular. Notlarda tartışılan iki ana norm türünü belirleyin ve tanımlayın.",
          answers: [
            {
              title: "Kurucu (Constitutive)",
              content: "Bir aktörün kimliğini tanımlayan, ne olduklarını ve çıkarlarının ne olacağını şekillendiren normlar (örneğin, devlet egemenliği normu)."
            },
            {
              title: "Düzenleyici (Regulative)",
              content: "Zaten var olan bir kimlik için davranışı belirleyen veya yasaklayan, aktörlerin ne \"yapması gerektiğini\" veya ne \"yapmaması gerektiğini\" belirleyen normlar (örneğin, nükleer tabu)."
            }
          ]
        },
        {
          id: 4,
          question: "İnşacılık düşünce okulu, metodolojilerine göre genel olarak iki ana kampa ayrılır. Bu iki kampı adlandırın ve temel farklarını açıklayın.",
          answers: [
            {
              title: "Konvansiyonel İnşacılık (Conventional Constructivism)",
              content: "Devleti merkezi bir aktör olarak kabul etmeye eğilimlidir ve pozitivist, bilimsel yöntemler kullanarak, rasyonel teorilerle bir \"köprü\" kurmaya çalışır."
            },
            {
              title: "Eleştirel İnşacılık (Critical Constructivism)",
              content: "Pozitivizmi reddeder ve gerçeği inşa etmede dilin ve söylemin gücüne odaklanır, varsayılan kimlikleri ve güç ilişkilerini yapıbozuma uğratmayı ve sorgulamayı amaçlar."
            }
          ]
        },
        {
          id: 5,
          question: "Wendt, bir anarşi kültüründen diğerine geçişin dört \"ana değişken\" tarafından yönlendirildiğini öne sürer. Bu dört değişkeni listeleyin ve kısaca tanımlayın.",
          answers: [
            {
              title: "Karşılıklı Bağımlılık (Interdependence)",
              content: "Devletlerin birbirine karşılıklı olarak bağımlı olma derecesi, çatışma maliyetlerini artırabilir."
            },
            {
              title: "Ortak Kader (Common Fate)",
              content: "Devletlerin ancak kolektif eylemle çözülebilecek ortak tehditlerle (çevresel felaket gibi) karşı karşıya olduğunu fark etmesi."
            },
            {
              title: "Homojenizasyon (Homogenization)",
              content: "Devletlerin siyasi ve sosyal yapılarında daha benzer hale gelme süreci, paylaşılan kimlik ve güveni teşvik edebilir."
            },
            {
              title: "Kendi Kendine Kısıtlama (Self-Restraint)",
              content: "Güçlü bir devletin kendi gücünü kasıtlı olarak sınırlaması eylemi, güven inşa edebilir ve diğerlerinden karşılıklı kısıtlamayı teşvik edebilir."
            }
                     ]
         }
       ]
     },
     {
       category: "HUMAN SECURITY",
       questions: [
         {
           id: 1,
           question: "1994 UNDP İnsani Gelişme Raporu, genellikle iki temel ilke ile özetlenen insan güvenliği kavramını ortaya atmıştır. Bu iki \"özgürlüğü\" adlandırın ve tanımlayın.",
           answers: [
             {
               title: "Yoksunluktan özgürlük (Freedom from Want)",
               content: "Yaşam kalitesini düşüren açlık, hastalık ve baskı gibi kronik tehditlerden güvenlik."
             },
             {
               title: "Korkudan özgürlük (Freedom from Fear)",
               content: "Şiddet veya çatışma gibi günlük yaşamın düzenindeki ani ve acı verici kesintilerden korunma."
             }
           ]
         },
         {
           id: 2,
           question: "1994 UNDP raporu, sürekli dikkat gerektiren yedi kritik güvenlik alanı önermiştir. Bu yedi alandan beş tanesini listeleyin ve kısaca tanımlayın.",
           answers: [
             {
               title: "Ekonomik güvenlik (Economic Security)",
               content: "Genellikle üretken ve kazançlı işlerden veya kamu tarafından finanse edilen bir güvenlik ağından sağlanan güvenceli temel gelir."
             },
             {
               title: "Gıda güvenliği (Food Security)",
               content: "Herkesin her zaman temel gıdaya hem fiziksel hem de ekonomik erişiminin sağlanması."
             },
             {
               title: "Sağlık güvenliği (Health Security)",
               content: "Hastalıklar ve sağlıksız yaşam tarzlarından minimum düzeyde korunmanın garantilenmesi."
             },
             {
               title: "Çevresel güvenlik (Environmental Security)",
               content: "İnsanları doğanın kısa ve uzun vadeli tahribatlarından, doğadaki insan yapımı tehditlerden ve doğal çevrenin bozulmasından korumak."
             },
             {
               title: "Kişisel güvenlik (Personal Security)",
               content: "İnsanları, devletten veya dış devletlerden, şiddet yanlısı bireylerden ve devlet altı aktörlerden veya aile içi şiddetten kaynaklanan fiziksel şiddetten korumak."
             }
           ]
         },
         {
           id: 3,
           question: "1994 İnsani Gelişme Raporu, insan güvenliği kavramının dört ana özelliğini detaylandırmıştır. Bu dört özelliği adlandırın ve açıklayın.",
           answers: [
             {
               title: "Evrensel (Universal)",
               content: "Zengin ve yoksul tüm uluslardaki insanlar için geçerlidir, çünkü ilkeleri kültürler ve sistemler arası değere sahiptir."
             },
             {
               title: "Karşılıklı Bağımlı (Interdependent)",
               content: "İnsan güvenliğinin farklı yönleri birbiriyle bağlantılıdır, yani bir alandaki tehditler diğer alanlara yayılabilir ve güvenliği etkileyebilir."
             },
             {
               title: "Önleme Odağı (Prevention-Focused)",
               content: "Tehditleri ortaya çıktıktan sonra müdahale etmekten daha kolay ve daha az maliyetlidir."
             },
             {
               title: "İnsan Odaklı (People-Centered)",
               content: "Güvenliğin birincil referans nesnesi olarak devleti değil, insanları ve onların topluluklarını yapar."
             }
           ]
         }
       ]
     },
     {
       category: "ENVIRONMENTAL SECURITY",
       questions: [
         {
           id: 1,
           question: "Notlarda çevresel güvenliğin 1960'larda başlayan birbiriyle ilişkili dört gelişme nedeniyle önemli bir kavram olarak ortaya çıktığı belirtilmektedir. Bu gelişmelerden üçünü listeleyin ve kısaca tanımlayın.",
           answers: [
             {
               title: "Çevresel farkındalığın artması (Increased Environmental Awareness)",
               content: "\"Sessiz Bahar\" gibi kitapların ve çevresel STK'ların yükselişinin tetiklediği, çevresel konular hakkında kamu bilincinde bir artış."
             },
             {
               title: "Geleneksel güvenlik söyleminin eleştirileri (Critiques of Traditional Security Discourse)",
               content: "Akademisyenlerin güvenlik çalışmalarının dar askeri odağını sorgulamaya başlaması, çevresel risklerin de ulusal refahı tehdit ettiğini savunmaları."
             },
             {
               title: "Stratejik koşullardaki değişiklikler (Changes in Strategic Conditions)",
               content: "Soğuk Savaş'ın sona ermesi, çevre gibi \"yeni\" güvenlik konularının ana akım gündeme girmesi için entelektüel ve siyasi bir alan yarattı."
             }
           ]
         },
         {
           id: 2,
           question: "Çevresel güvenlik literatürü en az altı ana yorum içerir. Bu yorumlardan üçü için yaklaşımı, \"güvence altına alınacak varlığı\" ve \"başlıca risk kaynağını\" belirtin.",
           answers: [
             {
               title: "Ekolojik güvenlik (Ecological Security)",
               content: "Güvence Altına Alınacak Varlık: Doğal çevre, Başlıca Risk Kaynağı: İnsan faaliyetleri"
             },
             {
               title: "Çevresel şiddet (Environmental Violence)",
               content: "Güvence Altına Alınacak Varlık: Ulus-devlet, Başlıca Risk Kaynağı: Savaş"
             },
             {
               title: "İnsani güvenlik (Human Security)",
               content: "Güvence Altına Alınacak Varlık: Bireyler, Başlıca Risk Kaynağı: Çevresel değişim"
             }
           ]
         }
       ]
     },
     {
       category: "TERRORISM",
       questions: [
         {
           id: 1,
           question: "Notlar, terörizmin incelenebileceği üç farklı bakış açısı sunmaktadır. Bu üç bakış açısını adlandırın ve kısaca tanımlayın.",
           answers: [
             {
               title: "Savaş olarak terörizm (Terrorism as War)",
               content: "Terörizmi askeri yöntemlerle çözülmesi gereken bir sorun olarak görür, zaferin elde edilebileceğini varsayar."
             },
             {
               title: "Suç olarak terörizm (Terrorism as Crime)",
               content: "Terörizmi yönetmek için normal polis tekniklerine güvenir, diğer suçlar gibi sadece sınırlandırılabileceğini, ortadan kaldırılamayacağını ima eder."
             },
             {
               title: "Hastalık olarak terörizm (Terrorism as Disease)",
               content: "Hem semptomlara hem de köken nedenlerine odaklanır, kök sorunları ele almak için uzun vadeli stratejilere ihtiyaç olduğunu varsayar."
             }
           ]
         },
         {
           id: 2,
           question: "Terörizmin işlevsel bir tanımı altı temel unsur içerir. Bu unsurlardan dördünü adlandırın ve tanımlayın.",
           answers: [
             {
               title: "Şiddet kullanımı veya tehdidi (Use or Threat of Violence)",
               content: "Taktik, temelde fiziksel zarar vermeyi veya bunun korkusunu yaratmayı içerir."
             },
             {
               title: "Organize bir grup tarafından gerçekleştirilir (Carried out by an Organized Group)",
               content: "Eylem rastgele veya tek bir kişi tarafından değil, belirli bir yapıya sahip bir grup tarafından işlenir."
             },
             {
               title: "Siyasi hedeflere ulaşma amacı (Aimed at Achieving Political Goals)",
               content: "Şiddet kişisel maddi kazanç için değil, siyasi bir hedefi başarmak için tasarlanmıştır."
             },
             {
               title: "Hedef bir kitleye yöneliktir (Directed at a Target Audience)",
               content: "Şiddet, doğrudan kurbanların ötesinde daha geniş bir kitleye korku yaratmayı ve mesaj göndermeyi amaçlar."
             }
           ]
         }
       ]
     },
     {
       category: "GENDER AND SECURITY",
       questions: [
         {
           id: 1,
           question: "Notlar, toplumsal cinsiyet ve güvenlik arasındaki ilişkiyi analiz etmek için iki ana bakış açısı sunmaktadır. Bu iki yönü adlandırın ve kısaca tanımlayın.",
           answers: [
             {
               title: "Pratik yönler (Practical Aspects)",
               content: "Kadınların ordudaki somut rollerini veya askeri çatışmanın kurbanları, gözlemcileri veya kolaylaştırıcıları olarak deneyimlerini içerir."
             },
             {
               title: "Söylemsel yönler (Discursive Aspects)",
               content: "Erkeklikle militarizm ve kadınlıkla besleme ve barış fikri arasında kurulan geleneksel bağlantıları içerir."
             }
           ]
         },
         {
           id: 2,
           question: "Jean Elshtain'in çalışmaları, savaşın cinsiyetlendirilmiş inşasında temel bir ikiliği tanımlar. Onun tanımladığı iki arketipik rolü adlandırın ve tanımlayın.",
           answers: [
             {
               title: "Adil Savaşçı (Just Warrior)",
               content: "Bir savaşçı olması beklenen, fiziksel güç ve cesaret gibi erkeksi değerlerle ilişkilendirilen ve görevi savaşmak olan erkek arketipi."
             },
             {
               title: "Güzel Ruh (Beautiful Soul)",
               content: "Ev cephesi ve besleme ile ilişkilendirilen ve erkek savaşçıdan korunmaya ihtiyacı olan, muharip olmayan olması beklenen kadın arketipi."
             }
           ]
         }
       ]
     },
     {
       category: "SECURITIZATION APPROACH",
       questions: [
         {
           id: 1,
           question: "Kopenhag Okulu, beş genel güvenlik sektörü veya kategorisi belirleyerek güvenlik gündemini genişletir. Bu beş sektörü listeleyin.",
           answers: [
             {
               title: "Askeri güvenlik (Military Security)",
               content: "Geleneksel askeri tehditler ve savunma konuları."
             },
             {
               title: "Çevresel güvenlik (Environmental Security)",
               content: "Çevresel tehditler ve ekolojik güvenlik meseleleri."
             },
             {
               title: "Ekonomik güvenlik (Economic Security)",
               content: "Ekonomik istikrar ve refah tehditleri."
             },
             {
               title: "Toplumsal güvenlik (Societal Security)",
               content: "Kimlik, kültür ve toplumsal bütünlük tehditleri."
             },
             {
               title: "Siyasi güvenlik (Political Security)",
               content: "Siyasi sistem ve meşruiyet tehditleri."
             }
           ]
         },
         {
           id: 2,
           question: "Güvenlikleştirme modeli, herhangi bir kamusal konunun üç aşamadan oluşan bir yelpazede var olabileceğini öne sürer. Bu üç aşamayı adlandırın ve tanımlayın.",
           answers: [
             {
               title: "Siyasallaşmamış (Non-politicized)",
               content: "Konunun devlet eylemi için bir mesele olmadığı ve kamu tartışmalarına dahil edilmediği; özel alanda kaldığı aşama."
             },
             {
               title: "Siyasallaşmış (Politicized)",
               content: "Konunun kamu politikasının bir parçası olduğu, hükümet kararı ve kaynak tahsisi gerektirdiği ve standart siyasi sistem içinde yönetildiği aşama."
             },
             {
               title: "Güvenlikleştirilmiş (Securitized)",
               content: "Konunun, normal siyasi prosedürlerin ötesinde olağanüstü eylemler gerektiren varoluşsal bir tehdit olarak çerçevelendiği aşama."
             }
           ]
         }
       ]
     },
     {
       category: "ECONOMIC SECURITY",
       questions: [
         {
           id: 1,
           question: "Notlarda ekonomik yaptırımların en az üç farklı amaç için kullanılabileceği belirtilmektedir. Bu üç amacı adlandırın ve kısaca tanımlayın.",
           answers: [
             {
               title: "Politik (Political)",
               content: "Bir hedefin davranışını etkileyerek barış ve özgürlük gibi hedefleri ilerletmek için ekonomik gücü kullanmak."
             },
             {
               title: "Ahlaki (Moral)",
               content: "Ahlaki olarak kötü veya kınanması gereken eylemlerde ekonomik katılımı reddetmek."
             },
             {
               title: "Askeri (Military)",
               content: "Tehlikeli rejimleri izole etmek ve bölgesel ve küresel güvenliğe yönelik tehditleri zayıflatmak."
             }
           ]
         }
       ]
     },
     {
       category: "INTERNATIONAL CRISIS",
       questions: [
         {
           id: 1,
           question: "Notlar, bir dış politika krizini tanımlayan beş gerekli koşulu listelemektedir. Bu koşullardan dördünü adlandırın ve kısaca tanımlayın.",
           answers: [
             {
               title: "Sürpriz Unsuru (Element of Surprise)",
               content: "Durum genellikle aniden ortaya çıkar ve karar vericiler tarafından beklenmez."
             },
             {
               title: "Yüksek değerli çıkarlara yönelik tehdit (Threat to High-Value Interests)",
               content: "Kriz, devletin bir veya daha fazla temel değerine veya yüksek öncelikli çıkarına yönelik bir tehdit oluşturur."
             },
             {
               title: "Zaman Baskısı (Time Pressure)",
               content: "Kararların ve eylemlerin sınırlı veya kısa bir süre içinde alınması gerektiği algısı vardır."
             },
             {
               title: "Daha yüksek askeri çatışma olasılığı (Higher Probability of Military Conflict)",
               content: "Askeri düşmanlıkların veya silahlı çatışmanın normal koşullara göre daha yüksek olduğu algısı."
             }
           ]
         }
       ]
     },
     {
       category: "NUCLEAR SECURITY",
       questions: [
         {
           id: 1,
           question: "Notlar, \"Devletler neden nükleer silahlara sahip olmak ister?\" sorusunu cevaplamak için dört ana yaklaşım olduğunu açıklamaktadır. Bu dört yaklaşımı adlandırın.",
           answers: [
             {
               title: "Güvenlik Yaklaşımı (Security Approach)",
               content: "Devletlerin güvenlik tehditlerine karşı nükleer silahları caydırıcı olarak görmesi."
             },
             {
               title: "Kişisel-Kurumsal Rekabet Yaklaşımı (Personal-Institutional Competition Approach)",
               content: "İç politik grupların kendi çıkarları için nükleerleşmeyi desteklemesi."
             },
             {
               title: "Sosyo-Psikolojik Yaklaşım (Socio-Psychological Approach)",
               content: "Prestij, statü ve ulusal kimlik gibi faktörlerin nükleer silah arayışını etkilemesi."
             },
             {
               title: "Normatif Yaklaşım (Normative Approach)",
               content: "Uluslararası normlar ve değerlerin nükleer silah politikalarını şekillendirmesi."
             }
           ]
         }
       ]
     },
     {
       category: "ETHNIC CONFLICT",
       questions: [
         {
           id: 1,
           question: "Notlar, etnik kimliğin kaynağını açıklamak için üç farklı teorik yaklaşım sunmaktadır. Bu üç yaklaşımı adlandırın ve kısaca tanımlayın.",
           answers: [
             {
               title: "Primordialist Yaklaşım (Primordialist Approach)",
               content: "Bu yaklaşım, etnik kimliği akrabalık, dil veya din gibi değişmez özelliklere dayalı, sabit, doğal ve tarihsel olarak eski olarak görür."
             },
             {
               title: "Modernist Yaklaşım (Modernist Approach)",
               content: "Bu yaklaşım, etnik ve ulusal kimliklerin sanayileşme ve devlet inşası gibi süreçler nedeniyle modern çağda ortaya çıkan yeni olgular olduğunu savunur."
             },
             {
               title: "İnşacı Yaklaşım (Constructivist Approach)",
               content: "Bu yaklaşım, etnik kimliklerin bireylerin ve grupların siyasi, sosyal ve psikolojik ihtiyaçlarını karşılamak için etkileşim yoluyla sosyal olarak nasıl inşa edildiğine odaklanır."
             }
           ]
         }
       ]
     },
     {
       category: "HEALTH SECURITY",
       questions: [
         {
           id: 1,
           question: "Notlar, sağlık ve güvenlik arasındaki bağlantının üç farklı güvenlik çerçevesi aracılığıyla anlaşılabileceğini açıklamaktadır. Bu üç çerçeveyi adlandırın ve kısaca tanımlayın.",
           answers: [
             {
               title: "İnsan güvenliği çerçevesi (Human Security Framework)",
               content: "Sıradan bireylerin sağlığına ve esenliğine odaklanır, iyi sağlığı güvenliğin hem esas hem de aracı olarak görür."
             },
             {
               title: "Ulusal güvenlik çerçevesi (National Security Framework)",
               content: "Yaygın bulaşıcı hastalıkları bir devletin nüfusuna, ekonomisine ve siyasi istikrarına yönelik tehditler olarak görür."
             },
             {
               title: "Biyogüvenlik çerçevesi (Biosecurity Framework)",
               content: "Terörist grupların veya diğer aktörlerin kasten hastalığa neden olan biyolojik ajanları salma olasılığıyla ilgilenir."
             }
           ]
         }
       ]
     },
     {
       category: "CYBER SECURITY",
       questions: [
         {
           id: 1,
           question: "Notlar, siber güvenlik hikayesinin birbiriyle bağlantılı ancak farklı üç söylem aracılığıyla anlatılabileceğini belirtmektedir. Bu üç söylemi adlandırın ve kısaca tanımlayın.",
           answers: [
             {
               title: "Teknik Söylem (Technical Discourse)",
               content: "Bu söylem, virüsler ve solucanlar gibi kötü amaçlı yazılımların neden olduğu bilgisayar ve ağ kesintilerine odaklanır."
             },
             {
               title: "Siber Suç ve Siber Casusluk Söylemi (Cybercrime and Cyber Espionage Discourse)",
               content: "Bu söylem, kişisel kazanç için hackleme ve devlet destekli casusluk dahil olmak üzere bilgisayarların ve ağların suç faaliyetleri için kullanımını ele alır."
             },
             {
               title: "Siber Çatışmalar / Askeri-Sivil Savunma Söylemi (Cyber Conflicts / Military-Civil Defense Discourse)",
               content: "Bu söylem, siber güvenliği ulusal güvenlik açısından ele alır, bilgi savaşı, siber savaş ve kritik ulusal altyapının korunmasına odaklanır."
             }
           ]
         }
       ]
     }
   ];

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedQuestion, setSelectedQuestion] = useState<number | null>(null);
  const [answeredTitles, setAnsweredTitles] = useState<string[]>([]);
  const [answeredDetails, setAnsweredDetails] = useState<{title: string, content: string}[]>([]);
  const [userInput, setUserInput] = useState('');
  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [gameCompleted, setGameCompleted] = useState(false);

  // Cevap kontrolü için esnek eşleştirme fonksiyonu
  const checkAnswer = (userAnswer: string, correctAnswer: string): boolean => {
    const normalize = (text: string) => {
      return text
        .toLowerCase()
        .replace(/[çÇ]/g, 'c')
        .replace(/[ğĞ]/g, 'g')
        .replace(/[ıİ]/g, 'i')
        .replace(/[öÖ]/g, 'o')
        .replace(/[şŞ]/g, 's')
        .replace(/[üÜ]/g, 'u')
        .replace(/[^a-z0-9]/g, '');
    };

    const normalizedUser = normalize(userAnswer);
    const normalizedCorrect = normalize(correctAnswer);

    // Tam eşleşme
    if (normalizedUser === normalizedCorrect) return true;

    // Parantez içindeki İngilizce kısmı çıkar
    const turkishPart = correctAnswer.split('(')[0].trim();
    const englishPart = correctAnswer.match(/\(([^)]+)\)/)?.[1] || '';

    // Türkçe kısmı ile eşleşme
    if (normalizedUser === normalize(turkishPart)) return true;

    // İngilizce kısmı ile eşleşme
    if (englishPart && normalizedUser === normalize(englishPart)) return true;

    // AKILLI KELİME EŞLEŞMESİ - kullanıcının yazdığı önemli kelimeler doğru başlıkta var mı?
    if (normalizedUser.length >= 3) {
      const turkishWords = normalize(turkishPart).split(/\s+/).filter(word => word.length >= 3);
      const englishWords = englishPart ? normalize(englishPart).split(/\s+/).filter(word => word.length >= 3) : [];
      
      // Kullanıcının yazdığı kelime, başlıktaki kelimelerden biriyle tam eşleşiyor mu?
      if (turkishWords.includes(normalizedUser) || englishWords.includes(normalizedUser)) {
        return true;
      }
      
      // Kullanıcının yazdığı kelime, başlıktaki bir kelimenin başlangıcı mı? (en az 4 karakter)
      if (normalizedUser.length >= 4) {
        const matchesStart = turkishWords.some(word => word.startsWith(normalizedUser)) || 
                            englishWords.some(word => word.startsWith(normalizedUser));
        if (matchesStart) return true;
      }
    }

    // Kısmi eşleşme - en az 3 karakter ve %70 benzerlik
    if (normalizedUser.length >= 3) {
      const similarity = calculateSimilarity(normalizedUser, normalize(turkishPart));
      const englishSimilarity = englishPart ? calculateSimilarity(normalizedUser, normalize(englishPart)) : 0;
      
      if (similarity >= 0.7 || englishSimilarity >= 0.7) return true;
    }

    return false;
  };

  // Basit benzerlik hesaplama
  const calculateSimilarity = (str1: string, str2: string): number => {
    const longer = str1.length > str2.length ? str1 : str2;
    const shorter = str1.length > str2.length ? str2 : str1;
    
    if (longer.length === 0) return 1.0;
    
    const distance = levenshteinDistance(longer, shorter);
    return (longer.length - distance) / longer.length;
  };

  // Levenshtein distance hesaplama
  const levenshteinDistance = (str1: string, str2: string): number => {
    const matrix = [];
    
    for (let i = 0; i <= str2.length; i++) {
      matrix[i] = [i];
    }
    
    for (let j = 0; j <= str1.length; j++) {
      matrix[0][j] = j;
    }
    
    for (let i = 1; i <= str2.length; i++) {
      for (let j = 1; j <= str1.length; j++) {
        if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j] + 1
          );
        }
      }
    }
    
    return matrix[str2.length][str1.length];
  };

  const handleSubmitAnswer = () => {
    if (isMixedMode) {
      handleMixedSubmitAnswer();
      return;
    }

    if (!selectedCategory || selectedQuestion === null) return;

    const category = examQuestions.find(cat => cat.category === selectedCategory);
    if (!category) return;

    const question = category.questions[selectedQuestion];
    
    // Kullanıcının cevabını tüm başlıklarla karşılaştır
    let isCorrect = false;
    let correctAnswerTitle = '';
    
    for (const answer of question.answers) {
      if (checkAnswer(userInput, answer.title) && !answeredTitles.includes(answer.title)) {
        isCorrect = true;
        correctAnswerTitle = answer.title;
        break;
      }
    }

    if (isCorrect) {
      setScore(score + 1);
      setFeedback(`✅ Doğru! "${correctAnswerTitle}"`);
      
      // Doğru cevaplanan başlığı listeye ekle
      const newAnsweredTitles = [...answeredTitles, correctAnswerTitle];
      setAnsweredTitles(newAnsweredTitles);
      
      // Doğru cevabın detayını da ekle
      const correctAnswer = question.answers.find(ans => ans.title === correctAnswerTitle);
      if (correctAnswer) {
        const newAnsweredDetails = [...answeredDetails, {
          title: correctAnswer.title,
          content: correctAnswer.content
        }];
        setAnsweredDetails(newAnsweredDetails);
      }
      
      if (newAnsweredTitles.length === totalQuestions) {
        // Tüm başlıklar tamamlandı
        setTimeout(() => {
          setGameCompleted(true);
        }, 2000);
      } else {
        // Kalan başlıklara devam et
        setTimeout(() => {
          setUserInput('');
          setFeedback('');
        }, 2000);
      }
    } else {
      setFeedback(`❌ Yanlış. Bu sorudaki başlıklardan birini yazmalısın.`);
      setTimeout(() => {
        setUserInput('');
        setFeedback('');
      }, 2000);
    }
  };

  const handleMixedSubmitAnswer = () => {
    if (currentMixedIndex >= mixedQuestions.length) return;

    const currentQuestion = mixedQuestions[currentMixedIndex];
    const currentResult = mixedResults[currentMixedIndex];
    
    // Kullanıcının cevabını tüm başlıklarla karşılaştır
    let isCorrect = false;
    let correctAnswerTitle = '';
    
    for (const answer of currentQuestion.answers) {
      if (checkAnswer(userInput, answer.title) && !currentResult.answeredTitles.includes(answer.title)) {
        isCorrect = true;
        correctAnswerTitle = answer.title;
        break;
      }
    }

    if (isCorrect) {
      const pointsEarned = currentQuestion.pointPerTitle;
      setFeedback(`✅ Doğru! "${correctAnswerTitle}" (+${pointsEarned.toFixed(1)} puan)`);
      
      // Sonuçları güncelle
      const newResults = [...mixedResults];
      newResults[currentMixedIndex].answeredTitles.push(correctAnswerTitle);
      newResults[currentMixedIndex].score += pointsEarned;
      setMixedResults(newResults);
      setMixedScore(mixedScore + pointsEarned);
      
      setTimeout(() => {
        setUserInput('');
        setFeedback('');
      }, 2000);
    } else {
      setFeedback(`❌ Yanlış. Bu sorudaki başlıklardan birini yazmalısın.`);
      setTimeout(() => {
        setUserInput('');
        setFeedback('');
      }, 2000);
    }
  };

  const skipMixedQuestion = () => {
    if (currentMixedIndex >= mixedQuestions.length) return;
    
    const newResults = [...mixedResults];
    newResults[currentMixedIndex].skipped = true;
    setMixedResults(newResults);
    
    if (currentMixedIndex + 1 >= mixedQuestions.length) {
      // Sınav bitti
      setShowMixedResults(true);
    } else {
      setCurrentMixedIndex(currentMixedIndex + 1);
      setUserInput('');
      setFeedback('');
    }
  };

  const nextMixedQuestion = () => {
    if (currentMixedIndex + 1 >= mixedQuestions.length) {
      // Sınav bitti
      setShowMixedResults(true);
    } else {
      setCurrentMixedIndex(currentMixedIndex + 1);
      setUserInput('');
      setFeedback('');
    }
  };

  const startNewGame = () => {
    setSelectedCategory(null);
    setSelectedQuestion(null);
    setAnsweredTitles([]);
    setAnsweredDetails([]);
    setUserInput('');
    setScore(0);
    setTotalQuestions(0);
    setFeedback('');
    setGameCompleted(false);
    setIsMixedMode(false);
    setMixedQuestions([]);
    setCurrentMixedIndex(0);
    setMixedResults([]);
    setShowMixedResults(false);
    setMixedScore(0);
  };

  const startMixedExam = () => {
    // Tüm sorulardan rastgele 20 tane seç
    const allQuestions: any[] = [];
    examQuestions.forEach(category => {
      category.questions.forEach(question => {
        allQuestions.push({
          ...question,
          category: category.category,
          pointPerTitle: 5 / question.answers.length // Her başlık için puan
        });
      });
    });

    // Rastgele 20 soru seç
    const shuffled = allQuestions.sort(() => 0.5 - Math.random());
    const selected20 = shuffled.slice(0, 20);

    setMixedQuestions(selected20);
    setCurrentMixedIndex(0);
    setMixedResults(selected20.map(q => ({
      question: q,
      answeredTitles: [],
      skipped: false,
      score: 0
    })));
    setMixedScore(0);
    setIsMixedMode(true);
    setShowMixedResults(false);
    setAnsweredTitles([]);
    setAnsweredDetails([]);
    setUserInput('');
    setFeedback('');
  };

  const selectCategoryAndQuestion = (category: string, questionIndex: number) => {
    const cat = examQuestions.find(c => c.category === category);
    if (cat) {
      setSelectedCategory(category);
      setSelectedQuestion(questionIndex);
      setTotalQuestions(cat.questions[questionIndex].answers.length);
      setAnsweredTitles([]);
      setAnsweredDetails([]);
      setScore(0);
      setUserInput('');
      setFeedback('');
      setGameCompleted(false);
    }
  };

  if (showMixedResults) {
    const percentage = Math.round((mixedScore / 100) * 100);
    return (
      <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ color: '#2c3e50', textAlign: 'center' }}>🎯 Karışık Sınav Sonuçları</h2>
        <div style={{ 
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
          color: 'white', 
          padding: '30px', 
          borderRadius: '15px', 
          textAlign: 'center',
          marginBottom: '20px'
        }}>
          <h3>Toplam Puanın: {mixedScore.toFixed(1)}/100</h3>
          <h2>{percentage}%</h2>
          <p>{percentage >= 80 ? '🏆 Mükemmel!' : percentage >= 60 ? '👍 İyi!' : '💪 Daha fazla çalışmalısın!'}</p>
        </div>

        <div style={{ display: 'grid', gap: '15px', marginBottom: '20px' }}>
          {mixedResults.map((result, index) => (
            <div key={index} style={{
              background: result.skipped ? '#f8f9fa' : result.score > 0 ? '#d4edda' : '#f8d7da',
              border: `2px solid ${result.skipped ? '#dee2e6' : result.score > 0 ? '#28a745' : '#dc3545'}`,
              borderRadius: '10px',
              padding: '15px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ flex: 1 }}>
                  <h4 style={{ margin: '0 0 10px 0', color: '#2c3e50' }}>
                    Soru {index + 1} - {result.question.category}
                  </h4>
                  <p style={{ margin: '0 0 10px 0', fontSize: '14px', color: '#6c757d' }}>
                    {result.question.question}
                  </p>
                  <div style={{ fontSize: '12px', color: '#495057' }}>
                    <strong>Başlıklar ({result.question.answers.length}):</strong>
                    {result.question.answers.map((answer: any, i: number) => (
                      <span key={i} style={{
                        display: 'inline-block',
                        margin: '2px 5px',
                        padding: '2px 8px',
                        borderRadius: '12px',
                        background: result.answeredTitles.includes(answer.title) ? '#28a745' : '#6c757d',
                        color: 'white',
                        fontSize: '11px'
                      }}>
                        {answer.title}
                      </span>
                    ))}
                  </div>
                </div>
                <div style={{ 
                  minWidth: '80px', 
                  textAlign: 'center',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  color: result.skipped ? '#6c757d' : result.score > 0 ? '#28a745' : '#dc3545'
                }}>
                  {result.skipped ? 'GEÇİLDİ' : `${result.score.toFixed(1)}/5.0`}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', display: 'flex', gap: '10px', justifyContent: 'center' }}>
          <button 
            onClick={startMixedExam}
            style={{
              background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)',
              color: 'white',
              border: 'none',
              padding: '15px 30px',
              borderRadius: '25px',
              fontSize: '16px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            🔄 Yeni Karışık Sınav
          </button>
          <button 
            onClick={startNewGame}
            style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              border: 'none',
              padding: '15px 30px',
              borderRadius: '25px',
              fontSize: '16px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            Ana Menüye Dön
          </button>
        </div>
      </div>
    );
  }

  if (isMixedMode && !showMixedResults) {
    const currentQuestion = mixedQuestions[currentMixedIndex];
    const currentResult = mixedResults[currentMixedIndex];
    
    if (!currentQuestion) return null;

    return (
      <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ marginBottom: '20px', textAlign: 'center' }}>
          <h2 style={{ color: '#2c3e50' }}>🎯 Karışık Sınav - Soru {currentMixedIndex + 1}/20</h2>
          <div style={{ background: '#ecf0f1', padding: '10px', borderRadius: '10px', marginBottom: '20px' }}>
            <strong>{currentQuestion.category}</strong> | Puan: {mixedScore.toFixed(1)}/100 | 
            Bu soru: {currentQuestion.pointPerTitle.toFixed(1)} puan/başlık
          </div>
        </div>

        <div style={{ 
          background: 'linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)', 
          color: 'white', 
          padding: '20px', 
          borderRadius: '15px', 
          marginBottom: '20px' 
        }}>
          <h3>{currentQuestion.question}</h3>
          <p style={{ fontSize: '18px', fontWeight: 'bold' }}>
            Bu sorunun başlıklarından birini yazın ({currentQuestion.answers.length} başlık):
          </p>
          <div style={{ fontSize: '14px', marginTop: '10px' }}>
            Cevaplanan: {currentResult.answeredTitles.length}/{currentQuestion.answers.length}
          </div>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSubmitAnswer()}
            placeholder="Başlığı buraya yazın (Türkçe veya İngilizce)"
            style={{
              width: '100%',
              padding: '15px',
              fontSize: '16px',
              border: '2px solid #ddd',
              borderRadius: '10px',
              marginBottom: '10px'
            }}
            disabled={!!feedback}
          />
          <div style={{ display: 'flex', gap: '10px' }}>
            <button 
              onClick={handleSubmitAnswer}
              disabled={!userInput.trim() || !!feedback}
              style={{
                background: userInput.trim() && !feedback ? 'linear-gradient(135deg, #00b894 0%, #00a085 100%)' : '#bdc3c7',
                color: 'white',
                border: 'none',
                padding: '15px 30px',
                borderRadius: '25px',
                fontSize: '16px',
                cursor: userInput.trim() && !feedback ? 'pointer' : 'not-allowed',
                fontWeight: 'bold',
                flex: 1
              }}
            >
              Cevabı Kontrol Et
            </button>
            <button 
              onClick={nextMixedQuestion}
              disabled={!!feedback}
              style={{
                background: !feedback ? 'linear-gradient(135deg, #f39c12 0%, #e67e22 100%)' : '#bdc3c7',
                color: 'white',
                border: 'none',
                padding: '15px 30px',
                borderRadius: '25px',
                fontSize: '16px',
                cursor: !feedback ? 'pointer' : 'not-allowed',
                fontWeight: 'bold'
              }}
            >
              Sonraki Soru
            </button>
          </div>
        </div>

        {feedback && (
          <div style={{ 
            background: feedback.startsWith('✅') ? '#d4edda' : '#f8d7da',
            color: feedback.startsWith('✅') ? '#155724' : '#721c24',
            padding: '15px',
            borderRadius: '10px',
            marginBottom: '20px',
            fontSize: '16px',
            fontWeight: 'bold',
            textAlign: 'center'
          }}>
            {feedback}
          </div>
        )}

        {/* Cevaplanan başlıklar */}
        {currentResult.answeredTitles.length > 0 && (
          <div style={{ 
            background: '#f8f9fa', 
            borderRadius: '15px', 
            padding: '20px', 
            marginBottom: '20px',
            border: '2px solid #28a745'
          }}>
            <h4 style={{ color: '#28a745', marginBottom: '15px', textAlign: 'center' }}>
              ✅ Bu Soruda Doğru Cevaplarınız ({currentResult.answeredTitles.length}/{currentQuestion.answers.length})
            </h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {currentResult.answeredTitles.map((title: string, index: number) => (
                <span key={index} style={{
                  background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)',
                  color: 'white',
                  padding: '8px 15px',
                  borderRadius: '20px',
                  fontSize: '14px',
                  fontWeight: 'bold'
                }}>
                  {title}
                </span>
              ))}
            </div>
          </div>
        )}

        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <button 
            onClick={startNewGame}
            style={{
              background: 'none',
              color: '#e74c3c',
              border: '2px solid #e74c3c',
              padding: '10px 20px',
              borderRadius: '20px',
              cursor: 'pointer'
            }}
          >
            Sınavı Bitir
          </button>
        </div>
      </div>
    );
  }

  if (gameCompleted) {
    const percentage = Math.round((score / totalQuestions) * 100);
    return (
      <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
        <h2 style={{ color: '#2c3e50', textAlign: 'center' }}>🎉 Oyun Tamamlandı!</h2>
        <div style={{ 
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
          color: 'white', 
          padding: '30px', 
          borderRadius: '15px', 
          textAlign: 'center',
          marginBottom: '20px'
        }}>
          <h3>Skorun: {score}/{totalQuestions}</h3>
          <h2>{percentage}%</h2>
          <p>{percentage >= 80 ? '🏆 Mükemmel!' : percentage >= 60 ? '👍 İyi!' : '💪 Daha fazla çalışmalısın!'}</p>
        </div>
        <div style={{ textAlign: 'center' }}>
          <button 
            onClick={startNewGame}
            style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              border: 'none',
              padding: '15px 30px',
              borderRadius: '25px',
              fontSize: '18px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            Yeni Oyun Başlat
          </button>
        </div>
      </div>
    );
  }

  if (selectedCategory && selectedQuestion !== null) {
    const category = examQuestions.find(cat => cat.category === selectedCategory);
    const question = category?.questions[selectedQuestion];

    return (
      <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ marginBottom: '20px', textAlign: 'center' }}>
          <h2 style={{ color: '#2c3e50' }}>{selectedCategory} - Soru {selectedQuestion + 1}</h2>
          <div style={{ background: '#ecf0f1', padding: '10px', borderRadius: '10px', marginBottom: '20px' }}>
            İlerleme: {answeredTitles.length}/{totalQuestions} | Skor: {score}/{answeredTitles.length + (feedback && feedback.startsWith('✅') ? 1 : 0)}
          </div>
        </div>

        <div style={{ 
          background: 'linear-gradient(135deg, #74b9ff 0%, #0984e3 100%)', 
          color: 'white', 
          padding: '20px', 
          borderRadius: '15px', 
          marginBottom: '20px' 
        }}>
          <h3>{question?.question}</h3>
          <p style={{ fontSize: '18px', fontWeight: 'bold' }}>
            Bu sorunun başlıklarından birini yazın (Kalan: {totalQuestions - answeredTitles.length}):
          </p>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSubmitAnswer()}
            placeholder="Başlığı buraya yazın (Türkçe veya İngilizce)"
            style={{
              width: '100%',
              padding: '15px',
              fontSize: '16px',
              border: '2px solid #ddd',
              borderRadius: '10px',
              marginBottom: '10px'
            }}
            disabled={!!feedback}
          />
          <button 
            onClick={handleSubmitAnswer}
            disabled={!userInput.trim() || !!feedback}
            style={{
              background: userInput.trim() && !feedback ? 'linear-gradient(135deg, #00b894 0%, #00a085 100%)' : '#bdc3c7',
              color: 'white',
              border: 'none',
              padding: '15px 30px',
              borderRadius: '25px',
              fontSize: '16px',
              cursor: userInput.trim() && !feedback ? 'pointer' : 'not-allowed',
              fontWeight: 'bold',
              width: '100%'
            }}
          >
            Cevabı Kontrol Et
          </button>
        </div>

        {feedback && (
          <div style={{ 
            background: feedback.startsWith('✅') ? '#d4edda' : '#f8d7da',
            color: feedback.startsWith('✅') ? '#155724' : '#721c24',
            padding: '15px',
            borderRadius: '10px',
            marginBottom: '20px',
            fontSize: '16px',
            fontWeight: 'bold',
            textAlign: 'center'
          }}>
            {feedback}
          </div>
        )}

        {/* DOĞRU CEVAPLANAN BAŞLIKLAR VE DETAYLARI */}
        {answeredDetails.length > 0 && (
          <div style={{ 
            background: '#f8f9fa', 
            borderRadius: '15px', 
            padding: '20px', 
            marginBottom: '20px',
            border: '2px solid #28a745'
          }}>
            <h3 style={{ color: '#28a745', marginBottom: '15px', textAlign: 'center' }}>
              ✅ Doğru Cevaplarınız ({answeredDetails.length}/{totalQuestions})
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {answeredDetails.map((detail, index) => (
                <div key={index} style={{
                  background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)',
                  color: 'white',
                  padding: '15px',
                  borderRadius: '10px',
                  boxShadow: '0 2px 10px rgba(40, 167, 69, 0.3)'
                }}>
                  <h4 style={{ margin: '0 0 10px 0', fontSize: '16px', fontWeight: 'bold' }}>
                    {detail.title}
                  </h4>
                  <p style={{ margin: '0', fontSize: '14px', lineHeight: '1.4', opacity: '0.9' }}>
                    {detail.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <button 
            onClick={startNewGame}
            style={{
              background: 'none',
              color: '#e74c3c',
              border: '2px solid #e74c3c',
              padding: '10px 20px',
              borderRadius: '20px',
              cursor: 'pointer'
            }}
          >
            Oyunu Bitir
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h1 style={{ 
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontSize: '2.5rem',
          fontWeight: 'bold'
        }}>
          🎮 Ezber Oyunu
        </h1>
        <p style={{ fontSize: '18px', color: '#7f8c8d' }}>
          Bir kategori ve soru seçin, başlıkları ezberlemeye başlayın!
        </p>
        
        {/* KARIŞIK SINAV BUTONU */}
        <div style={{ margin: '20px 0' }}>
          <button
            onClick={startMixedExam}
            style={{
              background: 'linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)',
              color: 'white',
              border: 'none',
              padding: '20px 40px',
              borderRadius: '30px',
              fontSize: '20px',
              cursor: 'pointer',
              fontWeight: 'bold',
              boxShadow: '0 4px 15px rgba(231, 76, 60, 0.3)',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(231, 76, 60, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 15px rgba(231, 76, 60, 0.3)';
            }}
          >
            🎯 KARIŞIK SINAV (20 Rastgele Soru)
          </button>
          <p style={{ fontSize: '14px', color: '#7f8c8d', marginTop: '10px' }}>
            Tüm kategorilerden rastgele 20 soru | Her soru 5 puan | 100 puan üzerinden
          </p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
        {examQuestions.map((category, categoryIndex) => (
          <div key={categoryIndex} style={{
            background: 'linear-gradient(135deg, #74b9ff 0%, #0984e3 100%)',
            borderRadius: '15px',
            padding: '20px',
            color: 'white'
          }}>
            <h3 style={{ marginBottom: '15px', fontSize: '1.4rem' }}>{category.category}</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {category.questions.map((question, questionIndex) => (
                <button
                  key={questionIndex}
                  onClick={() => selectCategoryAndQuestion(category.category, questionIndex)}
                  style={{
                    background: 'rgba(255, 255, 255, 0.2)',
                    color: 'white',
                    border: 'none',
                    padding: '12px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    transition: 'all 0.3s ease',
                    textAlign: 'left'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                  }}
                >
                  <strong>Soru {questionIndex + 1}:</strong> {question.answers.length} başlık
                  <br />
                  <small>{question.question.substring(0, 60)}...</small>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function App() {
  return (
    <Router basename="/halesinav">
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/devlet-toplum-din" element={<DevletToplumDinQuizApp />} />
          <Route path="/devlet-toplum-din/notlar" element={<LectureNotes />} />
          <Route path="/international-security/quiz" element={<InternationalSecurityQuizApp />} />
          <Route path="/international-security/notlar" element={<InternationalSecurityNotes />} />
          <Route path="/international-security/sesli-notlar" element={<InternationalSecurityLectureNotes />} />
          <Route path="/international-security/flashcards" element={<FlashcardsApp />} />
          <Route path="/international-security/sinav-sorulari" element={<InternationalSecurityExamQuestions />} />
          <Route path="/international-security/ezber-oyunu" element={<InternationalSecurityMemoryGame />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
