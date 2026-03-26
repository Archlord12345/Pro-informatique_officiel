# 🗺️ Plan du Site - Routes & Navigation

## Structure Complète de Navigation

```
Pro-Informatique
│
├── 🏠 Accueil
│   ├── URL: /
│   ├── Composant: HomePage
│   ├── Contenu: Hero orbital + services preview + portfolio preview
│   └── Données: Entreprise info + services + projets
│
├── 💼 Services
│   ├── Principal: /services
│   │   ├── Composant: ServicesPage
│   │   ├── Contenu: Grille 4 services
│   │   └── Liens: Vers pages détail
│   │
│   └── Détail Service: /services/:serviceId
│       ├── Composant: ServicesDetailPage
│       ├── URLs valides:
│       │   ├── /services/cybercafe
│       │   ├── /services/bureautique
│       │   ├── /services/infographie
│       │   └── /services/support
│       └── Contenu: Description complète + packages + prix
│
├── 📁 Portfolio
│   ├── URL: /portfolio
│   ├── Composant: PortfolioPage
│   ├── Contenu: 
│   │   ├── Filtres par catégorie (all, infographie, impression, technique, bureautique)
│   │   ├── Grille projets
│   │   └── Testimonials clients
│   └── Données: Projets + testimonials (Supabase)
│
├── 🗂️ Galerie & Ressources
│   ├── URL: /gallery
│   ├── Composant: GalleryPage
│   ├── Contenu:
│   │   ├── Fichiers Google Drive
│   │   ├── Statistiques stockage
│   │   └── Catégories
│   └── Données: Google Drive API (fallback: démo data)
│
├── ℹ️ À Propos
│   ├── URL: /about
│   ├── Composant: AboutPage
│   ├── Contenu:
│   │   ├── Statistiques clés
│   │   ├── Histoire de l'entreprise
│   │   ├── Valeurs fondamentales
│   │   └── Présentation équipe
│   └── Données: Static (données de démo)
│
├── 📧 Contact
│   ├── URL: /contact
│   ├── Composant: ContactPage
│   ├── Contenu:
│   │   ├── Formulaire de contact
│   │   ├── Informations entreprise
│   │   └── Section FAQ
│   └── Type: Lead generation
│
├── 🔐 Authentification
│   ├── Connexion: /login
│   │   ├── Composant: LoginPage
│   │   └── Redirect: /dashboard (si succès)
│   │
│   └── Inscription: /register
│       ├── Composant: RegisterPage
│       └── Redirect: /login (si succès)
│
├── 📊 Admin Dashboards
│   ├── Dashboard: /dashboard
│   │   ├── Composant: DashboardPage
│   │   ├── Contenu: Stats + projets récents + activité
│   │   └── Protection: À implémenter (admin only)
│   │
│   └── Admin: /admin
│       ├── Composant: AdminPage
│       ├── Non implémentée encore
│       └── À développer
│
├── 💬 Chat IA
│   ├── URL: /chat
│   ├── Composant: ChatPage
│   ├── Contexte: Assistant IA pour support client
│   └── État: Fonctionnel (intégration existante)
│
├── 📸 Medias
│   ├── URL: /medias
│   ├── Composant: MediaPage
│   └── État: Fonctionnel (intégration existante)
│
└── ❌ Page Non Trouvée
    ├── URL: /* (catch-all)
    ├── Composant: NotFoundPage
    └── Redirection: Vers accueil

```

## Hiérarchie de Navigation

```
┌─────────────────────────────────────┐
│         NAVBAR STICKY               │
│ Logo | Accueil | Services | About   │
│         Portfolio | Contact         │
│  Connexion | Devis Gratuit (CTA)    │
└─────────────────────────────────────┘
            ↓ Contenu ↓
┌─────────────────────────────────────┐
│      Routes Principales (Routes)    │
│   (voir structure ci-dessus)        │
└─────────────────────────────────────┘
            ↓ Bas page ↓
┌─────────────────────────────────────┐
│          FOOTER 4-COLONNES          │
│ À Propos | Services | Navigation    │
│     Contact | Liens Sociaux         │
│      Copyright | Conditions         │
└─────────────────────────────────────┘
```

## Flux de Navigation

### Visiteur Anonyme (Parcours Standard)

```
Accueil → Services/ détail → Portfolio → Contact → Formulaire
   ↓
About (info client)
   ↓
Gallery (voir travaux)
   ↓
Register (créer compte)
   ↓
Dashboard (si nécessaire)
```

### Utilisateur Authentifié

```
Accueil → Services → Dashboard → Gestion projets
                          ↓
                    Deconnexion (logout)
                          ↓
                      Accueil
```

### Admin User

