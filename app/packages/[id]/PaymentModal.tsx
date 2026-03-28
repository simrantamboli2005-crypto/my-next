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

interface PaymentModalProps {
  totalPrice: number
  onSuccess: () => void
  travelers: number
  numberOfDays: number
  date: string
  packageId: string
  currentUser: any
}

export function PaymentModal({ totalPrice, onSuccess, travelers, numberOfDays, date, packageId, currentUser }: PaymentModalProps) {
  const [showPayment, setShowPayment] = useState(true)
  const [paymentLoading, startPaymentTransition] = useTransition()
  const { addBooking } = useApp()
  const [cardNumber, setCardNumber] = useState("**** **** **** 4242")
  const [name, setName] = useState("John Doe")
  const [expiry, setExpiry] = useState("12/26")
  const [cvv, setCvv] = useState("123")

  const handlePay = () => {
    startPaymentTransition(async () => {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2500))
      
      // Always success
      const invoiceNumber = `INV-${new Date().toISOString().split("T")[0].replace(/-/g, "")}-${Math.floor(Math.random() * 1000).toString().padStart(3, "0")}`
      
      addBooking({
        userId: currentUser.id,
        packageId,
        travelers,
        date,
        status: "confirmed",
        totalPrice,
        numberOfDays,
        invoiceNumber,
        invoiceDate: new Date().toISOString().split("T")[0],
        paymentMethod: "card",
        paymentStatus: "success" as const,
      })
      
      onSuccess()
    })
  }

  return (
    <Dialog open={showPayment} onOpenChange={setShowPayment}>
      <DialogContent className="max-w-md sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Secure Payment</DialogTitle>
          <DialogDescription>
            Complete your booking with secure card payment. All transactions are encrypted.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Amount Breakdown */}
          <Card>
            <CardContent className="p-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span>{numberOfDays} days × {travelers} travelers</span>
                <span>Rs. {totalPrice.toLocaleString()}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-semibold text-lg">
                <span>Total Amount</span>
                <span>Rs. {totalPrice.toLocaleString()}</span>
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                Secure | 256-bit SSL | No charges until confirmed
              </div>
            </CardContent>
          </Card>

          {/* Payment Form */}
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label htmlFor="card-name">Cardholder Name</Label>
                <Input id="card-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="John Doe" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="card-expiry">Expiry</Label>
                <Input id="card-expiry" value={expiry} onChange={(e) => setExpiry(e.target.value)} placeholder="MM/YY" />
              </div>
            </div>
            <div className="space-y-1">
              <Label htmlFor="card-number">Card Number</Label>
              <Input 
                id="card-number" 
                value={cardNumber} 
                onChange={(e) => setCardNumber(e.target.value.replace(/\\s/g, '').replace(/(.{4})/g, '$1 ').slice(0,19))} 
                placeholder="0000 0000 0000 0000"
                maxLength={19}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label>CVV</Label>
                <Input type="password" value={cvv} onChange={(e) => setCvv(e.target.value)} placeholder="123" maxLength={4} />
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button 
            type="button" 
            variant="outline" 
            className="flex-1"
            onClick={() => setShowPayment(false)}
          >
            Cancel
          </Button>
          <Button 
            className="flex-1" 
            onClick={handlePay}
            disabled={paymentLoading}
          >
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
