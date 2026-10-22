/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { InductionPlanView } from './components/InductionPlanView';
import { ModulesView } from './components/ModulesView';
import { AdaptiveSimulatorView } from './components/AdaptiveSimulatorView';
import { GamifiedQuizView } from './components/GamifiedQuizView';
import { CertificateView } from './components/CertificateView';
import { SpreadsheetView } from './components/SpreadsheetView';
import { RuleExplorerModal } from './components/RuleExplorerModal';
import { ProfileModal } from './components/ProfileModal';
import { SpreadsheetStructureModal } from './components/SpreadsheetStructureModal';
import {
  DEFAULT_APPRENTICE,
  INITIAL_APPRENTICES_ROSTER,
  INDUCTION_PLAN,
  MODULES_DATA,
  SIMULATION_CASES,
  QUIZ_QUESTIONS,
} from './data/senaData';
import { ApprenticeProfile, ApprenticeRecord, CertificateData, UserRole } from './types/induction';
import { syncStudentRecordToGoogleSheets } from './services/sheetSyncService';
import { InstructorAuthModal } from './components/InstructorAuthModal';
import { RoleSelectionLanding } from './components/RoleSelectionLanding';
import { InductionManualModal } from './components/InductionManualModal';
import { FloatingVideoModal } from './components/FloatingVideoModal';

