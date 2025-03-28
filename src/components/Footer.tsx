import React from 'react';
import { useTranslation } from 'react-i18next';
import { Heart } from 'lucide-react';
import { Link } from './Link';

export const Footer: React.FC = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white/50 backdrop-blur-sm py-8 mt-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold text-purple-600 mb-4">{t('footer.about')}</h3>
            <p className="text-gray-600">
              {t('footer.description')}
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold text-purple-600 mb-4">{t('footer.legal')}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="text-gray-600 hover:text-purple-600 transition-colors">
                  {t('footer.privacy')}
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-600 hover:text-purple-600 transition-colors">
                  {t('footer.terms')}
                </Link>
              </li>
            </ul>
          </div>
          {/* <div>
            <h3 className="text-xl font-bold text-purple-600 mb-4">{t('footer.contact')}</h3>
            <address className="not-italic text-gray-600">
              <p>{t('footer.email')}: <a href="mailto:contact@zora-stories.com" className="hover:text-purple-600 transition-colors">contact@zora-stories.com</a></p>
            </address>
          </div> */}
        </div>
        <div className="mt-8 pt-8 border-t border-purple-100 text-center">
          <p className="text-gray-600 flex items-center justify-center gap-2">
            © {currentYear} Zora Stories. {t('footer.rights')}
            <Heart className="w-4 h-4 text-pink-500 inline animate-pulse-optimized" />
          </p>
        </div>
      </div>
    </footer>
  );
}