// MedFormation App - Medical Education SaaS Platform

// Global state management
const AppState = {
  currentUser: null,
  currentPage: 'landing',
  isAuthenticated: false,
  courses: [],
  qcmQuestions: [],
  ecosSheets: [],
  userProgress: {
    videosWatched: 0,
    qcmCompleted: 0,
    successRate: 0,
    streak: 0,
    lastActivity: null
  },
  currentQcmSession: {
    questions: [],
    currentIndex: 0,
    answers: [],
    mode: 'training', // 'training' or 'exam'
    startTime: null,
    timeLimit: null
  }
};

// Sample data initialization
function initializeData() {
  // Sample users
  AppState.sampleUsers = [
    {
      id: 1,
      email: "student@med.fr",
      password: "demo123",
      first_name: "Sophie",
      last_name: "Martin",
      promotion: "DFASM3",
      medical_school: "Université Paris Cité",
      role: "student",
      subscription_status: "free",
      subscription_plan: "none",
      created_at: new Date('2024-01-15')
    },
    {
      id: 2,
      email: "premium@med.fr",
      password: "demo123",
      first_name: "Thomas",
      last_name: "Dubois",
      promotion: "DFASM2",
      medical_school: "Université Lyon 1",
      role: "student",
      subscription_status: "active",
      subscription_plan: "yearly",
      created_at: new Date('2023-09-01')
    }
  ];

  // Sample courses
  AppState.courses = [
    {
      id: 1,
      title: "Introduction à l'ECG - Les bases",
      specialty: "Cardiologie",
      topic: "ECG",
      difficulty: "Facile",
      duration: 780, // in seconds
      is_free: true,
      description: "Apprenez les principes fondamentaux de la lecture d'un ECG. Ce cours couvre l'anatomie cardiaque, la genèse de l'ECG et l'interprétation des principales anomalies.",
      thumbnail: "📈",
      video_url: "#", // Placeholder
      pdf_url: "#",
      created_at: new Date('2024-01-10'),
      views: 1250,
      rating: 4.8
    },
    {
      id: 2,
      title: "Insuffisance cardiaque - Diagnostic et prise en charge",
      specialty: "Cardiologie",
      topic: "Insuffisance cardiaque",
      difficulty: "Moyen",
      duration: 900,
      is_free: false,
      description: "Diagnostic clinique et paraclinique de l'insuffisance cardiaque. Stratégies thérapeutiques selon les recommandations ESC 2023.",
      thumbnail: "💓",
      video_url: "#",
      pdf_url: "#",
      created_at: new Date('2024-01-08'),
      views: 890,
      rating: 4.9
    },
    {
      id: 3,
      title: "Arythmies cardiaques courantes",
      specialty: "Cardiologie",
      topic: "Arythmies",
      difficulty: "Moyen",
      duration: 840,
      is_free: true,
      description: "Fibrillation auriculaire, flutter, tachycardies : diagnostic différentiel et prise en charge d'urgence.",
      thumbnail: "⚡",
      video_url: "#",
      pdf_url: "#",
      created_at: new Date('2024-01-05'),
      views: 750,
      rating: 4.7
    },
    {
      id: 4,
      title: "Hypertension artérielle - Stratégie diagnostique",
      specialty: "Cardiologie",
      topic: "HTA",
      difficulty: "Facile",
      duration: 720,
      is_free: false,
      description: "Mesure de la pression artérielle, bilan initial et stratification du risque cardiovasculaire.",
      thumbnail: "🩺",
      video_url: "#",
      pdf_url: "#",
      created_at: new Date('2024-01-03'),
      views: 680,
      rating: 4.6
    },
    {
      id: 5,
      title: "Syndrome coronarien aigu - Prise en charge",
      specialty: "Cardiologie",
      topic: "SCA",
      difficulty: "Difficile",
      duration: 1080,
      is_free: false,
      description: "STEMI et NSTEMI : diagnostic, stratification du risque et prise en charge selon les dernières recommandations.",
      thumbnail: "🚨",
      video_url: "#",
      pdf_url: "#",
      created_at: new Date('2024-01-01'),
      views: 950,
      rating: 4.9
    }
  ];

  // Sample QCM questions
  AppState.qcmQuestions = [
    {
      id: 1,
      question_text: "Un patient de 65 ans présente une douleur thoracique constrictive. L'ECG montre un sus-décalage du segment ST en antérieur. Quelle est la prise en charge immédiate ?",
      specialty: "Cardiologie",
      topic: "Syndrome coronarien aigu",
      difficulty: "Moyen",
      format: "QI",
      correct_answer: "B",
      option_a: "Aspirine + clopidogrel puis observation",
      option_b: "Aspirine + coronarographie en urgence",
      option_c: "Thrombolyse puis coronarographie à 48h",
      option_d: "ECG de contrôle dans 1 heure",
      explanation: "En cas de STEMI, la prise en charge recommandée est l'angioplastie primaire en urgence (dans les 120 minutes) avec aspirine en préhospitalier. La thrombolyse n'est indiquée qu'en cas d'impossibilité d'angioplastie dans les délais.",
      references: "ESC Guidelines 2023 - Acute Coronary Syndromes",
      is_free: true,
      created_at: new Date('2024-01-15')
    },
    {
      id: 2,
      question_text: "Quelle est la valeur normale de la fraction d'éjection du ventricule gauche ?",
      specialty: "Cardiologie",
      topic: "Échocardiographie",
      difficulty: "Facile",
      format: "QI",
      correct_answer: "C",
      option_a: "30-40%",
      option_b: "40-50%",
      option_c: "≥ 50%",
      option_d: "≥ 70%",
      explanation: "La fraction d'éjection normale du ventricule gauche est ≥ 50%. Une FEVG entre 40-49% définit l'insuffisance cardiaque à fraction d'éjection modérément altérée.",
      references: "Recommandations ESC 2023 - Heart Failure",
      is_free: true,
      created_at: new Date('2024-01-14')
    },
    {
      id: 3,
      title: "Fibrillation auriculaire - Anticoagulation",
      question_text: "Pour un patient de 72 ans en fibrillation auriculaire avec un score CHA2DS2-VASc à 4, quelle est la stratégie anticoagulante recommandée ?",
      specialty: "Cardiologie",
      topic: "Fibrillation auriculaire",
      difficulty: "Moyen",
      format: "QI",
      correct_answer: "A",
      option_a: "Anticoagulant oral direct (AOD)",
      option_b: "Aspirine 75mg/j",
      option_c: "Clopidogrel 75mg/j",
      option_d: "Aucun traitement anticoagulant",
      explanation: "Avec un CHA2DS2-VASc ≥ 2, l'anticoagulation orale est recommandée. Les AOD sont préférés aux AVK en première intention sauf contre-indication.",
      references: "ESC Guidelines 2023 - Atrial Fibrillation",
      is_free: false,
      created_at: new Date('2024-01-13')
    }
    // Add more QCM questions...
  ];

  // Sample ECOS sheets
  AppState.ecosSheets = [
    {
      id: 1,
      title: "Consultation d'annonce - Infarctus du myocarde",
      specialty: "Cardiologie",
      competency: "Communication",
      difficulty: "Moyen",
      duration: 15, // minutes
      context: "Patient de 58 ans, ouvrier, hospitalisé depuis 2 jours pour IDM antérieur traité par angioplastie primaire. Évolution favorable. Vous devez lui annoncer le diagnostic et expliquer la maladie.",
      objectives: [
        "Annoncer un diagnostic grave avec tact",
        "Évaluer la compréhension du patient",
        "Proposer un plan de soins et de suivi",
        "Rassurer et soutenir le patient"
      ],
      scenario: "Le patient vous demande pourquoi il a été hospitalisé et s'inquiète pour son avenir professionnel.",
      evaluation_grid: {
        "Accueil et présentation": 2,
        "Annonce progressive du diagnostic": 3,
        "Écoute et empathie": 2,
        "Explications adaptées au patient": 3,
        "Plan de soins et suivi": 3,
        "Gestion des questions/inquiétudes": 2
      },
      common_mistakes: [
        "Annoncer le diagnostic de manière brutale",
        "Utiliser un jargon médical incompréhensible",
        "Ne pas laisser le patient s'exprimer",
        "Minimiser la gravité ou dramatiser",
        "Oublier d'évaluer la compréhension"
      ],
      key_points: [
        "Environnement calme et confidentiel",
        "Annonce en plusieurs étapes",
        "Reformulation et vérification",
        "Soutien psychologique",
        "Information sur le pronostic"
      ],
      is_free: true,
      created_at: new Date('2024-01-12')
    },
    {
      id: 2,
      title: "Examen cardiovasculaire complet",
      specialty: "Cardiologie",
      competency: "Examen clinique",
      difficulty: "Facile",
      duration: 10,
      context: "Patient de 45 ans consultant pour dyspnée d'effort. Réalisez un examen cardiovasculaire complet.",
      objectives: [
        "Inspection générale",
        "Palpation des pouls",
        "Auscultation cardiaque systématique",
        "Recherche de signes d'insuffisance cardiaque"
      ],
      scenario: "Patient stable, coopérant. Matériel disponible : stéthoscope, tensiomètre.",
      evaluation_grid: {
        "Présentation et installation": 1,
        "Inspection générale": 2,
        "Palpation des pouls": 2,
        "Auscultation cardiaque": 4,
        "Mesure de la PA": 1,
        "Recherche de signes d'IC": 3,
        "Synthèse": 2
      },
      common_mistakes: [
        "Oublier de se présenter",
        "Examen dans le désordre",
        "Auscultation incomplète (oublier un foyer)",
        "Ne pas faire varier les positions",
        "Oublier l'examen pulmonaire"
      ],
      key_points: [
        "Examen méthodique et systématique",
        "4 foyers d'auscultation cardiaque",
        "Positions : décubitus, assise, debout",
        "Recherche de souffles et de galop",
        "Signes périphériques d'insuffisance cardiaque"
      ],
      is_free: true,
      created_at: new Date('2024-01-10')
    }
    // Add more ECOS sheets...
  ];

  // Initialize user progress for demo
  AppState.userProgress = {
    videosWatched: 12,
    qcmCompleted: 45,
    successRate: 78,
    streak: 7,
    lastActivity: new Date(),
    watchedCourses: [1, 3], // Course IDs
    completedQcm: [1, 2], // QCM IDs
    studiedEcos: [1] // ECOS IDs
  };
}

