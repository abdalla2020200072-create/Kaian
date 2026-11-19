import React, { useEffect, useRef, useState } from 'react';
import { Eraser, Volume2, Check, Sparkles } from 'lucide-react';
import { ARABIC_LETTERS, ARABIC_NUMBERS } from '../data/arabicCurriculum';
import { ArabicIllustration } from './ArabicIllustrations';
import { soundEngine } from '../utils/soundEngine';

interface TraceLetterViewProps {
  onCompleteTrace: () => void;
  onTriggerBurst: (message?: string) => void;
}

const BRUSH_COLORS = [
  { id: 'sky', label: 'أزرق', hex: '#0EA5E9' },
  { id: 'amber', label: 'ذهبي', hex: '#F59E0B' },
  { id: 'rose', label: 'وردي', hex: '#F43F5E' },
  { id: 'emerald', label: 'أخضر', hex: '#10B981' },
];

export const TraceLetterView: React.FC<TraceLetterViewProps> = ({
  onCompleteTrace,
  onTriggerBurst,
}) => {
  const [mode, setMode] = useState<'letters' | 'numbers'>('letters');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [brushColor, setBrushColor] = useState(BRUSH_COLORS[0].hex);
  const [hasDrawn, setHasDrawn] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isDrawingRef = useRef(false);
  const lastPosRef = useRef<{ x: number; y: number } | null>(null);

  const items =
    mode === 'letters'
      ? ARABIC_LETTERS.slice(0, 14).map((l) => ({
          id: l.id,
          glyph: l.letterBare,
          label: `${l.name} · ${l.word}`,
          speech: l.wordSpeech,
          illustrationId: l.illustrationId,
        }))
      : ARABIC_NUMBERS.map((n) => ({
          id: String(n.value),
          glyph: n.arabicNumeral,
          label: n.word,
          speech: n.speechText,
          illustrationId: n.illustrationId,
        }));

  const current = items[selectedIndex] || items[0];

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasDrawn(false);
  };

  useEffect(() => {
    clearCanvas();
  }, [mode, selectedIndex]);

  const getPointerPos = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    isDrawingRef.current = true;
    const pos = getPointerPos(e);
    lastPosRef.current = pos;
    setHasDrawn(true);
    soundEngine.playPop();

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (ctx) {
      ctx.fillStyle = brushColor;
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, 11, 0, Math.PI * 2);
      ctx.fill();
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawingRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx || !lastPosRef.current) return;

    const pos = getPointerPos(e);
    ctx.strokeStyle = brushColor;
    ctx.lineWidth = 22;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    ctx.beginPath();
    ctx.moveTo(lastPosRef.current.x, lastPosRef.current.y);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();

    lastPosRef.current = pos;
  };

  const handlePointerUp = () => {
    isDrawingRef.current = false;
    lastPosRef.current = null;
  };

  const handleFinishDrawing = () => {
    soundEngine.playSuccessFanfare();
    soundEngine.speakArabic(`أَحْسَنْتَ! ${current.speech}`);
    onCompleteTrace();
    onTriggerBurst(`رسم جميل! ${current.glyph}`);
  };

  const handleSelectItem = (idx: number) => {
    setSelectedIndex(idx);
    const chosen = items[idx];
    soundEngine.playTapChime(idx);
    soundEngine.speakArabic(chosen.speech);
  };

  return (
    <div className="space-y-6">
      <section
        aria-label="لوحة تتبع الحروف والأرقام"
        className="rounded-3xl bg-white border border-amber-200/80 p-5 sm:p-8 shadow-sm"
      >
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900">
              ارسم وتتبع بيدك!
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-1">
              مرر إصبعك فوق الشكل المنقط لتلوين {current.label}
            </p>
          </div>

          {/* Mode Segmented Toggle */}
          <div className="flex items-center gap-1 p-1.5 bg-slate-100 rounded-2xl">
            <button
              type="button"
              onClick={() => {
                setMode('letters');
                setSelectedIndex(0);
              }}
              className={`px-4 py-2 rounded-xl font-bold text-sm sm:text-base transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                mode === 'letters'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              الحروف
            </button>
            <button
              type="button"
              onClick={() => {
                setMode('numbers');
                setSelectedIndex(0);
              }}
              className={`px-4 py-2 rounded-xl font-bold text-sm sm:text-base transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                mode === 'numbers'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              الأرقام
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Interactive Tracing Canvas */}
          <div className="lg:col-span-8 relative rounded-3xl border-2 border-dashed border-sky-300 bg-sky-50/30 overflow-hidden min-h-[320px] sm:min-h-[380px] flex items-center justify-center touch-none">
            {/* Guide Glyph */}
            <div
              aria-hidden="true"
              className="pointer-events-none select-none font-display font-extrabold text-[180px] sm:text-[230px] leading-none text-slate-300/65"
            >
              {current.glyph}
            </div>

            <canvas
              ref={canvasRef}
              width={720}
              height={420}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
              className="absolute inset-0 w-full h-full cursor-crosshair touch-none"
            />
          </div>

          {/* Right Controls & Example Card */}
          <div className="lg:col-span-4 flex flex-col justify-between gap-4">
            <div className="rounded-3xl bg-amber-50/70 border border-amber-200 p-5 flex items-center gap-4">
              <ArabicIllustration
                id={current.illustrationId}
                className="w-20 h-20 shrink-0"
              />
              <div>
                <p className="font-display text-2xl font-extrabold text-slate-900">
                  {current.label}
                </p>
                <button
                  type="button"
                  onClick={() => soundEngine.speakArabic(current.speech)}
                  className="mt-2 inline-flex items-center gap-1.5 text-sm font-bold text-amber-800 hover:text-amber-950 cursor-pointer"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>اسمع النطق</span>
                </button>
              </div>
            </div>

            {/* Color Picker */}
            <div className="rounded-3xl bg-slate-50 border border-slate-200 p-5">
              <p className="font-display text-base font-bold text-slate-800 mb-3">
                اختر لون القلم
              </p>
              <div className="grid grid-cols-4 gap-3">
                {BRUSH_COLORS.map((c) => {
                  const active = brushColor === c.hex;
                  return (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => {
                        setBrushColor(c.hex);
                        soundEngine.playPop();
                      }}
                      aria-label={c.label}
                      className={`h-12 rounded-2xl border-2 transition-transform cursor-pointer active:scale-95 ${
                        active ? 'border-slate-900 scale-105 shadow-sm' : 'border-white'
                      }`}
                      style={{ backgroundColor: c.hex }}
                    />
                  );
                })}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3">
              <button
                type="button"
                onClick={clearCanvas}
                className="flex items-center justify-center gap-2 min-h-[52px] px-5 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-base transition-colors cursor-pointer whitespace-nowrap shrink-0"
              >
                <Eraser className="w-5 h-5" />
                <span>مسح اللوحة</span>
              </button>

              <button
                type="button"
                onClick={handleFinishDrawing}
                disabled={!hasDrawn}
                className={`flex items-center justify-center gap-2 min-h-[56px] px-6 py-3.5 rounded-2xl font-display text-lg font-bold transition-all whitespace-nowrap shrink-0 ${
                  hasDrawn
                    ? 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-sm cursor-pointer active:scale-95'
                    : 'bg-slate-200 text-slate-500 cursor-not-allowed'
                }`}
              >
                {hasDrawn ? <Check className="w-6 h-6" /> : <Sparkles className="w-5 h-5" />}
                <span>أنهيت الرسم!</span>
              </button>
            </div>
          </div>
        </div>

        {/* Selector Strip */}
        <div className="mt-6 pt-5 border-t border-slate-100 flex flex-wrap gap-2.5">
          {items.map((item, idx) => {
            const active = idx === selectedIndex;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSelectItem(idx)}
                className={`min-w-[54px] min-h-[54px] px-3 rounded-2xl font-display text-2xl font-extrabold border-2 transition-all cursor-pointer tabular-nums ${
                  active
                    ? 'bg-sky-500 text-white border-sky-600 shadow-sm'
                    : 'bg-white text-slate-800 border-slate-200 hover:border-sky-300'
                }`}
              >
                {item.glyph}
              </button>
            );
          })}
        </div>
      </section>
    </div>
  );
};
