# Pro-Informatique

Application React/Vite pour Pro-Informatique (Bafoussam) avec:
- pages multi-sections
- medias/commentaires
- chatbot contextuel
- integration Supabase

## 1) Variables d'environnement

Le fichier `.env` local contient tes valeurs reelles.

Variables frontend obligatoires:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_CHAT_ENDPOINT`

Variables backend privees (a garder hors frontend):
- `SUPABASE_SERVICE_ROLE_KEY`
- `OPENAI_API_KEY` / `GEMINI_API_KEY` / `MISTRAL_API_KEY`
- tokens Google Drive, WhatsApp, Telegram

## 2) Initialiser Supabase (base vide)

1. Ouvre Supabase > SQL Editor.
2. Copie le contenu de `supabase/init.sql`.
3. Execute le script.

Le script cree:
- `profiles`
- `media_posts`
- `media_comments`
- `visitor_events`
- `chat_messages`

Il configure aussi les indexes, les relations et les policies RLS.

## 3) Lancer le projet

```bash
npm install
npm run dev
```
