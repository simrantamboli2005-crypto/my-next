"use client"

import { use, useState, useEffect } from "react"
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
// import { PaymentModal } from "./PaymentModal" // Removed payment from packages

export default function PackageDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const pkg = tourPackages.find((p) => p.id === id)
  const { currentUser, addBooking } = useApp()
  const [travelers, setTravelers] = useState(2)
  const [date, setDate] = useState("")
  const [booked, setBooked] = useState(false)
  const [numberOfDays, setNumberOfDays] = useState(0)
  
  // Initialize numberOfDays when package is loaded
  useEffect(() => {
    if (pkg) {
      setNumberOfDays(pkg.minDays)
    }
  }, [pkg])

  if (!pkg) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground">Package Not Found</h1>
          <Link href="/packages"><Button className="mt-4">Back to Packages</Button></Link>
        </div>
      </div>
    )
  }

  const dest = destinations.find((d) => d.id === pkg.destinationId)
  const discount = Math.round(((pkg.originalPrice - pkg.price) / pkg.originalPrice) * 100)

  // Helper function to extract number of days from duration string like "4 Days / 3 Nights"
  const extractNumberOfDays = (): number => {
    return pkg.minDays
  }

  // Generate invoice number
  const generateInvoiceNumber = (): string => {
    const dateStr = new Date().toISOString().split("T")[0].replace(/-/g, "")
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, "0")
    return `INV-${dateStr}-${random}`
  }

  // Calculate per-day price (package price divided by total days in package)
  const totalPackageDays = pkg.minDays
  const pricePerDay = Math.round(pkg.price)
  
  // Calculate total price based on selected number of days and travelers
  const totalPrice = pricePerDay * numberOfDays * travelers

  const handleBooking = () => {
    if (!currentUser || !date) return
    
    const invoiceNumber = generateInvoiceNumber()
    const invoiceDate = new Date().toISOString().split("T")[0]
    
    addBooking({
      userId: currentUser.id,
      packageId: pkg.id,
      travelers,
      date,
      status: "pending",
      totalPrice: totalPrice,
      numberOfDays: numberOfDays,
      invoiceNumber,
      invoiceDate,
    })
    setBooked(true)
  }

  return (
    <div>
      <div className="relative h-[40vh] min-h-[300px] overflow-hidden">
        <Image src={pkg.image || "/placeholder.svg"} alt={pkg.name} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-foreground/40" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-wrap gap-2 mb-2">
              <Badge className="bg-accent text-accent-foreground">{discount}% OFF</Badge>
              {pkg.featured && <Badge className="bg-primary text-primary-foreground">Featured</Badge>}
            </div>
            <h1 className="font-serif text-3xl font-bold text-background md:text-4xl">{pkg.name}</h1>
            <p className="mt-1 text-background/80">{dest?.name} &middot; {pkg.minDays}-{pkg.maxDays} days (customizable)</p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            {/* Itinerary */}
            <h2 className="text-xl font-semibold text-foreground">Day-wise Itinerary</h2>
            <div className="mt-4 flex flex-col gap-4">
              {pkg.itinerary.map((day) => (
                <div key={day.day} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                      {day.day}
                    </div>
                    {day.day < pkg.itinerary.length && <div className="w-px flex-1 bg-border" />}
                  </div>
                  <div className="pb-6">
                    <h3 className="font-semibold text-foreground">{day.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{day.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <Separator className="my-8" />

            {/* Inclusions / Exclusions */}
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <h2 className="text-lg font-semibold text-foreground">Inclusions</h2>
                <ul className="mt-3 flex flex-col gap-2">
                  {pkg.inclusions.map((inc) => (
                    <li key={inc} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0 text-primary">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      {inc}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-foreground">Exclusions</h2>
                <ul className="mt-3 flex flex-col gap-2">
                  {pkg.exclusions.map((exc) => (
                    <li key={exc} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0 text-destructive">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                      {exc}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <Separator className="my-8" />

            {/* Terms */}
            <h2 className="text-lg font-semibold text-foreground">Terms & Conditions</h2>
            <ul className="mt-3 flex flex-col gap-2">
              {pkg.termsAndConditions.map((t) => (
                <li key={t} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground" />
                  {t}
                </li>
              ))}
            </ul>

            <Separator className="my-8" />

            <ReviewSection targetId={pkg.id} targetType="package" />
          </div>

          {/* Booking Sidebar */}
          <div>
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="text-lg">Book This Package</CardTitle>
              </CardHeader>
              <CardContent>
                {booked ? (
                  <div className="text-center">
                    <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <h3 className="font-semibold text-foreground">Booking Submitted!</h3>
                    <p className="mt-1 text-sm text-muted-foreground">Your booking is pending confirmation.</p>
                    <Link href="/bookings"><Button className="mt-4 w-full" size="sm">View My Bookings</Button></Link>
                  </div>
                ) : (
                  <div className="flex flex-col gap-4">
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-sm text-muted-foreground line-through">Rs. {pkg.originalPrice.toLocaleString()}</span>
                        <span className="text-2xl font-bold text-primary">Rs. {pricePerDay.toLocaleString()}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">per person per day</span>
                    </div>
                    <Separator />
                    <div className="flex flex-col gap-2">
                      <Label>Number of Travelers</Label>
                      <Input type="number" min={1} max={10} value={travelers} onChange={(e) => setTravelers(Number(e.target.value))} />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label>Number of Days</Label>
                      <Input 
                        type="number" 
                        value={numberOfDays} 
                        onChange={(e) => setNumberOfDays(Number(e.target.value))}
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label>Travel Date</Label>
                      <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} min={new Date().toISOString().split("T")[0]} />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Total Price</span>
                      <span className="text-xl font-bold text-foreground">Rs. {totalPrice.toLocaleString()}</span>
                    </div>
                    {currentUser ? (
                      <>
                        <Button className="w-full" onClick={handleBooking} disabled={!date}>
                          Book Now
                        </Button>
                      </>
                    ) : (
                      <Link href="/login">
                        <Button className="w-full">Login to Book</Button>
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
