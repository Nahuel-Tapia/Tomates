import Image from "next/image"
import { Check } from "lucide-react"

const products = [
  {
    name: "Tomates Frescos",
    description: "Tomates orgánicos de temporada, perfectos para ensaladas, guisos y todo tipo de preparaciones.",
    image: "/images/tomatoes-product.png",
    features: ["Cultivados sin pesticidas", "Maduración natural en planta", "Sabor intenso y auténtico", "Disponible todo el año"],
    badge: "Más Vendido",
  },
  {
    name: "Salsa Artesanal",
    description: "Nuestra salsa de tomate casera, elaborada con receta tradicional y los mejores tomates de la huerta.",
    image: "/images/salsa-product.png",
    features: ["Sin conservantes artificiales", "Receta tradicional familiar", "Perfecta para pastas y pizzas", "Envases de vidrio ecológicos"],
    badge: "Artesanal",
  },
  {
    name: "Tomates Cherry",
    description: "Pequeños tesoros de sabor concentrado, ideales para aperitivos, ensaladas y decoración gourmet.",
    image: "/images/cherry-product.png",
    features: ["Dulzura natural", "Tamaño uniforme", "Textura crujiente", "Variedades rojas y amarillas"],
    badge: "Gourmet",
  },
]

export function Products() {
  return (
    <section id="productos" className="py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-sm font-medium uppercase tracking-widest text-primary mb-4">
            Nuestros Productos
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-6 text-balance">
            Del Campo a Tu Cocina
          </h2>
          <p className="text-lg text-muted-foreground text-pretty">
            Ofrecemos una variedad de productos cultivados con los más altos estándares de calidad orgánica.
          </p>
        </div>

        {/* Products grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {products.map((product) => (
            <article key={product.name} className="group bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow border border-border">
              {/* Image container */}
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <span className="absolute top-4 left-4 bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-medium">
                  {product.badge}
                </span>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-serif text-xl font-semibold text-foreground mb-2">{product.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{product.description}</p>
                
                {/* Features list */}
                <ul className="space-y-2">
                  {product.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-foreground">
                      <Check className="h-4 w-4 text-accent flex-shrink-0" aria-hidden="true" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <a 
                  href="#cotizador"
                  className="mt-6 block w-full text-center rounded-md border border-primary bg-transparent px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
                >
                  Simular Pedido
                </a>
              </div>
            </article>
          ))}
        </div>

        {/* Wholesale note */}
        <div className="mt-16 bg-secondary rounded-lg p-8 text-center">
          <h3 className="font-serif text-2xl font-semibold text-foreground mb-4">
            ¿Eres mayorista o minorista?
          </h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Ofrecemos precios especiales y condiciones flexibles para compras al por mayor. Prueba nuestro simulador o contáctanos de inmediato.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a 
              href="#cotizador"
              className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-base font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Ir al Cotizador
            </a>
            <a 
              href="#contacto"
              className="inline-flex items-center justify-center rounded-md border border-primary px-6 py-3 text-base font-medium text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              Hablar con un Asesor
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
