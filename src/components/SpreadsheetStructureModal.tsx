import React, { useState } from 'react';
import {
  FileSpreadsheet,
  Download,
  Copy,
  Check,
  X,
  Table,
  Layers,
  Sparkles,
} from 'lucide-react';
import { ApprenticeProfile, CertificateData } from '../types/induction';

interface SpreadsheetStructureModalProps {
  isOpen: boolean;
  onClose: () => void;
  apprentice: ApprenticeProfile;
  certificateData: CertificateData;
  completedModulesCount: number;
  totalModulesCount: number;
  completedCasesCount: number;
  totalCasesCount: number;
  quizScore: number | null;
  totalXp: number;
  isCertified: boolean;
}

export const SPREADSHEET_COLUMNS = [
  { col: 'A', name: 'FECHA_REGISTRO', type: 'Fecha (AAAA-MM-DD)', desc: 'Fecha en que el aprendiz completó o actualizó la inducción.' },
  { col: 'B', name: 'TIPO_DOCUMENTO', type: 'Texto (CC, TI, CE, PEP)', desc: 'Identificación oficial registrada en SOFIA Plus.' },
  { col: 'C', name: 'NUMERO_DOCUMENTO', type: 'Numérico (Texto sin formato)', desc: 'Número de documento de identidad del aprendiz.' },
  { col: 'D', name: 'NOMBRE_COMPLETO', type: 'Texto', desc: 'Nombres y apellidos completos del aprendiz.' },
  { col: 'E', name: 'CORREO_MISENA', type: 'Email (@misena.edu.co)', desc: 'Correo institucional del aprendiz.' },
  { col: 'F', name: 'PROGRAMA_FORMACION', type: 'Texto', desc: 'Nombre del programa técnico o tecnológico.' },
  { col: 'G', name: 'FICHA_CARACTERIZACION', type: 'Numérico', desc: 'Código de grupo / ficha de formación asignada.' },
  { col: 'H', name: 'CENTRO_FORMACION', type: 'Texto', desc: 'Centro de formación profesional del SENA.' },
  { col: 'I', name: 'REGIONAL', type: 'Texto', desc: 'Regional a la que pertenece el centro.' },
  { col: 'J', name: 'MODULOS_APROBADOS', type: 'Número (0 a 5)', desc: 'Cantidad de módulos normativos completados.' },
  { col: 'K', name: 'RETOS_RESUELTOS', type: 'Número (0 a 5)', desc: 'Casos y dilemas prácticos superados.' },
  { col: 'L', name: 'PUNTAJE_EVALUACION', type: 'Porcentaje (0% - 100%)', desc: 'Calificación obtenida en el examen del Reglamento.' },
  { col: 'M', name: 'PUNTOS_XP', type: 'Numérico', desc: 'Puntaje de gamificación acumulado durante la ruta.' },
  { col: 'N', name: 'ESTADO_INDUCCION', type: 'Texto (APROBADO / EN CURSO)', desc: 'Condición final según cumplimiento (Mínimo 80%).' },
  { col: 'O', name: 'CODIGO_CERTIFICADO', type: 'Texto alfanumérico', desc: 'ID único e irrepetible para validar autenticidad.' },
];

