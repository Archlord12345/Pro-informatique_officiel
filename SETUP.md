# 🔧 Guide Configuration & Démarrage

## 1️⃣ Installation de Base

```bash
# Dans le répertoire du projet
npm install

# Démarrer le dev server
npm run dev
```

## 2️⃣ Configuration Supabase

### Étape 1: Récupérer vos credentials
1. Aller sur [supabase.com](https://supabase.com)
2. Créer un nouveau projet ou accéder au vôtre
3. Dans **Settings → API**, copier:
   - `Project URL` → `VITE_SUPABASE_URL`
   - `anon public` → `VITE_SUPABASE_ANON_KEY`

### Étape 2: Créer les tables

Dans **SQL Editor** de Supabase, exécuter:

```sql
-- Table Profiles
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  firstName TEXT,
  lastName TEXT,
  email TEXT,
  phone TEXT,
  role TEXT DEFAULT 'user',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Table Projects
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  category TEXT, -- Infographie, Impression, Technique, Bureautique
  description TEXT,
  images TEXT[], -- Array d'URLs images
  client TEXT,
  completed_at TIMESTAMP,
  featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Table Testimonials
CREATE TABLE testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  author TEXT NOT NULL,
  company TEXT,
  content TEXT NOT NULL,
  rating INTEGER DEFAULT 5, -- 1-5 stars
  image TEXT, -- Avatar URL
  created_at TIMESTAMP DEFAULT NOW()
);

-- Table Media Posts
CREATE TABLE media_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content TEXT,
  images TEXT[],
  drive_folder_id TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Table Contacts (Contact Form Submissions)
CREATE TABLE contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name TEXT NOT NULL,
  last_name TEXT,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new', -- new, read, responded
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### Étape 3: Activer RLS (Row Level Security)

```sql
-- Profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public profiles visible to all" ON profiles
  FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Projects
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public projects visible to all" ON projects
  FOR SELECT USING (true);
CREATE POLICY "Only admins can insert projects" ON projects
  FOR INSERT WITH CHECK (
    (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
  );

-- Testimonials
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public testimonials visible to all" ON testimonials
  FOR SELECT USING (true);

-- Contacts
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anonymous can insert contacts" ON contacts
  FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can view all contacts" ON contacts
  FOR SELECT USING (
    (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
  );
```

### Étape 4: Ajouter au .env

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

## 3️⃣ Configuration Google Drive

### Étape 1: Créer OAuth Credentials

1. Aller sur [Google Cloud Console](https://console.cloud.google.com)
2. Créer un nouveau projet
3. Activer **Google Drive API**
4. Aller à **Credentials**
5. Créer **OAuth 2.0 Client ID** (Web application)
6. URI Autorisés:
   - `http://localhost:5175`
   - `http://localhost:3000` (si test local)
   - `https://votre-domaine.com` (production)

### Étape 2: Copier les credentials

1. Client ID → `VITE_GOOGLE_DRIVE_CLIENT_ID`
2. Client Secret → Garder sécurisé (non exposé en frontend)
3. API Key → `VITE_GOOGLE_DRIVE_API_KEY`

### Étape 3: Ajouter au .env

```env
VITE_GOOGLE_DRIVE_CLIENT_ID=your-client-id.apps.googleusercontent.com
VITE_GOOGLE_DRIVE_API_KEY=your-api-key-here
```

### Étape 4: Configurer Consentement (si nécessaire)

1. Dans Google Cloud Console
2. **OAuth consent screen** → Configuration
3. Add **https://www.googleapis.com/auth/drive** scope
4. Ajouter les URLs de redirection

## 4️⃣ Tester les Configurations

### Test Supabase Auth

```javascript
// Dans console du navigateur
import { authService } from './src/services/authService'

// Test sign up
await authService.signUp('test@example.com', 'password123', {
  firstName: 'Test',
  lastName: 'User'
})

// Test sign in
await authService.signIn('test@example.com', 'password123')
```

### Test Google Drive

```javascript
import { driveService } from './src/services/driveService'

// Test initialization
await driveService.initGoogleDriveAPI()

// Test list files
const result = await driveService.listFiles(null, 10)
console.log(result)
```

### Test Portfolio Service

```javascript
import { projectService } from './src/services/portfolioService'

// Test get projects
const { data, error } = await projectService.getProjects()
console.log(data)
```

## 5️⃣ Ajouter des Données de Test

### Import Projets de Test

```javascript
import { projectService } from './src/services/portfolioService'

const projects = [
  {
    title: 'Site E-commerce Moderne',
    category: 'Technique',
    description: 'Système de gestion complet avec paiement stripe',
    client: 'TechStore Inc',
    featured: true,
    images: ['https://...']
  },
  {
    title: 'Redesign Logo - BuildingCorp',
    category: 'Infographie',
    description: 'Logo moderne et identité visuelle',
    client: 'BuildingCorp',
    featured: true,
    images: ['https://...']
  }
]

for (const project of projects) {
  await projectService.createProject(project)
}
```

## 6️⃣ Navigation Routes

### Pages Disponibles

- **Accueil**: `/` - Hero orbital moderne
- **Services**: `/services` - Liste services
- **Service Détail**: `/services/cybercafe` (ou bureautique, infographie, support)
- **Portfolio**: `/portfolio` - Projets avec filtres
- **Galerie**: `/gallery` - Ressources Google Drive
- **À Propos**: `/about` - Équipe et histoire
- **Contact**: `/contact` - Formulaire + info
- **Tableau de Bord**: `/dashboard` - Admin analytics
- **Connexion**: `/login`
- **Inscription**: `/register`

## 7️⃣ Personalisation

### Modifier Infos Entreprise

Éditer `src/data/company.js`:

```javascript
export const companyProfile = {
  name: 'Pro-Informatique',
  email: 'contact@pro-informatique.cm',
  phone: '+237690123456',
  address: 'Descente Akwa, Bafoussam',
  // ...
}
```

### Modifier Couleurs

Éditer `src/index.css` variables CSS au top:

```css
:root {
  --brand-blue: #1b238f;
  --brand-gold: #f4b400;
  --brand-cyan: #11a9e2;
  /* ... */
}
```

### Modifier Services

Éditer la liste dans `src/pages/ServicesDetailPage.jsx`:

```javascript
const serviceDetails = {
  cybercafe: {
    title: 'Votre titre',
    icon: '🖥️',
    features: [/* ... */],
    // ...
  }
}
```

## 8️⃣ Troubleshooting

### Erreur: "VITE_SUPABASE_URL is empty"
- ✅ Vérifier que `.env` contient `VITE_SUPABASE_URL`
- ✅ Redémarrer le dev server après modifications .env
- ✅ Vérifier absence d'espaces inutiles

### Erreur: "gapi is not defined"
- ✅ Google API key manquant dans .env
- ✅ Utiliser `driveService.isConfigured()` avant appels
- ✅ Les données de démo s'affichent si non configuré

### Pages Vides
- ✅ Services de fallback data sont présents
- ✅ Vérifier console pour erreurs API
- ✅ Authentification n'est pas obligatoire (anonymous possible)

### Problème CORS
- ✅ Ajouter URL frontend à Google Cloud Console
- ✅ Vérifier credentials OAuth configuration
- ✅ Supabase n'a généralement pas de problème CORS

## 9️⃣ Build & Déploiement

### Build Production

```bash
npm run build
npm run preview  # Tester build localement
```

### Déployer sur Vercel

```bash
npm install -g vercel
vercel

# Ou via GitHub (recommandé)
# Connecter repo GitHub à Vercel automatiquement
```

### Variables d'Environnement Vercel

Dans Vercel Dashboard → Settings → Environment Variables:

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-key
VITE_GOOGLE_DRIVE_CLIENT_ID=your-client-id.apps.googleusercontent.com
VITE_GOOGLE_DRIVE_API_KEY=your-api-key
```

## 🔟 Performance Optimizations

```javascript
// Lazy load images
<img loading="lazy" src="..." alt="..." />

// Code splitting déjà en place
// Lazy routes avec React.lazy()

// Comprimer images
// Utiliser formats modernes (WebP)
```

## ✨ Next Steps

1. ✅ Configuration terminée?
2. ✅ Données de test ajoutées?
3. ✅ Navigation testée?
4. 📋 Ajouter plus de projets/testimonials
5. 📋 Customiser couleurs/textes
6. 📋 Configurer email (pour formulaire contact)
7. 📋 Ajouter analytics (Google Analytics)
8. 📋 Tester mobile responsive
9. 📋 Déployer en production

---

**Questions?** Consulter les fichiers source ou la documentation Supabase/Google Drive officielle.
