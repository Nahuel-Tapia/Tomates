"use client"

import React, { useEffect, useRef, useState } from "react"

interface ScrollRevealProps {
  children: React.ReactNode
  className?: string
  animation?: "fade-in" | "slide-up" | "slide-down" | "slide-left" | "slide-right" | "scale-up"
  duration?: number
  delay?: number
}

const animationClasses = {
  "fade-in": "opacity-0",
  "slide-up": "opacity-0 translate-y-12",
  "slide-down": "opacity-0 -translate-y-12",
  "slide-left": "opacity-0 translate-x-12",
  "slide-right": "opacity-0 -translate-x-12",
  "scale-up": "opacity-0 scale-95",
}

const activeClasses = {
  "fade-in": "opacity-100",
  "slide-up": "opacity-100 translate-y-0",
  "slide-down": "opacity-100 translate-y-0",
  "slide-left": "opacity-100 translate-x-0",
  "slide-right": "opacity-100 translate-x-0",
  "scale-up": "opacity-100 scale-100",
}

export function ScrollReveal({
  children,
  className = "",
  animation = "slide-up",
  duration = 700,
  delay = 0,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (ref.current) {
            observer.unobserve(ref.current)
          }
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px", // triggers slightly before elements enter view
      }
    )

    const currentRef = ref.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [])

  const style = {
    transitionDuration: `${duration}ms`,
    transitionDelay: `${delay}ms`,
  }

  const initialClass = animationClasses[animation]
  const revealedClass = activeClasses[animation]

  return (
    <div
      ref={ref}
      style={style}
      className={`transition-all ease-out ${isVisible ? revealedClass : initialClass} ${className}`}
    >
      {children}
    </div>
  )
}
