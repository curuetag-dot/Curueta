import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Minimize2,
  Maximize2,
  ExternalLink,
  Copy,
  Check,
  Link as LinkIcon,
  Play,
  RotateCcw,
  Sparkles,
  HelpCircle,
  Video,
  Settings2,
} from 'lucide-react';

interface FloatingVideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultDriveUrl?: string;
}

// Convert any standard Google Drive video URL or ID into the embeddable /preview URL
export function formatDrivePreviewUrl(rawUrl: string): { previewUrl: string; viewUrl: string; fileId: string | null } {
  if (!rawUrl || !rawUrl.trim()) {
    return { previewUrl: '', viewUrl: '', fileId: null };
  }

  const trimmed = rawUrl.trim();

  // Match /file/d/{FILE_ID}
  const matchFileD = trimmed.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (matchFileD && matchFileD[1]) {
    const fileId = matchFileD[1];
    return {
      previewUrl: `https://drive.google.com/file/d/${fileId}/preview`,
      viewUrl: `https://drive.google.com/file/d/${fileId}/view?usp=sharing`,
      fileId,
    };
  }

  // Match id={FILE_ID}
  const matchId = trimmed.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (matchId && matchId[1]) {
    const fileId = matchId[1];
    return {
      previewUrl: `https://drive.google.com/file/d/${fileId}/preview`,
      viewUrl: `https://drive.google.com/file/d/${fileId}/view?usp=sharing`,
      fileId,
    };
  }

  // If already a direct preview URL
  if (trimmed.includes('drive.google.com') && trimmed.includes('/preview')) {
    return {
      previewUrl: trimmed,
      viewUrl: trimmed.replace('/preview', '/view?usp=sharing'),
      fileId: null,
    };
  }

  // If just a raw 20+ character ID
  if (/^[a-zA-Z0-9_-]{20,}$/.test(trimmed)) {
    return {
      previewUrl: `https://drive.google.com/file/d/${trimmed}/preview`,
      viewUrl: `https://drive.google.com/file/d/${trimmed}/view?usp=sharing`,
      fileId: trimmed,
    };
  }

  // Fallback: return as-is
  return {
    previewUrl: trimmed,
    viewUrl: trimmed,
    fileId: null,
  };
}

const LOCAL_VIDEO_SRC = '/assets/aistudio/2026__16_44_523887b6.mp4';
const DEFAULT_DRIVE_SHARING_URL = 'https://drive.google.com/file/d/1w8a9SENA-TutorialInduccion/view?usp=sharing';
const STORAGE_KEY = 'sena_induction_drive_video_url';
const SOURCE_STORAGE_KEY = 'sena_induction_video_source';

