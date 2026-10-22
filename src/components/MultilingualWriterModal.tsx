import React, { useState } from 'react';
import {
  X,
  ArrowLeftRight,
  Copy,
  Check,
  Volume2,
  Sparkles,
  BookMarked,
  Languages,
  RotateCcw,
} from 'lucide-react';
import { useLanguage, SupportedLanguage, SUPPORTED_LANGUAGES } from '../context/LanguageContext';

// Comprehensive dictionary for SENA induction vocabulary and bilingual phrases
const SENA_PHRASES: Array<{
  es: string;
  en: string;
  category: string;
}> = [
  {
    category: 'Reglamento & Normas',
    es: 'Reglamento del Aprendiz SENA (Acuerdo 009 de 2024)',
    en: 'SENA Apprentice Regulations (Agreement 009 of 2024)',
  },
  {
    category: 'Reglamento & Normas',
    es: 'Derechos del aprendiz: recibir formación profesional integral de calidad',
    en: 'Apprentice rights: to receive quality comprehensive vocational training',
  },
  {
    category: 'Reglamento & Normas',
    es: 'Deberes del aprendiz: cumplir con las actividades de aprendizaje y asistir puntualmente',
    en: 'Apprentice duties: complete learning activities and attend promptly',
  },
  {
    category: 'Reglamento & Normas',
    es: 'Prohibiciones: cometer fraude, plagio o ingresar sustancias psicoactivas',
    en: 'Prohibitions: commit fraud, plagiarism, or enter psychoactive substances',
  },
  {
    category: 'Etapas de Formación',
    es: 'Etapa Lectiva: desarrollo de competencias en el ambiente de formación',
    en: 'Schooling Stage: competency development in the training environment',
  },
  {
    category: 'Etapas de Formación',
    es: 'Etapa Productiva: aplicación práctica en el sector empresarial',
    en: 'Productive Stage: practical application in the business sector',
  },
  {
    category: 'Debido Proceso',
    es: 'Comité de Evaluación y Seguimiento',
    en: 'Evaluation and Follow-up Committee',
  },
  {
    category: 'Debido Proceso',
    es: 'Plan de Mejoramiento académico o disciplinario',
    en: 'Academic or disciplinary improvement plan',
  },
  {
    category: 'Debido Proceso',
    es: 'Derecho a la defensa y debido proceso garantizado',
    en: 'Right to defense and guaranteed due process',
  },
  {
    category: 'Debido Proceso',
    es: 'Recurso de reposición ante la Subdirección del Centro',
    en: 'Right of appeal before the Center Subdirection',
  },
  {
    category: 'Institucional',
    es: 'Ficha de Caracterización y Centro de Formación',
    en: 'Cohort Batch Code and Training Center',
  },
  {
    category: 'Institucional',
    es: 'Evaluación de competencias: Aprobado (A) o No Aprobado (D)',
    en: 'Competency evaluation: Approved (A) or Deficient / Not Approved (D)',
  },
];

// Offline translation lookup table for high-frequency terms
const TERM_DICTIONARY: Record<string, string> = {
  // English to Spanish
  'apprentice': 'aprendiz',
  'apprentices': 'aprendices',
  'instructor': 'instructor',
  'teacher': 'instructor',
  'induction': 'inducción',
  'regulation': 'reglamento',
  'rules': 'reglas / normas',
  'rights': 'derechos',
  'duties': 'deberes',
  'prohibitions': 'prohibiciones',
  'quiz': 'evaluación / cuestionario',
  'evaluation': 'evaluación',
  'certificate': 'certificado',
  'center': 'centro de formación',
  'training': 'formación',
  'stage': 'etapa',
  'productive': 'productiva',
  'schooling': 'lectiva',
  'batch': 'ficha',
  'committee': 'comité',
  'sanction': 'sanción',
  'due process': 'debido proceso',
  'attendance': 'asistencia',
  'absence': 'inasistencia',
  'justification': 'justificación',
  'agreement': 'acuerdo',
  'improvement plan': 'plan de mejoramiento',
  'good morning': 'buenos días',
  'good afternoon': 'buenas tardes',
  'hello': 'hola',
  'thank you': 'gracias',
  'welcome': 'bienvenido',
  'how are you': '¿cómo estás?',
  'what are my rights': '¿cuáles son mis derechos?',
  'what are my duties': '¿cuáles son mis deberes?',
  'how do i get certified': '¿cómo obtengo mi certificado?',
};

