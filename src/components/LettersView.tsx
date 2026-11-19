import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Volume2, ChevronRight, ChevronLeft, Star } from 'lucide-react';
import {
  ARABIC_LETTERS,
  ACCENT_STYLES,
  ArabicLetterItem,
} from '../data/arabicCurriculum';
import { ArabicIllustration } from './ArabicIllustrations';
import { soundEngine } from '../utils/soundEngine';

interface LettersViewProps {
  exploredLetters: string[];
  onExploreLetter: (letterId: string) => void;
  onTriggerBurst: (message?: string) => void;
}

export const LettersView: React.FC<LettersViewProps> = ({
  exploredLetters,
  onExploreLetter,
  onTriggerBurst,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [bounceTarget, setBounceTarget] = useState<'letter' | 'picture' | null>(null);

  const current: ArabicLetterItem = ARABIC_LETTERS[selectedIndex];
  const theme = ACCENT_STYLES[current.accent];

  const handleSelectLetter = (index: number) => {
    const item = ARABIC_LETTERS[index];
    setSelectedIndex(index);
    const wasNew = !exploredLetters.includes(item.id);
    onExploreLetter(item.id);
    soundEngine.playTapChime(index);
    soundEngine.speakArabic(item.wordSpeech);
    setBounceTarget('picture');
    setTimeout(() => setBounceTarget(null), 450);

    if (wasNew) {
      onTriggerBurst(`نجمة جديدة! ${item.letter}`);
    }
  };

  const handleTapBigLetter = () => {
    soundEngine.playTapChime(selectedIndex);
    soundEngine.speakArabic(current.speechText);
    setBounceTarget('letter');
    setTimeout(() => setBounceTarget(null), 420);
  };

  const handleTapPicture = () => {
    const wasNew = !exploredLetters.includes(current.id);
    onExploreLetter(current.id);
    soundEngine.playPop();
    soundEngine.speakArabic(current.wordSpeech);
    setBounceTarget('picture');
    setTimeout(() => setBounceTarget(null), 450);
    if (wasNew) {
      onTriggerBurst(`رائع! ${current.word}`);
    }
  };

  const handlePrev = () => {
    const prevIdx = (selectedIndex - 1 + ARABIC_LETTERS.length) % ARABIC_LETTERS.length;
    handleSelectLetter(prevIdx);
  };

  const handleNext = () => {
    const nextIdx = (selectedIndex + 1) % ARABIC_LETTERS.length;
    handleSelectLetter(nextIdx);
  };

  return (
    <div className="space-y-8">
      {/* Main Interactive Stage */}
      <section
        aria-label="منصة تعلم الحرف"
        className="rounded-3xl bg-white border border-amber-200/80 p-5 sm:p-8 shadow-sm"
      >
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 text-balance">
              اضغط على الحرف أو الصورة لتسمع الصوت
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-1">
              الحرف {selectedIndex + 1} من {ARABIC_LETTERS.length} · اكتشفت{' '}
              <span className="font-bold text-amber-700 tabular-nums">
                {exploredLetters.length}
              </span>{' '}
              حرفاً
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="الحرف السابق"
              className="flex items-center gap-1.5 min-h-[48px] px-4 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-base transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-300 whitespace-nowrap shrink-0"
            >
              <ChevronRight className="w-5 h-5" />
              <span>السابق</span>
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="الحرف التالي"
              className="flex items-center gap-1.5 min-h-[48px] px-5 py-2.5 rounded-2xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-base transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-300 whitespace-nowrap shrink-0"
            >
              <span>التالي</span>
              <ChevronLeft className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Two-Zone Letter & Picture Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          {/* Giant Letter Card */}
          <motion.button
            type="button"
            onClick={handleTapBigLetter}
            animate={
              bounceTarget === 'letter'
                ? { scale: [1, 1.07, 1], rotate: [0, -3, 3, 0] }
                : { scale: 1, rotate: 0 }
            }
            transition={{ duration: 0.32 }}
            className={`group flex flex-col items-center justify-center rounded-3xl border-2 ${theme.border} ${theme.bgSoft} p-8 min-h-[260px] sm:min-h-[300px] cursor-pointer transition-transform active:scale-95 focus-visible:outline-none focus-visible:ring-4 ${theme.ring}`}
          >
            <span
              className={`font-display text-8xl sm:text-9xl font-extrabold leading-none ${theme.text} select-none`}
            >
              {current.letter}
            </span>
            <div className="mt-6 flex items-center gap-2 rounded-2xl bg-white px-5 py-2.5 shadow-sm border border-slate-200/80">
              <Volume2 className={`w-6 h-6 ${theme.text}`} />
              <span className="font-display text-xl sm:text-2xl font-bold text-slate-900">
                {current.name}
              </span>
            </div>
          </motion.button>

          {/* Giant Picture Card */}
          <motion.button
            type="button"
            onClick={handleTapPicture}
            animate={
              bounceTarget === 'picture'
                ? { scale: [1, 1.06, 1], y: [0, -10, 0] }
                : { scale: 1, y: 0 }
            }
            transition={{ duration: 0.35 }}
            className="group flex flex-col items-center justify-center rounded-3xl border-2 border-amber-200 bg-amber-50/60 p-8 min-h-[260px] sm:min-h-[300px] cursor-pointer transition-transform active:scale-95 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-amber-300"
          >
            <div className="animate-float-slow">
              <ArabicIllustration
                id={current.illustrationId}
                className="w-36 h-36 sm:w-44 sm:h-44 drop-shadow-sm"
              />
            </div>
            <div className="mt-4 flex items-center gap-2 rounded-2xl bg-white px-6 py-2.5 shadow-sm border border-amber-200">
              <Volume2 className="w-6 h-6 text-amber-600" />
              <span className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900">
                {current.word}
              </span>
            </div>
          </motion.button>
        </div>

        {/* Big Audio Action Button */}
        <div className="mt-6 flex justify-center">
          <button
            type="button"
            onClick={handleTapPicture}
            className={`flex items-center justify-center gap-3 min-h-[56px] px-8 py-3.5 rounded-2xl ${theme.btnBg} ${theme.btnHover} text-white font-display text-xl font-bold shadow-sm transition-transform active:scale-95 cursor-pointer focus-visible:outline-none focus-visible:ring-4 ${theme.ring} whitespace-nowrap shrink-0`}
          >
            <Volume2 className="w-7 h-7" />
            <span>اسمع: {current.name} · {current.word}</span>
          </button>
        </div>
      </section>

      {/* Full 28-Letter Picker Grid */}
      <section aria-label="جميع الحروف العربية" className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-xl sm:text-2xl font-bold text-slate-900">
            اختر حرفاً للعب
          </h3>
          <span className="text-sm font-medium text-slate-600">
            ٢٨ حرفاً عربياً
          </span>
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-7 gap-3 sm:gap-4">
          {ARABIC_LETTERS.map((item, idx) => {
            const isSelected = idx === selectedIndex;
            const isExplored = exploredLetters.includes(item.id);
            const itemTheme = ACCENT_STYLES[item.accent];

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSelectLetter(idx)}
                aria-label={`${item.name} ${item.word}`}
                aria-pressed={isSelected}
                className={`relative flex flex-col items-center justify-center rounded-2xl p-3 min-h-[84px] sm:min-h-[96px] border-2 transition-all cursor-pointer active:scale-95 focus-visible:outline-none focus-visible:ring-4 ${itemTheme.ring} ${
                  isSelected
                    ? `${itemTheme.bgSoft} border-slate-900 shadow-md -translate-y-0.5`
                    : 'bg-white border-slate-200 hover:border-amber-300 hover:bg-amber-50/40'
                }`}
              >
                {isExplored && (
                  <Star
                    className="w-4 h-4 text-amber-500 fill-amber-400 absolute top-2 left-2"
                    aria-hidden="true"
                  />
                )}
                <span className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 leading-none">
                  {item.letter}
                </span>
                <span className="mt-1.5 text-xs sm:text-sm font-bold text-slate-600 truncate max-w-full">
                  {item.word}
                </span>
              </button>
            );
          })}
        </div>
      </section>
    </div>
  );
};
