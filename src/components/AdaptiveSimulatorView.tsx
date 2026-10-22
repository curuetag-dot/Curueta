import React, { useState } from 'react';
import {
  CheckCircle,
  Lightbulb,
  RotateCcw,
  Scale,
  Sparkles,
  XCircle,
  ArrowRight,
} from 'lucide-react';
import { SimulationCase } from '../types/induction';

interface AdaptiveSimulatorViewProps {
  cases: SimulationCase[];
  resolvedCaseIds: string[];
  onResolveCase: (caseId: string, earnedXp: number) => void;
  onGoToQuiz: () => void;
}

export const AdaptiveSimulatorView: React.FC<AdaptiveSimulatorViewProps> = ({
  cases,
  resolvedCaseIds,
  onResolveCase,
  onGoToQuiz,
}) => {
  const [activeCaseIndex, setActiveCaseIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const activeCase = cases[activeCaseIndex];
  const isResolved = resolvedCaseIds.includes(activeCase.id);

  const handleSelectOption = (optId: string) => {
    if (hasSubmitted) return;
    setSelectedOptionId(optId);
  };

  const handleSubmitDecision = () => {
    if (!selectedOptionId) return;
    setHasSubmitted(true);
    const chosenOption = activeCase.options.find((o) => o.id === selectedOptionId);
    if (chosenOption && chosenOption.isCorrect) {
      onResolveCase(activeCase.id, chosenOption.xpDelta);
    }
  };

  const handleResetCurrentCase = () => {
    setSelectedOptionId(null);
    setHasSubmitted(false);
    setShowHint(false);
  };

  const handleNextCase = () => {
    if (activeCaseIndex < cases.length - 1) {
      setActiveCaseIndex(activeCaseIndex + 1);
      setSelectedOptionId(null);
      setHasSubmitted(false);
      setShowHint(false);
    }
  };

  const chosenOption = activeCase.options.find((o) => o.id === selectedOptionId);

  return (
    <div className="space-y-8">
      {/* Header Info */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-2">
            <span>Simulador de Casos Cotidianos</span>
            <span aria-hidden="true">·</span>
            <span>Toma de Decisiones Éticas</span>
            <span aria-hidden="true">·</span>
            <span>Retos Adaptativos</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Retos Adaptativos: Dilemas del Aprendiz en el SENA
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base mt-1.5 max-w-3xl">
            Enfrenta situaciones auténticas de convivencia, inasistencias, plagio, seguridad laboral y comités disciplinarios. 
            Elige la respuesta conforme al Reglamento para ganar experiencia y desbloquear tu certificación.
          </p>
        </div>

        <div className="text-xs text-slate-500 dark:text-slate-400 font-mono-num bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-3 py-2 rounded-lg shrink-0">
          Casos Superados: <span className="font-bold text-emerald-700 dark:text-emerald-400">{resolvedCaseIds.length}/{cases.length}</span>
        </div>
      </div>

      {/* Case Navigator Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
        {cases.map((c, idx) => {
          const isCurrent = idx === activeCaseIndex;
          const isDone = resolvedCaseIds.includes(c.id);
          return (
            <button
              key={c.id}
              onClick={() => {
                setActiveCaseIndex(idx);
                setSelectedOptionId(null);
                setHasSubmitted(false);
                setShowHint(false);
              }}
              className={`p-3 rounded-xl border text-left transition-all ${
                isCurrent
                  ? 'bg-slate-900 dark:bg-emerald-700 text-white border-slate-900 dark:border-emerald-700 shadow-sm'
                  : isDone
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100 dark:hover:bg-emerald-900/50'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              <div className="flex items-center justify-between text-[11px] mb-1">
                <span className="font-mono-num">Reto 0{idx + 1}</span>
                {isDone ? (
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                ) : (
                  <span className="text-[10px] opacity-70">{c.difficulty}</span>
                )}
              </div>
              <div className="text-xs font-semibold truncate">{c.title}</div>
            </button>
          );
        })}
      </div>

      {/* Main Dilemma Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Case Scenario */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-slate-100 dark:border-slate-800 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-emerald-800 dark:text-emerald-400">{activeCase.category}</span>
              <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">·</span>
              <span className="text-slate-500 dark:text-slate-400 font-mono-num">Nivel {activeCase.difficulty}</span>
            </div>
            <div className="text-slate-400 dark:text-slate-500 font-mono-num text-[11px]">
              {activeCase.character.badgeLabel}
            </div>
          </div>

          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-2">
              {activeCase.title}
            </h3>
            <div className="flex items-center gap-2.5 text-xs text-slate-600 dark:text-slate-400 mt-2">
              <div className="w-7 h-7 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center font-bold text-slate-700 dark:text-slate-300 text-xs shrink-0">
                {activeCase.character.name[0]}
              </div>
              <div>
                <span className="font-semibold text-slate-800 dark:text-slate-200">{activeCase.character.name}</span>
                <span className="text-slate-400 dark:text-slate-500"> — {activeCase.character.role}</span>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            {activeCase.narrative}
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
              El Dilema a Resolver
            </h4>
            <p className="text-slate-900 dark:text-white font-medium text-sm sm:text-base leading-snug">
              {activeCase.dilemma}
            </p>
          </div>

          <div className="pt-2">
            {!showHint ? (
              <button
                onClick={() => setShowHint(true)}
                className="inline-flex items-center gap-1.5 text-xs text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 font-semibold"
              >
                <Lightbulb className="w-4 h-4" />
                <span>¿Necesitas una pista reglamentaria?</span>
              </button>
            ) : (
              <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 text-xs text-amber-900 dark:text-amber-300 space-y-1">
                <div className="font-semibold flex items-center gap-1.5">
                  <Lightbulb className="w-3.5 h-3.5" />
                  <span>Pista Normativa Adaptativa</span>
                </div>
                <p className="text-amber-800 dark:text-amber-200 leading-relaxed">{activeCase.hint}</p>
                <div className="text-[11px] text-amber-700 dark:text-amber-400 font-mono-num pt-1">
                  Base legal: {activeCase.regulationBasis}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right: Decision Deck */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
            <h4 className="text-sm font-semibold text-slate-900 dark:text-white flex items-center gap-2">
              <Scale className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Opciones de Acción Formativa</span>
            </h4>

            <div className="space-y-2.5">
              {activeCase.options.map((opt) => {
                const isSelected = selectedOptionId === opt.id;
                let optStyle = 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300';

                if (hasSubmitted) {
                  if (opt.isCorrect) {
                    optStyle = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-900 dark:text-emerald-200 font-medium ring-1 ring-emerald-500';
                  } else if (isSelected && !opt.isCorrect) {
                    optStyle = 'border-rose-400 bg-rose-50 dark:bg-rose-950/50 text-rose-900 dark:text-rose-200';
                  } else {
                    optStyle = 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 opacity-50 text-slate-400';
                  }
                } else if (isSelected) {
                  optStyle = 'border-slate-900 dark:border-emerald-500 bg-slate-900 dark:bg-emerald-700 text-white font-medium';
                }

                return (
                  <button
                    key={opt.id}
                    onClick={() => handleSelectOption(opt.id)}
                    disabled={hasSubmitted}
                    className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm leading-relaxed transition-all ${optStyle}`}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>

            <div className="pt-2 flex items-center gap-3">
              {!hasSubmitted ? (
                <button
                  onClick={handleSubmitDecision}
                  disabled={!selectedOptionId}
                  className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-200 dark:disabled:bg-slate-800 disabled:text-slate-400 dark:disabled:text-slate-600 text-white text-xs font-semibold rounded-xl transition-colors shadow-sm"
                >
                  Confirmar Decisión
                </button>
              ) : (
                <div className="w-full flex items-center gap-2">
                  <button
                    onClick={handleResetCurrentCase}
                    className="py-2.5 px-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-medium rounded-xl transition-colors flex items-center gap-1.5"
                    title="Reiniciar este caso"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reintentar</span>
                  </button>

                  {activeCaseIndex < cases.length - 1 ? (
                    <button
                      onClick={handleNextCase}
                      className="flex-1 py-2.5 px-4 bg-slate-900 dark:bg-emerald-700 hover:bg-slate-800 dark:hover:bg-emerald-600 text-white text-xs font-semibold rounded-xl transition-colors flex items-center justify-center gap-1.5"
                    >
                      <span>Siguiente Reto</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <button
                      onClick={onGoToQuiz}
                      className="flex-1 py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                    >
                      <span>Ir a la Evaluación Final</span>
                      <Sparkles className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>

          {hasSubmitted && chosenOption && (
            <div
              className={`p-5 rounded-2xl border text-xs space-y-3 ${
                chosenOption.isCorrect
                  ? 'bg-emerald-50/90 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200'
                  : 'bg-rose-50/90 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800 text-rose-900 dark:text-rose-200'
              }`}
            >
              <div className="flex items-center gap-2 font-bold text-sm">
                {chosenOption.isCorrect ? (
                  <>
                    <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span>Decisión Correcta (+{chosenOption.xpDelta} XP)</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0" />
                    <span>Decisión Incorrecta o No Conforme</span>
                  </>
                )}
              </div>

              <p className="leading-relaxed">{chosenOption.feedback}</p>

              <div className="pt-2 border-t border-slate-200/50 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2 text-[11px]">
                <span className="font-semibold">Consecuencia institucional:</span>
                <span>{chosenOption.consequenceSummary}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
