export function Footer() {
  return (
    <footer className="site-footer">
      <p>Pro-Informatique - Descente Akwa, Bafoussam (Cameroun)</p>
      <p>Contact rapide WhatsApp: {import.meta.env.VITE_WHATSAPP_NUMBER || 'A configurer dans .env'}</p>
    </footer>
  )
}