// Utility functions
function formatDuration(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  if (minutes >= 60) {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}min`;
  }
  return `${minutes}min ${remainingSeconds}s`;
}

function formatDate(date) {
  return new Intl.DateTimeFormat('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
}

function getDifficultyColor(difficulty) {
  switch (difficulty.toLowerCase()) {
    case 'facile': return '#10B981';
    case 'moyen': return '#F59E0B';
    case 'difficile': return '#EF4444';
    default: return '#6B7280';
  }
}

// Toast notification system
function showToast(message, type = 'info', title = '') {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = `toast toast--${type}`;
  
  const icon = {
    success: '✅',
    error: '❌',
    info: 'ℹ️',
    warning: '⚠️'
  }[type] || 'ℹ️';

  toast.innerHTML = `
    <div class="toast-icon">${icon}</div>
    <div class="toast-content">
      ${title ? `<div class="toast-title">${title}</div>` : ''}
      <div class="toast-message">${message}</div>
    </div>
  `;

  container.appendChild(toast);
  
  // Auto remove after 5 seconds
  setTimeout(() => {
    if (toast.parentNode) {
      toast.parentNode.removeChild(toast);
    }
  }, 5000);

  // Click to dismiss
  toast.addEventListener('click', () => {
    if (toast.parentNode) {
      toast.parentNode.removeChild(toast);
    }
  });
}

// Page management
function showPage(pageName, ...args) {
  // Hide all pages
  const pages = document.querySelectorAll('.page');
  pages.forEach(page => page.style.display = 'none');

  // Show the requested page
  const targetPage = document.getElementById(`${pageName}-page`);
  if (targetPage) {
    targetPage.style.display = 'block';
    AppState.currentPage = pageName;

    // Load page content based on page type
    switch (pageName) {
      case 'dashboard':
        loadDashboard();
        break;
      case 'courses':
        loadCoursesPage();
        break;
      case 'course-detail':
        loadCourseDetail(args[0]);
        break;
      case 'qcm':
        loadQcmPage();
        break;
      case 'qcm-training':
        loadQcmTraining();
        break;
      case 'qcm-exam':
        loadQcmExam();
        break;
      case 'ecos':
        loadEcosPage();
        break;
      case 'ecos-detail':
        loadEcosDetail(args[0]);
        break;
      case 'progress':
        loadProgressPage();
        break;
      case 'account':
        loadAccountPage();
        break;
      case 'pricing':
        loadPricingPage();
        break;
      case 'checkout':
        loadCheckoutPage(args[0]);
        break;
    }

    // Update navigation active state
    updateNavigation(pageName);
  }
}

function updateNavigation(activePage) {
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => {
    item.classList.remove('active');
    if (item.getAttribute('onclick')?.includes(activePage)) {
      item.classList.add('active');
    }
  });
}

// Authentication functions
function handleSignup(event) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  
  const userData = {
    id: AppState.sampleUsers.length + 1,
    email: formData.get('email'),
    password: formData.get('password'),
    first_name: formData.get('first_name'),
    last_name: formData.get('last_name'),
    promotion: formData.get('promotion'),
    medical_school: formData.get('medical_school'),
    role: 'student',
    subscription_status: 'free',
    subscription_plan: 'none',
    created_at: new Date()
  };

  // Add user to sample users (in real app, this would be an API call)
  AppState.sampleUsers.push(userData);
  
  showToast('Compte créé avec succès !', 'success', 'Inscription réussie');
  
  // Auto login the new user
  AppState.currentUser = userData;
  AppState.isAuthenticated = true;
  
  // Redirect to dashboard
  showPage('dashboard');
}

function handleLogin(event) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  
  const email = formData.get('email');
  const password = formData.get('password');
  
  // Find user in sample users
  const user = AppState.sampleUsers.find(u => u.email === email && u.password === password);
  
  if (user) {
    AppState.currentUser = user;
    AppState.isAuthenticated = true;
    
    // Update user name in header
    const userName = document.getElementById('user-name');
    if (userName) {
      userName.textContent = `${user.first_name} ${user.last_name.charAt(0)}.`;
    }
    
    // Update welcome message
    const welcomeName = document.getElementById('welcome-name');
    if (welcomeName) {
      welcomeName.textContent = user.first_name;
    }
    
    showToast('Connexion réussie !', 'success', 'Bienvenue');
    showPage('dashboard');
  } else {
    showToast('Email ou mot de passe incorrect', 'error', 'Erreur de connexion');
  }
}

function logout() {
  AppState.currentUser = null;
  AppState.isAuthenticated = false;
  showToast('Vous avez été déconnecté', 'info', 'Déconnexion');
  showPage('landing');
}

function toggleUserMenu() {
  const dropdown = document.getElementById('user-dropdown');
  dropdown.classList.toggle('show');
}

// Dashboard functions
function loadDashboard() {
  updateDashboardStats();
  updateUpgradeBanner();
}

function updateDashboardStats() {
  // Update stats with current user progress
  document.getElementById('videos-watched').textContent = AppState.userProgress.videosWatched;
  document.getElementById('qcm-completed').textContent = AppState.userProgress.qcmCompleted;
  document.getElementById('success-rate').textContent = `${AppState.userProgress.successRate}%`;
  document.getElementById('streak').textContent = AppState.userProgress.streak;
}

function updateUpgradeBanner() {
  const banner = document.getElementById('upgrade-banner');
  if (AppState.currentUser && AppState.currentUser.subscription_status === 'active') {
    banner.classList.add('hidden');
  } else {
    banner.classList.remove('hidden');
  }
}

// Course functions
function loadCoursesPage() {
  const content = `
    <header class="app-header">
      <div class="header-content">
        <div class="header-left">
          <div class="logo" onclick="showPage('dashboard')">MedFormation</div>
          <div class="search-bar">
            <input type="text" placeholder="Rechercher un cours..." class="search-input" oninput="filterCourses(this.value)">
          </div>
        </div>
        <div class="header-right">
          <div class="notifications"><span class="notification-badge">3</span>🔔</div>
          <div class="user-menu" onclick="toggleUserMenu()">
            <span id="user-name">${AppState.currentUser?.first_name || 'User'} ${AppState.currentUser?.last_name?.charAt(0) || ''}.</span>
            <span class="dropdown-arrow">▼</span>
            <div class="user-dropdown" id="user-dropdown">
              <a href="#" onclick="showPage('account')">Mon compte</a>
              <a href="#" onclick="logout()">Déconnexion</a>
            </div>
          </div>
        </div>
      </div>
    </header>
    
    <div class="app-content">
      <aside class="sidebar">
        <nav class="sidebar-nav">
          <a href="#" class="nav-item" onclick="showPage('dashboard')">
            <span class="nav-icon">🏠</span><span class="nav-text">Dashboard</span>
          </a>
          <a href="#" class="nav-item active" onclick="showPage('courses')">
            <span class="nav-icon">📹</span><span class="nav-text">Cours</span>
          </a>
          <a href="#" class="nav-item" onclick="showPage('qcm')">
            <span class="nav-icon">❓</span><span class="nav-text">QCM</span>
          </a>
          <a href="#" class="nav-item" onclick="showPage('ecos')">
            <span class="nav-icon">📋</span><span class="nav-text">ECOS</span>
          </a>
          <a href="#" class="nav-item" onclick="showPage('progress')">
            <span class="nav-icon">📊</span><span class="nav-text">Progression</span>
          </a>
          <a href="#" class="nav-item" onclick="showPage('account')">
            <span class="nav-icon">⚙️</span><span class="nav-text">Mon Compte</span>
          </a>
        </nav>
      </aside>
      
      <main class="main-content">
        <div class="courses-header">
          <h1>Bibliothèque de cours vidéo</h1>
          <p>Accédez à plus de 500 cours vidéo par spécialité</p>
        </div>
        
        <div class="courses-filters">
          <select class="form-control" style="width: 200px; margin-right: 16px;" onchange="filterCoursesBySpecialty(this.value)">
            <option value="">Toutes les spécialités</option>
            <option value="Cardiologie">Cardiologie</option>
            <option value="Pneumologie">Pneumologie</option>
            <option value="Néphrologie">Néphrologie</option>
            <option value="Gastroentérologie">Gastroentérologie</option>
          </select>
          
          <select class="form-control" style="width: 150px; margin-right: 16px;" onchange="filterCoursesByDifficulty(this.value)">
            <option value="">Toutes difficultés</option>
            <option value="Facile">Facile</option>
            <option value="Moyen">Moyen</option>
            <option value="Difficile">Difficile</option>
          </select>
        </div>
        
        <div class="courses-grid" id="courses-grid">
          ${renderCoursesGrid()}
        </div>
      </main>
    </div>
  `;
  
  document.getElementById('courses-page').innerHTML = content;
}

function renderCoursesGrid() {
  return AppState.courses.map(course => {
    const isLocked = !course.is_free && AppState.currentUser?.subscription_status !== 'active';
    const difficultyColor = getDifficultyColor(course.difficulty);
    
    return `
      <div class="course-card ${isLocked ? 'course-locked' : ''}" onclick="${isLocked ? 'showUpgradeModal()' : `showPage('course-detail', ${course.id})`}">
        <div class="course-thumbnail">
          <div class="course-icon">${course.thumbnail}</div>
          ${isLocked ? '<div class="lock-icon">🔒</div>' : ''}
          <div class="course-duration">${formatDuration(course.duration)}</div>
        </div>
        <div class="course-content">
          <div class="course-specialty">${course.specialty}</div>
          <h3 class="course-title">${course.title}</h3>
          <p class="course-description">${course.description}</p>
          <div class="course-meta">
            <span class="course-difficulty" style="color: ${difficultyColor}">${course.difficulty}</span>
            <span class="course-views">${course.views} vues</span>
            <span class="course-rating">⭐ ${course.rating}</span>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function showUpgradeModal() {
  showToast('Fonctionnalité Premium', 'info', 'Passez à Premium pour accéder à ce contenu');
  setTimeout(() => showPage('pricing'), 1000);
}

// Initialize the app
function initializeApp() {
  initializeData();
  
  // Add event listeners
  document.getElementById('signup-form')?.addEventListener('submit', handleSignup);
  document.getElementById('login-form')?.addEventListener('submit', handleLogin);
  
  // Close user dropdown when clicking outside
  document.addEventListener('click', (event) => {
    const userMenu = document.querySelector('.user-menu');
    const dropdown = document.getElementById('user-dropdown');
    
    if (dropdown && !userMenu?.contains(event.target)) {
      dropdown.classList.remove('show');
    }
  });
  
  // Show landing page by default
  showPage('landing');
}

// Start the app when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeApp);

// QCM Functions
function loadQcmPage() {
  const content = `
    <header class="app-header">
      <div class="header-content">
        <div class="header-left">
          <div class="logo" onclick="showPage('dashboard')">MedFormation</div>
          <div class="search-bar">
            <input type="text" placeholder="Rechercher un QCM..." class="search-input">
          </div>
        </div>
        <div class="header-right">
          <div class="notifications"><span class="notification-badge">3</span>🔔</div>
          <div class="user-menu" onclick="toggleUserMenu()">
            <span id="user-name">${AppState.currentUser?.first_name || 'User'} ${AppState.currentUser?.last_name?.charAt(0) || ''}.</span>
            <span class="dropdown-arrow">▼</span>
            <div class="user-dropdown" id="user-dropdown">
              <a href="#" onclick="showPage('account')">Mon compte</a>
              <a href="#" onclick="logout()">Déconnexion</a>
            </div>
          </div>
        </div>
      </div>
    </header>
    
    <div class="app-content">
      <aside class="sidebar">
        <nav class="sidebar-nav">
          <a href="#" class="nav-item" onclick="showPage('dashboard')">
            <span class="nav-icon">🏠</span><span class="nav-text">Dashboard</span>
          </a>
          <a href="#" class="nav-item" onclick="showPage('courses')">
            <span class="nav-icon">📹</span><span class="nav-text">Cours</span>
          </a>
          <a href="#" class="nav-item active" onclick="showPage('qcm')">
            <span class="nav-icon">❓</span><span class="nav-text">QCM</span>
          </a>
          <a href="#" class="nav-item" onclick="showPage('ecos')">
            <span class="nav-icon">📋</span><span class="nav-text">ECOS</span>
          </a>
          <a href="#" class="nav-item" onclick="showPage('progress')">
            <span class="nav-icon">📊</span><span class="nav-text">Progression</span>
          </a>
          <a href="#" class="nav-item" onclick="showPage('account')">
            <span class="nav-icon">⚙️</span><span class="nav-text">Mon Compte</span>
          </a>
        </nav>
      </aside>
      
      <main class="main-content">
        <div class="qcm-header">
          <h1>Questions à Choix Multiples</h1>
          <p>Testez vos connaissances avec nos QCM interactifs</p>
        </div>
        
        <div class="qcm-stats">
          <div class="stat-card">
            <span class="stat-number">${AppState.qcmQuestions.filter(q => q.is_free || AppState.currentUser?.subscription_status === 'active').length}</span>
            <span class="stat-label">Questions disponibles</span>
          </div>
          <div class="stat-card">
            <span class="stat-number">${AppState.userProgress.qcmCompleted}</span>
            <span class="stat-label">QCM réalisés</span>
          </div>
          <div class="stat-card">
            <span class="stat-number">${AppState.userProgress.successRate}%</span>
            <span class="stat-label">Taux de réussite</span>
          </div>
        </div>
        
        <div class="qcm-modes">
          <div class="mode-card">
            <div class="mode-icon">🎯</div>
            <h3>Mode Entraînement</h3>
            <p>Réponses immédiates avec explications détaillées</p>
            <button class="btn btn--primary" onclick="startQcmTraining()">Commencer l'entraînement</button>
          </div>
          
          <div class="mode-card">
            <div class="mode-icon">⏱️</div>
            <h3>Mode Examen Blanc</h3>
            <p>Session chronométrée, résultats à la fin</p>
            <button class="btn btn--outline" onclick="startQcmExam()">Démarrer un examen</button>
          </div>
        </div>
        
        <div class="qcm-filters">
          <h3>Filtrer par spécialité</h3>
          <div class="specialty-filters">
            <button class="filter-btn active" onclick="filterQcmBySpecialty('')">Toutes</button>
            <button class="filter-btn" onclick="filterQcmBySpecialty('Cardiologie')">Cardiologie</button>
            <button class="filter-btn" onclick="filterQcmBySpecialty('Pneumologie')">Pneumologie</button>
            <button class="filter-btn" onclick="filterQcmBySpecialty('Néphrologie')">Néphrologie</button>
          </div>
        </div>
      </main>
    </div>
  `;
  
  document.getElementById('qcm-page').innerHTML = content;
}

function startQcmTraining() {
  const availableQuestions = AppState.qcmQuestions.filter(q => 
    q.is_free || AppState.currentUser?.subscription_status === 'active'
  );
  
  if (availableQuestions.length === 0) {
    showUpgradeModal();
    return;
  }
  
  // Shuffle questions and take 10
  const shuffled = [...availableQuestions].sort(() => Math.random() - 0.5);
  AppState.currentQcmSession = {
    questions: shuffled.slice(0, Math.min(10, shuffled.length)),
    currentIndex: 0,
    answers: [],
    mode: 'training',
    startTime: new Date(),
    timeLimit: null
  };
  
  showPage('qcm-training');
}

function startQcmExam() {
  const availableQuestions = AppState.qcmQuestions.filter(q => 
    q.is_free || AppState.currentUser?.subscription_status === 'active'
  );
  
  if (availableQuestions.length < 10) {
    showUpgradeModal();
    return;
  }
  
  // Shuffle questions and take 20 for exam
  const shuffled = [...availableQuestions].sort(() => Math.random() - 0.5);
  AppState.currentQcmSession = {
    questions: shuffled.slice(0, Math.min(20, shuffled.length)),
    currentIndex: 0,
    answers: [],
    mode: 'exam',
    startTime: new Date(),
    timeLimit: 30 * 60 * 1000 // 30 minutes
  };
  
  showPage('qcm-exam');
}

function loadQcmTraining() {
  const session = AppState.currentQcmSession;
  const currentQuestion = session.questions[session.currentIndex];
  
  if (!currentQuestion) {
    showPage('qcm');
    return;
  }
  
  const content = `
    <div class="qcm-training-container">
      <div class="qcm-header">
        <button class="btn btn--outline" onclick="showPage('qcm')">← Retour</button>
        <div class="progress-indicator">
          Question ${session.currentIndex + 1} sur ${session.questions.length}
        </div>
      </div>
      
      <div class="question-card">
        <div class="question-meta">
          <span class="specialty">${currentQuestion.specialty}</span>
          <span class="difficulty" style="color: ${getDifficultyColor(currentQuestion.difficulty)}">${currentQuestion.difficulty}</span>
          <span class="format">${currentQuestion.format}</span>
        </div>
        
        <h2 class="question-text">${currentQuestion.question_text}</h2>
        
        <div class="options-container">
          <div class="option" onclick="selectAnswer('A')" id="option-A">
            <span class="option-letter">A</span>
            <span class="option-text">${currentQuestion.option_a}</span>
          </div>
          <div class="option" onclick="selectAnswer('B')" id="option-B">
            <span class="option-letter">B</span>
            <span class="option-text">${currentQuestion.option_b}</span>
          </div>
          <div class="option" onclick="selectAnswer('C')" id="option-C">
            <span class="option-letter">C</span>
            <span class="option-text">${currentQuestion.option_c}</span>
          </div>
          <div class="option" onclick="selectAnswer('D')" id="option-D">
            <span class="option-letter">D</span>
            <span class="option-text">${currentQuestion.option_d}</span>
          </div>
        </div>
        
        <div class="explanation" id="explanation" style="display: none;">
          <h4>Explication</h4>
          <p>${currentQuestion.explanation}</p>
          <small><strong>Références:</strong> ${currentQuestion.references}</small>
          <div class="question-actions">
            <button class="btn btn--primary" onclick="nextQuestion()">Question suivante</button>
          </div>
        </div>
      </div>
    </div>
  `;
  
  document.getElementById('qcm-training-page').innerHTML = content;
}

function selectAnswer(answer) {
  const session = AppState.currentQcmSession;
  const currentQuestion = session.questions[session.currentIndex];
  const isCorrect = answer === currentQuestion.correct_answer;
  
  // Disable all options
  document.querySelectorAll('.option').forEach(opt => {
    opt.style.pointerEvents = 'none';
  });
  
  // Highlight selected answer
  const selectedOption = document.getElementById(`option-${answer}`);
  selectedOption.classList.add(isCorrect ? 'correct' : 'incorrect');
  
  // Highlight correct answer if different
  if (!isCorrect) {
    const correctOption = document.getElementById(`option-${currentQuestion.correct_answer}`);
    correctOption.classList.add('correct');
  }
  
  // Show explanation
  document.getElementById('explanation').style.display = 'block';
  
  // Save answer
  session.answers[session.currentIndex] = {
    question_id: currentQuestion.id,
    selected: answer,
    correct: currentQuestion.correct_answer,
    is_correct: isCorrect
  };
}

function nextQuestion() {
  const session = AppState.currentQcmSession;
  session.currentIndex++;
  
  if (session.currentIndex >= session.questions.length) {
    // Training completed
    showToast('Entraînement terminé !', 'success');
    showPage('qcm');
  } else {
    loadQcmTraining();
  }
}

// ECOS Functions
function loadEcosPage() {
  const content = `
    <header class="app-header">
      <div class="header-content">
        <div class="header-left">
          <div class="logo" onclick="showPage('dashboard')">MedFormation</div>
          <div class="search-bar">
            <input type="text" placeholder="Rechercher une fiche ECOS..." class="search-input">
          </div>
        </div>
        <div class="header-right">
          <div class="notifications"><span class="notification-badge">3</span>🔔</div>
          <div class="user-menu" onclick="toggleUserMenu()">
            <span id="user-name">${AppState.currentUser?.first_name || 'User'} ${AppState.currentUser?.last_name?.charAt(0) || ''}.</span>
            <span class="dropdown-arrow">▼</span>
            <div class="user-dropdown" id="user-dropdown">
              <a href="#" onclick="showPage('account')">Mon compte</a>
              <a href="#" onclick="logout()">Déconnexion</a>
            </div>
          </div>
        </div>
      </div>
    </header>
    
    <div class="app-content">
      <aside class="sidebar">
        <nav class="sidebar-nav">
          <a href="#" class="nav-item" onclick="showPage('dashboard')">
            <span class="nav-icon">🏠</span><span class="nav-text">Dashboard</span>
          </a>
          <a href="#" class="nav-item" onclick="showPage('courses')">
            <span class="nav-icon">📹</span><span class="nav-text">Cours</span>
          </a>
          <a href="#" class="nav-item" onclick="showPage('qcm')">
            <span class="nav-icon">❓</span><span class="nav-text">QCM</span>
          </a>
          <a href="#" class="nav-item active" onclick="showPage('ecos')">
            <span class="nav-icon">📋</span><span class="nav-text">ECOS</span>
          </a>
          <a href="#" class="nav-item" onclick="showPage('progress')">
            <span class="nav-icon">📊</span><span class="nav-text">Progression</span>
          </a>
          <a href="#" class="nav-item" onclick="showPage('account')">
            <span class="nav-icon">⚙️</span><span class="nav-text">Mon Compte</span>
          </a>
        </nav>
      </aside>
      
      <main class="main-content">
        <div class="ecos-header">
          <h1>Fiches ECOS</h1>
          <p>Préparez vos examens cliniques objectifs structurés</p>
        </div>
        
        <div class="ecos-filters">
          <select class="form-control" style="width: 200px; margin-right: 16px;">
            <option value="">Toutes les spécialités</option>
            <option value="Cardiologie">Cardiologie</option>
            <option value="Pneumologie">Pneumologie</option>
            <option value="Neurologie">Neurologie</option>
          </select>
          
          <select class="form-control" style="width: 200px; margin-right: 16px;">
            <option value="">Toutes compétences</option>
            <option value="Communication">Communication</option>
            <option value="Examen clinique">Examen clinique</option>
            <option value="Geste technique">Geste technique</option>
          </select>
        </div>
        
        <div class="ecos-grid">
          ${renderEcosGrid()}
        </div>
      </main>
    </div>
  `;
  
  document.getElementById('ecos-page').innerHTML = content;
}

function renderEcosGrid() {
  return AppState.ecosSheets.map(sheet => {
    const isLocked = !sheet.is_free && AppState.currentUser?.subscription_status !== 'active';
    
    return `
      <div class="ecos-card ${isLocked ? 'ecos-locked' : ''}" onclick="${isLocked ? 'showUpgradeModal()' : `showPage('ecos-detail', ${sheet.id})`}">
        <div class="ecos-header">
          ${isLocked ? '<div class="lock-icon">🔒</div>' : ''}
          <div class="ecos-specialty">${sheet.specialty}</div>
          <div class="ecos-competency">${sheet.competency}</div>
        </div>
        
        <div class="ecos-content">
          <h3 class="ecos-title">${sheet.title}</h3>
          <div class="ecos-meta">
            <span class="ecos-difficulty" style="color: ${getDifficultyColor(sheet.difficulty)}">${sheet.difficulty}</span>
            <span class="ecos-duration">${sheet.duration} min</span>
          </div>
          <p class="ecos-context">${sheet.context}</p>
        </div>
      </div>
    `;
  }).join('');
}

function loadEcosDetail(sheetId) {
  const sheet = AppState.ecosSheets.find(s => s.id === parseInt(sheetId));
  if (!sheet) {
    showPage('ecos');
    return;
  }
  
  const content = `
    <div class="ecos-detail-container">
      <div class="ecos-detail-header">
        <button class="btn btn--outline" onclick="showPage('ecos')">← Retour aux fiches</button>
        <div class="ecos-actions">
          <button class="btn btn--outline" onclick="printSheet()">🖨️ Imprimer</button>
          <button class="btn btn--primary" onclick="markAsStudied(${sheet.id})">✓ Marquer comme étudié</button>
        </div>
      </div>
      
      <div class="ecos-detail-content">
        <div class="ecos-title-section">
          <h1>${sheet.title}</h1>
          <div class="ecos-meta-detail">
            <span class="tag">${sheet.specialty}</span>
            <span class="tag">${sheet.competency}</span>
            <span class="tag" style="color: ${getDifficultyColor(sheet.difficulty)}">${sheet.difficulty}</span>
            <span class="tag">${sheet.duration} minutes</span>
          </div>
        </div>
        
        <div class="ecos-sections">
          <div class="ecos-section">
            <h3>📋 Contexte clinique</h3>
            <div class="section-content">
              <p>${sheet.context}</p>
            </div>
          </div>
          
          <div class="ecos-section">
            <h3>🎯 Objectifs de la station</h3>
            <div class="section-content">
              <ul>
                ${sheet.objectives.map(obj => `<li>${obj}</li>`).join('')}
              </ul>
            </div>
          </div>
          
          <div class="ecos-section">
            <h3>📊 Grille d'évaluation</h3>
            <div class="section-content">
              <div class="evaluation-grid">
                ${Object.entries(sheet.evaluation_grid).map(([criteria, points]) => `
                  <div class="evaluation-item">
                    <span class="criteria">${criteria}</span>
                    <span class="points">${points} pts</span>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>
          
          <div class="ecos-section">
            <h3>⚠️ Pièges à éviter</h3>
            <div class="section-content">
              <ul class="mistakes-list">
                ${sheet.common_mistakes.map(mistake => `<li>${mistake}</li>`).join('')}
              </ul>
            </div>
          </div>
          
          <div class="ecos-section">
            <h3>💡 Points clés</h3>
            <div class="section-content">
              <ul class="key-points-list">
                ${sheet.key_points.map(point => `<li>${point}</li>`).join('')}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
  
  document.getElementById('ecos-detail-page').innerHTML = content;
}

// Progress Functions
function loadProgressPage() {
  const content = `
    <header class="app-header">
      <div class="header-content">
        <div class="header-left">
          <div class="logo" onclick="showPage('dashboard')">MedFormation</div>
        </div>
        <div class="header-right">
          <div class="notifications"><span class="notification-badge">3</span>🔔</div>
          <div class="user-menu" onclick="toggleUserMenu()">
            <span id="user-name">${AppState.currentUser?.first_name || 'User'} ${AppState.currentUser?.last_name?.charAt(0) || ''}.</span>
            <span class="dropdown-arrow">▼</span>
            <div class="user-dropdown" id="user-dropdown">
              <a href="#" onclick="showPage('account')">Mon compte</a>
              <a href="#" onclick="logout()">Déconnexion</a>
            </div>
          </div>
        </div>
      </div>
    </header>
    
    <div class="app-content">
      <aside class="sidebar">
        <nav class="sidebar-nav">
          <a href="#" class="nav-item" onclick="showPage('dashboard')">
            <span class="nav-icon">🏠</span><span class="nav-text">Dashboard</span>
          </a>
          <a href="#" class="nav-item" onclick="showPage('courses')">
            <span class="nav-icon">📹</span><span class="nav-text">Cours</span>
          </a>
          <a href="#" class="nav-item" onclick="showPage('qcm')">
            <span class="nav-icon">❓</span><span class="nav-text">QCM</span>
          </a>
          <a href="#" class="nav-item" onclick="showPage('ecos')">
            <span class="nav-icon">📋</span><span class="nav-text">ECOS</span>
          </a>
          <a href="#" class="nav-item active" onclick="showPage('progress')">
            <span class="nav-icon">📊</span><span class="nav-text">Progression</span>
          </a>
          <a href="#" class="nav-item" onclick="showPage('account')">
            <span class="nav-icon">⚙️</span><span class="nav-text">Mon Compte</span>
          </a>
        </nav>
      </aside>
      
      <main class="main-content">
        <div class="progress-header">
          <h1>Ma Progression</h1>
          <p>Suivez votre évolution et identifiez vos points d'amélioration</p>
        </div>
        
        <div class="progress-overview">
          <div class="overview-card">
            <div class="overview-icon">📹</div>
            <div class="overview-content">
              <div class="overview-number">${AppState.userProgress.videosWatched}</div>
              <div class="overview-label">Vidéos visionnées</div>
            </div>
          </div>
          
          <div class="overview-card">
            <div class="overview-icon">✅</div>
            <div class="overview-content">
              <div class="overview-number">${AppState.userProgress.qcmCompleted}</div>
              <div class="overview-label">QCM réalisés</div>
            </div>
          </div>
          
          <div class="overview-card">
            <div class="overview-icon">🎯</div>
            <div class="overview-content">
              <div class="overview-number">${AppState.userProgress.successRate}%</div>
              <div class="overview-label">Taux de réussite</div>
            </div>
          </div>
          
          <div class="overview-card">
            <div class="overview-icon">🔥</div>
            <div class="overview-content">
              <div class="overview-number">${AppState.userProgress.streak}</div>
              <div class="overview-label">Jours consécutifs</div>
            </div>
          </div>
        </div>
        
        <div class="progress-charts">
          <div class="chart-container">
            <h3>Évolution du score</h3>
            <canvas id="score-evolution-chart" width="400" height="200"></canvas>
          </div>
          
          <div class="chart-container">
            <h3>Performance par spécialité</h3>
            <canvas id="specialty-performance-chart" width="400" height="200"></canvas>
          </div>
        </div>
        
        <div class="weak-points">
          <h3>Points faibles identifiés</h3>
          <div class="weak-points-list">
            <div class="weak-point">
              <div class="weak-point-topic">Arythmies cardiaques</div>
              <div class="weak-point-score">45% de réussite</div>
              <button class="btn btn--sm btn--outline" onclick="showPage('qcm')">Réviser</button>
            </div>
            
            <div class="weak-point">
              <div class="weak-point-topic">Insuffisance cardiaque</div>
              <div class="weak-point-score">62% de réussite</div>
              <button class="btn btn--sm btn--outline" onclick="showPage('courses')">Revoir le cours</button>
            </div>
          </div>
        </div>
        
        <div class="recent-activity">
          <h3>Activité récente</h3>
          <div class="activity-timeline">
            <div class="activity-item">
              <div class="activity-date">Aujourd'hui</div>
              <div class="activity-description">QCM Cardiologie - 8/10 bonnes réponses</div>
            </div>
            
            <div class="activity-item">
              <div class="activity-date">Hier</div>
              <div class="activity-description">Cours "Arythmies cardiaques" visionné</div>
            </div>
            
            <div class="activity-item">
              <div class="activity-date">Il y a 2 jours</div>
              <div class="activity-description">Fiche ECOS "Examen cardiovasculaire" étudiée</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  `;
  
  document.getElementById('progress-page').innerHTML = content;
  
  // Initialize charts after content is loaded
  setTimeout(() => {
    initializeProgressCharts();
  }, 100);
}

function initializeProgressCharts() {
  // Simple canvas-based charts (placeholder for Chart.js)
  const scoreChart = document.getElementById('score-evolution-chart');
  const specialtyChart = document.getElementById('specialty-performance-chart');
  
  if (scoreChart) {
    const ctx = scoreChart.getContext('2d');
    ctx.fillStyle = '#2563EB';
    ctx.fillText('Graphique de progression - Nécessite Chart.js', 10, 100);
  }
  
  if (specialtyChart) {
    const ctx = specialtyChart.getContext('2d');
    ctx.fillStyle = '#10B981';
    ctx.fillText('Graphique par spécialité - Nécessite Chart.js', 10, 100);
  }
}

// Account Functions
function loadAccountPage() {
  const user = AppState.currentUser;
  
  const content = `
    <header class="app-header">
      <div class="header-content">
        <div class="header-left">
          <div class="logo" onclick="showPage('dashboard')">MedFormation</div>
        </div>
        <div class="header-right">
          <div class="notifications"><span class="notification-badge">3</span>🔔</div>
          <div class="user-menu" onclick="toggleUserMenu()">
            <span id="user-name">${user?.first_name || 'User'} ${user?.last_name?.charAt(0) || ''}.</span>
            <span class="dropdown-arrow">▼</span>
            <div class="user-dropdown" id="user-dropdown">
              <a href="#" onclick="showPage('account')">Mon compte</a>
              <a href="#" onclick="logout()">Déconnexion</a>
            </div>
          </div>
        </div>
      </div>
    </header>
    
    <div class="app-content">
      <aside class="sidebar">
        <nav class="sidebar-nav">
          <a href="#" class="nav-item" onclick="showPage('dashboard')">
            <span class="nav-icon">🏠</span><span class="nav-text">Dashboard</span>
          </a>
          <a href="#" class="nav-item" onclick="showPage('courses')">
            <span class="nav-icon">📹</span><span class="nav-text">Cours</span>
          </a>
          <a href="#" class="nav-item" onclick="showPage('qcm')">
            <span class="nav-icon">❓</span><span class="nav-text">QCM</span>
          </a>
          <a href="#" class="nav-item" onclick="showPage('ecos')">
            <span class="nav-icon">📋</span><span class="nav-text">ECOS</span>
          </a>
          <a href="#" class="nav-item" onclick="showPage('progress')">
            <span class="nav-icon">📊</span><span class="nav-text">Progression</span>
          </a>
          <a href="#" class="nav-item active" onclick="showPage('account')">
            <span class="nav-icon">⚙️</span><span class="nav-text">Mon Compte</span>
          </a>
        </nav>
      </aside>
      
      <main class="main-content">
        <div class="account-header">
          <h1>Mon Compte</h1>
        </div>
        
        <div class="account-sections">
          <div class="account-section">
            <h3>Informations personnelles</h3>
            <div class="profile-info">
              <div class="info-item">
                <label>Nom complet</label>
                <span>${user?.first_name || 'N/A'} ${user?.last_name || 'N/A'}</span>
              </div>
              <div class="info-item">
                <label>Email</label>
                <span>${user?.email || 'N/A'}</span>
              </div>
              <div class="info-item">
                <label>Promotion</label>
                <span>${user?.promotion || 'N/A'}</span>
              </div>
              <div class="info-item">
                <label>Faculté</label>
                <span>${user?.medical_school || 'N/A'}</span>
              </div>
            </div>
            <button class="btn btn--outline">Modifier mes informations</button>
          </div>
          
          <div class="account-section">
            <h3>Abonnement</h3>
            <div class="subscription-info">
              <div class="subscription-status">
                <div class="status-badge ${user?.subscription_status === 'active' ? 'status-active' : 'status-free'}">
                  ${user?.subscription_status === 'active' ? 'Premium Actif' : 'Gratuit'}
                </div>
                <div class="subscription-plan">
                  ${user?.subscription_plan === 'yearly' ? 'Plan Annuel' : user?.subscription_plan === 'monthly' ? 'Plan Mensuel' : 'Aucun abonnement'}
                </div>
              </div>
              
              ${user?.subscription_status !== 'active' ? `
                <div class="upgrade-section">
                  <p>Passez à Premium pour accéder à tout le contenu !</p>
                  <button class="btn btn--primary" onclick="showPage('pricing')">Voir les plans</button>
                </div>
              ` : `
                <div class="subscription-actions">
                  <button class="btn btn--outline">Gérer l'abonnement</button>
                  <button class="btn btn--outline" onclick="cancelSubscription()">Résilier</button>
                </div>
              `}
            </div>
          </div>
          
          <div class="account-section">
            <h3>Historique de facturation</h3>
            <div class="billing-history">
              ${user?.subscription_status === 'active' ? `
                <div class="billing-item">
                  <span>Plan Annuel - Renouvelé</span>
                  <span>199.00 €</span>
                  <span>01/09/2024</span>
                </div>
                <div class="billing-item">
                  <span>Plan Annuel - Premier paiement</span>
                  <span>199.00 €</span>
                  <span>01/09/2023</span>
                </div>
              ` : `
                <p>Aucune facturation pour le moment.</p>
              `}
            </div>
          </div>
        </div>
      </main>
    </div>
  `;
  
  document.getElementById('account-page').innerHTML = content;
}

// Pricing Functions
function loadPricingPage() {
  const content = `
    <div class="pricing-page-container">
      <header class="pricing-header">
        <button class="btn btn--outline" onclick="showPage('${AppState.isAuthenticated ? 'dashboard' : 'landing'}')">← Retour</button>
        <h1>Choisissez votre formule</h1>
        <p>Accédez à tout le contenu médical dont vous avez besoin pour réussir vos EDN</p>
      </header>
      
      <div class="pricing-comparison">
        <div class="pricing-card pricing-free">
          <div class="pricing-header">
            <h3>Gratuit</h3>
            <div class="price">0€<span>/mois</span></div>
            <p>Pour découvrir la plateforme</p>
          </div>
          
          <ul class="pricing-features">
            <li>✅ 3 vidéos de cours</li>
            <li>✅ 20 QCM d'entraînement</li>
            <li>✅ 5 fiches ECOS</li>
            <li>❌ Accès limité</li>
            <li>❌ Pas d'examens blancs</li>
            <li>❌ Pas de suivi de progression</li>
          </ul>
          
          <button class="btn btn--outline btn--full-width" ${AppState.isAuthenticated ? 'disabled' : 'onclick="showPage(\'signup\')"}>'>
            ${AppState.isAuthenticated ? 'Plan actuel' : 'Commencer gratuitement'}
          </button>
        </div>
        
        <div class="pricing-card pricing-monthly">
          <div class="pricing-header">
            <h3>Mensuel</h3>
            <div class="price">29€<span>/mois</span></div>
            <p>Flexibilité maximale</p>
          </div>
          
          <ul class="pricing-features">
            <li>✅ Accès illimité à tous les cours vidéo</li>
            <li>✅ Base complète de QCM (500+)</li>
            <li>✅ Toutes les fiches ECOS (100+)</li>
            <li>✅ Examens blancs chronométrés</li>
            <li>✅ Suivi détaillé de progression</li>
            <li>✅ Support prioritaire</li>
          </ul>
          
          <button class="btn btn--primary btn--full-width" onclick="showPage('checkout', 'monthly')">
            Choisir Mensuel
          </button>
        </div>
        
        <div class="pricing-card pricing-yearly pricing-popular">
          <div class="pricing-badge">Le plus populaire</div>
          <div class="pricing-header">
            <h3>Annuel</h3>
            <div class="price">199€<span>/an</span></div>
            <div class="price-equivalent">16.58€/mois équivalent</div>
            <div class="price-savings">Économisez 31% (149€)</div>
          </div>
          
          <ul class="pricing-features">
            <li>✅ Tous les avantages du plan mensuel</li>
            <li>✅ Économie de 149€ par rapport au mensuel</li>
            <li>✅ Accès prioritaire aux nouveautés</li>
            <li>✅ Support premium</li>
            <li>✅ Garantie satisfait ou remboursé 30j</li>
          </ul>
          
          <button class="btn btn--primary btn--full-width" onclick="showPage('checkout', 'yearly')">
            Choisir Annuel
          </button>
        </div>
      </div>
      
      <div class="pricing-faq">
        <h3>Questions fréquentes</h3>
        <div class="faq-item">
          <strong>Puis-je changer de plan à tout moment ?</strong>
          <p>Oui, vous pouvez upgrader ou downgrader votre abonnement à tout moment depuis votre compte.</p>
        </div>
        
        <div class="faq-item">
          <strong>Y a-t-il une période d'essai gratuite ?</strong>
          <p>Le plan gratuit vous permet de tester la plateforme. Pour le premium, nous offrons une garantie satisfait ou remboursé de 30 jours.</p>
        </div>
        
        <div class="faq-item">
          <strong>Le contenu est-il régulièrement mis à jour ?</strong>
          <p>Oui, nos cours et QCM sont mis à jour régulièrement selon les dernières recommandations médicales.</p>
        </div>
      </div>
    </div>
  `;
  
  document.getElementById('pricing-page').innerHTML = content;
}

// Checkout Functions
function loadCheckoutPage(plan) {
  const planDetails = {
    monthly: { name: 'Plan Mensuel', price: 29, period: 'mois' },
    yearly: { name: 'Plan Annuel', price: 199, period: 'an', savings: 'Économisez 149€' }
  };
  
  const selectedPlan = planDetails[plan] || planDetails.monthly;
  
  const content = `
    <div class="checkout-container">
      <div class="checkout-header">
        <button class="btn btn--outline" onclick="showPage('pricing')">← Retour aux tarifs</button>
        <h1>Finaliser votre abonnement</h1>
      </div>
      
      <div class="checkout-content">
        <div class="checkout-summary">
          <h3>Récapitulatif de commande</h3>
          <div class="plan-summary">
            <div class="plan-name">${selectedPlan.name}</div>
            <div class="plan-price">${selectedPlan.price}€/${selectedPlan.period}</div>
            ${selectedPlan.savings ? `<div class="plan-savings">${selectedPlan.savings}</div>` : ''}
          </div>
          
          <div class="total">
            <strong>Total: ${selectedPlan.price}€</strong>
          </div>
        </div>
        
        <div class="checkout-form">
          <h3>Informations de paiement</h3>
          <form id="checkout-form" onsubmit="processPayment(event, '${plan}')">
            <div class="form-group">
              <label class="form-label">Numéro de carte</label>
              <input type="text" class="form-control" placeholder="1234 5678 9012 3456" required>
            </div>
            
            <div class="form-row">
              <div class="form-group">
                <label class="form-label">Date d'expiration</label>
                <input type="text" class="form-control" placeholder="MM/AA" required>
              </div>
              <div class="form-group">
                <label class="form-label">CVV</label>
                <input type="text" class="form-control" placeholder="123" required>
              </div>
            </div>
            
            <div class="form-group">
              <label class="form-label">Nom sur la carte</label>
              <input type="text" class="form-control" value="${AppState.currentUser?.first_name || ''} ${AppState.currentUser?.last_name || ''}" required>
            </div>
            
            <div class="security-info">
              <p>🔒 Paiement sécurisé - Vos données sont cryptées</p>
            </div>
            
            <button type="submit" class="btn btn--primary btn--full-width btn--lg">
              Confirmer le paiement - ${selectedPlan.price}€
            </button>
          </form>
        </div>
      </div>
    </div>
  `;
  
  document.getElementById('checkout-page').innerHTML = content;
}

function processPayment(event, plan) {
  event.preventDefault();
  
  // Simulate payment processing
  showToast('Traitement du paiement...', 'info');
  
  setTimeout(() => {
    // Update user subscription
    if (AppState.currentUser) {
      AppState.currentUser.subscription_status = 'active';
      AppState.currentUser.subscription_plan = plan;
    }
    
    showToast('Paiement réussi ! Bienvenue chez les Premium 🎉', 'success', 'Abonnement activé');
    
    setTimeout(() => {
      showPage('dashboard');
    }, 2000);
  }, 2000);
}

// Course detail functions
function loadCourseDetail(courseId) {
  const course = AppState.courses.find(c => c.id === parseInt(courseId));
  if (!course) {
    showPage('courses');
    return;
  }
  
  const isLocked = !course.is_free && AppState.currentUser?.subscription_status !== 'active';
  if (isLocked) {
    showUpgradeModal();
    return;
  }
  
  const content = `
    <div class="course-detail-container">
      <div class="course-detail-header">
        <button class="btn btn--outline" onclick="showPage('courses')">← Retour aux cours</button>
        <div class="course-actions">
          <button class="btn btn--outline" onclick="downloadPDF(${course.id})">📎 Télécharger PDF</button>
          <button class="btn btn--primary" onclick="markAsWatched(${course.id})">✓ Marquer comme vu</button>
        </div>
      </div>
      
      <div class="course-detail-content">
        <div class="course-info">
          <div class="course-specialty">${course.specialty}</div>
          <h1>${course.title}</h1>
          <div class="course-meta-detail">
            <span class="meta-item">🕰️ ${formatDuration(course.duration)}</span>
            <span class="meta-item" style="color: ${getDifficultyColor(course.difficulty)}">🎯 ${course.difficulty}</span>
            <span class="meta-item">👁️ ${course.views} vues</span>
            <span class="meta-item">⭐ ${course.rating}</span>
          </div>
          <p class="course-description-full">${course.description}</p>
        </div>
        
        <div class="video-player-container">
          <div class="video-player">
            <div class="video-placeholder">
              <div class="play-button" onclick="playVideo(${course.id})">▶️</div>
              <div class="video-info">
                <h3>Cliquez pour démarrer le cours</h3>
                <p>${course.title}</p>
              </div>
            </div>
            
            <div class="video-controls" style="display: none;">
              <div class="progress-bar-video">
                <div class="progress-fill-video" style="width: 35%"></div>
              </div>
              <div class="controls-bar">
                <button class="control-btn" onclick="togglePlay()">⏸️</button>
                <span class="time-display">05:30 / 13:00</span>
                <div class="speed-controls">
                  <select onchange="changeSpeed(this.value)">
                    <option value="0.5">0.5x</option>
                    <option value="1" selected>1x</option>
                    <option value="1.5">1.5x</option>
                    <option value="2">2x</option>
                  </select>
                </div>
                <button class="control-btn" onclick="toggleFullscreen()">⛶️</button>
              </div>
            </div>
          </div>
        </div>
        
        <div class="course-progress">
          <h3>Votre progression</h3>
          <div class="progress-options">
            <button class="btn btn--outline btn--sm" onclick="markProgress('to_review')">🗒️ À revoir</button>
            <button class="btn btn--outline btn--sm" onclick="markProgress('viewed')">✓ Vu</button>
            <button class="btn btn--primary btn--sm" onclick="markProgress('mastered')">🎆 Maîtrisé</button>
          </div>
        </div>
        
        <div class="course-navigation">
          <button class="btn btn--outline" onclick="previousCourse(${course.id})">← Cours précédent</button>
          <button class="btn btn--primary" onclick="nextCourse(${course.id})">Cours suivant →</button>
        </div>
      </div>
    </div>
  `;
  
  document.getElementById('course-detail-page').innerHTML = content;
}

function playVideo(courseId) {
  const placeholder = document.querySelector('.video-placeholder');
  const controls = document.querySelector('.video-controls');
  
  placeholder.style.display = 'none';
  controls.style.display = 'block';
  
  showToast('Vidéo démarrée', 'success');
  
  // Update user progress
  if (!AppState.userProgress.watchedCourses.includes(courseId)) {
    AppState.userProgress.watchedCourses.push(courseId);
    AppState.userProgress.videosWatched++;
  }
}

function togglePlay() {
  const button = document.querySelector('.control-btn');
  button.textContent = button.textContent === '⏸️' ? '▶️' : '⏸️';
}

function changeSpeed(speed) {
  showToast(`Vitesse changée à ${speed}x`, 'info');
}

function toggleFullscreen() {
  showToast('Mode plein écran', 'info');
}

function downloadPDF(courseId) {
  showToast('Téléchargement du PDF...', 'info');
}

function markAsWatched(courseId) {
  showToast('Cours marqué comme vu', 'success');
}

function markProgress(status) {
  const messages = {
    'to_review': 'À revoir',
    'viewed': 'Vu',
    'mastered': 'Maîtrisé'
  };
  showToast(`Cours marqué : ${messages[status]}`, 'success');
}

function previousCourse(currentId) {
  const currentIndex = AppState.courses.findIndex(c => c.id === currentId);
  if (currentIndex > 0) {
    const prevCourse = AppState.courses[currentIndex - 1];
    showPage('course-detail', prevCourse.id);
  }
}

function nextCourse(currentId) {
  const currentIndex = AppState.courses.findIndex(c => c.id === currentId);
  if (currentIndex < AppState.courses.length - 1) {
    const nextCourse = AppState.courses[currentIndex + 1];
    showPage('course-detail', nextCourse.id);
  }
}

// Filter functions
function filterCourses(searchTerm) {
  // Simple search implementation
  console.log('Searching for:', searchTerm);
}

function filterCoursesBySpecialty(specialty) {
  console.log('Filter by specialty:', specialty);
}

function filterCoursesByDifficulty(difficulty) {
  console.log('Filter by difficulty:', difficulty);
}

function filterQcmBySpecialty(specialty) {
  const buttons = document.querySelectorAll('.filter-btn');
  buttons.forEach(btn => btn.classList.remove('active'));
  event.target.classList.add('active');
  console.log('Filter QCM by specialty:', specialty);
}

// ECOS helper functions
function printSheet() {
  showToast('Fonction d\'impression simulée', 'info');
}

function markAsStudied(sheetId) {
  if (!AppState.userProgress.studiedEcos.includes(sheetId)) {
    AppState.userProgress.studiedEcos.push(sheetId);
  }
  showToast('Fiche marquée comme étudiée', 'success');
}

// Account helper functions
function cancelSubscription() {
  if (confirm('Êtes-vous sûr de vouloir résilier votre abonnement ?')) {
    AppState.currentUser.subscription_status = 'cancelled';
    showToast('Abonnement résilié', 'info');
    loadAccountPage();
  }
}

// Forgot password page
function loadForgotPasswordPage() {
  const content = `
    <div class="auth-container">
      <div class="auth-card">
        <div class="auth-header">
          <h2>Mot de passe oublié</h2>
          <p>Saisissez votre email pour réinitialiser votre mot de passe</p>
        </div>
        <form id="forgot-password-form" onsubmit="handleForgotPassword(event)">
          <div class="form-group">
            <label class="form-label">Email</label>
            <input type="email" class="form-control" name="email" required>
          </div>
          <button type="submit" class="btn btn--primary btn--full-width">Envoyer le lien</button>
        </form>
        <div class="auth-footer">
          <a href="#" onclick="showPage('login')">Retour à la connexion</a>
        </div>
      </div>
    </div>
  `;
  
  document.getElementById('forgot-password-page').innerHTML = content;
}

function handleForgotPassword(event) {
  event.preventDefault();
  showToast('Email de réinitialisation envoyé', 'success');
  setTimeout(() => showPage('login'), 2000);
}

// Additional course styles for the courses page
const additionalStyles = ''
<style>
.courses-header {
  margin-bottom: 32px;
}

.courses-filters {
  display: flex;
  margin-bottom: 24px;
  align-items: center;
}

.courses-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 24px;
}

