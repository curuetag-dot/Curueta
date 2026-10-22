import React, { useState } from 'react';
import {
  BookOpen,
  X,
  CheckCircle2,
  FileCheck,
  Award,
  Sparkles,
  ArrowRight,
  Printer,
  Copy,
  Check,
  ShieldCheck,
  GraduationCap,
  Users,
  Compass,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';
import { SenaLogo } from './SenaLogo';
import { Play } from 'lucide-react';

interface InductionManualModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartInduction?: () => void;
  onOpenVideoTutorial?: () => void;
}

export const InductionManualModal: React.FC<InductionManualModalProps> = ({
  isOpen,
  onClose,
  onStartInduction,
  onOpenVideoTutorial,
}) => {
  const [copied, setCopied] = useState(false);
  const [activeSection, setActiveSection] = useState<'pasos' | 'requisitos' | 'faq' | 'normas'>('pasos');

  if (!isOpen) return null;

  const handleCopySummary = () => {
    const summaryText = `MANUAL DE INDUCCIÓN INTEGRAL SENA - PASOS DEL APRENDIZ:
1. Acceso y Caracterización: Ingresar como Aprendiz e ingresar datos de ficha y documento.
2. Exploración del Plan: Revisar las 5 fases pedagógicas de 40 horas.
3. Módulos Temáticos: Apropiar los 5 módulos interactivos sobre el Reglamento del Aprendiz.
4. Retos y Casos: Resolver dilemas prácticos en el simulador adaptativo.
5. Evaluación Integral: Superar el cuestionario final con puntaje mínimo del 80%.
6. Certificación: Descargar el Certificado Oficial con código QR y serial único institucional.
Todo el avance se registra de manera automática en la planilla del instructor.`;
    navigator.clipboard.writeText(summaryText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 dark:bg-black/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 dark:border-slate-800 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center p-1.5 shrink-0">
              <SenaLogo className="w-full h-full" color="#39a900" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono-num font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                  Instructivo Oficial para Aprendices
                </span>
                <span className="text-[10px] bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 font-semibold px-2 py-0.5 rounded-full">
                  40 Horas
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white leading-tight">
                Manual de Inducción Integral SENA
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopySummary}
              title="Copiar resumen de pasos al portapapeles"
              className="p-2 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors text-xs flex items-center gap-1.5"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              <span className="hidden sm:inline font-medium">{copied ? 'Copiado' : 'Copiar Resumen'}</span>
            </button>
            <button
              onClick={handlePrint}
              title="Imprimir instructivo"
              className="p-2 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors text-xs flex items-center gap-1.5"
            >
              <Printer className="w-4 h-4" />
              <span className="hidden sm:inline font-medium">Imprimir</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
              aria-label="Cerrar instructivo"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Section Navigation Tabs */}
        <div className="flex items-center gap-2 px-6 pt-3 pb-2 border-b border-slate-100 dark:border-slate-800 overflow-x-auto text-xs font-semibold shrink-0">
          <button
            onClick={() => setActiveSection('pasos')}
            className={`px-3 py-2 rounded-xl transition-colors flex items-center gap-1.5 whitespace-nowrap ${
              activeSection === 'pasos'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>Ruta Paso a Paso (6 Pasos)</span>
          </button>
          <button
            onClick={() => setActiveSection('requisitos')}
            className={`px-3 py-2 rounded-xl transition-colors flex items-center gap-1.5 whitespace-nowrap ${
              activeSection === 'requisitos'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <FileCheck className="w-4 h-4" />
            <span>Requisitos Previos</span>
          </button>
          <button
            onClick={() => setActiveSection('faq')}
            className={`px-3 py-2 rounded-xl transition-colors flex items-center gap-1.5 whitespace-nowrap ${
              activeSection === 'faq'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>Preguntas Frecuentes</span>
          </button>
          <button
            onClick={() => setActiveSection('normas')}
            className={`px-3 py-2 rounded-xl transition-colors flex items-center gap-1.5 whitespace-nowrap ${
              activeSection === 'normas'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Reglamento y Normativa</span>
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-slate-700 dark:text-slate-300">
          
          {/* TAB 1: RUTA PASO A PASO */}
          {activeSection === 'pasos' && (
            <div className="space-y-6">
              <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/80 flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <p className="font-bold text-emerald-950 dark:text-emerald-200">
                    Proceso de Inducción Autónomo y 100% Sincronizado
                  </p>
                  <p className="text-emerald-800 dark:text-emerald-300/90 mt-1 leading-relaxed">
                    Sigue cada uno de estos 6 pasos ordenados. Todos tus avances (módulos, casos de simulación, notas y estado de aprobación) se sincronizan de forma automática en la planilla del instructor.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {/* Paso 1 */}
                <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-850 hover:border-emerald-300 dark:hover:border-emerald-700 transition-colors">
                  <div className="flex items-start gap-3.5">
                    <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white font-bold text-sm flex items-center justify-center shrink-0">
                      1
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-bold text-slate-900 dark:text-white text-base">
                        Ingreso y Caracterización Inicial (Sin Contraseña)
                      </h4>
                      <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                        En el portal inicial de selección de rol, haz clic en <strong>"Ingresar como Aprendiz"</strong>. Completa tus datos de caracterización: nombre completo, tipo y número de documento, correo institucional (@misena.edu.co), ficha y programa de formación.
                      </p>
                      <div className="text-[11px] font-mono-num text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/50 p-2 rounded-lg border border-emerald-100 dark:border-emerald-900/50">
                        💡 Tu perfil se vincula de inmediato a la planilla de la Ficha. No requieres clave de acceso.
                      </div>
                    </div>
                  </div>
                </div>

                {/* Paso 2 */}
                <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-850 hover:border-emerald-300 dark:hover:border-emerald-700 transition-colors">
                  <div className="flex items-start gap-3.5">
                    <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white font-bold text-sm flex items-center justify-center shrink-0">
                      2
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-bold text-slate-900 dark:text-white text-base">
                        Exploración del Plan Estructurado (40 Horas en 5 Fases)
                      </h4>
                      <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                        En la pestaña <strong>"Plan Estructurado"</strong> podrás revisar la distribución pedagógica de las 40 horas institucionales, organizadas en 5 fases temáticas de 8 horas:
                      </p>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-slate-600 dark:text-slate-400">
                        <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> Fase 1: Contextualización y Mística SENA</li>
                        <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> Fase 2: Derechos Fundamentales del Aprendiz</li>
                        <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> Fase 3: Deberes, Carné, Asistencia y Convivencia</li>
                        <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> Fase 4: Prohibiciones, Faltas y Debido Proceso</li>
                        <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> Fase 5: Etapa Práctica, Evaluación y Certificación</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Paso 3 */}
                <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-850 hover:border-emerald-300 dark:hover:border-emerald-700 transition-colors">
                  <div className="flex items-start gap-3.5">
                    <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white font-bold text-sm flex items-center justify-center shrink-0">
                      3
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-bold text-slate-900 dark:text-white text-base">
                        Estudio de los 5 Módulos Temáticos
                      </h4>
                      <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                        Dirígete a la pestaña <strong>"Módulos"</strong>. Lee atentamente cada módulo interactivo con los artículos oficiales del Reglamento del Aprendiz (Acuerdo 007 de 2012). Al completar cada lectura y responder sus puntos de control, ganarás puntos de experiencia (XP) y se marcará tu progreso.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Paso 4 */}
                <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-850 hover:border-emerald-300 dark:hover:border-emerald-700 transition-colors">
                  <div className="flex items-start gap-3.5">
                    <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white font-bold text-sm flex items-center justify-center shrink-0">
                      4
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-bold text-slate-900 dark:text-white text-base">
                        Resolución de Retos y Casos en el Simulador Adaptativo
                      </h4>
                      <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                        En la pestaña <strong>"Retos & Casos"</strong> te enfrentarás a situaciones reales de la vida formativa (justificación de inasistencias en 3 días hábiles, planes de mejoramiento, comités de evaluación y alternativas de etapa productiva). Toma decisiones basadas en el reglamento para desbloquear insignias y medallas.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Paso 5 */}
                <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-850 hover:border-emerald-300 dark:hover:border-emerald-700 transition-colors">
                  <div className="flex items-start gap-3.5">
                    <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white font-bold text-sm flex items-center justify-center shrink-0">
                      5
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-bold text-slate-900 dark:text-white text-base">
                        Presentación de la Evaluación Integral (Quiz Gamificado)
                      </h4>
                      <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                        En la pestaña <strong>"Evaluación"</strong> presentarás el examen integral sobre el reglamento y la vida institucional. Requiere un puntaje mínimo de <strong>80%</strong> para su aprobación. Si no alcanzas la nota mínima en tu primer intento, puedes reintentarlo con retroalimentación inmediata.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Paso 6 */}
                <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-850 hover:border-emerald-300 dark:hover:border-emerald-700 transition-colors">
                  <div className="flex items-start gap-3.5">
                    <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white font-bold text-sm flex items-center justify-center shrink-0">
                      6
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-bold text-slate-900 dark:text-white text-base">
                        Generación y Descarga del Certificado Oficial
                      </h4>
                      <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                        Al aprobar la evaluación, se desbloqueará la pestaña <strong>"Certificado"</strong>. Podrás visualizar tu Certificado de Inducción Integral SENA con tu nombre, documento, ficha, fecha, código QR y serial institucional único, listo para imprimir o guardar en PDF.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: REQUISITOS PREVIOS */}
          {activeSection === 'requisitos' && (
            <div className="space-y-4">
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                ¿Qué necesitas antes de comenzar la inducción?
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850">
                  <div className="font-semibold text-slate-900 dark:text-white text-xs mb-1">
                    1. Datos de Identificación
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    Documento de identidad válido (Cédula de Ciudadanía, Tarjeta de Identidad, Cédula de Extranjería o Permiso por Protección Temporal).
                  </p>
                </div>
                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850">
                  <div className="font-semibold text-slate-900 dark:text-white text-xs mb-1">
                    2. Información de la Ficha
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    Número de ficha asignado en SOFIA Plus y denominación oficial del programa técnico o tecnológico.
                  </p>
                </div>
                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850">
                  <div className="font-semibold text-slate-900 dark:text-white text-xs mb-1">
                    3. Correo Institucional o Personal
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    Cuenta activa `@misena.edu.co` para recibir notificaciones institucionales y el soporte del certificado.
                  </p>
                </div>
                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850">
                  <div className="font-semibold text-slate-900 dark:text-white text-xs mb-1">
                    4. Dispositivo con Navegador Web
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    Computador de escritorio, portátil o dispositivo móvil con conexión a Internet. No requiere instalar aplicaciones externas.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: PREGUNTAS FRECUENTES (FAQ) */}
          {activeSection === 'faq' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-850">
                <h4 className="font-bold text-xs text-slate-900 dark:text-white mb-1">
                  ¿Tengo que hacer alguna configuración manual para que mi nota le llegue al instructor?
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  No. El prototipo está programado para registrar de manera 100% automática cada módulo que termines, tus respuestas y tu calificación en la planilla consolidada que administra el instructor de la ficha.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-850">
                <h4 className="font-bold text-xs text-slate-900 dark:text-white mb-1">
                  ¿Qué ocurre si repruebo la evaluación con menos del 80%?
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  El sistema te mostrará qué preguntas tuvieron respuestas incorrectas con su respectiva justificación normativa y podrás volver a presentar la prueba para reforzar tus conocimientos hasta obtener la aprobación.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-850">
                <h4 className="font-bold text-xs text-slate-900 dark:text-white mb-1">
                  ¿Cómo corrijo mis datos si cometí un error tipográfico al ingresar?
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Haz clic en el botón con tu nombre en la barra superior del encabezado para abrir la ventana de perfil. Modifica los campos necesarios y guarda los cambios; la planilla se actualizará al instante.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-850">
                <h4 className="font-bold text-xs text-slate-900 dark:text-white mb-1">
                  ¿Qué plazo reglamentario tengo para justificar una inasistencia a clases o talleres?
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  El Reglamento del Aprendiz establece un término improrrogable de <strong>3 días hábiles</strong> posteriores a la inasistencia para radicar el soporte formal (incapacidad médica expedida o validada por EPS/IPS, citación legal o calamidad justificada).
                </p>
              </div>
            </div>
          )}

          {/* TAB 4: NORMAS Y REGLAMENTO */}
          {activeSection === 'normas' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-xs text-amber-900 dark:text-amber-200 space-y-1">
                <div className="font-bold">Marco Normativo Institucional</div>
                <p className="leading-relaxed">
                  Toda la información y los casos del prototipo están respaldados por el <strong>Reglamento del Aprendiz SENA (Acuerdo 007 de 2012)</strong>, así como por las circulares de la Dirección General sobre formación profesional integral.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800">
                  <span className="font-bold block text-slate-900 dark:text-white">Capítulo II</span>
                  <span className="text-slate-600 dark:text-slate-400">Derechos del Aprendiz (Libertades, planes de mejoramiento, garantías)</span>
                </div>
                <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800">
                  <span className="font-bold block text-slate-900 dark:text-white">Capítulo III & IV</span>
                  <span className="text-slate-600 dark:text-slate-400">Deberes, justificación de inasistencias y prohibiciones expresas</span>
                </div>
                <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800">
                  <span className="font-bold block text-slate-900 dark:text-white">Capítulo VII</span>
                  <span className="text-slate-600 dark:text-slate-400">Proceso Sancionatorio: Queja, comité, descargos y reposición</span>
                </div>
                <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800">
                  <span className="font-bold block text-slate-900 dark:text-white">Capítulo V</span>
                  <span className="text-slate-600 dark:text-slate-400">Las 7 alternativas reglamentarias de Etapa Productiva</span>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-6 py-4 bg-slate-50 dark:bg-slate-950/50 border-t border-slate-100 dark:border-slate-800 shrink-0">
          <div className="text-[11px] text-slate-500 dark:text-slate-400">
            Documento disponible también en el archivo <code className="font-mono text-emerald-700 dark:text-emerald-400">MANUAL_DE_INDUCCION.md</code> en la raíz.
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            {onOpenVideoTutorial && (
              <button
                onClick={() => {
                  onClose();
                  onOpenVideoTutorial();
                }}
                className="w-full sm:w-auto px-4 py-2 text-xs font-semibold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 border border-emerald-200 dark:border-emerald-800 rounded-xl transition-colors flex items-center justify-center gap-1.5"
              >
                <Play className="w-3.5 h-3.5 fill-current text-emerald-600 dark:text-emerald-400" />
                <span>Ver Video Tutorial</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-xl transition-colors"
            >
              Cerrar
            </button>
            {onStartInduction && (
              <button
                onClick={() => {
                  onClose();
                  onStartInduction();
                }}
                className="w-full sm:w-auto px-5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-colors flex items-center justify-center gap-1.5 shadow-sm"
              >
                <span>¡Comenzar mi Inducción!</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
