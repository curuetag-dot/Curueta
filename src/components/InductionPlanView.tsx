import React, { useState } from 'react';
import { CheckCircle2, ChevronRight, Clock, FileCheck, Sparkles, BookOpen } from 'lucide-react';
import { InductionPlanPhase } from '../types/induction';

interface InductionPlanViewProps {
  planPhases: InductionPlanPhase[];
  onGoToModule: (moduleId: string) => void;
  onGoToSimulator: () => void;
  onGoToQuiz: () => void;
  onOpenManual?: () => void;
}

export const InductionPlanView: React.FC<InductionPlanViewProps> = ({
  planPhases,
  onGoToModule,
  onGoToSimulator,
  onGoToQuiz,
  onOpenManual,
}) => {
  const [activePhaseIndex, setActivePhaseIndex] = useState(0);
  const activePhase = planPhases[activePhaseIndex];

  return (
    <div className="space-y-8">
      {/* Intro Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-2">
            <span>Metodología SENA</span>
            <span aria-hidden="true">·</span>
            <span>Diseño Curricular Institucional</span>
            <span aria-hidden="true">·</span>
            <span>40 Horas de Inducción Integral</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Plan Estructurado de Inducción para Aprendices
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base mt-1.5 max-w-3xl">
            Este plan organiza de manera progresiva los saberes esenciales que todo aprendiz debe dominar durante su primera semana formativa, articulando derechos, deberes y el régimen disciplinario.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 shrink-0">
          {onOpenManual && (
            <button
              onClick={onOpenManual}
              className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-colors"
            >
              <BookOpen className="w-4 h-4" />
              <span>Instructivo del Aprendiz</span>
            </button>
          )}
          <div className="px-3 py-2 bg-slate-100 dark:bg-slate-800 border border-transparent dark:border-slate-700 rounded-lg text-xs font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
            <Clock className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>5 Fases Pedagógicas</span>
          </div>
        </div>
      </div>

      {/* Main 2-Zone Sandbox: Stage & Phase Navigator */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Phase Selector List (4 cols) */}
        <div className="lg:col-span-4 space-y-2.5">
          <div className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider px-1">
            Fases del Cronograma
          </div>
          {planPhases.map((phase, idx) => {
            const isSelected = idx === activePhaseIndex;
            return (
              <button
                key={phase.phaseNumber}
                onClick={() => setActivePhaseIndex(idx)}
                className={`w-full text-left p-4 rounded-xl border transition-all ${
                  isSelected
                    ? 'bg-white dark:bg-slate-900 border-emerald-600 dark:border-emerald-500 shadow-sm ring-1 ring-emerald-600/20 dark:ring-emerald-500/30'
                    : 'bg-white dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-50/70 dark:hover:bg-slate-800/50'
                }`}
              >
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span
                    className={`font-mono-num font-semibold ${
                      isSelected ? 'text-emerald-700 dark:text-emerald-400' : 'text-slate-400 dark:text-slate-500'
                    }`}
                  >
                    Fase 0{phase.phaseNumber}
                  </span>
                  <span className="font-mono-num text-slate-500 dark:text-slate-400">{phase.durationHours} horas</span>
                </div>
                <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 leading-snug line-clamp-2">
                  {phase.title}
                </h3>
              </button>
            );
          })}

          {/* Quick Action Box */}
          <div className="p-4 rounded-xl bg-slate-100/80 dark:bg-slate-850 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300 space-y-3 mt-6">
            <div className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Ruta de Aprendizaje Gamificada</span>
            </div>
            <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
              Cada fase se articula con módulos interactivos, simulación de casos de estudio y un examen final que habilita la emisión del certificado oficial.
            </p>
            <div className="pt-1 flex gap-2">
              <button
                onClick={onGoToSimulator}
                className="w-full py-2 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 font-medium text-slate-800 dark:text-slate-200 rounded-lg transition-colors text-center"
              >
                Simular Casos
              </button>
              <button
                onClick={onGoToQuiz}
                className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-colors text-center shadow-sm"
              >
                Evaluación
              </button>
            </div>
          </div>
        </div>

        {/* Right Detail Stage (8 cols) */}
        <div className="lg:col-span-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm space-y-7 transition-colors">
          {/* Header of Active Phase */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-slate-100 dark:border-slate-800">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono-num text-emerald-700 dark:text-emerald-400 font-semibold mb-1">
                <span>Fase 0{activePhase.phaseNumber} de 05</span>
                <span aria-hidden="true">·</span>
                <span>Intensidad: {activePhase.durationHours} Horas</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white leading-tight">
                {activePhase.title}
              </h3>
            </div>

            <button
              onClick={() => onGoToModule(`mod-${activePhase.phaseNumber}`)}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg transition-colors shrink-0 shadow-sm"
            >
              <span>Ver Módulo 0{activePhase.phaseNumber}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Phase Objective */}
          <div>
            <h4 className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">
              Objetivo de la Fase
            </h4>
            <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
              {activePhase.objective}
            </p>
          </div>

          {/* Competencies */}
          <div>
            <h4 className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-3">
              Competencias y Resultados Esperados
            </h4>
            <div className="space-y-2.5">
              {activePhase.competencies.map((comp, i) => (
                <div key={i} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <span>{comp}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Planned Activities & Deliverables */}
          <div>
            <h4 className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-3">
              Actividades y Evidencias Formativas
            </h4>
            <div className="divide-y divide-slate-100 dark:divide-slate-800 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
              {activePhase.activities.map((act, idx) => (
                <div key={idx} className="p-4 bg-white dark:bg-slate-900 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div className="space-y-1">
                    <div className="font-semibold text-slate-800 dark:text-slate-200 text-sm">{act.name}</div>
                    <div className="text-slate-500 dark:text-slate-400">
                      <span className="font-medium text-slate-700 dark:text-slate-300">Evidencia esperada:</span> {act.deliverable}
                    </div>
                  </div>
                  <div className="text-slate-500 dark:text-slate-400 font-mono-num font-medium bg-slate-50 dark:bg-slate-800 px-2.5 py-1 rounded border border-slate-200 dark:border-slate-700 shrink-0 self-start sm:self-center">
                    {act.duration}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer note */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-1.5">
              <FileCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Conforme al Acuerdo 009 de 2024 de la Dirección General del SENA</span>
            </div>
            <div className="font-mono-num">Registro en SOFIA Plus</div>
          </div>
        </div>
      </div>
    </div>
  );
};
