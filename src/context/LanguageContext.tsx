import React, { createContext, useContext, useState, useEffect } from 'react';

export type SupportedLanguage = 'es' | 'en' | 'pt' | 'fr';

export interface LanguageInfo {
  code: SupportedLanguage;
  name: string;
  nativeName: string;
  flag: string;
}

export const SUPPORTED_LANGUAGES: LanguageInfo[] = [
  { code: 'es', name: 'Español', nativeName: 'Español (Colombia)', flag: '🇨🇴' },
  { code: 'en', name: 'English', nativeName: 'English (US)', flag: '🇺🇸' },
  { code: 'pt', name: 'Português', nativeName: 'Português (Brasil)', flag: '🇧🇷' },
  { code: 'fr', name: 'Français', nativeName: 'Français', flag: '🇫🇷' },
];

export const translations: Record<SupportedLanguage, Record<string, string>> = {
  es: {
    // Top Bar & General
    'institution.name': 'Servicio Nacional de Aprendizaje — SENA',
    'institution.tagline': 'Inducción Integral de Aprendices',
    'institution.regulation': 'Reglamento del Aprendiz (Acuerdo 009 de 2024) · Portal de Acceso',
    
    // Header Nav Tabs
    'nav.plan': 'Plan Estructurado',
    'nav.modules': 'Módulos',
    'nav.simulator': 'Retos & Casos',
    'nav.quiz': 'Evaluación',
    'nav.spreadsheet': 'Planilla de Aprendices',
    'nav.certificate': 'Certificado',
    'nav.batchBadge': 'Ficha',
    'nav.readyBadge': 'Listo',

    // Roles & Actions
    'role.instructor': 'Instructor',
    'role.learner': 'Aprendiz',
    'role.iAmInstructor': 'Soy Instructor',
    'role.learnerView': 'Vista Aprendiz',
    'role.shareLink': 'Enlace para Aprendices',
    'role.shareLinkCopied': '¡Enlace de aprendiz copiado!',
    'role.portal': 'Portal',
    'role.portalTooltip': 'Cambiar de rol / Salir al portal de acceso',
    
    // Utility Buttons
    'button.tutorial': 'Tutorial',
    'button.tutorialTooltip': 'Ver Video Tutorial de Inducción en Ventana Flotante',
    'button.manual': 'Instructivo',
    'button.manualFull': 'Instructivo del Aprendiz',
    'button.manualTooltip': 'Ver Instructivo y Manual de Inducción Paso a Paso',
    'button.searchTooltip': 'Consultar artículos del reglamento',
    'button.darkMode': 'Modo Oscuro',
    'button.lightMode': 'Modo Claro',
    'button.translator': 'Traductor / Idioma',
    'button.translatorTooltip': 'Escribir y traducir entre español, inglés y otros idiomas',
    'button.close': 'Cerrar',
    'button.copy': 'Copiar',
    'button.copied': '¡Copiado!',
    'button.listen': 'Escuchar',

    // Hero Section
    'hero.title': 'Ruta Integral de Inducción & Apropiación del Reglamento',
    'hero.hours': '40 Horas Lectivas',
    'hero.agreement': 'Acuerdo 009 de 2024',
    'hero.exploreModules': 'Explorar Módulos Normativos',
    'hero.takeQuiz': 'Presentar Evaluación',
    'hero.viewCertificate': 'Ver Certificado',
    'hero.program': 'Programa',
    'hero.batch': 'Ficha / Grupo',
    'hero.regional': 'Regional',

    // Landing Page
    'landing.badge': 'Inducción Integral de Aprendices',
    'landing.headline': '¿Cómo deseas ingresar al sistema?',
    'landing.subheadline': 'Selecciona tu rol para acceder a la plataforma correspondiente y evitar confusiones en tu pantalla.',
    'landing.videoBannerTitle': 'Video Tutorial Explicativo de la Inducción',
    'landing.videoBannerDesc': 'Aprende a navegar el plan, resolver los casos simulados, presentar el quiz y obtener tu certificado oficial.',
    'landing.videoBannerBtn': 'Reproducir en Ventana Flotante',

    // Role Cards
    'roleCard.learnerTitle': 'Aprendiz en Formación',
    'roleCard.learnerSubtitle': 'Acceso sin contraseñas para cursar tu inducción paso a paso.',
    'roleCard.learnerFeature1': '4 módulos interactivos con el Reglamento 2024',
    'roleCard.learnerFeature2': 'Simulador de dilemas éticos y casos reales',
    'roleCard.learnerFeature3': 'Quiz gamificado con certificación descargable',
    'roleCard.learnerBtn': 'Ingresar como Aprendiz',

    'roleCard.instructorTitle': 'Instructor / Coordinador',
    'roleCard.instructorSubtitle': 'Panel pedagógico con planilla de seguimiento y sincronización.',
    'roleCard.instructorFeature1': 'Planilla consolidada de aprendices y notas',
    'roleCard.instructorFeature2': 'Estructura editable y exportación en Excel/Drive',
    'roleCard.instructorFeature3': 'Seguimiento por Ficha de Caracterización',
    'roleCard.instructorBtn': 'Ingresar como Instructor',

    // Forms
    'form.instructorTitle': 'Acceso de Instructor',
    'form.instructorSubtitle': 'Ingresa la clave de acceso de instructor para gestionar la planilla de aprendices.',
    'form.instructorPinLabel': 'Clave o PIN de Instructor',
    'form.instructorPinPlaceholder': 'Ingresa tu clave...',
    'form.instructorPinHelp': 'Clave por defecto: sena1234 o 1234',
    'form.instructorError': 'Clave incorrecta. Por favor verifica e intenta de nuevo.',
    'form.instructorSubmit': 'Verificar e Ingresar a la Planilla',

    'form.learnerTitle': 'Caracterización del Aprendiz',
    'form.learnerSubtitle': 'Ingresa tus datos personales para personalizar tu certificado y registrar tu avance en la planilla.',
    'form.name': 'Nombre Completo',
    'form.docType': 'Tipo de Documento',
    'form.docNum': 'Número de Documento',
    'form.program': 'Programa de Formación',
    'form.groupCode': 'Número de Ficha',
    'form.regional': 'Regional SENA',
    'form.trainingCenter': 'Centro de Formación',
    'form.email': 'Correo Electrónico (MiSENA / Institucional)',
    'form.learnerSubmit': 'Comenzar mi Inducción',
    'form.backToSelect': 'Volver a Selección de Rol',

    // Multilingual Writer Tool
    'writer.title': 'Asistente de Escritura y Traductor Multilingüe',
    'writer.subtitle': 'Escribe y traduce textos de inglés a español (o viceversa) para tus notas, consultas y actividades de inducción.',
    'writer.from': 'De:',
    'writer.to': 'A:',
    'writer.swap': 'Invertir idiomas',
    'writer.inputPlaceholder': 'Escribe aquí el texto que deseas traducir (ej: "What are my rights as a SENA apprentice?")...',
    'writer.outputPlaceholder': 'La traducción aparecerá aquí...',
    'writer.translateBtn': 'Traducir Texto',
    'writer.clearBtn': 'Limpiar',
    'writer.quickPhrasesTitle': 'Términos y Frases Frecuentes de la Inducción SENA',
    'writer.quickHelp': 'Haz clic en cualquier frase para traducirla y copiarla rápidamente.',
  },

  en: {
    // Top Bar & General
    'institution.name': 'National Training Service — SENA',
    'institution.tagline': 'Comprehensive Apprentice Induction',
    'institution.regulation': 'Apprentice Regulations (Agreement 009 of 2024) · Access Portal',
    
    // Header Nav Tabs
    'nav.plan': 'Structured Plan',
    'nav.modules': 'Modules',
    'nav.simulator': 'Challenges & Cases',
    'nav.quiz': 'Assessment',
    'nav.spreadsheet': 'Apprentice Roster',
    'nav.certificate': 'Certificate',
    'nav.batchBadge': 'Batch',
    'nav.readyBadge': 'Ready',

    // Roles & Actions
    'role.instructor': 'Instructor',
    'role.learner': 'Apprentice',
    'role.iAmInstructor': 'I am an Instructor',
    'role.learnerView': 'Apprentice View',
    'role.shareLink': 'Apprentice Link',
    'role.shareLinkCopied': 'Apprentice link copied!',
    'role.portal': 'Portal',
    'role.portalTooltip': 'Switch role / Return to access portal',
    
    // Utility Buttons
    'button.tutorial': 'Tutorial',
    'button.tutorialTooltip': 'Watch Floating Video Induction Tutorial',
    'button.manual': 'User Guide',
    'button.manualFull': 'Apprentice User Guide',
    'button.manualTooltip': 'Open Step-by-Step Induction Guide & Manual',
    'button.searchTooltip': 'Search regulation articles',
    'button.darkMode': 'Dark Mode',
    'button.lightMode': 'Light Mode',
    'button.translator': 'Translator / Language',
    'button.translatorTooltip': 'Write and translate between English, Spanish, and more languages',
    'button.close': 'Close',
    'button.copy': 'Copy',
    'button.copied': 'Copied!',
    'button.listen': 'Listen',

    // Hero Section
    'hero.title': 'Comprehensive Induction & Apprentice Regulations Route',
    'hero.hours': '40 Class Hours',
    'hero.agreement': 'Agreement 009 of 2024',
    'hero.exploreModules': 'Explore Modules',
    'hero.takeQuiz': 'Take Assessment',
    'hero.viewCertificate': 'View Certificate',
    'hero.program': 'Program',
    'hero.batch': 'Batch / Group',
    'hero.regional': 'Regional Office',

    // Landing Page
    'landing.badge': 'Comprehensive Apprentice Induction',
    'landing.headline': 'How would you like to enter the platform?',
    'landing.subheadline': 'Select your role to access the corresponding workspace and avoid any confusion.',
    'landing.videoBannerTitle': 'Induction Explanatory Video Tutorial',
    'landing.videoBannerDesc': 'Learn how to navigate the induction plan, resolve simulated dilemmas, pass the quiz, and earn your official certificate.',
    'landing.videoBannerBtn': 'Play in Floating Window',

    // Role Cards
    'roleCard.learnerTitle': 'Training Apprentice',
    'roleCard.learnerSubtitle': 'Direct access without passwords to complete your induction step-by-step.',
    'roleCard.learnerFeature1': '4 interactive modules covering 2024 Regulations',
    'roleCard.learnerFeature2': 'Simulator for ethical dilemmas and real-life cases',
    'roleCard.learnerFeature3': 'Gamified quiz with official downloadable certificate',
    'roleCard.learnerBtn': 'Enter as Apprentice',

    'roleCard.instructorTitle': 'Instructor / Coordinator',
    'roleCard.instructorSubtitle': 'Pedagogical dashboard with apprentice roster and Google Sheets sync.',
    'roleCard.instructorFeature1': 'Consolidated roster with grades and progress',
    'roleCard.instructorFeature2': 'Customizable structure and export to Excel/Drive',
    'roleCard.instructorFeature3': 'Cohort tracking by Training Batch Code',
    'roleCard.instructorBtn': 'Enter as Instructor',

    // Forms
    'form.instructorTitle': 'Instructor Access',
    'form.instructorSubtitle': 'Enter your instructor passcode to manage the apprentice tracking roster.',
    'form.instructorPinLabel': 'Instructor Passcode / PIN',
    'form.instructorPinPlaceholder': 'Enter passcode...',
    'form.instructorPinHelp': 'Default code: sena1234 or 1234',
    'form.instructorError': 'Incorrect passcode. Please check and try again.',
    'form.instructorSubmit': 'Verify & Open Roster',

    'form.learnerTitle': 'Apprentice Registration',
    'form.learnerSubtitle': 'Enter your personal details to personalize your certificate and record progress in the class roster.',
    'form.name': 'Full Name',
    'form.docType': 'Document Type',
    'form.docNum': 'Document Number',
    'form.program': 'Training Program',
    'form.groupCode': 'Batch Code (Ficha)',
    'form.regional': 'SENA Regional Office',
    'form.trainingCenter': 'Training Center',
    'form.email': 'Email Address (MiSENA / Institutional)',
    'form.learnerSubmit': 'Start My Induction',
    'form.backToSelect': 'Back to Role Selection',

    // Multilingual Writer Tool
    'writer.title': 'Writing Assistant & Multilingual Translator',
    'writer.subtitle': 'Write and translate text from English to Spanish (or vice versa) for your induction notes, inquiries, and assignments.',
    'writer.from': 'From:',
    'writer.to': 'To:',
    'writer.swap': 'Swap languages',
    'writer.inputPlaceholder': 'Type text to translate here (e.g., "What are the apprentice rights according to SENA regulations?")...',
    'writer.outputPlaceholder': 'Translation will appear here...',
    'writer.translateBtn': 'Translate Text',
    'writer.clearBtn': 'Clear',
    'writer.quickPhrasesTitle': 'Common SENA Induction Terms & Phrases',
    'writer.quickHelp': 'Click on any phrase to translate and copy it instantly.',
  },

  pt: {
    // Top Bar & General
    'institution.name': 'Serviço Nacional de Aprendizagem — SENA',
    'institution.tagline': 'Indução Integral de Aprendizes',
    'institution.regulation': 'Regulamento do Aprendiz (Acordo 009 de 2024) · Portal de Acesso',
    
    // Header Nav Tabs
    'nav.plan': 'Plano Estruturado',
    'nav.modules': 'Módulos',
    'nav.simulator': 'Desafios & Casos',
    'nav.quiz': 'Avaliação',
    'nav.spreadsheet': 'Planilha de Aprendizes',
    'nav.certificate': 'Certificado',
    'nav.batchBadge': 'Turma',
    'nav.readyBadge': 'Pronto',

    // Roles & Actions
    'role.instructor': 'Instrutor',
    'role.learner': 'Aprendiz',
    'role.iAmInstructor': 'Sou Instrutor',
    'role.learnerView': 'Vista do Aprendiz',
    'role.shareLink': 'Link para Aprendizes',
    'role.shareLinkCopied': 'Link copiado com sucesso!',
    'role.portal': 'Portal',
    'role.portalTooltip': 'Mudar de perfil / Voltar ao portal',
    
    // Utility Buttons
    'button.tutorial': 'Tutorial',
    'button.tutorialTooltip': 'Assistir Vídeo Tutorial Flutuante',
    'button.manual': 'Instruções',
    'button.manualFull': 'Manual do Aprendiz',
    'button.manualTooltip': 'Ver Manual de Indução Passo a Passo',
    'button.searchTooltip': 'Consultar artigos do regulamento',
    'button.darkMode': 'Modo Escuro',
    'button.lightMode': 'Modo Claro',
    'button.translator': 'Tradutor / Idioma',
    'button.translatorTooltip': 'Escrever e traduzir entre espanhol, inglês e outros idiomas',
    'button.close': 'Fechar',
    'button.copy': 'Copiar',
    'button.copied': 'Copiado!',
    'button.listen': 'Ouvir',

    // Landing Page
    'landing.badge': 'Indução Integral de Aprendizes',
    'landing.headline': 'Como deseja acessar o sistema?',
    'landing.subheadline': 'Selecione seu perfil para acessar o ambiente correto.',
    'landing.videoBannerTitle': 'Vídeo Tutorial Explicativo da Indução',
    'landing.videoBannerDesc': 'Aprenda a navegar pelo plano de indução, resolver dilemas e emitir seu certificado.',
    'landing.videoBannerBtn': 'Reproduzir em Janela Flutuante',

    // Role Cards
    'roleCard.learnerTitle': 'Aprendiz em Formação',
    'roleCard.learnerSubtitle': 'Acesso direto sem senha para realizar sua indução passo a passo.',
    'roleCard.learnerFeature1': '4 módulos interativos com o Regulamento 2024',
    'roleCard.learnerFeature2': 'Simulador de dilemas éticos e casos reais',
    'roleCard.learnerFeature3': 'Quiz gamificado com certificado oficial para download',
    'roleCard.learnerBtn': 'Entrar como Aprendiz',

    'roleCard.instructorTitle': 'Instrutor / Coordenador',
    'roleCard.instructorSubtitle': 'Painel pedagógico com planilha de acompanhamento e sincronização.',
    'roleCard.instructorFeature1': 'Planilha consolidada de aprendizes e notas',
    'roleCard.instructorFeature2': 'Estrutura editável e exportação para Excel/Drive',
    'roleCard.instructorFeature3': 'Acompanhamento por turma de formação',
    'roleCard.instructorBtn': 'Entrar como Instrutor',

    // Forms
    'form.instructorTitle': 'Acesso de Instrutor',
    'form.instructorSubtitle': 'Insira o PIN de instrutor para gerenciar a planilha de aprendizes.',
    'form.instructorPinLabel': 'PIN ou Senha de Instrutor',
    'form.instructorPinPlaceholder': 'Digite o PIN...',
    'form.instructorPinHelp': 'PIN padrão: sena1234 ou 1234',
    'form.instructorError': 'Senha incorreta. Tente novamente.',
    'form.instructorSubmit': 'Verificar e Acessar Planilha',

    'form.learnerTitle': 'Cadastro do Aprendiz',
    'form.learnerSubtitle': 'Insira seus dados para personalizar o certificado e registrar sua participação.',
    'form.name': 'Nome Completo',
    'form.docType': 'Tipo de Documento',
    'form.docNum': 'Número de Documento',
    'form.program': 'Programa de Formação',
    'form.groupCode': 'Código da Turma (Ficha)',
    'form.regional': 'Regional SENA',
    'form.trainingCenter': 'Centro de Formação',
    'form.email': 'E-mail Institucional',
    'form.learnerSubmit': 'Iniciar Minha Indução',
    'form.backToSelect': 'Voltar à Escolha de Perfil',

    // Multilingual Writer Tool
    'writer.title': 'Assistente de Escrita e Tradutor Multilíngue',
    'writer.subtitle': 'Escreva e traduza textos do inglês para o espanhol e outros idiomas.',
    'writer.from': 'De:',
    'writer.to': 'Para:',
    'writer.swap': 'Trocar idiomas',
    'writer.inputPlaceholder': 'Digite aqui o texto para traduzir...',
    'writer.outputPlaceholder': 'A tradução aparecerá aqui...',
    'writer.translateBtn': 'Traduzir Texto',
    'writer.clearBtn': 'Limpar',
    'writer.quickPhrasesTitle': 'Termos e Frases Frequentes do SENA',
    'writer.quickHelp': 'Clique em qualquer frase para traduzir e copiar rapidamente.',
  },

  fr: {
    // Top Bar & General
    'institution.name': 'Service National d\'Apprentissage — SENA',
    'institution.tagline': 'Induction Intégrale des Apprentis',
    'institution.regulation': 'Règlement de l\'Apprenti (Accord 009 de 2024) · Portail d\'Accès',
    
    // Header Nav Tabs
    'nav.plan': 'Plan Structuré',
    'nav.modules': 'Modules',
    'nav.simulator': 'Défis & Cas',
    'nav.quiz': 'Évaluation',
    'nav.spreadsheet': 'Liste des Apprentis',
    'nav.certificate': 'Certificat',
    'nav.batchBadge': 'Promo',
    'nav.readyBadge': 'Prêt',

    // Roles & Actions
    'role.instructor': 'Instructeur',
    'role.learner': 'Apprenti',
    'role.iAmInstructor': 'Je suis Instructeur',
    'role.learnerView': 'Vue Apprenti',
    'role.shareLink': 'Lien Apprentis',
    'role.shareLinkCopied': 'Lien copié avec succès !',
    'role.portal': 'Portail',
    'role.portalTooltip': 'Changer de rôle / Revenir au portail',
    
    // Utility Buttons
    'button.tutorial': 'Tutoriel',
    'button.tutorialTooltip': 'Voir le Tutoriel Vidéo Flottant',
    'button.manual': 'Guide',
    'button.manualFull': 'Guide de l\'Apprenti',
    'button.manualTooltip': 'Ouvrir le guide complet de l\'induction',
    'button.searchTooltip': 'Rechercher des articles du règlement',
    'button.darkMode': 'Mode Sombre',
    'button.lightMode': 'Mode Clair',
    'button.translator': 'Traducteur / Langue',
    'button.translatorTooltip': 'Écrire et traduire entre espagnol, anglais et autres langues',
    'button.close': 'Fermer',
    'button.copy': 'Copier',
    'button.copied': 'Copié !',
    'button.listen': 'Écouter',

    // Landing Page
    'landing.badge': 'Induction Intégrale des Apprentis',
    'landing.headline': 'Comment souhaitez-vous entrer sur la plateforme ?',
    'landing.subheadline': 'Sélectionnez votre rôle pour accéder à l\'espace adapté.',
    'landing.videoBannerTitle': 'Tutoriel Vidéo de l\'Induction',
    'landing.videoBannerDesc': 'Découvrez comment naviguer dans le plan, résoudre les cas et obtenir votre certificat.',
    'landing.videoBannerBtn': 'Lire dans une fenêtre flottante',

    // Role Cards
    'roleCard.learnerTitle': 'Apprenti en Formation',
    'roleCard.learnerSubtitle': 'Accès direct sans mot de passe pour suivre votre induction étape par étape.',
    'roleCard.learnerFeature1': '4 modules interactifs avec le Règlement 2024',
    'roleCard.learnerFeature2': 'Simulateur de dilemmes éthiques et cas réels',
    'roleCard.learnerFeature3': 'Quiz gamifié avec certificat officiel téléchargeable',
    'roleCard.learnerBtn': 'Entrer comme Apprenti',

    'roleCard.instructorTitle': 'Instructeur / Coordinateur',
    'roleCard.instructorSubtitle': 'Tableau de bord pédagogique avec suivi et synchronisation.',
    'roleCard.instructorFeature1': 'Liste consolidée des apprentis et notes',
    'roleCard.instructorFeature2': 'Structure modifiable et export Excel/Drive',
    'roleCard.instructorFeature3': 'Suivi par code de cohorte (Ficha)',
    'roleCard.instructorBtn': 'Entrer comme Instructeur',

    // Forms
    'form.instructorTitle': 'Accès Instructeur',
    'form.instructorSubtitle': 'Entrez le code d\'accès instructeur pour gérer la liste.',
    'form.instructorPinLabel': 'Code PIN Instructeur',
    'form.instructorPinPlaceholder': 'Entrez le mot de passe...',
    'form.instructorPinHelp': 'Code par défaut : sena1234 ou 1234',
    'form.instructorError': 'Code incorrect. Veuillez réessayer.',
    'form.instructorSubmit': 'Vérifier et Accéder',

    'form.learnerTitle': 'Inscription de l\'Apprenti',
    'form.learnerSubtitle': 'Saisissez vos coordonnées pour personnaliser votre certificat.',
    'form.name': 'Nom et Prénom',
    'form.docType': 'Type de Document',
    'form.docNum': 'Numéro de Document',
    'form.program': 'Programme de Formation',
    'form.groupCode': 'Numéro de Cohorte (Ficha)',
    'form.regional': 'Régionale SENA',
    'form.trainingCenter': 'Centre de Formation',
    'form.email': 'Courriel Institutionnel',
    'form.learnerSubmit': 'Commencer Mon Induction',
    'form.backToSelect': 'Retour au Choix du Rôle',

    // Multilingual Writer Tool
    'writer.title': 'Assistant d\'Écriture et Traducteur',
    'writer.subtitle': 'Écrivez et traduisez des textes de l\'anglais vers l\'espagnol ou toute autre langue.',
    'writer.from': 'De :',
    'writer.to': 'À :',
    'writer.swap': 'Inverser les langues',
    'writer.inputPlaceholder': 'Tapez votre texte ici...',
    'writer.outputPlaceholder': 'La traduction s\'affichera ici...',
    'writer.translateBtn': 'Traduire le Texte',
    'writer.clearBtn': 'Effacer',
    'writer.quickPhrasesTitle': 'Termes et Phrases Fréquents du SENA',
    'writer.quickHelp': 'Cliquez sur une phrase pour la traduire et la copier.',
  },
};

