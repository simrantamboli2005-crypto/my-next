"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { hotels, destinations, transportOptions } from "@/lib/data"

export default function HotelsPage() {
  const [selectedDest, setSelectedDest] = useState("all")

  const filteredHotels = selectedDest === "all"
    ? hotels
    : hotels.filter((h) => h.destinationId === selectedDest)

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-bold text-foreground md:text-4xl">Hotels & Transport</h1>
        <p className="mt-2 text-muted-foreground">Find the perfect stay and travel options for your trip</p>
      </div>

      <Tabs defaultValue="hotels">
        <TabsList className="mb-6">
          <TabsTrigger value="hotels">Hotels</TabsTrigger>
          <TabsTrigger value="transport">Transport</TabsTrigger>
        </TabsList>

        <TabsContent value="hotels">
          <div className="mb-6">
            <Select value={selectedDest} onValueChange={setSelectedDest}>
              <SelectTrigger className="w-64"><SelectValue placeholder="Filter by destination" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Destinations</SelectItem>
                {destinations.map((d) => <SelectItem key={d.id} value={d.id}>{d.name}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredHotels.map((hotel) => {
              const dest = destinations.find((d) => d.id === hotel.destinationId)
              return (
                <Card key={hotel.id} className="group overflow-hidden border-0 shadow-sm">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image src={hotel.image || "/placeholder.svg"} alt={hotel.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                    <Badge className="absolute right-3 top-3 bg-background/90 text-foreground backdrop-blur-sm">{dest?.name}</Badge>
                  </div>
                  <CardContent className="p-5">
                    <h3 className="text-lg font-semibold text-foreground">{hotel.name}</h3>
                    <div className="mt-1 flex items-center gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <svg key={i} width="12" height="12" viewBox="0 0 24 24" fill={i < Math.round(hotel.rating) ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" className="text-accent">
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                      ))}
                      <span className="ml-1 text-xs text-muted-foreground">{hotel.rating}</span>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-1">
                      {hotel.amenities.map((a) => (
                        <Badge key={a} variant="secondary" className="text-xs">{a}</Badge>
                      ))}
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <div>
                        <p className="text-xl font-bold text-primary">Rs. {hotel.pricePerNight.toLocaleString()}</p>
                        <p className="text-xs text-muted-foreground">per night</p>
                      </div>
                      <Button size="sm">Check Availability</Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="transport">
          <div className="grid gap-6 md:grid-cols-3">
            {transportOptions.map((transport) => (
              <Card key={transport.type}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      {transport.type === "Bus" && (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary">
                          <path d="M8 6v6" /><path d="M16 6v6" /><rect x="4" y="2" width="16" height="16" rx="3" /><path d="M4 10h16" /><path d="M8 22v-2" /><path d="M16 22v-2" /><path d="M4 18h16" />
                        </svg>
                      )}
                      {transport.type === "Train" && (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary">
                          <rect x="4" y="3" width="16" height="16" rx="2" /><path d="M4 11h16" /><path d="M12 3v8" /><path d="M8 19l-2 3" /><path d="M16 19l2 3" /><circle cx="9" cy="15" r="1" /><circle cx="15" cy="15" r="1" />
                        </svg>
                      )}
                      {transport.type === "Flight" && (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary">
                          <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
                        </svg>
                      )}
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">{transport.type}</h3>
                  </div>

                  <div className="mt-4">
                    <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Popular Routes</p>
                    <ul className="mt-2 flex flex-col gap-1.5">
                      {transport.routes.map((route) => (
                        <li key={route} className="flex items-center gap-2 text-sm text-foreground">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary">
                            <polyline points="9 18 15 12 9 6" />
                          </svg>
                          {route}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-4 rounded-lg bg-muted/50 p-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Price Range</span>
                      <span className="font-medium text-foreground">Rs. {transport.priceRange}</span>
                    </div>
                    <div className="mt-1 flex justify-between text-sm">
                      <span className="text-muted-foreground">Duration</span>
                      <span className="font-medium text-foreground">{transport.duration}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
