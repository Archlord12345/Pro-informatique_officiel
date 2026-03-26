'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { X, MessageCircle, Send } from 'lucide-react'

interface Message {
  id: string
  text: string
  sender: 'user' | 'bot'
  timestamp: Date
}

const botResponses: Record<string, string> = {
  salut: 'Bonjour! Bienvenue chez Pro-Informatique. Comment puis-je vous aider aujourd\'hui?',
  services: 'Nous offrons: Cybercafé Premium, Maintenance IT, Développement Web/Mobile, Cybersécurité, Infrastructure Cloud et Formations IT.',
  prix: 'Nos tarifs varient selon vos besoins. Contactez-nous pour un devis personnalisé sans engagement!',
  contact: 'Vous pouvez nous joindre au +237 666 666 666 ou par email: contact@pro-informatique.cm',
  team: 'Notre équipe compte 6 experts certifiés en informatique et sécurité IT.',
  default: 'Merci pour votre question! Un agent va bientôt vous répondre en détail. Souhaitez-vous attendre ou nous appeler?'
}

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Bonjour! 👋 Je suis l\'assistant Pro-Informatique. Comment puis-je vous aider?',
      sender: 'bot',
      timestamp: new Date()
    }
  ])
  const [input, setInput] = useState('')

  const handleSend = () => {
    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date()
    }
    setMessages(prev => [...prev, userMessage])

    // Generate bot response
    const lowerInput = input.toLowerCase()
    let botText = botResponses.default

    for (const [key, response] of Object.entries(botResponses)) {
      if (lowerInput.includes(key)) {
        botText = response
        break
      }
    }

    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botText,
        sender: 'bot',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, botMessage])
    }, 300)

    setInput('')
  }

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 p-4 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-40"
        >
          <MessageCircle size={24} />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 w-96 h-[600px] flex flex-col z-50 border border-border shadow-xl">
          {/* Header */}
          <div className="bg-primary text-primary-foreground p-4 rounded-t-lg flex items-center justify-between">
            <div>
              <h3 className="font-bold">Pro-Informatique Support</h3>
              <p className="text-xs text-white/80">En ligne</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4 space-y-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs px-4 py-2 rounded-lg ${
                      message.sender === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-foreground'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* Input */}
          <div className="border-t border-border p-4 space-y-3">
            <div className="flex gap-2">
              <Input
                placeholder="Votre message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                className="flex-1"
              />
              <Button
                size="icon"
                onClick={handleSend}
                className="bg-primary hover:bg-primary/90"
              >
                <Send size={18} />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground text-center">
              Réponse typique: moins de 2 heures
            </p>
          </div>
        </Card>
      )}
    </>
  )
}
