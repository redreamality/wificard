'use client';

import { useState, useCallback, useEffect } from 'react';
import { PrinterIcon } from '@heroicons/react/24/outline';
import { useTranslations } from 'next-intl';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import WifiPreviewCard from './WifiPreviewCard';
import SettingsPanel from './SettingsPanel';
import Instructions from './Instructions';

type EncryptionType = 'WPA' | 'WPA2' | 'WPA3' | 'WEP' | 'nopass';
type TemplateType = 'default' | 'restaurant' | 'hotel' | 'hospital' | 'office';

interface WiFiCardProps {
  scene?: string | null;
}

export default function WiFiCard({ scene }: WiFiCardProps) {
  const t = useTranslations();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // 从 URL 参数初始化状态
  const [ssid, setSsid] = useState('');
  const [password, setPassword] = useState('');
  const [encryption, setEncryption] = useState<EncryptionType>('WPA2');
  const [hidePassword, setHidePassword] = useState(false);
  const [template, setTemplate] = useState<TemplateType>(() => {
    if (scene && ['hotel', 'restaurant', 'hospital', 'office'].includes(scene)) {
      return scene as TemplateType;
    }
    return 'default';
  });

  // 根据场景设置模板和标题
  useEffect(() => {
    if (scene && ['hotel', 'restaurant', 'hospital', 'office'].includes(scene)) {
      const newTemplate = scene as TemplateType;
      setTemplate(newTemplate);
      document.title = t(`pageTitles.${newTemplate}`);
    } else {
      document.title = t('pageTitles.default');
    }
  }, [scene, t]);

  // 监听 URL 参数变化
  useEffect(() => {
    const newSsid = searchParams.get('ssid');
    const newPwd = searchParams.get('pwd');
    const newEnc = searchParams.get('enc') as EncryptionType;
    const newHide = searchParams.get('hide') === '1';

    if (newSsid !== null) setSsid(newSsid);
    if (newPwd !== null) setPassword(newPwd);
    if (newEnc && ['WPA', 'WPA2', 'WPA3', 'WEP', 'nopass'].includes(newEnc)) setEncryption(newEnc);
    setHidePassword(newHide);
  }, [searchParams]);

  // 更新 URL 参数
  const updateUrlParams = useCallback((newTemplate: TemplateType) => {
    const params = new URLSearchParams();
    params.set('scene', newTemplate);
    if (ssid) params.set('ssid', ssid);
    if (password) params.set('pwd', password);
    params.set('enc', encryption);
    params.set('hide', hidePassword ? '1' : '0');
    router.replace(`${pathname}?${params.toString()}`);
  }, [pathname, router, ssid, password, encryption, hidePassword]);

  // 处理模板变更
  const handleTemplateChange = useCallback((newTemplate: TemplateType) => {
    setTemplate(newTemplate);
    updateUrlParams(newTemplate);
    document.title = t(`pageTitles.${newTemplate}`);
  }, [updateUrlParams, t]);

  const generateWifiString = useCallback(() => {
    const auth = encryption === 'nopass' ? 'nopass' : encryption;
    const pass = encryption === 'nopass' ? '' : `P:${password}`;
    return `WIFI:T:${auth};S:${ssid};${pass};;`;
  }, [encryption, password, ssid]);

  const handlePrint = useCallback(() => {
    const printContent = document.getElementById('wifi-card-preview');
    if (!printContent) return;

    // 创建一个新的样式元素
    const style = document.createElement('style');
    style.textContent = `
      @page {
        margin: 0;
        size: auto;
      }
      @media print {
        body * {
          visibility: hidden;
        }
        #wifi-card-preview, #wifi-card-preview * {
          visibility: visible;
        }
        #wifi-card-preview {
          position: fixed;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }
      }
    `;
    document.head.appendChild(style);

    // 等待图片加载完成后打印
    const images = printContent.getElementsByTagName('img');
    if (images.length > 0) {
      let loadedImages = 0;
      for (let i = 0; i < images.length; i++) {
        images[i].onload = () => {
          loadedImages++;
          if (loadedImages === images.length) {
            setTimeout(() => {
              window.print();
              // 打印完成后移除样式
              document.head.removeChild(style);
            }, 500);
          }
        };
      }
    } else {
      setTimeout(() => {
        window.print();
        // 打印完成后移除样式
        document.head.removeChild(style);
      }, 500);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-[1600px] mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 text-center mb-8 print:hidden">
          {t('title')}
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr_300px] gap-8">
          {/* 左侧设置面板 */}
          <div className="print:hidden">
            <SettingsPanel
              ssid={ssid}
              password={password}
              encryption={encryption}
              hidePassword={hidePassword}
              template={template}
              onSsidChange={setSsid}
              onPasswordChange={setPassword}
              onEncryptionChange={setEncryption}
              onHidePasswordChange={setHidePassword}
              onTemplateChange={handleTemplateChange}
            />
          </div>

          {/* 中间预览和打印 */}
          <div className="flex flex-col items-center space-y-8">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md print:shadow-none print:p-0">
              <div id="wifi-card-preview" className="flex justify-center">
                <WifiPreviewCard
                  ssid={ssid || t('preview.defaultSsid')}
                  password={password}
                  hidePassword={hidePassword}
                  qrValue={ssid ? generateWifiString() : 'WIFI:T:WPA2;S:示例WiFi;P:password;;'}
                  template={template}
                  onUpdate={(newSsid, newPassword) => {
                    setSsid(newSsid);
                    setPassword(newPassword);
                  }}
                />
              </div>
            </div>

            <button
              type="button"
              onClick={handlePrint}
              className="print:hidden w-full max-w-md px-8 py-4 text-lg font-medium text-white bg-indigo-600 rounded-lg shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 flex items-center justify-center gap-3"
            >
              <PrinterIcon className="h-6 w-6" />
              {t('print.button')}
            </button>
          </div>

          {/* 右侧说明 */}
          <div className="print:hidden">
            <Instructions />
          </div>
        </div>
      </div>
    </div>
  );
} 
