import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Globe, Languages, Check, PenTool } from 'lucide-react';
import { useLanguage, SupportedLanguage, SUPPORTED_LANGUAGES } from '../context/LanguageContext';

interface LanguageSwitcherProps {
  variant?: 'compact' | 'standard';
  showTranslatorBtn?: boolean;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  variant = 'standard',
  showTranslatorBtn = true,
}) => {
  const { language, setLanguage, setIsTranslatorOpen, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLanguage =
    SUPPORTED_LANGUAGES.find((l) => l.code === language) || SUPPORTED_LANGUAGES[0];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectLanguage = (code: SupportedLanguage) => {
    setLanguage(code);
    setIsOpen(false);
  };

  const handleQuickToggle = (e: React.MouseEvent) => {
    // If shift or double-clicking, or when clicking flag, can toggle between ES and EN quickly
    if (e.altKey) {
      setLanguage(language === 'es' ? 'en' : 'es');
    } else {
      setIsOpen((prev) => !prev);
    }
  };

  return (
    <div className="relative inline-flex items-center gap-1.5" ref={dropdownRef}>
      {/* Main Language Switch Button */}
      <button
        onClick={handleQuickToggle}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-semibold transition-all shadow-xs"
        title={t('button.translatorTooltip', 'Cambiar idioma del prototipo (Español / Inglés)')}
        aria-expanded={isOpen}
      >
        <span className="text-sm leading-none">{currentLanguage.flag}</span>
        <span className="uppercase tracking-wider font-bold text-[11px]">
          {currentLanguage.code}
        </span>
        {variant === 'standard' && (
          <span className="hidden sm:inline font-medium text-slate-500 dark:text-slate-400">
            {currentLanguage.name}
          </span>
        )}
        <ChevronDown
          className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Quick Translator / Multilingual Writer Button */}
      {showTranslatorBtn && (
        <button
          onClick={() => setIsTranslatorOpen(true)}
          title={t(
            'button.translatorTooltip',
            'Escribir y traducir de inglés a español o cualquier idioma'
          )}
          className="p-1.5 rounded-lg border border-emerald-200 dark:border-emerald-800/80 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 transition-colors text-xs flex items-center gap-1 font-semibold"
          aria-label="Abrir asistente de traducción de idiomas"
        >
          <Languages className="w-3.5 h-3.5" />
          <span className="hidden lg:inline text-[11px]">ES⇄EN</span>
        </button>
      )}

      {/* Language Selection Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-1.5 w-56 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
          <div className="px-3 py-1.5 border-b border-slate-100 dark:border-slate-800 text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5" />
              <span>Seleccionar Idioma</span>
            </span>
            <span className="text-[10px] text-emerald-600 font-mono">i18n</span>
          </div>

          <div className="py-1">
            {SUPPORTED_LANGUAGES.map((langItem) => {
              const isSelected = langItem.code === language;
              return (
                <button
                  key={langItem.code}
                  onClick={() => handleSelectLanguage(langItem.code)}
                  className={`w-full flex items-center justify-between px-3.5 py-2 text-xs text-left transition-colors ${
                    isSelected
                      ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 font-bold'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/80'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-base leading-none">{langItem.flag}</span>
                    <div>
                      <div className="font-semibold">{langItem.name}</div>
                      <div className="text-[10px] text-slate-400 font-normal">
                        {langItem.nativeName}
                      </div>
                    </div>
                  </div>
                  {isSelected && <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />}
                </button>
              );
            })}
          </div>

          {/* Quick Translator Action inside Menu */}
          <div className="p-2 border-t border-slate-100 dark:border-slate-800 mt-1">
            <button
              onClick={() => {
                setIsOpen(false);
                setIsTranslatorOpen(true);
              }}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs font-semibold hover:from-emerald-700 hover:to-teal-700 transition-all shadow-xs"
            >
              <PenTool className="w-3.5 h-3.5" />
              <span>Escribir / Traducir (ES ⇄ EN)</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
