"use client"

import { useState, useEffect } from "react"
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react"

const testimonials = [
  {
    quote: "La calidad de los tomates de Huerta Dorada es incomparable. Mis clientes siempre notan la diferencia en el sabor de mis platillos y salsas.",
    author: "María González",
    role: "Chef, Restaurante La Cocina",
    rating: 5,
    avatar: "MG",
    color: "bg-primary/20 text-primary",
  },
  {
    quote: "Llevamos 5 años trabajando con ellos y nunca nos han fallado. La frescura y puntualidad en las entregas al por mayor es excepcional.",
    author: "Carlos Mendoza",
    role: "Gerente de Compras, Supermercados Del Valle",
    rating: 5,
    avatar: "CM",
    color: "bg-accent/20 text-accent",
  },
  {
    quote: "Sus salsas artesanales son las favoritas de mis clientes. El sabor casero y 100% natural no se encuentra en ningún otro lado.",
    author: "Ana Torres",
    role: "Propietaria, Tienda Gourmet El Roble",
    rating: 5,
    avatar: "AT",
    color: "bg-secondary text-foreground",
  },
]

export function Testimonials() {
  const [activeIdx, setActiveIdx] = useState(0)
  const [isAutoplay, setIsAutoplay] = useState(true)

  useEffect(() => {
    if (!isAutoplay) return
    const interval = setInterval(() => {
      setActiveIdx((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))
    }, 6000)
    return () => clearInterval(interval)
  }, [isAutoplay])

  const handlePrev = () => {
    setIsAutoplay(false)
    setActiveIdx((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setIsAutoplay(false)
    setActiveIdx((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))
  }

  const active = testimonials[activeIdx]

  return (
    <section className="py-24 bg-secondary/50 overflow-hidden">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="text-sm font-medium uppercase tracking-widest text-primary mb-4">
            Testimonios
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-6 text-balance">
            Lo Que Dicen Nuestros Clientes
          </h2>
          <p className="text-lg text-muted-foreground text-pretty">
            La confianza y satisfacción de quienes nos eligen día a día es el reflejo de nuestra dedicación al campo.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative bg-background rounded-2xl p-8 sm:p-12 shadow-sm border border-border/80">
          {/* Quote icon decorator */}
          <Quote className="absolute top-8 left-8 h-16 w-16 text-primary/5 pointer-events-none" aria-hidden="true" />
          <Quote className="absolute bottom-8 right-8 h-16 w-16 text-primary/5 pointer-events-none rotate-180" aria-hidden="true" />

          {/* Testimonial Content with Fading Effect */}
          <div className="relative min-h-[220px] flex flex-col justify-between z-10">
            <div>
              {/* Rating stars */}
              <div className="flex gap-1 justify-center mb-6">
                {Array.from({ length: active.rating }).map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-primary text-primary" aria-hidden="true" />
                ))}
              </div>

              {/* Review Text */}
              <blockquote className="text-xl sm:text-2xl font-serif text-foreground text-center italic leading-relaxed text-pretty max-w-3xl mx-auto transition-opacity duration-500">
                "{active.quote}"
              </blockquote>
            </div>

            {/* Author details */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8 pt-6 border-t border-border/50">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm shadow-inner ${active.color}`}>
                {active.avatar}
              </div>
              <div className="text-center sm:text-left">
                <p className="font-bold text-foreground text-base leading-snug">{active.author}</p>
                <p className="text-xs text-muted-foreground">{active.role}</p>
              </div>
            </div>
          </div>

          {/* Carousel Arrows */}
          <div className="absolute top-1/2 -translate-y-1/2 left-4 right-4 sm:-left-6 sm:-right-6 flex justify-between pointer-events-none z-20">
            <button
              onClick={handlePrev}
              className="w-10 h-10 rounded-full bg-background border border-border shadow-sm flex items-center justify-center text-foreground hover:bg-muted transition-colors cursor-pointer pointer-events-auto active:scale-95"
              aria-label="Testimonio anterior"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={handleNext}
              className="w-10 h-10 rounded-full bg-background border border-border shadow-sm flex items-center justify-center text-foreground hover:bg-muted transition-colors cursor-pointer pointer-events-auto active:scale-95"
              aria-label="Siguiente testimonio"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Carousel Indicators (Dots) */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setIsAutoplay(false)
                setActiveIdx(idx)
              }}
              className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                activeIdx === idx ? "bg-primary w-6" : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
              }`}
              aria-label={`Ir al testimonio ${idx + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  )
}
