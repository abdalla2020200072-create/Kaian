import React from 'react';

interface IllustrationProps {
  id: string;
  className?: string;
}

export const ArabicIllustration: React.FC<IllustrationProps> = ({
  id,
  className = 'w-24 h-24',
}) => {
  switch (id) {
    case 'rabbit':
      return (
        <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
          <ellipse cx="44" cy="30" rx="10" ry="26" fill="#FDE8EC" stroke="#E11D48" strokeWidth="3" />
          <ellipse cx="44" cy="30" rx="5" ry="18" fill="#FDA4AF" />
          <ellipse cx="76" cy="30" rx="10" ry="26" fill="#FDE8EC" stroke="#E11D48" strokeWidth="3" />
          <ellipse cx="76" cy="30" rx="5" ry="18" fill="#FDA4AF" />
          <circle cx="60" cy="72" r="32" fill="#FFF1F2" stroke="#E11D48" strokeWidth="3" />
          <circle cx="48" cy="66" r="4.5" fill="#1E293B" />
          <circle cx="72" cy="66" r="4.5" fill="#1E293B" />
          <circle cx="49.5" cy="64.5" r="1.5" fill="#FFFFFF" />
          <circle cx="73.5" cy="64.5" r="1.5" fill="#FFFFFF" />
          <ellipse cx="38" cy="76" rx="6" ry="4" fill="#FECDD3" />
          <ellipse cx="82" cy="76" rx="6" ry="4" fill="#FECDD3" />
          <polygon points="56,74 64,74 60,79" fill="#FB7185" />
          <path d="M52 84 Q60 91 68 84" fill="none" stroke="#1E293B" strokeWidth="2.8" strokeLinecap="round" />
        </svg>
      );

    case 'duck':
      return (
        <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
          <ellipse cx="56" cy="80" rx="34" ry="24" fill="#FDE047" stroke="#D97706" strokeWidth="3" />
          <circle cx="72" cy="44" r="22" fill="#FEF08A" stroke="#D97706" strokeWidth="3" />
          <path d="M36 74 Q54 64 66 80 Q50 92 36 74 Z" fill="#FACC15" stroke="#D97706" strokeWidth="2.5" />
          <ellipse cx="94" cy="48" rx="13" ry="7" fill="#FB923C" stroke="#C2410C" strokeWidth="2.5" />
          <circle cx="77" cy="40" r="4" fill="#1E293B" />
          <circle cx="78.2" cy="38.8" r="1.4" fill="#FFFFFF" />
          <path d="M50 103 L50 112 M44 112 L56 112" stroke="#EA580C" strokeWidth="3" strokeLinecap="round" />
          <path d="M68 103 L68 112 M62 112 L74 112" stroke="#EA580C" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );

    case 'apple':
      return (
        <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
          <path d="M60 28 C60 16, 68 12, 72 12" fill="none" stroke="#78350F" strokeWidth="4" strokeLinecap="round" />
          <path d="M62 24 C74 12, 92 16, 86 30 C78 34, 66 32, 62 24 Z" fill="#22C55E" stroke="#15803D" strokeWidth="2.5" />
          <path
            d="M60 34 C44 26, 22 36, 24 66 C26 92, 46 106, 60 100 C74 106, 94 92, 96 66 C98 36, 76 26, 60 34 Z"
            fill="#F43F5E"
            stroke="#BE123C"
            strokeWidth="3"
          />
          <ellipse cx="42" cy="52" rx="6" ry="12" transform="rotate(-20 42 52)" fill="#FDA4AF" opacity="0.7" />
          <circle cx="48" cy="64" r="3.5" fill="#1E293B" />
          <circle cx="72" cy="64" r="3.5" fill="#1E293B" />
          <path d="M53 74 Q60 81 67 74" fill="none" stroke="#1E293B" strokeWidth="2.8" strokeLinecap="round" />
        </svg>
      );

    case 'fox':
      return (
        <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
          <polygon points="24,22 48,38 30,58" fill="#FB923C" stroke="#C2410C" strokeWidth="3" strokeLinejoin="round" />
          <polygon points="96,22 72,38 90,58" fill="#FB923C" stroke="#C2410C" strokeWidth="3" strokeLinejoin="round" />
          <polygon points="28,28 42,38 32,48" fill="#FED7AA" />
          <polygon points="92,28 78,38 88,48" fill="#FED7AA" />
          <path d="M24 62 Q60 28 96 62 L76 96 Q60 104 44 96 Z" fill="#F97316" stroke="#C2410C" strokeWidth="3" strokeLinejoin="round" />
          <path d="M26 64 Q44 68 60 98 Q42 96 26 64 Z" fill="#FFF7ED" />
          <path d="M94 64 Q76 68 60 98 Q78 96 94 64 Z" fill="#FFF7ED" />
          <circle cx="45" cy="62" r="4.2" fill="#1E293B" />
          <circle cx="75" cy="62" r="4.2" fill="#1E293B" />
          <circle cx="60" cy="84" r="5" fill="#1E293B" />
        </svg>
      );

    case 'camel':
      return (
        <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
          <path d="M34 86 L34 108 M46 86 L46 108 M72 86 L72 108 M84 86 L84 108" stroke="#B45309" strokeWidth="6" strokeLinecap="round" />
          <path d="M26 76 C26 48, 48 34, 60 34 C72 34, 82 52, 86 64 L96 42 C102 32, 114 36, 110 48 L96 80 C84 88, 36 88, 26 76 Z" fill="#FBBF24" stroke="#B45309" strokeWidth="3" strokeLinejoin="round" />
          <circle cx="102" cy="40" r="10" fill="#FCD34D" stroke="#B45309" strokeWidth="2.5" />
          <circle cx="105" cy="38" r="2.5" fill="#1E293B" />
          <path d="M100 44 Q104 47 108 44" fill="none" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    case 'horse':
      return (
        <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
          <path d="M36 30 Q20 48 30 78 L46 74 Z" fill="#78350F" />
          <path d="M40 24 L48 14 L56 26" fill="#B45309" stroke="#78350F" strokeWidth="2.5" strokeLinejoin="round" />
          <path d="M68 24 L76 14 L82 28" fill="#B45309" stroke="#78350F" strokeWidth="2.5" strokeLinejoin="round" />
          <path d="M42 26 C64 20, 84 32, 88 58 C92 78, 82 96, 62 96 C42 96, 36 82, 36 62 C36 42, 38 30, 42 26 Z" fill="#D97706" stroke="#78350F" strokeWidth="3" />
          <ellipse cx="64" cy="78" rx="20" ry="15" fill="#FDE68A" stroke="#78350F" strokeWidth="2.5" />
          <circle cx="50" cy="48" r="4" fill="#1E293B" />
          <circle cx="74" cy="48" r="4" fill="#1E293B" />
          <circle cx="56" cy="76" r="2.5" fill="#78350F" />
          <circle cx="72" cy="76" r="2.5" fill="#78350F" />
          <path d="M56 84 Q64 90 72 84" fill="none" stroke="#78350F" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );

    case 'sheep':
      return (
        <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
          <path d="M44 88 L44 108 M76 88 L76 108" stroke="#334155" strokeWidth="6" strokeLinecap="round" />
          <circle cx="40" cy="54" r="18" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="2.5" />
          <circle cx="80" cy="54" r="18" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="2.5" />
          <circle cx="60" cy="40" r="20" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="2.5" />
          <circle cx="46" cy="74" r="18" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="2.5" />
          <circle cx="74" cy="74" r="18" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="2.5" />
          <circle cx="60" cy="64" r="22" fill="#FFFFFF" />
          <ellipse cx="32" cy="60" rx="10" ry="5" transform="rotate(-25 32 60)" fill="#334155" />
          <ellipse cx="88" cy="60" rx="10" ry="5" transform="rotate(25 88 60)" fill="#334155" />
          <ellipse cx="60" cy="64" rx="18" ry="16" fill="#334155" />
          <circle cx="53" cy="61" r="3.2" fill="#FFFFFF" />
          <circle cx="67" cy="61" r="3.2" fill="#FFFFFF" />
          <path d="M54 71 Q60 76 66 71" fill="none" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" />
        </svg>
      );

    case 'rooster':
      return (
        <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
          <path d="M52 24 C46 12, 58 10, 60 20 C64 10, 74 12, 70 24 C78 16, 86 22, 76 32 Z" fill="#EF4444" stroke="#B91C1C" strokeWidth="2.5" />
          <ellipse cx="56" cy="72" rx="30" ry="24" fill="#FB923C" stroke="#C2410C" strokeWidth="3" />
          <path d="M26 70 Q12 46 28 38 Q30 56 38 64 Z" fill="#10B981" stroke="#047857" strokeWidth="2.5" />
          <path d="M26 74 Q10 64 18 52 Q26 62 34 70 Z" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="2.5" />
          <circle cx="66" cy="44" r="18" fill="#FEF3C7" stroke="#D97706" strokeWidth="3" />
          <polygon points="84,42 98,46 84,52" fill="#F59E0B" stroke="#B45309" strokeWidth="2" />
          <circle cx="71" cy="40" r="3.5" fill="#1E293B" />
          <ellipse cx="76" cy="56" rx="5" ry="7" fill="#EF4444" />
        </svg>
      );

    case 'corn':
      return (
        <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
          <ellipse cx="60" cy="56" rx="18" ry="38" fill="#FACC15" stroke="#CA8A04" strokeWidth="3" />
          <path d="M44 40 L76 40 M42 54 L78 54 M44 68 L76 68 M52 22 L52 84 M68 22 L68 84" stroke="#EAB308" strokeWidth="2.5" />
          <path d="M60 98 C34 94, 24 68, 34 46 C42 62, 48 76, 60 98 Z" fill="#22C55E" stroke="#15803D" strokeWidth="3" />
          <path d="M60 98 C86 94, 96 68, 86 46 C78 62, 72 76, 60 98 Z" fill="#4ADE80" stroke="#15803D" strokeWidth="3" />
        </svg>
      );

    case 'pomegranate':
      return (
        <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
          <polygon points="48,26 54,14 60,22 66,14 72,26" fill="#E11D48" stroke="#9F1239" strokeWidth="2.5" strokeLinejoin="round" />
          <circle cx="60" cy="64" r="36" fill="#F43F5E" stroke="#9F1239" strokeWidth="3" />
          <circle cx="48" cy="58" r="3.5" fill="#1E293B" />
          <circle cx="72" cy="58" r="3.5" fill="#1E293B" />
          <path d="M52 70 Q60 77 68 70" fill="none" stroke="#1E293B" strokeWidth="2.8" strokeLinecap="round" />
          <circle cx="40" cy="48" r="4" fill="#FDA4AF" opacity="0.7" />
        </svg>
      );

    case 'giraffe':
      return (
        <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
          <path d="M50 56 L54 104 L68 104 L72 56 Z" fill="#FCD34D" stroke="#B45309" strokeWidth="3" />
          <line x1="52" y1="22" x2="48" y2="12" stroke="#B45309" strokeWidth="3" strokeLinecap="round" />
          <line x1="68" y1="22" x2="72" y2="12" stroke="#B45309" strokeWidth="3" strokeLinecap="round" />
          <circle cx="48" cy="12" r="4" fill="#B45309" />
          <circle cx="72" cy="12" r="4" fill="#B45309" />
          <ellipse cx="60" cy="38" rx="22" ry="18" fill="#FDE047" stroke="#B45309" strokeWidth="3" />
          <circle cx="60" cy="72" r="5" fill="#D97706" />
          <circle cx="56" cy="88" r="4" fill="#D97706" />
          <circle cx="52" cy="34" r="3.5" fill="#1E293B" />
          <circle cx="68" cy="34" r="3.5" fill="#1E293B" />
          <ellipse cx="60" cy="46" rx="12" ry="7" fill="#FEF3C7" stroke="#B45309" strokeWidth="2" />
          <path d="M55 46 Q60 50 65 46" fill="none" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    case 'fish':
      return (
        <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
          <polygon points="84,60 108,38 108,82" fill="#38BDF8" stroke="#0369A1" strokeWidth="3" strokeLinejoin="round" />
          <ellipse cx="54" cy="60" rx="36" ry="26" fill="#0EA5E9" stroke="#0369A1" strokeWidth="3" />
          <path d="M50 34 Q60 18 70 36" fill="#38BDF8" stroke="#0369A1" strokeWidth="2.5" />
          <circle cx="34" cy="54" r="5" fill="#FFFFFF" />
          <circle cx="33" cy="54" r="2.5" fill="#1E293B" />
          <path d="M24 66 Q32 72 38 66" fill="none" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="14" cy="44" r="4" fill="#BAE6FD" />
          <circle cx="10" cy="30" r="3" fill="#BAE6FD" />
        </svg>
      );

    case 'sun':
      return (
        <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
            <line
              key={deg}
              x1="60"
              y1="14"
              x2="60"
              y2="24"
              stroke="#F59E0B"
              strokeWidth="6"
              strokeLinecap="round"
              transform={`rotate(${deg} 60 60)`}
            />
          ))}
          <circle cx="60" cy="60" r="28" fill="#FDE047" stroke="#D97706" strokeWidth="3" />
          <circle cx="50" cy="56" r="3.5" fill="#1E293B" />
          <circle cx="70" cy="56" r="3.5" fill="#1E293B" />
          <path d="M51 66 Q60 74 69 66" fill="none" stroke="#1E293B" strokeWidth="2.8" strokeLinecap="round" />
        </svg>
      );

    case 'rocket':
      return (
        <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
          <path d="M48 86 L60 112 L72 86 Z" fill="#FACC15" stroke="#EA580C" strokeWidth="2.5" />
          <path d="M36 72 L22 92 L42 86 Z" fill="#F43F5E" stroke="#BE123C" strokeWidth="2.5" strokeLinejoin="round" />
          <path d="M84 72 L98 92 L78 86 Z" fill="#F43F5E" stroke="#BE123C" strokeWidth="2.5" strokeLinejoin="round" />
          <path d="M60 14 C78 30, 82 58, 76 86 L44 86 C38 58, 42 30, 60 14 Z" fill="#F8FAFC" stroke="#334155" strokeWidth="3" />
          <path d="M47 34 L73 34 C69 24, 65 18, 60 14 C55 18, 51 24, 47 34 Z" fill="#F43F5E" />
          <circle cx="60" cy="54" r="11" fill="#38BDF8" stroke="#0369A1" strokeWidth="3" />
        </svg>
      );

    case 'frog':
      return (
        <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
          <circle cx="40" cy="40" r="14" fill="#4ADE80" stroke="#15803D" strokeWidth="3" />
          <circle cx="80" cy="40" r="14" fill="#4ADE80" stroke="#15803D" strokeWidth="3" />
          <ellipse cx="60" cy="70" rx="38" ry="28" fill="#4ADE80" stroke="#15803D" strokeWidth="3" />
          <ellipse cx="60" cy="78" rx="24" ry="15" fill="#DCFCE7" />
          <circle cx="40" cy="40" r="6" fill="#FFFFFF" />
          <circle cx="80" cy="40" r="6" fill="#FFFFFF" />
          <circle cx="40" cy="40" r="3" fill="#1E293B" />
          <circle cx="80" cy="40" r="3" fill="#1E293B" />
          <path d="M44 68 Q60 80 76 68" fill="none" stroke="#15803D" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );

    case 'plane':
      return (
        <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
          <polygon points="50,52 24,24 38,24 70,52" fill="#38BDF8" stroke="#0369A1" strokeWidth="2.5" strokeLinejoin="round" />
          <polygon points="50,68 24,96 38,96 70,68" fill="#38BDF8" stroke="#0369A1" strokeWidth="2.5" strokeLinejoin="round" />
          <path d="M18 60 C18 52, 26 48, 42 48 L88 48 C102 48, 108 54, 108 60 C108 66, 102 72, 88 72 L42 72 C26 72, 18 68, 18 60 Z" fill="#F8FAFC" stroke="#0369A1" strokeWidth="3" />
          <circle cx="84" cy="58" r="5" fill="#38BDF8" />
          <circle cx="66" cy="58" r="4" fill="#BAE6FD" />
          <circle cx="50" cy="58" r="4" fill="#BAE6FD" />
        </svg>
      );

    case 'envelope':
      return (
        <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
          <rect x="18" y="34" width="84" height="56" rx="10" fill="#FEF3C7" stroke="#D97706" strokeWidth="3" />
          <path d="M20 38 L60 66 L100 38" fill="none" stroke="#D97706" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="60" cy="64" r="9" fill="#F43F5E" />
        </svg>
      );

    case 'bird':
      return (
        <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
          <ellipse cx="58" cy="66" rx="30" ry="24" fill="#38BDF8" stroke="#0284C7" strokeWidth="3" />
          <path d="M40 62 Q58 52 70 68 Q54 78 40 62 Z" fill="#7DD3FC" stroke="#0284C7" strokeWidth="2.5" />
          <polygon points="88,58 104,64 88,70" fill="#F59E0B" stroke="#B45309" strokeWidth="2" strokeLinejoin="round" />
          <circle cx="76" cy="56" r="4.5" fill="#1E293B" />
          <circle cx="77.5" cy="54.5" r="1.5" fill="#FFFFFF" />
          <path d="M52 90 L52 104 M66 90 L66 104" stroke="#EA580C" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );

    case 'cloud':
      return (
        <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
          <path
            d="M32 82 C20 82, 14 72, 18 62 C20 52, 30 48, 38 50 C42 36, 58 30, 72 38 C82 36, 94 44, 96 56 C104 58, 108 68, 102 76 C98 82, 90 82, 84 82 Z"
            fill="#E0F2FE"
            stroke="#0284C7"
            strokeWidth="3"
          />
          <circle cx="48" cy="62" r="3.5" fill="#1E293B" />
          <circle cx="72" cy="62" r="3.5" fill="#1E293B" />
          <path d="M54 70 Q60 75 66 70" fill="none" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );

    case 'butterfly':
      return (
        <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
          <ellipse cx="38" cy="48" rx="22" ry="18" fill="#FB7185" stroke="#BE123C" strokeWidth="3" />
          <ellipse cx="82" cy="48" rx="22" ry="18" fill="#FB7185" stroke="#BE123C" strokeWidth="3" />
          <ellipse cx="42" cy="76" rx="16" ry="14" fill="#FDE047" stroke="#D97706" strokeWidth="3" />
          <ellipse cx="78" cy="76" rx="16" ry="14" fill="#FDE047" stroke="#D97706" strokeWidth="3" />
          <rect x="55" y="34" width="10" height="54" rx="5" fill="#334155" />
          <path d="M56 34 Q46 18 38 22 M64 34 Q74 18 82 22" fill="none" stroke="#334155" strokeWidth="2.8" strokeLinecap="round" />
        </svg>
      );

    case 'moon':
      return (
        <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
          <path
            d="M72 22 C46 22, 26 42, 26 66 C26 90, 46 106, 74 102 C56 96, 48 80, 50 62 C52 44, 60 30, 72 22 Z"
            fill="#FDE047"
            stroke="#CA8A04"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <polygon points="84,32 87,39 94,40 89,45 90,52 84,48 78,52 79,45 74,40 81,39" fill="#FBBF24" />
        </svg>
      );

    case 'book':
      return (
        <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
          <path d="M22 32 C38 26, 52 30, 60 36 L60 92 C52 86, 38 82, 22 88 Z" fill="#FFFFFF" stroke="#059669" strokeWidth="3" strokeLinejoin="round" />
          <path d="M98 32 C82 26, 68 30, 60 36 L60 92 C68 86, 82 82, 98 88 Z" fill="#ECFDF5" stroke="#059669" strokeWidth="3" strokeLinejoin="round" />
          <line x1="32" y1="48" x2="50" y2="48" stroke="#10B981" strokeWidth="3" strokeLinecap="round" />
          <line x1="32" y1="60" x2="50" y2="60" stroke="#10B981" strokeWidth="3" strokeLinecap="round" />
          <line x1="70" y1="48" x2="88" y2="48" stroke="#10B981" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );

    case 'lemon':
      return (
        <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
          <path d="M62 24 C74 14, 90 18, 84 32 C76 34, 66 32, 62 24 Z" fill="#22C55E" stroke="#15803D" strokeWidth="2.5" />
          <ellipse cx="60" cy="64" rx="36" ry="26" fill="#FDE047" stroke="#CA8A04" strokeWidth="3" />
          <circle cx="48" cy="60" r="3.5" fill="#1E293B" />
          <circle cx="72" cy="60" r="3.5" fill="#1E293B" />
          <path d="M53 70 Q60 76 67 70" fill="none" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );

    case 'banana':
      return (
        <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
          <path
            d="M32 30 C44 58, 66 78, 96 76 C84 98, 46 98, 28 70 C20 56, 24 38, 32 30 Z"
            fill="#FDE047"
            stroke="#CA8A04"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <rect x="28" y="24" width="8" height="8" rx="2" fill="#78350F" />
        </svg>
      );

    case 'bee':
      return (
        <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
          <ellipse cx="48" cy="36" rx="14" ry="18" transform="rotate(-20 48 36)" fill="#E0F2FE" stroke="#0284C7" strokeWidth="2.5" />
          <ellipse cx="72" cy="36" rx="14" ry="18" transform="rotate(20 72 36)" fill="#E0F2FE" stroke="#0284C7" strokeWidth="2.5" />
          <ellipse cx="60" cy="66" rx="30" ry="22" fill="#FACC15" stroke="#1E293B" strokeWidth="3" />
          <line x1="52" y1="45" x2="52" y2="87" stroke="#1E293B" strokeWidth="6" />
          <line x1="68" y1="45" x2="68" y2="87" stroke="#1E293B" strokeWidth="6" />
          <circle cx="38" cy="62" r="3.5" fill="#1E293B" />
          <path d="M34 72 Q40 76 44 72" fill="none" stroke="#1E293B" strokeWidth="2.2" strokeLinecap="round" />
        </svg>
      );

    case 'gift':
      return (
        <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
          <rect x="26" y="48" width="68" height="50" rx="8" fill="#FB7185" stroke="#BE123C" strokeWidth="3" />
          <rect x="20" y="36" width="80" height="16" rx="6" fill="#F43F5E" stroke="#BE123C" strokeWidth="3" />
          <rect x="53" y="36" width="14" height="62" fill="#FDE047" stroke="#CA8A04" strokeWidth="2" />
          <path d="M60 36 C46 18, 34 26, 44 36 Z" fill="#FDE047" stroke="#CA8A04" strokeWidth="2.5" />
          <path d="M60 36 C74 18, 86 26, 76 36 Z" fill="#FDE047" stroke="#CA8A04" strokeWidth="2.5" />
        </svg>
      );

    case 'flower':
      return (
        <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
          <line x1="60" y1="68" x2="60" y2="108" stroke="#16A34A" strokeWidth="6" strokeLinecap="round" />
          <circle cx="60" cy="30" r="14" fill="#FB7185" stroke="#BE123C" strokeWidth="2.5" />
          <circle cx="82" cy="46" r="14" fill="#FB7185" stroke="#BE123C" strokeWidth="2.5" />
          <circle cx="74" cy="70" r="14" fill="#FB7185" stroke="#BE123C" strokeWidth="2.5" />
          <circle cx="46" cy="70" r="14" fill="#FB7185" stroke="#BE123C" strokeWidth="2.5" />
          <circle cx="38" cy="46" r="14" fill="#FB7185" stroke="#BE123C" strokeWidth="2.5" />
          <circle cx="60" cy="52" r="16" fill="#FDE047" stroke="#CA8A04" strokeWidth="2.5" />
          <circle cx="55" cy="50" r="2.5" fill="#1E293B" />
          <circle cx="65" cy="50" r="2.5" fill="#1E293B" />
          <path d="M55 57 Q60 61 65 57" fill="none" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    case 'hand':
      return (
        <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
          <path
            d="M36 62 L36 36 C36 30, 44 30, 44 36 L44 54 L46 26 C46 20, 54 20, 54 26 L54 54 L58 22 C58 16, 66 16, 66 22 L66 54 L70 28 C70 22, 78 22, 78 28 L78 62 L86 52 C92 48, 98 54, 92 62 L78 86 C72 96, 46 98, 38 86 L36 62 Z"
            fill="#FDBA74"
            stroke="#C2410C"
            strokeWidth="3"
            strokeLinejoin="round"
          />
        </svg>
      );

    case 'star':
    default:
      return (
        <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
          <polygon
            points="60,16 73,44 104,48 81,69 87,100 60,85 33,100 39,69 16,48 47,44"
            fill="#FDE047"
            stroke="#D97706"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <circle cx="51" cy="58" r="3.5" fill="#1E293B" />
          <circle cx="69" cy="58" r="3.5" fill="#1E293B" />
          <path d="M53 68 Q60 74 67 68" fill="none" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );
  }
};
