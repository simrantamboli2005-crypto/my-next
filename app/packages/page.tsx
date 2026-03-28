"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { tourPackages, destinations } from "@/lib/data"

export default function PackagesPage() {
  const [search, setSearch] = useState("")
  const [budgetMax, setBudgetMax] = useState(30000)
  const [duration, setDuration] = useState("all")
  const [destination, setDestination] = useState("all")

  const filtered = useMemo(() => {
    return tourPackages.filter((pkg) => {
      if (!pkg.active) return false
      const matchSearch = pkg.name.toLowerCase().includes(search.toLowerCase())
      const matchBudget = pkg.price <= budgetMax
      const matchDuration = duration === "all" || pkg.duration.includes(duration)
      const matchDest = destination === "all" || pkg.destinationId === destination
      return matchSearch && matchBudget && matchDuration && matchDest
    })
  }, [search, budgetMax, duration, destination])

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-bold text-foreground md:text-4xl">Tour Packages</h1>
        <p className="mt-2 text-muted-foreground">Curated travel experiences at the best prices</p>
      </div>

      {/* Filters */}
      <div className="mb-8 flex flex-wrap items-end gap-4 rounded-lg border border-border bg-card p-4">
        <div className="flex-1 min-w-[200px]">
          <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Search</label>
          <Input placeholder="Search packages..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <div className="w-44">
          <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Destination</label>
          <Select value={destination} onValueChange={setDestination}>
            <SelectTrigger><SelectValue placeholder="All" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Destinations</SelectItem>
              {destinations.map((d) => <SelectItem key={d.id} value={d.id}>{d.name}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div className="w-44">
          <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Duration</label>
          <Select value={duration} onValueChange={setDuration}>
            <SelectTrigger><SelectValue placeholder="All" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Durations</SelectItem>
              <SelectItem value="3 Days">3 Days</SelectItem>
              <SelectItem value="4 Days">4 Days</SelectItem>
              <SelectItem value="5 Days">5 Days</SelectItem>
              <SelectItem value="6 Days">6 Days</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="w-56">
          <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
            Max Budget: Rs. {budgetMax.toLocaleString()}
          </label>
          <Slider value={[budgetMax]} onValueChange={([v]) => setBudgetMax(v)} min={5000} max={30000} step={1000} />
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="py-20 text-center">
          <p className="text-lg text-muted-foreground">No packages match your filters.</p>
          <Button variant="outline" className="mt-4 bg-transparent" onClick={() => { setSearch(""); setBudgetMax(30000); setDuration("all"); setDestination("all") }}>
            Clear Filters
          </Button>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((pkg) => {
            const dest = destinations.find((d) => d.id === pkg.destinationId)
            const discount = Math.round(((pkg.originalPrice - pkg.price) / pkg.originalPrice) * 100)
            return (
              <Link key={pkg.id} href={`/packages/${pkg.id}`}>
                <Card className="group h-full overflow-hidden border-0 shadow-sm transition-shadow hover:shadow-md">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image src={pkg.image || "/placeholder.svg"} alt={pkg.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute left-3 top-3 flex gap-2">
                      <Badge className="bg-accent text-accent-foreground">{discount}% OFF</Badge>
                      {pkg.featured && <Badge className="bg-primary text-primary-foreground">Featured</Badge>}
                    </div>
                  </div>
                  <CardContent className="p-5">
                    <h3 className="text-lg font-semibold text-foreground">{pkg.name}</h3>
                    <p className="text-sm text-muted-foreground">{dest?.name} &middot; {pkg.duration}</p>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {pkg.inclusions.slice(0, 3).map((inc) => (
                        <Badge key={inc} variant="secondary" className="text-xs">{inc}</Badge>
                      ))}
                      {pkg.inclusions.length > 3 && <Badge variant="secondary" className="text-xs">+{pkg.inclusions.length - 3} more</Badge>}
                    </div>
                    <div className="mt-3 flex items-end justify-between">
                      <div>
                        <span className="text-sm text-muted-foreground line-through">Rs. {pkg.originalPrice.toLocaleString()}</span>
                        <p className="text-xl font-bold text-primary">Rs. {pkg.price.toLocaleString()}</p>
                        <span className="text-xs text-muted-foreground">per person</span>
                      </div>
                      <div className="flex items-center gap-0.5">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <svg key={s} width="12" height="12" viewBox="0 0 24 24" fill={s <= Math.round(pkg.rating) ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" className="text-accent">
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                          </svg>
                        ))}
                        <span className="ml-1 text-xs text-muted-foreground">{pkg.rating}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
