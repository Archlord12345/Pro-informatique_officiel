import { useMemo } from 'react'
import { hasSupabaseConfig } from '../lib/supabaseClient'

export function AdminPage() {
  const status = useMemo(
    () => [
      {
        label: 'Supabase',
        value: hasSupabaseConfig ? 'Connecte' : 'A configurer',
      },
      {
        label: 'Dossier Google Drive',
        value: import.meta.env.VITE_GOOGLE_DRIVE_FOLDER_ID || 'A configurer',
      },
      {
        label: 'IA Provider',
        value: import.meta.env.VITE_AI_PROVIDER || 'A configurer',
      },
      {
        label: 'Email admin',
        value: import.meta.env.VITE_ADMIN_EMAIL || 'A configurer',
      },
    ],
    [],
  )

  return (
    <section>
      <div className="section-head reveal-up">
        <p className="eyebrow">Administration</p>
        <h2>Tableau de controle Pro-Informatique</h2>
        <p>
          Utilise cette page pour verifier la configuration des integrations et preparer la gestion
          des visiteurs, medias, comptes utilisateur et conversations.
        </p>
      </div>

      <div className="admin-grid">
        {status.map((item) => (
          <article key={item.label} className="admin-card reveal-up">
            <p className="admin-label">{item.label}</p>
            <p className="admin-value">{item.value}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
