'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Edit, Trash2, Plus } from 'lucide-react'

const initialTeam = [
  {
    id: 1,
    name: 'Jean-Paul Nkembi',
    title: 'Directeur Général',
    email: 'jean.nkembi@pro-informatique.cm',
    specialties: 'Infrastructure, Management'
  },
  {
    id: 2,
    name: 'Marie Tchoumou',
    title: 'Chef de Projet Development',
    email: 'marie.tchoumou@pro-informatique.cm',
    specialties: 'React, Node.js, Web Development'
  },
  {
    id: 3,
    name: 'Charles Momo',
    title: 'Spécialiste Sécurité IT',
    email: 'charles.momo@pro-informatique.cm',
    specialties: 'Cybersécurité, Compliance'
  }
]

export function TeamManager() {
  const [team, setTeam] = useState(initialTeam)
  const [isAdding, setIsAdding] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    email: '',
    specialties: ''
  })

  const handleAdd = () => {
    if (formData.name && formData.title && formData.email) {
      const newMember = {
        id: Math.max(...team.map(m => m.id)) + 1,
        ...formData
      }
      setTeam([...team, newMember])
      setFormData({ name: '', title: '', email: '', specialties: '' })
      setIsAdding(false)
    }
  }

  const handleDelete = (id: number) => {
    setTeam(team.filter(m => m.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-foreground">Gestion de l&apos;équipe</h2>
        <Button onClick={() => setIsAdding(!isAdding)} className="bg-primary">
          <Plus size={18} className="mr-2" />
          Ajouter un membre
        </Button>
      </div>

      {/* Add Form */}
      {isAdding && (
        <Card className="p-6 border border-primary/30 bg-primary/5">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-foreground">Nom</label>
              <Input
                placeholder="Nom complet"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Titre</label>
              <Input
                placeholder="Fonction"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Email</label>
              <Input
                placeholder="email@pro-informatique.cm"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Spécialités</label>
              <Input
                placeholder="Ex: React, Node.js"
                value={formData.specialties}
                onChange={(e) => setFormData({...formData, specialties: e.target.value})}
                className="mt-1"
              />
            </div>
            <div className="col-span-full flex gap-2">
              <Button onClick={handleAdd} className="bg-primary">Ajouter</Button>
              <Button onClick={() => setIsAdding(false)} variant="outline">Annuler</Button>
            </div>
          </div>
        </Card>
      )}

      {/* Team List */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {team.map((member) => (
          <Card key={member.id} className="p-6 border border-border">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">{member.name}</h3>
                <p className="text-primary font-semibold text-sm">{member.title}</p>
              </div>
              <div className="text-sm space-y-1">
                <p className="text-muted-foreground">{member.email}</p>
                <p className="text-muted-foreground text-xs">{member.specialties}</p>
              </div>
              <div className="flex gap-2 pt-4 border-t border-border">
                <Button size="icon" variant="outline" className="text-primary flex-1">
                  <Edit size={16} />
                </Button>
                <Button
                  size="icon"
                  variant="outline"
                  className="text-red-600 flex-1"
                  onClick={() => handleDelete(member.id)}
                >
                  <Trash2 size={16} />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
