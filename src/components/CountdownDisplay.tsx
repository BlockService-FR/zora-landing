import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export const CountdownDisplay: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [letterIndex, setLetterIndex] = useState(0);
  const text = t('countdown.comingSoon');
  const colors = [
    'from-pink-400 to-purple-400',
    'from-blue-400 to-cyan-400',
    'from-yellow-400 to-orange-400',
    'from-green-400 to-teal-400',
    'from-red-400 to-pink-400',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setLetterIndex((prev) => (prev + 1) % text.length);
    }, 700);

    return () => clearInterval(interval);
  }, [text.length]);

  // Reset letter index when language changes
  useEffect(() => {
    setLetterIndex(0);
  }, [i18n.language]);

  return (
    <section className="relative py-16 px-4 overflow-hidden bg-gradient-to-b from-white/50 to-purple-50/50">
      <div className="max-w-4xl mx-auto">
        <div className="relative">
          {/* Background stars */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute animate-twinkle"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                }}
              >
                <div className="w-2 h-2 bg-yellow-200 rounded-full" />
              </div>
            ))}
          </div>

          {/* Main countdown display */}
          <div className="relative bg-white/90 backdrop-blur-md rounded-3xl p-12 shadow-2xl border-4 border-purple-200">
            <div className="flex justify-center items-center gap-3 min-h-[160px]">
              {text.split('').map((letter, index) => (
                <div
                  key={index}
                  className={`
                    relative transform transition-all duration-300
                    ${index === letterIndex ? 'scale-125' : 'scale-100'}
                  `}
                >
                  <span
                    className={`
                      text-5xl md:text-6xl font-bold inline-flex items-center justify-center
                      min-w-[1ch] min-h-[1.5em] leading-[1.5]
                      bg-gradient-to-r ${colors[index % colors.length]}
                      bg-clip-text text-transparent
                      ${index === letterIndex ? 'animate-letter-pop' : ''}
                    `}
                    style={{
                      animationDelay: `${index * 0.1}s`,
                    }}
                  >
                    {letter}
                  </span>
                  {index === letterIndex && (
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 animate-float">
                      <div className="text-3xl">⭐</div>
                    </div>
                  )}
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(-50%); }
          50% { transform: translateY(-10px) translateX(-50%); }
        }

        @keyframes twinkle {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.5); }
        }

        @keyframes rocket {
          0% { transform: translate(100%, -50%) rotate(-45deg); }
          100% { transform: translate(-100vw, -50%) rotate(-45deg); }
        }

        @keyframes ufo {
          0% { transform: translateX(0); }
          50% { transform: translateX(20px); }
          100% { transform: translateX(0); }
        }

        @keyframes float-planet-1 {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(20px, -20px); }
        }

        @keyframes float-planet-2 {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-15px, 15px); }
        }

        @keyframes float-planet-3 {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(25px, -10px); }
        }

        @keyframes letter-pop {
          0% { transform: scale(1); }
          50% { transform: scale(1.4); }
          100% { transform: scale(1); }
        }

        .animate-twinkle {
          animation: twinkle 2s ease-in-out infinite;
        }

        .animate-float {
          animation: float 2s ease-in-out infinite;
        }

        .animate-rocket {
          animation: rocket 8s linear infinite;
        }

        .animate-ufo {
          animation: ufo 4s ease-in-out infinite;
        }

        .animate-float-planet-1 {
          animation: float-planet-1 6s ease-in-out infinite;
        }

        .animate-float-planet-2 {
          animation: float-planet-2 8s ease-in-out infinite;
        }

        .animate-float-planet-3 {
          animation: float-planet-3 7s ease-in-out infinite;
        }

        .animate-letter-pop {
          animation: letter-pop 0.5s ease-in-out;
        }
      `}</style>
    </section>
  );
};