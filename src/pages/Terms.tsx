import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from '../components/Link';
import { Scale, Mail } from 'lucide-react';

export const Terms: React.FC = () => {
  const { t } = useTranslation();
  const lastUpdated = '2025-03-27';

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
        <div className="flex items-center gap-4 mb-8">
          <Scale className="w-12 h-12 text-purple-600" />
          <h1 className="text-4xl font-bold text-gray-900">{t('terms.title')}</h1>
        </div>

        <p className="text-gray-600 mb-8">
          {t('terms.lastUpdated')}: {lastUpdated}
        </p>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('terms.agreement.title')}</h2>
            <p className="text-gray-700">{t('terms.agreement.description')}</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('terms.obligations.title')}</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>{t('terms.obligations.appropriate')}</li>
              <li>{t('terms.obligations.accurate')}</li>
              <li>{t('terms.obligations.legal')}</li>
              <li>{t('terms.obligations.security')}</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('terms.intellectual.title')}</h2>
            <p className="text-gray-700">{t('terms.intellectual.description')}</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('terms.liability.title')}</h2>
            <p className="text-gray-700">{t('terms.liability.description')}</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('terms.termination.title')}</h2>
            <p className="text-gray-700">{t('terms.termination.description')}</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('terms.disputes.title')}</h2>
            <p className="text-gray-700">{t('terms.disputes.description')}</p>
          </section>

          {/* <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('terms.contact.title')}</h2>
            <p className="text-gray-700 mb-4">{t('terms.contact.description')}</p>
            <div className="flex items-center gap-2 text-purple-600">
              <Mail className="w-5 h-5" />
              <Link href="mailto:legal@zora-stories.com">legal@zora-stories.com</Link>
            </div>
          </section> */}
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <Link href="/" className="text-purple-600 hover:text-purple-700">
            ← {t('common.backHome')}
          </Link>
        </div>
      </div>
    </div>
  );
}