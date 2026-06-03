"use client"

import { useState } from "react"
import { HelpCircle, ChevronDown } from "lucide-react"

interface FAQItem {
  question: string
  answer: string
}

const faqs: FAQItem[] = [
  {
    question: "¿Qué certificaciones orgánicas tienen sus tomates?",
    answer: "Nuestros tomates cuentan con certificaciones oficiales de agricultura orgánica nacional e internacional. Cultivamos 100% libres de pesticidas, herbicidas y fertilizantes químicos. Utilizamos abonos orgánicos compostados y control biológico de plagas para cuidar la tierra y tu salud.",
  },
  {
    question: "¿Cuál es el pedido mínimo para distribución y flete?",
    answer: "Para clientes particulares o locales en la zona de Valle Verde, no hay un mínimo establecido. Para envíos comerciales o a otras ciudades, sugerimos un pedido mínimo de 10 cajones (100 kg) de tomates frescos o 5 cajas de salsa para asegurar tarifas de envío competitivas.",
  },
  {
    question: "¿Cómo garantizan la frescura de los tomates durante el transporte?",
    answer: "Cosechamos bajo demanda en las primeras horas de la mañana, seleccionamos y empacamos de inmediato. Los envíos se realizan el mismo día en vehículos acondicionados para mantener una temperatura y humedad óptimas, garantizando que el tomate llegue firme y fresco a tu negocio.",
  },
  {
    question: "¿Tienen esquemas de entrega periódica para restaurantes?",
    answer: "Sí, contamos con planes de suscripción semanal, quincenal o mensual adaptados al consumo de tu cocina. Estos planes no solo garantizan el abastecimiento prioritario durante todo el año, sino que también otorgan descuentos fijos de hasta el 10% sobre el precio de lista.",
  },
  {
    question: "¿Cuál es la vida útil y método de conservación de la salsa artesanal?",
    answer: "Al no contener conservantes químicos artificiales, nuestra salsa artesanal cerrada al vacío tiene una vida útil de 12 meses en un lugar fresco y seco. Una vez abierta, debe mantenerse en refrigeración y consumirse dentro de los 7 a 10 días posteriores.",
  },
]

export function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(null)

  const toggleFAQ = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx)
  }

  return (
    <section id="faq" className="py-24 bg-secondary/20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary mb-4 text-xs font-semibold uppercase tracking-wider">
            <HelpCircle className="h-3.5 w-3.5" />
            Preguntas Frecuentes
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-6 text-balance">
            Resolvemos Tus Dudas
          </h2>
          <p className="text-lg text-muted-foreground text-pretty">
            ¿Quieres saber más sobre nuestro proceso de cultivo, envíos o ventas al mayoreo? Encuentra aquí las respuestas a las consultas más habituales.
          </p>
        </div>

        {/* Accordions */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx
            return (
              <div
                key={idx}
                className="bg-background rounded-xl border border-border overflow-hidden transition-all duration-300 shadow-sm hover:shadow-md"
              >
                {/* Header Button */}
                <button
                  onClick={() => toggleFAQ(idx)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left font-serif text-base sm:text-lg font-semibold text-foreground hover:text-primary transition-colors cursor-pointer select-none"
                  aria-expanded={isOpen}
                >
                  <span>{faq.question}</span>
                  <span className={`p-1 rounded-full bg-secondary text-muted-foreground transition-transform duration-300 ${isOpen ? "rotate-180 text-primary bg-primary/10" : ""}`}>
                    <ChevronDown className="h-4 w-4" />
                  </span>
                </button>

                {/* Answer Content Panel (animated using CSS Grid transition) */}
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0 pointer-events-none"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-6 pb-6 pt-2 text-sm sm:text-base text-muted-foreground leading-relaxed text-pretty border-t border-border/40 bg-secondary/5">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
