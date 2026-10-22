import React, { useState, useEffect } from 'react';
import {
  FileSpreadsheet,
  Download,
  Copy,
  Check,
  Search,
  Plus,
  Award,
  ExternalLink,
  Users,
  CheckCircle2,
  Clock,
  Trash2,
  X,
  RefreshCw,
  Radio,
  Code2,
  Send,
  Sliders,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { ApprenticeRecord } from '../types/induction';
import {
  getWebhookUrl,
  setWebhookUrl,
  isAutoSyncEnabled,
  setAutoSyncEnabled,
  getSyncLogs,
  syncStudentRecordToGoogleSheets,
  syncAllStudentsBatch,
  GOOGLE_APPS_SCRIPT_TEMPLATE,
  SyncLogEntry,
} from '../services/sheetSyncService';

interface SpreadsheetViewProps {
  roster: ApprenticeRecord[];
  activeApprenticeId: string;
  onSelectApprentice: (apprenticeId: string) => void;
  onAddApprentice: (newApprentice: Omit<ApprenticeRecord, 'id'>) => void;
  onDeleteApprentice: (apprenticeId: string) => void;
  onViewCertificate: () => void;
}

export const SpreadsheetView: React.FC<SpreadsheetViewProps> = ({
  roster,
  activeApprenticeId,
  onSelectApprentice,
  onAddApprentice,
  onDeleteApprentice,
  onViewCertificate,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'APROBADO' | 'EN CURSO'>('ALL');
  const [copied, setCopied] = useState(false);
  const [copiedScript, setCopiedScript] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [showScriptModal, setShowScriptModal] = useState(false);
  const [showSyncSettings, setShowSyncSettings] = useState(false);

  // Sync state
  const [autoSyncOn, setAutoSyncOn] = useState(isAutoSyncEnabled());
  const [webhookInput, setWebhookInput] = useState(getWebhookUrl());
  const [syncLogs, setSyncLogs] = useState<SyncLogEntry[]>(getSyncLogs());
  const [isTestingSync, setIsTestingSync] = useState(false);
  const [isBatchSyncing, setIsBatchSyncing] = useState(false);
  const [testMessage, setTestMessage] = useState<string | null>(null);

  // Poll or refresh logs periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setSyncLogs(getSyncLogs());
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleToggleAutoSync = () => {
    const nextState = !autoSyncOn;
    setAutoSyncOn(nextState);
    setAutoSyncEnabled(nextState);
  };

  const handleSaveWebhook = () => {
    setWebhookUrl(webhookInput);
    setTestMessage('✓ URL de Webhook guardada exitosamente.');
    setTimeout(() => setTestMessage(null), 3000);
  };

  const handleTestSync = async () => {
    setIsTestingSync(true);
    const activeStudent = roster.find((a) => a.id === activeApprenticeId) || roster[0];
    const res = await syncStudentRecordToGoogleSheets(activeStudent, 'Prueba Manual');
    setSyncLogs(getSyncLogs());
    setTestMessage(res.message);
    setIsTestingSync(false);
    setTimeout(() => setTestMessage(null), 4000);
  };

  const handleSyncAllBatch = async () => {
    setIsBatchSyncing(true);
    const res = await syncAllStudentsBatch(roster);
    setSyncLogs(getSyncLogs());
    setTestMessage(res.message);
    setIsBatchSyncing(false);
    setTimeout(() => setTestMessage(null), 5000);
  };

  const handleCopyScript = () => {
    navigator.clipboard.writeText(GOOGLE_APPS_SCRIPT_TEMPLATE);
    setCopiedScript(true);
    setTimeout(() => setCopiedScript(false), 2500);
  };

  // New Student Form State
  const [newStudent, setNewStudent] = useState({
    name: '',
    documentType: 'C.C.' as 'C.C.' | 'T.I.' | 'C.E.' | 'PEP',
    documentNumber: '',
    email: '',
    trainingProgram: 'Tecnología en Análisis y Desarrollo de Software (ADSO)',
    groupCode: '2837491',
    trainingCenter: 'Centro de Gestión de Mercados, Logística y Tecnologías de la Información',
    regional: 'Regional Distrito Capital',
  });

  // Filter roster
  const filteredRoster = roster.filter((app) => {
    const matchesSearch =
      app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.documentNumber.includes(searchTerm) ||
      app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.groupCode.includes(searchTerm);

    const matchesStatus =
      statusFilter === 'ALL' ? true : app.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Stats calculation
  const totalCount = roster.length;
  const approvedCount = roster.filter((a) => a.status === 'APROBADO').length;
  const inProgressCount = roster.filter((a) => a.status === 'EN CURSO').length;
  const scores = roster
    .map((a) => a.quizScore)
    .filter((s): s is number => s !== null);
  const avgScore =
    scores.length > 0
      ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
      : 0;

  // CSV Generation
  const handleDownloadCsv = () => {
    const headers = [
      'FECHA_REGISTRO',
      'TIPO_DOCUMENTO',
      'NUMERO_DOCUMENTO',
      'NOMBRE_COMPLETO',
      'CORREO_MISENA',
      'PROGRAMA_FORMACION',
      'FICHA_CARACTERIZACION',
      'CENTRO_FORMACION',
      'REGIONAL',
      'MODULOS_APROBADOS',
      'RETOS_RESUELTOS',
      'PUNTAJE_EVALUACION',
      'PUNTOS_XP',
      'ESTADO_INDUCCION',
      'CODIGO_CERTIFICADO',
    ].join(';');

    const rows = roster.map((a) =>
      [
        a.registrationDate,
        a.documentType,
        a.documentNumber,
        `"${a.name}"`,
        a.email,
        `"${a.trainingProgram}"`,
        a.groupCode,
        `"${a.trainingCenter}"`,
        `"${a.regional}"`,
        `${a.completedModulesCount}/5`,
        `${a.resolvedCasesCount}/5`,
        a.quizScore !== null ? `${a.quizScore}%` : 'Pendiente',
        a.totalXp,
        a.status,
        a.verificationCode,
      ].join(';')
    );

    const csvContent = '\uFEFF' + [headers, ...rows].join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Planilla_Aprendices_SENA_Ficha_${roster[0]?.groupCode || 'ADSO'}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCopyTsv = () => {
    const headers = [
      'FECHA_REGISTRO',
      'TIPO_DOCUMENTO',
      'NUMERO_DOCUMENTO',
      'NOMBRE_COMPLETO',
      'CORREO_MISENA',
      'PROGRAMA_FORMACION',
      'FICHA_CARACTERIZACION',
      'CENTRO_FORMACION',
      'REGIONAL',
      'MODULOS_APROBADOS',
      'RETOS_RESUELTOS',
      'PUNTAJE_EVALUACION',
      'PUNTOS_XP',
      'ESTADO_INDUCCION',
      'CODIGO_CERTIFICADO',
    ].join('\t');

    const rows = roster.map((a) =>
      [
        a.registrationDate,
        a.documentType,
        a.documentNumber,
        a.name,
        a.email,
        a.trainingProgram,
        a.groupCode,
        a.trainingCenter,
        a.regional,
        `${a.completedModulesCount}/5`,
        `${a.resolvedCasesCount}/5`,
        a.quizScore !== null ? `${a.quizScore}%` : 'Pendiente',
        a.totalXp,
        a.status,
        a.verificationCode,
      ].join('\t')
    );

    const fullTsv = [headers, ...rows].join('\n');
    navigator.clipboard.writeText(fullTsv);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleCreateStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudent.name || !newStudent.documentNumber) return;

    onAddApprentice({
      registrationDate: new Date().toISOString().split('T')[0],
      documentType: newStudent.documentType,
      documentNumber: newStudent.documentNumber,
      name: newStudent.name,
      email:
        newStudent.email ||
        `${newStudent.name.toLowerCase().replace(/\s+/g, '.')}@misena.edu.co`,
      trainingProgram: newStudent.trainingProgram,
      groupCode: newStudent.groupCode,
      trainingCenter: newStudent.trainingCenter,
      regional: newStudent.regional,
      completedModulesCount: 0,
      completedModuleIds: [],
      resolvedCasesCount: 0,
      resolvedCaseIds: [],
      quizScore: null,
      totalXp: 0,
      status: 'EN CURSO',
      verificationCode: 'PENDIENTE_EVALUACION',
    });

    setIsAddModalOpen(false);
    setNewStudent({
      name: '',
      documentType: 'C.C.',
      documentNumber: '',
      email: '',
      trainingProgram: 'Tecnología en Análisis y Desarrollo de Software (ADSO)',
      groupCode: '2837491',
      trainingCenter: 'Centro de Gestión de Mercados, Logística y Tecnologías de la Información',
      regional: 'Regional Distrito Capital',
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-2">
            <span>SENA · Control Académico</span>
            <span aria-hidden="true">·</span>
            <span>Planilla de Inducción de la Ficha</span>
            <span aria-hidden="true">·</span>
            <span className="font-semibold text-emerald-700 dark:text-emerald-400">
              ● Sincronización Automática en Vivo
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Planilla de Registro y Control de Aprendices
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base mt-1.5 max-w-3xl">
            Cada avance formativo (módulos, retos adaptativos y evaluaciones) se registra de manera continua y automática.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={() => setShowSyncSettings(!showSyncSettings)}
            className="px-3.5 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold text-xs rounded-xl transition-colors flex items-center gap-1.5"
          >
            <Sliders className="w-4 h-4 text-emerald-600" />
            <span>Configurar Sincronización Nube</span>
            {showSyncSettings ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-xl transition-colors flex items-center gap-1.5 shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Registrar Aprendiz</span>
          </button>
        </div>
      </div>

      {/* Share Learner Induction Link Card for Instructor */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-emerald-500/5 to-transparent border border-emerald-200 dark:border-emerald-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="text-xs font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
            <span>Enlace Oficial de Inducción para los Aprendices</span>
            <span className="text-[10px] font-mono-num bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 px-1.5 py-0.2 rounded font-semibold">
              Modo Aprendiz Protegido
            </span>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300">
            Comparte este enlace a tu grupo de WhatsApp, correo o Teams. Los aprendices ingresarán a realizar sus módulos sin acceso a la configuración técnica ni a la planilla de la Ficha.
          </p>
        </div>

        <button
          onClick={() => {
            const url = `${window.location.origin}${window.location.pathname}?rol=aprendiz`;
            navigator.clipboard.writeText(url);
            setTestMessage('✓ Enlace para aprendices copiado al portapapeles.');
            setTimeout(() => setTestMessage(null), 3000);
          }}
          className="px-4 py-2.5 bg-slate-900 dark:bg-emerald-700 hover:bg-slate-800 dark:hover:bg-emerald-600 text-white text-xs font-semibold rounded-xl transition-colors shrink-0 flex items-center justify-center gap-2 shadow-xs"
        >
          <span>Copiar Enlace para Aprendices</span>
        </button>
      </div>

      {/* Auto-Sync Configuration Panel (Collapsible) */}
      {showSyncSettings && (
        <div className="bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/60 rounded-2xl p-5 sm:p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-emerald-200/60 dark:border-emerald-800/40">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold">
                <Radio className="w-4 h-4 animate-pulse" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                  Motor de Sincronización Automática con Google Sheets
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Transmite los datos de los aprendices directamente a tu hoja de cálculo sin intervención manual.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700 dark:text-slate-300">
                <span>Auto-Sync en Vivo:</span>
                <input
                  type="checkbox"
                  checked={autoSyncOn}
                  onChange={handleToggleAutoSync}
                  className="w-4 h-4 accent-emerald-600 rounded"
                />
                <span className={`text-[11px] font-mono-num ${autoSyncOn ? 'text-emerald-700 dark:text-emerald-400' : 'text-slate-400'}`}>
                  {autoSyncOn ? 'ACTIVO' : 'PAUSADO'}
                </span>
              </label>
            </div>
          </div>

          {/* Webhook Connection Input */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            <div className="md:col-span-8">
              <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                URL de Webhook de Google Sheets (Google Apps Script Web App):
              </label>
              <input
                type="url"
                value={webhookInput}
                onChange={(e) => setWebhookInput(e.target.value)}
                placeholder="https://script.google.com/macros/s/AKfycb.../exec (Opcional para nube en vivo)"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-mono-num text-xs focus:outline-hidden focus:ring-2 focus:ring-emerald-600/30"
              />
            </div>

            <div className="md:col-span-4 flex items-center gap-2 pt-4 md:pt-4">
              <button
                onClick={handleSaveWebhook}
                className="px-3.5 py-2 bg-slate-900 dark:bg-slate-800 text-white hover:bg-slate-800 text-xs font-semibold rounded-xl transition-colors"
              >
                Guardar URL
              </button>
              <button
                onClick={handleTestSync}
                disabled={isTestingSync || isBatchSyncing}
                className="px-3 py-2 border border-emerald-600 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-xs font-semibold rounded-xl transition-colors flex items-center gap-1.5"
                title="Prueba el envío de un aprendiz individual"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{isTestingSync ? 'Enviando...' : 'Probar Envío'}</span>
              </button>
              <button
                onClick={handleSyncAllBatch}
                disabled={isBatchSyncing || isTestingSync}
                className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl transition-colors flex items-center gap-1.5 shadow-sm"
                title="Sincronizar todos los aprendices a la hoja de Google Sheets"
              >
                <RefreshCw className={isBatchSyncing ? 'w-3.5 h-3.5 animate-spin' : 'w-3.5 h-3.5'} />
                <span>{isBatchSyncing ? 'Transmitiendo...' : 'Sincronizar Toda la Ficha'}</span>
              </button>
              <button
                onClick={() => setShowScriptModal(true)}
                className="p-2 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-semibold"
                title="Ver código Apps Script para Google Sheets"
              >
                <Code2 className="w-4 h-4 text-emerald-600" />
              </button>
            </div>
          </div>

          {testMessage && (
            <div className="p-2.5 rounded-lg bg-emerald-100 dark:bg-emerald-900/40 text-emerald-900 dark:text-emerald-200 text-xs font-medium">
              {testMessage}
            </div>
          )}

          {/* Live Sync Log Bar */}
          <div className="pt-2">
            <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
              Últimas Transmisiones Automáticas:
            </div>
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 divide-y divide-slate-100 dark:divide-slate-800 text-[11px] font-mono-num max-h-32 overflow-y-auto">
              {syncLogs.length > 0 ? (
                syncLogs.slice(0, 4).map((log) => (
                  <div key={log.id} className="p-2 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 truncate">
                      <span className="text-slate-400">{log.timestamp}</span>
                      <span className="font-semibold text-slate-800 dark:text-slate-200">{log.studentName}</span>
                      <span className="text-slate-500">[{log.action}]</span>
                    </div>
                    <span className="text-emerald-700 dark:text-emerald-400 font-semibold shrink-0">
                      ✓ {log.details}
                    </span>
                  </div>
                ))
              ) : (
                <div className="p-3 text-center text-slate-400">
                  El motor está listo. Las transmisiones se registrarán automáticamente al cursar módulos.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* KPI Stats Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-1">
            <Users className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Total Aprendices Ficha</span>
          </div>
          <div className="text-2xl font-bold font-mono-num text-slate-900 dark:text-white">
            {totalCount}
          </div>
        </div>

        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-1">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Inducción Aprobada</span>
          </div>
          <div className="text-2xl font-bold font-mono-num text-emerald-700 dark:text-emerald-400">
            {approvedCount}
          </div>
        </div>

        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-1">
            <Clock className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            <span>En Curso / Pendiente</span>
          </div>
          <div className="text-2xl font-bold font-mono-num text-amber-700 dark:text-amber-400">
            {inProgressCount}
          </div>
        </div>

        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-1">
            <Award className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Promedio Evaluación</span>
          </div>
          <div className="text-2xl font-bold font-mono-num text-slate-900 dark:text-white">
            {avgScore}%
          </div>
        </div>
      </div>

      {/* Action Bar & Filters */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por nombre, documento, correo o ficha..."
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-emerald-600/30"
          />
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs font-semibold">
            <button
              onClick={() => setStatusFilter('ALL')}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                statusFilter === 'ALL'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Todos ({totalCount})
            </button>
            <button
              onClick={() => setStatusFilter('APROBADO')}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                statusFilter === 'APROBADO'
                  ? 'bg-white dark:bg-slate-900 text-emerald-700 dark:text-emerald-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Aprobados ({approvedCount})
            </button>
            <button
              onClick={() => setStatusFilter('EN CURSO')}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                statusFilter === 'EN CURSO'
                  ? 'bg-white dark:bg-slate-900 text-amber-700 dark:text-amber-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              En Curso ({inProgressCount})
            </button>
          </div>

          {/* Export Buttons */}
          <button
            onClick={handleCopyTsv}
            className="px-3 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5"
            title="Copiar datos tabulados para pegar directamente en Google Sheets"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? '¡Copiado!' : 'Copiar para Sheets'}</span>
          </button>

          <button
            onClick={handleDownloadCsv}
            className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Descargar CSV</span>
          </button>

          <a
            href="https://sheets.new"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-2 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-medium rounded-lg transition-colors inline-flex items-center gap-1"
            title="Abrir hoja nueva en Google Drive"
          >
            <span>sheets.new</span>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </a>
        </div>
      </div>

      {/* Main Interactive Spreadsheet Grid */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left divide-y divide-slate-200 dark:divide-slate-800 text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/80 font-mono-num font-semibold text-slate-600 dark:text-slate-300">
              <tr>
                <th className="py-2.5 px-3 w-10 text-center text-slate-400">#</th>
                <th className="py-2.5 px-3">FECHA_REGISTRO (A)</th>
                <th className="py-2.5 px-3">DOCUMENTO (B, C)</th>
                <th className="py-2.5 px-3">NOMBRE_APRENDIZ (D)</th>
                <th className="py-2.5 px-3">CORREO_MISENA (E)</th>
                <th className="py-2.5 px-3 text-center">MÓDULOS (J)</th>
                <th className="py-2.5 px-3 text-center">RETOS (K)</th>
                <th className="py-2.5 px-3 text-center">EVALUACIÓN (L)</th>
                <th className="py-2.5 px-3 text-right">XP (M)</th>
                <th className="py-2.5 px-3 text-center">ESTADO (N)</th>
                <th className="py-2.5 px-3">CERTIFICADO (O)</th>
                <th className="py-2.5 px-3 text-right">ACCIONES</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
              {filteredRoster.map((app, idx) => {
                const isActive = app.id === activeApprenticeId;
                return (
                  <tr
                    key={app.id}
                    className={`transition-colors ${
                      isActive
                        ? 'bg-emerald-50/60 dark:bg-emerald-950/30'
                        : 'hover:bg-slate-50/80 dark:hover:bg-slate-800/50'
                    }`}
                  >
                    <td className="py-3 px-3 font-mono-num text-center text-slate-400 font-bold">
                      {idx + 1}
                    </td>

                    <td className="py-3 px-3 font-mono-num whitespace-nowrap text-slate-500 dark:text-slate-400">
                      {app.registrationDate}
                    </td>

                    <td className="py-3 px-3 font-mono-num whitespace-nowrap">
                      <span className="text-slate-500 font-semibold">{app.documentType} </span>
                      <span className="font-bold text-slate-800 dark:text-slate-200">
                        {app.documentNumber}
                      </span>
                    </td>

                    <td className="py-3 px-3">
                      <div className="font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                        <span>{app.name}</span>
                        {isActive && (
                          <span className="text-[10px] font-mono-num bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 px-1.5 py-0.2 rounded font-bold">
                            Activo
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-slate-400 truncate max-w-[200px]" title={app.trainingProgram}>
                        Ficha {app.groupCode} · {app.regional}
                      </div>
                    </td>

                    <td className="py-3 px-3 text-slate-500 dark:text-slate-400 font-mono-num">
                      {app.email}
                    </td>

                    <td className="py-3 px-3 text-center font-mono-num">
                      <span
                        className={`font-semibold ${
                          app.completedModulesCount === 5
                            ? 'text-emerald-700 dark:text-emerald-400 font-bold'
                            : 'text-slate-600 dark:text-slate-400'
                        }`}
                      >
                        {app.completedModulesCount}/5
                      </span>
                    </td>

                    <td className="py-3 px-3 text-center font-mono-num">
                      <span
                        className={`font-semibold ${
                          app.resolvedCasesCount === 5
                            ? 'text-emerald-700 dark:text-emerald-400 font-bold'
                            : 'text-slate-600 dark:text-slate-400'
                        }`}
                      >
                        {app.resolvedCasesCount}/5
                      </span>
                    </td>

                    <td className="py-3 px-3 text-center font-mono-num font-bold">
                      {app.quizScore !== null ? (
                        <span
                          className={
                            app.quizScore >= 80
                              ? 'text-emerald-700 dark:text-emerald-400'
                              : 'text-amber-600 dark:text-amber-400'
                          }
                        >
                          {app.quizScore}%
                        </span>
                      ) : (
                        <span className="text-slate-400 font-normal">Pendiente</span>
                      )}
                    </td>

                    <td className="py-3 px-3 text-right font-mono-num font-semibold text-slate-800 dark:text-slate-200">
                      +{app.totalXp}
                    </td>

                    <td className="py-3 px-3 text-center">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full font-semibold text-[10px] ${
                          app.status === 'APROBADO'
                            ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                            : 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800'
                        }`}
                      >
                        {app.status}
                      </span>
                    </td>

                    <td className="py-3 px-3 font-mono-num text-[11px] text-slate-600 dark:text-slate-400">
                      {app.verificationCode}
                    </td>

                    <td className="py-3 px-3 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        {!isActive ? (
                          <button
                            onClick={() => onSelectApprentice(app.id)}
                            className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded font-semibold text-[11px] transition-colors"
                            title="Cambiar al perfil de este aprendiz para cursar o ver progreso"
                          >
                            Activar
                          </button>
                        ) : (
                          app.status === 'APROBADO' && (
                            <button
                              onClick={onViewCertificate}
                              className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded font-semibold text-[11px] transition-colors"
                              title="Ver el certificado de este aprendiz"
                            >
                              Certificado
                            </button>
                          )
                        )}

                        {roster.length > 1 && (
                          <button
                            onClick={() => {
                              if (
                                confirm(
                                  `¿Estás seguro de eliminar el registro de ${app.name}?`
                                )
                              ) {
                                onDeleteApprentice(app.id);
                              }
                            }}
                            className="p-1 text-slate-400 hover:text-rose-600 rounded hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                            title="Eliminar registro"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredRoster.length === 0 && (
          <div className="text-center py-12 text-slate-500 text-xs">
            No se encontraron aprendices con el filtro aplicado.
          </div>
        )}
      </div>

      {/* Script Modal */}
      {showScriptModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 dark:bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4 max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <Code2 className="w-5 h-5 text-emerald-600" />
                <h3 className="font-bold text-slate-900 dark:text-white text-base">
                  Código de Sincronización Automática (Google Apps Script)
                </h3>
              </div>
              <button
                onClick={() => setShowScriptModal(false)}
                className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300">
              Copia este código y pégalo en tu Google Sheet en: <strong>Extensiones &gt; Apps Script</strong>. 
              Luego pulsa <strong>Implementar &gt; Nueva Implementación &gt; Aplicación web</strong> (Acceso: Cualquier persona) y copia la URL resultante en la casilla de Webhook.
            </p>

            <div className="relative flex-1 overflow-y-auto">
              <pre className="p-4 bg-slate-900 text-emerald-300 font-mono text-[11px] rounded-xl overflow-x-auto leading-relaxed">
                {GOOGLE_APPS_SCRIPT_TEMPLATE}
              </pre>
            </div>

            <div className="pt-2 flex items-center justify-between">
              <button
                onClick={handleCopyScript}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-xl flex items-center gap-1.5 transition-colors shadow-sm"
              >
                {copiedScript ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copiedScript ? '¡Código Copiado!' : 'Copiar Código'}</span>
              </button>

              <button
                onClick={() => setShowScriptModal(false)}
                className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-semibold rounded-xl"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Student Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 dark:bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <FileSpreadsheet className="w-5 h-5 text-emerald-600" />
                <h3 className="font-bold text-slate-900 dark:text-white text-base">
                  Registrar Nuevo Aprendiz a la Planilla
                </h3>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateStudent} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                  Nombre Completo del Aprendiz
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Juan Carlos Pérez Salazar"
                  value={newStudent.name}
                  onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-emerald-600/30"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                    Tipo Doc.
                  </label>
                  <select
                    value={newStudent.documentType}
                    onChange={(e) =>
                      setNewStudent({
                        ...newStudent,
                        documentType: e.target.value as any,
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-hidden"
                  >
                    <option value="C.C.">C.C.</option>
                    <option value="T.I.">T.I.</option>
                    <option value="C.E.">C.E.</option>
                    <option value="PEP">PEP</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                    Número de Documento
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="1098765432"
                    value={newStudent.documentNumber}
                    onChange={(e) =>
                      setNewStudent({ ...newStudent, documentNumber: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono-num"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                  Correo Institucional (Opcional, se genera automático)
                </label>
                <input
                  type="email"
                  placeholder="juan.perez@misena.edu.co"
                  value={newStudent.email}
                  onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono-num"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                    Ficha de Caracterización
                  </label>
                  <input
                    type="text"
                    required
                    value={newStudent.groupCode}
                    onChange={(e) =>
                      setNewStudent({ ...newStudent, groupCode: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono-num"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                    Regional
                  </label>
                  <input
                    type="text"
                    required
                    value={newStudent.regional}
                    onChange={(e) =>
                      setNewStudent({ ...newStudent, regional: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium rounded-xl text-xs transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl text-xs transition-colors shadow-sm"
                >
                  Guardar en la Planilla
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
