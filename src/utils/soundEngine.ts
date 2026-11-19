class SoundEngine {
  private ctx: AudioContext | null = null;
  private muted: boolean = false;

  public setMuted(muted: boolean) {
    this.muted = muted;
    if (muted && typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }

  public isMuted(): boolean {
    return this.muted;
  }

  private getContext(): AudioContext | null {
    if (this.muted || typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  private playTone(
    freq: number,
    duration: number,
    delay: number = 0,
    type: OscillatorType = 'sine',
    gainLevel: number = 0.16
  ) {
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime + delay;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, now);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.exponentialRampToValueAtTime(gainLevel, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + duration + 0.02);
  }

  public playTapChime(index: number = 0) {
    const pentatonic = [523.25, 587.33, 659.25, 783.99, 880.0, 1046.5];
    const freq = pentatonic[Math.abs(index) % pentatonic.length];
    this.playTone(freq, 0.22, 0, 'triangle', 0.18);
    this.playTone(freq * 2, 0.12, 0.02, 'sine', 0.06);
  }

  public playCountNote(step: number) {
    const scale = [
      523.25, 587.33, 659.25, 698.46, 783.99, 880.0, 987.77, 1046.5, 1174.66, 1318.51,
    ];
    const freq = scale[Math.min(Math.max(step - 1, 0), scale.length - 1)];
    this.playTone(freq, 0.26, 0, 'triangle', 0.2);
    this.playTone(freq * 1.5, 0.16, 0.03, 'sine', 0.07);
  }

  public playPop() {
    const ctx = this.getContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(340, now);
    osc.frequency.exponentialRampToValueAtTime(760, now + 0.09);
    gain.gain.setValueAtTime(0.14, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.11);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.12);
  }

  public playSuccessFanfare() {
    const notes = [523.25, 659.25, 783.99, 1046.5];
    notes.forEach((n, i) => {
      this.playTone(n, 0.24, i * 0.085, 'triangle', 0.18);
    });
  }

  public playRewardCelebration() {
    const melody = [
      { f: 523.25, d: 0.18, t: 0 },
      { f: 659.25, d: 0.18, t: 0.1 },
      { f: 783.99, d: 0.18, t: 0.2 },
      { f: 1046.5, d: 0.4, t: 0.3 },
      { f: 880.0, d: 0.16, t: 0.5 },
      { f: 1046.5, d: 0.5, t: 0.62 },
    ];
    melody.forEach((m) => this.playTone(m.f, m.d, m.t, 'triangle', 0.2));
  }

  public playGentleTryAgain() {
    this.playTone(293.66, 0.16, 0, 'sine', 0.12);
    this.playTone(246.94, 0.2, 0.1, 'sine', 0.1);
  }

  public speakArabic(text: string, rate: number = 0.86) {
    if (this.muted || typeof window === 'undefined' || !('speechSynthesis' in window)) {
      return;
    }
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      const voices = window.speechSynthesis.getVoices();
      const arabicVoice =
        voices.find((v) => v.lang.toLowerCase().startsWith('ar-sa')) ||
        voices.find((v) => v.lang.toLowerCase().startsWith('ar-eg')) ||
        voices.find((v) => v.lang.toLowerCase().startsWith('ar'));
      if (arabicVoice) {
        utterance.voice = arabicVoice;
      }
      utterance.lang = arabicVoice?.lang || 'ar-SA';
      utterance.rate = rate;
      utterance.pitch = 1.1;
      utterance.volume = 1.0;
      window.speechSynthesis.speak(utterance);
    } catch {
      // Ignore speech synthesis errors in restricted environments
    }
  }
}

export const soundEngine = new SoundEngine();
