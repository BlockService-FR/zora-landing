import React, { useState, useEffect } from 'react';

interface Announcement {
  text: string;
  lang: string;
}

const announcements: Announcement[] = [
  { text: "Zora is Coming Soon!", lang: "en" },
  { text: "Zora arrive bientôt !", lang: "fr" },
  { text: "¡Zora llegará pronto!", lang: "es" },
  { text: "Zora sta arrivando!", lang: "it" },
  { text: "Zora kommt bald!", lang: "de" },
  { text: "Zora がまもなく登場!", lang: "ja" },
];

export const LanguageAnnouncement: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % announcements.length);
        setIsTransitioning(false);
      }, 500);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-20 overflow-hidden">
      <div
        className={`absolute w-full text-center transition-all duration-500 transform ${
          isTransitioning
            ? 'opacity-0 translate-y-8'
            : 'opacity-100 translate-y-0'
        }`}
      >
        <p
          lang={announcements[currentIndex].lang}
          className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 min-h-[60px]"
        >
          {announcements[currentIndex].text}
        </p>
      </div>
    </div>
  );
};