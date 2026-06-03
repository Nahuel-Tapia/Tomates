"use client"

import { useState } from "react"
import { Sprout, Sun, Hand, Truck, ShieldCheck, Utensils, Play, X, Sparkles } from "lucide-react"

interface ProcessStep {
  number: string
  days: string
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
  videoUrl?: string
  videoTitle?: string
}

const steps: ProcessStep[] = [
  {
    number: "01",
    days: "Día 1-10",
    icon: Sprout,
    title: "Siembra y Germinación",
    description: "Seleccionamos las mejores semillas de tomates orgánicos y las sembramos en semilleros con sustrato nutritivo natural para iniciar un crecimiento fuerte.",
  },
  {
    number: "02",
    days: "Día 25-30",
    icon: Sprout,
    title: "Trasplante a Tierra",
    description: "Los brotes más sanos y vigorosos se trasladan al suelo preparado de la huerta, donde se guían usando tutores de rafia biodegradable.",
  },
  {
    number: "03",
    days: "Día 75-110",
    icon: Sun,
    title: "Maduración Natural",
    description: "Nuestros cultivos se desarrollan bajo la luz constante del sol. Los tomates cambian gradualmente de verde a rojo brillante, concentrando su azúcar y sabor natural sin aceleradores químicos.",
    videoUrl: "/videos/El_Test_de_la_Cicatriz_Rea.mp4",
    videoTitle: "Evaluación y Maduración de Tomates",
  },
  {
    number: "04",
    days: "Día 110-115",
    icon: Hand,
    title: "Cosecha Manual",
    description: "Agricultores dedicados cosechan cada tomate a mano, seleccionándolos individualmente en su punto idóneo de madurez para garantizar que no sufran daños.",
  },
  {
    number: "05",
    days: "Día 115-116",
    icon: ShieldCheck,
    title: "Control y Empaque Ecológico",
    description: "Inspeccionamos la firmeza y calidad de cada pieza. Los tomates se empacan cuidadosamente en envases de cartón biodegradable y cajones de madera reciclada.",
  },
  {
    number: "06",
    days: "Día 116-117",
    icon: Truck,
    title: "Distribución Express",
    description: "Enviamos nuestros pedidos en vehículos climatizados directo a restaurantes, minoristas y distribuidores locales para asegurar la máxima frescura.",
  },
  {
    number: "07",
    days: "Día 117+",
    icon: Utensils,
    title: "Delicia en tu Mesa",
    description: "Los tomates orgánicos llegan listos para que los laves y disfrutes en ensaladas, salsas o tus comidas preferidas con un sabor incomparable.",
    videoUrl: "/videos/comer sin lavar.mp4",
    videoTitle: "Consejos de Consumo y Lavado",
  },
]

