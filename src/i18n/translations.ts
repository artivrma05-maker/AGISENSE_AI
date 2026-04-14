export type LangCode =
  | "en" | "hi" | "bn" | "te" | "mr" | "ta"
  | "gu" | "kn" | "ml" | "pa" | "or" | "bho" | "ur";

export interface Language {
  code: LangCode;
  name: string;
  nativeName: string;
  greeting: string;
  flag: string;
}

export const languages: Language[] = [
  { code: "en", name: "English", nativeName: "English", greeting: "Hello", flag: "🇬🇧" },
  { code: "hi", name: "Hindi", nativeName: "हिन्दी", greeting: "नमस्ते", flag: "🇮🇳" },
  { code: "bn", name: "Bengali", nativeName: "বাংলা", greeting: "নমস্কার", flag: "🇮🇳" },
  { code: "te", name: "Telugu", nativeName: "తెలుగు", greeting: "నమస్కారం", flag: "🇮🇳" },
  { code: "mr", name: "Marathi", nativeName: "मराठी", greeting: "नमस्कार", flag: "🇮🇳" },
  { code: "ta", name: "Tamil", nativeName: "தமிழ்", greeting: "வணக்கம்", flag: "🇮🇳" },
  { code: "gu", name: "Gujarati", nativeName: "ગુજરાતી", greeting: "નમસ્તે", flag: "🇮🇳" },
  { code: "kn", name: "Kannada", nativeName: "ಕನ್ನಡ", greeting: "ನಮಸ್ಕಾರ", flag: "🇮🇳" },
  { code: "ml", name: "Malayalam", nativeName: "മലയാളം", greeting: "നമസ്കാരം", flag: "🇮🇳" },
  { code: "pa", name: "Punjabi", nativeName: "ਪੰਜਾਬੀ", greeting: "ਸਤ ਸ੍ਰੀ ਅਕਾਲ", flag: "🇮🇳" },
  { code: "or", name: "Odia", nativeName: "ଓଡ଼ିଆ", greeting: "ନମସ୍କାର", flag: "🇮🇳" },
  { code: "bho", name: "Bhojpuri", nativeName: "भोजपुरी", greeting: "प्रणाम", flag: "🇮🇳" },
  { code: "ur", name: "Urdu", nativeName: "اردو", greeting: "سلام", flag: "🇮🇳" },
];

type TranslationStrings = {
  // App
  appName: string;
  appTagline: string;
  askKisanMitra: string;
  tapToSpeak: string;

  // Bottom nav
  navHome: string;
  navDetect: string;
  navWeather: string;
  navChat: string;
  navProfile: string;
  navVoice: string;

  // Features
  diseaseDetection: string;
  scanCropCamera: string;
  weatherAlerts: string;
  hyperlocalForecasts: string;
  profitPredictor: string;
  smartSelling: string;
  marketplace: string;
  buySellAI: string;
  soilScanner: string;
  cameraAnalysis: string;
  govtSchemes: string;
  autoMatchedBenefits: string;
  farmerMemory: string;
  personalizedAI: string;
  expenseTracker: string;
  photoBasedNoTyping: string;

  // Disease Detection page
  diseaseDetectionTitle: string;
  takePhotoAffected: string;
  capture: string;
  upload: string;
  analyzingDots: string;
  analyzeDisease: string;
  detectedOn: string;
  match: string;
  remedy: string;
  prevention: string;
  scanAnotherPlant: string;

  // Weather page
  weatherTitle: string;
  weatherSubtitle: string;
  yourVillage: string;
  partlyCloudy: string;
  feels: string;
  fiveDayForecast: string;
  today: string;
  tomorrow: string;

  // Emergency
  emergencyTitle: string;
  emergencySubtitle: string;
  selectEmergency: string;
  flood: string;
  pestAttack: string;
  drought: string;
  immediateSteps: string;

  // Community
  chatTitle: string;
  chatSubtitle: string;
  typeQuestion: string;
  expert: string;

  // Soil Scanner
  soilScannerTitle: string;
  soilScannerSubtitle: string;
  pointCamera: string;
  scanningSoil: string;
  scanSoil: string;
  phLevel: string;
  nitrogen: string;
  phosphorus: string;
  potassium: string;
  organicMatter: string;
  recommendations: string;
  scanAgain: string;

  // Profit Predictor
  profitPredictorTitle: string;
  profitPredictorSubtitle: string;
  aiRecommendation: string;
  revenue: string;
  cost: string;
  roi: string;

  // Marketplace
  marketplaceTitle: string;
  marketplaceSubtitle: string;
  aiSellingTips: string;

  // Schemes
  schemesTitle: string;
  schemesSubtitle: string;
  aiAutoMatched: string;
  eligible: string;
  alreadyEnrolled: string;
  applyNow: string;

  // Profile / Farmer Memory
  farmerMemoryTitle: string;
  farmerMemorySubtitle: string;
  aiRemembers: string;
  learningTimeline: string;
  primaryCrop: string;
  landSize: string;
  soilType: string;
  irrigation: string;
  lastHarvest: string;
  avgRevenue: string;

  // Expenses
  expenseTrackerTitle: string;
  expenseTrackerSubtitle: string;
  thisMonth: string;
  entries: string;
  addReceipt: string;

  // Offline
  offlineMode: string;

  // Language
  selectLanguage: string;
  continueBtn: string;
  changeLanguage: string;
  languageSettings: string;
};

