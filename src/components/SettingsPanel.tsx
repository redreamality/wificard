'use client';

import { RadioGroup, Listbox } from '@headlessui/react';
import { Cog6ToothIcon } from '@heroicons/react/24/outline';
import { ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { LocaleType } from '../config';

type EncryptionType = 'WPA' | 'WPA2' | 'WPA3' | 'WEP' | 'nopass';

type TemplateType = 'default' | 'restaurant' | 'hotel' | 'hospital' | 'office' | 'horizontal';

const LOCALES: Record<LocaleType, { value: LocaleType; label: string }> = {
  en: { value: 'en', label: 'English' },
  zh: { value: 'zh', label: '中文' },
  ja: { value: 'ja', label: '日本語' },
  de: { value: 'de', label: 'Deutsch' },
  it: { value: 'it', label: 'Italiano' },
  es: { value: 'es', label: 'Español' },
  fr: { value: 'fr', label: 'Français' },
  ru: { value: 'ru', label: 'Русский' },
  th: { value: 'th', label: 'ไทย' },
  el: { value: 'el', label: 'Ελληνικά' },
  hi: { value: 'hi', label: 'हिन्दी' },
  ar: { value: 'ar', label: 'العربية' },
  uk: { value: 'uk', label: 'Українська' },
  pl: { value: 'pl', label: 'Polski' },
  id: { value: 'id', label: 'Bahasa Indonesia' }
};

interface SettingsPanelProps {
  ssid: string;
  password: string;
  encryption: EncryptionType;
  hidePassword: boolean;
  template: TemplateType;
  frontDeskPhone?: string;
  onSsidChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onEncryptionChange: (value: EncryptionType) => void;
  onHidePasswordChange: (value: boolean) => void;
  onTemplateChange: (value: TemplateType) => void;
  onFrontDeskPhoneChange?: (value: string) => void;
}

export default function SettingsPanel({
  ssid,
  password,
  encryption,
  hidePassword,
  template,
  frontDeskPhone,
  onSsidChange,
  onPasswordChange,
  onEncryptionChange,
  onHidePasswordChange,
  onTemplateChange,
  onFrontDeskPhoneChange,
}: SettingsPanelProps) {
  const t = useTranslations('settings');
  const commonT = useTranslations('Common');
  const locale = useLocale() as LocaleType;
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (newLocale: LocaleType) => {
    const params = new URLSearchParams();
    
    if (ssid) params.set('ssid', ssid);
    if (password) params.set('pwd', password);
    if (encryption) params.set('enc', encryption);
    if (hidePassword) params.set('hide', '1');
    if (template !== 'default') params.set('scene', template);

    const currentPath = pathname.replace(`/${locale}`, '') || '/';
    const newPath = `/${newLocale}${currentPath}${params.toString() ? '?' + params.toString() : ''}`;
    router.push(newPath);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2 mb-6">
            <Cog6ToothIcon className="h-5 w-5 text-indigo-500" />
            {t('title')}
          </h3>
          
          <div className="space-y-6">
            {/* 语言选择 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {commonT('language')}
              </label>
              <Listbox value={locale} onChange={switchLocale}>
                <div className="relative mt-1">
                  <Listbox.Button className="relative w-full cursor-pointer rounded-lg bg-white py-2 pl-3 pr-10 text-left border border-gray-300 focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-indigo-300 sm:text-sm">
                    <span className="block truncate">{LOCALES[locale].label}</span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                      <ChevronUpDownIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </span>
                  </Listbox.Button>
                  <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-10">
                    {Object.values(LOCALES).map((locale) => (
                      <Listbox.Option
                        key={locale.value}
                        value={locale.value}
                        className={({ active }) =>
                          `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                            active ? 'bg-indigo-100 text-indigo-900' : 'text-gray-900'
                          }`
                        }
                      >
                        {({ selected }) => (
                          <>
                            <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                              {locale.label}
                            </span>
                            {selected && (
                              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-indigo-600">
                                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              </span>
                            )}
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </div>
              </Listbox>
            </div>

            {/* WiFi名称输入 */}
            <div>
              <label htmlFor="ssid" className="block text-sm font-medium text-gray-700">
                {t('ssid.label')}
              </label>
              <input
                type="text"
                name="ssid"
                id="ssid"
                value={ssid}
                onChange={(e) => onSsidChange(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder={t('ssid.placeholder')}
              />
            </div>

            {/* 密码输入 */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                {t('password.label')}
              </label>
              <input
                type={hidePassword ? "password" : "text"}
                name="password"
                id="password"
                value={password}
                onChange={(e) => onPasswordChange(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder={t('password.placeholder')}
              />
            </div>

            {/* 加密类型选择 */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                {t('encryption.label')}
              </label>
              <RadioGroup value={encryption} onChange={onEncryptionChange} className="mt-2">
                <div className="grid grid-cols-2 gap-3">
                  {['WPA', 'WPA2', 'WPA3', 'WEP', 'nopass'].map((type) => (
                    <RadioGroup.Option
                      key={type}
                      value={type}
                      className={({ active, checked }) =>
                        `${active ? 'ring-2 ring-indigo-500' : ''}
                         ${checked ? 'bg-indigo-600 text-white' : 'bg-white text-gray-900'}
                         cursor-pointer rounded-md px-3 py-2 text-sm font-medium border border-gray-300 hover:bg-gray-50`
                      }
                    >
                      {type === 'nopass' ? t('encryption.nopass') : type}
                    </RadioGroup.Option>
                  ))}
                </div>
              </RadioGroup>
            </div>

            {/* 模板选择 */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                {t('template.label')}
              </label>
              <RadioGroup value={template} onChange={onTemplateChange} className="mt-2">
                <div className="grid grid-cols-2 gap-3">
                  {(['default', 'restaurant', 'hotel', 'hospital', 'office', 'horizontal'] as const).map((type) => (
                    <RadioGroup.Option
                      key={type}
                      value={type}
                      className={({ active, checked }) =>
                        `${active ? 'ring-2 ring-indigo-500' : ''}
                         ${checked ? 'bg-indigo-600 text-white' : 'bg-white text-gray-900'}
                         cursor-pointer rounded-md px-3 py-2 text-sm font-medium border border-gray-300 hover:bg-gray-50`
                      }
                    >
                      <div className="flex items-center justify-center gap-2">
                        {t(`template.${type}`)}
                      </div>
                    </RadioGroup.Option>
                  ))}
                </div>
              </RadioGroup>
            </div>

            {/* 隐藏密码选项 */}
            <div className="flex items-center">
              <input
                id="hide-password"
                name="hide-password"
                type="checkbox"
                checked={hidePassword}
                onChange={(e) => onHidePasswordChange(e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <label htmlFor="hide-password" className="ml-2 block text-sm text-gray-900">
                {t('hidePassword')}
              </label>
            </div>

            {/* 酒店特有设置 */}
            {template === 'hotel' && (
              <div>
                <label htmlFor="frontDeskPhone" className="block text-sm font-medium text-gray-700">
                  {t('hotel.frontDeskPhone.label')}
                </label>
                <input
                  type="tel"
                  name="frontDeskPhone"
                  id="frontDeskPhone"
                  value={frontDeskPhone}
                  onChange={(e) => onFrontDeskPhoneChange?.(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder={t('hotel.frontDeskPhone.placeholder')}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 
