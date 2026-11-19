import { useCallback, useEffect, useState } from 'react';
import { STICKER_COLLECTION } from '../data/arabicCurriculum';

export const DAILY_STAR_GOAL = 5;
const STORAGE_KEY = 'arabic_kids_garden_progress_v1';

export interface DailyProgressState {
  totalStars: number;
  todayStars: number;
  lastActiveDate: string;
  streakDays: number;
  dailyGiftClaimedDate: string | null;
  exploredLetters: string[];
  exploredNumbers: number[];
  unlockedStickers: string[];
}

function getLocalDateKey(offsetDays: number = 0): string {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function createInitialState(): DailyProgressState {
  const today = getLocalDateKey(0);
  return {
    totalStars: 1,
    todayStars: 1,
    lastActiveDate: today,
    streakDays: 1,
    dailyGiftClaimedDate: null,
    exploredLetters: ['alif'],
    exploredNumbers: [1],
    unlockedStickers: ['welcome-owl'],
  };
}

function computeUnlockedStickers(
  totalStars: number,
  streakDays: number,
  existing: string[]
): string[] {
  const next = new Set(existing);
  for (const sticker of STICKER_COLLECTION) {
    const meetsStars = totalStars >= sticker.requiredStars;
    const meetsStreak =
      sticker.requiredStreak !== undefined && streakDays >= sticker.requiredStreak;
    if (meetsStars || meetsStreak) {
      next.add(sticker.id);
    }
  }
  return Array.from(next);
}

function loadState(): DailyProgressState {
  const today = getLocalDateKey(0);
  const yesterday = getLocalDateKey(-1);

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return createInitialState();
    const parsed = JSON.parse(raw) as DailyProgressState;
    if (!parsed || typeof parsed.totalStars !== 'number') {
      return createInitialState();
    }

    let streakDays = parsed.streakDays || 1;
    let todayStars = parsed.todayStars || 0;

    if (parsed.lastActiveDate !== today) {
      todayStars = 0;
      if (parsed.lastActiveDate === yesterday) {
        streakDays = Math.min(streakDays + 1, 30);
      } else {
        streakDays = 1;
      }
    }

    const unlockedStickers = computeUnlockedStickers(
      parsed.totalStars,
      streakDays,
      parsed.unlockedStickers || ['welcome-owl']
    );

    return {
      ...parsed,
      todayStars,
      lastActiveDate: today,
      streakDays,
      unlockedStickers,
    };
  } catch {
    return createInitialState();
  }
}

export function useRewardsStore() {
  const [state, setState] = useState<DailyProgressState>(() => loadState());
  const [newlyUnlockedStickerId, setNewlyUnlockedStickerId] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Ignore storage quota errors
    }
  }, [state]);

  const awardStars = useCallback((amount: number = 1) => {
    const today = getLocalDateKey(0);
    setState((prev) => {
      const nextTotal = prev.totalStars + amount;
      const nextToday = (prev.lastActiveDate === today ? prev.todayStars : 0) + amount;
      const nextStickers = computeUnlockedStickers(
        nextTotal,
        prev.streakDays,
        prev.unlockedStickers
      );

      const brandNew = nextStickers.find((id) => !prev.unlockedStickers.includes(id));
      if (brandNew) {
        setNewlyUnlockedStickerId(brandNew);
      }

      return {
        ...prev,
        totalStars: nextTotal,
        todayStars: nextToday,
        lastActiveDate: today,
        unlockedStickers: nextStickers,
      };
    });
  }, []);

  const markLetterExplored = useCallback((letterId: string) => {
    setState((prev) => {
      if (prev.exploredLetters.includes(letterId)) {
        return prev;
      }
      const nextLetters = [...prev.exploredLetters, letterId];
      const nextTotal = prev.totalStars + 1;
      const today = getLocalDateKey(0);
      const nextToday = (prev.lastActiveDate === today ? prev.todayStars : 0) + 1;
      const nextStickers = computeUnlockedStickers(
        nextTotal,
        prev.streakDays,
        prev.unlockedStickers
      );
      const brandNew = nextStickers.find((id) => !prev.unlockedStickers.includes(id));
      if (brandNew) {
        setNewlyUnlockedStickerId(brandNew);
      }
      return {
        ...prev,
        exploredLetters: nextLetters,
        totalStars: nextTotal,
        todayStars: nextToday,
        lastActiveDate: today,
        unlockedStickers: nextStickers,
      };
    });
  }, []);

  const markNumberExplored = useCallback((numValue: number) => {
    setState((prev) => {
      const isNew = !prev.exploredNumbers.includes(numValue);
      const nextNumbers = isNew ? [...prev.exploredNumbers, numValue] : prev.exploredNumbers;
      const nextTotal = prev.totalStars + (isNew ? 1 : 1);
      const today = getLocalDateKey(0);
      const nextToday = (prev.lastActiveDate === today ? prev.todayStars : 0) + 1;
      const nextStickers = computeUnlockedStickers(
        nextTotal,
        prev.streakDays,
        prev.unlockedStickers
      );
      const brandNew = nextStickers.find((id) => !prev.unlockedStickers.includes(id));
      if (brandNew) {
        setNewlyUnlockedStickerId(brandNew);
      }
      return {
        ...prev,
        exploredNumbers: nextNumbers,
        totalStars: nextTotal,
        todayStars: nextToday,
        lastActiveDate: today,
        unlockedStickers: nextStickers,
      };
    });
  }, []);

  const claimDailyGift = useCallback(() => {
    const today = getLocalDateKey(0);
    setState((prev) => {
      if (prev.dailyGiftClaimedDate === today) return prev;
      const bonusStars = 2;
      const nextTotal = prev.totalStars + bonusStars;
      const nextToday = prev.todayStars + bonusStars;
      const nextStickers = computeUnlockedStickers(
        nextTotal,
        prev.streakDays,
        prev.unlockedStickers
      );
      const brandNew = nextStickers.find((id) => !prev.unlockedStickers.includes(id));
      if (brandNew) {
        setNewlyUnlockedStickerId(brandNew);
      }
      return {
        ...prev,
        totalStars: nextTotal,
        todayStars: nextToday,
        dailyGiftClaimedDate: today,
        unlockedStickers: nextStickers,
      };
    });
  }, []);

  const dismissNewSticker = useCallback(() => {
    setNewlyUnlockedStickerId(null);
  }, []);

  const today = getLocalDateKey(0);
  const canClaimDailyGift =
    state.todayStars >= DAILY_STAR_GOAL && state.dailyGiftClaimedDate !== today;
  const isDailyGiftClaimed = state.dailyGiftClaimedDate === today;

  return {
    state,
    dailyGoal: DAILY_STAR_GOAL,
    canClaimDailyGift,
    isDailyGiftClaimed,
    newlyUnlockedStickerId,
    awardStars,
    markLetterExplored,
    markNumberExplored,
    claimDailyGift,
    dismissNewSticker,
  };
}