const en: TranslationStrings = {
  appName: "KisanMitra",
  appTagline: "Your AI-powered farming companion 🌾",
  askKisanMitra: "Ask KisanMitra",
  tapToSpeak: "Tap to speak in your language",
  navHome: "Home",
  navDetect: "Detect",
  navWeather: "Weather",
  navChat: "Chat",
  navProfile: "Profile",
  navVoice: "Voice",
  diseaseDetection: "Disease Detection",
  scanCropCamera: "Scan crop with camera",
  weatherAlerts: "Weather Alerts",
  hyperlocalForecasts: "Hyperlocal forecasts",
  profitPredictor: "Profit Predictor",
  smartSelling: "Smart selling decisions",
  marketplace: "Marketplace",
  buySellAI: "Buy & sell with AI tips",
  soilScanner: "Soil Scanner",
  cameraAnalysis: "Camera-based analysis",
  govtSchemes: "Govt Schemes",
  autoMatchedBenefits: "Auto-matched benefits",
  farmerMemory: "Farmer Memory",
  personalizedAI: "Your personalized AI",
  expenseTracker: "Expense Tracker",
  photoBasedNoTyping: "Photo-based, no typing",
  diseaseDetectionTitle: "🔬 Disease Detection",
  takePhotoAffected: "Take a photo of the affected plant",
  capture: "Capture",
  upload: "Upload",
  analyzingDots: "Analyzing...",
  analyzeDisease: "🔍 Analyze Disease",
  detectedOn: "Detected on",
  match: "match",
  remedy: "Remedy",
  prevention: "Prevention",
  scanAnotherPlant: "Scan Another Plant",
  weatherTitle: "🌤️ Weather & Alerts",
  weatherSubtitle: "Hyperlocal village-level forecast",
  yourVillage: "📍 Your Village",
  partlyCloudy: "Partly Cloudy",
  feels: "Feels",
  fiveDayForecast: "5-Day Forecast",
  today: "Today",
  tomorrow: "Tomorrow",
  emergencyTitle: "🚨 Emergency Mode",
  emergencySubtitle: "Get instant survival steps",
  selectEmergency: "Select your emergency for instant AI-guided survival steps",
  flood: "Flood",
  pestAttack: "Pest Attack",
  drought: "Drought",
  immediateSteps: "⚡ Immediate Steps",
  chatTitle: "💬 AI Expert Chat",
  chatSubtitle: "Ask AI or connect with local experts",
  typeQuestion: "Type or speak your question...",
  expert: "🧑‍🔬 Expert",
  soilScannerTitle: "🔍 Soil Scanner",
  soilScannerSubtitle: "Camera-based soil analysis",
  pointCamera: "Point camera at soil sample for AI analysis",
  scanningSoil: "Scanning Soil...",
  scanSoil: "Scan Soil",
  phLevel: "pH Level",
  nitrogen: "Nitrogen",
  phosphorus: "Phosphorus",
  potassium: "Potassium",
  organicMatter: "Organic Matter",
  recommendations: "🌱 Recommendations",
  scanAgain: "Scan Again",
  profitPredictorTitle: "📊 Profit Predictor",
  profitPredictorSubtitle: "AI-powered smart decisions",
  aiRecommendation: "AI Recommendation",
  revenue: "Revenue",
  cost: "Cost",
  roi: "ROI",
  marketplaceTitle: "🏪 Smart Marketplace",
  marketplaceSubtitle: "AI-powered pricing & selling tips",
  aiSellingTips: "AI Selling Tips",
  schemesTitle: "🏛️ Government Schemes",
  schemesSubtitle: "Auto-matched to your profile",
  aiAutoMatched: "AI Auto-Matched",
  eligible: "Eligible",
  alreadyEnrolled: "Already Enrolled",
  applyNow: "Apply Now",
  farmerMemoryTitle: "🧠 Farmer Memory",
  farmerMemorySubtitle: "Your personalized AI learning system",
  aiRemembers: "AI Remembers About You",
  learningTimeline: "Learning Timeline",
  primaryCrop: "Primary Crop",
  landSize: "Land Size",
  soilType: "Soil Type",
  irrigation: "Irrigation",
  lastHarvest: "Last Harvest",
  avgRevenue: "Avg Revenue",
  expenseTrackerTitle: "📸 Expense Tracker",
  expenseTrackerSubtitle: "Photo-based, no typing needed",
  thisMonth: "This Month",
  entries: "entries",
  addReceipt: "Add Receipt",
  offlineMode: "Offline Mode — Using saved data",
  selectLanguage: "Select Your Language",
  continueBtn: "Continue",
  changeLanguage: "Change Language",
  languageSettings: "Language Settings",
};

