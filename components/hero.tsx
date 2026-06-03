import Image from "next/image"
import Link from "next/link"
import { ArrowDown } from "lucide-react"

export function Hero() {
  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-tomatoes.png"
          alt="Tomates orgánicos frescos en la huerta"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-foreground/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center pt-20">
        <p className="mb-4 text-sm font-medium uppercase tracking-widest text-background/80">
          Agricultura Orgánica de Excelencia
        </p>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-background text-balance leading-tight">
          Desde la Huerta
          <br />
          <span className="text-primary-foreground/90">a Tu Mesa</span>
        </h1>
        <p className="mt-6 mx-auto max-w-2xl text-lg sm:text-xl text-background/90 text-pretty">
          Cultivamos tomates orgánicos con pasión y dedicación. Calidad premium para minoristas y mayoristas que valoran lo auténtico.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="#productos"
            className="rounded-md bg-primary px-8 py-3 text-base font-medium text-primary-foreground transition-all hover:bg-primary/90 hover:scale-105"
          >
            Ver Productos
          </Link>
          <Link
            href="#nosotros"
            className="rounded-md border-2 border-background/80 bg-transparent px-8 py-3 text-base font-medium text-background transition-all hover:bg-background/10"
          >
            Conocer Más
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <Link href="#nosotros" aria-label="Desplazarse hacia abajo">
          <ArrowDown className="h-8 w-8 text-background/70" />
        </Link>
      </div>
    </section>
  )
}
