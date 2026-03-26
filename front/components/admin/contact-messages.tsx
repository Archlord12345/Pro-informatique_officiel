'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Mail, Phone, Trash2 } from 'lucide-react'

const initialMessages = [
  {
    id: 1,
    name: 'Ibrahim Hassan',
    email: 'ibrahim@tech.cm',
    phone: '+237 691234567',
    subject: 'Devis infrastructure cloud',
    message: 'Bonjour, nous avons besoin d\'une infrastructure cloud sécurisée pour 50 employés.',
    status: 'new',
    date: '2024-03-24'
  },
  {
    id: 2,
    name: 'Jeanne Yopa',
    email: 'jeanne@boutique.cm',
    phone: '+237 699876543',
    subject: 'Problème avec mon site',
    message: 'Mon site e-commerce ne charge pas correctement. Besoin de support urgent.',
    status: 'replied',
    date: '2024-03-23'
  },
  {
    id: 3,
    name: 'Olivier Kapteu',
    email: 'olivier@legal.cm',
    phone: '+237 678901234',
    subject: 'Formation pour mon équipe IT',
    message: 'Intéressé par votre formation en cybersécurité. Pouvez-vous proposer une formation corporate?',
    status: 'pending',
    date: '2024-03-22'
  }
]

export function ContactMessages() {
  const [messages, setMessages] = useState(initialMessages)
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [reply, setReply] = useState('')
  const selected = messages.find(m => m.id === selectedId)

  const handleReply = () => {
    if (reply.trim()) {
      setMessages(messages.map(m =>
        m.id === selectedId ? { ...m, status: 'replied' as const } : m
      ))
      setReply('')
    }
  }

  const handleDelete = (id: number) => {
    setMessages(messages.filter(m => m.id !== id))
    if (selectedId === id) setSelectedId(null)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground">Messages de contact</h2>
        <p className="text-muted-foreground mt-2">{messages.length} message(s)</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Messages List */}
        <div className="lg:col-span-1 space-y-3 max-h-[600px] overflow-y-auto">
          {messages.map((msg) => (
            <Card
              key={msg.id}
              onClick={() => setSelectedId(msg.id)}
              className={`p-4 cursor-pointer border transition-all ${
                selectedId === msg.id
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary/50'
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <p className="font-semibold text-foreground text-sm">{msg.name}</p>
                  <Badge
                    variant="outline"
                    className={
                      msg.status === 'new'
                        ? 'bg-red-50 text-red-700 border-red-200'
                        : msg.status === 'replied'
                        ? 'bg-green-50 text-green-700 border-green-200'
                        : 'bg-yellow-50 text-yellow-700 border-yellow-200'
                    }
                  >
                    {msg.status === 'new' ? 'Nouveau' : msg.status === 'replied' ? 'Répondu' : 'En attente'}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">{msg.subject}</p>
                <p className="text-xs text-muted-foreground">{msg.date}</p>
              </div>
            </Card>
          ))}
        </div>

        {/* Message Detail */}
        <div className="lg:col-span-2">
          {selected ? (
            <Card className="p-6 border border-border space-y-6">
              {/* Header */}
              <div className="border-b border-border pb-4">
                <h3 className="text-xl font-bold text-foreground">{selected.subject}</h3>
                <div className="grid sm:grid-cols-2 gap-4 mt-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">De</p>
                    <p className="font-medium text-foreground">{selected.name}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Date</p>
                    <p className="font-medium text-foreground">{selected.date}</p>
                  </div>
                  <a href={`mailto:${selected.email}`} className="flex items-center gap-2 text-primary hover:underline">
                    <Mail size={16} />
                    {selected.email}
                  </a>
                  <a href={`tel:${selected.phone}`} className="flex items-center gap-2 text-primary hover:underline">
                    <Phone size={16} />
                    {selected.phone}
                  </a>
                </div>
              </div>

              {/* Message Content */}
              <div>
                <p className="text-muted-foreground">{selected.message}</p>
              </div>

              {/* Reply Section */}
              <div className="border-t border-border pt-4">
                <label className="text-sm font-medium text-foreground">Votre réponse</label>
                <Textarea
                  placeholder="Écrivez votre réponse..."
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                  className="mt-2 h-32"
                />
                <div className="flex gap-2 mt-4">
                  <Button onClick={handleReply} className="bg-primary">Envoyer la réponse</Button>
                  <Button
                    onClick={() => handleDelete(selected.id)}
                    variant="outline"
                    className="text-red-600"
                  >
                    <Trash2 size={16} className="mr-2" />
                    Supprimer
                  </Button>
                </div>
              </div>
            </Card>
          ) : (
            <Card className="p-12 border border-border text-center">
              <p className="text-muted-foreground">Sélectionnez un message pour voir les détails</p>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