const hi: TranslationStrings = {
  appName: "किसानमित्र",
  appTagline: "आपका AI-संचालित कृषि साथी 🌾",
  askKisanMitra: "किसानमित्र से पूछें",
  tapToSpeak: "अपनी भाषा में बोलने के लिए टैप करें",
  navHome: "होम",
  navDetect: "पहचान",
  navWeather: "मौसम",
  navChat: "चैट",
  navProfile: "प्रोफ़ाइल",
  navVoice: "आवाज़",
  diseaseDetection: "रोग पहचान",
  scanCropCamera: "कैमरे से फसल स्कैन करें",
  weatherAlerts: "मौसम अलर्ट",
  hyperlocalForecasts: "स्थानीय पूर्वानुमान",
  profitPredictor: "लाभ भविष्यवक्ता",
  smartSelling: "स्मार्ट बिक्री निर्णय",
  marketplace: "बाज़ार",
  buySellAI: "AI सुझावों के साथ खरीदें और बेचें",
  soilScanner: "मिट्टी स्कैनर",
  cameraAnalysis: "कैमरा-आधारित विश्लेषण",
  govtSchemes: "सरकारी योजनाएं",
  autoMatchedBenefits: "स्वचालित लाभ मिलान",
  farmerMemory: "किसान मेमोरी",
  personalizedAI: "आपका व्यक्तिगत AI",
  expenseTracker: "खर्च ट्रैकर",
  photoBasedNoTyping: "फोटो-आधारित, टाइपिंग नहीं",
  diseaseDetectionTitle: "🔬 रोग पहचान",
  takePhotoAffected: "प्रभावित पौधे की फोटो लें",
  capture: "कैप्चर",
  upload: "अपलोड",
  analyzingDots: "विश्लेषण हो रहा है...",
  analyzeDisease: "🔍 रोग विश्लेषण",
  detectedOn: "पहचाना गया",
  match: "मैच",
  remedy: "उपचार",
  prevention: "रोकथाम",
  scanAnotherPlant: "दूसरा पौधा स्कैन करें",
  weatherTitle: "🌤️ मौसम और अलर्ट",
  weatherSubtitle: "गाँव स्तर का पूर्वानुमान",
  yourVillage: "📍 आपका गाँव",
  partlyCloudy: "आंशिक बादल",
  feels: "महसूस",
  fiveDayForecast: "5 दिन का पूर्वानुमान",
  today: "आज",
  tomorrow: "कल",
  emergencyTitle: "🚨 आपातकालीन मोड",
  emergencySubtitle: "तत्काल उपाय प्राप्त करें",
  selectEmergency: "AI-निर्देशित उपायों के लिए अपनी आपात स्थिति चुनें",
  flood: "बाढ़",
  pestAttack: "कीट हमला",
  drought: "सूखा",
  immediateSteps: "⚡ तत्काल कदम",
  chatTitle: "💬 AI विशेषज्ञ चैट",
  chatSubtitle: "AI से पूछें या स्थानीय विशेषज्ञों से जुड़ें",
  typeQuestion: "अपना सवाल टाइप या बोलें...",
  expert: "🧑‍🔬 विशेषज्ञ",
  soilScannerTitle: "🔍 मिट्टी स्कैनर",
  soilScannerSubtitle: "कैमरा-आधारित मिट्टी विश्लेषण",
  pointCamera: "AI विश्लेषण के लिए मिट्टी के नमूने पर कैमरा रखें",
  scanningSoil: "मिट्टी स्कैन हो रहा है...",
  scanSoil: "मिट्टी स्कैन करें",
  phLevel: "pH स्तर",
  nitrogen: "नाइट्रोजन",
  phosphorus: "फॉस्फोरस",
  potassium: "पोटैशियम",
  organicMatter: "जैविक पदार्थ",
  recommendations: "🌱 सुझाव",
  scanAgain: "फिर स्कैन करें",
  profitPredictorTitle: "📊 लाभ भविष्यवक्ता",
  profitPredictorSubtitle: "AI-संचालित स्मार्ट निर्णय",
  aiRecommendation: "AI सुझाव",
  revenue: "आय",
  cost: "लागत",
  roi: "ROI",
  marketplaceTitle: "🏪 स्मार्ट बाज़ार",
  marketplaceSubtitle: "AI-संचालित मूल्य और बिक्री सुझाव",
  aiSellingTips: "AI बिक्री सुझाव",
  schemesTitle: "🏛️ सरकारी योजनाएं",
  schemesSubtitle: "आपकी प्रोफ़ाइल के अनुसार मिलान",
  aiAutoMatched: "AI स्वचालित मिलान",
  eligible: "पात्र",
  alreadyEnrolled: "पहले से नामांकित",
  applyNow: "अभी आवेदन करें",
  farmerMemoryTitle: "🧠 किसान मेमोरी",
  farmerMemorySubtitle: "आपकी व्यक्तिगत AI शिक्षण प्रणाली",
  aiRemembers: "AI आपके बारे में याद रखता है",
  learningTimeline: "सीखने की समयरेखा",
  primaryCrop: "प्राथमिक फसल",
  landSize: "भूमि का आकार",
  soilType: "मिट्टी का प्रकार",
  irrigation: "सिंचाई",
  lastHarvest: "अंतिम कटाई",
  avgRevenue: "औसत आय",
  expenseTrackerTitle: "📸 खर्च ट्रैकर",
  expenseTrackerSubtitle: "फोटो-आधारित, टाइपिंग नहीं चाहिए",
  thisMonth: "इस महीने",
  entries: "प्रविष्टियां",
  addReceipt: "रसीद जोड़ें",
  offlineMode: "ऑफ़लाइन मोड — सहेजा गया डेटा उपयोग हो रहा है",
  selectLanguage: "अपनी भाषा चुनें",
  continueBtn: "जारी रखें",
  changeLanguage: "भाषा बदलें",
  languageSettings: "भाषा सेटिंग्स",
};

