import React, { useCallback, useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Volume2, RefreshCw, CheckCircle2, Sparkles } from 'lucide-react';
import {
  ARABIC_LETTERS,
  ARABIC_NUMBERS,
  PRAISE_PHRASES_AR,
  ArabicLetterItem,
  ArabicNumberItem,
} from '../data/arabicCurriculum';
import { ArabicIllustration } from './ArabicIllustrations';
import { soundEngine } from '../utils/soundEngine';

type QuizRound =
  | {
      kind: 'find_letter';
      promptText: string;
      speechPrompt: string;
      target: ArabicLetterItem;
      options: ArabicLetterItem[];
    }
  | {
      kind: 'find_picture';
      promptText: string;
      speechPrompt: string;
      target: ArabicLetterItem;
      options: ArabicLetterItem[];
    }
  | {
      kind: 'count_match';
      promptText: string;
      speechPrompt: string;
      target: ArabicNumberItem;
      options: ArabicNumberItem[];
    };

function pickRandomDistinct<T>(arr: T[], count: number): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, count);
}

function generateRound(roundNumber: number): QuizRound {
  const modeIndex = roundNumber % 3;

  if (modeIndex === 0) {
    const options = pickRandomDistinct(ARABIC_LETTERS, 3);
    const target = options[Math.floor(Math.random() * options.length)];
    return {
      kind: 'find_letter',
      promptText: `أين حرف «${target.name}»؟`,
      speechPrompt: `أَيْنَ حَرْفُ ${target.speechText}؟`,
      target,
      options,
    };
  }

  if (modeIndex === 1) {
    const options = pickRandomDistinct(ARABIC_LETTERS, 3);
    const target = options[Math.floor(Math.random() * options.length)];
    return {
      kind: 'find_picture',
      promptText: `أين صورة «${target.word}»؟`,
      speechPrompt: `أَيْنَ صُورَةُ ${target.word}؟`,
      target,
      options,
    };
  }

  const smallNumbers = ARABIC_NUMBERS.slice(0, 6);
  const options = pickRandomDistinct(smallNumbers, 3);
  const target = options[Math.floor(Math.random() * options.length)];
  return {
    kind: 'count_match',
    promptText: `كم عدد الصور؟ اختر الرقم الصحيح`,
    speechPrompt: `كَمْ عَدَدُ الصُّوَرِ؟ اِخْتَرِ الرَّقْمَ الصَّحِيحَ`,
    target,
    options,
  };
}

interface PlayGameViewProps {
  onWinRound: () => void;
  onTriggerBurst: (message?: string) => void;
}

