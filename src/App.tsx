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
            <Link to="/international-security/quiz" className="course-card">
              <div className="course-card-content">
                <h2>Quiz</h2>
                <p>Uluslararası güvenlik kavramları ve teorileri üzerine test sorular.</p>
                <div className="course-card-footer">
                  <span className="question-count">20 Soru</span>
                  <span className="start-quiz">Quiz'e Başla →</span>
                </div>
              </div>
            </Link>
            <Link to="/international-security/notlar" className="course-card">
              <div className="course-card-content">
                <h2>Ders Notları</h2>
                <p>Uluslararası güvenlik konularında detaylı kavramsal ve teorik bilgiler.</p>
                <div className="course-card-footer">
                  <span className="notes-count">Kapsamlı Notlar</span>
                  <span className="start-reading">Okumaya Başla →</span>
                </div>
              </div>
            </Link>
            <Link to="/international-security/sesli-notlar" className="course-card">
              <div className="course-card-content">
                <h2>Sesli Anlatım</h2>
                <p>Uluslararası güvenlik konularının sesli anlatımı.</p>
                <div className="course-card-footer">
                  <span className="audio-count">1 Ses Kaydı</span>
                  <span className="start-listening">Dinlemeye Başla →</span>
                </div>
              </div>
            </Link>
            <Link to="/international-security/flashcards" className="course-card">
              <div className="course-card-content">
                <h2>Flashcards</h2>
                <p>Önemli kavramları kart kart çalışmak için interaktif flashcards.</p>
                <div className="course-card-footer">
                  <span className="flashcard-count">50 Kart</span>
                  <span className="start-cards">Kartları Aç →</span>
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
  return (
    <div className="lecture-notes-container international-security-notes">
      <h2>International Security - Ders Notları</h2>
      <p className="section-description">Aşkım, uluslararası güvenlik konusundaki detaylı notların burada 💝</p>
      
      <div className="notes-content">
        <div className="note-section">
          <h3>🌍 Uluslararası Güvenlik: Detaylı Bir Kavramsal ve Teorik Yolculuk</h3>
          <p>
            Uluslararası güvenlik, modern dünyada sadece devletlerin askerî yetenekleriyle sınırlı kalmayan, 
            aksine karmaşık ve çok boyutlu bir olgu haline gelen kritik bir alandır. Günümüzde güvenlik şemsiyesi 
            altına iklim değişikliği, siber saldırılar, küresel göç hareketleri, ekonomik krizler, salgın hastalıklar 
            ve hatta toplumsal kimlik çatışmaları gibi konular da dahil olmuştur.
          </p>
        </div>

        <div className="note-section">
          <h3>🔍 Güvenliğin Tanımı ve Evrimi: Çok Yüzlü Bir Kavram</h3>
          <p>
            "Güvenlik" terimi, "özünde tartışmalı bir kavram" (essentially contested concept) olarak kabul edilir, 
            zira herkes için farklı anlamlar taşır. Barry Buzan, güvenlik kavramının yeterince gelişmemiş olmasının 
            beş temel nedenini şöyle sıralar:
          </p>
          <ul>
            <li><strong>Kavramsal Zorluk:</strong> Güvenliğin geniş kapsamı nedeniyle net bir tanımının yapılamaması</li>
            <li><strong>Güç ile Örtüşme:</strong> Güvenlik ile güç arasındaki yakın ilişki ve sıkça karıştırılması</li>
            <li><strong>Gerçekçi Olmayanların İlgisizliği:</strong> Liberalizm, konstrüktivizm gibi realizm dışı teorilerin uzun süre güvenliğe yeterince odaklanmaması</li>
            <li><strong>Teknoloji ve Politikaya Odaklanma:</strong> Güvenlik tartışmalarının genellikle teknik ve politika düzeyinde kalıp, teorik boyutunun ihmal edilmesi</li>
            <li><strong>Politika Yapıcıların Çıkarları:</strong> Hükümetlerin güvenlik tanımını kendi ulusal çıkarları doğrultusunda şekillendirmesi</li>
          </ul>
        </div>

        <div className="note-section">
          <h3>⚔️ Güvenlik Teorileri: Ana Akım ve Eleştirel Yaklaşımlar</h3>
          
          <h4>🎯 Realizm (Gerçekçilik)</h4>
          <p>
            Realizm, uluslararası ilişkilerdeki en eski ve en etkili teoridir. Temelinde, uluslararası sistemin 
            merkezi bir otoriteden yoksun olduğu (anarşik) ve bu durumun devletleri hayatta kalmak için güç 
            arayışına ittiği varsayımı yatar.
          </p>
          <ul>
            <li><strong>Klasik Realizm:</strong> İnsan doğasının bencil, korkak ve hırslı olduğu varsayımına dayanır</li>
            <li><strong>Yapısal Realizm (Neorealizm):</strong> Kenneth Waltz tarafından geliştirildi, devlet davranışlarını uluslararası sistemin yapısıyla açıklar</li>
            <li><strong>Saldırgan Realizm:</strong> John Mearsheimer'e göre devletler "güç maksimize edicisidir"</li>
            <li><strong>Savunmacı Realizm:</strong> Aşırı güç peşinde koşmanın güvenlik ikilemine yol açtığını savunur</li>
          </ul>

          <h4>🕊️ Liberalizm</h4>
          <p>
            Liberalizm, realizmin karamsar bakış açısının aksine, uluslararası ilişkilerde işbirliği ve barışın 
            mümkün olduğuna dair iyimser bir yaklaşım sunar.
          </p>
          <ul>
            <li><strong>Ticari Liberalizm:</strong> Ekonomik karşılıklı bağımlılığın savaşı maliyetli hale getirdiği</li>
            <li><strong>İnsan Hakları Liberalizmi:</strong> Devletlerin tüm insanlara karşı sorumlulukları olduğu</li>
            <li><strong>Kurumsal Liberalizm:</strong> Uluslararası kurumların işbirliğini kolaylaştırdığı</li>
            <li><strong>Demokratik Barış Teorisi:</strong> Demokrasilerin birbirleriyle savaşmama eğiliminde olduğu</li>
          </ul>
        </div>

        <div className="note-section">
          <h3>🔥 Eleştirel Güvenlik Çalışmaları</h3>
          <p>
            Eleştirel güvenlik çalışmaları, geleneksel, devlet merkezli ve askerî odaklı güvenlik anlayışlarına 
            köklü bir eleştiri getirerek, güvenliği daha kapsayıcı, insani ve sorgulayıcı bir çerçevede ele alır.
          </p>

          <h4>🏛️ Kopenhag Okulu</h4>
          <ul>
            <li><strong>Sektörel Analiz:</strong> Askerî, siyasi, ekonomik, toplumsal ve çevresel olmak üzere beş sektör</li>
            <li><strong>Güvenlikleştirme Teorisi:</strong> Bir konunun "güvenlik tehdidi" haline gelme süreci</li>
          </ul>

          <h4>🎓 Aberystwyth Okulu</h4>
          <ul>
            <li><strong>Özgürleşme:</strong> Güvenliğin temel amacının bireylerin baskılardan kurtulması</li>
            <li><strong>Frankfurt Okulu ve Post-Marksist Teori:</strong> Bilgi üretiminin siyasi olduğu</li>
          </ul>
        </div>

        <div className="note-section">
          <h3>🌱 Küresel Tehditler ve Güvenlik Çerçeveleri</h3>
          
          <h4>👥 İnsan Güvenliği</h4>
          <p>
            Soğuk Savaş sonrası dönemde ortaya çıkan bu kavram, geleneksel devlet merkezli güvenlik anlayışını 
            aşarak bireylerin ve toplulukların güvenliğini ön plana çıkarır.
          </p>
          <ul>
            <li><strong>Korkudan arınma</strong> (freedom from fear)</li>
            <li><strong>Yoksunluktan arınma</strong> (freedom from want)</li>
            <li><strong>Yedi boyut:</strong> Ekonomik, gıda, sağlık, çevresel, kişisel, toplumsal ve siyasi güvenlik</li>
          </ul>

          <h4>🌍 Çevresel Güvenlik</h4>
          <p>
            20. yüzyılın ikinci yarısından itibaren önem kazanan bu alan, çevre kirliliği, doğal kaynakların 
            tükenmesi ve iklim değişikliği gibi çevresel tehditlerin toplumların güvenliğini etkilediğini savunur.
          </p>
        </div>

        <div className="note-section">
          <h3>💰 Ekonomi ve Güvenlik</h3>
          <p>
            Ekonomi, günümüz güvenlik politikalarında kritik bir rol oynar ve artık sadece büyüme ya da üretim değil, 
            bir dış politika ve güvenlik aracı olarak da kullanılır.
          </p>
          <ul>
            <li><strong>Ekonomik Yaptırımlar:</strong> Siyasi amaçlarla normal ekonomik ilişkileri reddetme</li>
            <li><strong>Ticaret ve Güvenlik:</strong> Serbest ticaretin barışı teşvik etmesi</li>
            <li><strong>Finans ve Güvenlik:</strong> Döviz ticareti, dış borçlar, faiz oranları</li>
          </ul>
        </div>

        <div className="note-section">
          <h3>⚡ Uluslararası Kriz ve Kriz Yönetimi</h3>
          <p>
            Uluslararası kriz, iki veya daha fazla aktör arasında, savaş riskinin yüksek olduğu ve hayati çıkarların 
            tehdit edildiği gergin bir dönemdir.
          </p>
          
          <h4>🎯 Kriz Yönetimi Stratejileri</h4>
          <ul>
            <li><strong>Saldırgan Stratejiler:</strong> Şantaj, Geri Alınabilir Yoklama, Kontrollü Baskı</li>
            <li><strong>Savunmacı Stratejiler:</strong> Zorlayıcı Diplomasi, Sınırlı Tırmandırma, Aynıyla Karşılık Verme</li>
          </ul>
        </div>

        <div className="note-section">
          <h3>☢️ Nükleer Silahlar</h3>
          <p>
            Devletlerin nükleer silah edinme isteği veya isteksizliği, karmaşık güvenlik, iç politika ve 
            sosyo-psikolojik faktörlerle ilişkilidir.
          </p>
          
          <h4>✅ Neden İstenir?</h4>
          <ul>
            <li><strong>Güvenlik:</strong> Caydırıcılık (deterrence), MAD prensibi</li>
            <li><strong>Prestij:</strong> Büyük güç statüsü</li>
            <li><strong>İç Politika:</strong> Milliyetçilik, bütçe, ekonomik fayda</li>
          </ul>

          <h4>❌ Neden İstenmez?</h4>
          <ul>
            <li><strong>Güvenlik Riski:</strong> Silahlanma yarışı, önleyici saldırı riski</li>
            <li><strong>Ekonomik Maliyet:</strong> Yüksek geliştirme ve bakım maliyeti</li>
            <li><strong>Normatif:</strong> Ahlaki karşıtlık, nükleer tabu</li>
          </ul>
        </div>

        <div className="note-section">
          <h3>🔥 Etnik Çatışma</h3>
          <p>
            Etnik gruplar arasındaki çatışmalar, modern dünyada uluslararası güvenliğin önemli bir bileşenidir.
          </p>
          
          <h4>🧬 Etnik Kimliğin Kaynağı</h4>
          <ul>
            <li><strong>İlkselcilik:</strong> Doğuştan, değişmez</li>
            <li><strong>Moderncilik:</strong> Ulus-devlet, sanayileşme ile oluşan</li>
            <li><strong>Yapısalcılık:</strong> Sosyal olarak inşa edilen, değişebilir</li>
          </ul>

          <h4>🕊️ Çatışma Çözümü</h4>
          <ul>
            <li><strong>Önleme:</strong> Savaşın çıkmasını engelleme</li>
            <li><strong>Yönetme:</strong> Şiddeti azaltma</li>
            <li><strong>Uzlaşma:</strong> Kalıcı barış ve yeniden çatışmayı engelleme</li>
          </ul>
        </div>

        <div className="note-section">
          <h3>💣 Terörizm</h3>
          <p>
            Terörizm, siyasi amaçlarla şiddet veya şiddet tehdidi kullanarak geniş kitlelerde korku ve panik 
            yaratma eylemleridir.
          </p>
          
          <h4>🎯 Tanım Unsurları</h4>
          <ul>
            <li>Şiddet kullanımı/tehdidi</li>
            <li>Organize grup</li>
            <li>Siyasi amaçlar</li>
            <li>Hedef kitleye yönelik psikolojik etki</li>
            <li>Devlet dışı aktör</li>
            <li>Zayıfların silahı</li>
          </ul>

          <h4>🛡️ Mücadele Stratejileri</h4>
          <ul>
            <li><strong>Önleme:</strong> İstihbarat, fiziksel güvenlik</li>
            <li><strong>Yanıt:</strong> Misilleme, tutuklama, reformlar</li>
            <li><strong>Uluslararası İşbirliği:</strong> İstihbarat paylaşımı, yaptırımlar</li>
          </ul>
        </div>

        <div className="note-section">
          <h3>🏥 Sağlık Güvenliği</h3>
          <p>
            Sağlık güvenliği, bireylerin ve toplumların sağlığını tehdit eden salgın hastalıklar, pandemiler ve 
            biyolojik tehditlere karşı korunmasıdır.
          </p>
          
          <h4>🔗 Sağlık ve Güvenlik Bağlantıları</h4>
          <ul>
            <li><strong>İnsani Güvenlik:</strong> Temel yaşam hakları ve sosyoekonomik refah</li>
            <li><strong>Ulusal Güvenlik:</strong> Nüfus sağlığı, ekonomi, toplumsal istikrar</li>
            <li><strong>Biyo-güvenlik:</strong> Biyolojik ajanların silah olarak kullanılması</li>
          </ul>
        </div>

        <div className="note-section">
          <h3>💻 Siber Güvenlik</h3>
          <p>
            Dijitalleşen dünyada, internet, bilgisayar ağları ve veri sistemlerine yönelik tehditler, uluslararası 
            güvenliğin yeni ve hızla büyüyen bir alanını oluşturur.
          </p>
          
          <h4>⚔️ Saldırı Türleri</h4>
          <ul>
            <li><strong>Bilgi Saldırıları:</strong> Veri çalma, sistem bozma</li>
            <li><strong>Kötü Amaçlı Yazılımlar:</strong> Virüsler, solucanlar, Truva atları</li>
            <li><strong>Hackerlar:</strong> Beyaz, siyah, gri şapkalı</li>
          </ul>

          <h4>🛡️ Güvenlik Söylemleri</h4>
          <ul>
            <li><strong>Teknik Söylem:</strong> Sistemlerin teknik korunması</li>
            <li><strong>Siber Suç:</strong> Kişisel kazanç veya siyasi amaçlar</li>
            <li><strong>Kritik Altyapı:</strong> Elektrik, su, iletişim sistemleri</li>
            <li><strong>Siber Savaş:</strong> Siber saldırıları gerçek savaş biçimi olarak görme</li>
          </ul>
        </div>

        <div className="motivational-footer">
          <p>💝 Aşkım, bu kapsamlı notları okuduktan sonra uluslararası güvenlik konusunda çok daha bilgili oldun! 
          Senin bu konulara olan ilgin ve öğrenme aşkın beni çok mutlu ediyor. Her zaman seninle gurur duyuyorum! 🌟</p>
        </div>
      </div>
      
      <Link to="/" className="home-button">Ana Sayfaya Dön</Link>
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
        </Routes>
      </div>
    </Router>
  );
}

export default App;
