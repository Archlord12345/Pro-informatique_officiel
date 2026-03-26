import { Outlet } from 'react-router-dom'
import { NavBar } from './NavBar'
import { Footer } from './Footer'

export function Layout() {
  return (
    <div className="app-shell">
      <NavBar />
      <main className="content-wrap">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
