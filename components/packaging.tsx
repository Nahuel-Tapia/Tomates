"use client"

import Image from "next/image"
import { ShieldCheck, Recycle, Sparkles, Box } from "lucide-react"

const packagingDetails = [
  {
    icon: Box,
    title: "Cajones de Madera Rústica",
    forProduct: "Tomates Frescos",
    description: "Diseñados para permitir una ventilación óptima durante el transporte, evitando que los tomates se humedezcan. Madera de pino 100% sustentable y reutilizable.",
  },
  {
    icon: Recycle,
    title: "Frascos de Vidrio Herméticos",
    forProduct: "Salsa de Tomate Artesanal",
    description: "Sellados al vacío para preservar la frescura y el sabor de nuestra receta tradicional durante 12 meses sin conservadores químicos. 100% reciclables y reutilizables.",
  },
  {
    icon: ShieldCheck,
    title: "Cajas de Cartón Biodegradables",
    forProduct: "Tomates Cherry",
    description: "Empaques de cartón Kraft con ventana transparente libre de plásticos dañinos. Ideales para la exhibición y conservación de la frescura del cherry gourmet.",
  },
]

export function Packaging() {
  return (
    <section id="empaques" className="py-24 bg-secondary">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Image with design decorations */}
          <div className="lg:col-span-6 relative">
            {/* Background decorative blob */}
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-primary/10 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-accent/15 rounded-full blur-3xl pointer-events-none" />
            
            <div className="relative aspect-video sm:aspect-[4/3] rounded-2xl overflow-hidden shadow-xl border-4 border-background dark:border-card">
              <Image
                src="/images/packaging.png"
                alt="Presentaciones y empaques de Huerta Dorada: salsas en frasco, tomates en cajón de madera y cherrys en caja ecológica"
                fill
                priority
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw"
                className="object-cover"
              />
            </div>
            
            {/* Overlay badge */}
            <div className="absolute -bottom-6 right-6 bg-primary text-primary-foreground py-4 px-6 rounded-xl shadow-lg hidden sm:flex items-center gap-3">
              <Recycle className="h-6 w-6 text-primary-foreground animate-spin-slow" />
              <div>
                <p className="text-xs uppercase tracking-widest font-semibold opacity-85">Compromiso</p>
                <p className="font-serif font-bold text-sm">Empaques 100% Ecológicos</p>
              </div>
            </div>
          </div>

          {/* Right Column: Descriptions & lists */}
          <div className="lg:col-span-6 space-y-8">
            <div>
              <p className="text-sm font-medium uppercase tracking-widest text-primary mb-4 flex items-center gap-1.5">
                <Sparkles className="h-4 w-4" />
                Diseño Sostenible
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-6 text-balance">
                Presentaciones Creadas para Cuidar la Frescura
              </h2>
              <p className="text-lg text-muted-foreground text-pretty">
                La calidad de nuestros tomates orgánicos también se define por la forma en que los protegemos. Hemos diseñado soluciones de empaque ecológico que respetan la naturaleza y garantizan que el producto llegue firme, sabroso y en óptimas condiciones.
              </p>
            </div>

            <div className="space-y-6">
              {packagingDetails.map((detail, index) => {
                const DetailIcon = detail.icon
                return (
                  <div key={index} className="flex gap-4 p-4 rounded-xl hover:bg-background/40 transition-colors duration-300 border border-transparent hover:border-border/30">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                      <DetailIcon className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-serif text-lg font-semibold text-foreground">
                          {detail.title}
                        </h3>
                        <span className="px-2 py-0.5 rounded bg-primary/10 text-primary text-[10px] font-semibold uppercase">
                          {detail.forProduct}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2 leading-relaxed text-pretty">
                        {detail.description}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