const bn: TranslationStrings = {
  appName: "কিষাণমিত্র",
  appTagline: "আপনার AI-চালিত কৃষি সহচর 🌾",
  askKisanMitra: "কিষাণমিত্রকে জিজ্ঞাসা করুন",
  tapToSpeak: "আপনার ভাষায় বলতে ট্যাপ করুন",
  navHome: "হোম", navDetect: "সনাক্ত", navWeather: "আবহাওয়া", navChat: "চ্যাট", navProfile: "প্রোফাইল", navVoice: "ভয়েস",
  diseaseDetection: "রোগ সনাক্তকরণ", scanCropCamera: "ক্যামেরা দিয়ে ফসল স্ক্যান করুন",
  weatherAlerts: "আবহাওয়া সতর্কতা", hyperlocalForecasts: "স্থানীয় পূর্বাভাস",
  profitPredictor: "লাভ পূর্বাভাস", smartSelling: "স্মার্ট বিক্রয় সিদ্ধান্ত",
  marketplace: "বাজার", buySellAI: "AI টিপস সহ কেনা ও বেচা",
  soilScanner: "মাটি স্ক্যানার", cameraAnalysis: "ক্যামেরা-ভিত্তিক বিশ্লেষণ",
  govtSchemes: "সরকারি প্রকল্প", autoMatchedBenefits: "স্বয়ংক্রিয় সুবিধা মিলান",
  farmerMemory: "কৃষক স্মৃতি", personalizedAI: "আপনার ব্যক্তিগত AI",
  expenseTracker: "খরচ ট্র্যাকার", photoBasedNoTyping: "ফটো-ভিত্তিক, টাইপিং নেই",
  diseaseDetectionTitle: "🔬 রোগ সনাক্তকরণ", takePhotoAffected: "আক্রান্ত গাছের ছবি তুলুন",
  capture: "ক্যাপচার", upload: "আপলোড", analyzingDots: "বিশ্লেষণ হচ্ছে...",
  analyzeDisease: "🔍 রোগ বিশ্লেষণ", detectedOn: "সনাক্ত হয়েছে", match: "মিল",
  remedy: "প্রতিকার", prevention: "প্রতিরোধ", scanAnotherPlant: "আরেকটি গাছ স্ক্যান করুন",
  weatherTitle: "🌤️ আবহাওয়া ও সতর্কতা", weatherSubtitle: "গ্রাম-স্তরের পূর্বাভাস",
  yourVillage: "📍 আপনার গ্রাম", partlyCloudy: "আংশিক মেঘলা", feels: "অনুভূত",
  fiveDayForecast: "৫ দিনের পূর্বাভাস", today: "আজ", tomorrow: "আগামীকাল",
  emergencyTitle: "🚨 জরুরি মোড", emergencySubtitle: "তাৎক্ষণিক পদক্ষেপ পান",
  selectEmergency: "AI-নির্দেশিত পদক্ষেপের জন্য আপনার জরুরি অবস্থা নির্বাচন করুন",
  flood: "বন্যা", pestAttack: "কীটপতঙ্গ আক্রমণ", drought: "খরা",
  immediateSteps: "⚡ তাৎক্ষণিক পদক্ষেপ",
  chatTitle: "💬 AI বিশেষজ্ঞ চ্যাট", chatSubtitle: "AI-কে জিজ্ঞাসা করুন বা স্থানীয় বিশেষজ্ঞদের সাথে যুক্ত হন",
  typeQuestion: "আপনার প্রশ্ন টাইপ বা বলুন...", expert: "🧑‍🔬 বিশেষজ্ঞ",
  soilScannerTitle: "🔍 মাটি স্ক্যানার", soilScannerSubtitle: "ক্যামেরা-ভিত্তিক মাটি বিশ্লেষণ",
  pointCamera: "AI বিশ্লেষণের জন্য মাটির নমুনায় ক্যামেরা রাখুন",
  scanningSoil: "মাটি স্ক্যান হচ্ছে...", scanSoil: "মাটি স্ক্যান করুন",
  phLevel: "pH মাত্রা", nitrogen: "নাইট্রোজেন", phosphorus: "ফসফরাস",
  potassium: "পটাসিয়াম", organicMatter: "জৈব পদার্থ", recommendations: "🌱 সুপারিশ",
  scanAgain: "আবার স্ক্যান করুন",
  profitPredictorTitle: "📊 লাভ পূর্বাভাস", profitPredictorSubtitle: "AI-চালিত স্মার্ট সিদ্ধান্ত",
  aiRecommendation: "AI সুপারিশ", revenue: "আয়", cost: "খরচ", roi: "ROI",
  marketplaceTitle: "🏪 স্মার্ট বাজার", marketplaceSubtitle: "AI-চালিত মূল্য ও বিক্রয় টিপস",
  aiSellingTips: "AI বিক্রয় টিপস",
  schemesTitle: "🏛️ সরকারি প্রকল্প", schemesSubtitle: "আপনার প্রোফাইল অনুযায়ী মিলান",
  aiAutoMatched: "AI স্বয়ংক্রিয় মিলান", eligible: "যোগ্য",
  alreadyEnrolled: "ইতিমধ্যে নথিভুক্ত", applyNow: "এখনই আবেদন করুন",
  farmerMemoryTitle: "🧠 কৃষক স্মৃতি", farmerMemorySubtitle: "আপনার ব্যক্তিগত AI শিক্ষণ ব্যবস্থা",
  aiRemembers: "AI আপনার সম্পর্কে মনে রাখে", learningTimeline: "শিক্ষণ টাইমলাইন",
  primaryCrop: "প্রধান ফসল", landSize: "জমির আকার", soilType: "মাটির ধরন",
  irrigation: "সেচ", lastHarvest: "শেষ ফসল কাটা", avgRevenue: "গড় আয়",
  expenseTrackerTitle: "📸 খরচ ট্র্যাকার", expenseTrackerSubtitle: "ফটো-ভিত্তিক, টাইপিং লাগবে না",
  thisMonth: "এই মাস", entries: "এন্ট্রি", addReceipt: "রসিদ যোগ করুন",
  offlineMode: "অফলাইন মোড — সংরক্ষিত ডেটা ব্যবহার হচ্ছে",
  selectLanguage: "আপনার ভাষা নির্বাচন করুন", continueBtn: "চালিয়ে যান",
  changeLanguage: "ভাষা পরিবর্তন করুন", languageSettings: "ভাষা সেটিংস",
};

