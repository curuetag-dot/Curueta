import React, { useState, useEffect } from 'react';
import {
  GraduationCap,
  ShieldCheck,
  Lock,
  ArrowRight,
  Sun,
  Moon,
  CheckCircle2,
  AlertCircle,
  FileSpreadsheet,
  Award,
  Sparkles,
  BookOpen,
  UserCheck,
  HelpCircle,
  Play,
  Video,
} from 'lucide-react';
import { ApprenticeProfile, ApprenticeRecord } from '../types/induction';
import { SenaLogo } from './SenaLogo';

interface RoleSelectionLandingProps {
  onSelectInstructor: () => void;
  onSelectLearner: (profile: ApprenticeProfile) => void;
  roster: ApprenticeRecord[];
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  initialRoleView?: 'select' | 'aprendiz' | 'instructor';
  onOpenManual?: () => void;
  onOpenVideoTutorial?: () => void;
}

export const RoleSelectionLanding: React.FC<RoleSelectionLandingProps> = ({
  onSelectInstructor,
  onSelectLearner,
  roster,
  isDarkMode,
  onToggleDarkMode,
  initialRoleView = 'select',
  onOpenManual,
  onOpenVideoTutorial,
}) => {
  const [view, setView] = useState<'select' | 'aprendiz' | 'instructor'>(initialRoleView);

  // Instructor PIN form state
  const [instructorPin, setInstructorPin] = useState('');
  const [instructorError, setInstructorError] = useState(false);

  // Learner Characterization form state
  const [name, setName] = useState('');
  const [documentType, setDocumentType] = useState<'C.C.' | 'T.I.' | 'C.E.' | 'PEP'>('C.C.');
  const [documentNumber, setDocumentNumber] = useState('');
  const [trainingProgram, setTrainingProgram] = useState('Análisis y Desarrollo de Software - ADSO');
  const [groupCode, setGroupCode] = useState('2894120');
  const [regional, setRegional] = useState('Regional Distrito Capital');
  const [trainingCenter, setTrainingCenter] = useState('Centro de Gestión de Mercados, Tecnologías y TI');
  const [email, setEmail] = useState('');
  const [existingLearnerFound, setExistingLearnerFound] = useState<ApprenticeRecord | null>(null);

  // Check if learner already exists when typing document number
  useEffect(() => {
    if (documentNumber.trim().length >= 5) {
      const match = roster.find(
        (r) => r.documentNumber.trim() === documentNumber.trim()
      );
      if (match) {
        setExistingLearnerFound(match);
        setName(match.name);
        setDocumentType(match.documentType);
        setTrainingProgram(match.trainingProgram);
        setGroupCode(match.groupCode);
        setRegional(match.regional);
        setTrainingCenter(match.trainingCenter);
        setEmail(match.email);
      } else {
        setExistingLearnerFound(null);
      }
    } else {
      setExistingLearnerFound(null);
    }
  }, [documentNumber, roster]);

  const handleInstructorSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = instructorPin.trim().toLowerCase();
    if (clean === 'sena 1234' || clean === 'sena1234' || clean === '1234' || clean === 'sena2026') {
      setInstructorError(false);
      onSelectInstructor();
    } else {
      setInstructorError(true);
    }
  };

  const handleLearnerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !documentNumber.trim() || !groupCode.trim()) {
      return;
    }

    const learnerProfile: ApprenticeProfile = {
      name: name.trim(),
      documentType,
      documentNumber: documentNumber.trim(),
      trainingProgram: trainingProgram.trim() || 'Técnico / Tecnólogo SENA',
      groupCode: groupCode.trim(),
      regional: regional.trim() || 'Regional SENA',
      trainingCenter: trainingCenter.trim() || 'Centro de Formación SENA',
      email: email.trim() || `${name.trim().toLowerCase().replace(/\s+/g, '.')}@soy.sena.edu.co`,
    };

    onSelectLearner(learnerProfile);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-slate-100/60 to-emerald-50/20 dark:from-slate-950 dark:via-slate-900 dark:to-emerald-950/20 text-slate-800 dark:text-slate-100 flex flex-col font-sans transition-colors duration-200">
      {/* Top Institutional Header */}
      <header className="border-b border-slate-200/80 dark:border-slate-800/80 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md px-6 py-4 sticky top-0 z-20">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-[68px] h-[68px] rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/90 dark:border-emerald-800/90 flex items-center justify-center p-2.5 shadow-sm shrink-0">
              <SenaLogo className="w-full h-full" color="#39a900" />
            </div>
            <div>
              <div className="font-extrabold text-slate-900 dark:text-slate-100 text-base md:text-lg tracking-tight leading-tight">
                Servicio Nacional de Aprendizaje — SENA
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                Reglamento del Aprendiz (Acuerdo 009 de 2024) · Portal de Acceso
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {onOpenVideoTutorial && (
              <button
                onClick={onOpenVideoTutorial}
                className="px-3 py-1.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors flex items-center gap-1.5 shadow-xs"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span className="hidden sm:inline">Video Tutorial</span>
                <span className="sm:hidden">Video</span>
              </button>
            )}

            {onOpenManual && (
              <button
                onClick={onOpenManual}
                className="px-3 py-1.5 text-xs font-semibold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/50 hover:bg-emerald-100 border border-emerald-200 dark:border-emerald-800 rounded-lg transition-colors flex items-center gap-1.5"
              >
                <BookOpen className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span className="hidden sm:inline">Instructivo del Aprendiz</span>
                <span className="sm:hidden">Guía</span>
              </button>
            )}

            <button
              onClick={onToggleDarkMode}
              title={isDarkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
              className="p-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-6 py-10 md:py-14 flex flex-col justify-center">
        {/* Role Selection View */}
        {view === 'select' && (
          <div className="space-y-10 animate-in fade-in duration-300">
            {/* Headline */}
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Inducción Integral de Aprendices</span>
              </span>
              <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                ¿Cómo deseas ingresar al sistema?
              </h1>
              <p className="text-sm md:text-base text-slate-600 dark:text-slate-400">
                Selecciona tu rol para acceder a la plataforma correspondiente y evitar confusiones en tu pantalla.
              </p>
            </div>

            {/* Spotlight Banner: Video Tutorial Flotante */}
            {onOpenVideoTutorial && (
              <div className="max-w-4xl mx-auto w-full bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 text-white rounded-3xl p-5 sm:p-6 border border-emerald-500/30 shadow-lg flex flex-col md:flex-row items-center justify-between gap-5">
                <div className="flex items-center gap-4">
                  <button
                    onClick={onOpenVideoTutorial}
                    className="w-14 h-14 rounded-2xl bg-emerald-500 text-slate-950 hover:bg-emerald-400 flex items-center justify-center shrink-0 shadow-md hover:scale-105 transition-transform"
                    title="Reproducir Video Tutorial en Ventana Flotante"
                  >
                    <Play className="w-6 h-6 fill-current ml-0.5" />
                  </button>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        Tutorial Audiovisual
                      </span>
                      <span className="text-xs text-slate-400">Duración: 3 min · Español · Google Drive & HD</span>
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-white">
                      ¿Primera vez en la inducción? Mira el video tutorial
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed max-w-xl">
                      Aprende en video cómo acceder sin clave, diligenciar tu ficha, resolver los retos del reglamento y sincronizar automáticamente tu certificación con el instructor.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full md:w-auto shrink-0 justify-end">
                  <button
                    onClick={onOpenVideoTutorial}
                    className="w-full md:w-auto px-5 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-sm"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Ver en Ventana Flotante</span>
                  </button>
                </div>
              </div>
            )}

            {/* The 2 Role Cards */}
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {/* CARD 1: APRENDIZ */}
              <div className="group relative bg-white dark:bg-slate-900 rounded-3xl p-8 border-2 border-slate-200/90 dark:border-slate-800 hover:border-emerald-500 dark:hover:border-emerald-500 transition-all duration-200 shadow-sm hover:shadow-xl flex flex-col justify-between">
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <div className="w-14 h-14 rounded-2xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-400 flex items-center justify-center font-bold shadow-xs group-hover:scale-105 transition-transform">
                      <GraduationCap className="w-7 h-7" />
                    </div>
                    <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                      Sin clave requerida
                    </span>
                  </div>

                  <div>
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                      Soy Aprendiz SENA
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      Inducción formativa, retos y certificación oficial
                    </p>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    Ingresa con tus datos de caracterización (Ficha, Documento y Programa). Desarrollarás las 40 horas del plan, resolverás dilemas éticos y obtendrás tu certificado oficial con código de verificación.
                  </p>

                  <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>4 Módulos normativos (Derechos, Deberes, Prohibiciones)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Retos adaptativos de toma de decisiones en campo</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Certificado de inducción digital con QR y firma</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Sincronización automática a la planilla del instructor</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-6 space-y-2">
                  <button
                    onClick={() => setView('aprendiz')}
                    className="w-full py-3.5 px-5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-sm group-hover:shadow-md"
                  >
                    <span>Ingresar como Aprendiz</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-1">
                    {onOpenVideoTutorial && (
                      <button
                        type="button"
                        onClick={onOpenVideoTutorial}
                        className="py-2 px-2.5 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors flex items-center justify-center gap-1.5 border border-slate-200 dark:border-slate-800"
                      >
                        <Play className="w-3.5 h-3.5 text-emerald-600 fill-current" />
                        <span>Video Tutorial</span>
                      </button>
                    )}

                    {onOpenManual && (
                      <button
                        type="button"
                        onClick={onOpenManual}
                        className="py-2 px-2.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 rounded-xl transition-colors flex items-center justify-center gap-1.5 border border-emerald-200 dark:border-emerald-800/80"
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>Instructivo</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* CARD 2: INSTRUCTOR / DISPUTADOR */}
              <div className="group relative bg-white dark:bg-slate-900 rounded-3xl p-8 border-2 border-slate-200/90 dark:border-slate-800 hover:border-amber-500 dark:hover:border-amber-500 transition-all duration-200 shadow-sm hover:shadow-xl flex flex-col justify-between">
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <div className="w-14 h-14 rounded-2xl bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-400 flex items-center justify-center font-bold shadow-xs group-hover:scale-105 transition-transform">
                      <ShieldCheck className="w-7 h-7" />
                    </div>
                    <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800 flex items-center gap-1">
                      <Lock className="w-3 h-3 text-amber-600" />
                      <span>Clave institucional</span>
                    </span>
                  </div>

                  <div>
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                      Soy Instructor / Dinamizador
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      Control de Ficha, Planilla y Sincronización
                    </p>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    Panel exclusivo de gestión para instructores. Consulta la planilla de aprendices en tiempo real, supervisa notas y aprobaciones, sincroniza con Google Sheets y comparte el enlace de inducción.
                  </p>

                  <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                      <span>Planilla consolidada de la Ficha en vivo</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                      <span>Conexión y sincronización automática con Google Sheets</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                      <span>Generación y copia del enlace directo para aprendices</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                      <span>Requiere clave institucional autorizada</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-6">
                  <button
                    onClick={() => setView('instructor')}
                    className="w-full py-3.5 px-5 bg-slate-900 dark:bg-amber-600 hover:bg-slate-800 dark:hover:bg-amber-700 text-white font-bold rounded-2xl text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-sm group-hover:shadow-md"
                  >
                    <span>Ingresar como Instructor</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* INSTRUCTOR LOGIN VIEW */}
        {view === 'instructor' && (
          <div className="max-w-md mx-auto w-full bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6 animate-in fade-in duration-200">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 flex items-center justify-center">
                <Lock className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                  Ingreso de Instructor
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Panel de Planilla y Sincronización de Ficha
                </p>
              </div>
            </div>

            <form onSubmit={handleInstructorSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Clave de Acceso Institucional:
                </label>
                <input
                  type="password"
                  autoFocus
                  required
                  value={instructorPin}
                  onChange={(e) => {
                    setInstructorPin(e.target.value);
                    if (instructorError) setInstructorError(false);
                  }}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono-num text-center tracking-widest text-base focus:outline-hidden focus:ring-2 focus:ring-amber-500/30"
                />
                <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1.5 text-center">
                  Acceso restringido únicamente para personal docente y administrativo
                </div>
              </div>

              {instructorError && (
                <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/60 text-rose-800 dark:text-rose-200 border border-rose-200 dark:border-rose-800 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>Clave incorrecta. Por favor verifica tus credenciales institucionales.</span>
                </div>
              )}

              <div className="pt-2 flex flex-col sm:flex-row gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setInstructorError(false);
                    setInstructorPin('');
                    setView('select');
                  }}
                  className="w-full sm:w-1/3 py-2.5 px-4 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-semibold transition-colors"
                >
                  Volver
                </button>
                <button
                  type="submit"
                  className="w-full sm:w-2/3 py-2.5 px-4 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold transition-colors shadow-sm flex items-center justify-center gap-1.5"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Acceder como Instructor</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* APRENDIZ CARACTERIZACION VIEW */}
        {view === 'aprendiz' && (
          <div className="max-w-2xl mx-auto w-full bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6 animate-in fade-in duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 flex items-center justify-center">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                    Caracterización del Aprendiz SENA
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Ingresa tus datos para registrar tu inducción y generar tu certificado oficial (sin clave).
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setView('select')}
                className="text-xs text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 underline font-medium"
              >
                Volver
              </button>
            </div>

            {/* Existing learner banner if recognized */}
            {existingLearnerFound && (
              <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-900 dark:text-emerald-200 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <UserCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                  <div>
                    <span className="font-bold">¡Hola de nuevo, {existingLearnerFound.name}!</span>
                    <div className="text-[11px] text-emerald-800 dark:text-emerald-300">
                      Encontramos tu registro en la Ficha {existingLearnerFound.groupCode}. Tu progreso previo se cargará automáticamente.
                    </div>
                  </div>
                </div>
                <span className="shrink-0 font-mono-num font-bold text-xs bg-emerald-200/80 dark:bg-emerald-900/60 px-2.5 py-1 rounded-lg">
                  {existingLearnerFound.completedModulesCount}/4 Módulos
                </span>
              </div>
            )}

            <form onSubmit={handleLearnerSubmit} className="space-y-4 text-xs">
              {/* Row 1: Document */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Tipo de Documento *
                  </label>
                  <select
                    value={documentType}
                    onChange={(e) => setDocumentType(e.target.value as any)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-emerald-500/30"
                  >
                    <option value="C.C.">Cédula de Ciudadanía (C.C.)</option>
                    <option value="T.I.">Tarjeta de Identidad (T.I.)</option>
                    <option value="C.E.">Cédula de Extranjería (C.E.)</option>
                    <option value="PEP">Permiso Especial (PEP)</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Número de Documento *
                  </label>
                  <input
                    type="text"
                    required
                    value={documentNumber}
                    onChange={(e) => setDocumentNumber(e.target.value)}
                    placeholder="Ej. 1020493821"
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-mono-num focus:ring-2 focus:ring-emerald-500/30"
                  />
                </div>
              </div>

              {/* Row 2: Full Name */}
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Nombres y Apellidos Completos *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ej. Valentina Gómez Martínez"
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-emerald-500/30"
                />
              </div>

              {/* Row 3: Program & Ficha */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Programa de Formación *
                  </label>
                  <input
                    type="text"
                    required
                    value={trainingProgram}
                    onChange={(e) => setTrainingProgram(e.target.value)}
                    placeholder="Ej. Análisis y Desarrollo de Software - ADSO"
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-emerald-500/30"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Ficha de Caracterización *
                  </label>
                  <input
                    type="text"
                    required
                    value={groupCode}
                    onChange={(e) => setGroupCode(e.target.value)}
                    placeholder="Ej. 2894120"
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-mono-num focus:ring-2 focus:ring-emerald-500/30"
                  />
                </div>
              </div>

              {/* Row 4: Regional & Centro */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Regional SENA
                  </label>
                  <input
                    type="text"
                    value={regional}
                    onChange={(e) => setRegional(e.target.value)}
                    placeholder="Ej. Regional Distrito Capital"
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-emerald-500/30"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Centro de Formación
                  </label>
                  <input
                    type="text"
                    value={trainingCenter}
                    onChange={(e) => setTrainingCenter(e.target.value)}
                    placeholder="Ej. Centro de Gestión de Mercados, Tecnologías y TI"
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-emerald-500/30"
                  />
                </div>
              </div>

              {/* Row 5: Email */}
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Correo Electrónico (MiSENA o personal)
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Ej. valentina.gomez@soy.sena.edu.co"
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-emerald-500/30"
                />
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-100 dark:border-slate-800">
                <span className="text-[11px] text-slate-500 dark:text-slate-400">
                  🔒 Tus datos son confidenciales y se registrarán en la planilla de inducción de tu instructor.
                </span>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={() => setView('select')}
                    className="w-full sm:w-auto px-4 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-semibold transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-colors shadow-sm flex items-center justify-center gap-1.5"
                  >
                    <span>Comenzar mi Inducción</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 py-6 text-xs text-slate-500 dark:text-slate-400 text-center">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>Servicio Nacional de Aprendizaje — SENA · Dirección de Formación Profesional</span>
          <span>Reglamento del Aprendiz (Acuerdo 009 de 2024)</span>
        </div>
      </footer>
    </div>
  );
};
