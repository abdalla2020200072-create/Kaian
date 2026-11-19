export type AccentColor = 'sky' | 'amber' | 'emerald' | 'rose';

export interface ArabicLetterItem {
  id: string;
  letter: string;
  letterBare: string;
  name: string;
  word: string;
  speechText: string;
  wordSpeech: string;
  illustrationId: string;
  accent: AccentColor;
}

export interface ArabicNumberItem {
  value: number;
  arabicNumeral: string;
  word: string;
  countableSingular: string;
  countablePlural: string;
  speechText: string;
  illustrationId: string;
  accent: AccentColor;
}

export interface StickerItem {
  id: string;
  title: string;
  subtitle: string;
  illustrationId: string;
  imageSrc?: string;
  requiredStars: number;
  requiredStreak?: number;
  accent: AccentColor;
}

export const ARABIC_LETTERS: ArabicLetterItem[] = [
  { id: 'alif', letter: 'أ', letterBare: 'أ', name: 'ألف', word: 'أرنب', speechText: 'أَلِف', wordSpeech: 'أَلِف ... أَرْنَب!', illustrationId: 'rabbit', accent: 'sky' },
  { id: 'baa', letter: 'ب', letterBare: 'ب', name: 'باء', word: 'بطة', speechText: 'بَاء', wordSpeech: 'بَاء ... بَطَّة!', illustrationId: 'duck', accent: 'amber' },
  { id: 'taa', letter: 'ت', letterBare: 'ت', name: 'تاء', word: 'تفاحة', speechText: 'تَاء', wordSpeech: 'تَاء ... تُفَّاحَة!', illustrationId: 'apple', accent: 'rose' },
  { id: 'thaa', letter: 'ث', letterBare: 'ث', name: 'ثاء', word: 'ثعلب', speechText: 'ثَاء', wordSpeech: 'ثَاء ... ثَعْلَب!', illustrationId: 'fox', accent: 'amber' },
  { id: 'jeem', letter: 'ج', letterBare: 'ج', name: 'جيم', word: 'جمل', speechText: 'جِيم', wordSpeech: 'جِيم ... جَمَل!', illustrationId: 'camel', accent: 'amber' },
  { id: 'haa', letter: 'ح', letterBare: 'ح', name: 'حاء', word: 'حصان', speechText: 'حَاء', wordSpeech: 'حَاء ... حِصَان!', illustrationId: 'horse', accent: 'sky' },
  { id: 'khaa', letter: 'خ', letterBare: 'خ', name: 'خاء', word: 'خروف', speechText: 'خَاء', wordSpeech: 'خَاء ... خَرُوف!', illustrationId: 'sheep', accent: 'emerald' },
  { id: 'daal', letter: 'د', letterBare: 'د', name: 'دال', word: 'ديك', speechText: 'دَال', wordSpeech: 'دَال ... دِيك!', illustrationId: 'rooster', accent: 'rose' },
  { id: 'dhaal', letter: 'ذ', letterBare: 'ذ', name: 'ذال', word: 'ذرة', speechText: 'ذَال', wordSpeech: 'ذَال ... ذُرَة!', illustrationId: 'corn', accent: 'amber' },
  { id: 'raa', letter: 'ر', letterBare: 'ر', name: 'راء', word: 'رمان', speechText: 'رَاء', wordSpeech: 'رَاء ... رُمَّان!', illustrationId: 'pomegranate', accent: 'rose' },
  { id: 'zaay', letter: 'ز', letterBare: 'ز', name: 'زاي', word: 'زرافة', speechText: 'زَاي', wordSpeech: 'زَاي ... زَرَافَة!', illustrationId: 'giraffe', accent: 'amber' },
  { id: 'seen', letter: 'س', letterBare: 'س', name: 'سين', word: 'سمكة', speechText: 'سِين', wordSpeech: 'سِين ... سَمَكَة!', illustrationId: 'fish', accent: 'sky' },
  { id: 'sheen', letter: 'ش', letterBare: 'ش', name: 'شين', word: 'شمس', speechText: 'شِين', wordSpeech: 'شِين ... شَمْس!', illustrationId: 'sun', accent: 'amber' },
  { id: 'saad', letter: 'ص', letterBare: 'ص', name: 'صاد', word: 'صاروخ', speechText: 'صَاد', wordSpeech: 'صَاد ... صَارُوخ!', illustrationId: 'rocket', accent: 'rose' },
  { id: 'daad', letter: 'ض', letterBare: 'ض', name: 'ضاد', word: 'ضفدع', speechText: 'ضَاد', wordSpeech: 'ضَاد ... ضِفْدَع!', illustrationId: 'frog', accent: 'emerald' },
  { id: 'taa2', letter: 'ط', letterBare: 'ط', name: 'طاء', word: 'طائرة', speechText: 'طَاء', wordSpeech: 'طَاء ... طَائِرَة!', illustrationId: 'plane', accent: 'sky' },
  { id: 'dhaa2', letter: 'ظ', letterBare: 'ظ', name: 'ظاء', word: 'ظرف', speechText: 'ظَاء', wordSpeech: 'ظَاء ... ظَرْف!', illustrationId: 'envelope', accent: 'amber' },
  { id: 'ayn', letter: 'ع', letterBare: 'ع', name: 'عين', word: 'عصفور', speechText: 'عَيْن', wordSpeech: 'عَيْن ... عُصْفُور!', illustrationId: 'bird', accent: 'sky' },
  { id: 'ghayn', letter: 'غ', letterBare: 'غ', name: 'غين', word: 'غيمة', speechText: 'غَيْن', wordSpeech: 'غَيْن ... غَيْمَة!', illustrationId: 'cloud', accent: 'sky' },
  { id: 'faa', letter: 'ف', letterBare: 'ف', name: 'فاء', word: 'فراشة', speechText: 'فَاء', wordSpeech: 'فَاء ... فَرَاشَة!', illustrationId: 'butterfly', accent: 'rose' },
  { id: 'qaaf', letter: 'ق', letterBare: 'ق', name: 'قاف', word: 'قمر', speechText: 'قَاف', wordSpeech: 'قَاف ... قَمَر!', illustrationId: 'moon', accent: 'amber' },
  { id: 'kaaf', letter: 'ك', letterBare: 'ك', name: 'كاف', word: 'كتاب', speechText: 'كَاف', wordSpeech: 'كَاف ... كِتَاب!', illustrationId: 'book', accent: 'emerald' },
  { id: 'laam', letter: 'ل', letterBare: 'ل', name: 'لام', word: 'ليمون', speechText: 'لَام', wordSpeech: 'لَام ... لَيْمُون!', illustrationId: 'lemon', accent: 'amber' },
  { id: 'meem', letter: 'م', letterBare: 'م', name: 'ميم', word: 'موز', speechText: 'مِيم', wordSpeech: 'مِيم ... مَوْز!', illustrationId: 'banana', accent: 'amber' },
  { id: 'noon', letter: 'ن', letterBare: 'ن', name: 'نون', word: 'نحلة', speechText: 'نُون', wordSpeech: 'نُون ... نَحْلَة!', illustrationId: 'bee', accent: 'amber' },
  { id: 'haa2', letter: 'هـ', letterBare: 'ه', name: 'هاء', word: 'هدية', speechText: 'هَاء', wordSpeech: 'هَاء ... هَدِيَّة!', illustrationId: 'gift', accent: 'rose' },
  { id: 'waaw', letter: 'و', letterBare: 'و', name: 'واو', word: 'وردة', speechText: 'وَاو', wordSpeech: 'وَاو ... وَرْدَة!', illustrationId: 'flower', accent: 'rose' },
  { id: 'yaa', letter: 'ي', letterBare: 'ي', name: 'ياء', word: 'يد', speechText: 'يَاء', wordSpeech: 'يَاء ... يَد!', illustrationId: 'hand', accent: 'emerald' },
];