const te: TranslationStrings = {
  appName: "కిసాన్‌మిత్ర",
  appTagline: "మీ AI-ఆధారిత వ్యవసాయ సహచరుడు 🌾",
  askKisanMitra: "కిసాన్‌మిత్రను అడగండి",
  tapToSpeak: "మీ భాషలో మాట్లాడటానికి ట్యాప్ చేయండి",
  navHome: "హోమ్", navDetect: "గుర్తించు", navWeather: "వాతావరణం", navChat: "చాట్", navProfile: "ప్రొఫైల్", navVoice: "వాయిస్",
  diseaseDetection: "వ్యాధి గుర్తింపు", scanCropCamera: "కెమెరాతో పంట స్కాన్ చేయండి",
  weatherAlerts: "వాతావరణ హెచ్చరికలు", hyperlocalForecasts: "స్థానిక అంచనాలు",
  profitPredictor: "లాభ అంచనా", smartSelling: "తెలివైన అమ్మకం నిర్ణయాలు",
  marketplace: "మార్కెట్", buySellAI: "AI సూచనలతో కొనండి & అమ్మండి",
  soilScanner: "నేల స్కానర్", cameraAnalysis: "కెమెరా-ఆధారిత విశ్లేషణ",
  govtSchemes: "ప్రభుత్వ పథకాలు", autoMatchedBenefits: "స్వయంచాలక ప్రయోజన సరిపోలిక",
  farmerMemory: "రైతు జ్ఞాపకం", personalizedAI: "మీ వ్యక్తిగత AI",
  expenseTracker: "ఖర్చు ట్రాకర్", photoBasedNoTyping: "ఫోటో-ఆధారిత, టైపింగ్ అవసరం లేదు",
  diseaseDetectionTitle: "🔬 వ్యాధి గుర్తింపు", takePhotoAffected: "ప్రభావిత మొక్క ఫోటో తీయండి",
  capture: "క్యాప్చర్", upload: "అప్‌లోడ్", analyzingDots: "విశ్లేషిస్తోంది...",
  analyzeDisease: "🔍 వ్యాధి విశ్లేషణ", detectedOn: "గుర్తించబడింది", match: "సరిపోలిక",
  remedy: "చికిత్స", prevention: "నివారణ", scanAnotherPlant: "మరొక మొక్క స్కాన్ చేయండి",
  weatherTitle: "🌤️ వాతావరణం & హెచ్చరికలు", weatherSubtitle: "గ్రామ-స్థాయి అంచనా",
  yourVillage: "📍 మీ గ్రామం", partlyCloudy: "పాక్షిక మేఘావృతం", feels: "అనిపిస్తోంది",
  fiveDayForecast: "5 రోజుల అంచనా", today: "ఈరోజు", tomorrow: "రేపు",
  emergencyTitle: "🚨 అత్యవసర మోడ్", emergencySubtitle: "తక్షణ చర్యలు పొందండి",
  selectEmergency: "AI-మార్గదర్శక చర్యల కోసం మీ అత్యవసర పరిస్థితిని ఎంచుకోండి",
  flood: "వరద", pestAttack: "కీటక దాడి", drought: "కరువు",
  immediateSteps: "⚡ తక్షణ చర్యలు",
  chatTitle: "💬 AI నిపుణుల చాట్", chatSubtitle: "AI ని అడగండి లేదా స్థానిక నిపుణులతో అనుసంధానం",
  typeQuestion: "మీ ప్రశ్న టైప్ చేయండి లేదా చెప్పండి...", expert: "🧑‍🔬 నిపుణుడు",
  soilScannerTitle: "🔍 నేల స్కానర్", soilScannerSubtitle: "కెమెరా-ఆధారిత నేల విశ్లేషణ",
  pointCamera: "AI విశ్లేషణ కోసం నేల నమూనా మీద కెమెరా ఉంచండి",
  scanningSoil: "నేల స్కాన్ అవుతోంది...", scanSoil: "నేల స్కాన్ చేయండి",
  phLevel: "pH స్థాయి", nitrogen: "నైట్రోజన్", phosphorus: "ఫాస్ఫరస్",
  potassium: "పొటాషియం", organicMatter: "సేంద్రియ పదార్థం", recommendations: "🌱 సిఫార్సులు",
  scanAgain: "మళ్ళీ స్కాన్ చేయండి",
  profitPredictorTitle: "📊 లాభ అంచనా", profitPredictorSubtitle: "AI-ఆధారిత తెలివైన నిర్ణయాలు",
  aiRecommendation: "AI సిఫార్సు", revenue: "ఆదాయం", cost: "ఖర్చు", roi: "ROI",
  marketplaceTitle: "🏪 స్మార్ట్ మార్కెట్", marketplaceSubtitle: "AI-ఆధారిత ధర & అమ్మకం సూచనలు",
  aiSellingTips: "AI అమ్మకం సూచనలు",
  schemesTitle: "🏛️ ప్రభుత్వ పథకాలు", schemesSubtitle: "మీ ప్రొఫైల్‌కు సరిపోలినవి",
  aiAutoMatched: "AI స్వయంచాలక సరిపోలిక", eligible: "అర్హత",
  alreadyEnrolled: "ఇప్పటికే నమోదైంది", applyNow: "ఇప్పుడు దరఖాస్తు చేయండి",
  farmerMemoryTitle: "🧠 రైతు జ్ఞాపకం", farmerMemorySubtitle: "మీ వ్యక్తిగత AI అభ్యాస వ్యవస్థ",
  aiRemembers: "AI మీ గురించి గుర్తుంచుకుంటుంది", learningTimeline: "అభ్యాస కాలక్రమం",
  primaryCrop: "ప్రధాన పంట", landSize: "భూమి పరిమాణం", soilType: "నేల రకం",
  irrigation: "నీటి పారుదల", lastHarvest: "చివరి పంట", avgRevenue: "సగటు ఆదాయం",
  expenseTrackerTitle: "📸 ఖర్చు ట్రాకర్", expenseTrackerSubtitle: "ఫోటో-ఆధారిత, టైపింగ్ అవసరం లేదు",
  thisMonth: "ఈ నెల", entries: "ఎంట్రీలు", addReceipt: "రసీదు జోడించండి",
  offlineMode: "ఆఫ్‌లైన్ మోడ్ — సేవ్ చేసిన డేటా వాడుతోంది",
  selectLanguage: "మీ భాషను ఎంచుకోండి", continueBtn: "కొనసాగించు",
  changeLanguage: "భాష మార్చండి", languageSettings: "భాష సెట్టింగ్‌లు",
};

