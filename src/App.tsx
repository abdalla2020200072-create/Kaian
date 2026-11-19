import React, { useCallback, useState } from 'react';
import { Volume2, VolumeX, Star, Gift, Sparkles } from 'lucide-react';
import { LettersView } from './components/LettersView';
import { NumbersView } from './components/NumbersView';
import { PlayGameView } from './components/PlayGameView';
import { TraceLetterView } from './components/TraceLetterView';
import { RewardsView } from './components/RewardsView';
import { CelebrationOverlay } from './components/CelebrationOverlay';
import { useRewardsStore } from './hooks/useRewardsStore';
import { STICKER_COLLECTION } from './data/arabicCurriculum';
import { soundEngine } from './utils/soundEngine';
import { ArabicIllustration } from './components/ArabicIllustrations';

type AppMode = 'letters' | 'numbers' | 'play' | 'trace' | 'rewards';

const NAV_MODES: { id: Exclude<AppMode, 'rewards'>; label: string }[] = [
  { id: 'letters', label: 'الحروف' },
  { id: 'numbers', label: 'الأرقام' },
  { id: 'play', label: 'العب واكتشف' },
  { id: 'trace', label: 'ارسم الحرف' },
];

export default function App() {
  const [mode, setMode] = useState<AppMode>('letters');
  const [muted, setMuted] = useState(false);
  const [burstKey, setBurstKey] = useState(0);
  const [burstMessage, setBurstMessage] = useState<string | null>(null);
  const [owlError, setOwlError] = useState(false);

  const {
    state,
    dailyGoal,
    canClaimDailyGift,
    isDailyGiftClaimed,
    newlyUnlockedStickerId,
    awardStars,
    markLetterExplored,
    markNumberExplored,
    claimDailyGift,
    dismissNewSticker,
  } = useRewardsStore();

  const triggerBurst = useCallback((message?: string) => {
    setBurstMessage(message || null);
    setBurstKey((k) => k + 1);
  }, []);

  const handleToggleMute = () => {
    const next = !muted;
    setMuted(next);
    soundEngine.setMuted(next);
    if (!next) {
      soundEngine.playPop();
      soundEngine.speakArabic('الصَّوْتُ مَفْتُوحٌ الآنَ!');
    }
  };

  const handleSwitchMode = (nextMode: AppMode) => {
    setMode(nextMode);
    soundEngine.playPop();
    if (nextMode === 'letters') soundEngine.speakArabic('هَيَّا نَتَعَلَّمُ الْحُرُوفَ!');
    if (nextMode === 'numbers') soundEngine.speakArabic('هَيَّا نَعُدُّ الأَرْقَامَ!');
    if (nextMode === 'play') soundEngine.speakArabic('وَقْتُ اللَّعِبِ وَالْمَرَحِ!');
    if (nextMode === 'trace') soundEngine.speakArabic('هَيَّا نَرْسُمُ مَعاً!');
    if (nextMode === 'rewards') soundEngine.speakArabic('حَدِيقَةُ الْمُكَافَآتِ وَالْمُلْصَقَاتِ!');
  };

  const handleTapMascot = () => {
    soundEngine.playTapChime(2);
    if (canClaimDailyGift) {
      soundEngine.speakArabic('رَائِعٌ! هَدِيَّةُ الْيَوْمِ جَاهِزَةٌ فِي صُنْدُوقِ الْهَدَايَا!');
    } else {
      const left = Math.max(dailyGoal - state.todayStars, 0);
      if (left > 0) {
        soundEngine.speakArabic(`أَهْلاً يَا صَغِيرِي! تَبَقَّى ${left} نُجُومٍ لِهَدِيَّةِ الْيَوْمِ!`);
      } else {
        soundEngine.speakArabic('أَنْتَ بَطَلٌ رَائِعٌ! اِسْتَمِرَّ فِي التَّعَلُّمِ!');
      }
    }
  };

  const newlyUnlockedSticker = newlyUnlockedStickerId
    ? STICKER_COLLECTION.find((s) => s.id === newlyUnlockedStickerId)
    : null;

  const dailyProgressPct = Math.min((state.todayStars / dailyGoal) * 100, 100);

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFBF2] text-slate-900">
      <CelebrationOverlay burstKey={burstKey} message={burstMessage} />

      {/* 3-Zone Top Navigation Bar */}
      <header className="sticky top-0 z-30 bg-[#FFFBF2]/95 backdrop-blur-sm border-b border-amber-200/70">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between gap-8">
          {/* Zone 1: Brand Wordmark */}
          <button
            type="button"
            onClick={() => handleSwitchMode('letters')}
            className="font-display text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900 hover:text-sky-700 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            حديقة الحروف
          </button>

          {/* Zone 2: 4 Concise Mode Links */}
          <nav
            aria-label="أقسام التعلم"
            className="hidden md:flex items-center gap-7 text-base font-bold text-slate-600"
          >
            {NAV_MODES.map((item) => {
              const active = mode === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSwitchMode(item.id)}
                  className={`py-1.5 border-b-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    active
                      ? 'text-sky-700 border-sky-500'
                      : 'border-transparent hover:text-slate-900 hover:border-amber-300'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: 1 Primary Action Button */}
          <div className="flex items-center shrink-0">
            <button
              type="button"
              onClick={() => handleSwitchMode('rewards')}
              className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-2xl font-display text-sm sm:text-base font-bold transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-amber-300 ${
                mode === 'rewards'
                  ? 'bg-slate-900 text-white'
                  : canClaimDailyGift
                  ? 'bg-amber-500 hover:bg-amber-600 text-white shadow-sm'
                  : 'bg-amber-400 hover:bg-amber-500 text-slate-900 shadow-sm'
              }`}
            >
              <Gift className="w-5 h-5" />
              <span>{canClaimDailyGift ? 'افتح هديتك!' : 'مكافآتي'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
        {/* Companion & Daily Goal Toolbar (Below Header) */}
        <section
          aria-label="شريط التقدم اليومي"
          className="rounded-3xl bg-white border border-amber-200/80 p-4 sm:p-5 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <button
              type="button"
              onClick={handleTapMascot}
              aria-label="اضغط على البومة الصديقة لسماع التشجيع"
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 border-amber-200 bg-amber-50 shrink-0 cursor-pointer transition-transform hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-amber-300"
            >
              {!owlError ? (
                <img
                  src="/src/assets/images/mascot_friendly_owl_1795045857742.jpg"
                  alt="البومة الحكيمة صديقة الأطفال"
                  referrerPolicy="no-referrer"
                  onError={() => setOwlError(true)}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <ArabicIllustration id="bird" className="w-12 h-12" />
                </div>
              )}
            </button>

            <div className="min-w-0 flex-1 space-y-1.5">
              <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-bold text-slate-600">
                <span className="inline-flex items-center gap-1 text-amber-700 tabular-nums">
                  <Star className="w-4 h-4 text-amber-500 fill-amber-400" />
                  <span>{state.totalStars} نجمة</span>
                </span>
                <span aria-hidden="true">·</span>
                <span className="tabular-nums">
                  سلسلة {state.streakDays} {state.streakDays === 1 ? 'يوم' : 'أيام'}
                </span>
                <span aria-hidden="true">·</span>
                <span className="tabular-nums">
                  هدف اليوم {Math.min(state.todayStars, dailyGoal)}/{dailyGoal}
                </span>
              </div>

              <div className="w-full sm:w-64 h-3 rounded-full bg-slate-100 overflow-hidden border border-slate-200">
                <div
                  className="h-full bg-amber-400 transition-all duration-300"
                  style={{ width: `${dailyProgressPct}%` }}
                />
              </div>

              <p className="text-sm font-bold text-slate-800">
                {canClaimDailyGift
                  ? 'أكملت نجوم اليوم! اضغط «افتح هديتك!» بالأعلى'
                  : isDailyGiftClaimed
                  ? 'أحسنت! استلمت هدية اليوم — واصل اللعب!'
                  : 'اجمع نجوماً باللعب لتفتح صندوق الهدية اليومية'}
              </p>
            </div>
          </div>

          {/* Mobile Mode Switcher + Sound Toggle */}
          <div className="flex flex-wrap items-center justify-between sm:justify-end gap-3 w-full sm:w-auto">
            <div className="flex md:hidden items-center gap-1.5 flex-wrap">
              {NAV_MODES.map((item) => {
                const active = mode === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleSwitchMode(item.id)}
                    className={`px-3 py-2 rounded-xl text-sm font-bold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      active
                        ? 'bg-sky-500 text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={handleToggleMute}
              aria-label={muted ? 'تشغيل الصوت' : 'كتم الصوت'}
              className="flex items-center gap-2 min-h-[44px] px-4 py-2 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              {muted ? (
                <>
                  <VolumeX className="w-5 h-5 text-rose-600" />
                  <span>الصوت مكتوم</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-5 h-5 text-sky-600" />
                  <span>الصوت يعمل</span>
                </>
              )}
            </button>
          </div>
        </section>

        {/* Newly Unlocked Sticker Banner */}
        {newlyUnlockedSticker && (
          <div className="rounded-3xl bg-amber-50 border-2 border-amber-400 p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4 shadow-sm">
            <div className="flex items-center gap-3">
              <Sparkles className="w-7 h-7 text-amber-600 shrink-0" />
              <div>
                <p className="font-display text-lg sm:text-xl font-extrabold text-slate-900">
                  ملصق جديد مفتوح: {newlyUnlockedSticker.title}!
                </p>
                <p className="text-sm text-slate-700">
                  رائع يا بطل! أضيف الملصق إلى ألبومك السحري.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  dismissNewSticker();
                  handleSwitchMode('rewards');
                }}
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm cursor-pointer whitespace-nowrap shrink-0"
              >
                شاهد الملصق
              </button>
              <button
                type="button"
                onClick={dismissNewSticker}
                className="px-3 py-2 rounded-xl bg-white border border-amber-200 text-slate-700 font-bold text-sm cursor-pointer whitespace-nowrap shrink-0"
              >
                إغلاق
              </button>
            </div>
          </div>
        )}

        {/* Active Learning View */}
        {mode === 'letters' && (
          <LettersView
            exploredLetters={state.exploredLetters}
            onExploreLetter={markLetterExplored}
            onTriggerBurst={triggerBurst}
          />
        )}

        {mode === 'numbers' && (
          <NumbersView
            exploredNumbers={state.exploredNumbers}
            onCompleteCount={markNumberExplored}
            onTriggerBurst={triggerBurst}
          />
        )}

        {mode === 'play' && (
          <PlayGameView
            onWinRound={() => awardStars(1)}
            onTriggerBurst={triggerBurst}
          />
        )}

        {mode === 'trace' && (
          <TraceLetterView
            onCompleteTrace={() => awardStars(1)}
            onTriggerBurst={triggerBurst}
          />
        )}

        {mode === 'rewards' && (
          <RewardsView
            state={state}
            dailyGoal={dailyGoal}
            canClaimDailyGift={canClaimDailyGift}
            isDailyGiftClaimed={isDailyGiftClaimed}
            onClaimDailyGift={claimDailyGift}
            onTriggerBurst={triggerBurst}
          />
        )}
      </main>

      <footer className="max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 text-center text-sm text-slate-500">
        حديقة الحروف والأرقام · تجربة تعليمية آمنة وممتعة للأطفال دون سن ٥ سنوات
      </footer>
    </div>
  );
}
