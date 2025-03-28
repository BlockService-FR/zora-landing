import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from '../components/Link';
import { Shield, Mail } from 'lucide-react';

export const Privacy: React.FC = () => {
  const { t } = useTranslation();
  const lastUpdated = '2025-03-27';

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
        <div className="flex items-center gap-4 mb-8">
          <Shield className="w-12 h-12 text-purple-600" />
          <h1 className="text-4xl font-bold text-gray-900">{t('privacy.title')}</h1>
        </div>

        <p className="text-gray-600 mb-8">
          {t('privacy.lastUpdated')}: {lastUpdated}
        </p>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('privacy.collection.title')}</h2>
            <p className="text-gray-700 mb-4">{t('privacy.collection.description')}</p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>{t('privacy.collection.email')}</li>
              <li>{t('privacy.collection.usage')}</li>
              <li>{t('privacy.collection.cookies')}</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('privacy.use.title')}</h2>
            <p className="text-gray-700 mb-4">{t('privacy.use.description')}</p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>{t('privacy.use.newsletter')}</li>
              <li>{t('privacy.use.improve')}</li>
              <li>{t('privacy.use.legal')}</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('privacy.cookies.title')}</h2>
            <p className="text-gray-700">{t('privacy.cookies.description')}</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('privacy.rights.title')}</h2>
            <p className="text-gray-700 mb-4">{t('privacy.rights.description')}</p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>{t('privacy.rights.access')}</li>
              <li>{t('privacy.rights.rectification')}</li>
              <li>{t('privacy.rights.erasure')}</li>
              <li>{t('privacy.rights.portability')}</li>
            </ul>
          </section>

          {/* <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('privacy.contact.title')}</h2>
            <p className="text-gray-700 mb-4">{t('privacy.contact.description')}</p>
            <div className="flex items-center gap-2 text-purple-600">
              <Mail className="w-5 h-5" />
              <Link href="mailto:privacy@zora-stories.com">privacy@zora-stories.com</Link>
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