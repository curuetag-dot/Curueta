import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Award,
  CheckCircle2,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  XCircle,
  ArrowRight,
  BookOpen,
} from 'lucide-react';
import { QuizQuestion } from '../types/induction';

interface GamifiedQuizViewProps {
  questions: QuizQuestion[];
  savedScore: number | null;
  onSaveQuizResult: (scorePercent: number, correctCount: number) => void;
  onViewCertificate: () => void;
}

export const GamifiedQuizView: React.FC<GamifiedQuizViewProps> = ({
  questions,
  savedScore,
  onSaveQuizResult,
  onViewCertificate,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [isCompleted, setIsCompleted] = useState<boolean>(savedScore !== null);
  const [finalScore, setFinalScore] = useState<number | null>(savedScore);

  const currentQ = questions[currentIndex];
  const selectedAnswer = userAnswers[currentIndex];
  const hasAnsweredCurrent = selectedAnswer !== undefined;

  const handleSelectAnswer = (optionIdx: number) => {
    if (isCompleted) return;
    setUserAnswers((prev) => ({
      ...prev,
      [currentIndex]: optionIdx,
    }));
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      let correct = 0;
      questions.forEach((q, idx) => {
        if (userAnswers[idx] === q.correctIndex) {
          correct += 1;
        }
      });
      const percent = Math.round((correct / questions.length) * 100);
      setFinalScore(percent);
      setIsCompleted(true);
      onSaveQuizResult(percent, correct);

      if (percent >= 80) {
        confetti({
          particleCount: 120,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#059669', '#10B981', '#34D399', '#FBBF24'],
        });
      }
    }
  };

  const handleRestartQuiz = () => {
    setUserAnswers({});
    setCurrentIndex(0);
    setIsCompleted(false);
    setFinalScore(null);
  };

  if (isCompleted && finalScore !== null) {
    const isPassed = finalScore >= 80;
    let correctCount = 0;
    questions.forEach((q, idx) => {
      if (userAnswers[idx] === q.correctIndex) correctCount += 1;
    });

    return (
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Result Showcase Card */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 sm:p-10 text-center shadow-sm space-y-6">
          <div className="w-16 h-16 rounded-2xl mx-auto flex items-center justify-center bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
            {isPassed ? <Award className="w-8 h-8" /> : <ShieldCheck className="w-8 h-8 text-amber-600 dark:text-amber-400" />}
          </div>

          <div className="space-y-2">
            <div className="text-xs font-mono-num font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Evaluación del Reglamento del Aprendiz
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
              {isPassed ? '¡Felicitaciones! Has Superado la Inducción' : 'Casi lo logras, refuerza tus conocimientos'}
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base max-w-xl mx-auto">
              {isPassed
                ? 'Has demostrado un dominio ejemplar del Reglamento del Aprendiz (Acuerdo 009 de 2024), tus derechos, deberes y el debido proceso.'
                : 'Se requiere un mínimo de 80% para desbloquear la certificación. Puedes revisar los fundamentos de cada pregunta y reintentar.'}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-lg mx-auto py-2">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
              <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">Puntaje Final</div>
              <div className="text-2xl font-bold font-mono-num text-emerald-700 dark:text-emerald-400">{finalScore}%</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
              <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">Aciertos</div>
              <div className="text-2xl font-bold font-mono-num text-slate-900 dark:text-white">
                {correctCount}/{questions.length}
              </div>
            </div>
            <div className="col-span-2 sm:col-span-1 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
              <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">Certificación</div>
              <div className="text-base font-bold text-emerald-800 dark:text-emerald-400">
                {isPassed ? 'Aprobada' : 'No Aprobada'}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            {isPassed && (
              <button
                onClick={onViewCertificate}
                className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm rounded-xl transition-all shadow-sm flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Generar Certificado Oficial</span>
              </button>
            )}

            <button
              onClick={handleRestartQuiz}
              className="px-5 py-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium text-sm rounded-xl transition-colors flex items-center gap-2 border border-transparent dark:border-slate-700"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Presentar Evaluación Nuevamente</span>
            </button>
          </div>
        </div>

        {/* Detailed Question Review List */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <span>Revisión Detallada de Preguntas</span>
          </h3>

          <div className="space-y-4">
            {questions.map((q, idx) => {
              const userAns = userAnswers[idx];
              const isCorrect = userAns === q.correctIndex;
              return (
                <div
                  key={q.id}
                  className={`p-6 rounded-2xl bg-white dark:bg-slate-900 border shadow-sm space-y-3 ${
                    isCorrect
                      ? 'border-emerald-200 dark:border-emerald-800/80'
                      : 'border-rose-200 dark:border-rose-800/80'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono-num font-semibold text-slate-500 dark:text-slate-400">
                      Pregunta {idx + 1} de {questions.length} · {q.category}
                    </span>
                    <span
                      className={`font-semibold flex items-center gap-1 ${
                        isCorrect ? 'text-emerald-700 dark:text-emerald-400' : 'text-rose-700 dark:text-rose-400'
                      }`}
                    >
                      {isCorrect ? (
                        <>
                          <CheckCircle2 className="w-4 h-4" /> Correcta
                        </>
                      ) : (
                        <>
                          <XCircle className="w-4 h-4" /> Incorrecta
                        </>
                      )}
                    </span>
                  </div>

                  <p className="text-sm font-semibold text-slate-900 dark:text-white leading-snug">
                    {q.question}
                  </p>

                  <div className="text-xs text-slate-600 dark:text-slate-300 space-y-1 bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
                    <div>
                      <span className="font-medium text-slate-800 dark:text-slate-200">Respuesta correcta: </span>
                      <span className="text-emerald-800 dark:text-emerald-400 font-medium">{q.options[q.correctIndex]}</span>
                    </div>
                    {userAns !== undefined && userAns !== q.correctIndex && (
                      <div>
                        <span className="font-medium text-slate-800 dark:text-slate-200">Tu selección: </span>
                        <span className="text-rose-700 dark:text-rose-400">{q.options[userAns]}</span>
                      </div>
                    )}
                  </div>

                  <div className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed pt-1">
                    <span className="font-medium text-slate-700 dark:text-slate-300">Explicación reglamentaria: </span>
                    {q.explanation} ({q.articleReference})
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Quiz Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-1">
            <span>Evaluación Oficial de Inducción</span>
            <span aria-hidden="true">·</span>
            <span>Reglamento del Aprendiz</span>
            <span aria-hidden="true">·</span>
            <span>Mínimo 80% para aprobar</span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Desafío de Competencias del Aprendiz
          </h2>
        </div>

        <div className="font-mono-num text-xs font-semibold px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 self-start sm:self-center">
          Pregunta {currentIndex + 1} de {questions.length}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
        <div
          className="bg-emerald-600 h-full transition-all duration-300 rounded-full"
          style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
        />
      </div>

      {/* Question Card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <div className="space-y-2">
          <div className="text-xs font-mono-num font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
            {currentQ.category}
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white leading-snug">
            {currentQ.question}
          </h3>
        </div>

        {/* Options */}
        <div className="space-y-3">
          {currentQ.options.map((opt, optIdx) => {
            const isSelected = selectedAnswer === optIdx;
            return (
              <button
                key={optIdx}
                onClick={() => handleSelectAnswer(optIdx)}
                className={`w-full text-left p-4 rounded-xl border text-xs sm:text-sm leading-relaxed transition-all flex items-start gap-3 ${
                  isSelected
                    ? 'border-slate-900 dark:border-emerald-500 bg-slate-900 dark:bg-emerald-700 text-white font-medium shadow-sm'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-850 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                }`}
              >
                <span
                  className={`w-6 h-6 rounded-full flex items-center justify-center font-mono-num text-xs shrink-0 font-semibold ${
                    isSelected ? 'bg-white text-slate-900 dark:text-slate-900' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  {String.fromCharCode(65 + optIdx)}
                </span>
                <span className="flex-1 pt-0.5">{opt}</span>
              </button>
            );
          })}
        </div>

        {/* Controls */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-4">
          <div className="text-xs text-slate-400 dark:text-slate-500">
            {hasAnsweredCurrent ? 'Opción seleccionada' : 'Selecciona una respuesta para continuar'}
          </div>

          <button
            onClick={handleNext}
            disabled={!hasAnsweredCurrent}
            className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-200 dark:disabled:bg-slate-800 disabled:text-slate-400 dark:disabled:text-slate-600 text-white font-semibold text-xs rounded-xl transition-colors flex items-center gap-1.5 shadow-sm"
          >
            <span>{currentIndex < questions.length - 1 ? 'Siguiente Pregunta' : 'Finalizar y Calificar'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