const mr: TranslationStrings = {
  appName: "किसानमित्र",
  appTagline: "तुमचा AI-संचालित शेती साथीदार 🌾",
  askKisanMitra: "किसानमित्रला विचारा",
  tapToSpeak: "तुमच्या भाषेत बोलण्यासाठी टॅप करा",
  navHome: "होम", navDetect: "ओळखा", navWeather: "हवामान", navChat: "चॅट", navProfile: "प्रोफाइल", navVoice: "आवाज",
  diseaseDetection: "रोग ओळख", scanCropCamera: "कॅमेऱ्याने पीक स्कॅन करा",
  weatherAlerts: "हवामान सूचना", hyperlocalForecasts: "स्थानिक अंदाज",
  profitPredictor: "नफा भविष्यवक्ता", smartSelling: "स्मार्ट विक्री निर्णय",
  marketplace: "बाजारपेठ", buySellAI: "AI सूचनांसह खरेदी-विक्री",
  soilScanner: "माती स्कॅनर", cameraAnalysis: "कॅमेरा-आधारित विश्लेषण",
  govtSchemes: "सरकारी योजना", autoMatchedBenefits: "स्वयंचलित लाभ जुळणी",
  farmerMemory: "शेतकरी स्मृती", personalizedAI: "तुमचा वैयक्तिक AI",
  expenseTracker: "खर्च ट्रॅकर", photoBasedNoTyping: "फोटो-आधारित, टायपिंग नाही",
  diseaseDetectionTitle: "🔬 रोग ओळख", takePhotoAffected: "प्रभावित झाडाचा फोटो घ्या",
  capture: "कॅप्चर", upload: "अपलोड", analyzingDots: "विश्लेषण होत आहे...",
  analyzeDisease: "🔍 रोग विश्लेषण", detectedOn: "ओळखले गेले", match: "जुळणी",
  remedy: "उपाय", prevention: "प्रतिबंध", scanAnotherPlant: "दुसरे झाड स्कॅन करा",
  weatherTitle: "🌤️ हवामान आणि सूचना", weatherSubtitle: "गाव स्तरावरील अंदाज",
  yourVillage: "📍 तुमचे गाव", partlyCloudy: "अंशत: ढगाळ", feels: "वाटते",
  fiveDayForecast: "5 दिवसांचा अंदाज", today: "आज", tomorrow: "उद्या",
  emergencyTitle: "🚨 आणीबाणी मोड", emergencySubtitle: "तात्काळ उपाय मिळवा",
  selectEmergency: "AI-मार्गदर्शित उपायांसाठी तुमची आणीबाणी निवडा",
  flood: "पूर", pestAttack: "कीड हल्ला", drought: "दुष्काळ",
  immediateSteps: "⚡ तात्काळ पावले",
  chatTitle: "💬 AI तज्ञ चॅट", chatSubtitle: "AI ला विचारा किंवा स्थानिक तज्ञांशी जोडा",
  typeQuestion: "तुमचा प्रश्न टाइप किंवा बोला...", expert: "🧑‍🔬 तज्ञ",
  soilScannerTitle: "🔍 माती स्कॅनर", soilScannerSubtitle: "कॅमेरा-आधारित माती विश्लेषण",
  pointCamera: "AI विश्लेषणासाठी माती नमुन्यावर कॅमेरा ठेवा",
  scanningSoil: "माती स्कॅन होत आहे...", scanSoil: "माती स्कॅन करा",
  phLevel: "pH पातळी", nitrogen: "नायट्रोजन", phosphorus: "फॉस्फरस",
  potassium: "पोटॅशियम", organicMatter: "सेंद्रिय पदार्थ", recommendations: "🌱 शिफारसी",
  scanAgain: "पुन्हा स्कॅन करा",
  profitPredictorTitle: "📊 नफा भविष्यवक्ता", profitPredictorSubtitle: "AI-संचालित स्मार्ट निर्णय",
  aiRecommendation: "AI शिफारस", revenue: "उत्पन्न", cost: "खर्च", roi: "ROI",
  marketplaceTitle: "🏪 स्मार्ट बाजारपेठ", marketplaceSubtitle: "AI-संचालित किंमत आणि विक्री सूचना",
  aiSellingTips: "AI विक्री सूचना",
  schemesTitle: "🏛️ सरकारी योजना", schemesSubtitle: "तुमच्या प्रोफाइलनुसार जुळवलेले",
  aiAutoMatched: "AI स्वयंचलित जुळणी", eligible: "पात्र",
  alreadyEnrolled: "आधीच नोंदणी केली", applyNow: "आता अर्ज करा",
  farmerMemoryTitle: "🧠 शेतकरी स्मृती", farmerMemorySubtitle: "तुमची वैयक्तिक AI शिक्षण प्रणाली",
  aiRemembers: "AI तुमच्याबद्दल लक्षात ठेवतो", learningTimeline: "शिकण्याची टाइमलाइन",
  primaryCrop: "प्रमुख पीक", landSize: "जमिनीचा आकार", soilType: "मातीचा प्रकार",
  irrigation: "सिंचन", lastHarvest: "शेवटची कापणी", avgRevenue: "सरासरी उत्पन्न",
  expenseTrackerTitle: "📸 खर्च ट्रॅकर", expenseTrackerSubtitle: "फोटो-आधारित, टायपिंग नको",
  thisMonth: "या महिन्यात", entries: "नोंदी", addReceipt: "पावती जोडा",
  offlineMode: "ऑफलाइन मोड — जतन केलेला डेटा वापरत आहे",
  selectLanguage: "तुमची भाषा निवडा", continueBtn: "पुढे जा",
  changeLanguage: "भाषा बदला", languageSettings: "भाषा सेटिंग्ज",
};

