import React, { useState } from 'react';
import {
  Printer,
  Copy,
  Check,
  ShieldCheck,
  Award,
} from 'lucide-react';
import { ApprenticeProfile, CertificateData } from '../types/induction';
import { SenaLogo } from './SenaLogo';

interface CertificateViewProps {
  apprentice: ApprenticeProfile;
  certificateData: CertificateData;
  onGoToQuiz: () => void;
  isPassed: boolean;
}

export const CertificateView: React.FC<CertificateViewProps> = ({
  certificateData,
  onGoToQuiz,
  isPassed,
}) => {
  const [copied, setCopied] = useState(false);
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [imgError, setImgError] = useState(false);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(certificateData.verificationCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  if (!isPassed) {
    return (
      <div className="max-w-2xl mx-auto my-12 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 sm:p-10 text-center shadow-sm space-y-6">
        <div className="w-16 h-16 rounded-2xl mx-auto flex items-center justify-center bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800">
          <Award className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
            Certificado Bloqueado
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base max-w-md mx-auto">
            Para expedir tu Certificado Oficial de Inducción SENA, debes completar los módulos normativos y aprobar la evaluación del Reglamento con al menos el 80%.
          </p>
        </div>
        <div>
          <button
            onClick={onGoToQuiz}
            className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-xl transition-colors shadow-sm inline-flex items-center gap-2"
          >
            <span>Ir a Presentar la Evaluación</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Action Header (Hidden in Print) */}
      <div className="no-print flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-1">
            <span className="text-emerald-700 dark:text-emerald-400 font-semibold">Certificación Exitosa</span>
            <span aria-hidden="true">·</span>
            <span>Documento Válido para Registro Académico</span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Certificado Oficial de Inducción SENA
          </h2>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={handleCopyCode}
            className="px-3.5 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5"
            title="Copiar código de verificación"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? '¡Código Copiado!' : 'Copiar Código'}</span>
          </button>

          <button
            onClick={() => setShowVerifyModal(true)}
            className="px-3.5 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Validar</span>
          </button>

          <button
            onClick={handlePrint}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 shadow-sm"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Imprimir / Guardar PDF</span>
          </button>
        </div>
      </div>

      {/* The Printable Official Certificate Frame (Kept as authentic white/parchment with dark container wrap) */}
      <div className="print-certificate-container max-w-4xl mx-auto bg-white border-8 border-double border-emerald-800/80 rounded-2xl p-8 sm:p-12 shadow-xl relative overflow-hidden text-center space-y-6">
        {/* Subtle Watermark Background */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03]">
          <div className="w-[500px] h-[500px] rounded-full border-[40px] border-emerald-950 flex items-center justify-center font-bold text-9xl">
            SENA
          </div>
        </div>

        {/* Certificate Header */}
        <div className="space-y-2 border-b border-emerald-900/15 pb-6">
          <div className="flex items-center justify-center gap-4">
            <div className="w-24 h-24 flex items-center justify-center shrink-0">
              <SenaLogo className="w-full h-full" color="#39a900" />
            </div>
            <div className="text-left">
              <div className="text-xs font-bold text-emerald-900 tracking-wider uppercase">
                Servicio Nacional de Aprendizaje — SENA
              </div>
              <div className="text-[11px] text-slate-600 tracking-tight">
                Dirección de Formación Profesional Integral · Sistema de Gestión de Calidad
              </div>
            </div>
          </div>
          <div className="text-[11px] font-mono-num text-slate-400 uppercase tracking-widest pt-2">
            CONSTANCIA OFICIAL DE APROBACIÓN DE INDUCCIÓN
          </div>
        </div>

        {/* Certificate Title */}
        <div className="space-y-1 pt-2">
          <p className="text-xs font-serif-title italic text-slate-600 text-lg">
            El Centro de Formación y la Coordinación Académica
          </p>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 uppercase tracking-wide">
            CERTIFICAN QUE:
          </div>
        </div>

        {/* Apprentice Name Highlight */}
        <div className="py-2">
          <div className="text-2xl sm:text-4xl font-bold font-serif-title text-emerald-900 underline decoration-emerald-600/40 underline-offset-8">
            {certificateData.apprenticeName}
          </div>
          <div className="text-xs sm:text-sm text-slate-600 font-mono-num mt-2">
            Identificado(a) con {certificateData.documentType} N.º {certificateData.documentNumber}
          </div>
        </div>

        {/* Certificate Body Text */}
        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed max-w-2xl mx-auto">
          Ha cursado, participado activamente y aprobado satisfactoriamente los módulos formativos, 
          casos de simulación y la evaluación diagnóstica de la{' '}
          <strong className="text-slate-900">
            INDUCCIÓN INSTITUCIONAL Y APROPIACIÓN DEL REGLAMENTO DEL APRENDIZ (Acuerdo 009 de 2024)
          </strong>
          , demostrando compromiso ético, conocimiento cabal de sus derechos, deberes y el debido proceso de la comunidad SENA.
        </p>

        {/* Program & Center Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-slate-50/80 p-4 rounded-xl border border-slate-200 text-left">
          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-semibold">Programa de Formación:</span>
            <span className="font-semibold text-slate-800">{certificateData.trainingProgram}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-semibold">Ficha de Caracterización:</span>
            <span className="font-mono-num font-semibold text-slate-800">{certificateData.groupCode}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-semibold">Centro de Formación:</span>
            <span className="text-slate-800">{certificateData.trainingCenter}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-semibold">Regional & Intensidad:</span>
            <span className="text-slate-800">
              {certificateData.regional} · <strong className="font-mono-num">{certificateData.completedHours} Horas</strong> (Calificación: {certificateData.scorePercent}%)
            </span>
          </div>
        </div>

        {/* Seal, Signatures & QR Section */}
        <div className="pt-6 grid grid-cols-1 sm:grid-cols-3 gap-6 items-center border-t border-slate-200">
          {/* Signature 1 */}
          <div className="text-center space-y-1">
            <div className="font-serif-title text-base italic text-slate-800 border-b border-slate-300 pb-1 max-w-[180px] mx-auto">
              Dra. Claudia Montoya V.
            </div>
            <div className="text-[11px] font-semibold text-slate-800">Subdirección de Centro</div>
            <div className="text-[10px] text-slate-400">Servicio Nacional de Aprendizaje</div>
          </div>

          {/* Institutional Badge Seal */}
          <div className="flex flex-col items-center justify-center">
            <div className="w-20 h-20 rounded-full border border-emerald-200 overflow-hidden shadow-sm bg-white p-1">
              {!imgError ? (
                <img
                  src="/src/assets/images/certificate_badge_sena_1792526626617.jpg"
                  alt="Sello Institucional Académico"
                  referrerPolicy="no-referrer"
                  onError={() => setImgError(true)}
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className="w-full h-full rounded-full bg-emerald-700 flex items-center justify-center text-white font-bold text-xs">
                  SENA
                </div>
              )}
            </div>
            <div className="text-[9px] font-mono-num text-slate-400 mt-1 uppercase">Sello de Acreditación</div>
          </div>

          {/* Signature 2 */}
          <div className="text-center space-y-1">
            <div className="font-serif-title text-base italic text-slate-800 border-b border-slate-300 pb-1 max-w-[180px] mx-auto">
              Ing. Javier Morales R.
            </div>
            <div className="text-[11px] font-semibold text-slate-800">Coordinación Académica</div>
            <div className="text-[10px] text-slate-400">Formación Profesional Integral</div>
          </div>
        </div>

        {/* Footer Verification Code */}
        <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between text-[11px] text-slate-500 font-mono-num">
          <div>Expedido: {certificateData.issueDate}</div>
          <div className="font-bold text-emerald-800">
            ID Verificación: {certificateData.verificationCode}
          </div>
          <div>SOFIA Plus · Válido Nacional</div>
        </div>
      </div>

      {/* Verification Simulation Modal */}
      {showVerifyModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 dark:bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                <h3 className="font-bold text-slate-900 dark:text-white text-sm">Validación Pública del Certificado</h3>
              </div>
              <button
                onClick={() => setShowVerifyModal(false)}
                className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 text-sm"
              >
                ✕
              </button>
            </div>

            <div className="p-3.5 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-900 dark:text-emerald-200 space-y-1">
              <div className="font-bold">✓ Documento Auténtico Registrado</div>
              <div>El código {certificateData.verificationCode} corresponde a un aprendiz con inducción aprobada.</div>
            </div>

            <div className="text-xs space-y-2 text-slate-600 dark:text-slate-300">
              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                <span>Aprendiz:</span>
                <span className="font-semibold text-slate-800 dark:text-white">{certificateData.apprenticeName}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                <span>Ficha:</span>
                <span className="font-mono-num font-semibold text-slate-800 dark:text-white">{certificateData.groupCode}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                <span>Norma:</span>
                <span className="font-semibold text-slate-800 dark:text-white">Acuerdo 009 de 2024</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                <span>Horas:</span>
                <span className="font-mono-num font-semibold text-slate-800 dark:text-white">40 Horas de Inducción</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setShowVerifyModal(false)}
                className="w-full py-2.5 bg-slate-900 dark:bg-emerald-700 text-white font-semibold text-xs rounded-xl hover:bg-slate-800 dark:hover:bg-emerald-600 transition-colors"
              >
                Cerrar Validación
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
