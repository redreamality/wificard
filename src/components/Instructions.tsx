'use client';

import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline';
import { useTranslations } from 'next-intl';

export default function Instructions() {
  const t = useTranslations('instructions');

  return (
    <div className="space-y-6">
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
            <QuestionMarkCircleIcon className="h-5 w-5 text-indigo-500" />
            {t('title')}
          </h3>
          <div className="mt-4 text-sm text-gray-600 space-y-4">
            <div>
              <h4 className="font-medium mb-2">{t('howToUse.title')}</h4>
              <ol className="list-decimal list-inside space-y-2">
                {(t.raw('howToUse.steps') as string[]).map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ol>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">{t('printTips.title')}</h4>
              <ul className="list-disc list-inside space-y-2">
                {(t.raw('printTips.tips') as string[]).map((tip, index) => (
                  <li key={index}>{tip}</li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-medium mb-2">{t('security.title')}</h4>
              <ul className="list-disc list-inside space-y-2">
                {(t.raw('security.tips') as string[]).map((tip, index) => (
                  <li key={index}>{tip}</li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-medium mb-2">{t('whenToUse.title')}</h4>
              <ul className="list-disc list-inside space-y-2">
                {(t.raw('whenToUse.scenarios') as string[]).map((scenario, index) => (
                  <li key={index}>{scenario}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 