"use client"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { offers, tourPackages, destinations } from "@/lib/data"

export default function OffersPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <div className="mb-10 text-center">
        <h1 className="font-serif text-3xl font-bold text-foreground md:text-4xl">Seasonal Offers & Deals</h1>
        <p className="mt-2 text-muted-foreground">Grab these limited-time discounts before they expire</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {offers.map((offer) => {
          const pkg = tourPackages.find((p) => p.id === offer.packageId)
          const dest = pkg ? destinations.find((d) => d.id === pkg.destinationId) : null

          return (
            <Card key={offer.id} className="overflow-hidden border-2 border-dashed border-accent/40 bg-accent/5">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <Badge className="bg-accent text-accent-foreground text-lg px-4 py-1">{offer.discount}% OFF</Badge>
                    <h2 className="mt-3 text-xl font-bold text-foreground">{offer.title}</h2>
                    <p className="mt-1 text-muted-foreground">{offer.description}</p>
                  </div>
                </div>

                {pkg && (
                  <div className="mt-4 rounded-lg bg-card p-4">
                    <p className="text-sm font-medium text-foreground">{pkg.name}</p>
                    <p className="text-xs text-muted-foreground">{dest?.name} &middot; {pkg.duration}</p>
                    <div className="mt-2 flex items-center gap-3">
                      <span className="text-sm text-muted-foreground line-through">Rs. {pkg.originalPrice.toLocaleString()}</span>
                      <span className="text-lg font-bold text-primary">Rs. {pkg.price.toLocaleString()}</span>
                    </div>
                  </div>
                )}

                <div className="mt-4 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground">Use code</p>
                    <p className="rounded-md bg-muted px-3 py-1 font-mono text-sm font-bold tracking-widest text-foreground">{offer.code}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">Valid until</p>
                    <p className="text-sm font-medium text-foreground">
                      {new Date(offer.validUntil).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                    </p>
                  </div>
                </div>

                {pkg && (
                  <Link href={`/packages/${pkg.id}`}>
                    <Button className="mt-4 w-full">View Package</Button>
                  </Link>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Newsletter-style CTA */}
      <div className="mt-16 rounded-2xl bg-primary p-8 text-center md:p-12">
        <h2 className="font-serif text-2xl font-bold text-primary-foreground md:text-3xl">
          Never Miss a Deal
        </h2>
        <p className="mx-auto mt-2 max-w-lg text-primary-foreground/80">
          Stay updated with the latest offers and seasonal discounts. Subscribe to get notified about exclusive travel deals.
        </p>
        <div className="mx-auto mt-6 flex max-w-md gap-2">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 rounded-md border-0 bg-primary-foreground/20 px-4 py-2.5 text-primary-foreground placeholder:text-primary-foreground/50 outline-none focus:ring-2 focus:ring-primary-foreground/30"
          />
          <Button variant="secondary">Subscribe</Button>
        </div>
      </div>
    </div>
  )
}
