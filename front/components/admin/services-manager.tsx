'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Edit, Trash2, Plus } from 'lucide-react'

const initialServices = [
  {
    id: 1,
    title: 'Cybercafé Premium',
    description: 'Espaces modernes équipés de stations haute performance',
    price: 'À partir de 5,000 XAF/h'
  },
  {
    id: 2,
    title: 'Maintenance IT',
    description: 'Services de maintenance et support technique',
    price: 'À partir de 50,000 XAF/mois'
  },
  {
    id: 3,
    title: 'Développement Web',
    description: 'Sites web et applications web custom',
    price: 'Sur devis'
  }
]

export function ServicesManager() {
  const [services, setServices] = useState(initialServices)
  const [isAdding, setIsAdding] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [formData, setFormData] = useState({ title: '', description: '', price: '' })

  const handleAdd = () => {
    if (formData.title && formData.description) {
      const newService = {
        id: Math.max(...services.map(s => s.id)) + 1,
        ...formData
      }
      setServices([...services, newService])
      setFormData({ title: '', description: '', price: '' })
      setIsAdding(false)
    }
  }

  const handleDelete = (id: number) => {
    setServices(services.filter(s => s.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-foreground">Gestion des Services</h2>
        <Button onClick={() => setIsAdding(!isAdding)} className="bg-primary">
          <Plus size={18} className="mr-2" />
          Ajouter un service
        </Button>
      </div>

      {/* Add Form */}
      {isAdding && (
        <Card className="p-6 border border-primary/30 bg-primary/5">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground">Titre</label>
              <Input
                placeholder="Nom du service"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Description</label>
              <Textarea
                placeholder="Description détaillée"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Prix</label>
              <Input
                placeholder="Tarif ou 'Sur devis'"
                value={formData.price}
                onChange={(e) => setFormData({...formData, price: e.target.value})}
                className="mt-1"
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={handleAdd} className="bg-primary">Ajouter</Button>
              <Button onClick={() => setIsAdding(false)} variant="outline">Annuler</Button>
            </div>
          </div>
        </Card>
      )}

      {/* Services List */}
      <div className="grid gap-4">
        {services.map((service) => (
          <Card key={service.id} className="p-6 border border-border flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-lg font-bold text-foreground">{service.title}</h3>
              <p className="text-muted-foreground text-sm mt-1">{service.description}</p>
              <p className="text-primary font-semibold text-sm mt-2">{service.price}</p>
            </div>
            <div className="flex gap-2 ml-4">
              <Button size="icon" variant="outline" className="text-primary">
                <Edit size={18} />
              </Button>
              <Button
                size="icon"
                variant="outline"
                className="text-red-600"
                onClick={() => handleDelete(service.id)}
              >
                <Trash2 size={18} />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
