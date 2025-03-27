import React, { useState, useEffect } from 'react';
import { Wand2, BookOpen, Globe2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import { MouseTrail } from './components/MouseTrail';
import { LanguageAnnouncement } from './components/LanguageAnnouncement';
import { CountdownDisplay } from './components/CountdownDisplay';
import { NewsletterForm } from './components/NewsletterForm';

interface Language {
  code: string;
  name: string;
  flag: string;
  dir: 'ltr' | 'rtl';
}

function App() {
  const { t, i18n } = useTranslation();
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<Language>({
    code: 'en',
    name: 'English',
    flag: '🇬🇧',
    dir: 'ltr'
  });

  const languages: Language[] = [
    { code: 'en', name: 'English', flag: '🇬🇧', dir: 'ltr' },
    { code: 'fr', name: 'Français', flag: '🇫🇷', dir: 'ltr' },
    { code: 'it', name: 'Italiano', flag: '🇮🇹', dir: 'ltr' },
    { code: 'es', name: 'Español', flag: '🇪🇸', dir: 'ltr' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦', dir: 'rtl' }
  ];

  useEffect(() => {
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage) {
      const lang = JSON.parse(savedLanguage);
      setSelectedLanguage(lang);
      i18n.changeLanguage(lang.code);
      document.documentElement.dir = lang.dir;
      document.documentElement.lang = lang.code;
    }
  }, [i18n]);

  const handleLanguageChange = (lang: Language) => {
    setSelectedLanguage(lang);
    localStorage.setItem('selectedLanguage', JSON.stringify(lang));
    i18n.changeLanguage(lang.code);
    document.documentElement.dir = lang.dir;
    document.documentElement.lang = lang.code;
    setIsLanguageOpen(false);
  };

  const features = [
    {
      icon: <BookOpen className="w-12 h-12 text-purple-500" />,
      title: t('features.magicStories.title'),
      description: t('features.magicStories.description')
    },
    {
      icon: <Globe2 className="w-12 h-12 text-blue-500" />,
      title: t('features.manyLanguages.title'),
      description: t('features.manyLanguages.description')
    },
    {
      icon: <Wand2 className="w-12 h-12 text-pink-500" />,
      title: t('features.yourStory.title'),
      description: t('features.yourStory.description')
    }
  ];

  return (
    <GoogleReCaptchaProvider reCaptchaKey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}>
      <div className={`min-h-screen bg-gradient-to-b from-blue-100 to-purple-100 text-gray-800 relative overflow-hidden ${selectedLanguage.dir === 'rtl' ? 'text-right' : 'text-left'}`}>
        <MouseTrail />
        
        {/* Language Selector */}
        <div className={`absolute top-5 ${selectedLanguage.dir === 'rtl' ? 'left-5' : 'right-5'} z-50`}>
          <div className="relative">
            <button
              onClick={() => setIsLanguageOpen(!isLanguageOpen)}
              className="flex items-center space-x-3 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              aria-label={`Select Language - Currently ${selectedLanguage.name}`}
              aria-expanded={isLanguageOpen}
              aria-haspopup="listbox"
            >
              <span 
                className="text-2xl w-8 h-8 flex items-center justify-center rounded-full overflow-hidden"
                role="img"
                aria-label={`${selectedLanguage.name} flag`}
              >
                {selectedLanguage.flag}
              </span>
              <span className={`text-lg font-bold text-gray-700 ${selectedLanguage.dir === 'rtl' ? 'mr-2' : 'ml-2'}`}>
                {selectedLanguage.name}
              </span>
            </button>
            
            {isLanguageOpen && (
              <div 
                className={`absolute ${selectedLanguage.dir === 'rtl' ? 'left-0' : 'right-0'} top-full mt-2 bg-white rounded-2xl shadow-xl p-2 transform origin-top transition-all duration-300`}
                role="listbox"
                aria-label="Language options"
              >
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => handleLanguageChange(lang)}
                    className={`flex items-center w-full p-3 hover:bg-purple-50 rounded-xl transition-colors duration-200 ${
                      selectedLanguage.code === lang.code ? 'bg-purple-100' : ''
                    }`}
                    role="option"
                    aria-selected={selectedLanguage.code === lang.code}
                    title={lang.name}
                  >
                    <span 
                      className="text-2xl w-8 h-8 flex items-center justify-center rounded-full overflow-hidden"
                      role="img"
                      aria-label={`${lang.name} flag`}
                    >
                      {lang.flag}
                    </span>
                    <span className={`text-lg font-bold text-gray-700 ${lang.dir === 'rtl' ? 'mr-2' : 'ml-2'}`}>
                      {lang.name}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative pt-20 pb-12 px-4 text-center">
          <LanguageAnnouncement />
          
          <div className="mt-12">
            <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500 mb-6 animate-bounce-gentle min-h-[160px]">
              {t('hero.title')}
            </h1>
            <p className="text-2xl md:text-3xl text-gray-700 max-w-2xl mx-auto mb-8">
              {t('hero.subtitle')}
            </p>
          </div>

          <div className="relative w-full max-w-2xl mx-auto h-64 md:h-96 mb-12">
            <img
              src="https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=800&q=80"
              alt="Magical Book"
              className="rounded-3xl shadow-2xl object-cover w-full h-full animate-float-optimized"
            />
          </div>
        </section>

        <CountdownDisplay />
        
        <section className="py-16 px-4 bg-white/50 backdrop-blur-sm">
          <div className="max-w-4xl mx-auto text-center">
            <NewsletterForm />
          </div>
        </section>

        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                <div className="mb-6 transform hover:rotate-12 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">{feature.title}</h3>
                <p className="text-xl text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </GoogleReCaptchaProvider>
  );
}

export default App;