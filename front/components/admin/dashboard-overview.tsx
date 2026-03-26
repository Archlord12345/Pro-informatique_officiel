'use client'

import { Card } from '@/components/ui/card'
import { Users, MessageSquare, FileText, TrendingUp } from 'lucide-react'

const stats = [
  {
    label: 'Clients actifs',
    value: '524',
    icon: Users,
    trend: '+12% ce mois',
    color: 'text-blue-600'
  },
  {
    label: 'Messages reçus',
    value: '127',
    icon: MessageSquare,
    trend: '+8 cette semaine',
    color: 'text-green-600'
  },
  {
    label: 'Projets en cours',
    value: '18',
    icon: FileText,
    trend: '3 en retard',
    color: 'text-orange-600'
  },
  {
    label: 'Taux de satisfaction',
    value: '4.8/5',
    icon: TrendingUp,
    trend: '+0.2 ce mois',
    color: 'text-purple-600'
  }
]

export function DashboardOverview() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h2 className="text-3xl font-bold text-foreground">Tableau de bord</h2>
        <p className="text-muted-foreground mt-2">Bienvenue dans votre espace d&apos;administration</p>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.label} className="p-6 border border-border">
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 bg-muted rounded-lg ${stat.color}`}>
                  <Icon size={24} />
                </div>
              </div>
              <div>
                <p className="text-muted-foreground text-sm font-medium">{stat.label}</p>
                <p className="text-3xl font-bold text-foreground mt-1">{stat.value}</p>
                <p className="text-xs text-muted-foreground mt-2">{stat.trend}</p>
              </div>
            </Card>
          )
        })}
      </div>

      {/* Recent Activity */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Messages */}
        <Card className="p-6 border border-border">
          <h3 className="text-lg font-bold text-foreground mb-4">Messages récents</h3>
          <div className="space-y-4">
            {[
              { name: 'Ibrahim Hassan', message: 'Devis pour infrastructure...', time: '2h' },
              { name: 'Jeanne Yopa', message: 'Problème avec mon site...', time: '4h' },
              { name: 'Olivier Kapteu', message: 'Formation IT demandée', time: '1j' }
            ].map((item, i) => (
              <div key={i} className="pb-3 border-b border-border last:border-0 last:pb-0">
                <p className="font-medium text-foreground text-sm">{item.name}</p>
                <p className="text-muted-foreground text-sm">{item.message}</p>
                <p className="text-xs text-muted-foreground mt-1">{item.time}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent Projects */}
        <Card className="p-6 border border-border">
          <h3 className="text-lg font-bold text-foreground mb-4">Projets en cours</h3>
          <div className="space-y-4">
            {[
              { name: 'App Mobile Banking', progress: 75, status: 'En cours' },
              { name: 'Infrastructure Cloud', progress: 50, status: 'En cours' },
              { name: 'Cybersécurité Audit', progress: 90, status: 'Presque terminé' }
            ].map((item, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between items-center">
                  <p className="font-medium text-foreground text-sm">{item.name}</p>
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                    {item.status}
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all"
                    style={{ width: `${item.progress}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