// Reverse dictionary for Spanish to English
const SPANISH_TO_ENGLISH: Record<string, string> = {};
Object.entries(TERM_DICTIONARY).forEach(([en, es]) => {
  SPANISH_TO_ENGLISH[es.toLowerCase()] = en;
});

export const MultilingualWriterModal: React.FC = () => {
  const { isTranslatorOpen, setIsTranslatorOpen, t } = useLanguage();
  const [sourceLang, setSourceLang] = useState<SupportedLanguage>('en');
  const [targetLang, setTargetLang] = useState<SupportedLanguage>('es');
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [copied, setCopied] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);

  if (!isTranslatorOpen) return null;

  const handleSwapLanguages = () => {
    const prevSource = sourceLang;
    const prevTarget = targetLang;
    setSourceLang(prevTarget);
    setTargetLang(prevSource);
    setInputText(outputText);
    setOutputText(inputText);
  };

  const translateContent = (text: string, from: SupportedLanguage, to: SupportedLanguage) => {
    if (!text.trim()) {
      setOutputText('');
      return;
    }

    setIsTranslating(true);

    setTimeout(() => {
      const clean = text.trim();
      const lower = clean.toLowerCase();

      // Check exact match in SENA phrases
      const matchedPhrase = SENA_PHRASES.find(
        (p) =>
          (from === 'es' && p.es.toLowerCase() === lower) ||
          (from === 'en' && p.en.toLowerCase() === lower)
      );

      if (matchedPhrase) {
        if (to === 'es') setOutputText(matchedPhrase.es);
        else if (to === 'en') setOutputText(matchedPhrase.en);
        else if (to === 'pt') setOutputText(`[PT] ${matchedPhrase.es}`);
        else if (to === 'fr') setOutputText(`[FR] ${matchedPhrase.es}`);
        setIsTranslating(false);
        return;
      }

      // Check dictionary matches or tokenized translation
      if (from === 'en' && to === 'es') {
        if (TERM_DICTIONARY[lower]) {
          setOutputText(capitalize(TERM_DICTIONARY[lower]));
          setIsTranslating(false);
          return;
        }

        // Phrase replacement algorithm
        let translated = clean;
        const keys = Object.keys(TERM_DICTIONARY).sort((a, b) => b.length - a.length);
        keys.forEach((key) => {
          const regex = new RegExp(`\\b${key}\\b`, 'gi');
          translated = translated.replace(regex, TERM_DICTIONARY[key]);
        });

        // Common syntactic adjustments
        translated = translated
          .replace(/\bwhat is\b/gi, '¿qué es')
          .replace(/\bwhat are\b/gi, '¿cuáles son')
          .replace(/\bhow to\b/gi, 'cómo')
          .replace(/\bhow can i\b/gi, '¿cómo puedo')
          .replace(/\bwhere is\b/gi, '¿dónde está')
          .replace(/\bmy\b/gi, 'mi / mis')
          .replace(/\byour\b/gi, 'tu / su')
          .replace(/\bthe\b/gi, 'el/la/los/las')
          .replace(/\band\b/gi, 'y')
          .replace(/\bfor\b/gi, 'para')
          .replace(/\bwith\b/gi, 'con')
          .replace(/\bin\b/gi, 'en')
          .replace(/\bto\b/gi, 'a')
          .replace(/\bof\b/gi, 'de');

        setOutputText(translated);
      } else if (from === 'es' && to === 'en') {
        if (SPANISH_TO_ENGLISH[lower]) {
          setOutputText(capitalize(SPANISH_TO_ENGLISH[lower]));
          setIsTranslating(false);
          return;
        }

        let translated = clean;
        const keys = Object.keys(SPANISH_TO_ENGLISH).sort((a, b) => b.length - a.length);
        keys.forEach((key) => {
          const regex = new RegExp(`\\b${key}\\b`, 'gi');
          translated = translated.replace(regex, SPANISH_TO_ENGLISH[key]);
        });

        translated = translated
          .replace(/\b¿qué es\b/gi, 'what is')
          .replace(/\b¿cuáles son\b/gi, 'what are')
          .replace(/\bcómo\b/gi, 'how to')
          .replace(/\b¿cómo puedo\b/gi, 'how can I')
          .replace(/\b¿dónde está\b/gi, 'where is')
          .replace(/\baprendiz\b/gi, 'apprentice')
          .replace(/\baprendices\b/gi, 'apprentices')
          .replace(/\breglamento\b/gi, 'regulations')
          .replace(/\by\b/gi, 'and')
          .replace(/\bpara\b/gi, 'for')
          .replace(/\bcon\b/gi, 'with')
          .replace(/\ben\b/gi, 'in')
          .replace(/\bde\b/gi, 'of');

        setOutputText(translated);
      } else {
        // Fallback for other language pairs with prefix indication
        setOutputText(`[${to.toUpperCase()}] ${clean}`);
      }

      setIsTranslating(false);
    }, 200);
  };

  const handleCopy = () => {
    if (!outputText) return;
    navigator.clipboard.writeText(outputText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSpeak = (text: string, langCode: string) => {
    if (!('speechSynthesis' in window) || !text) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = langCode === 'es' ? 'es-CO' : langCode === 'en' ? 'en-US' : langCode;
    window.speechSynthesis.speak(utterance);
  };

  const capitalize = (s: string) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : '');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl max-w-3xl w-full max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-gradient-to-r from-emerald-50/50 via-white to-slate-50 dark:from-emerald-950/30 dark:via-slate-900 dark:to-slate-900">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-sm">
              <Languages className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span>{t('writer.title', 'Asistente de Escritura y Traductor')}</span>
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                  ES ⇄ EN
                </span>
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {t('writer.subtitle', 'Escribe y traduce textos de inglés a español (o viceversa) para cualquier consulta o nota de inducción.')}
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsTranslatorOpen(false)}
            className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Translation Work Area */}
        <div className="p-5 overflow-y-auto space-y-5 flex-1">
          {/* Controls Bar */}
          <div className="flex items-center justify-between gap-3 bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-2xl border border-slate-200/80 dark:border-slate-700/80">
            {/* From language selector */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                {t('writer.from', 'De:')}
              </span>
              <select
                value={sourceLang}
                onChange={(e) => {
                  const val = e.target.value as SupportedLanguage;
                  setSourceLang(val);
                  translateContent(inputText, val, targetLang);
                }}
                className="text-xs font-bold bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                {SUPPORTED_LANGUAGES.map((l) => (
                  <option key={l.code} value={l.code}>
                    {l.flag} {l.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Swap Button */}
            <button
              onClick={handleSwapLanguages}
              title={t('writer.swap', 'Invertir idiomas')}
              className="p-1.5 text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-white dark:hover:bg-slate-900 rounded-xl transition-all shadow-xs border border-slate-200 dark:border-slate-700"
            >
              <ArrowLeftRight className="w-4 h-4" />
            </button>

            {/* To language selector */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                {t('writer.to', 'A:')}
              </span>
              <select
                value={targetLang}
                onChange={(e) => {
                  const val = e.target.value as SupportedLanguage;
                  setTargetLang(val);
                  translateContent(inputText, sourceLang, val);
                }}
                className="text-xs font-bold bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                {SUPPORTED_LANGUAGES.map((l) => (
                  <option key={l.code} value={l.code}>
                    {l.flag} {l.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Dual Textareas: Input & Output */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Input Side */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                <span className="font-semibold uppercase tracking-wider">
                  {SUPPORTED_LANGUAGES.find((l) => l.code === sourceLang)?.name}
                </span>
                {inputText && (
                  <button
                    onClick={() => {
                      setInputText('');
                      setOutputText('');
                    }}
                    className="text-rose-500 hover:underline flex items-center gap-1 text-[11px]"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>{t('writer.clearBtn', 'Limpiar')}</span>
                  </button>
                )}
              </div>
              <textarea
                value={inputText}
                onChange={(e) => {
                  setInputText(e.target.value);
                  translateContent(e.target.value, sourceLang, targetLang);
                }}
                placeholder={t(
                  'writer.inputPlaceholder',
                  'Escribe aquí el texto que deseas traducir...'
                )}
                rows={5}
                className="w-full text-sm p-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-950/50 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none font-sans"
              />
              <div className="flex justify-end gap-2">
                {inputText && (
                  <button
                    onClick={() => handleSpeak(inputText, sourceLang)}
                    title="Escuchar pronunciación"
                    className="p-1.5 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-xs flex items-center gap-1"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>{t('button.listen', 'Escuchar')}</span>
                  </button>
                )}
              </div>
            </div>

            {/* Output Side */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                <span className="font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                  {SUPPORTED_LANGUAGES.find((l) => l.code === targetLang)?.name}
                </span>
                {isTranslating && (
                  <span className="text-[11px] text-emerald-600 animate-pulse flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    Traduciendo...
                  </span>
                )}
              </div>
              <div className="w-full min-h-[128px] text-sm p-3.5 rounded-2xl border border-emerald-200 dark:border-emerald-800/80 bg-emerald-50/30 dark:bg-emerald-950/20 text-slate-900 dark:text-slate-100 font-sans flex flex-col justify-between">
                <p className="whitespace-pre-wrap">
                  {outputText || (
                    <span className="text-slate-400 dark:text-slate-500 italic">
                      {t('writer.outputPlaceholder', 'La traducción aparecerá aquí...')}
                    </span>
                  )}
                </p>
                {outputText && (
                  <div className="flex items-center justify-end gap-2 pt-2 border-t border-emerald-100 dark:border-emerald-900/60 mt-3">
                    <button
                      onClick={() => handleSpeak(outputText, targetLang)}
                      title="Escuchar pronunciación"
                      className="p-1.5 text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white rounded-lg hover:bg-emerald-100/50 dark:hover:bg-slate-800 text-xs flex items-center gap-1"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>{t('button.listen', 'Escuchar')}</span>
                    </button>
                    <button
                      onClick={handleCopy}
                      className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-1.5 transition-colors shadow-xs"
                    >
                      {copied ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>{t('button.copied', '¡Copiado!')}</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>{t('button.copy', 'Copiar')}</span>
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Quick Phrases for SENA Induction */}
          <div className="space-y-2.5 pt-2 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5 uppercase tracking-wide">
                <BookMarked className="w-3.5 h-3.5 text-emerald-600" />
                <span>{t('writer.quickPhrasesTitle', 'Frases Frecuentes de la Inducción SENA')}</span>
              </h3>
              <span className="text-[11px] text-slate-400">
                {t('writer.quickHelp', 'Haz clic para cargar')}
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-1">
              {SENA_PHRASES.map((item, index) => (
                <button
                  key={index}
                  onClick={() => {
                    if (sourceLang === 'es') {
                      setInputText(item.es);
                      setOutputText(targetLang === 'en' ? item.en : `[${targetLang.toUpperCase()}] ${item.es}`);
                    } else {
                      setInputText(item.en);
                      setOutputText(targetLang === 'es' ? item.es : `[${targetLang.toUpperCase()}] ${item.en}`);
                    }
                  }}
                  className="text-left p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-emerald-500 dark:hover:border-emerald-500 bg-white dark:bg-slate-900/80 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/30 transition-all text-xs group"
                >
                  <div className="text-[10px] font-semibold text-emerald-700 dark:text-emerald-400 mb-0.5">
                    {item.category}
                  </div>
                  <div className="font-medium text-slate-800 dark:text-slate-200 group-hover:text-emerald-700 dark:group-hover:text-emerald-300 line-clamp-1">
                    {sourceLang === 'es' ? item.es : item.en}
                  </div>
                  <div className="text-slate-400 text-[11px] line-clamp-1">
                    ↳ {sourceLang === 'es' ? item.en : item.es}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Traductor bilingüe y multilingüe integrado para el prototipo SENA</span>
          </div>
          <button
            onClick={() => setIsTranslatorOpen(false)}
            className="px-4 py-2 bg-slate-900 dark:bg-slate-100 hover:bg-slate-800 dark:hover:bg-white text-white dark:text-slate-900 font-semibold rounded-xl text-xs transition-colors"
          >
            {t('button.close', 'Cerrar')}
          </button>
        </div>
      </div>
    </div>
  );
};
