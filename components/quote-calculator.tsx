"use client"

import { useState, useEffect } from "react"
import { Calculator, Check, ArrowRight, Info, AlertTriangle } from "lucide-react"

interface Packaging {
  id: string
  name: string
  price: number
  unit: string
}

interface Product {
  id: string
  name: string
  baseDescription: string
  packagingOptions: Packaging[]
}

const products: Product[] = [
  {
    id: "frescos",
    name: "Tomates Frescos Orgánicos",
    baseDescription: "Tomates de mesa seleccionados a mano, madurados al sol.",
    packagingOptions: [
      { id: "cajon-10kg", name: "Cajón de Madera (10 kg)", price: 15000, unit: "cajón" },
      { id: "caja-5kg", name: "Caja de Cartón Premium (5 kg)", price: 9000, unit: "caja" },
    ],
  },
  {
    id: "salsa",
    name: "Salsa Artesanal de Tomate",
    baseDescription: "Elaborada con receta tradicional, libre de conservadores.",
    packagingOptions: [
      { id: "caja-6salsas", name: "Caja de 6 Envases (500ml c/u)", price: 24000, unit: "caja" },
      { id: "salsa-individual", name: "Envase Individual (500ml)", price: 4500, unit: "envase" },
    ],
  },
  {
    id: "cherry",
    name: "Tomates Cherry Orgánicos",
    baseDescription: "Pequeños, dulces y crujientes. Perfectos para ensaladas gourmet.",
    packagingOptions: [
      { id: "caja-12cherry", name: "Caja de 12 Clamshells (250g c/u)", price: 20000, unit: "caja" },
      { id: "cherry-granel", name: "A Granel (5 kg)", price: 14000, unit: "caja" },
    ],
  },
]

const clientTypeLabels: Record<string, string> = {
  particular: "Particular / Minorista",
  restaurante: "Restaurante / Cafetería",
  mayorista: "Distribuidor / Mayorista",
}

const frequencyLabels: Record<string, string> = {
  unico: "Pedido único",
  semanal: "Semanal (10% desc. extra)",
  quincenal: "Quincenal (5% desc. extra)",
  mensual: "Mensual",
}

