import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Products } from "@/components/products"
import { Packaging } from "@/components/packaging"
import { QuoteCalculator } from "@/components/quote-calculator"
import { Process } from "@/components/process"
import { Gallery } from "@/components/gallery"
import { Testimonials } from "@/components/testimonials"
import { FAQ } from "@/components/faq"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"
import { ScrollReveal } from "@/components/scroll-reveal"

export default function Home() {
  return (
    <>
      <Header />
      <main className="overflow-hidden">
        <Hero />
        
        <ScrollReveal animation="slide-up">
          <About />
        </ScrollReveal>
        
        <ScrollReveal animation="fade-in">
          <Products />
        </ScrollReveal>

        <ScrollReveal animation="slide-up">
          <Packaging />
        </ScrollReveal>
        
        <ScrollReveal animation="slide-up">
          <QuoteCalculator />
        </ScrollReveal>
        
        <ScrollReveal animation="fade-in">
          <Process />
        </ScrollReveal>
        
        <ScrollReveal animation="slide-up">
          <Gallery />
        </ScrollReveal>
        
        <ScrollReveal animation="fade-in">
          <Testimonials />
        </ScrollReveal>
        
        <ScrollReveal animation="slide-up">
          <FAQ />
        </ScrollReveal>
        
        <ScrollReveal animation="fade-in">
          <Contact />
        </ScrollReveal>
      </main>
      <Footer />
    </>
  )
}
