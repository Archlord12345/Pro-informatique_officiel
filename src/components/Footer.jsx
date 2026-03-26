export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-col">
        <p className="footer-title">Pro-Informatique</p>
        <p>Descente Akwa, Bafoussam (Cameroun)</p>
      </div>
      <div className="footer-col">
        <p className="footer-title">Contact rapide</p>
        <p>WhatsApp: {import.meta.env.VITE_WHATSAPP_NUMBER || 'A configurer dans .env'}</p>
      </div>
      <div className="footer-col">
        <p className="footer-title">Navigation</p>
        <p>Services | Medias | Assistant IA | Admin</p>
      </div>
    </footer>
  )
}
