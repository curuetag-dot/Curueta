import React, { useState } from 'react';
import { Search, X, BookOpen } from 'lucide-react';
import { REGULATION_QUICK_SEARCH } from '../data/senaData';

interface RuleExplorerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RuleExplorerModal: React.FC<RuleExplorerModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  const filteredItems = REGULATION_QUICK_SEARCH.filter(
    (item) =>
      item.tag.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.article.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 dark:bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4 max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                Consultor Rápido del Reglamento del Aprendiz
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Acuerdo 009 de 2024 · Búsqueda instantánea de artículos y deberes
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

        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por tema: inasistencia, plagio, carné, comité, etapa práctica..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600 text-xs sm:text-sm"
            autoFocus
          />
        </div>

        {/* Results List */}
        <div className="overflow-y-auto space-y-2.5 pr-1 flex-1">
          {filteredItems.length > 0 ? (
            filteredItems.map((item, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-xs space-y-1"
              >
                <div className="flex items-center justify-between font-semibold">
                  <span className="text-slate-900 dark:text-white">{item.tag}</span>
                  <span className="font-mono-num text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800 text-[11px]">
                    {item.article}
                  </span>
                </div>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{item.summary}</p>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-xs text-slate-500 dark:text-slate-400">
              No se encontraron artículos con la palabra "{searchTerm}". Intenta buscar "inasistencia", "carné" o "comité".
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-500">
          <span>Fuente oficial: Dirección Jurídica y Formación Profesional SENA</span>
          <button
            onClick={onClose}
            className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold rounded-lg text-xs transition-colors"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
