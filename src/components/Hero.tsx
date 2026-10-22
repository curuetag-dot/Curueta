import React, { useState } from 'react';
import { ArrowRight, BookOpen, Award, CheckCircle, ShieldCheck, Clock } from 'lucide-react';
import { ApprenticeProfile } from '../types/induction';

interface HeroProps {
  apprentice: ApprenticeProfile;
  totalModules: number;
  completedModulesCount: number;
  totalCases: number;
  completedCasesCount: number;
  quizScore: number | null;
  totalXp: number;
  onStartLearning: () => void;
  onGoToQuiz: () => void;
  onViewCertificate: () => void;
  onOpenManual?: () => void;
  isCertified: boolean;
}

export const Hero: React.FC<HeroProps> = ({
  apprentice,
  totalModules,
  completedModulesCount,
  totalCases,
  completedCasesCount,
  quizScore,
  totalXp,
  onStartLearning,
  onGoToQuiz,
  onViewCertificate,
  onOpenManual,
  isCertified,
}) => {
  const [imgError, setImgError] = useState(false);
  const totalSteps = totalModules + totalCases + 1; // +1 for quiz
  const completedSteps = completedModulesCount + completedCasesCount + (quizScore !== null ? 1 : 0);
  const overallProgress = Math.round((completedSteps / totalSteps) * 100);

  return (
    <section className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 transition-colors">
      <div className="max-w-7xl mx-auto px-6 py-10 lg:py-14">
        {/* Top Kicker - Unboxed quiet metadata */}
        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-4">
          <span className="font-semibold text-emerald-800 dark:text-emerald-400">SENA Colombia</span>
          <span aria-hidden="true">·</span>
          <span>Formación Profesional Integral</span>
          <span aria-hidden="true">·</span>
          <span>Acuerdo 009 de 2024</span>
          <span aria-hidden="true">·</span>
          <span>40 Horas Lectivas</span>
        </div>

        {/* 2-Column Split: Headline + Actions & Real Visual Asset */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-7">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-white leading-[1.15] text-balance mb-4">
              Ruta Integral de Inducción & Apropiación del Reglamento
            </h1>

            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mb-6">
              Bienvenido, <span className="font-semibold text-slate-900 dark:text-white">{apprentice.name}</span>. 
              Conoce tus derechos formativos, compromisos y deberes cívicos, resuelve dilemas reales en simuladores adaptativos 
              y genera tu <span className="font-semibold text-slate-900 dark:text-white">Certificado Oficial de Inducción SENA</span> para la Ficha {apprentice.groupCode}.
            </p>

            {/* Action Bar */}
            <div className="flex flex-wrap items-center gap-3.5 mb-8">
              <button
                onClick={onStartLearning}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm rounded-lg transition-colors shadow-sm"
              >
                <span>Explorar Módulos Normativos</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onGoToQuiz}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-medium text-sm rounded-lg transition-colors border border-transparent dark:border-slate-700"
              >
                <Award className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
                <span>Presentar Evaluación</span>
              </button>

              {isCertified && (
                <button
                  onClick={onViewCertificate}
                  className="inline-flex items-center gap-2 px-4 py-2.5 border border-emerald-600 dark:border-emerald-500 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 font-semibold text-sm rounded-lg transition-colors"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Ver Certificado</span>
                </button>
              )}

              {onOpenManual && (
                <button
                  onClick={onOpenManual}
                  className="inline-flex items-center gap-2 px-3.5 py-2.5 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium text-sm rounded-lg transition-colors"
                >
                  <BookOpen className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>Instructivo</span>
                </button>
              )}
            </div>

            {/* Learner Info Card */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 text-xs text-slate-600 dark:text-slate-400 grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div>
                <div className="text-slate-400 dark:text-slate-500 font-medium mb-0.5">Programa</div>
                <div className="font-semibold text-slate-800 dark:text-slate-200 truncate" title={apprentice.trainingProgram}>
                  {apprentice.trainingProgram}
                </div>
              </div>
              <div>
                <div className="text-slate-400 dark:text-slate-500 font-medium mb-0.5">Ficha / Grupo</div>
                <div className="font-semibold font-mono-num text-slate-800 dark:text-slate-200">{apprentice.groupCode}</div>
              </div>
              <div>
                <div className="text-slate-400 dark:text-slate-500 font-medium mb-0.5">Regional</div>
                <div className="font-semibold text-slate-800 dark:text-slate-200 truncate" title={apprentice.regional}>
                  {apprentice.regional}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual with Fallback */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 shadow-sm aspect-[16/10] sm:aspect-[16/9] lg:aspect-auto lg:h-[340px]">
              {!imgError ? (
                <img
                  src="/src/assets/images/hero_sena_learning_1792526624966.jpg"
                  alt="Aprendices del SENA en ambiente de formación tecnológica"
                  referrerPolicy="no-referrer"
                  onError={() => setImgError(true)}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-emerald-900 to-slate-900 text-white">
                  <BookOpen className="w-12 h-12 text-emerald-400 mb-2" />
                  <div className="text-lg font-bold">Comunidad Formativa SENA</div>
                  <div className="text-xs text-slate-300 mt-1">Conocimiento, innovación y convivencia ciudadana</div>
                </div>
              )}

              {/* Progress floating indicator */}
              <div className="absolute bottom-3 left-3 right-3 p-3 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm flex items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="font-medium text-slate-700 dark:text-slate-300">Progreso Total de Inducción</span>
                    <span className="font-mono-num font-semibold text-emerald-700 dark:text-emerald-400">{overallProgress}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-600 transition-all duration-300 rounded-full"
                      style={{ width: `${overallProgress}%` }}
                    />
                  </div>
                </div>
                <div className="border-l border-slate-200 dark:border-slate-700 pl-4 text-right shrink-0">
                  <div className="text-[10px] text-slate-400">Puntos XP</div>
                  <div className="font-mono-num font-bold text-slate-800 dark:text-slate-200 text-sm">+{totalXp}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Item Indicator Row Below Hero Split */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-8 border-t border-slate-200 dark:border-slate-800">
          <div className="p-3.5 rounded-lg border border-slate-200 dark:border-slate-700/80 bg-white dark:bg-slate-800/80">
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-1">
              <BookOpen className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Módulos Normativos</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold font-mono-num text-slate-900 dark:text-white">
                {completedModulesCount}/{totalModules}
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400">apropiados</span>
            </div>
          </div>

          <div className="p-3.5 rounded-lg border border-slate-200 dark:border-slate-700/80 bg-white dark:bg-slate-800/80">
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-1">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Retos Adaptativos</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold font-mono-num text-slate-900 dark:text-white">
                {completedCasesCount}/{totalCases}
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400">resueltos</span>
            </div>
          </div>

          <div className="p-3.5 rounded-lg border border-slate-200 dark:border-slate-700/80 bg-white dark:bg-slate-800/80">
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-1">
              <Clock className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Intensidad Horaria</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold font-mono-num text-slate-900 dark:text-white">40h</span>
              <span className="text-xs text-slate-500 dark:text-slate-400">acreditadas</span>
            </div>
          </div>

          <div className="p-3.5 rounded-lg border border-slate-200 dark:border-slate-700/80 bg-white dark:bg-slate-800/80">
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-1">
              <Award className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Estado del Certificado</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className={`text-base font-bold ${isCertified ? 'text-emerald-700 dark:text-emerald-400' : 'text-slate-600 dark:text-slate-400'}`}>
                {isCertified ? 'Habilitado' : 'Pendiente (80%)'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