export const ARABIC_NUMBERS: ArabicNumberItem[] = [
  { value: 1, arabicNumeral: '١', word: 'واحد', countableSingular: 'نجمة', countablePlural: 'نجمة واحدة', speechText: 'وَاحِد!', illustrationId: 'star', accent: 'amber' },
  { value: 2, arabicNumeral: '٢', word: 'اثنان', countableSingular: 'تفاحة', countablePlural: 'تفاحتان', speechText: 'اِثْنَان!', illustrationId: 'apple', accent: 'rose' },
  { value: 3, arabicNumeral: '٣', word: 'ثلاثة', countableSingular: 'بطة', countablePlural: 'ثلاث بطات', speechText: 'ثَلَاثَة!', illustrationId: 'duck', accent: 'amber' },
  { value: 4, arabicNumeral: '٤', word: 'أربعة', countableSingular: 'فراشة', countablePlural: 'أربع فراشات', speechText: 'أَرْبَعَة!', illustrationId: 'butterfly', accent: 'sky' },
  { value: 5, arabicNumeral: '٥', word: 'خمسة', countableSingular: 'وردة', countablePlural: 'خمس وردات', speechText: 'خَمْسَة!', illustrationId: 'flower', accent: 'rose' },
  { value: 6, arabicNumeral: '٦', word: 'ستة', countableSingular: 'سمكة', countablePlural: 'ست سمكات', speechText: 'سِتَّة!', illustrationId: 'fish', accent: 'sky' },
  { value: 7, arabicNumeral: '٧', word: 'سبعة', countableSingular: 'نحلة', countablePlural: 'سبع نحلات', speechText: 'سَبْعَة!', illustrationId: 'bee', accent: 'amber' },
  { value: 8, arabicNumeral: '٨', word: 'ثمانية', countableSingular: 'جزرة', countablePlural: 'ثماني جزرات', speechText: 'ثَمَانِيَة!', illustrationId: 'lemon', accent: 'emerald' },
  { value: 9, arabicNumeral: '٩', word: 'تسعة', countableSingular: 'عصفور', countablePlural: 'تسعة عصافير', speechText: 'تِسْعَة!', illustrationId: 'bird', accent: 'sky' },
  { value: 10, arabicNumeral: '١٠', word: 'عشرة', countableSingular: 'هدية', countablePlural: 'عشر هدايا', speechText: 'عَشَرَة!', illustrationId: 'gift', accent: 'rose' },
];

