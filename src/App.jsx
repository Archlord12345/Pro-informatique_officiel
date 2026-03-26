import { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Layout } from './components/Layout'
import './App.css'

const HomePage = lazy(() => import('./pages/HomePage').then((m) => ({ default: m.HomePage })))
const ServicesPage = lazy(() =>
  import('./pages/ServicesPage').then((m) => ({ default: m.ServicesPage })),
)
const MediaPage = lazy(() => import('./pages/MediaPage').then((m) => ({ default: m.MediaPage })))
const ChatPage = lazy(() => import('./pages/ChatPage').then((m) => ({ default: m.ChatPage })))
const AdminPage = lazy(() => import('./pages/AdminPage').then((m) => ({ default: m.AdminPage })))
const PortfolioPage = lazy(() =>
  import('./pages/PortfolioPage').then((m) => ({ default: m.PortfolioPage })),
)
const LoginPage = lazy(() =>
  import('./pages/LoginPage').then((m) => ({ default: m.LoginPage })),
)
const RegisterPage = lazy(() =>
  import('./pages/RegisterPage').then((m) => ({ default: m.RegisterPage })),
)
const ContactPage = lazy(() =>
  import('./pages/ContactPage').then((m) => ({ default: m.ContactPage })),
)
const DashboardPage = lazy(() =>
  import('./pages/DashboardPage').then((m) => ({ default: m.DashboardPage })),
)
const NotFoundPage = lazy(() =>
  import('./pages/NotFoundPage').then((m) => ({ default: m.NotFoundPage })),
)

function App() {
  return (
    <Suspense
      fallback={
        <div className="route-loading">
          <span className="loading-dot" />
          <p>Chargement de la page...</p>
        </div>
      }
    >
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/medias" element={<MediaPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
  )
}

export default App
