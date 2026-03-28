"use client"

import { Suspense } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useApp } from "@/lib/store"
import { tourPackages, destinations } from "@/lib/data"

function InvoiceContent() {
  const searchParams = useSearchParams()
  const bookingId = searchParams.get("id")
  const { currentUser, bookings } = useApp()
  
  const booking = bookings.find((b) => b.id === bookingId)
  const pkg = booking ? tourPackages.find((p) => p.id === booking.packageId) : null
  const dest = pkg ? destinations.find((d) => d.id === pkg.destinationId) : null
  
  // If no booking found, show error
  if (!booking || !pkg) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground">Invoice Not Found</h1>
          <p className="mt-2 text-muted-foreground">The requested invoice could not be found.</p>
          <Link href="/bookings">
            <Button className="mt-4">View My Bookings</Button>
          </Link>
        </div>
      </div>
    )
  }
  
  // Get user details
  const user = currentUser?.id === booking.userId ? currentUser : null
  
  // Calculate price per person
  const pricePerPerson = booking.travelers > 0 ? booking.totalPrice / booking.travelers : pkg.price
  
  // Format date for display
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  // Helper function to get properly formatted days/nights string
  const getDaysAndNights = () => {
    if (!booking.numberOfDays) {
      return pkg?.duration || "N/A"
    }
    const days = booking.numberOfDays
    const nights = days > 1 ? days - 1 : days
    return `${days} Days / ${nights} Nights`
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl font-bold text-foreground">Invoice</h1>
          <p className="mt-1 text-muted-foreground">Smart Travels Tour System</p>
        </div>
        <Button variant="outline" onClick={() => window.print()}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2"
          >
            <polyline points="6 9 6 2 18 2 18 9" />
            <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
            <rect width="12" height="8" x="6" y="14" />
          </svg>
          Print Invoice
        </Button>
      </div>

      {/* Invoice Details Card */}
      <Card className="mt-8">
        <CardContent className="p-6">
          {/* Invoice Header */}
          <div className="flex flex-col gap-6 sm:flex-row sm:justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Invoice Number</p>
              <p className="text-lg font-semibold text-foreground">{booking.invoiceNumber}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Invoice Date</p>
              <p className="text-lg font-semibold text-foreground">{formatDate(booking.invoiceDate)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Booking Status</p>
              <Badge
                variant={booking.status === "confirmed" ? "default" : booking.status === "pending" ? "secondary" : "destructive"}
                className="mt-1 capitalize"
              >
                {booking.status}
              </Badge>
            </div>
          </div>

          <Separator className="my-6" />

          {/* Customer & Travel Details */}
          <div className="grid gap-6 sm:grid-cols-2">
            {/* Customer Details */}
            <div>
              <h3 className="font-semibold text-foreground">Customer Details</h3>
              <div className="mt-3 space-y-1 text-sm">
                <p className="text-foreground">{user?.name || "Guest User"}</p>
                <p className="text-muted-foreground">{user?.email || "N/A"}</p>
                <p className="text-muted-foreground">{user?.phone || "N/A"}</p>
              </div>
            </div>

            {/* Travel Details */}
            <div>
              <h3 className="font-semibold text-foreground">Travel Details</h3>
              <div className="mt-3 space-y-1 text-sm">
                <p className="text-foreground">
                  <span className="text-muted-foreground">Package:</span> {pkg.name}
                </p>
                <p className="text-foreground">
                  <span className="text-muted-foreground">Destination:</span> {dest?.name}, {dest?.country}
                </p>
                <p className="text-foreground">
                  <span className="text-muted-foreground">Travel Date:</span> {formatDate(booking.date)}
                </p>
                <p className="text-foreground">
                  <span className="text-muted-foreground">Duration:</span> {getDaysAndNights()}
                </p>
                <p className="text-foreground">
                  <span className="text-muted-foreground">Travelers:</span> {booking.travelers} {booking.travelers === 1 ? "Person" : "Persons"}
                </p>
              </div>
            </div>
          </div>

          <Separator className="my-6" />

          {/* Price Breakdown */}
          <h3 className="font-semibold text-foreground">Price Breakdown</h3>
          <div className="mt-4 space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Package Price (per person)</span>
              <span className="text-foreground">Rs. {pricePerPerson.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Number of Travelers</span>
              <span className="text-foreground">× {booking.travelers}</span>
            </div>
            {pkg.originalPrice > pkg.price && (
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Discount ({Math.round(((pkg.originalPrice - pkg.price) / pkg.originalPrice) * 100)}% off)</span>
                <span className="text-green-600">- Rs. {((pkg.originalPrice - pkg.price) * booking.travelers).toLocaleString()}</span>
              </div>
            )}
            <Separator />
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold text-foreground">Total Amount</span>
              <span className="text-2xl font-bold text-primary">Rs. {booking.totalPrice.toLocaleString()}</span>
            </div>
          </div>

          <Separator className="my-6" />

          {/* Package Inclusions */}
          <h3 className="font-semibold text-foreground">Package Inclusions</h3>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {pkg.inclusions.map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="shrink-0 text-green-600"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                {item}
              </li>
            ))}
          </ul>

          {/* Terms */}
          <div className="mt-6 rounded-lg bg-muted p-4">
            <h4 className="font-semibold text-foreground">Terms & Conditions</h4>
            <ul className="mt-2 space-y-1 text-xs text-muted-foreground">
              {pkg.termsAndConditions.map((term, index) => (
                <li key={index}>• {term}</li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Back Button */}
      <div className="mt-6 flex justify-center">
        <Link href="/bookings">
          <Button variant="outline">Back to My Bookings</Button>
        </Link>
      </div>
    </div>
  )
}

export default function InvoicePage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-muted-foreground">Loading invoice...</p>
      </div>
    }>
      <InvoiceContent />
    </Suspense>
  )
}
