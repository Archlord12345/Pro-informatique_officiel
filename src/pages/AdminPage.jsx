import { useMemo } from 'react'
import { hasSupabaseConfig } from '../lib/supabaseClient'

export function AdminPage() {
  const status = useMemo(
    () => [
      {
        label: 'Supabase',
        value: hasSupabaseConfig ? 'Connecte' : 'A configurer',
        ok: hasSupabaseConfig,
      },
      {
        label: 'Dossier Google Drive',
        value: import.meta.env.VITE_GOOGLE_DRIVE_FOLDER_ID || 'A configurer',
        ok: Boolean(import.meta.env.VITE_GOOGLE_DRIVE_FOLDER_ID),
      },
      {
        label: 'IA Provider',
        value: import.meta.env.VITE_AI_PROVIDER || 'A configurer',
        ok: Boolean(import.meta.env.VITE_AI_PROVIDER),
      },
      {
        label: 'Email admin',
        value: import.meta.env.VITE_ADMIN_EMAIL || 'A configurer',
        ok: Boolean(import.meta.env.VITE_ADMIN_EMAIL),
      },
    ],
    [],
  )

  return (
    <section className="admin-v2">
      <div className="section-head reveal-up section-a">
        <p className="eyebrow">Administration</p>
        <h2 className="page-title">Tableau de controle Pro-Informatique</h2>
        <p>
          Utilise cette page pour verifier la configuration des integrations et preparer la gestion
          des visiteurs, medias, comptes utilisateur et conversations.
        </p>
      </div>

      <div className="admin-grid">
        {status.map((item, index) => (
          <article
            key={item.label}
            className={`admin-card reveal-up section-${String.fromCharCode(98 + (index % 4))}`}
          >
            <p className={item.ok ? 'admin-badge admin-badge-ok' : 'admin-badge admin-badge-warn'}>
              {item.ok ? 'Pret' : 'Action requise'}
            </p>
            <p className="admin-label">{item.label}</p>
            <p className="admin-value">{item.value}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
