"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { X, Search, ChevronLeft, ChevronRight } from "lucide-react"

interface GalleryItem {
  id: number
  title: string
  category: "huerta" | "cosecha" | "productos"
  image: string
  description: string
}

const galleryItems: GalleryItem[] = [
  {
    id: 1,
    title: "Nuestra Huerta Orgánica",
    category: "huerta",
    image: "/images/farm-aerial.png",
    description: "Vista aérea de nuestros campos en Valle Verde, cultivados de forma sostenible.",
  },
  {
    id: 2,
    title: "Cosecha Fresca de Tomates",
    category: "cosecha",
    image: "/images/tomatoes-product.png",
    description: "Tomates recolectados a mano en su punto óptimo de madurez para el mejor sabor.",
  },
  {
    id: 3,
    title: "Cultivo Cherry Protegido",
    category: "huerta",
    image: "/images/hero-tomatoes.png",
    description: "Nuestros tomates crecen bajo condiciones ideales, recibiendo agua pura y sol.",
  },
  {
    id: 4,
    title: "Salsa Familiar en Envasado",
    category: "productos",
    image: "/images/salsa-product.png",
    description: "Proceso artesanal de envasado en frascos de vidrio ecológicos.",
  },
  {
    id: 5,
    title: "Variedades Cherry Especiales",
    category: "productos",
    image: "/images/cherry-product.png",
    description: "Tomates cherry de sabor concentrado listos para su distribución.",
  },
  {
    id: 6,
    title: "Inspección de Calidad",
    category: "cosecha",
    image: "/images/tomatoes-product.png",
    description: "Cada pieza pasa por un riguroso control manual antes del empaque.",
  },
]

export function Gallery() {
  const [filter, setFilter] = useState<"todo" | "huerta" | "cosecha" | "productos">("todo")
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null)

  const filteredItems = galleryItems.filter(
    (item) => filter === "todo" || item.category === filter
  )

  // Handle Escape key for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIdx === null) return
      if (e.key === "Escape") setLightboxIdx(null)
      if (e.key === "ArrowLeft") handlePrev()
      if (e.key === "ArrowRight") handleNext()
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [lightboxIdx])

  const handlePrev = () => {
    setLightboxIdx((prev) => (prev !== null ? (prev === 0 ? filteredItems.length - 1 : prev - 1) : null))
  }

  const handleNext = () => {
    setLightboxIdx((prev) => (prev !== null ? (prev === filteredItems.length - 1 ? 0 : prev + 1) : null))
  }

  return (
    <section id="galeria" className="py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-sm font-medium uppercase tracking-widest text-primary mb-4">
            Galería Visual
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-6 text-balance">
            Conoce la Vida en la Huerta
          </h2>
          <p className="text-lg text-muted-foreground text-pretty">
            Transparentes en nuestro trabajo. Echa un vistazo a nuestros campos de cultivo, procesos de cosecha artesanal y la calidad final de los productos.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {["todo", "huerta", "cosecha", "productos"].map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category as any)}
              className={`px-6 py-2 rounded-full text-sm font-medium capitalize transition-all cursor-pointer ${
                filter === category
                  ? "bg-primary text-primary-foreground shadow-md shadow-primary/10"
                  : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              {category === "todo" ? "Todos" : category === "huerta" ? "Nuestra Huerta" : category}
            </button>
          ))}
        </div>

        {/* Grid Items */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, idx) => (
            <article
              key={item.id}
              onClick={() => setLightboxIdx(idx)}
              className="group relative aspect-4/3 rounded-xl overflow-hidden shadow-sm hover:shadow-lg border border-border bg-card cursor-pointer"
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              
              {/* Glassmorphism Hover Overlay */}
              <div className="absolute inset-0 bg-foreground/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 backdrop-blur-[2px]">
                <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-background/20 backdrop-blur-md flex items-center justify-center text-background">
                  <Search className="h-5 w-5" />
                </div>
                <span className="text-xs font-semibold uppercase tracking-widest text-primary-foreground/80 mb-1">
                  {item.category === "huerta" ? "Nuestra Huerta" : item.category}
                </span>
                <h3 className="font-serif text-lg font-bold text-background leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs text-background/80 mt-1 line-clamp-2">
                  {item.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxIdx !== null && (
        <div className="fixed inset-0 z-55 bg-foreground/95 backdrop-blur-sm flex items-center justify-center p-4 select-none">
          {/* Close Button */}
          <button
            onClick={() => setLightboxIdx(null)}
            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-background/10 hover:bg-background/20 flex items-center justify-center text-background transition-colors cursor-pointer"
            aria-label="Cerrar vista"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Navigation controls */}
          <button
            onClick={handlePrev}
            className="absolute left-6 w-12 h-12 rounded-full bg-background/10 hover:bg-background/20 flex items-center justify-center text-background transition-colors cursor-pointer"
            aria-label="Imagen anterior"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-6 w-12 h-12 rounded-full bg-background/10 hover:bg-background/20 flex items-center justify-center text-background transition-colors cursor-pointer"
            aria-label="Siguiente imagen"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Lightbox Content */}
          <div className="max-w-4xl w-full flex flex-col items-center gap-4">
            <div className="relative aspect-video w-full max-h-[70vh] rounded-lg overflow-hidden">
              <Image
                src={filteredItems[lightboxIdx].image}
                alt={filteredItems[lightboxIdx].title}
                fill
                className="object-contain"
              />
            </div>
            
            {/* Info panel */}
            <div className="text-center text-background max-w-2xl px-4">
              <span className="text-xs font-semibold uppercase tracking-widest text-primary/80">
                {filteredItems[lightboxIdx].category === "huerta" ? "Nuestra Huerta" : filteredItems[lightboxIdx].category}
              </span>
              <h3 className="font-serif text-2xl font-bold mt-1 text-background">
                {filteredItems[lightboxIdx].title}
              </h3>
              <p className="text-sm text-background/80 mt-2">
                {filteredItems[lightboxIdx].description}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
