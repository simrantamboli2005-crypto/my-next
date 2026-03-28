"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useApp } from "@/lib/store"
import { tourPackages, destinations } from "@/lib/data"
import { PaymentModal } from "./PaymentModal"
import { useState } from "react"

export default function BookingsPage() {
  const { currentUser, bookings, updateBookingStatus } = useApp()
  const [showPaymentId, setShowPaymentId] = useState<string | null>(null)

  if (!currentUser) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground">Please Login</h1>
          <p className="mt-2 text-muted-foreground">You need to be logged in to view your bookings.</p>
          <Link href="/login"><Button className="mt-4">Login</Button></Link>
        </div>
      </div>
    )
  }

  const userBookings = bookings.filter((b) => b.userId === currentUser.id)

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="font-serif text-3xl font-bold text-foreground">My Bookings</h1>
      <p className="mt-2 text-muted-foreground">Track and manage your trip reservations</p>

      {userBookings.length === 0 ? (
        <div className="py-20 text-center">
          <p className="text-lg text-muted-foreground">You have no bookings yet.</p>
          <Link href="/packages"><Button className="mt-4">Browse Packages</Button></Link>
        </div>
      ) : (
        <div className="mt-8 flex flex-col gap-4">
          {userBookings.map((booking) => {
            const pkg = tourPackages.find((p) => p.id === booking.packageId)
            const dest = pkg ? destinations.find((d) => d.id === pkg.destinationId) : null
            return (
              <Card key={booking.id}>
                <CardContent className="flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-semibold text-foreground">{pkg?.name || booking.packageId}</h3>
                      <Badge
                        variant={booking.status === "confirmed" ? "default" : booking.status === "pending" ? "secondary" : "destructive"}
                        className="capitalize"
                      >
                        {booking.status}
                      </Badge>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {dest?.name} &middot; {booking.travelers} travelers &middot; {booking.numberOfDays ? `${booking.numberOfDays} Days / ${booking.numberOfDays > 1 ? booking.numberOfDays - 1 : booking.numberOfDays} Nights` : ""} &middot; {booking.date}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Booked on {booking.createdAt} &middot; Invoice: {booking.invoiceNumber || "N/A"}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-xl font-bold text-primary">Rs. {booking.totalPrice.toLocaleString()}</p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Link href={`/invoices?id=${booking.id}`}>
                        <Button variant="outline" size="sm">
                          View Invoice
                        </Button>
                      </Link>
                      {booking.status === "pending" && (
                        <div className="flex gap-2">
                          <Button variant="destructive" size="sm" onClick={() => updateBookingStatus(booking.id, "cancelled")}>
                            Cancel
                          </Button>
                          <Button size="sm" className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700" onClick={() => setShowPaymentId(booking.id)}>
                            Pay Now
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
          {showPaymentId && (
            <PaymentModal 
              bookingId={showPaymentId}
              totalPrice={userBookings.find(b => b.id === showPaymentId)?.totalPrice || 0}
              packageName={tourPackages.find(p => p.id === userBookings.find(b => b.id === showPaymentId)?.packageId)?.name || "Trip"}
              onSuccess={() => setShowPaymentId(null)}
            />
          )}
        </div>
      )}
    </div>
  )
}
