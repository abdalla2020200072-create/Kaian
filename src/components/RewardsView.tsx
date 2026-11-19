import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Gift, Star, Lock, CalendarCheck, Volume2 } from 'lucide-react';
import { STICKER_COLLECTION, ACCENT_STYLES } from '../data/arabicCurriculum';
import { DailyProgressState } from '../hooks/useRewardsStore';
import { ArabicIllustration } from './ArabicIllustrations';
import { soundEngine } from '../utils/soundEngine';

interface RewardsViewProps {
  state: DailyProgressState;
  dailyGoal: number;
  canClaimDailyGift: boolean;
  isDailyGiftClaimed: boolean;
  onClaimDailyGift: () => void;
  onTriggerBurst: (message?: string) => void;
}

const WEEK_DAYS = [
  'اليوم ١',
  'اليوم ٢',
  'اليوم ٣',
  'اليوم ٤',
  'اليوم ٥',
  'اليوم ٦',
  'اليوم ٧',
];

export const RewardsView: React.FC<RewardsViewProps> = ({
  state,
  dailyGoal,
  canClaimDailyGift,
  isDailyGiftClaimed,
  onClaimDailyGift,
  onTriggerBurst,
}) => {
  const [meadowError, setMeadowError] = useState(false);
  const [chestError, setChestError] = useState(false);
  const [failedStickerImages, setFailedStickerImages] = useState<Record<string, boolean>>({});
  const [bouncingSticker, setBouncingSticker] = useState<string | null>(null);

  const progressRatio = Math.min(state.todayStars / dailyGoal, 1);

  const handleOpenChest = () => {
    if (!canClaimDailyGift) {
      soundEngine.playPop();
      if (isDailyGiftClaimed) {
        soundEngine.speakArabic('لَقَدْ فَتَحْتَ هَدِيَّةَ الْيَوْمِ! عُدْ غَداً لِهَدِيَّةٍ جَدِيدَةٍ!');
      } else {
        const remaining = Math.max(dailyGoal - state.todayStars, 1);
        soundEngine.speakArabic(`اِجْمَعْ ${remaining} نُجُومٍ أُخْرَى لِفَتْحِ الصُّنْدُوقِ!`);
      }
      return;
    }

    onClaimDailyGift();
    soundEngine.playRewardCelebration();
    soundEngine.speakArabic('مَبْرُوكْ! فَتَحْتَ هَدِيَّةَ الْيَوْمِ وَحَصَلْتَ عَلَى نَجْمَتَيْنِ إِضَافِيَّتَيْنِ!');
    onTriggerBurst('هدية اليوم! +٢ نجمتان');
  };

  const handleTapSticker = (id: string, title: string, isUnlocked: boolean) => {
    if (!isUnlocked) {
      soundEngine.playGentleTryAgain();
      soundEngine.speakArabic(`اِجْمَعْ نُجُوماً أَكْثَرَ لِفَتْحِ ${title}`);
      return;
    }
    setBouncingSticker(id);
    soundEngine.playSuccessFanfare();
    soundEngine.speakArabic(title);
    setTimeout(() => setBouncingSticker(null), 500);
  };

  return (
    <div className="space-y-8">
      {/* Garden Hero Banner + Daily Chest Split */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Daily Goal & Streak Panel */}
        <div className="lg:col-span-7 rounded-3xl bg-white border border-amber-200/80 overflow-hidden shadow-sm flex flex-col justify-between">
          <div className="relative h-44 sm:h-52 w-full bg-gradient-to-l from-sky-100 to-emerald-100 overflow-hidden">
            {!meadowError ? (
              <img
                src="/src/assets/images/garden_sunny_meadow_1795045858216.jpg"
                alt="حديقة النجوم السعيدة"
                referrerPolicy="no-referrer"
                onError={() => setMeadowError(true)}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <ArabicIllustration id="sun" className="w-24 h-24" />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/65 via-slate-900/15 to-transparent" />
            <div className="absolute bottom-4 right-5 left-5 text-white">
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-balance">
                حديقة المكافآت والملصقات
              </h2>
              <p className="text-sm sm:text-base text-white/95 mt-0.5">
                تعلم كل يوم لتحصل على ملصقات جديدة وتكبر حديقتك!
              </p>
            </div>
          </div>

          {/* 7-Day Streak Stepping Path */}
          <div className="p-6 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <CalendarCheck className="w-6 h-6 text-emerald-600" />
                <h3 className="font-display text-xl font-bold text-slate-900">
                  رحلة الـ ٧ أيام المتتالية
                </h3>
              </div>
              <span className="font-display text-base font-bold text-emerald-700 tabular-nums">
                سلسلتك الحالية: {state.streakDays} {state.streakDays === 1 ? 'يوم' : 'أيام'}
              </span>
            </div>

            <div className="grid grid-cols-7 gap-2">
              {WEEK_DAYS.map((label, idx) => {
                const dayNumber = idx + 1;
                const achieved = state.streakDays >= dayNumber;
                return (
                  <div
                    key={label}
                    className={`flex flex-col items-center justify-center rounded-2xl py-3 px-1 border-2 text-center ${
                      achieved
                        ? 'bg-amber-50 border-amber-400 text-amber-900'
                        : 'bg-slate-50 border-slate-200 text-slate-500'
                    }`}
                  >
                    <Star
                      className={`w-6 h-6 ${
                        achieved
                          ? 'text-amber-500 fill-amber-400'
                          : 'text-slate-300'
                      }`}
                    />
                    <span className="mt-1.5 text-xs font-bold whitespace-nowrap">
                      {label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Daily Gift Chest Card */}
        <div className="lg:col-span-5 rounded-3xl bg-white border border-amber-200/80 p-6 shadow-sm flex flex-col items-center justify-between text-center">
          <div className="w-full space-y-2">
            <h3 className="font-display text-2xl font-extrabold text-slate-900">
              صندوق هدية اليوم
            </h3>
            <p className="text-base text-slate-600">
              اجمع {dailyGoal} نجوم اليوم لفتح الصندوق! ({Math.min(state.todayStars, dailyGoal)} /{' '}
              <span className="tabular-nums">{dailyGoal}</span>)
            </p>

            {/* Progress Bar */}
            <div className="w-full h-4 rounded-full bg-slate-100 overflow-hidden border border-slate-200 mt-3">
              <div
                className="h-full bg-amber-400 transition-all duration-300"
                style={{ width: `${progressRatio * 100}%` }}
              />
            </div>
          </div>

          <motion.button
            type="button"
            onClick={handleOpenChest}
            animate={canClaimDailyGift ? { scale: [1, 1.04, 1] } : { scale: 1 }}
            transition={
              canClaimDailyGift
                ? { repeat: Infinity, duration: 1.6 }
                : undefined
            }
            className="my-5 rounded-3xl overflow-hidden border-2 border-amber-200 bg-amber-50/40 p-3 cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-amber-300"
          >
            {!chestError ? (
              <img
                src="/src/assets/images/reward_gift_chest_1795045858495.jpg"
                alt="صندوق الهدايا السحري"
                referrerPolicy="no-referrer"
                onError={() => setChestError(true)}
                className="w-44 h-44 object-cover rounded-2xl"
              />
            ) : (
              <div className="w-44 h-44 flex items-center justify-center">
                <ArabicIllustration id="gift" className="w-32 h-32" />
              </div>
            )}
          </motion.button>

          <button
            type="button"
            onClick={handleOpenChest}
            className={`w-full flex items-center justify-center gap-2 min-h-[54px] px-6 py-3 rounded-2xl font-display text-lg font-bold transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
              canClaimDailyGift
                ? 'bg-amber-500 hover:bg-amber-600 text-white shadow-sm'
                : isDailyGiftClaimed
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Gift className="w-6 h-6" />
            <span>
              {canClaimDailyGift
                ? 'افتح هدية اليوم الآن!'
                : isDailyGiftClaimed
                ? 'تم فتح هدية اليوم بنجاح'
                : `تبقى ${Math.max(dailyGoal - state.todayStars, 1)} نجوم للهدية`}
            </span>
          </button>
        </div>
      </section>

      {/* Interactive Sticker Album */}
      <section aria-label="ألبوم الملصقات التحفيزية" className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h3 className="font-display text-2xl font-extrabold text-slate-900">
              ألبوم ملصقاتي السحرية
            </h3>
            <p className="text-sm sm:text-base text-slate-600">
              اضغط على أي ملصق مفتوح لتسمع اسمه! فتحت{' '}
              <span className="font-bold text-slate-900 tabular-nums">
                {state.unlockedStickers.length} من {STICKER_COLLECTION.length}
              </span>
            </p>
          </div>
          <div className="flex items-center gap-2 text-lg font-display font-extrabold text-amber-700 tabular-nums">
            <Star className="w-6 h-6 text-amber-500 fill-amber-400" />
            <span>مجموع نجومك: {state.totalStars}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {STICKER_COLLECTION.map((sticker) => {
            const isUnlocked = state.unlockedStickers.includes(sticker.id);
            const theme = ACCENT_STYLES[sticker.accent];
            const isBouncing = bouncingSticker === sticker.id;

            return (
              <motion.button
                key={sticker.id}
                type="button"
                onClick={() =>
                  handleTapSticker(sticker.id, sticker.title, isUnlocked)
                }
                animate={
                  isBouncing ? { scale: [1, 1.08, 1], rotate: [0, -2, 2, 0] } : {}
                }
                className={`flex items-center gap-4 rounded-3xl border-2 p-5 text-right transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-4 ${theme.ring} ${
                  isUnlocked
                    ? `bg-white ${theme.border} hover:shadow-md`
                    : 'bg-slate-50 border-slate-200 opacity-80'
                }`}
              >
                <div
                  className={`relative w-20 h-20 rounded-2xl flex items-center justify-center shrink-0 overflow-hidden ${
                    isUnlocked ? theme.bgSoft : 'bg-slate-200/70'
                  }`}
                >
                  {sticker.imageSrc && isUnlocked && !failedStickerImages[sticker.id] ? (
                    <img
                      src={sticker.imageSrc}
                      alt={sticker.title}
                      referrerPolicy="no-referrer"
                      onError={() =>
                        setFailedStickerImages((prev) => ({
                          ...prev,
                          [sticker.id]: true,
                        }))
                      }
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className={isUnlocked ? '' : 'opacity-30 grayscale'}>
                      <ArabicIllustration
                        id={sticker.illustrationId}
                        className="w-16 h-16"
                      />
                    </div>
                  )}
                  {!isUnlocked && (
                    <div className="absolute inset-0 flex items-center justify-center bg-slate-900/10">
                      <Lock className="w-7 h-7 text-slate-700" />
                    </div>
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-display text-lg font-extrabold text-slate-900 truncate">
                      {sticker.title}
                    </h4>
                    {isUnlocked && (
                      <Volume2 className="w-4 h-4 text-sky-600 shrink-0" />
                    )}
                  </div>
                  <p className="text-sm text-slate-600 mt-1">{sticker.subtitle}</p>
                  <p className="text-xs font-bold mt-2 text-amber-700">
                    {isUnlocked ? 'مفتوح · اضغط للمرح' : `يُفتح عند ${sticker.requiredStars} نجوم`}
                  </p>
                </div>
              </motion.button>
            );
          })}
        </div>
      </section>
    </div>
  );
};
