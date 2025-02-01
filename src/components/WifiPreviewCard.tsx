'use client';

import { memo, useState, useEffect, useMemo } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { PencilIcon, CheckIcon } from '@heroicons/react/24/outline';
import { useTranslations } from 'next-intl';

type TemplateType = 'default' | 'restaurant' | 'hotel' | 'hospital' | 'office' | 'horizontal';

interface WifiPreviewCardProps {
  ssid: string;
  password: string;
  hidePassword: boolean;
  qrValue: string;
  template: TemplateType;
  frontDeskPhone?: string;
  customTitle?: string | null;
  customDescription?: string | null;
  onUpdate?: (newSsid: string, newPassword: string, newFrontDeskPhone?: string) => void;
  onTemplateStyleUpdate?: (newTitle: string, newDescription: string) => void;
}

function WifiPreviewCard({ ssid, password, hidePassword, qrValue, template, frontDeskPhone, customTitle, customDescription, onUpdate, onTemplateStyleUpdate }: WifiPreviewCardProps) {
  const t = useTranslations('preview');
  const [isEditing, setIsEditing] = useState(false);
  const [editedSsid, setEditedSsid] = useState(ssid);
  const [editedPassword, setEditedPassword] = useState(password);
  const [editedTitle, setEditedTitle] = useState(customTitle || '');
  const [editedDescription, setEditedDescription] = useState(customDescription || '');
  const [editedFrontDeskPhone, setEditedFrontDeskPhone] = useState(frontDeskPhone || '');

  const templateStyle = useMemo(() => {
    const TEMPLATE_ICONS = {
      default: '🛜',
      restaurant: '🍽️',
      hotel: '🏨',
      hospital: '🏥',
      office: '💼',
      horizontal: '🛜', //emoji for wifi
    };

    return {
      title: isEditing ? editedTitle : (customTitle || t(`templates.${template}.title`)),
      description: isEditing ? editedDescription : (customDescription || t(`templates.${template}.description`)),
      icon: TEMPLATE_ICONS[template],
      textColor: 'text-gray-900',
    };
  }, [template, isEditing, editedTitle, editedDescription, customTitle, customDescription, t]);

  useEffect(() => {
    if (!isEditing) {
      setEditedTitle(customTitle || t(`templates.${template}.title`));
      setEditedDescription(customDescription || t(`templates.${template}.description`));
    }
  }, [template, t, isEditing, customTitle, customDescription]);

  useEffect(() => {
    setEditedSsid(ssid);
    setEditedPassword(password);
    setEditedFrontDeskPhone(frontDeskPhone || '');
  }, [ssid, password, frontDeskPhone]);

  const handleSave = () => {
    onUpdate?.(editedSsid, editedPassword, editedFrontDeskPhone);
    onTemplateStyleUpdate?.(editedTitle, editedDescription);
    setIsEditing(false);
  };

  const handleEdit = () => {
    setEditedSsid(ssid);
    setEditedPassword(password);
    setEditedTitle(customTitle || t(`templates.${template}.title`));
    setEditedDescription(customDescription || t(`templates.${template}.description`));
    setEditedFrontDeskPhone(frontDeskPhone || '');
    setIsEditing(true);
  };

  return (
    <div className={`inline-block p-6 bg-white rounded-xl shadow-lg border border-gray-100 print:shadow-none print:border-gray-300 ${template === 'horizontal' || template === 'hotel' ? 'w-[595px] max-h-[842px]' : 'w-[420px] max-h-[595px]'} relative`}>
      <div className={`${template === 'horizontal' || template === 'hotel' ? 'flex items-start justify-between gap-12' : ''}`}>
        <div className={`${template === 'horizontal' || template === 'hotel' ? 'w-1/2' : ''}`}>
          <div className="flex flex-col items-center gap-2 mb-6">
            <span className="text-5xl mb-3">{templateStyle.icon}</span>
            {isEditing ? (
              <input
                type="text"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                className="text-2xl font-semibold text-center border rounded-lg px-4 py-2 w-full max-w-[400px] focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            ) : (
              <h2 className="text-2xl font-semibold text-gray-800 text-center">{templateStyle.title}</h2>
            )}
            {(onUpdate || onTemplateStyleUpdate) && (
              <button
                onClick={() => isEditing ? handleSave() : handleEdit()}
                className="ml-2 p-2 text-gray-600 hover:text-gray-900 print:hidden absolute top-6 right-6 bg-gray-100 hover:bg-gray-200 rounded-lg shadow-sm transition-colors duration-200"
              >
                {isEditing ? (
                  <CheckIcon className="w-5 h-5" />
                ) : (
                  <PencilIcon className="w-5 h-5" />
                )}
              </button>
            )}
          </div>
          
          {(template === 'horizontal' || template === 'hotel') ? (
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-xl p-6 space-y-6">
                <div className="flex items-center">
                  <div className="flex-1">
                    {isEditing ? (
                      <input
                        type="text"
                        value={editedSsid}
                        onChange={(e) => setEditedSsid(e.target.value)}
                        className="w-full px-4 py-3 text-lg border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder={t('wifi')}
                      />
                    ) : (
                      <div>
                        <p className="text-sm font-medium text-gray-500 mb-1">{t('wifi')}</p>
                        <p className="text-xl font-medium text-gray-800">{ssid}</p>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="h-[60px]">
                  {!hidePassword && (
                    <div className="flex items-center">
                      <div className="flex-1">
                        {isEditing ? (
                          <input
                            type="text"
                            value={editedPassword}
                            onChange={(e) => setEditedPassword(e.target.value)}
                            className="w-full px-4 py-2 text-lg border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder={t('password')}
                          />
                        ) : (
                          <div>
                            <p className="text-sm font-medium text-gray-500 mb-1">{t('password')}</p>
                            <p className="text-xl font-medium text-gray-800">{password}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {(template as string) === 'hotel' && (isEditing || frontDeskPhone) && (
                <div className="mt-4">
                  {isEditing ? (
                    <div className="space-y-1">
                      <label className="text-sm font-medium text-gray-500">{t('hotel.frontDeskPhone')}</label>
                      <input
                        type="tel"
                        value={editedFrontDeskPhone}
                        onChange={(e) => setEditedFrontDeskPhone(e.target.value)}
                        className="w-full px-4 py-2 text-lg border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder={t('hotel.frontDeskPhone')}
                      />
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <span className="text-xl">📞</span>
                      <p className="text-lg font-medium text-gray-800">
                        {frontDeskPhone}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {isEditing ? (
                <input
                  type="text"
                  value={editedDescription}
                  onChange={(e) => setEditedDescription(e.target.value)}
                  className="w-full px-4 py-3 border rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 font-light"
                />
              ) : (
                <p className="text-sm text-gray-500 font-light tracking-wide font-mono">{templateStyle.description}</p>
              )}
            </div>
          ) : null}
        </div>
        
        <div className={`${template === 'horizontal' || template === 'hotel' ? 'w-1/2 flex flex-col items-center justify-center bg-gray-50 rounded-xl p-8' : ''}`}>
          <div className={`${template === 'horizontal' || template === 'hotel' ? '' : 'flex justify-center'}`}>
            <QRCodeSVG
              value={qrValue}
              size={250}
              level="H"
              includeMargin={true}
            />
          </div>
          
          {template !== 'horizontal' && template !== 'hotel' && (
            <div className="mt-4 space-y-2 text-center">
              <div className="flex items-center justify-center">
                <div className="flex-1 max-w-[200px]">
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedSsid}
                      onChange={(e) => setEditedSsid(e.target.value)}
                      className="w-full px-2 py-1 border rounded text-center"
                      placeholder={t('wifi')}
                    />
                  ) : (
                    <p className="font-medium">{t('wifi')}: {ssid}</p>
                  )}
                </div>
              </div>
              
                {!hidePassword && (
                  <div className="flex items-center justify-center">
                    <div className="flex-1 max-w-[200px]">
                      {isEditing ? (
                        <input
                          type="text"
                          value={editedPassword}
                          onChange={(e) => setEditedPassword(e.target.value)}
                          className="w-full px-2 py-1 border rounded text-center"
                          placeholder={t('password')}
                        />
                      ) : (
                        <p>{t('password')}: {password}</p>
                )}
              </div>
                </div>
              )}
              {isEditing ? (
                <input
                  type="text"
                  value={editedDescription}
                  onChange={(e) => setEditedDescription(e.target.value)}
                  className="w-full px-2 py-1 border rounded text-center text-sm font-light font-mono"
                />
              ) : (
                <p className="text-sm text-gray-500 font-light tracking-wide font-mono">{templateStyle.description}</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default memo(WifiPreviewCard); 
