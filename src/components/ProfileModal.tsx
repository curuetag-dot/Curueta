import React, { useState } from 'react';
import { User, X, Sparkles } from 'lucide-react';
import { ApprenticeProfile } from '../types/induction';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  apprentice: ApprenticeProfile;
  onSave: (updated: ApprenticeProfile) => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  apprentice,
  onSave,
}) => {
  const [formData, setFormData] = useState<ApprenticeProfile>({ ...apprentice });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const setDemoProfile = (type: 'adso' | 'gestion' | 'mecatronica') => {
    if (type === 'adso') {
      setFormData({
        name: 'Carolina Gómez Restrepo',
        documentType: 'C.C.',
        documentNumber: '1020498765',
        trainingProgram: 'Tecnología en Análisis y Desarrollo de Software (ADSO)',
        groupCode: '2837491',
        regional: 'Regional Distrito Capital',
        trainingCenter: 'Centro de Gestión de Mercados, Logística y Tecnologías de la Información',
        email: 'carolina.gomez@misena.edu.co',
      });
    } else if (type === 'gestion') {
      setFormData({
        name: 'Mateo Alejandro Valencia',
        documentType: 'C.C.',
        documentNumber: '1035987123',
        trainingProgram: 'Tecnología en Gestión del Talento Humano',
        groupCode: '2748192',
        regional: 'Regional Antioquia',
        trainingCenter: 'Centro de Comercio y Servicios',
        email: 'mateo.valencia@misena.edu.co',
      });
    } else {
      setFormData({
        name: 'Valentina Puentes Herrera',
        documentType: 'T.I.',
        documentNumber: '1088492014',
        trainingProgram: 'Tecnología en Automatización y Mecatrónica Industrial',
        groupCode: '2901845',
        regional: 'Regional Valle',
        trainingCenter: 'Centro de Electricidad y Automatización Industrial',
        email: 'valentina.puentes@misena.edu.co',
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 dark:bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-5 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">Ficha del Aprendiz</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Datos que se acreditarán en el Certificado Oficial</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Demo Pre-fill */}
        <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/80 dark:border-slate-800 text-xs space-y-1.5">
          <div className="text-slate-500 dark:text-slate-400 font-medium flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Plantillas rápidas de ejemplo:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setDemoProfile('adso')}
              className="px-2.5 py-1 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded text-slate-700 dark:text-slate-300 transition-colors"
            >
              ADSO Bogotá
            </button>
            <button
              type="button"
              onClick={() => setDemoProfile('gestion')}
              className="px-2.5 py-1 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded text-slate-700 dark:text-slate-300 transition-colors"
            >
              Gestión Medellín
            </button>
            <button
              type="button"
              onClick={() => setDemoProfile('mecatronica')}
              className="px-2.5 py-1 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded text-slate-700 dark:text-slate-300 transition-colors"
            >
              Mecatrónica Cali
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Nombre Completo del Aprendiz</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600 text-xs sm:text-sm"
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Tipo Doc.</label>
              <select
                value={formData.documentType}
                onChange={(e) =>
                  setFormData({ ...formData, documentType: e.target.value as any })
                }
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600 text-xs sm:text-sm"
              >
                <option value="C.C.">C.C.</option>
                <option value="T.I.">T.I.</option>
                <option value="C.E.">C.E.</option>
                <option value="PEP">PEP</option>
              </select>
            </div>
            <div className="col-span-2">
              <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Número de Documento</label>
              <input
                type="text"
                required
                value={formData.documentNumber}
                onChange={(e) => setFormData({ ...formData, documentNumber: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600 text-xs sm:text-sm font-mono-num"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Programa de Formación</label>
            <input
              type="text"
              required
              value={formData.trainingProgram}
              onChange={(e) => setFormData({ ...formData, trainingProgram: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600 text-xs sm:text-sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Número de Ficha</label>
              <input
                type="text"
                required
                value={formData.groupCode}
                onChange={(e) => setFormData({ ...formData, groupCode: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600 text-xs sm:text-sm font-mono-num"
              />
            </div>
            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Regional</label>
              <input
                type="text"
                required
                value={formData.regional}
                onChange={(e) => setFormData({ ...formData, regional: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600 text-xs sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Centro de Formación</label>
            <input
              type="text"
              required
              value={formData.trainingCenter}
              onChange={(e) => setFormData({ ...formData, trainingCenter: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600 text-xs sm:text-sm"
            />
          </div>

          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium rounded-xl text-xs transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl text-xs transition-colors shadow-sm"
            >
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
