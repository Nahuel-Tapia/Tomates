"use client"

import { useState, useEffect } from "react"
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react"

const contactInfo = [
  {
    icon: MapPin,
    label: "Dirección",
    value: "Carretera Rural Km 15, Valle Verde",
  },
  {
    icon: Phone,
    label: "Teléfono",
    value: "+52 (555) 123-4567",
  },
  {
    icon: Mail,
    label: "Email",
    value: "ventas@huertadorada.com",
  },
  {
    icon: Clock,
    label: "Horario",
    value: "Lun - Sáb: 7:00 AM - 6:00 PM",
  },
]

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    type: "minorista",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    const handleQuoteMessage = (e: Event) => {
      const customEvent = e as CustomEvent<{ message: string; type: string }>
      if (customEvent.detail) {
        setFormData(prev => ({
          ...prev,
          message: customEvent.detail.message,
          type: customEvent.detail.type || prev.type,
        }))
      }
    }

    window.addEventListener("setQuoteMessage", handleQuoteMessage)
    return () => {
      window.removeEventListener("setQuoteMessage", handleQuoteMessage)
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000))

    try {
      const existingQuotesJson = localStorage.getItem("huerta_dorada_quotes")
      const existingQuotes = existingQuotesJson ? JSON.parse(existingQuotesJson) : []
      
      const newQuote = {
        id: typeof window !== "undefined" && window.crypto && window.crypto.randomUUID ? window.crypto.randomUUID() : Math.random().toString(36).substring(2, 9),
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        type: formData.type,
        message: formData.message,
        date: new Date().toISOString(),
        status: "pendiente",
      }
      
      localStorage.setItem("huerta_dorada_quotes", JSON.stringify([newQuote, ...existingQuotes]))
    } catch (err) {
      console.error("Error saving quote to localStorage:", err)
    }
    
    setIsSubmitting(false)
    setSubmitted(true)
    setFormData({ name: "", email: "", phone: "", type: "minorista", message: "" })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
    <section id="contacto" className="py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-sm font-medium uppercase tracking-widest text-primary mb-4">
            Contacto
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-6 text-balance">
            Hablemos de Tu Pedido
          </h2>
          <p className="text-lg text-muted-foreground text-pretty">
            Estamos listos para atenderte. Cuéntanos qué necesitas y te responderemos a la brevedad.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact form */}
          <div className="bg-card rounded-lg p-8 border border-border">
            {submitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent/20 flex items-center justify-center">
                  <Send className="h-8 w-8 text-accent" />
                </div>
                <h3 className="font-serif text-2xl font-semibold text-foreground mb-2">
                  ¡Mensaje Enviado!
                </h3>
                <p className="text-muted-foreground mb-6">
                  Gracias por contactarnos. Te responderemos pronto.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-primary font-medium hover:underline"
                >
                  Enviar otro mensaje
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                      Nombre completo *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full rounded-md border border-input bg-background px-4 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Tu nombre"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full rounded-md border border-input bg-background px-4 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="tu@email.com"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                      Teléfono
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full rounded-md border border-input bg-background px-4 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="+52 (555) 000-0000"
                    />
                  </div>
                  <div>
                    <label htmlFor="type" className="block text-sm font-medium text-foreground mb-2">
                      Tipo de cliente
                    </label>
                    <select
                      id="type"
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
                      className="w-full rounded-md border border-input bg-background px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="minorista">Minorista</option>
                      <option value="mayorista">Mayorista</option>
                      <option value="restaurante">Restaurante</option>
                      <option value="otro">Otro</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                    Mensaje *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full rounded-md border border-input bg-background px-4 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                    placeholder="Cuéntanos qué productos te interesan y las cantidades aproximadas..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-md bg-primary px-6 py-3 text-base font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    "Enviando..."
                  ) : (
                    <>
                      <Send className="h-4 w-4" aria-hidden="true" />
                      Enviar Mensaje
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Contact info */}
          <div className="space-y-8">
            <div className="bg-secondary rounded-lg p-8">
              <h3 className="font-serif text-xl font-semibold text-foreground mb-6">
                Información de Contacto
              </h3>
              <div className="space-y-6">
                {contactInfo.map((info) => (
                  <div key={info.label} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                      <info.icon className="h-5 w-5 text-accent" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{info.label}</p>
                      <p className="font-medium text-foreground">{info.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-primary rounded-lg p-8 text-primary-foreground">
              <h3 className="font-serif text-xl font-semibold mb-4">
                ¿Necesitas un Pedido Urgente?
              </h3>
              <p className="text-primary-foreground/80 mb-6">
                Llámanos directamente y te atenderemos de inmediato. Tenemos disponibilidad para entregas express.
              </p>
              <a 
                href="tel:+525551234567"
                className="inline-flex items-center gap-2 rounded-md bg-background text-foreground px-6 py-3 font-medium transition-colors hover:bg-background/90"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                Llamar Ahora
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