export const COUNT_WORDS_AR = [
  '',
  'وَاحِد!',
  'اِثْنَان!',
  'ثَلَاثَة!',
  'أَرْبَعَة!',
  'خَمْسَة!',
  'سِتَّة!',
  'سَبْعَة!',
  'ثَمَانِيَة!',
  'تِسْعَة!',
  'عَشَرَة!',
];

export const PRAISE_PHRASES_AR = [
  'أَحْسَنْتَ يَا بَطَل!',
  'مُمْتَاز!',
  'رَائِع جِدّاً!',
  'عَمَلٌ جَمِيل!',
  'ذَكِيٌّ جِدّاً!',
];

export const STICKER_COLLECTION: StickerItem[] = [
  {
    id: 'welcome-owl',
    title: 'البومة الحكيمة',
    subtitle: 'صديقة الحديقة منذ اليوم الأول',
    illustrationId: 'bird',
    imageSrc: '/src/assets/images/mascot_friendly_owl_1795045857742.jpg',
    requiredStars: 0,
    accent: 'amber',
  },
  {
    id: 'golden-crown',
    title: 'النجمة المتوّجة',
    subtitle: 'اكسب ٣ نجوم في رحلتك',
    illustrationId: 'star',
    imageSrc: '/src/assets/images/sticker_golden_crown_1795045858424.jpg',
    requiredStars: 3,
    accent: 'amber',
  },
  {
    id: 'happy-rabbit',
    title: 'الأرنب القافز',
    subtitle: 'اكسب ٥ نجوم',
    illustrationId: 'rabbit',
    requiredStars: 5,
    accent: 'sky',
  },
  {
    id: 'space-rocket',
    title: 'صاروخ النجوم',
    subtitle: 'اكسب ٨ نجوم',
    illustrationId: 'rocket',
    requiredStars: 8,
    accent: 'rose',
  },
  {
    id: 'spring-butterfly',
    title: 'فراشة الربيع',
    subtitle: 'اكسب ١٢ نجمة',
    illustrationId: 'butterfly',
    requiredStars: 12,
    accent: 'rose',
  },
  {
    id: 'sunny-morning',
    title: 'شمس الصباح',
    subtitle: 'اكسب ١٥ نجمة',
    illustrationId: 'sun',
    requiredStars: 15,
    accent: 'amber',
  },
  {
    id: 'golden-fish',
    title: 'السمكة الذهبية',
    subtitle: 'اكسب ٢٠ نجمة',
    illustrationId: 'fish',
    requiredStars: 20,
    accent: 'sky',
  },
  {
    id: 'garden-giraffe',
    title: 'زرافة الحديقة',
    subtitle: 'اكسب ٢٥ نجمة',
    illustrationId: 'giraffe',
    requiredStars: 25,
    accent: 'emerald',
  },
  {
    id: 'treasure-chest',
    title: 'صندوق الكنز السحري',
    subtitle: 'أكمل ٣ أيام متتالية أو ٣٠ نجمة',
    illustrationId: 'gift',
    imageSrc: '/src/assets/images/reward_gift_chest_1795045858495.jpg',
    requiredStars: 30,
    requiredStreak: 3,
    accent: 'amber',
  },
];

export const ACCENT_STYLES: Record<
  AccentColor,
  {
    bgSoft: string;
    border: string;
    text: string;
    btnBg: string;
    btnHover: string;
    ring: string;
  }
> = {
  sky: {
    bgSoft: 'bg-sky-50',
    border: 'border-sky-200',
    text: 'text-sky-700',
    btnBg: 'bg-sky-500',
    btnHover: 'hover:bg-sky-600',
    ring: 'focus-visible:ring-sky-400',
  },
  amber: {
    bgSoft: 'bg-amber-50',
    border: 'border-amber-200',
    text: 'text-amber-800',
    btnBg: 'bg-amber-500',
    btnHover: 'hover:bg-amber-600',
    ring: 'focus-visible:ring-amber-400',
  },
  emerald: {
    bgSoft: 'bg-emerald-50',
    border: 'border-emerald-200',
    text: 'text-emerald-800',
    btnBg: 'bg-emerald-500',
    btnHover: 'hover:bg-emerald-600',
    ring: 'focus-visible:ring-emerald-400',
  },
  rose: {
    bgSoft: 'bg-rose-50',
    border: 'border-rose-200',
    text: 'text-rose-700',
    btnBg: 'bg-rose-500',
    btnHover: 'hover:bg-rose-600',
    ring: 'focus-visible:ring-rose-400',
  },
};