export const FloatingVideoModal: React.FC<FloatingVideoModalProps> = ({
  isOpen,
  onClose,
  defaultDriveUrl = DEFAULT_DRIVE_SHARING_URL,
}) => {
  // Floating state: minimized (Picture-in-Picture in corner) vs expanded (centered modal)
  const [isMinimized, setIsMinimized] = useState(false);

  // Active source: 'local' (high fidelity direct MP4) vs 'drive' (Google Drive iframe)
  const [activeSource, setActiveSource] = useState<'local' | 'drive'>(() => {
    try {
      const saved = localStorage.getItem(SOURCE_STORAGE_KEY);
      return saved === 'drive' ? 'drive' : 'local';
    } catch {
      return 'local';
    }
  });

  // Current Google Drive link
  const [driveUrl, setDriveUrl] = useState<string>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved || defaultDriveUrl;
    } catch {
      return defaultDriveUrl;
    }
  });

  // URL editor state
  const [isEditingUrl, setIsEditingUrl] = useState(false);
  const [tempUrlInput, setTempUrlInput] = useState(driveUrl);
  const [copyStatus, setCopyStatus] = useState<string | null>(null);
  const [iframeKey, setIframeKey] = useState(0);
  const [showDriveGuide, setShowDriveGuide] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);

  // Save changes to localStorage
  const handleSaveDriveUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tempUrlInput.trim()) return;
    const cleanUrl = tempUrlInput.trim();
    setDriveUrl(cleanUrl);
    try {
      localStorage.setItem(STORAGE_KEY, cleanUrl);
    } catch {
      // storage unavailable
    }
    setIsEditingUrl(false);
    setActiveSource('drive');
    setIframeKey((prev) => prev + 1);
  };

  const handleResetDefaultUrl = () => {
    setDriveUrl(defaultDriveUrl);
    setTempUrlInput(defaultDriveUrl);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // storage unavailable
    }
    setIframeKey((prev) => prev + 1);
  };

  const handleToggleSource = (source: 'local' | 'drive') => {
    setActiveSource(source);
    try {
      localStorage.setItem(SOURCE_STORAGE_KEY, source);
    } catch {
      // storage unavailable
    }
  };

  const handleCopyLink = () => {
    const urlToCopy = activeSource === 'drive'
      ? formatDrivePreviewUrl(driveUrl).viewUrl || driveUrl
      : `${window.location.origin}${LOCAL_VIDEO_SRC}`;

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(urlToCopy).then(() => {
        setCopyStatus('¡Enlace copiado!');
        setTimeout(() => setCopyStatus(null), 3000);
      });
    }
  };

  const { previewUrl, viewUrl } = formatDrivePreviewUrl(driveUrl);

  // If closed, return null
  if (!isOpen) return null;

  /* ========================================================================
     1. MINIMIZED FLOATING WINDOW (Picture-in-Picture at bottom-right corner)
     ======================================================================== */
  if (isMinimized) {
    return (
      <aside
        aria-label="Reproductor flotante de video tutorial"
        className="fixed bottom-5 right-5 z-50 w-80 sm:w-96 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border-2 border-emerald-500/80 dark:border-emerald-600 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200"
      >
        {/* Floating Mini Header */}
        <div className="bg-slate-900 text-white px-3.5 py-2.5 flex items-center justify-between text-xs select-none">
          <div className="flex items-center gap-2 truncate pr-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0"></span>
            <span className="font-bold truncate text-[11px]">
              Tutorial: Inducción SENA
            </span>
            <span className="text-[10px] text-slate-400 uppercase tracking-wider shrink-0 font-mono-num">
              {activeSource === 'local' ? 'HD Directo' : 'Drive'}
            </span>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={handleCopyLink}
              title="Copiar enlace del video"
              className="p-1 hover:bg-slate-800 text-slate-300 hover:text-white rounded-md transition-colors"
            >
              {copyStatus ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={() => setIsMinimized(false)}
              title="Expandir a ventana completa"
              className="p-1 hover:bg-slate-800 text-slate-300 hover:text-white rounded-md transition-colors"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={onClose}
              title="Cerrar reproductor"
              className="p-1 hover:bg-slate-800 text-slate-300 hover:text-rose-400 rounded-md transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Mini Video Container */}
        <div className="relative aspect-video bg-black">
          {activeSource === 'local' ? (
            <video
              ref={videoRef}
              src={LOCAL_VIDEO_SRC}
              controls
              autoPlay
              playsInline
              className="w-full h-full object-contain"
            />
          ) : (
            <iframe
              key={`mini-frame-${iframeKey}`}
              src={previewUrl}
              title="Video Tutorial de Inducción SENA Google Drive"
              className="w-full h-full border-0"
              allow="autoplay; encrypted-media; fullscreen"
              allowFullScreen
            />
          )}
        </div>

        {/* Floating Mini Controls Bar */}
        <div className="px-3 py-2 bg-slate-50 dark:bg-slate-950/80 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-600 dark:text-slate-300">
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => handleToggleSource(activeSource === 'local' ? 'drive' : 'local')}
              className="text-emerald-700 dark:text-emerald-400 hover:underline font-semibold"
            >
              Cambiar a {activeSource === 'local' ? 'Drive' : 'HD Local'}
            </button>
          </div>

          <div className="flex items-center gap-2">
            {activeSource === 'drive' && (
              <a
                href={viewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 flex items-center gap-1"
                title="Abrir en Google Drive"
              >
                <span>Drive</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
            <button
              onClick={() => setIsMinimized(false)}
              className="font-semibold text-emerald-700 dark:text-emerald-400 hover:underline"
            >
              Pantalla completa
            </button>
          </div>
        </div>
      </aside>
    );
  }

  /* ========================================================================
     2. EXPANDED / CENTERED FLOATING MODAL
     ======================================================================== */
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="video-tutorial-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-4xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col my-auto max-h-[92vh]">
        {/* Header Bar */}
        <header className="px-5 py-3.5 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center shrink-0">
              <Video className="w-4 h-4" />
            </div>
            <div>
              <h2 id="video-tutorial-title" className="font-bold text-sm sm:text-base leading-tight">
                Video Tutorial: Inducción Integral SENA
              </h2>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                Guía audiovisual paso a paso para aprendices e instructores
              </p>
            </div>
          </div>

          {/* Header Action Controls */}
          <div className="flex items-center gap-1.5">
            {/* Source switch pills */}
            <div className="hidden sm:flex items-center bg-slate-800 rounded-lg p-0.5 border border-slate-700 text-xs">
              <button
                onClick={() => handleToggleSource('local')}
                className={`px-2.5 py-1 rounded-md transition-colors font-medium text-[11px] ${
                  activeSource === 'local'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                Video Local HD
              </button>
              <button
                onClick={() => handleToggleSource('drive')}
                className={`px-2.5 py-1 rounded-md transition-colors font-medium text-[11px] ${
                  activeSource === 'drive'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                Google Drive
              </button>
            </div>

            {/* Minimize button (detaches to floating PIP window) */}
            <button
              onClick={() => setIsMinimized(true)}
              title="Minimizar a ventana flotante en la esquina"
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors flex items-center gap-1 text-xs"
            >
              <Minimize2 className="w-4 h-4" />
              <span className="hidden md:inline text-[11px]">Flotante</span>
            </button>

            {/* Close button */}
            <button
              onClick={onClose}
              title="Cerrar video"
              className="p-2 text-slate-400 hover:text-white hover:bg-rose-900/60 rounded-lg transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* Video Player Display Container */}
        <div className="relative bg-black w-full aspect-video max-h-[58vh] flex items-center justify-center overflow-hidden">
          {activeSource === 'local' ? (
            <video
              ref={videoRef}
              src={LOCAL_VIDEO_SRC}
              controls
              autoPlay
              playsInline
              className="w-full h-full object-contain"
            >
              Tu navegador no soporta la reproducción directa de este video.
            </video>
          ) : (
            <iframe
              key={`main-frame-${iframeKey}`}
              src={previewUrl}
              title="Video Tutorial de Inducción SENA Google Drive"
              className="w-full h-full border-0"
              allow="autoplay; encrypted-media; fullscreen"
              allowFullScreen
            />
          )}
        </div>

        {/* URL Configuration Drawer (Toggleable) */}
        {isEditingUrl && (
          <form
            onSubmit={handleSaveDriveUrl}
            className="p-4 bg-emerald-50/70 dark:bg-emerald-950/40 border-b border-emerald-200 dark:border-emerald-800/80 animate-in fade-in duration-150 space-y-3"
          >
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                <LinkIcon className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>Configurar URL del Video de Google Drive:</span>
              </label>
              <button
                type="button"
                onClick={() => setIsEditingUrl(false)}
                className="text-xs text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
              >
                Cancelar
              </button>
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                required
                value={tempUrlInput}
                onChange={(e) => setTempUrlInput(e.target.value)}
                placeholder="https://drive.google.com/file/d/TU_ID_DE_ARCHIVO/view?usp=sharing"
                className="flex-1 px-3 py-2 text-xs font-mono rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-colors shrink-0 shadow-xs"
              >
                Guardar y Reproducir
              </button>
              <button
                type="button"
                onClick={handleResetDefaultUrl}
                title="Restablecer enlace predeterminado"
                className="p-2 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl transition-colors shrink-0"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>

            <p className="text-[11px] text-slate-600 dark:text-slate-400">
              💡 Acepta enlaces estándar de Google Drive (<code className="font-mono">/file/d/.../view</code>), enlaces compartibles o el ID directo del archivo. El sistema lo transformará automáticamente para reproducirlo dentro del prototipo.
            </p>
          </form>
        )}

        {/* Video Link Controls & Information Footer */}
        <div className="p-4 sm:p-5 bg-white dark:bg-slate-900 space-y-3.5">
          {/* Controls Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            {/* Left: Link & Drive Controls */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              {/* Copy link button */}
              <button
                onClick={handleCopyLink}
                className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-medium transition-colors flex items-center gap-1.5"
              >
                {copyStatus ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-600 dark:text-emerald-400 font-semibold">{copyStatus}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-slate-500" />
                    <span>Copiar Enlace</span>
                  </>
                )}
              </button>

              {/* Open in Google Drive external link */}
              {activeSource === 'drive' ? (
                <a
                  href={viewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-medium transition-colors flex items-center gap-1.5"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                  <span>Abrir en Google Drive</span>
                </a>
              ) : (
                <a
                  href={LOCAL_VIDEO_SRC}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-medium transition-colors flex items-center gap-1.5"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                  <span>Descargar / Abrir MP4</span>
                </a>
              )}

              {/* Configure Drive URL button */}
              <button
                onClick={() => setIsEditingUrl(!isEditingUrl)}
                className="px-3 py-1.5 rounded-xl border border-emerald-200 dark:border-emerald-800/80 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 font-medium hover:bg-emerald-100 dark:hover:bg-emerald-900/60 transition-colors flex items-center gap-1.5"
              >
                <Settings2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>Cambiar Enlace de Drive</span>
              </button>
            </div>

            {/* Right: Picture-in-Picture action button */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsMinimized(true)}
                className="px-3.5 py-1.5 bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5 shadow-xs"
              >
                <Minimize2 className="w-3.5 h-3.5" />
                <span>Flotar en Esquina</span>
              </button>
            </div>
          </div>

          {/* Quick permissions guidance banner */}
          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 text-[11px] text-slate-600 dark:text-slate-400 flex items-start gap-2.5">
            <HelpCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p>
                <strong className="text-slate-800 dark:text-slate-200">
                  Permisos de Google Drive requeridos para reproducción pública:
                </strong>{' '}
                Si utilizas un archivo de Google Drive, asegúrate de que en Drive esté configurado como{' '}
                <span className="font-semibold text-emerald-700 dark:text-emerald-400">
                  «Cualquier persona con el enlace puede ver» (Lector)
                </span>
                . De lo contrario, Google Drive solicitará inicio de sesión dentro de la ventana.
              </p>
              <div className="flex items-center gap-3 pt-0.5">
                <button
                  type="button"
                  onClick={() => setShowDriveGuide(!showDriveGuide)}
                  className="text-emerald-700 dark:text-emerald-400 hover:underline font-semibold"
                >
                  {showDriveGuide ? 'Ocultar pasos de Google Drive' : '¿Cómo configurar los permisos en Google Drive?'}
                </button>
                <span>·</span>
                <span>Modo actual: {activeSource === 'local' ? 'Video Local HD Institucional' : 'Google Drive Integrado'}</span>
              </div>
            </div>
          </div>

          {/* Expanded Step-by-Step Google Drive Guide */}
          {showDriveGuide && (
            <div className="p-3.5 rounded-2xl bg-amber-50/80 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-xs text-amber-900 dark:text-amber-200 space-y-2 animate-in fade-in duration-150">
              <div className="font-bold flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Pasos para enlazar tu video desde Google Drive:</span>
              </div>
              <ol className="list-decimal list-inside space-y-1 text-[11px] leading-relaxed pl-1 text-amber-800 dark:text-amber-300">
                <li>Sube tu video a tu cuenta de Google Drive institucional o personal.</li>
                <li>Haz clic derecho sobre el video en Google Drive y selecciona <strong>Compartir → Compartir</strong>.</li>
                <li>En <em>Acceso general</em>, cambia de «Restringido» a <strong>«Cualquier persona con el enlace»</strong> con rol <strong>Lector</strong>.</li>
                <li>Haz clic en <strong>Copiar enlace</strong> y pégalo arriba mediante el botón <strong>«Cambiar Enlace de Drive»</strong>.</li>
              </ol>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
