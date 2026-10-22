export type UserRole = 'instructor' | 'aprendiz';

export interface ApprenticeProfile {
  name: string;
  documentType: 'C.C.' | 'T.I.' | 'C.E.' | 'PEP';
  documentNumber: string;
  trainingProgram: string;
  groupCode: string; // Ficha
  regional: string;
  trainingCenter: string;
  email: string;
}

export interface ApprenticeRecord {
  id: string;
  registrationDate: string;
  documentType: 'C.C.' | 'T.I.' | 'C.E.' | 'PEP';
  documentNumber: string;
  name: string;
  email: string;
  trainingProgram: string;
  groupCode: string;
  trainingCenter: string;
  regional: string;
  completedModulesCount: number;
  completedModuleIds: string[];
  resolvedCasesCount: number;
  resolvedCaseIds: string[];
  quizScore: number | null;
  totalXp: number;
  status: 'APROBADO' | 'EN CURSO' | 'NO INICIADO';
  verificationCode: string;
}

export interface KeyArticle {
  article: string;
  title: string;
  content: string;
  keyTakeaway: string;
}

export interface ModuleItem {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  regulationReference: string;
  summary: string;
  keyArticles: KeyArticle[];
  rights?: string[];
  duties?: string[];
  prohibitions?: {
    category: 'Académica' | 'Disciplinaria';
    rule: string;
    impact: string;
  }[];
  dueProcessSteps?: {
    step: number;
    title: string;
    desc: string;
    deadline: string;
  }[];
  practicalAlternatives?: {
    name: string;
    desc: string;
    requirements: string;
  }[];
  interactiveQuickCheck: {
    question: string;
    options: string[];
    answerIndex: number;
    rationale: string;
  };
  xpReward: number;
}

export interface SimulationOption {
  id: string;
  label: string;
  isCorrect: boolean;
  feedback: string;
  consequenceSummary: string;
  xpDelta: number;
}

export interface SimulationCase {
  id: string;
  title: string;
  category: 'Derechos' | 'Deberes e Inasistencias' | 'Faltas y Sanciones' | 'Etapa Práctica' | 'Convivencia y EPP';
  difficulty: 'Básico' | 'Intermedio' | 'Avanzado';
  narrative: string;
  character: {
    name: string;
    role: string;
    badgeLabel: string;
  };
  dilemma: string;
  hint: string;
  regulationBasis: string;
  options: SimulationOption[];
}

export interface QuizQuestion {
  id: string;
  category: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  articleReference: string;
}

export interface InductionPlanPhase {
  phaseNumber: number;
  title: string;
  durationHours: number;
  objective: string;
  competencies: string[];
  activities: {
    name: string;
    deliverable: string;
    duration: string;
  }[];
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  requirement: string;
  icon: string;
}

export interface CertificateData {
  certificateId: string;
  apprenticeName: string;
  documentType: string;
  documentNumber: string;
  trainingProgram: string;
  groupCode: string;
  regional: string;
  trainingCenter: string;
  issueDate: string;
  scorePercent: number;
  completedHours: number;
  verificationCode: string;
}