export const PlayGameView: React.FC<PlayGameViewProps> = ({
  onWinRound,
  onTriggerBurst,
}) => {
  const [roundNum, setRoundNum] = useState(0);
  const [round, setRound] = useState<QuizRound>(() => generateRound(0));
  const [status, setStatus] = useState<'playing' | 'won'>('playing');
  const [wrongId, setWrongId] = useState<string | number | null>(null);
  const [streakInGame, setStreakInGame] = useState(0);

  const speakCurrentPrompt = useCallback((r: QuizRound) => {
    soundEngine.speakArabic(r.speechPrompt);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      speakCurrentPrompt(round);
    }, 250);
    return () => clearTimeout(timer);
  }, [round, speakCurrentPrompt]);

  const handleNextRound = useCallback(() => {
    const nextNum = roundNum + 1;
    const nextRound = generateRound(nextNum);
    setRoundNum(nextNum);
    setRound(nextRound);
    setStatus('playing');
    setWrongId(null);
  }, [roundNum]);

  const handleGuess = (id: string | number) => {
    if (status === 'won') return;

    const targetId =
      round.kind === 'count_match' ? round.target.value : round.target.id;

    if (id === targetId) {
      setStatus('won');
      setWrongId(null);
      setStreakInGame((s) => s + 1);
      const praise =
        PRAISE_PHRASES_AR[Math.floor(Math.random() * PRAISE_PHRASES_AR.length)];
      soundEngine.playSuccessFanfare();
      soundEngine.speakArabic(praise);
      onWinRound();
      onTriggerBurst(praise);

      setTimeout(() => {
        handleNextRound();
      }, 1700);
    } else {
      setWrongId(id);
      soundEngine.playGentleTryAgain();
      soundEngine.speakArabic('حَاوِلْ مَرَّةً أُخْرَى!');
      setTimeout(() => setWrongId(null), 500);
    }
  };

  return (
    <section
      aria-label="لعبة التوصيل والمرح"
      className="rounded-3xl bg-white border border-amber-200/80 p-6 sm:p-8 shadow-sm space-y-8"
    >
      {/* Question Prompt Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-1">
          <p className="text-sm font-bold text-sky-700">
            لعبة الذكاء والمرح · إجابات صحيحة متتالية:{' '}
            <span className="tabular-nums">{streakInGame}</span>
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 text-balance">
            {round.promptText}
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => speakCurrentPrompt(round)}
            className="flex items-center gap-2 min-h-[52px] px-6 py-3 rounded-2xl bg-sky-500 hover:bg-sky-600 text-white font-display text-lg font-bold shadow-sm transition-transform active:scale-95 cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-300 whitespace-nowrap shrink-0"
          >
            <Volume2 className="w-6 h-6" />
            <span>اسمع السؤال</span>
          </button>
          <button
            type="button"
            onClick={handleNextRound}
            aria-label="سؤال آخر"
            className="flex items-center gap-2 min-h-[52px] px-4 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-base transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-slate-300 whitespace-nowrap shrink-0"
          >
            <RefreshCw className="w-5 h-5" />
            <span>سؤال آخر</span>
          </button>
        </div>
      </div>

      {/* Visual Counting Box when round is count_match */}
      {round.kind === 'count_match' && (
        <div className="rounded-3xl bg-amber-50/70 border-2 border-amber-200 p-6 flex flex-wrap items-center justify-center gap-5">
          {Array.from({ length: round.target.value }).map((_, idx) => (
            <motion.div
              key={idx}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: idx * 0.06 }}
            >
              <ArabicIllustration
                id={round.target.illustrationId}
                className="w-20 h-20 sm:w-24 sm:h-24"
              />
            </motion.div>
          ))}
        </div>
      )}

      {/* 3 Huge Toddler-Friendly Choice Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6">
        {round.kind === 'count_match'
          ? round.options.map((opt) => {
              const isWinner = status === 'won' && opt.value === round.target.value;
              const isWrong = wrongId === opt.value;

              return (
                <motion.button
                  key={opt.value}
                  type="button"
                  onClick={() => handleGuess(opt.value)}
                  animate={
                    isWrong
                      ? { x: [0, -10, 10, -6, 6, 0] }
                      : isWinner
                      ? { scale: [1, 1.08, 1.03] }
                      : { scale: 1 }
                  }
                  transition={{ duration: 0.3 }}
                  className={`flex flex-col items-center justify-center rounded-3xl border-3 p-8 min-h-[210px] cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-300 ${
                    isWinner
                      ? 'bg-emerald-50 border-emerald-500 shadow-lg'
                      : isWrong
                      ? 'bg-rose-50 border-rose-300'
                      : 'bg-sky-50/60 border-sky-200 hover:border-sky-400 hover:bg-sky-50'
                  }`}
                >
                  <span className="font-display text-8xl font-extrabold text-slate-900 tabular-nums">
                    {opt.arabicNumeral}
                  </span>
                  <span className="mt-3 font-display text-2xl font-bold text-slate-700">
                    {opt.word}
                  </span>
                </motion.button>
              );
            })
          : round.options.map((opt) => {
              const isWinner = status === 'won' && opt.id === round.target.id;
              const isWrong = wrongId === opt.id;

              return (
                <motion.button
                  key={opt.id}
                  type="button"
                  onClick={() => handleGuess(opt.id)}
                  animate={
                    isWrong
                      ? { x: [0, -10, 10, -6, 6, 0] }
                      : isWinner
                      ? { scale: [1, 1.08, 1.03] }
                      : { scale: 1 }
                  }
                  transition={{ duration: 0.3 }}
                  className={`flex flex-col items-center justify-center rounded-3xl border-3 p-8 min-h-[220px] cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-amber-300 ${
                    isWinner
                      ? 'bg-emerald-50 border-emerald-500 shadow-lg'
                      : isWrong
                      ? 'bg-rose-50 border-rose-300'
                      : 'bg-amber-50/50 border-amber-200 hover:border-amber-400 hover:bg-amber-50'
                  }`}
                >
                  {round.kind === 'find_letter' ? (
                    <>
                      <span className="font-display text-8xl font-extrabold text-slate-900 leading-none">
                        {opt.letter}
                      </span>
                      <div className="mt-4 opacity-90">
                        <ArabicIllustration
                          id={opt.illustrationId}
                          className="w-16 h-16"
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <ArabicIllustration
                        id={opt.illustrationId}
                        className="w-32 h-32 sm:w-36 sm:h-36"
                      />
                      <span className="mt-3 font-display text-2xl font-extrabold text-slate-900">
                        {opt.word}
                      </span>
                    </>
                  )}
                </motion.button>
              );
            })}
      </div>

      {/* Gentle Feedback Footer */}
      <div className="flex items-center justify-center min-h-[40px]">
        {status === 'won' ? (
          <div className="flex items-center gap-2 text-emerald-700 font-display text-xl font-bold">
            <CheckCircle2 className="w-6 h-6 text-emerald-600" />
            <span>أحسنت! ننتقل إلى السؤال التالي...</span>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-slate-600 text-base font-medium">
            <Sparkles className="w-5 h-5 text-amber-500" />
            <span>اختر البطاقة الصحيحة لتحصل على نجمة ذهبية!</span>
          </div>
        )}
      </div>
    </section>
  );
};