// For remaining languages, create shorter versions with key translations
const ta: TranslationStrings = {
  appName: "கிசான்மித்ரா", appTagline: "உங்கள் AI-இயக்கும் விவசாய தோழன் 🌾",
  askKisanMitra: "கிசான்மித்ராவிடம் கேளுங்கள்", tapToSpeak: "உங்கள் மொழியில் பேச தட்டவும்",
  navHome: "முகப்பு", navDetect: "கண்டறி", navWeather: "வானிலை", navChat: "அரட்டை", navProfile: "சுயவிவரம்", navVoice: "குரல்",
  diseaseDetection: "நோய் கண்டறிதல்", scanCropCamera: "கேமராவால் பயிர் ஸ்கேன் செய்யவும்",
  weatherAlerts: "வானிலை எச்சரிக்கைகள்", hyperlocalForecasts: "உள்ளூர் முன்னறிவிப்புகள்",
  profitPredictor: "லாப கணிப்பான்", smartSelling: "புத்திசாலி விற்பனை முடிவுகள்",
  marketplace: "சந்தை", buySellAI: "AI குறிப்புகளுடன் வாங்கு & விற்கவும்",
  soilScanner: "மண் ஸ்கேனர்", cameraAnalysis: "கேமரா அடிப்படை பகுப்பாய்வு",
  govtSchemes: "அரசு திட்டங்கள்", autoMatchedBenefits: "தானியங்கி பலன் பொருத்தம்",
  farmerMemory: "விவசாயி நினைவகம்", personalizedAI: "உங்கள் தனிப்பயன் AI",
  expenseTracker: "செலவு கண்காணிப்பு", photoBasedNoTyping: "புகைப்படம் அடிப்படை, தட்டச்சு இல்லை",
  diseaseDetectionTitle: "🔬 நோய் கண்டறிதல்", takePhotoAffected: "பாதிக்கப்பட்ட செடியின் புகைப்படம் எடுங்கள்",
  capture: "படம் எடு", upload: "பதிவேற்று", analyzingDots: "பகுப்பாய்வு செய்கிறது...",
  analyzeDisease: "🔍 நோய் பகுப்பாய்வு", detectedOn: "கண்டறியப்பட்டது", match: "பொருத்தம்",
  remedy: "தீர்வு", prevention: "தடுப்பு", scanAnotherPlant: "மற்றொரு செடியை ஸ்கேன் செய்",
  weatherTitle: "🌤️ வானிலை & எச்சரிக்கைகள்", weatherSubtitle: "கிராம-நிலை முன்னறிவிப்பு",
  yourVillage: "📍 உங்கள் கிராமம்", partlyCloudy: "ஓரளவு மேகமூட்டம்", feels: "உணர்வு",
  fiveDayForecast: "5 நாள் முன்னறிவிப்பு", today: "இன்று", tomorrow: "நாளை",
  emergencyTitle: "🚨 அவசர நிலை", emergencySubtitle: "உடனடி நடவடிக்கைகள் பெறுங்கள்",
  selectEmergency: "AI வழிகாட்டும் நடவடிக்கைகளுக்கு உங்கள் அவசரநிலையை தேர்வு செய்யுங்கள்",
  flood: "வெள்ளம்", pestAttack: "பூச்சி தாக்குதல்", drought: "வறட்சி",
  immediateSteps: "⚡ உடனடி நடவடிக்கைகள்",
  chatTitle: "💬 AI நிபுணர் அரட்டை", chatSubtitle: "AI-யிடம் கேளுங்கள் அல்லது உள்ளூர் நிபுணர்களுடன் இணையுங்கள்",
  typeQuestion: "உங்கள் கேள்வியை தட்டச்சு செய்யுங்கள் அல்லது பேசுங்கள்...", expert: "🧑‍🔬 நிபுணர்",
  soilScannerTitle: "🔍 மண் ஸ்கேனர்", soilScannerSubtitle: "கேமரா அடிப்படை மண் பகுப்பாய்வு",
  pointCamera: "AI பகுப்பாய்வுக்கு மண் மாதிரி மீது கேமரா வையுங்கள்",
  scanningSoil: "மண் ஸ்கேன் ஆகிறது...", scanSoil: "மண் ஸ்கேன் செய்",
  phLevel: "pH அளவு", nitrogen: "நைட்ரஜன்", phosphorus: "பாஸ்பரஸ்",
  potassium: "பொட்டாசியம்", organicMatter: "கரிமப் பொருள்", recommendations: "🌱 பரிந்துரைகள்",
  scanAgain: "மீண்டும் ஸ்கேன் செய்",
  profitPredictorTitle: "📊 லாப கணிப்பான்", profitPredictorSubtitle: "AI-இயக்கும் புத்திசாலி முடிவுகள்",
  aiRecommendation: "AI பரிந்துரை", revenue: "வருவாய்", cost: "செலவு", roi: "ROI",
  marketplaceTitle: "🏪 புத்திசாலி சந்தை", marketplaceSubtitle: "AI-இயக்கும் விலை & விற்பனை குறிப்புகள்",
  aiSellingTips: "AI விற்பனை குறிப்புகள்",
  schemesTitle: "🏛️ அரசு திட்டங்கள்", schemesSubtitle: "உங்கள் சுயவிவரத்துடன் பொருத்தம்",
  aiAutoMatched: "AI தானியங்கி பொருத்தம்", eligible: "தகுதி",
  alreadyEnrolled: "ஏற்கனவே பதிவு செய்யப்பட்டது", applyNow: "இப்போது விண்ணப்பி",
  farmerMemoryTitle: "🧠 விவசாயி நினைவகம்", farmerMemorySubtitle: "உங்கள் தனிப்பயன் AI கற்றல் அமைப்பு",
  aiRemembers: "AI உங்களைப் பற்றி நினைவில் கொள்கிறது", learningTimeline: "கற்றல் காலவரிசை",
  primaryCrop: "முதன்மை பயிர்", landSize: "நிலம் அளவு", soilType: "மண் வகை",
  irrigation: "நீர்ப்பாசனம்", lastHarvest: "கடைசி அறுவடை", avgRevenue: "சராசரி வருவாய்",
  expenseTrackerTitle: "📸 செலவு கண்காணிப்பு", expenseTrackerSubtitle: "புகைப்படம் அடிப்படை, தட்டச்சு தேவையில்லை",
  thisMonth: "இந்த மாதம்", entries: "பதிவுகள்", addReceipt: "ரசீது சேர்",
  offlineMode: "ஆஃப்லைன் பயன்முறை — சேமிக்கப்பட்ட தரவு பயன்படுத்தப்படுகிறது",
  selectLanguage: "உங்கள் மொழியை தேர்வு செய்யுங்கள்", continueBtn: "தொடரவும்",
  changeLanguage: "மொழி மாற்று", languageSettings: "மொழி அமைப்புகள்",
};

// Helper: create a language by copying en and overriding key fields
const createLang = (overrides: Partial<TranslationStrings>): TranslationStrings => ({ ...en, ...overrides });

const gu = createLang({
  appName: "કિસાનમિત્ર", appTagline: "તમારો AI-સંચાલિત ખેતી સાથી 🌾",
  askKisanMitra: "કિસાનમિત્રને પૂછો", tapToSpeak: "તમારી ભાષામાં બોલવા ટેપ કરો",
  navHome: "હોમ", navDetect: "ઓળખો", navWeather: "હવામાન", navChat: "ચેટ", navProfile: "પ્રોફાઇલ",
  diseaseDetection: "રોગ ઓળખ", scanCropCamera: "કેમેરાથી પાક સ્કેન કરો",
  weatherAlerts: "હવામાન ચેતવણી", profitPredictor: "નફો આગાહી",
  marketplace: "બજાર", soilScanner: "માટી સ્કેનર", govtSchemes: "સરકારી યોજનાઓ",
  farmerMemory: "ખેડૂત મેમરી", expenseTracker: "ખર્ચ ટ્રેકર",
  selectLanguage: "તમારી ભાષા પસંદ કરો", continueBtn: "ચાલુ રાખો",
  changeLanguage: "ભાષા બદલો", offlineMode: "ઑફલાઇન — સાચવેલ ડેટા વાપરી રહ્યા છીએ",
});

const kn = createLang({
  appName: "ಕಿಸಾನ್‌ಮಿತ್ರ", appTagline: "ನಿಮ್ಮ AI-ಚಾಲಿತ ಕೃಷಿ ಸಹಚರ 🌾",
  askKisanMitra: "ಕಿಸಾನ್‌ಮಿತ್ರರನ್ನು ಕೇಳಿ", tapToSpeak: "ನಿಮ್ಮ ಭಾಷೆಯಲ್ಲಿ ಮಾತನಾಡಲು ಟ್ಯಾಪ್ ಮಾಡಿ",
  navHome: "ಮುಖಪುಟ", navDetect: "ಪತ್ತೆ", navWeather: "ಹವಾಮಾನ", navChat: "ಚಾಟ್", navProfile: "ಪ್ರೊಫೈಲ್",
  diseaseDetection: "ರೋಗ ಪತ್ತೆ", scanCropCamera: "ಕ್ಯಾಮೆರಾದಿಂದ ಬೆಳೆ ಸ್ಕ್ಯಾನ್ ಮಾಡಿ",
  selectLanguage: "ನಿಮ್ಮ ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ", continueBtn: "ಮುಂದುವರಿಸಿ",
  changeLanguage: "ಭಾಷೆ ಬದಲಿಸಿ", offlineMode: "ಆಫ್‌ಲೈನ್ — ಉಳಿಸಿದ ಡೇಟಾ ಬಳಸಲಾಗುತ್ತಿದೆ",
});