```
Login → Dashboard
    ↓
Ajouter/Modifier Projets
    ↓
Gestion Testimonials
    ↓
Statistiques
    ↓
Logout
```

## URLs Complètes de Navigation

### Home & Main
- `/` - Accueil principal
- `/about` - À Propos (Team + Histoire)
- `/contact` - Formulaire contact

### Services
- `/services` - Vue d'ensemble services
- `/services/cybercafe` - Cybercafé détails
- `/services/bureautique` - Bureautique détails
- `/services/infographie` - Infographie détails
- `/services/support` - Support technique détails

### Portfolio & Galerie
- `/portfolio` - Portfolio (filtrable)
- `/gallery` - Galerie + Google Drive

### Authentication
- `/login` - Connexion
- `/register` - Inscription

### Dashboard
- `/dashboard` - Tableau de bord admin
- `/admin` - Admin panel (non implémentée)

### Autres
- `/chat` - Chat IA
- `/medias` - Page médias
- `/*` - Page 404

## Paramètres de Route

### Service Détail
```
/services/:serviceId

Valeurs serviceId acceptées:
- cybercafe
- bureautique  
- infographie
- support
```

## Navigation Conditionnelle

### Non Authentifié
```
Visible: Accueil, Services, Portfolio, Gallery, About, Contact
Masqué: Dashboard, Admin panel
CTA: Login | Register
```

### Authentifié (User)
```
Visible: Tous les services + Dashboard
Masqué: Admin panel
CTA: Logout | Profile (À implémenter)
```

### Authentifié (Admin)
```
Visible: Tous + Admin panel
CTA: Logout | Admin settings (À implémenter)
```

## Breadcrumbs Recommandés (À implémenter)

```
Accueil / Services / Cybercafé
Accueil / Portfolio / Filtres
Accueil / À Propos / Équipe
``` 

## Organisation des Pages

### Pages "Marketing" (Publiques)
- Accueil
- Services (liste + détail)
- Portfolio
- Gallery
- À Propos
- Contact

### Pages "Application" (Utilisateur)
- Dashboard
- Admin panel

### Pages "System"
- Login
- Register
- Chat
- Medias
- 404

## Liens Internes Importants

### Depuis Navbar
```
Logo → /
Accueil → /
Services → /services
Portfolio → /portfolio
À Propos → /about
Contact → /contact
Connexion → /login
Devis → /contact (scroll to form)
```

### Depuis Pages
```
HomePage → /services, /portfolio, /about, /contact
ServicesPage → /services/:serviceId
PortfolioPage → /about (team section)
Dashboard → /portfolio (projets)
Contact → /login, /register
```

### Depuis Footer
```
À Propos → /about
Services → /services
Portfolio → /portfolio
Contact → /contact
Accueil → /
Confidentialité → /privacy (À créer)
Conditions → /terms (À créer)
```

## SEO Structure

```
/               - Home (Priority: HIGH)
/services       - Services listing (Priority: HIGH)
/services/*     - Service detail (Priority: MEDIUM)
/portfolio      - Portfolio (Priority: HIGH)
/about          - About (Priority: MEDIUM)
/contact        - Contact (Priority: HIGH)
/gallery        - Gallery (Priority: MEDIUM)
/login          - Auth (Priority: LOW)
/dashboard      - Private (NoIndex)
```

## Sitemap

```xml
<!-- À générer avec: npm run build:sitemap -->
sitemap.xml

Includes:
- / (priority 1.0, daily)
- /services (0.8, weekly)
- /services/* (0.7, weekly)
- /portfolio (0.8, weekly)
- /about (0.6, monthly)
- /contact (0.9, weekly)
```

## Analytics Tracking Points

```javascript
// À implémenter:
- Clics sur services détail
- Conversions depuis formulaires
- Clics CTA "Devis"
- Temps passé par page
- Bounce rate
- Conversion funnel (Contact → Lead)
```

---

## Points de Développement Futur

- [ ] Pages confidentialité (`/privacy`)
- [ ] Pages conditions (`/terms`)
- [ ] Page blog (`/blog`)
- [ ] Admin user management (`/admin/users`)
- [ ] Admin projects CRUD (`/admin/projects`)
- [ ] Page produits (`/products`)
- [ ] Page pricing (`/pricing`)
- [ ] Live chat widget
- [ ] Search functionality
- [ ] User profile (`/profile`)
- [ ] Settings (`/settings`)

---

**Total Routes**: 14 principales  
**Total Pages**: 12 principales + fallbacks  
**Authentification**: Supabase JWT  
**Autorisation**: Role-based (user/admin)  
**Responsive**: Mobile-first design  
**Performance**: Lazy loading routes