.course-card {
  background: var(--color-surface);
  border: 1px solid var(--color-card-border);
  border-radius: var(--radius-lg);
  overflow: hidden;
  cursor: pointer;
  transition: all var(--duration-normal);
}

.course-card:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}

.course-card.course-locked {
  opacity: 0.7;
}

.course-thumbnail {
  height: 160px;
  background: var(--color-bg-1);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.course-icon {
  font-size: 3rem;
}

.lock-icon {
  position: absolute;
  top: 12px;
  right: 12px;
  font-size: 1.2rem;
}

.course-duration {
  position: absolute;
  bottom: 12px;
  right: 12px;
  background: rgba(0,0,0,0.7);
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
}

.course-content {
  padding: 20px;
}

.course-specialty {
  color: var(--color-primary);
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;
  margin-bottom: 8px;
}

.course-title {
  margin-bottom: 8px;
  font-size: 16px;
  line-height: 1.4;
}

.course-description {
  color: var(--color-text-secondary);
  font-size: 14px;
  margin-bottom: 16px;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.course-meta {
  display: flex;
  gap: 16px;
  font-size: 12px;
  align-items: center;
}

.course-difficulty {
  font-weight: 500;
}

.course-views, .course-rating {
  color: var(--color-text-secondary);
}
// CSS styles are defined in the style.css file

'};

// Add additional styles to head if not already present
if (!document.getElementById('additional-styles')) {
  const styleSheet = document.createElement('style');
  styleSheet.id = 'additional-styles';
  styleSheet.textContent = '.course-detail-container { max-width: 1000px; margin: 0 auto; padding: 24px; }';
  document.head.appendChild(styleSheet);
}
`;

// Styles are handled in the main CSS file