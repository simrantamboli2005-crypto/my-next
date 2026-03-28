"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Loader2 } from "lucide-react"
import { useApp } from "@/lib/store"
import { useState, useTransition } from "react"
import { useSearchParams } from "next/navigation"

interface PaymentModalProps {
  bookingId: string
  totalPrice: number
  packageName: string
  onSuccess: () => void
}

export function PaymentModal({ bookingId, totalPrice, packageName, onSuccess }: PaymentModalProps) {
  const [showPayment, setShowPayment] = useState(true)
  const [paymentLoading, startPaymentTransition] = useTransition()
  const { addBooking, bookings, updateBookingStatus } = useApp()
  const [cardNumber, setCardNumber] = useState("**** **** **** 4242")
  const [name, setName] = useState("John Doe")
  const [expiry, setExpiry] = useState("12/26")
  const [cvv, setCvv] = useState("123")

  const booking = bookings.find(b => b.id === bookingId)
  if (!booking) return null

  const handlePay = () => {
    startPaymentTransition(async () => {
      await new Promise(resolve => setTimeout(resolve, 2500))
      
      // Update existing booking to confirmed + payment
      updateBookingStatus(bookingId, "confirmed")
      
      onSuccess()
    })
  }

  return (
    <Dialog open={showPayment} onOpenChange={setShowPayment}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Pay for Booking</DialogTitle>
          <DialogDescription>
            Complete payment for <strong>{packageName}</strong>
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <Card>
            <CardContent className="p-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span>Booking #{booking.invoiceNumber}</span>
                <span>Pending</span>
              </div>
              <Separator />
              <div className="flex justify-between font-semibold">
                <span>Total Due</span>
                <span>Rs. {totalPrice.toLocaleString()}</span>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label>Cardholder</Label>
                <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="John Doe" />
              </div>
              <div className="space-y-1">
                <Label>Expiry</Label>
                <Input value={expiry} onChange={(e) => setExpiry(e.target.value)} placeholder="MM/YY" />
              </div>
            </div>
            <div className="space-y-1">
              <Label>Card Number</Label>
              <Input value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} placeholder="**** **** **** ****" readOnly />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label>CVV</Label>
              <Input type="password" value={cvv} onChange={(e) => setCvv(e.target.value)} placeholder="***" />
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" className="flex-1" onClick={() => setShowPayment(false)}>
            Cancel
          </Button>
          <Button className="flex-1" onClick={handlePay} disabled={paymentLoading}>
            {paymentLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              `Pay Rs. ${totalPrice.toLocaleString()}`
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
