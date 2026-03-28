"use client"

import { use } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { destinations, tourPackages, hotels } from "@/lib/data"
import { useApp } from "@/lib/store"
import { ReviewSection } from "@/components/review-section"

export default function DestinationDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const dest = destinations.find((d) => d.id === id)
  const { currentUser, toggleFavorite } = useApp()

  if (!dest) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground">Destination Not Found</h1>
          <Link href="/destinations"><Button className="mt-4">Back to Destinations</Button></Link>
        </div>
      </div>
    )
  }

  const relatedPackages = tourPackages.filter((p) => p.destinationId === dest.id)
  const relatedHotels = hotels.filter((h) => h.destinationId === dest.id)
  const isFav = currentUser?.favorites.includes(dest.id)

  return (
    <div>
      {/* Hero */}
      <div className="relative h-[50vh] min-h-[350px] overflow-hidden">
        <Image src={dest.image || "/placeholder.svg"} alt={dest.name} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-foreground/40" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
          <div className="mx-auto max-w-7xl">
            <Badge className="mb-2 bg-primary text-primary-foreground capitalize">{dest.category.replace("_", " ")}</Badge>
            <h1 className="font-serif text-4xl font-bold text-background md:text-5xl">{dest.name}</h1>
            <p className="mt-1 text-background/80">{dest.state}, {dest.country}</p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="grid gap-10 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <svg key={s} width="18" height="18" viewBox="0 0 24 24" fill={s <= Math.round(dest.rating) ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" className="text-accent">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">{dest.rating} ({dest.reviewCount} reviews)</span>
                </div>
              </div>
              {currentUser && (
                <Button variant="outline" size="sm" onClick={() => toggleFavorite(dest.id)}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill={isFav ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" className={isFav ? "mr-1 text-destructive" : "mr-1"}>
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                  {isFav ? "Saved" : "Save"}
                </Button>
              )}
            </div>

            <Separator className="my-6" />

            <div>
              <h2 className="text-xl font-semibold text-foreground">About {dest.name}</h2>
              <p className="mt-3 leading-relaxed text-muted-foreground">{dest.description}</p>
            </div>

            <Separator className="my-6" />

            <div>
              <h2 className="text-xl font-semibold text-foreground">Popular Attractions</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {dest.attractions.map((attr) => (
                  <Badge key={attr} variant="secondary" className="px-3 py-1.5 text-sm">{attr}</Badge>
                ))}
              </div>
            </div>

            <Separator className="my-6" />

            <div>
              <h2 className="text-xl font-semibold text-foreground">Best Time to Visit</h2>
              <p className="mt-2 text-muted-foreground">{dest.bestTimeToVisit}</p>
            </div>

            <Separator className="my-6" />

            <ReviewSection targetId={dest.id} targetType="destination" />
          </div>

          {/* Sidebar */}
          <div className="flex flex-col gap-6">
            {/* Map */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Location</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video rounded-md bg-muted flex items-center justify-center text-muted-foreground text-sm">
                  <a href={dest.mapUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                    View on Google Maps
                  </a>
                </div>
              </CardContent>
            </Card>

            {/* Related Packages */}
            {relatedPackages.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Tour Packages</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-3">
                  {relatedPackages.map((pkg) => (
                    <Link key={pkg.id} href={`/packages/${pkg.id}`} className="flex items-center justify-between rounded-lg border border-border p-3 transition-colors hover:bg-muted">
                      <div>
                        <p className="text-sm font-medium text-foreground">{pkg.name}</p>
                        <p className="text-xs text-muted-foreground">{pkg.duration}</p>
                      </div>
                      <p className="text-sm font-bold text-primary">Rs. {pkg.price.toLocaleString()}</p>
                    </Link>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Hotels */}
            {relatedHotels.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Hotels & Stays</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-3">
                  {relatedHotels.map((hotel) => (
                    <div key={hotel.id} className="rounded-lg border border-border p-3">
                      <p className="text-sm font-medium text-foreground">{hotel.name}</p>
                      <div className="mt-1 flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">{hotel.amenities.slice(0, 3).join(", ")}</span>
                        <span className="text-sm font-bold text-primary">Rs. {hotel.pricePerNight.toLocaleString()}/night</span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
