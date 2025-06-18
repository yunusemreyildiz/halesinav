import React, { useState } from 'react';
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

function HomePage() {
  return (
    <div className="home-container">
      <h1>Hale'nin Ders Notları</h1>
      <p>Sevgilim, aşağıdaki derslerden birine tıklayarak o dersin sorularına ulaşabilirsin 💝</p>
      <div className="courses-grid">
        <Link to="/devlet-toplum-din" className="course-card">
          <h2>Devlet, Toplum ve Din</h2>
          <p>Uluslararası İlişkiler bağlamında din ve toplum ilişkisi üzerine sorular.</p>
          <span className="question-count">30 Soru</span>
        </Link>
        {/* Diğer dersler buraya eklenecek */}
      </div>
    </div>
  );
}

function QuizApp() {
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
    return (
      <div className="quiz-container">
        <h2>Quiz Tamamlandı!</h2>
        <p>Toplam Skor: {score} / {questions.length}</p>
        <button onClick={handleRestart}>Yeniden Başla</button>
        <Link to="/" className="home-button">Ana Sayfaya Dön</Link>
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

function App() {
  return (
    <Router basename="/halesinav">
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/devlet-toplum-din" element={<QuizApp />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
