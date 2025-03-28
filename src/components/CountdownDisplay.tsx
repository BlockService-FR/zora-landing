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
      setLetterIndex((prev) => {
        let nextIndex = (prev + 1) % text.length;
        // Skip spaces and find the next non-space character
        while (text[nextIndex] === ' ' && nextIndex < text.length) {
          nextIndex = (nextIndex + 1) % text.length;
        }
        return nextIndex;
      });
    }, 700);

    return () => clearInterval(interval);
  }, [text]);

  // Reset letter index when language changes
  useEffect(() => {
    setLetterIndex(0);
  }, [i18n.language]);

  return (
    <section className="relative py-8 md:py-16 px-2 md:px-4 overflow-hidden">
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
                <div className="w-1.5 md:w-2 h-1.5 md:h-2 bg-yellow-200 rounded-full" />
              </div>
            ))}
          </div>

          {/* Main countdown display */}
          <div className="relative bg-white/90 backdrop-blur-md rounded-2xl md:rounded-3xl p-4 md:p-12 shadow-2xl border-2 md:border-4 border-purple-200">
            <div className="flex flex-wrap justify-center items-center gap-1 md:gap-3 min-h-[80px] md:min-h-[160px]">
              {text.split('').map((letter, index) => (
                <div
                  key={index}
                  className={`
                    relative transform transition-all duration-300
                    ${index === letterIndex ? 'scale-110 md:scale-125' : 'scale-100'}
                  `}
                >
                  <span
                    className={`
                      text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold inline-flex items-center justify-center
                      min-w-[0.5ch] md:min-w-[1ch] min-h-[1.5em] leading-[1.5]
                      bg-gradient-to-r ${colors[index % colors.length]}
                      bg-clip-text text-transparent
                      ${index === letterIndex && letter !== ' ' ? 'animate-letter-pop' : ''}
                    `}
                    style={{
                      animationDelay: `${index * 0.1}s`,
                    }}
                  >
                    {letter}
                  </span>
                  {index === letterIndex && letter !== ' ' && (
                    <div className="absolute -top-4 md:-top-8 left-1/2 transform -translate-x-1/2 animate-float">
                      <div className="text-xl md:text-3xl">⭐</div>
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