import React from 'react';
import { User, Search, Moon, Sun, Table, ShieldCheck, GraduationCap, Lock, Share2, LogOut, BookOpen, Play } from 'lucide-react';
import { ApprenticeProfile, UserRole } from '../types/induction';
import { SenaLogo } from './SenaLogo';

interface HeaderProps {
  currentTab: 'plan' | 'modules' | 'simulator' | 'quiz' | 'certificate' | 'spreadsheet';
  onSelectTab: (tab: 'plan' | 'modules' | 'simulator' | 'quiz' | 'certificate' | 'spreadsheet') => void;
  apprentice: ApprenticeProfile;
  userRole: UserRole;
  onOpenProfile: () => void;
  onOpenSearch: () => void;
  onOpenManual?: () => void;
  onOpenVideoTutorial?: () => void;
  onRequestInstructorAccess: () => void;
  onSwitchToLearner: () => void;
  onCopyLearnerLink: () => void;
  onExitToLanding?: () => void;
  isCertified: boolean;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onSelectTab,
  apprentice,
  userRole,
  onOpenProfile,
  onOpenSearch,
  onOpenManual,
  onOpenVideoTutorial,
  onRequestInstructorAccess,
  onSwitchToLearner,
  onCopyLearnerLink,
  onExitToLanding,
  isCertified,
  isDarkMode,
  onToggleDarkMode,
}) => {
  const isInstructor = userRole === 'instructor';

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 sm:gap-6 px-6 py-3.5">
        {/* Zone 1: Brand Wordmark with Role Indicator */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => onSelectTab('plan')}
            className="text-left group flex items-center gap-3 text-slate-900 dark:text-slate-100 font-bold tracking-tight text-lg whitespace-nowrap hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors"
          >
            <div className="w-14 h-14 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/90 dark:border-emerald-800/90 flex items-center justify-center p-1.5 shadow-sm group-hover:scale-105 transition-transform shrink-0">
              <SenaLogo className="w-full h-full" color="#39a900" />
            </div>
            <div>
              <span className="font-extrabold text-slate-900 dark:text-slate-100 hidden sm:inline text-lg leading-tight block">
                SENA
              </span>
              <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 hidden sm:block">
                Inducción Integral
              </span>
            </div>
          </button>

          {/* Role Pill Indicator */}
          <span
            className={`text-[11px] font-mono-num font-semibold px-2 py-0.5 rounded-md border flex items-center gap-1 ${
              isInstructor
                ? 'bg-amber-50 dark:bg-amber-950/50 text-amber-900 dark:text-amber-300 border-amber-200 dark:border-amber-800'
                : 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800'
            }`}
          >
            {isInstructor ? (
              <>
                <ShieldCheck className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                <span>Instructor</span>
              </>
            ) : (
              <>
                <GraduationCap className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>Aprendiz</span>
              </>
            )}
          </span>
        </div>

        {/* Zone 2: Navigation Links (Privilege-aware) */}
        <nav className="hidden lg:flex items-center gap-5 xl:gap-6 text-sm font-medium text-slate-600 dark:text-slate-300">
          <button
            onClick={() => onSelectTab('plan')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
              currentTab === 'plan'
                ? 'text-emerald-700 dark:text-emerald-400 font-semibold border-b-2 border-emerald-600'
                : 'hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Plan Estructurado
          </button>
          <button
            onClick={() => onSelectTab('modules')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
              currentTab === 'modules'
                ? 'text-emerald-700 dark:text-emerald-400 font-semibold border-b-2 border-emerald-600'
                : 'hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Módulos
          </button>
          <button
            onClick={() => onSelectTab('simulator')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
              currentTab === 'simulator'
                ? 'text-emerald-700 dark:text-emerald-400 font-semibold border-b-2 border-emerald-600'
                : 'hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Retos & Casos
          </button>
          <button
            onClick={() => onSelectTab('quiz')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
              currentTab === 'quiz'
                ? 'text-emerald-700 dark:text-emerald-400 font-semibold border-b-2 border-emerald-600'
                : 'hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Evaluación
          </button>

          {/* INSTRUCTOR ONLY TAB: Planilla de Control */}
          {isInstructor && (
            <button
              onClick={() => onSelectTab('spreadsheet')}
              className={`whitespace-nowrap shrink-0 transition-colors py-1 flex items-center gap-1.5 ${
                currentTab === 'spreadsheet'
                  ? 'text-emerald-700 dark:text-emerald-400 font-semibold border-b-2 border-emerald-600'
                  : 'hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <span>Planilla de Aprendices</span>
              <span className="text-[10px] font-mono-num font-semibold text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/60 px-1.5 py-0.2 rounded border border-amber-200 dark:border-amber-800">
                Ficha
              </span>
            </button>
          )}

          <button
            onClick={() => onSelectTab('certificate')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 flex items-center gap-1.5 ${
              currentTab === 'certificate'
                ? 'text-emerald-700 dark:text-emerald-400 font-semibold border-b-2 border-emerald-600'
                : 'hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <span>Certificado</span>
            {isCertified && (
              <span className="text-[10px] font-mono-num font-semibold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-1.5 py-0.2 rounded border border-emerald-200 dark:border-emerald-800">
                Listo
              </span>
            )}
          </button>
        </nav>

        {/* Zone 3: Actions & Role Switching */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Share Learner Link (Instructor quick action) */}
          {isInstructor && (
            <button
              onClick={onCopyLearnerLink}
              title="Copiar enlace para compartir a los aprendices"
              className="px-2.5 py-1.5 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Enlace para Aprendices</span>
            </button>
          )}

          {/* Role Switcher Action */}
          {isInstructor ? (
            <button
              onClick={onSwitchToLearner}
              title="Cambiar a vista de Aprendiz"
              className="px-2.5 py-1.5 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5"
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Vista Aprendiz</span>
            </button>
          ) : (
            <button
              onClick={onRequestInstructorAccess}
              title="Acceso Instructor (Configuración de Ficha)"
              className="px-2.5 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5"
            >
              <Lock className="w-3.5 h-3.5 text-amber-600" />
              <span className="hidden sm:inline">Soy Instructor</span>
            </button>
          )}

          {/* Dark Mode Toggle */}
          <button
            onClick={onToggleDarkMode}
            title={isDarkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
            aria-label={isDarkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
            className="p-2 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
          >
            {isDarkMode ? (
              <Sun className="w-4 h-4 text-amber-400 transition-transform duration-200 hover:rotate-45" />
            ) : (
              <Moon className="w-4 h-4 text-slate-600 transition-transform duration-200 hover:-rotate-12" />
            )}
          </button>

          {/* Quick Search */}
          <button
            onClick={onOpenSearch}
            title="Consultar artículos del reglamento"
            className="p-2 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            aria-label="Buscar en el reglamento"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Video Tutorial Floating Window Button */}
          {onOpenVideoTutorial && (
            <button
              onClick={onOpenVideoTutorial}
              title="Ver Video Tutorial de Inducción en Ventana Flotante"
              className="p-2 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-slate-800 rounded-lg transition-colors flex items-center gap-1.5 text-xs font-semibold"
              aria-label="Abrir video tutorial de inducción"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span className="hidden sm:inline">Tutorial</span>
            </button>
          )}

          {/* Apprentice Manual / Instructivo Button */}
          {onOpenManual && (
            <button
              onClick={onOpenManual}
              title="Ver Instructivo y Manual de Inducción Paso a Paso"
              className="p-2 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-slate-800 rounded-lg transition-colors flex items-center gap-1.5 text-xs font-semibold"
              aria-label="Abrir manual de inducción"
            >
              <BookOpen className="w-4 h-4" />
              <span className="hidden sm:inline">Instructivo</span>
            </button>
          )}

          {/* Student Profile Button */}
          <button
            onClick={onOpenProfile}
            className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-white bg-slate-900 dark:bg-emerald-700 hover:bg-slate-800 dark:hover:bg-emerald-600 rounded-lg transition-colors whitespace-nowrap shrink-0"
          >
            <User className="w-3.5 h-3.5" />
            <span className="max-w-[100px] truncate">{apprentice.name.split(' ')[0]}</span>
          </button>

          {/* Exit / Switch Role to Landing Page */}
          {onExitToLanding && (
            <button
              onClick={onExitToLanding}
              title="Cambiar de rol / Salir al portal de acceso"
              className="p-2 text-slate-400 hover:text-rose-600 dark:text-slate-400 dark:hover:text-rose-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors flex items-center gap-1 text-xs"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden xl:inline font-medium">Portal</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
