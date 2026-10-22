import React, { useState } from 'react';
import {
  BookOpen,
  CheckCircle2,
  ChevronRight,
  HelpCircle,
  Shield,
  AlertTriangle,
  Award,
  Scale,
  Briefcase,
  Users,
  Check,
} from 'lucide-react';
import { ModuleItem } from '../types/induction';

interface ModulesViewProps {
  modules: ModuleItem[];
  completedModuleIds: string[];
  onCompleteModule: (moduleId: string) => void;
  selectedModuleId?: string;
  onGoToCases: () => void;
}

export const ModulesView: React.FC<ModulesViewProps> = ({
  modules,
  completedModuleIds,
  onCompleteModule,
  selectedModuleId,
  onGoToCases,
}) => {
  const [activeModuleId, setActiveModuleId] = useState<string>(
    selectedModuleId || modules[0].id
  );
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);
  const [hasSubmittedQuiz, setHasSubmittedQuiz] = useState<boolean>(false);
  const [imgError, setImgError] = useState(false);

  const activeModule = modules.find((m) => m.id === activeModuleId) || modules[0];
  const isCompleted = completedModuleIds.includes(activeModule.id);

  const handleSelectModule = (id: string) => {
    setActiveModuleId(id);
    setQuizAnswer(null);
    setHasSubmittedQuiz(false);
  };

  const handleAnswerSubmit = (optionIndex: number) => {
    setQuizAnswer(optionIndex);
    setHasSubmittedQuiz(true);
  };

  return (
    <div className="space-y-8">
      {/* Header Info */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-2">
            <span>Reglamento del Aprendiz SENA</span>
            <span aria-hidden="true">·</span>
            <span>Acuerdo 009 de 2024</span>
            <span aria-hidden="true">·</span>
            <span>Microaprendizaje Normativo</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Módulos Interactivos de Formación y Convivencia
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base mt-1.5 max-w-3xl">
            Apropia de forma clara y didáctica el marco normativo institucional: comprende tus garantías, 
            responsabilidades, faltas y las alternativas de vinculación al sector productivo.
          </p>
        </div>

        <div className="text-xs text-slate-500 dark:text-slate-400 font-mono-num bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-3 py-2 rounded-lg shrink-0">
          Módulos Aprobados: <span className="font-bold text-emerald-700 dark:text-emerald-400">{completedModuleIds.length}/{modules.length}</span>
        </div>
      </div>

      {/* Module Horizontal Tab Bar / Selector */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {modules.map((mod) => {
          const isCurrent = mod.id === activeModule.id;
          const isDone = completedModuleIds.includes(mod.id);
          return (
            <button
              key={mod.id}
              onClick={() => handleSelectModule(mod.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 transition-all border ${
                isCurrent
                  ? 'bg-slate-900 dark:bg-emerald-700 text-white border-slate-900 dark:border-emerald-700 shadow-sm'
                  : isDone
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100 dark:hover:bg-emerald-900/50'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              <span className="font-mono-num">{mod.number}.</span>
              <span className="max-w-[180px] truncate">{mod.title}</span>
              {isDone && <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />}
            </button>
          );
        })}
      </div>

      {/* Main Module Content Deck */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Deep Lesson Content (8 Cols) */}
        <div className="lg:col-span-8 space-y-8">
          {/* Module Banner */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-mono-num font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
                Módulo 0{activeModule.number} · {activeModule.regulationReference}
              </span>
              <span className="text-xs font-mono-num text-slate-500 dark:text-slate-400">+{activeModule.xpReward} XP Recompensa</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white leading-tight">
              {activeModule.title}
            </h3>

            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
              {activeModule.summary}
            </p>
          </div>

          {/* Key Articles Breakdown */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-slate-900 dark:text-white flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Artículos y Disposiciones Clave</span>
            </h4>

            <div className="space-y-3.5">
              {activeModule.keyArticles.map((art, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                    <span className="font-semibold text-emerald-800 dark:text-emerald-400 font-mono-num">{art.article}</span>
                    <span className="text-slate-400 dark:text-slate-500">{art.title}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                    {art.content}
                  </p>
                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-start gap-2 text-xs text-slate-600 dark:text-slate-400">
                    <span className="font-semibold text-slate-800 dark:text-slate-200 shrink-0">Impacto Práctico:</span>
                    <span>{art.keyTakeaway}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Rights list */}
          {activeModule.rights && (
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <h4 className="text-sm font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                <Shield className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Catálogo de Derechos del Aprendiz SENA</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {activeModule.rights.map((r, i) => (
                  <div key={i} className="flex items-start gap-2.5 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <span>{r}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Duties list */}
          {activeModule.duties && (
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <h4 className="text-sm font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                <Users className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Deberes y Compromisos de Convivencia</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {activeModule.duties.map((d, i) => (
                  <div key={i} className="flex items-start gap-2.5 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <span>{d}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Prohibitions */}
          {activeModule.prohibitions && (
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <h4 className="text-sm font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                <span>Prohibiciones y Consecuencias Disciplinarias</span>
              </h4>
              <div className="divide-y divide-slate-100 dark:divide-slate-800 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
                {activeModule.prohibitions.map((p, i) => (
                  <div key={i} className="p-4 bg-white dark:bg-slate-900 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                    <div className="space-y-1">
                      <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase">{p.category}</div>
                      <div className="text-slate-800 dark:text-slate-200 font-medium">{p.rule}</div>
                    </div>
                    <div className="text-slate-600 dark:text-amber-200 bg-amber-50 dark:bg-amber-950/40 px-3 py-1.5 rounded-lg border border-amber-200/60 dark:border-amber-900/60 shrink-0">
                      {p.impact}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Due process */}
          {activeModule.dueProcessSteps && (
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <h4 className="text-sm font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                <Scale className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Ruta del Debido Proceso Sancionatorio</span>
              </h4>
              <div className="space-y-3">
                {activeModule.dueProcessSteps.map((step) => (
                  <div key={step.step} className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/50 flex items-start gap-3.5 text-xs">
                    <div className="w-7 h-7 rounded-full bg-slate-900 dark:bg-emerald-600 text-white font-mono-num font-bold flex items-center justify-center shrink-0">
                      {step.step}
                    </div>
                    <div className="space-y-1 flex-1">
                      <div className="font-semibold text-slate-800 dark:text-slate-200 text-sm flex items-center justify-between">
                        <span>{step.title}</span>
                        <span className="text-[11px] font-mono-num text-slate-500 dark:text-slate-400">{step.deadline}</span>
                      </div>
                      <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Practical alternatives */}
          {activeModule.practicalAlternatives && (
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <h4 className="text-sm font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Alternativas Avaladas para la Etapa Práctica</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {activeModule.practicalAlternatives.map((alt, i) => (
                  <div key={i} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
                    <div className="font-semibold text-slate-900 dark:text-white text-sm">{alt.name}</div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{alt.desc}</p>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
                      <span className="font-medium text-slate-700 dark:text-slate-300">Requisito clave:</span> {alt.requirements}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Interactive Quick Check & Progress Actions */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
              <HelpCircle className="w-4 h-4" />
              <span>Comprobación Rápida</span>
            </div>

            <p className="text-sm font-semibold text-slate-900 dark:text-white leading-snug">
              {activeModule.interactiveQuickCheck.question}
            </p>

            <div className="space-y-2">
              {activeModule.interactiveQuickCheck.options.map((opt, optIdx) => {
                const isSelected = quizAnswer === optIdx;
                const isCorrect = optIdx === activeModule.interactiveQuickCheck.answerIndex;
                let btnStyle = 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-850 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300';

                if (hasSubmittedQuiz) {
                  if (isCorrect) {
                    btnStyle = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-900 dark:text-emerald-300 font-medium';
                  } else if (isSelected && !isCorrect) {
                    btnStyle = 'border-rose-400 bg-rose-50 dark:bg-rose-950/50 text-rose-900 dark:text-rose-300';
                  } else {
                    btnStyle = 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 opacity-60 text-slate-500';
                  }
                } else if (isSelected) {
                  btnStyle = 'border-slate-900 dark:border-emerald-500 bg-slate-900 dark:bg-emerald-700 text-white font-medium';
                }

                return (
                  <button
                    key={optIdx}
                    onClick={() => handleAnswerSubmit(optIdx)}
                    disabled={hasSubmittedQuiz}
                    className={`w-full text-left p-3 rounded-xl border text-xs leading-relaxed transition-all ${btnStyle}`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>

            {hasSubmittedQuiz && (
              <div
                className={`p-3.5 rounded-xl text-xs leading-relaxed border ${
                  quizAnswer === activeModule.interactiveQuickCheck.answerIndex
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300'
                    : 'bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-300'
                }`}
              >
                <div className="font-semibold mb-1">
                  {quizAnswer === activeModule.interactiveQuickCheck.answerIndex
                    ? '✓ ¡Respuesta Correcta!'
                    : 'ℹ Fundamento Reglamentario:'}
                </div>
                {activeModule.interactiveQuickCheck.rationale}
              </div>
            )}

            {/* Complete Module Button */}
            <div className="pt-2">
              <button
                onClick={() => onCompleteModule(activeModule.id)}
                className={`w-full py-2.5 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors ${
                  isCompleted
                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                    : 'bg-slate-900 dark:bg-emerald-700 hover:bg-slate-800 dark:hover:bg-emerald-600 text-white'
                }`}
              >
                {isCompleted ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Módulo Aprobado ({activeModule.xpReward} XP)</span>
                  </>
                ) : (
                  <>
                    <Award className="w-4 h-4" />
                    <span>Marcar Módulo como Completado</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Vocational Workshop Visual Card */}
          <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 shadow-sm">
            <div className="h-44 w-full bg-slate-200 dark:bg-slate-800 relative">
              {!imgError ? (
                <img
                  src="/src/assets/images/sena_campus_workshop_1792526626057.jpg"
                  alt="Taller de formación técnica SENA"
                  referrerPolicy="no-referrer"
                  onError={() => setImgError(true)}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-400">
                  <Briefcase className="w-10 h-10" />
                </div>
              )}
            </div>
            <div className="p-4 text-xs space-y-2">
              <div className="font-semibold text-slate-800 dark:text-slate-200">Ambientes de Aprendizaje Real</div>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                El SENA cuenta con más de 117 centros de formación con laboratorios de última generación para formación técnica y tecnológica.
              </p>
              <button
                onClick={onGoToCases}
                className="w-full mt-2 py-2 border border-slate-200 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg font-medium text-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                <span>Probar Casos Reales del Reglamento</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