export function QuoteCalculator() {
  const [selectedProductIdx, setSelectedProductIdx] = useState(0)
  const [selectedPackIdx, setSelectedPackIdx] = useState(0)
  const [quantity, setQuantity] = useState(5)
  const [clientType, setClientType] = useState<"particular" | "restaurante" | "mayorista">("particular")
  const [frequency, setFrequency] = useState<"unico" | "semanal" | "quincenal" | "mensual">("unico")

  const product = products[selectedProductIdx]
  const pack = product.packagingOptions[selectedPackIdx] || product.packagingOptions[0]

  // Reset selected package when product changes
  useEffect(() => {
    setSelectedPackIdx(0)
  }, [selectedProductIdx])

  // Calculation logic
  const basePrice = pack.price * quantity
  
  // Calculate discount based on client type & quantity
  let discountPercent = 0
  if (clientType === "restaurante") {
    discountPercent = quantity >= 10 ? 12 : 5
  } else if (clientType === "mayorista") {
    discountPercent = quantity >= 25 ? 20 : 12
  } else {
    // Particular: minor volume discounts
    if (quantity >= 15) discountPercent = 5
  }

  // Frequency discount
  let frequencyDiscountPercent = 0
  if (frequency === "semanal") frequencyDiscountPercent = 10
  else if (frequency === "quincenal") frequencyDiscountPercent = 5

  const totalDiscountPercent = Math.min(30, discountPercent + frequencyDiscountPercent) // Cap at 30%
  const discountAmount = Math.round(basePrice * (totalDiscountPercent / 100))
  const finalPrice = basePrice - discountAmount

  const handleSendToContact = () => {
    const message = `Hola Huerta Dorada, me interesa solicitar una cotización personalizada con los siguientes detalles:\n\n` +
      `- Producto: ${product.name}\n` +
      `- Presentación: ${pack.name}\n` +
      `- Cantidad: ${quantity} unidades\n` +
      `- Tipo de Cliente: ${clientTypeLabels[clientType]}\n` +
      `- Frecuencia de envío: ${frequencyLabels[frequency]}\n\n` +
      `Estimado preliminar calculado: $${finalPrice.toLocaleString("es-AR", { minimumFractionDigits: 0, maximumFractionDigits: 0 })} ARS (con ${totalDiscountPercent}% de descuento total aplicado).\n\n` +
      `Por favor, pónganse en contacto conmigo para acordar condiciones de entrega y método de pago.`;

    const event = new CustomEvent("setQuoteMessage", {
      detail: {
        message,
        type: clientType === "particular" ? "minorista" : clientType === "mayorista" ? "mayorista" : clientType === "restaurante" ? "restaurante" : "otro"
      }
    })
    window.dispatchEvent(event)
    
    // Smooth scroll to contact section
    const contactSection = document.getElementById("contacto")
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section id="cotizador" className="py-24 bg-secondary/30 border-y border-border/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary mb-4 text-xs font-semibold uppercase tracking-wider">
            <Calculator className="h-3.5 w-3.5" />
            Simulador de Pedidos
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-6 text-balance">
            Calcula Tu Presupuesto al Instante
          </h2>
          <p className="text-lg text-muted-foreground text-pretty">
            Personaliza tu pedido, visualiza los descuentos por volumen y recibe una cotización adaptada a las necesidades de tu hogar o negocio.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Form Controls */}
          <div className="lg:col-span-7 bg-background rounded-2xl p-6 sm:p-8 shadow-sm border border-border space-y-8">
            
            {/* Step 1: Select Product */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-3">
                1. Selecciona el Producto
              </label>
              <div className="grid sm:grid-cols-3 gap-3">
                {products.map((p, idx) => (
                  <button
                    key={p.id}
                    onClick={() => setSelectedProductIdx(idx)}
                    className={`p-4 rounded-xl text-left border transition-all cursor-pointer ${
                      selectedProductIdx === idx
                        ? "border-primary bg-primary/5 text-foreground ring-2 ring-primary/20"
                        : "border-border bg-card hover:bg-muted/50 text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <span className="block font-semibold text-sm mb-1 text-foreground">{p.name}</span>
                    <span className="block text-xs line-clamp-2 leading-relaxed">{p.baseDescription}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Packaging Selection */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-3">
                2. Elige la Presentación
              </label>
              <div className="grid sm:grid-cols-2 gap-3">
                {product.packagingOptions.map((option, idx) => (
                  <button
                    key={option.id}
                    onClick={() => setSelectedPackIdx(idx)}
                    className={`p-4 rounded-xl text-left border flex items-center justify-between transition-all cursor-pointer ${
                      selectedPackIdx === idx
                        ? "border-primary bg-primary/5 text-foreground ring-2 ring-primary/20"
                        : "border-border bg-card hover:bg-muted/50 text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <div>
                      <span className="block font-semibold text-sm text-foreground">{option.name}</span>
                      <span className="block text-xs mt-1 text-primary font-medium">
                        ${option.price.toLocaleString("es-AR")} ARS / {option.unit}
                      </span>
                    </div>
                    {selectedPackIdx === idx && (
                      <span className="h-5 w-5 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                        <Check className="h-3 w-3" />
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Quantity Selector */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <label htmlFor="qty-range" className="text-sm font-semibold text-foreground">
                  3. Cantidad ({pack.unit}s)
                </label>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 rounded-md bg-secondary hover:bg-secondary-foreground/10 flex items-center justify-center font-bold text-foreground cursor-pointer"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-16 h-8 text-center rounded-md border border-input bg-background font-semibold text-foreground"
                  />
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 rounded-md bg-secondary hover:bg-secondary-foreground/10 flex items-center justify-center font-bold text-foreground cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>
              <input
                id="qty-range"
                type="range"
                min="1"
                max="100"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
                className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-2">
                <span>1 {pack.unit}</span>
                <span>50 {pack.unit}s</span>
                <span>100+ {pack.unit}s</span>
              </div>
            </div>

            {/* Step 4: Client Type & Frequency */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="client-type" className="block text-sm font-semibold text-foreground mb-2">
                  4. Tipo de Perfil
                </label>
                <select
                  id="client-type"
                  value={clientType}
                  onChange={(e) => setClientType(e.target.value as any)}
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer text-sm"
                >
                  <option value="particular">Particular / Hogar</option>
                  <option value="restaurante">Restaurante / Chef</option>
                  <option value="mayorista">Distribuidor / Mayorista</option>
                </select>
              </div>
              <div>
                <label htmlFor="delivery-freq" className="block text-sm font-semibold text-foreground mb-2">
                  5. Frecuencia de Pedidos
                </label>
                <select
                  id="delivery-freq"
                  value={frequency}
                  onChange={(e) => setFrequency(e.target.value as any)}
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer text-sm"
                >
                  <option value="unico">Pedido Único</option>
                  <option value="semanal">Semanal (Descuento)</option>
                  <option value="quincenal">Quincenal (Descuento)</option>
                  <option value="mensual">Mensual (Estándar)</option>
                </select>
              </div>
            </div>

            {/* Hint Notice */}
            <div className="flex items-start gap-3 p-4 rounded-xl bg-accent/5 border border-accent/10 text-xs text-foreground/90">
              <Info className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold block mb-0.5">Beneficios Exclusivos aplicados:</span>
                {clientType === "mayorista" && "Tarifas con 12% de descuento base y 20% a partir de 25 cajones/cajas."}
                {clientType === "restaurante" && "Tarifas comerciales con 5% de descuento base y 12% a partir de 10 unidades."}
                {clientType === "particular" && quantity >= 15 && "¡Descuento del 5% por compra familiar superior a 15 piezas!"}
                {clientType === "particular" && quantity < 15 && "Agrega más unidades para recibir descuentos por volumen."}
                {frequency !== "unico" && " Se suma descuento adicional por suscripción periódica."}
              </div>
            </div>

          </div>

          {/* Right Column: Quote receipt */}
          <div className="lg:col-span-5 bg-foreground text-background rounded-2xl p-6 sm:p-8 shadow-lg border border-foreground/10 relative overflow-hidden flex flex-col justify-between h-full min-h-[450px]">
            {/* Background design elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-accent/25 rounded-full blur-xl pointer-events-none" />

            <div>
              {/* Receipt Header */}
              <div className="border-b border-background/10 pb-6 mb-6">
                <h3 className="font-serif text-xl font-bold flex items-center gap-2">
                  <span className="text-primary text-2xl">🍅</span> Resumen de Cotización
                </h3>
                <p className="text-xs text-background/60 mt-1">Simulación Huerta Dorada S.A.</p>
              </div>

              {/* Receipt Details */}
              <div className="space-y-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-background/70">Producto:</span>
                  <span className="font-medium text-right max-w-[200px] truncate">{product.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-background/70">Presentación:</span>
                  <span className="font-medium text-right max-w-[200px] truncate">{pack.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-background/70">Precio unitario:</span>
                  <span className="font-medium">${pack.price.toLocaleString("es-AR")} ARS</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-background/70">Cantidad:</span>
                  <span className="font-semibold text-primary-foreground">{quantity} {pack.unit}s</span>
                </div>
                <div className="flex justify-between border-t border-background/10 pt-4">
                  <span className="text-background/70">Subtotal:</span>
                  <span className="font-medium">${basePrice.toLocaleString("es-AR")} ARS</span>
                </div>

                {totalDiscountPercent > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span className="flex items-center gap-1">
                      Descuento ({totalDiscountPercent}%):
                    </span>
                    <span>-${discountAmount.toLocaleString("es-AR")} ARS</span>
                  </div>
                )}
              </div>
            </div>

            {/* Total Section */}
            <div className="mt-8 pt-6 border-t border-background/10">
              <div className="flex justify-between items-baseline mb-6">
                <span className="text-base text-background/80 font-serif">Total Estimado:</span>
                <div className="text-right">
                  <span className="text-3xl sm:text-4xl font-serif font-bold text-primary-foreground">
                    ${finalPrice.toLocaleString("es-AR")}
                  </span>
                  <span className="block text-[10px] text-background/50">ARS + Envío a cotizar</span>
                </div>
              </div>

              {clientType === "mayorista" && quantity < 10 && (
                <div className="mb-4 flex items-center gap-1.5 text-amber-400 text-xs bg-amber-450/10 p-2 rounded-lg border border-amber-450/20">
                  <AlertTriangle className="h-3.5 w-3.5 flex-shrink-0" />
                  <span>Pedido mínimo sugerido para mayoristas es de 10 unidades.</span>
                </div>
              )}

              <button
                onClick={handleSendToContact}
                className="w-full py-4 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md hover:shadow-lg active:scale-[0.98]"
              >
                Proceder a Cotizar
                <ArrowRight className="h-4 w-4" />
              </button>

              <p className="text-[10px] text-center text-background/40 mt-3">
                * Este es un estimado inicial. El precio final y costo de envío se confirmarán por correo/teléfono.
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
