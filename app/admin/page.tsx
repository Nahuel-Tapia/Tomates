"use client"

import { useState, useEffect } from "react"
import { Lock, LogOut, Search, Trash2, CheckCircle, Clock, Calendar, Mail, Phone, User, Users, FileText, Filter, RotateCcw } from "lucide-react"
import Link from "next/link"

interface Quote {
  id: string
  name: string
  email: string
  phone: string
  type: string
  message: string
  date: string
  status: "pendiente" | "contactado"
}

export default function AdminPage() {
  const [mounted, setMounted] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [loginError, setLoginError] = useState("")
  
  const [quotes, setQuotes] = useState<Quote[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
    
    // Check session persistence
    if (sessionStorage.getItem("admin_logged_in") === "true") {
      setIsAuthenticated(true)
    }

    // Load quotes from localStorage
    loadQuotes()
  }, [])

  const loadQuotes = () => {
    try {
      const stored = localStorage.getItem("huerta_dorada_quotes")
      if (stored) {
        setQuotes(JSON.parse(stored))
      }
    } catch (e) {
      console.error("Failed to load quotes:", e)
    }
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (username === "admin" && password === "huertadorada2026") {
      setIsAuthenticated(true)
      sessionStorage.setItem("admin_logged_in", "true")
      setLoginError("")
    } else {
      setLoginError("Usuario o contraseña incorrectos.")
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    sessionStorage.removeItem("admin_logged_in")
    setUsername("")
    setPassword("")
  }

  const handleMarkAsContacted = (id: string) => {
    const updated = quotes.map((q) => 
      q.id === id ? { ...q, status: "contactado" as const } : q
    )
    setQuotes(updated)
    localStorage.setItem("huerta_dorada_quotes", JSON.stringify(updated))
  }

  const handleDeleteQuote = (id: string) => {
    if (confirm("¿Estás seguro de que deseas eliminar este registro?")) {
      const updated = quotes.filter((q) => q.id !== id)
      setQuotes(updated)
      localStorage.setItem("huerta_dorada_quotes", JSON.stringify(updated))
    }
  }

  const handleResetData = () => {
    if (confirm("¿Deseas restaurar los datos de simulación iniciales? Esto borrará tus registros actuales.")) {
      // Inyectar datos de simulación
      const mockQuotes: Quote[] = [
        {
          id: "mock-1",
          name: "María Belén González",
          email: "maria.gonzalez@lacocina.cl",
          phone: "+56 9 1234 5678",
          type: "restaurante",
          message: "Hola Huerta Dorada, me interesa solicitar una cotización personalizada con los siguientes detalles:\n\n- Producto: Salsa Artesanal de Tomate\n- Presentación: Caja de 6 Envases (500ml c/u)\n- Cantidad: 12 unidades\n- Tipo de Cliente: Restaurante / Cafetería\n- Frecuencia de envío: Semanal (10% desc. extra)\n\nEstimado preliminar calculado: $244.800 ARS (con 22% de descuento total aplicado).",
          date: new Date(Date.now() - 3600000 * 2).toISOString(),
          status: "pendiente"
        },
        {
          id: "mock-2",
          name: "Carlos Mendoza",
          email: "carlos.mendoza@superdelvalle.com",
          phone: "+54 11 9876 5432",
          type: "mayorista",
          message: "Hola Huerta Dorada, me interesa solicitar una cotización personalizada con los siguientes detalles:\n\n- Producto: Tomates Frescos Orgánicos\n- Presentación: Cajón de Madera (10 kg)\n- Cantidad: 40 unidades\n- Tipo de Cliente: Distribuidor / Mayorista\n- Frecuencia de envío: Quincenal (5% desc. extra)\n\nEstimado preliminar calculado: $450.000 ARS (con 25% de descuento total aplicado).",
          date: new Date(Date.now() - 3600000 * 24).toISOString(),
          status: "contactado"
        }
      ]
      setQuotes(mockQuotes)
      localStorage.setItem("huerta_dorada_quotes", JSON.stringify(mockQuotes))
    }
  }

  // Filtering logic
  const filteredQuotes = quotes.filter((q) => {
    const matchesSearch = 
      q.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      q.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.message.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesType = typeFilter === "all" || q.type === typeFilter
    const matchesStatus = statusFilter === "all" || q.status === statusFilter

    return matchesSearch && matchesType && matchesStatus
  })

  // Calculate metrics
  const totalReceived = quotes.length
  const pendingCount = quotes.filter((q) => q.status === "pendiente").length
  const wholesaleCount = quotes.filter((q) => q.type === "mayorista").length

  if (!mounted) {
    return (
      <div className="min-h-screen bg-secondary flex items-center justify-center">
        <p className="text-muted-foreground font-serif text-lg animate-pulse">Cargando panel...</p>
      </div>
    )
  }

  // Login View
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-secondary flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-card rounded-2xl p-8 border border-border shadow-lg relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-primary" />
          
          <div className="text-center mb-8">
            <span className="text-4xl">🍅</span>
            <h1 className="font-serif text-2xl font-bold text-foreground mt-3">Huerta Dorada</h1>
            <p className="text-sm text-muted-foreground mt-1">Acceso al Panel de Administración</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="user" className="block text-sm font-semibold text-foreground mb-2">
                Usuario
              </label>
              <input
                id="user"
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                placeholder="Nombre de usuario"
              />
            </div>

            <div>
              <label htmlFor="pass" className="block text-sm font-semibold text-foreground mb-2">
                Contraseña
              </label>
              <input
                id="pass"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                placeholder="••••••••"
              />
            </div>

            {loginError && (
              <p className="text-xs font-semibold text-destructive">{loginError}</p>
            )}

            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-primary hover:bg-primary/95 text-primary-foreground font-semibold flex items-center justify-center gap-2 cursor-pointer shadow transition-all"
            >
              <Lock className="h-4 w-4" />
              Iniciar Sesión
            </button>
          </form>

          <div className="mt-8 text-center">
            <Link href="/" className="text-xs text-primary hover:underline font-medium">
              Volver al inicio
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // Dashboard View
  return (
    <div className="min-h-screen bg-secondary/50 text-foreground flex flex-col">
      {/* Top Header */}
      <header className="bg-card border-b border-border py-4 px-6 sm:px-8 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🍅</span>
          <div>
            <h1 className="font-serif text-lg sm:text-xl font-bold text-foreground leading-none">Huerta Dorada</h1>
            <span className="text-xs text-muted-foreground font-medium">Panel de Control</span>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button
            onClick={handleResetData}
            title="Cargar simulación"
            className="p-2 text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg transition-colors cursor-pointer"
          >
            <RotateCcw className="h-5 w-5" />
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-background hover:bg-muted text-sm font-semibold text-foreground transition-all cursor-pointer"
          >
            <LogOut className="h-4 w-4" />
            Cerrar Sesión
          </button>
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto p-6 sm:p-8 space-y-8">
        
        {/* Metrics Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-card border border-border p-5 rounded-2xl shadow-sm">
            <div className="flex items-center justify-between text-muted-foreground mb-2">
              <span className="text-sm font-semibold">Total Solicitudes</span>
              <FileText className="h-5 w-5 text-primary" />
            </div>
            <p className="text-3xl font-bold font-serif text-foreground">{totalReceived}</p>
          </div>

          <div className="bg-card border border-border p-5 rounded-2xl shadow-sm">
            <div className="flex items-center justify-between text-muted-foreground mb-2">
              <span className="text-sm font-semibold">Pendientes</span>
              <Clock className="h-5 w-5 text-amber-500 animate-pulse" />
            </div>
            <p className="text-3xl font-bold font-serif text-amber-500">{pendingCount}</p>
          </div>

          <div className="bg-card border border-border p-5 rounded-2xl shadow-sm">
            <div className="flex items-center justify-between text-muted-foreground mb-2">
              <span className="text-sm font-semibold">Mayoristas</span>
              <Users className="h-5 w-5 text-accent" />
            </div>
            <p className="text-3xl font-bold font-serif text-accent">{wholesaleCount}</p>
          </div>

          <div className="bg-card border border-border p-5 rounded-2xl shadow-sm">
            <div className="flex items-center justify-between text-muted-foreground mb-2">
              <span className="text-sm font-semibold">Contactados</span>
              <CheckCircle className="h-5 w-5 text-emerald-500" />
            </div>
            <p className="text-3xl font-bold font-serif text-emerald-500">{totalReceived - pendingCount}</p>
          </div>
        </div>

        {/* Filter Controls Box */}
        <div className="bg-card border border-border rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full md:max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar por cliente, email o producto..."
                className="w-full pl-10 pr-4 py-2 border border-input rounded-xl bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-muted-foreground"
              />
            </div>

            {/* Dropdown Filters */}
            <div className="flex flex-wrap gap-3 w-full md:w-auto items-center">
              <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
                <Filter className="h-3.5 w-3.5" />
                FILTROS:
              </div>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="border border-input rounded-lg bg-background text-foreground py-1.5 px-3 text-xs focus:outline-none cursor-pointer"
              >
                <option value="all">Todos los Perfiles</option>
                <option value="minorista">Minorista</option>
                <option value="restaurante">Restaurante</option>
                <option value="mayorista">Mayorista</option>
              </select>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="border border-input rounded-lg bg-background text-foreground py-1.5 px-3 text-xs focus:outline-none cursor-pointer"
              >
                <option value="all">Todos los Estados</option>
                <option value="pendiente">Pendientes</option>
                <option value="contactado">Contactados</option>
              </select>
            </div>
          </div>
        </div>

        {/* Main List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-2">
            <h2 className="font-serif text-lg font-bold">Solicitudes Recibidas ({filteredQuotes.length})</h2>
          </div>

          {filteredQuotes.length === 0 ? (
            <div className="bg-card border border-border border-dashed rounded-2xl p-12 text-center">
              <span className="text-4xl opacity-50 block mb-3">📂</span>
              <h3 className="font-serif text-lg font-bold text-muted-foreground">No se encontraron cotizaciones</h3>
              <p className="text-xs text-muted-foreground/80 mt-1 max-w-sm mx-auto">
                No hay solicitudes que coincidan con la búsqueda o filtros aplicados en este momento.
              </p>
            </div>
          ) : (
            <div className="grid gap-6">
              {filteredQuotes.map((quote) => {
                const dateObj = new Date(quote.date)
                const isPending = quote.status === "pendiente"
                
                return (
                  <article 
                    key={quote.id}
                    className={`bg-card border rounded-2xl p-6 shadow-sm flex flex-col md:flex-row justify-between gap-6 transition-all duration-200 ${
                      isPending ? "border-amber-500/20" : "border-emerald-500/20 opacity-80"
                    }`}
                  >
                    
                    {/* Left Column: Client Details */}
                    <div className="space-y-4 md:max-w-xs w-full flex-shrink-0">
                      <div>
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          isPending ? "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400" : "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400"
                        }`}>
                          {isPending ? "Pendiente" : "Contactado"}
                        </span>
                      </div>

                      <div className="space-y-2">
                        <h3 className="font-serif text-lg font-bold text-foreground flex items-center gap-2">
                          <User className="h-4.5 w-4.5 text-muted-foreground" />
                          {quote.name}
                        </h3>
                        <p className="text-xs text-muted-foreground flex items-center gap-2">
                          <Mail className="h-4 w-4" />
                          <a href={`mailto:${quote.email}`} className="hover:underline hover:text-primary">{quote.email}</a>
                        </p>
                        {quote.phone && (
                          <p className="text-xs text-muted-foreground flex items-center gap-2">
                            <Phone className="h-4 w-4" />
                            <a href={`tel:${quote.phone}`} className="hover:underline hover:text-primary">{quote.phone}</a>
                          </p>
                        )}
                        <p className="text-xs text-muted-foreground flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span>{dateObj.toLocaleDateString("es-AR")} - {dateObj.toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit" })}</span>
                        </p>
                      </div>

                      <div>
                        <span className="text-[10px] font-semibold text-primary uppercase tracking-wider bg-primary/10 py-1 px-2.5 rounded-lg">
                          Perfil: {quote.type}
                        </span>
                      </div>
                    </div>

                    {/* Middle Column: Message details */}
                    <div className="flex-1 bg-secondary/30 dark:bg-zinc-950/40 rounded-xl p-5 border border-border/40">
                      <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3">Detalle del Pedido</h4>
                      <pre className="text-sm font-sans text-foreground whitespace-pre-wrap leading-relaxed select-text font-normal">
                        {quote.message}
                      </pre>
                    </div>

                    {/* Right Column: Actions */}
                    <div className="flex md:flex-col gap-2 justify-end md:justify-start flex-shrink-0 items-center md:items-end">
                      {isPending && (
                        <button
                          onClick={() => handleMarkAsContacted(quote.id)}
                          className="flex items-center gap-1.5 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-xs font-bold shadow-md hover:shadow-lg transition-all cursor-pointer active:scale-95"
                        >
                          <CheckCircle className="h-3.5 w-3.5" />
                          Marcar Contactado
                        </button>
                      )}
                      
                      <button
                        onClick={() => handleDeleteQuote(quote.id)}
                        className="p-2 border border-border hover:border-destructive hover:bg-destructive/10 text-muted-foreground hover:text-destructive rounded-lg transition-colors cursor-pointer"
                        title="Eliminar registro"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>

                  </article>
                )
              })}
            </div>
          )}
        </div>

      </main>
    </div>
  )
}
