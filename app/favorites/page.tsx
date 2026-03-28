"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useApp } from "@/lib/store"
import { destinations } from "@/lib/data"

export default function FavoritesPage() {
  const { currentUser, toggleFavorite } = useApp()

  if (!currentUser) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground">Please Login</h1>
          <p className="mt-2 text-muted-foreground">You need to be logged in to view favorites.</p>
          <Link href="/login"><Button className="mt-4">Login</Button></Link>
        </div>
      </div>
    )
  }

  const favDestinations = destinations.filter((d) => currentUser.favorites.includes(d.id))

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="font-serif text-3xl font-bold text-foreground">My Favorites</h1>
      <p className="mt-2 text-muted-foreground">Destinations you have saved for later</p>

      {favDestinations.length === 0 ? (
        <div className="py-20 text-center">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mx-auto text-muted-foreground/50">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
          <p className="mt-4 text-lg text-muted-foreground">No favorites yet.</p>
          <p className="text-sm text-muted-foreground">Browse destinations and save the ones you love.</p>
          <Link href="/destinations"><Button className="mt-4">Explore Destinations</Button></Link>
        </div>
      ) : (
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {favDestinations.map((dest) => (
            <Card key={dest.id} className="group overflow-hidden border-0 shadow-sm">
              <Link href={`/destinations/${dest.id}`}>
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image src={dest.image || "/placeholder.svg"} alt={dest.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  <Badge className="absolute right-3 top-3 bg-background/90 text-foreground capitalize backdrop-blur-sm">{dest.category.replace("_", " ")}</Badge>
                </div>
              </Link>
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <Link href={`/destinations/${dest.id}`}>
                    <h3 className="text-lg font-semibold text-foreground hover:text-primary">{dest.name}</h3>
                    <p className="text-sm text-muted-foreground">{dest.state}, {dest.country}</p>
                  </Link>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                    onClick={() => toggleFavorite(dest.id)}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                    <span className="sr-only">Remove from favorites</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
