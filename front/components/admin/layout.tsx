'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { LayoutDashboard, Service, MessageSquare, Users, Menu, X, LogOut } from 'lucide-react'

interface AdminLayoutProps {
  children: React.ReactNode
  activeTab: string
  setActiveTab: (tab: any) => void
}

const navItems = [
  { id: 'overview', label: 'Tableau de bord', icon: LayoutDashboard },
  { id: 'services', label: 'Services', icon: Service },
  { id: 'messages', label: 'Messages', icon: MessageSquare },
  { id: 'team', label: 'Équipe', icon: Users }
]

export function AdminLayout({ children, activeTab, setActiveTab }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Top Bar */}
      <header className="sticky top-0 z-40 bg-white border-b border-border">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-muted rounded-lg transition-colors lg:hidden"
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <div>
              <h1 className="text-2xl font-bold text-primary">Pro-Informatique</h1>
              <p className="text-xs text-muted-foreground">Administration</p>
            </div>
          </div>
          <Button variant="outline" className="text-red-600 hover:bg-red-50">
            <LogOut size={18} className="mr-2" />
            Déconnexion
          </Button>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`${
            sidebarOpen ? 'w-64' : 'w-0'
          } bg-white border-r border-border transition-all duration-300 overflow-hidden lg:w-64`}
        >
          <nav className="p-6 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === item.id
                      ? 'bg-primary text-primary-foreground'
                      : 'text-foreground hover:bg-muted'
                  }`}
                >
                  <Icon size={20} />
                  <span className="font-medium">{item.label}</span>
                </button>
              )
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  )
}
