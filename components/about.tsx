import Image from "next/image"
import { Sprout, Heart, Award, Users } from "lucide-react"

const values = [
  {
    icon: Sprout,
    title: "100% Orgánico",
    description: "Sin pesticidas ni químicos. Solo tierra, sol y agua de la mejor calidad.",
  },
  {
    icon: Heart,
    title: "Pasión Familiar",
    description: "Tres generaciones dedicadas al cultivo de tomates con amor y tradición.",
  },
  {
    icon: Award,
    title: "Calidad Premium",
    description: "Seleccionamos cada tomate a mano para garantizar la excelencia.",
  },
  {
    icon: Users,
    title: "Comercio Justo",
    description: "Trabajamos directamente con productores locales y apoyamos a la comunidad.",
  },
]

export function About() {
  return (
    <section id="nosotros" className="py-24 bg-secondary">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image */}
          <div className="relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
              <Image
                src="/images/farm-aerial.png"
                alt="Vista aérea de nuestra huerta de tomates orgánicos"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-primary text-primary-foreground p-6 rounded-lg shadow-lg hidden sm:block">
              <p className="text-3xl font-serif font-bold">25+</p>
              <p className="text-sm">Años de experiencia</p>
            </div>
          </div>

          {/* Content */}
          <div>
            <p className="text-sm font-medium uppercase tracking-widest text-primary mb-4">
              Nuestra Historia
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-6 text-balance">
              Cultivando Excelencia en Cada Tomate
            </h2>
            <p className="text-lg text-muted-foreground mb-6 text-pretty">
              En Huerta Dorada, creemos que los mejores tomates nacen de la tierra más cuidada. Nuestra familia ha cultivado estas tierras durante generaciones, perfeccionando el arte de producir tomates orgánicos de sabor incomparable.
            </p>
            <p className="text-lg text-muted-foreground mb-8 text-pretty">
              Trabajamos con métodos tradicionales combinados con técnicas modernas de agricultura sostenible, respetando los ciclos naturales y el medio ambiente.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center p-4 bg-background rounded-lg">
                <p className="text-2xl font-serif font-bold text-primary">500+</p>
                <p className="text-sm text-muted-foreground">Clientes satisfechos</p>
              </div>
              <div className="text-center p-4 bg-background rounded-lg">
                <p className="text-2xl font-serif font-bold text-primary">50</p>
                <p className="text-sm text-muted-foreground">Hectáreas cultivadas</p>
              </div>
            </div>
          </div>
        </div>

        {/* Values grid */}
        <div className="mt-24 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value) => (
            <div key={value.title} className="text-center p-6 bg-background rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="mx-auto w-12 h-12 flex items-center justify-center rounded-full bg-accent/10 text-accent mb-4">
                <value.icon className="h-6 w-6" aria-hidden="true" />
              </div>
              <h3 className="font-serif text-lg font-semibold text-foreground mb-2">{value.title}</h3>
              <p className="text-sm text-muted-foreground">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
