"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { destinations } from "@/lib/data"
import { useApp } from "@/lib/store"
import { useSearchParams } from "next/navigation"

const categoryLabels: Record<string, string> = {
  beach: "Beach",
  hill_station: "Hill Station",
  heritage: "Heritage",
  wildlife: "Wildlife",
  city: "City",
}

function HeartIcon({ filled }: { filled: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" className={filled ? "text-destructive" : "text-background"}>
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  )
}

export default function DestinationsPage() {
  const searchParams = useSearchParams()
  const initialCategory = searchParams.get("category") || "all"
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState(initialCategory)
  const [country] = useState("all")
  const { currentUser, toggleFavorite } = useApp()

  const filtered = useMemo(() => {
    return destinations.filter((d) => {
      const matchSearch = d.name.toLowerCase().includes(search.toLowerCase()) || d.state.toLowerCase().includes(search.toLowerCase())
      const matchCategory = category === "all" || d.category === category
      const matchCountry = country === "all" || d.country === country
      return matchSearch && matchCategory && matchCountry
    })
  }, [search, category, country])

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-bold text-foreground md:text-4xl">Explore Destinations</h1>
        <p className="mt-2 text-muted-foreground">Discover incredible places across India</p>
      </div>

      <div className="mb-8 flex flex-wrap gap-4">
        <Input
          placeholder="Search destinations..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-xs"
        />
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="w-44">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {Object.entries(categoryLabels).map(([key, label]) => (
              <SelectItem key={key} value={key}>{label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {filtered.length === 0 ? (
        <div className="py-20 text-center">
          <p className="text-lg text-muted-foreground">No destinations found matching your criteria.</p>
          <Button variant="outline" className="mt-4 bg-transparent" onClick={() => { setSearch(""); setCategory("all") }}>
            Clear Filters
          </Button>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((dest) => (
            <Card key={dest.id} className="group overflow-hidden border-0 shadow-sm transition-shadow hover:shadow-md">
              <div className="relative aspect-[16/10] overflow-hidden">
                <Link href={`/destinations/${dest.id}`}>
                  <Image src={dest.image || "/placeholder.svg"} alt={dest.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                </Link>
                <Badge className="absolute left-3 top-3 bg-background/90 text-foreground capitalize backdrop-blur-sm">
                  {categoryLabels[dest.category]}
                </Badge>
                {currentUser && (
                  <button
                    type="button"
                    onClick={() => toggleFavorite(dest.id)}
                    className="absolute right-3 top-3 rounded-full bg-foreground/30 p-2 backdrop-blur-sm transition-colors hover:bg-foreground/50"
                    aria-label={currentUser.favorites.includes(dest.id) ? "Remove from favorites" : "Add to favorites"}
                  >
                    <HeartIcon filled={currentUser.favorites.includes(dest.id)} />
                  </button>
                )}
              </div>
              <CardContent className="p-5">
                <Link href={`/destinations/${dest.id}`}>
                  <h3 className="text-xl font-semibold text-foreground">{dest.name}</h3>
                </Link>
                <p className="text-sm text-muted-foreground">{dest.state}, {dest.country}</p>
                <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{dest.description}</p>
                <div className="mt-3 flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <svg key={s} width="14" height="14" viewBox="0 0 24 24" fill={s <= Math.round(dest.rating) ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" className="text-accent">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    ))}
                    <span className="ml-1 text-sm text-muted-foreground">{dest.rating}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">{dest.reviewCount} reviews</span>
                </div>
                <p className="mt-2 text-xs text-primary font-medium">Best time: {dest.bestTimeToVisit}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