export const SpreadsheetStructureModal: React.FC<SpreadsheetStructureModalProps> = ({
  isOpen,
  onClose,
  apprentice,
  certificateData,
  completedModulesCount,
  totalModulesCount,
  completedCasesCount,
  totalCasesCount,
  quizScore,
  totalXp,
  isCertified,
}) => {
  const [copiedStructure, setCopiedStructure] = useState(false);
  const [activeTab, setActiveTab] = useState<'columns' | 'preview'>('columns');

  if (!isOpen) return null;

  // Prepare CSV Export
  const handleDownloadCsv = () => {
    const headers = SPREADSHEET_COLUMNS.map((c) => c.name).join(';');
    const today = new Date().toISOString().split('T')[0];
    const scoreVal = quizScore !== null ? `${quizScore}%` : 'Pendiente';
    const estado = isCertified ? 'APROBADO' : 'EN CURSO';
    const code = isCertified ? certificateData.verificationCode : 'NO_GENERADO';

    // Current row
    const currentRow = [
      today,
      apprentice.documentType,
      apprentice.documentNumber,
      `"${apprentice.name}"`,
      apprentice.email,
      `"${apprentice.trainingProgram}"`,
      apprentice.groupCode,
      `"${apprentice.trainingCenter}"`,
      `"${apprentice.regional}"`,
      `${completedModulesCount}/${totalModulesCount}`,
      `${completedCasesCount}/${totalCasesCount}`,
      scoreVal,
      totalXp,
      estado,
      code,
    ].join(';');

    // Sample peer rows to simulate a full group / Ficha export for instructors
    const samplePeer1 = [
      today,
      'C.C.',
      '1035987123',
      '"Mateo Alejandro Valencia"',
      'mateo.valencia@misena.edu.co',
      `"${apprentice.trainingProgram}"`,
      apprentice.groupCode,
      `"${apprentice.trainingCenter}"`,
      `"${apprentice.regional}"`,
      '5/5',
      '5/5',
      '90%',
      950,
      'APROBADO',
      `SENA-IND-2026-${apprentice.groupCode.slice(-4)}-7123`,
    ].join(';');

    const samplePeer2 = [
      today,
      'T.I.',
      '1088492014',
      '"Valentina Puentes Herrera"',
      'valentina.puentes@misena.edu.co',
      `"${apprentice.trainingProgram}"`,
      apprentice.groupCode,
      `"${apprentice.trainingCenter}"`,
      `"${apprentice.regional}"`,
      '4/5',
      '3/5',
      '70%',
      620,
      'EN CURSO',
      'PENDIENTE_REINTENTO',
    ].join(';');

    const csvContent =
      '\uFEFF' + [headers, currentRow, samplePeer1, samplePeer2].join('\r\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute(
      'download',
      `Registro_Induccion_SENA_Ficha_${apprentice.groupCode}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCopyHeaderRow = () => {
    const headers = SPREADSHEET_COLUMNS.map((c) => c.name).join('\t');
    navigator.clipboard.writeText(headers);
    setCopiedStructure(true);
    setTimeout(() => setCopiedStructure(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 dark:bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-3xl w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-5 max-h-[88vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-400 flex items-center justify-center">
              <FileSpreadsheet className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                Estructura para Hoja de Cálculo
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Estructura de datos para registrar el seguimiento de aprendices en Google Sheets o Excel
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Segmented Controller Tab Bar */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs font-semibold">
            <button
              onClick={() => setActiveTab('columns')}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                activeTab === 'columns'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Diccionario de Columnas (15 Campos)
            </button>
            <button
              onClick={() => setActiveTab('preview')}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                activeTab === 'preview'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Vista Previa de Filas (Ficha {apprentice.groupCode})
            </button>
          </div>
        </div>

        {/* Content Box */}
        <div className="overflow-y-auto space-y-3 flex-1 pr-1 text-xs">
          {activeTab === 'columns' ? (
            <div className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
              <table className="w-full text-left divide-y divide-slate-200 dark:divide-slate-800">
                <thead className="bg-slate-50 dark:bg-slate-800/60 font-semibold text-slate-700 dark:text-slate-300">
                  <tr>
                    <th className="py-2.5 px-3 w-12 text-center">Col</th>
                    <th className="py-2.5 px-3">Encabezado de Columna</th>
                    <th className="py-2.5 px-3">Tipo de Dato</th>
                    <th className="py-2.5 px-3">Propósito en la Inducción</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-600 dark:text-slate-300">
                  {SPREADSHEET_COLUMNS.map((item) => (
                    <tr
                      key={item.col}
                      className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors"
                    >
                      <td className="py-2 px-3 font-mono-num font-bold text-center text-emerald-700 dark:text-emerald-400">
                        {item.col}
                      </td>
                      <td className="py-2 px-3 font-mono-num font-semibold text-slate-800 dark:text-slate-200">
                        {item.name}
                      </td>
                      <td className="py-2 px-3 text-[11px] text-slate-500 dark:text-slate-400">
                        {item.type}
                      </td>
                      <td className="py-2 px-3 text-[11px] text-slate-600 dark:text-slate-300">
                        {item.desc}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 text-xs">
                Esta es la fila con los datos reales del aprendiz actual, lista para ser exportada e insertada en Google Drive / Google Sheets:
              </div>

              <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2 font-mono-num text-[11px]">
                <div className="text-slate-400 uppercase font-semibold">Fila del Aprendiz Actual:</div>
                <div className="text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900 p-3 rounded border border-slate-200 dark:border-slate-800 overflow-x-auto whitespace-pre">
{`${new Date().toISOString().split('T')[0]} | ${apprentice.documentType} | ${apprentice.documentNumber} | ${apprentice.name} | ${apprentice.email} | ${apprentice.trainingProgram} | ${apprentice.groupCode} | ${apprentice.trainingCenter} | ${apprentice.regional} | ${completedModulesCount}/${totalModulesCount} | ${completedCasesCount}/${totalCasesCount} | ${quizScore !== null ? `${quizScore}%` : 'Pendiente'} | ${totalXp} XP | ${isCertified ? 'APROBADO' : 'EN CURSO'} | ${isCertified ? certificateData.verificationCode : 'NO_GENERADO'}`}
                </div>
              </div>

              <div className="text-slate-500 dark:text-slate-400 leading-relaxed text-[11px]">
                💡 <strong>Consejo para instructores:</strong> Al abrir esta hoja en Google Drive, puedes crear una regla de formato condicional en la columna <strong>N (ESTADO_INDUCCION)</strong> para resaltar en verde a los aprendices "APROBADO" y en amarillo a quienes estén "EN CURSO".
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          <button
            onClick={handleCopyHeaderRow}
            className="px-3.5 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold rounded-lg transition-colors flex items-center gap-1.5"
            title="Copiar encabezados tabulados"
          >
            {copiedStructure ? <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedStructure ? '¡Encabezados Copiados!' : 'Copiar Fila de Encabezados'}</span>
          </button>

          <div className="flex items-center gap-2">
            <a
              href="https://sheets.new"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold rounded-lg transition-colors inline-flex items-center gap-1.5"
            >
              <span>Abrir sheets.new en Drive</span>
            </a>
            <button
              onClick={handleDownloadCsv}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Descargar CSV para Google Sheets</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