interface LanguageContextType {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  t: (key: string, defaultText?: string) => string;
  supportedLanguages: LanguageInfo[];
  isTranslatorOpen: boolean;
  setIsTranslatorOpen: (open: boolean) => void;
  openTranslatorWithText?: (text: string, from?: SupportedLanguage, to?: SupportedLanguage) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<SupportedLanguage>(() => {
    try {
      const saved = localStorage.getItem('sena_app_lang') as SupportedLanguage;
      if (saved && (saved === 'es' || saved === 'en' || saved === 'pt' || saved === 'fr')) {
        return saved;
      }
      return 'es';
    } catch {
      return 'es';
    }
  });

  const [isTranslatorOpen, setIsTranslatorOpen] = useState(false);

  const setLanguage = (lang: SupportedLanguage) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('sena_app_lang', lang);
    } catch {
      // storage unavailable
    }
  };

  const t = (key: string, defaultText?: string): string => {
    const langDict = translations[language];
    if (langDict && langDict[key]) {
      return langDict[key];
    }
    // Fallback to Spanish dictionary
    if (translations.es && translations.es[key]) {
      return translations.es[key];
    }
    return defaultText || key;
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
        supportedLanguages: SUPPORTED_LANGUAGES,
        isTranslatorOpen,
        setIsTranslatorOpen,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
