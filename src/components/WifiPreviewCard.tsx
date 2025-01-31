'use client';

import { memo, useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { PencilIcon, CheckIcon } from '@heroicons/react/24/outline';
import { useTranslations } from 'next-intl';

type TemplateType = 'default' | 'restaurant' | 'hotel' | 'hospital' | 'office';

interface WifiPreviewCardProps {
  ssid: string;
  password: string;
  hidePassword: boolean;
  qrValue: string;
  template: TemplateType;
  onUpdate?: (newSsid: string, newPassword: string) => void;
  onTemplateStyleUpdate?: (newTitle: string, newDescription: string) => void;
}

function WifiPreviewCard({ ssid, password, hidePassword, qrValue, template, onUpdate, onTemplateStyleUpdate }: WifiPreviewCardProps) {
  const t = useTranslations('preview');
  const [isEditing, setIsEditing] = useState(false);
  const [editedSsid, setEditedSsid] = useState(ssid);
  const [editedPassword, setEditedPassword] = useState(password);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedDescription, setEditedDescription] = useState('');

  // 使用翻译的模板样式
  const TEMPLATE_STYLES: Record<TemplateType, {
    title: string;
    description: string;
    icon: string;
    textColor: string;
  }> = {
    default: {
      title: t('templates.default.title'),
      description: t('templates.default.description'),
      icon: '📶',
      textColor: 'text-gray-900',
    },
    restaurant: {
      title: t('templates.restaurant.title'),
      description: t('templates.restaurant.description'),
      icon: '🍽️',
      textColor: 'text-gray-900',
    },
    hotel: {
      title: t('templates.hotel.title'),
      description: t('templates.hotel.description'),
      icon: '🏨',
      textColor: 'text-gray-900',
    },
    hospital: {
      title: t('templates.hospital.title'),
      description: t('templates.hospital.description'),
      icon: '🏥',
      textColor: 'text-gray-900',
    },
    office: {
      title: t('templates.office.title'),
      description: t('templates.office.description'),
      icon: '💼',
      textColor: 'text-gray-900',
    },
  };

  useEffect(() => {
    setEditedTitle(TEMPLATE_STYLES[template].title);
    setEditedDescription(TEMPLATE_STYLES[template].description);
  }, [template, TEMPLATE_STYLES]);

  const handleSave = () => {
    onUpdate?.(editedSsid, editedPassword);
    onTemplateStyleUpdate?.(editedTitle, editedDescription);
    setIsEditing(false);
  };

  const handleEdit = () => {
    setEditedSsid(ssid);
    setEditedPassword(password);
    setEditedTitle(TEMPLATE_STYLES[template].title);
    setEditedDescription(TEMPLATE_STYLES[template].description);
    setIsEditing(true);
  };

  const templateStyle = {
    ...TEMPLATE_STYLES[template],
    title: isEditing ? editedTitle : TEMPLATE_STYLES[template].title,
    description: isEditing ? editedDescription : TEMPLATE_STYLES[template].description,
  };

  return (
    <div className="inline-block p-4 bg-white rounded-lg shadow-lg border-2 border-gray-200 print:shadow-none print:border-gray-300">
      <div className="flex items-center justify-center gap-2 mb-4">
        <span className="text-2xl">{templateStyle.icon}</span>
        {isEditing ? (
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            className="text-lg font-medium text-center border rounded px-2 py-1 w-full max-w-[200px]"
          />
        ) : (
          <h2 className="text-lg font-medium">{templateStyle.title}</h2>
        )}
        {(onUpdate || onTemplateStyleUpdate) && (
          <button
            onClick={() => isEditing ? handleSave() : handleEdit()}
            className="ml-2 p-1 text-gray-600 hover:text-gray-900"
          >
            {isEditing ? (
              <CheckIcon className="w-4 h-4" />
            ) : (
              <PencilIcon className="w-4 h-4" />
            )}
          </button>
        )}
      </div>
      
      <div className="flex justify-center">
        <QRCodeSVG
          value={qrValue}
          size={200}
          level="H"
          includeMargin={true}
        />
      </div>
      
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
            className="w-full px-2 py-1 border rounded text-center text-sm opacity-75"
          />
        ) : (
          <p className="text-sm opacity-75">{templateStyle.description}</p>
        )}
      </div>
    </div>
  );
}

export default memo(WifiPreviewCard); 