export function Process() {
  const [activeVideo, setActiveVideo] = useState<{ url: string; title: string } | null>(null)

  return (
    <section id="proceso" className="py-24 bg-foreground text-background relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <p className="text-sm font-medium uppercase tracking-widest text-primary/80 mb-4 flex items-center justify-center gap-1.5">
            <Sparkles className="h-4 w-4 text-primary" />
            Línea de Tiempo del Cultivo
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-background mb-6 text-balance leading-tight">
            El Viaje de Nuestro Tomate
          </h2>
          <p className="text-lg text-background/80 text-pretty">
            Conoce el proceso artesanal y natural desde que colocamos la primera semilla en la tierra hasta que el tomate llega fresco a tu mesa.
          </p>
        </div>

        {/* Timeline representation */}
        <div className="relative">
          {/* Vertical central line (Desktop: center, Mobile: left) */}
          <div className="absolute left-8 lg:left-1/2 top-0 bottom-0 w-[2px] bg-background/10 -translate-x-1/2 border-l border-dashed border-background/20" />

          <div className="space-y-16 lg:space-y-24">
            {steps.map((step, idx) => {
              const isEven = idx % 2 === 0
              const StepIcon = step.icon
              return (
                <div 
                  key={step.number} 
                  className={`relative flex flex-col lg:flex-row items-start ${
                    isEven ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  
                  {/* Bullet Indicator */}
                  <div className="absolute left-8 lg:left-1/2 -translate-x-1/2 z-20 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-primary border-4 border-foreground text-primary-foreground flex items-center justify-center shadow-lg font-bold text-sm">
                      {step.number}
                    </div>
                  </div>

                  {/* Spacer Column for desktop alignment */}
                  <div className="hidden lg:block lg:w-1/2" />

                  {/* Timeline Card */}
                  <div className="pl-16 lg:pl-0 lg:w-1/2 lg:px-12 w-full">
                    <div className="bg-background/5 border border-background/10 rounded-2xl p-6 hover:bg-background/10 transition-all hover:scale-[1.01] hover:border-primary/30 group duration-300 relative">
                      
                      {/* Step Header */}
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                        <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider">
                          {step.days}
                        </span>
                        <div className="w-8 h-8 rounded-full bg-background/5 text-primary flex items-center justify-center">
                          <StepIcon className="h-4 w-4" />
                        </div>
                      </div>

                      {/* Title & Description */}
                      <h3 className="font-serif text-xl font-bold text-background mb-3">
                        {step.title}
                      </h3>
                      <p className="text-sm text-background/70 leading-relaxed text-pretty mb-4">
                        {step.description}
                      </p>

                      {/* Video trigger if available */}
                      {step.videoUrl && (
                        <button
                          onClick={() => setActiveVideo({ url: step.videoUrl!, title: step.videoTitle || step.title })}
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary hover:bg-primary/95 text-primary-foreground text-xs font-semibold transition-all cursor-pointer shadow-md hover:shadow-primary/20 active:scale-95 duration-150"
                        >
                          <Play className="h-3.5 w-3.5 fill-current" />
                          Ver Video del Proceso
                        </button>
                      )}

                    </div>
                  </div>

                </div>
              )
            })}
          </div>
        </div>

        {/* Certification badges */}
        <div className="mt-28 pt-12 border-t border-background/10">
          <p className="text-center text-sm text-background/60 mb-8 font-semibold tracking-wider uppercase">Certificaciones de Confianza</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            <div className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 rounded-full bg-background/5 border border-background/10 flex items-center justify-center">
                <span className="text-3xl">🌿</span>
              </div>
              <span className="text-xs text-background/70 font-medium">Orgánico Certificado</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 rounded-full bg-background/5 border border-background/10 flex items-center justify-center">
                <span className="text-3xl">🌍</span>
              </div>
              <span className="text-xs text-background/70 font-medium">Agricultura Sostenible</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 rounded-full bg-background/5 border border-background/10 flex items-center justify-center">
                <span className="text-3xl">🏆</span>
              </div>
              <span className="text-xs text-background/70 font-medium">Calidad Premium</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 rounded-full bg-background/5 border border-background/10 flex items-center justify-center">
                <span className="text-3xl">♻️</span>
              </div>
              <span className="text-xs text-background/70 font-medium">Empaque Ecológico</span>
            </div>
          </div>
        </div>

      </div>

      {/* Video Lightbox Modal */}
      {activeVideo && (
        <div 
          className="fixed inset-0 z-55 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 select-none animate-[fadeIn_0.2s_ease-out]"
          onClick={() => setActiveVideo(null)}
        >
          <div 
            className="relative bg-zinc-950 rounded-2xl overflow-hidden max-w-3xl w-full border border-white/10 shadow-2xl animate-[scaleUp_0.2s_ease-out]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-6 py-4 bg-zinc-900 border-b border-white/5 flex items-center justify-between">
              <h4 className="text-sm font-semibold text-white truncate max-w-[80%]">
                {activeVideo.title}
              </h4>
              <button
                onClick={() => setActiveVideo(null)}
                className="p-1 rounded-full bg-white/5 hover:bg-white/15 text-white/70 hover:text-white transition-colors cursor-pointer"
                aria-label="Cerrar reproductor"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            {/* Video element */}
            <div className="relative aspect-video w-full bg-black">
              <video
                src={activeVideo.url}
                controls
                autoPlay
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