const ml = createLang({
  appName: "കിസാൻമിത്ര", appTagline: "നിങ്ങളുടെ AI-പ്രവർത്തിത കൃഷി സഹായി 🌾",
  askKisanMitra: "കിസാൻമിത്രയോട് ചോദിക്കൂ", tapToSpeak: "നിങ്ങളുടെ ഭാഷയിൽ സംസാരിക്കാൻ ടാപ്പ് ചെയ്യുക",
  navHome: "ഹോം", navDetect: "കണ്ടെത്തുക", navWeather: "കാലാവസ്ഥ", navChat: "ചാറ്റ്", navProfile: "പ്രൊഫൈൽ",
  diseaseDetection: "രോഗ കണ്ടെത്തൽ", scanCropCamera: "ക്യാമറ ഉപയോഗിച്ച് വിള സ്കാൻ ചെയ്യുക",
  selectLanguage: "നിങ്ങളുടെ ഭാഷ തിരഞ്ഞെടുക്കുക", continueBtn: "തുടരുക",
  changeLanguage: "ഭാഷ മാറ്റുക", offlineMode: "ഓഫ്‌ലൈൻ — സേവ് ചെയ്ത ഡാറ്റ ഉപയോഗിക്കുന്നു",
});

const pa = createLang({
  appName: "ਕਿਸਾਨਮਿੱਤਰ", appTagline: "ਤੁਹਾਡਾ AI-ਸੰਚਾਲਿਤ ਖੇਤੀ ਸਾਥੀ 🌾",
  askKisanMitra: "ਕਿਸਾਨਮਿੱਤਰ ਨੂੰ ਪੁੱਛੋ", tapToSpeak: "ਆਪਣੀ ਭਾਸ਼ਾ ਵਿੱਚ ਬੋਲਣ ਲਈ ਟੈਪ ਕਰੋ",
  navHome: "ਹੋਮ", navDetect: "ਪਛਾਣ", navWeather: "ਮੌਸਮ", navChat: "ਚੈਟ", navProfile: "ਪ੍ਰੋਫਾਈਲ",
  diseaseDetection: "ਰੋਗ ਪਛਾਣ", scanCropCamera: "ਕੈਮਰੇ ਨਾਲ ਫ਼ਸਲ ਸਕੈਨ ਕਰੋ",
  selectLanguage: "ਆਪਣੀ ਭਾਸ਼ਾ ਚੁਣੋ", continueBtn: "ਜਾਰੀ ਰੱਖੋ",
  changeLanguage: "ਭਾਸ਼ਾ ਬਦਲੋ", offlineMode: "ਆਫ਼ਲਾਈਨ — ਸੇਵ ਕੀਤਾ ਡੇਟਾ ਵਰਤਿਆ ਜਾ ਰਿਹਾ ਹੈ",
});

const or_ = createLang({
  appName: "କିସାନମିତ୍ର", appTagline: "ଆପଣଙ୍କ AI-ଚାଳିତ କୃଷି ସାଥୀ 🌾",
  askKisanMitra: "କିସାନମିତ୍ରଙ୍କୁ ପଚାରନ୍ତୁ", tapToSpeak: "ଆପଣଙ୍କ ଭାଷାରେ କହିବା ପାଇଁ ଟ୍ୟାପ୍ କରନ୍ତୁ",
  navHome: "ହୋମ", navDetect: "ଚିହ୍ନଟ", navWeather: "ପାଣିପାଗ", navChat: "ଚାଟ୍", navProfile: "ପ୍ରୋଫାଇଲ",
  selectLanguage: "ଆପଣଙ୍କ ଭାଷା ବାଛନ୍ତୁ", continueBtn: "ଜାରି ରଖନ୍ତୁ",
  changeLanguage: "ଭାଷା ବଦଳାନ୍ତୁ", offlineMode: "ଅଫଲାଇନ — ସଞ୍ଚିତ ତଥ୍ୟ ବ୍ୟବହାର ହେଉଛି",
});

const bho = createLang({
  appName: "किसानमित्र", appTagline: "रउआ AI-संचालित खेती साथी 🌾",
  askKisanMitra: "किसानमित्र से पूछीं", tapToSpeak: "अपना भाषा में बोले खातिर टैप करीं",
  navHome: "होम", navDetect: "पहचान", navWeather: "मौसम", navChat: "चैट", navProfile: "प्रोफ़ाइल",
  selectLanguage: "अपन भाषा चुनीं", continueBtn: "अगिला",
  changeLanguage: "भाषा बदलीं", offlineMode: "ऑफ़लाइन — बचावल डेटा इस्तेमाल हो रहल बा",
});

const ur = createLang({
  appName: "کسان مِتر", appTagline: "آپ کا AI سے چلنے والا کھیتی ساتھی 🌾",
  askKisanMitra: "کسان مِتر سے پوچھیں", tapToSpeak: "اپنی زبان میں بولنے کے لیے ٹیپ کریں",
  navHome: "ہوم", navDetect: "شناخت", navWeather: "موسم", navChat: "چیٹ", navProfile: "پروفائل",
  diseaseDetection: "بیماری کی شناخت", scanCropCamera: "کیمرے سے فصل سکین کریں",
  selectLanguage: "اپنی زبان منتخب کریں", continueBtn: "جاری رکھیں",
  changeLanguage: "زبان تبدیل کریں", offlineMode: "آف لائن — محفوظ ڈیٹا استعمال ہو رہا ہے",
});

export const translations: Record<LangCode, TranslationStrings> = {
  en, hi, bn, te, mr, ta, gu, kn, ml, pa, or: or_, bho, ur,
};
