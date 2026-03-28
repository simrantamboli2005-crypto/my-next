"use client"

import { use, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { tourPackages, destinations } from "@/lib/data"
import { useApp } from "@/lib/store"
import { ReviewSection } from "@/components/review-section"

export default function PackageDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const pkg = tourPackages.find((p) => p.id === id)
  const { currentUser, addBooking } = useApp()
  const [travelers, setTravelers] = useState(2)
  const [date, setDate] = useState("")
  const [numberOfDays, setNumberOfDays] = useState(0)
  const [booked, setBooked] = useState(false)
  
  // Set default to average of min/max when package loads
  if (pkg && numberOfDays === 0) {
    setNumberOfDays(Math.round((pkg.minDays + pkg.maxDays) / 2))
  }

  if (!pkg) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground">Package Not Found</h1>
          <Link href="/packages"><Button className="mt-4">← All Packages</Button></Link>
        </div>
      </div>
    )
  }

  const dest = destinations.find((d) => d.id === pkg.destinationId)
  const discount = Math.round(((pkg.originalPrice - pkg.price) / pkg.originalPrice) * 100)

  const generateInvoiceNumber = (): string => {
    const dateStr = new Date().toISOString().split("T")[0].replace(/-/g, "")
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, "0")
    return `INV-${dateStr}-${random}`
  }

  // Price per person per day * days * travelers
  const totalPrice = pkg.price * numberOfDays * travelers

  // Show itinerary up to selected number of days
  const visibleItinerary = pkg.itinerary.slice(0, numberOfDays)

  const handleBooking = () => {
    if (!currentUser || !date || numberOfDays < pkg.minDays || numberOfDays > pkg.maxDays) return
    
    const invoiceNumber = generateInvoiceNumber()
    const invoiceDate = new Date().toISOString().split("T")[0]
    
    addBooking({
      id: crypto.randomUUID(),
      userId: currentUser.id,
      packageId: pkg.id,
      travelers,
      date,
      status: "pending",
      totalPrice,
      createdAt: new Date().toISOString(),
      invoiceNumber,
      invoiceDate,
      numberOfDays,
    })
    setBooked(true)
  }

  return (
    <div>
      <div className="relative h-[40vh] min-h-[300px] overflow-hidden">
        <Image src={pkg.image || "/placeholder.svg"} alt={pkg.name} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge className="bg-accent text-accent-foreground">{discount}% OFF</Badge>
              {pkg.featured && <Badge className="bg-primary text-primary-foreground">Featured</Badge>}
            </div>
            <h1 className="font-serif text-3xl font-bold text-white md:text-4xl">{pkg.name}</h1>
            <p className="mt-2 text-white/90 text-lg">
              {dest?.name} • <Badge variant="secondary">{pkg.minDays}-{pkg.maxDays} Days</Badge> (Choose your duration)
            </p>
            <p className="mt-1 text-white/80">
              Rs. {pkg.price.toLocaleString()} / person / day
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-3 lg:gap-16">
          <div className="lg:col-span-2 space-y-8">
            {/* Duration Info */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  </div>
                  <div>
                    <h2 className="font-semibold text-lg">Fully Customizable Duration</h2>
                    <p className="text-sm text-muted-foreground">Choose between {pkg.minDays} to {pkg.maxDays} days</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Dynamic Itinerary */}
            <Card>
              <CardHeader>
                <CardTitle>Day-wise Itinerary (First {numberOfDays} days)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-4">
                  {visibleItinerary.map((day) => (
                    <div key={day.day} className="flex gap-4 p-4 border rounded-lg bg-card/50">
                      <div className="flex flex-col items-center w-12">
                        <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground font-bold flex items-center justify-center text-sm">
                          Day {day.day}
                        </div>
                        {day.day < numberOfDays && <div className="w-0.5 h-6 bg-border flex-1 mt-1" />}
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">{day.title}</h4>
                        <p className="text-sm text-muted-foreground mt-1">{day.description}</p>
                      </div>
                    </div>
                  ))}
                  {numberOfDays < pkg.itinerary.length && (
                    <div className="text-center py-6 text-muted-foreground border-dashed border-2 rounded-lg">
                      <p>Days {numberOfDays + 1}-{pkg.maxDays}: Additional free days or optional activities</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Inclusions/Exclusions */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">What's Included</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {pkg.inclusions.map((inc, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <svg className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {inc}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Not Included</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {pkg.exclusions.map((exc, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <svg className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <line x1="18" y1="6" x2="6" y2="18" />
                          <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                        {exc}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Terms & Conditions</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="grid grid-cols-1 gap-2 text-sm">
                  {pkg.termsAndConditions.map((term, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-muted rounded-full mt-2 flex-shrink-0" />
                      {term}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <ReviewSection targetId={pkg.id} targetType="package" />
          </div>

          {/* Sticky Booking Panel */}
          <div className="lg:sticky lg:top-8 lg:h-fit">
            <Card>
              <CardHeader>
                <CardTitle>Customize & Book</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-1">
                {booked ? (
                  <div className="text-center p-6 space-y-3">
                    <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                      <svg className="w-8 h-8 text-primary" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <h3 className="font-semibold text-lg">Booking Confirmed!</h3>
                    <p className="text-sm text-muted-foreground">Check your bookings page</p>
                    <Link href="/bookings">
                      <Button size="sm" className="w-full">View Bookings</Button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="p-4 bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg">
                      <div className="flex items-baseline gap-2 mb-1">
                        <span className="text-sm line-through text-muted-foreground">Rs. {pkg.originalPrice.toLocaleString()}</span>
                        <span className="text-2xl font-bold text-primary">Rs. {pkg.price.toLocaleString()}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">per person per day</p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="days">Duration ({pkg.minDays}-{pkg.maxDays} days)</Label>
                      <Input
                        id="days"
                        type="number"
                        min={pkg.minDays}
                        max={pkg.maxDays}
                        value={numberOfDays}
                        onChange={(e) => setNumberOfDays(Number(e.target.value))}
                        className="w-full"
                      />
                      {numberOfDays && (
                        <p className="text-xs text-muted-foreground">
                          {numberOfDays === pkg.minDays ? "Minimum stay" : numberOfDays === pkg.maxDays ? "Maximum stay" : "Perfect duration"}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="travelers">Travelers</Label>
                      <Input
                        id="travelers"
                        type="number"
                        min="1"
                        max="10"
                        value={travelers}
                        onChange={(e) => setTravelers(Number(e.target.value))}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="date">Travel Date</Label>
                      <Input
                        id="date"
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </div>

                    <Separator />

                    <div className="text-right space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Total ({numberOfDays} days × {travelers} travelers):</span>
                        <span className="font-bold">Rs. {totalPrice.toLocaleString()}</span>
                      </div>
                    </div>

                    {currentUser ? (
                      <Button 
                        className="w-full" 
                        onClick={handleBooking} 
                        disabled={!date || numberOfDays < pkg.minDays || numberOfDays > pkg.maxDays}
                      >
                        Book Now - Secure Payment
                      </Button>
                    ) : (
                      <Link href="/login?redirect=/packages/{pkg.id}">
                        <Button className="w-full">
                          Login to Book
                        </Button>
                      </Link>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

