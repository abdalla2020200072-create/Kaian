import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Volume2, RotateCcw, CheckCircle2, Star } from 'lucide-react';
import {
  ARABIC_NUMBERS,
  COUNT_WORDS_AR,
  ACCENT_STYLES,
} from '../data/arabicCurriculum';
import { ArabicIllustration } from './ArabicIllustrations';
import { soundEngine } from '../utils/soundEngine';

interface NumbersViewProps {
  exploredNumbers: number[];
  onCompleteCount: (numValue: number) => void;
  onTriggerBurst: (message?: string) => void;
}

export const NumbersView: React.FC<NumbersViewProps> = ({
  exploredNumbers,
  onCompleteCount,
  onTriggerBurst,
}) => {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [countedIndices, setCountedIndices] = useState<number[]>([]);

  const current = ARABIC_NUMBERS[selectedIdx];
  const theme = ACCENT_STYLES[current.accent];
  const isCompleted = countedIndices.length === current.value;

  const handleSelectNumber = (idx: number) => {
    const item = ARABIC_NUMBERS[idx];
    setSelectedIdx(idx);
    setCountedIndices([]);
    soundEngine.playTapChime(idx);
    soundEngine.speakArabic(item.speechText);
  };

  const handleTapCountItem = (itemIndex: number) => {
    if (countedIndices.includes(itemIndex)) {
      soundEngine.playPop();
      return;
    }

    const nextCounted = [...countedIndices, itemIndex];
    const stepNumber = nextCounted.length;
    setCountedIndices(nextCounted);

    soundEngine.playCountNote(stepNumber);
    soundEngine.speakArabic(COUNT_WORDS_AR[stepNumber] || current.speechText);

    if (stepNumber === current.value) {
      setTimeout(() => {
        soundEngine.playSuccessFanfare();
        soundEngine.speakArabic(`أَحْسَنْتَ! ${current.countablePlural}`);
        onCompleteCount(current.value);
        onTriggerBurst(`رائع! عددت حتى ${current.arabicNumeral}`);
      }, 360);
    }
  };

  const handleResetCount = () => {
    setCountedIndices([]);
    soundEngine.playPop();
    soundEngine.speakArabic(`هَيَّا نَعُدُّ ${current.countablePlural}`);
  };

  const handleSpeakNumber = () => {
    soundEngine.playTapChime(selectedIdx);
    soundEngine.speakArabic(`${current.speechText} ... ${current.countablePlural}`);
  };

  return (
    <div className="space-y-8">
      {/* Main Interactive Counting Stage */}
      <section
        aria-label="منصة تعلم الأرقام والعد"
        className="rounded-3xl bg-white border border-amber-200/80 p-5 sm:p-8 shadow-sm"
      >
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 text-balance">
              اضغط على كل صورة لنعدّ معاً
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-1">
              العدد الحالي:{' '}
              <span className="font-bold text-slate-900 tabular-nums">
                {countedIndices.length} من {current.value}
              </span>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleResetCount}
              className="flex items-center gap-2 min-h-[48px] px-4 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-base transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-300 whitespace-nowrap shrink-0"
            >
              <RotateCcw className="w-5 h-5" />
              <span>أعدّ من جديد</span>
            </button>
            <button
              type="button"
              onClick={handleSpeakNumber}
              className={`flex items-center gap-2 min-h-[48px] px-5 py-2.5 rounded-2xl ${theme.btnBg} ${theme.btnHover} text-white font-bold text-base transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-4 ${theme.ring} whitespace-nowrap shrink-0`}
            >
              <Volume2 className="w-5 h-5" />
              <span>اسمع الرقم</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Number Display Card */}
          <button
            type="button"
            onClick={handleSpeakNumber}
            className={`lg:col-span-4 flex flex-col items-center justify-center rounded-3xl border-2 ${theme.border} ${theme.bgSoft} p-6 min-h-[220px] cursor-pointer transition-transform active:scale-95 focus-visible:outline-none focus-visible:ring-4 ${theme.ring}`}
          >
            <span
              className={`font-display text-8xl sm:text-9xl font-extrabold leading-none ${theme.text} tabular-nums select-none`}
            >
              {current.arabicNumeral}
            </span>
            <span className="mt-4 font-display text-3xl font-extrabold text-slate-900">
              {current.word}
            </span>
            <span className="mt-1 text-base font-medium text-slate-600">
              {current.countablePlural}
            </span>
          </button>

          {/* Interactive Tap-to-Count Meadow */}
          <div className="lg:col-span-8 rounded-3xl border-2 border-emerald-200 bg-emerald-50/40 p-6 flex flex-col justify-between min-h-[260px]">
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-5 my-auto py-4">
              {Array.from({ length: current.value }).map((_, idx) => {
                const countOrder = countedIndices.indexOf(idx);
                const isCounted = countOrder !== -1;

                return (
                  <motion.button
                    key={`${current.value}-${idx}`}
                    type="button"
                    onClick={() => handleTapCountItem(idx)}
                    animate={
                      isCounted
                        ? { scale: [1, 1.18, 1.05], y: -4 }
                        : { scale: 1, y: 0 }
                    }
                    whileTap={{ scale: 0.9 }}
                    transition={{ duration: 0.25 }}
                    aria-label={`${current.countableSingular} رقم ${idx + 1}`}
                    className={`relative flex flex-col items-center justify-center rounded-2xl p-3 min-w-[84px] min-h-[84px] sm:min-w-[96px] sm:min-h-[96px] border-2 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-300 ${
                      isCounted
                        ? 'bg-white border-emerald-500 shadow-md'
                        : 'bg-white/90 border-amber-200 hover:border-amber-400'
                    }`}
                  >
                    <ArabicIllustration
                      id={current.illustrationId}
                      className="w-16 h-16 sm:w-20 sm:h-20"
                    />
                    {isCounted && (
                      <span className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-emerald-500 text-white font-display font-extrabold text-lg flex items-center justify-center shadow-sm tabular-nums">
                        {ARABIC_NUMBERS[countOrder]?.arabicNumeral || countOrder + 1}
                      </span>
                    )}
                  </motion.button>
                );
              })}
            </div>

            {/* Completion Bar */}
            <div className="pt-4 border-t border-emerald-200/70 flex flex-wrap items-center justify-between gap-3">
              {isCompleted ? (
                <div className="flex items-center gap-2 text-emerald-700 font-display text-lg font-bold">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                  <span>أحسنت! عددتها كلها: {current.countablePlural}</span>
                </div>
              ) : (
                <p className="text-base font-medium text-slate-700">
                  المس كل {current.countableSingular} بيدك لتسمع الرقم!
                </p>
              )}
              {isCompleted && selectedIdx < ARABIC_NUMBERS.length - 1 && (
                <button
                  type="button"
                  onClick={() => handleSelectNumber(selectedIdx + 1)}
                  className="px-5 py-2.5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-base cursor-pointer transition-colors whitespace-nowrap shrink-0"
                >
                  الرقم التالي ←
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Number Selector 1 - 10 */}
      <section aria-label="اختر رقماً من ١ إلى ١٠" className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-xl sm:text-2xl font-bold text-slate-900">
            الأرقام من ١ إلى ١٠
          </h3>
          <span className="text-sm font-medium text-slate-600">
            أكملت عدّ {exploredNumbers.length} من ١٠
          </span>
        </div>

        <div className="grid grid-cols-5 sm:grid-cols-10 gap-3">
          {ARABIC_NUMBERS.map((num, idx) => {
            const isSelected = idx === selectedIdx;
            const isDone = exploredNumbers.includes(num.value);
            const numTheme = ACCENT_STYLES[num.accent];

            return (
              <button
                key={num.value}
                type="button"
                onClick={() => handleSelectNumber(idx)}
                aria-label={`الرقم ${num.word}`}
                aria-pressed={isSelected}
                className={`relative flex flex-col items-center justify-center rounded-2xl p-3 min-h-[78px] border-2 transition-all cursor-pointer active:scale-95 focus-visible:outline-none focus-visible:ring-4 ${numTheme.ring} ${
                  isSelected
                    ? `${numTheme.bgSoft} border-slate-900 shadow-md -translate-y-0.5`
                    : 'bg-white border-slate-200 hover:border-amber-300'
                }`}
              >
                {isDone && (
                  <Star
                    className="w-4 h-4 text-amber-500 fill-amber-400 absolute top-1.5 left-1.5"
                    aria-hidden="true"
                  />
                )}
                <span className="font-display text-3xl font-extrabold text-slate-900 tabular-nums">
                  {num.arabicNumeral}
                </span>
                <span className="text-xs font-bold text-slate-600 mt-0.5">
                  {num.word}
                </span>
              </button>
            );
          })}
        </div>
      </section>
    </div>
  );
};