export default function App() {
  // Role State (Instructor with admin privileges vs. Apprentice)
  const [userRole, setUserRole] = useState<UserRole>(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const roleParam = params.get('rol') || params.get('role');
      if (roleParam === 'aprendiz') {
        return 'aprendiz';
      }
      const saved = localStorage.getItem('sena_user_role');
      if (saved === 'aprendiz' || saved === 'instructor') {
        return saved;
      }
      return 'instructor';
    } catch {
      return 'instructor';
    }
  });

  // Dedicated Landing Page State for selecting role and avoiding screen confusion
  const [isLandingActive, setIsLandingActive] = useState<boolean>(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      if (params.get('portal') === 'true' || params.get('landing') === 'true') {
        return true;
      }
      // If user comes via direct learner URL (?rol=aprendiz), show the landing with characterization view
      if (params.get('rol') === 'aprendiz' || params.get('role') === 'aprendiz') {
        return true;
      }
      const sessionActive = sessionStorage.getItem('sena_session_active');
      return sessionActive !== 'true';
    } catch {
      return true;
    }
  });

  const initialRoleView = (() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const r = params.get('rol') || params.get('role');
      if (r === 'aprendiz') return 'aprendiz';
      if (r === 'instructor') return 'instructor';
      return 'select';
    } catch {
      return 'select';
    }
  })();

  const [isInstructorAuthOpen, setIsInstructorAuthOpen] = useState(false);
  const [isManualModalOpen, setIsManualModalOpen] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [roleToastMessage, setRoleToastMessage] = useState<string | null>(null);

  // Navigation State
  const [currentTab, setCurrentTab] = useState<
    'plan' | 'modules' | 'simulator' | 'quiz' | 'certificate' | 'spreadsheet'
  >('plan');
  const [targetedModuleId, setTargetedModuleId] = useState<string | undefined>();

  // Role switching handlers
  const handleSwitchToLearner = () => {
    setUserRole('aprendiz');
    try {
      localStorage.setItem('sena_user_role', 'aprendiz');
    } catch {
      // storage unavailable
    }
    if (currentTab === 'spreadsheet') {
      setCurrentTab('plan');
    }
    setRoleToastMessage('Modo Aprendiz activado. La planilla y configuraciones administrativas están protegidas.');
    setTimeout(() => setRoleToastMessage(null), 4500);
  };

  const handleRequestInstructorAccess = () => {
    setIsInstructorAuthOpen(true);
  };

  const handleInstructorAuthSuccess = () => {
    setUserRole('instructor');
    try {
      localStorage.setItem('sena_user_role', 'instructor');
      sessionStorage.setItem('sena_session_active', 'true');
    } catch {
      // storage unavailable
    }
    setIsLandingActive(false);
    setRoleToastMessage('¡Acceso concedido! Bienvenido al panel de gestión del Instructor.');
    setTimeout(() => setRoleToastMessage(null), 4500);
  };

  const handleExitToLanding = () => {
    try {
      sessionStorage.removeItem('sena_session_active');
    } catch {
      // storage unavailable
    }
    setIsLandingActive(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCopyLearnerLink = () => {
    const learnerUrl = `${window.location.origin}${window.location.pathname}?rol=aprendiz`;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(learnerUrl).then(
        () => {
          setRoleToastMessage('¡Enlace de caracterización para aprendices copiado! (?rol=aprendiz)');
          setTimeout(() => setRoleToastMessage(null), 4500);
        },
        () => {
          prompt('Copia este enlace para compartir a los aprendices:', learnerUrl);
        }
      );
    } else {
      prompt('Copia este enlace para compartir a los aprendices:', learnerUrl);
    }
  };

  // Dark Mode State
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    try {
      const savedTheme = localStorage.getItem('sena_dark_mode');
      if (savedTheme !== null) {
        return savedTheme === 'true';
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch {
      return false;
    }
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    try {
      localStorage.setItem('sena_dark_mode', String(isDarkMode));
    } catch {
      // storage unavailable
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  // Modals
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSpreadsheetModalOpen, setIsSpreadsheetModalOpen] = useState(false);

  // Persistent Cohort Roster (The Master Spreadsheet)
  const [roster, setRoster] = useState<ApprenticeRecord[]>(() => {
    try {
      const saved = localStorage.getItem('sena_apprentices_roster');
      return saved ? JSON.parse(saved) : INITIAL_APPRENTICES_ROSTER;
    } catch {
      return INITIAL_APPRENTICES_ROSTER;
    }
  });

  const [activeApprenticeId, setActiveApprenticeId] = useState<string>(() => {
    try {
      const saved = localStorage.getItem('sena_active_apprentice_id');
      return saved || 'app-01';
    } catch {
      return 'app-01';
    }
  });

  // Current Active Apprentice Data
  const currentStudentRecord =
    roster.find((a) => a.id === activeApprenticeId) || roster[0] || INITIAL_APPRENTICES_ROSTER[0];

  const [apprentice, setApprentice] = useState<ApprenticeProfile>({
    name: currentStudentRecord.name,
    documentType: currentStudentRecord.documentType,
    documentNumber: currentStudentRecord.documentNumber,
    trainingProgram: currentStudentRecord.trainingProgram,
    groupCode: currentStudentRecord.groupCode,
    regional: currentStudentRecord.regional,
    trainingCenter: currentStudentRecord.trainingCenter,
    email: currentStudentRecord.email,
  });

  const [completedModuleIds, setCompletedModuleIds] = useState<string[]>(
    currentStudentRecord.completedModuleIds
  );
  const [resolvedCaseIds, setResolvedCaseIds] = useState<string[]>(
    currentStudentRecord.resolvedCaseIds
  );
  const [quizScore, setQuizScore] = useState<number | null>(
    currentStudentRecord.quizScore
  );
  const [totalXp, setTotalXp] = useState<number>(currentStudentRecord.totalXp);

  // Sync roster with LocalStorage
  useEffect(() => {
    localStorage.setItem('sena_apprentices_roster', JSON.stringify(roster));
  }, [roster]);

  useEffect(() => {
    localStorage.setItem('sena_active_apprentice_id', activeApprenticeId);
  }, [activeApprenticeId]);

  // When active student changes, load their data
  const handleSelectApprenticeFromRoster = (apprenticeId: string) => {
    const student = roster.find((a) => a.id === apprenticeId);
    if (!student) return;

    setActiveApprenticeId(apprenticeId);
    setApprentice({
      name: student.name,
      documentType: student.documentType,
      documentNumber: student.documentNumber,
      trainingProgram: student.trainingProgram,
      groupCode: student.groupCode,
      regional: student.regional,
      trainingCenter: student.trainingCenter,
      email: student.email,
    });
    setCompletedModuleIds(student.completedModuleIds);
    setResolvedCaseIds(student.resolvedCaseIds);
    setQuizScore(student.quizScore);
    setTotalXp(student.totalXp);
  };

  // Helper to update active student record inside the spreadsheet roster
  const updateCurrentStudentRecordInRoster = (
    updates: Partial<ApprenticeRecord>
  ) => {
    setRoster((prev) =>
      prev.map((item) => {
        if (item.id === activeApprenticeId) {
          const updatedRecord = { ...item, ...updates };
          return updatedRecord;
        }
        return item;
      })
    );
  };

  // Actions with Automatic Cloud Sync Trigger
  const handleCompleteModule = (moduleId: string) => {
    if (!completedModuleIds.includes(moduleId)) {
      const newModules = [...completedModuleIds, moduleId];
      const newXp = totalXp + 200;
      setCompletedModuleIds(newModules);
      setTotalXp(newXp);

      const updatedFields = {
        completedModuleIds: newModules,
        completedModulesCount: newModules.length,
        totalXp: newXp,
      };

      updateCurrentStudentRecordInRoster(updatedFields);

      // Automatic Sync to Google Sheets
      const fullRecord = {
        ...currentStudentRecord,
        ...updatedFields,
      };
      syncStudentRecordToGoogleSheets(fullRecord, `Módulo 0${newModules.length} Aprobado`);
    }
  };

  const handleResolveCase = (caseId: string, earnedXp: number) => {
    if (!resolvedCaseIds.includes(caseId)) {
      const newCases = [...resolvedCaseIds, caseId];
      const newXp = totalXp + Math.max(0, earnedXp);
      setResolvedCaseIds(newCases);
      setTotalXp(newXp);

      const updatedFields = {
        resolvedCaseIds: newCases,
        resolvedCasesCount: newCases.length,
        totalXp: newXp,
      };

      updateCurrentStudentRecordInRoster(updatedFields);

      // Automatic Sync to Google Sheets
      const fullRecord = {
        ...currentStudentRecord,
        ...updatedFields,
      };
      syncStudentRecordToGoogleSheets(fullRecord, `Reto Adaptativo 0${newCases.length} Resuelto`);
    }
  };

  const handleSaveQuizResult = (scorePercent: number) => {
    const isPass = scorePercent >= 80;
    const newXp = isPass ? totalXp + 500 : totalXp;
    const certCode = isPass
      ? `SENA-IND-2026-${apprentice.groupCode.slice(-4)}-${apprentice.documentNumber.slice(-4)}`
      : 'PENDIENTE_REINTENTO';

    setQuizScore(scorePercent);
    if (isPass) {
      setTotalXp(newXp);
    }

    const updatedFields = {
      quizScore: scorePercent,
      totalXp: newXp,
      status: (isPass ? 'APROBADO' : 'EN CURSO') as 'APROBADO' | 'EN CURSO',
      verificationCode: certCode,
    };

    updateCurrentStudentRecordInRoster(updatedFields);

    // Automatic Sync to Google Sheets
    const fullRecord = {
      ...currentStudentRecord,
      ...updatedFields,
    };
    syncStudentRecordToGoogleSheets(fullRecord, `Evaluación Final: ${scorePercent}% (${updatedFields.status})`);
  };

  const handleSaveProfile = (updated: ApprenticeProfile) => {
    setApprentice(updated);
    const updatedFields = {
      name: updated.name,
      documentType: updated.documentType,
      documentNumber: updated.documentNumber,
      trainingProgram: updated.trainingProgram,
      groupCode: updated.groupCode,
      regional: updated.regional,
      trainingCenter: updated.trainingCenter,
      email: updated.email,
    };
    updateCurrentStudentRecordInRoster(updatedFields);

    syncStudentRecordToGoogleSheets(
      { ...currentStudentRecord, ...updatedFields },
      'Actualización de Perfil del Aprendiz'
    );
  };

  const handleAddApprenticeToRoster = (newStudentData: Omit<ApprenticeRecord, 'id'>) => {
    const newId = `app-${Date.now()}`;
    const newRecord: ApprenticeRecord = {
      ...newStudentData,
      id: newId,
    };
    setRoster((prev) => [newRecord, ...prev]);
    handleSelectApprenticeFromRoster(newId);

    // Automatic Sync to Google Sheets
    syncStudentRecordToGoogleSheets(newRecord, 'Nuevo Aprendiz Matriculado en Ficha');
  };

  const handleDeleteApprenticeFromRoster = (apprenticeId: string) => {
    setRoster((prev) => prev.filter((a) => a.id !== apprenticeId));
    if (activeApprenticeId === apprenticeId) {
      const remaining = roster.filter((a) => a.id !== apprenticeId);
      if (remaining.length > 0) {
        handleSelectApprenticeFromRoster(remaining[0].id);
      }
    }
  };

  const handleGoToModule = (moduleId: string) => {
    setTargetedModuleId(moduleId);
    setCurrentTab('modules');
    window.scrollTo({ top: 380, behavior: 'smooth' });
  };

  const isCertified = (quizScore ?? 0) >= 80;

  // Format Current Date in Spanish
  const todayFormatted = new Intl.DateTimeFormat('es-CO', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date());

  const certificateData: CertificateData = {
    certificateId: `SENA-IND-${apprentice.groupCode}`,
    apprenticeName: apprentice.name,
    documentType: apprentice.documentType,
    documentNumber: apprentice.documentNumber,
    trainingProgram: apprentice.trainingProgram,
    groupCode: apprentice.groupCode,
    regional: apprentice.regional,
    trainingCenter: apprentice.trainingCenter,
    issueDate: todayFormatted,
    scorePercent: quizScore ?? 90,
    completedHours: 40,
    verificationCode: `SENA-IND-2026-${apprentice.groupCode.slice(-4)}-${apprentice.documentNumber.slice(-4)}`,
  };

  // Landing Page Selection Handlers
  const handleSelectInstructorFromLanding = () => {
    setUserRole('instructor');
    try {
      localStorage.setItem('sena_user_role', 'instructor');
      sessionStorage.setItem('sena_session_active', 'true');
    } catch {
      // storage unavailable
    }
    setIsLandingActive(false);
    setRoleToastMessage('¡Acceso concedido! Bienvenido al panel de gestión del Instructor.');
    setTimeout(() => setRoleToastMessage(null), 4500);
  };

  const handleSelectLearnerFromLanding = (profile: ApprenticeProfile) => {
    setUserRole('aprendiz');
    try {
      localStorage.setItem('sena_user_role', 'aprendiz');
      sessionStorage.setItem('sena_session_active', 'true');
    } catch {
      // storage unavailable
    }

    // Check if apprentice with this document number already exists in roster
    const existingIndex = roster.findIndex(
      (r) => r.documentNumber.trim() === profile.documentNumber.trim()
    );

    if (existingIndex >= 0) {
      const existing = roster[existingIndex];
      const updatedRecord: ApprenticeRecord = {
        ...existing,
        name: profile.name,
        documentType: profile.documentType,
        trainingProgram: profile.trainingProgram,
        groupCode: profile.groupCode,
        regional: profile.regional,
        trainingCenter: profile.trainingCenter,
        email: profile.email,
      };

      setRoster((prev) =>
        prev.map((r, i) => (i === existingIndex ? updatedRecord : r))
      );
      setActiveApprenticeId(existing.id);
      setApprentice(profile);
      setCompletedModuleIds(existing.completedModuleIds);
      setResolvedCaseIds(existing.resolvedCaseIds);
      setQuizScore(existing.quizScore);
      setTotalXp(existing.totalXp);
      syncStudentRecordToGoogleSheets(updatedRecord, 'Reingreso de Aprendiz a Inducción');
    } else {
      const newId = `app-${Date.now()}`;
      const today = new Intl.DateTimeFormat('es-CO', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      }).format(new Date());

      const newRecord: ApprenticeRecord = {
        id: newId,
        registrationDate: today,
        name: profile.name,
        documentType: profile.documentType,
        documentNumber: profile.documentNumber,
        trainingProgram: profile.trainingProgram,
        groupCode: profile.groupCode,
        regional: profile.regional,
        trainingCenter: profile.trainingCenter,
        email: profile.email,
        completedModulesCount: 0,
        completedModuleIds: [],
        resolvedCasesCount: 0,
        resolvedCaseIds: [],
        quizScore: null,
        totalXp: 100,
        status: 'EN CURSO',
        verificationCode: 'PENDIENTE',
      };

      setRoster((prev) => [newRecord, ...prev]);
      setActiveApprenticeId(newId);
      setApprentice(profile);
      setCompletedModuleIds([]);
      setResolvedCaseIds([]);
      setQuizScore(null);
      setTotalXp(100);

      syncStudentRecordToGoogleSheets(newRecord, 'Registro y Caracterización de Aprendiz');
    }

    setIsLandingActive(false);
    setCurrentTab('plan');
    setRoleToastMessage(`¡Bienvenido(a) a tu inducción SENA, ${profile.name.split(' ')[0]}!`);
    setTimeout(() => setRoleToastMessage(null), 4500);
  };

  // Dedicated Landing Page Screen (to choose role and prevent apprentice/instructor confusion)
  if (isLandingActive) {
    return (
      <>
        <RoleSelectionLanding
          onSelectInstructor={handleSelectInstructorFromLanding}
          onSelectLearner={handleSelectLearnerFromLanding}
          roster={roster}
          isDarkMode={isDarkMode}
          onToggleDarkMode={toggleDarkMode}
          initialRoleView={initialRoleView}
          onOpenManual={() => setIsManualModalOpen(true)}
          onOpenVideoTutorial={() => setIsVideoModalOpen(true)}
        />
        <InductionManualModal
          isOpen={isManualModalOpen}
          onClose={() => setIsManualModalOpen(false)}
        />
        <FloatingVideoModal
          isOpen={isVideoModalOpen}
          onClose={() => setIsVideoModalOpen(false)}
        />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex flex-col font-sans transition-colors duration-200">
      {/* Top Bar following Top Bar Contract (hidden in print) */}
      <div className="no-print">
        <Header
          currentTab={currentTab}
          onSelectTab={(tab) => {
            setCurrentTab(tab);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          apprentice={apprentice}
          userRole={userRole}
          onOpenProfile={() => setIsProfileOpen(true)}
          onOpenSearch={() => setIsSearchOpen(true)}
          onOpenManual={() => setIsManualModalOpen(true)}
          onOpenVideoTutorial={() => setIsVideoModalOpen(true)}
          onRequestInstructorAccess={handleRequestInstructorAccess}
          onSwitchToLearner={handleSwitchToLearner}
          onCopyLearnerLink={handleCopyLearnerLink}
          onExitToLanding={handleExitToLanding}
          isCertified={isCertified}
          isDarkMode={isDarkMode}
          onToggleDarkMode={toggleDarkMode}
        />
      </div>

      {/* Floating Role Feedback Toast */}
      {roleToastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white dark:bg-emerald-950 dark:text-emerald-100 dark:border dark:border-emerald-700 px-4 py-3 rounded-2xl shadow-xl text-xs font-medium flex items-center gap-2.5 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0 animate-ping"></span>
          <span>{roleToastMessage}</span>
        </div>
      )}

      {/* Hero Section (hidden on print and on dedicated certificate & spreadsheet views) */}
      <div className="no-print">
        {currentTab !== 'certificate' && currentTab !== 'spreadsheet' && (
          <Hero
            apprentice={apprentice}
            totalModules={MODULES_DATA.length}
            completedModulesCount={completedModuleIds.length}
            totalCases={SIMULATION_CASES.length}
            completedCasesCount={resolvedCaseIds.length}
            quizScore={quizScore}
            totalXp={totalXp}
            onStartLearning={() => {
              setCurrentTab('modules');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onGoToQuiz={() => {
              setCurrentTab('quiz');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onViewCertificate={() => {
              setCurrentTab('certificate');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenManual={() => setIsManualModalOpen(true)}
            isCertified={isCertified}
          />
        )}
      </div>

      {/* Main Tab Content View Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-10">
        {currentTab === 'plan' && (
          <InductionPlanView
            planPhases={INDUCTION_PLAN}
            onGoToModule={handleGoToModule}
            onGoToSimulator={() => setCurrentTab('simulator')}
            onGoToQuiz={() => setCurrentTab('quiz')}
            onOpenManual={() => setIsManualModalOpen(true)}
          />
        )}

        {currentTab === 'modules' && (
          <ModulesView
            modules={MODULES_DATA}
            completedModuleIds={completedModuleIds}
            onCompleteModule={handleCompleteModule}
            selectedModuleId={targetedModuleId}
            onGoToCases={() => setCurrentTab('simulator')}
          />
        )}

        {currentTab === 'simulator' && (
          <AdaptiveSimulatorView
            cases={SIMULATION_CASES}
            resolvedCaseIds={resolvedCaseIds}
            onResolveCase={handleResolveCase}
            onGoToQuiz={() => setCurrentTab('quiz')}
          />
        )}

        {currentTab === 'quiz' && (
          <GamifiedQuizView
            questions={QUIZ_QUESTIONS}
            savedScore={quizScore}
            onSaveQuizResult={handleSaveQuizResult}
            onViewCertificate={() => setCurrentTab('certificate')}
          />
        )}

        {currentTab === 'spreadsheet' && userRole === 'instructor' && (
          <SpreadsheetView
            roster={roster}
            activeApprenticeId={activeApprenticeId}
            onSelectApprentice={handleSelectApprenticeFromRoster}
            onAddApprentice={handleAddApprenticeToRoster}
            onDeleteApprentice={handleDeleteApprenticeFromRoster}
            onViewCertificate={() => setCurrentTab('certificate')}
          />
        )}

        {currentTab === 'spreadsheet' && userRole === 'aprendiz' && (
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 text-center max-w-md mx-auto my-12 space-y-4">
            <div className="w-12 h-12 bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 rounded-2xl flex items-center justify-center mx-auto text-xl font-bold">
              🔒
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Área Exclusiva del Instructor
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              La planilla de control de aprendices y la sincronización con Google Sheets están reservadas para los instructores de la ficha. Como aprendiz, puedes continuar con tus módulos interactivos, resolver los retos de caso y presentar la evaluación para obtener tu certificado.
            </p>
            <div className="pt-2 flex justify-center gap-3">
              <button
                onClick={() => setCurrentTab('plan')}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold transition-colors"
              >
                Volver al Plan de Inducción
              </button>
              <button
                onClick={handleRequestInstructorAccess}
                className="px-4 py-2 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl text-xs font-medium transition-colors"
              >
                Acceso con Clave Instructor
              </button>
            </div>
          </div>
        )}

        {currentTab === 'certificate' && (
          <CertificateView
            apprentice={apprentice}
            certificateData={certificateData}
            onGoToQuiz={() => setCurrentTab('quiz')}
            isPassed={isCertified}
          />
        )}
      </main>

      {/* Modals */}
      <InstructorAuthModal
        isOpen={isInstructorAuthOpen}
        onClose={() => setIsInstructorAuthOpen(false)}
        onSuccess={handleInstructorAuthSuccess}
      />

      <RuleExplorerModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />

      <ProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        apprentice={apprentice}
        onSave={handleSaveProfile}
      />

      <SpreadsheetStructureModal
        isOpen={isSpreadsheetModalOpen}
        onClose={() => setIsSpreadsheetModalOpen(false)}
        apprentice={apprentice}
        certificateData={certificateData}
        completedModulesCount={completedModuleIds.length}
        totalModulesCount={MODULES_DATA.length}
        completedCasesCount={resolvedCaseIds.length}
        totalCasesCount={SIMULATION_CASES.length}
        quizScore={quizScore}
        totalXp={totalXp}
        isCertified={isCertified}
      />

      <InductionManualModal
        isOpen={isManualModalOpen}
        onClose={() => setIsManualModalOpen(false)}
      />

      <FloatingVideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
      />

      {/* Footer (No-print) */}
      <footer className="no-print border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 mt-16 py-8 text-xs text-slate-500 dark:text-slate-400 transition-colors">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-700 dark:text-slate-200">Servicio Nacional de Aprendizaje — SENA</span>
            <span aria-hidden="true">·</span>
            <span>Reglamento del Aprendiz (Acuerdo 009 de 2024)</span>
          </div>
          <div className="flex items-center gap-4 text-slate-600 dark:text-slate-400">
            <button
              onClick={() => setIsVideoModalOpen(true)}
              className="hover:text-emerald-700 dark:hover:text-emerald-400 underline underline-offset-2 transition-colors font-medium text-emerald-700 dark:text-emerald-400 flex items-center gap-1"
            >
              <span>Video Tutorial</span>
            </button>
            <span aria-hidden="true">·</span>
            <button
              onClick={() => setIsManualModalOpen(true)}
              className="hover:text-emerald-700 dark:hover:text-emerald-400 underline underline-offset-2 transition-colors font-medium text-emerald-700 dark:text-emerald-400"
            >
              Manual de Inducción
            </button>
            <span aria-hidden="true">·</span>
            {userRole === 'instructor' ? (
              <>
                <button
                  onClick={() => {
                    setCurrentTab('spreadsheet');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-emerald-700 dark:hover:text-emerald-400 underline underline-offset-2 transition-colors font-medium"
                >
                  Planilla de Control de Aprendices ({roster.length})
                </button>
                <span aria-hidden="true">·</span>
                <button
                  onClick={() => setIsSpreadsheetModalOpen(true)}
                  className="hover:text-emerald-700 dark:hover:text-emerald-400 underline underline-offset-2 transition-colors"
                >
                  Estructura Hoja de Cálculo
                </button>
                <span aria-hidden="true">·</span>
              </>
            ) : (
              <>
                <button
                  onClick={handleRequestInstructorAccess}
                  className="hover:text-amber-700 dark:hover:text-amber-400 underline underline-offset-2 transition-colors font-medium flex items-center gap-1"
                >
                  🔒 Acceso Instructor
                </button>
                <span aria-hidden="true">·</span>
              </>
            )}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="hover:text-emerald-700 dark:hover:text-emerald-400 underline underline-offset-2 transition-colors"
            >
              Consultar Glosario Normativo
            </button>
            <span aria-hidden="true">·</span>
            <button
              onClick={handleExitToLanding}
              className="text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 underline underline-offset-2 transition-colors font-medium"
            >
              Cambiar Rol / Portal de Acceso
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
