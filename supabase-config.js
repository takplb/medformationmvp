// ============================================
// 🔐 CONFIGURATION SUPABASE
// ============================================
// Sauvegarde ce fichier à : js/supabase-config.js

// REMPLACE CES VALEURS PAR LES TIENNES !
// Va dans Supabase Settings > API pour les trouver
const SUPABASE_URL = https://ggxlwnsgxpvobxxjsskx.supabase.co;
const SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdneGx3bnNneHB2b2J4eGpzc2t4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjExMzY2ODgsImV4cCI6MjA3NjcxMjY4OH0.p47Vuml4v0-ME9wftNuygIqapgEc9ahmfbYdHZTnbJc;

// ============================================
// Initialiser Supabase
// ============================================
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ============================================
// FONCTIONS UTILITAIRES
// ============================================

// 📚 COURSES - Récupérer les cours
async function getCourses(onlyFree = false) {
  let query = supabaseClient.from('courses').select('*');
  if (onlyFree) query = query.eq('is_free', true);
  const { data, error } = await query;
  if (error) console.error('Erreur courses:', error);
  return data || [];
}

// 📋 DOSSIERS - Récupérer les dossiers (groupes QCM)
async function getDossiers(onlyFree = false, specialty = null) {
  let query = supabaseClient.from('dossiers').select('*');
  if (onlyFree) query = query.eq('is_free', true);
  if (specialty) query = query.eq('specialty', specialty);
  const { data, error } = await query;
  if (error) console.error('Erreur dossiers:', error);
  return data || [];
}

// ❓ QUESTIONS - Récupérer les questions d'un dossier
async function getQuestions(dossierId) {
  const { data: questions, error: qError } = await supabaseClient
    .from('questions')
    .select('*')
    .eq('dossier_id', dossierId)
    .order('question_number', { ascending: true });

  if (qError) console.error('Erreur questions:', qError);

  // Récupérer les options pour chaque question
  if (questions) {
    for (let q of questions) {
      const { data: options, error: oError } = await supabaseClient
        .from('options')
        .select('*')
        .eq('question_id', q.id)
        .order('option_letter', { ascending: true });
      q.options = options || [];
    }
  }

  return questions || [];
}

// 💾 RÉSULTATS - Sauvegarder un résultat
async function saveResult(userId, dossierId, score, maxScore, timeSpentSeconds) {
  const percentage = Math.round((score / maxScore) * 100);
  
  const { data, error } = await supabaseClient
    .from('user_results')
    .insert([
      {
        user_id: userId,
        dossier_id: dossierId,
        score: score,
        max_score: maxScore,
        percentage: percentage,
        time_spent_seconds: timeSpentSeconds,
        started_at: new Date(),
        completed_at: new Date(),
        is_passed: percentage >= 60
      }
    ])
    .select();

  if (error) {
    console.error('Erreur sauvegarde résultat:', error);
    return null;
  }
  
  return data[0];
}

// 📊 RÉPONSES - Sauvegarder les réponses détaillées
async function saveAnswer(userResultId, questionId, selectedOptions, correctOptions, pointsAwarded) {
  const errorsCount = selectedOptions.filter(opt => !correctOptions.includes(opt)).length +
                      correctOptions.filter(opt => !selectedOptions.includes(opt)).length;

  const { data, error } = await supabaseClient
    .from('user_answers')
    .insert([
      {
        user_result_id: userResultId,
        question_id: questionId,
        selected_options: selectedOptions,
        correct_options: correctOptions,
        errors_count: errorsCount,
        points_awarded: pointsAwarded,
        is_correct: errorsCount === 0
      }
    ]);

  if (error) console.error('Erreur sauvegarde réponse:', error);
  return data;
}

// 📈 HISTORIQUE - Récupérer l'historique d'un utilisateur
async function getUserResults(userId, dossierId = null) {
  let query = supabaseClient
    .from('user_results')
    .select('*, dossiers(title, specialty)')
    .eq('user_id', userId)
    .order('completed_at', { ascending: false });

  if (dossierId) query = query.eq('dossier_id', dossierId);

  const { data, error } = await query;
  if (error) console.error('Erreur historique:', error);
  return data || [];
}

// 🎓 ECOS - Récupérer les fiches ECOS
async function getEcos(onlyFree = false, specialty = null) {
  let query = supabaseClient.from('ecos').select('*');
  if (onlyFree) query = query.eq('is_free', true);
  if (specialty) query = query.eq('specialty', specialty);
  const { data, error } = await query;
  if (error) console.error('Erreur ECOS:', error);
  return data || [];
}

// ============================================
// SYSTÈME DE SCORING INTELLIGENT
// ============================================

// Calculer les points selon le nombre d'erreurs
function calculatePoints(errorsCount, scoringRules) {
  // scoringRules = [
  //   { errors_count: 0, points_awarded: 1 },
  //   { errors_count: 1, points_awarded: 0.5 },
  //   { errors_count: 2, points_awarded: 0.2 },
  //   { errors_count: 3, points_awarded: 0 }
  // ]

  for (let rule of scoringRules) {
    if (errorsCount === rule.errors_count || (errorsCount >= 3 && rule.errors_count === 3)) {
      return rule.points_awarded;
    }
  }
  return 0;
}

// Récupérer les règles de scoring d'un dossier
async function getScoringRules(dossierId) {
  const { data, error } = await supabaseClient
    .from('scoring_rules')
    .select('*')
    .eq('dossier_id', dossierId)
    .order('errors_count', { ascending: true });

  if (error) console.error('Erreur scoring rules:', error);
  
  // Règles par défaut si aucune n'existe
  return data && data.length > 0 ? data : [
    { errors_count: 0, points_awarded: 1 },
    { errors_count: 1, points_awarded: 0.5 },
    { errors_count: 2, points_awarded: 0.2 },
    { errors_count: 3, points_awarded: 0 }
  ];
}

// ============================================
// AUTHENTIFICATION (pour plus tard)
// ============================================

async function signUp(email, password, firstName, lastName) {
  const { data, error } = await supabaseClient.auth.signUp({
    email: email,
    password: password
  });

  if (error) {
    console.error('Erreur inscription:', error);
    return null;
  }

  // Créer le profil utilisateur
  if (data.user) {
    await supabaseClient.from('users').insert([
      {
        id: data.user.id,
        email: email,
        first_name: firstName,
        last_name: lastName
      }
    ]);
  }

  return data;
}

async function signIn(email, password) {
  const { data, error } = await supabaseClient.auth.signInWithPassword({
    email: email,
    password: password
  });

  if (error) console.error('Erreur connexion:', error);
  return data;
}

async function signOut() {
  const { error } = await supabaseClient.auth.signOut();
  if (error) console.error('Erreur déconnexion:', error);
}

// ============================================
// TEST DE CONNEXION
// ============================================

async function testConnection() {
  console.log('🧪 Test de connexion Supabase...');
  try {
    const { data, error } = await supabaseClient
      .from('courses')
      .select('COUNT(*)')
      .limit(1);
    
    if (error) {
      console.error('❌ Erreur connexion:', error);
      alert('Erreur connexion Supabase. Vérifie tes clés !');
    } else {
      console.log('✅ Connexion réussie !');
      alert('✅ Connexion Supabase OK !');
    }
  } catch (err) {
    console.error('❌ Erreur:', err);
    alert('Erreur: ' + err.message);
  }
}

// Tester à chaque chargement
window.addEventListener('load', () => {
  console.log('Supabase config chargée');
});
