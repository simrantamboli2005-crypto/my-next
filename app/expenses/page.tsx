"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useApp } from "@/lib/store"

const expenseCategories = ["Food", "Transport", "Accommodation", "Shopping", "Activities", "Miscellaneous"]

export default function ExpensesPage() {
  const { currentUser, expenses, addExpenseTrip, addExpenseItem, deleteExpenseItem } = useApp()
  const [newTripName, setNewTripName] = useState("")
  const [newTripBudget, setNewTripBudget] = useState("")
  const [addTripOpen, setAddTripOpen] = useState(false)
  const [addExpenseOpen, setAddExpenseOpen] = useState<string | null>(null)
  const [expDesc, setExpDesc] = useState("")
  const [expAmount, setExpAmount] = useState("")
  const [expCategory, setExpCategory] = useState("Food")

  if (!currentUser) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground">Please Login</h1>
          <p className="mt-2 text-muted-foreground">You need to be logged in to track expenses.</p>
          <Link href="/login"><Button className="mt-4">Login</Button></Link>
        </div>
      </div>
    )
  }

  const userExpenses = expenses.filter((e) => e.userId === currentUser.id)

  function handleAddTrip() {
    if (!newTripName.trim() || !newTripBudget) return
    addExpenseTrip({
      userId: currentUser!.id,
      tripName: newTripName.trim(),
      budget: Number(newTripBudget),
      expenses: [],
    })
    setNewTripName("")
    setNewTripBudget("")
    setAddTripOpen(false)
  }

  function handleAddExpense(tripId: string) {
    if (!expDesc.trim() || !expAmount) return
    addExpenseItem(tripId, {
      description: expDesc.trim(),
      amount: Number(expAmount),
      date: new Date().toISOString().split("T")[0],
      category: expCategory,
    })
    setExpDesc("")
    setExpAmount("")
    setExpCategory("Food")
    setAddExpenseOpen(null)
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl font-bold text-foreground">Expense Tracker</h1>
          <p className="mt-2 text-muted-foreground">Manage your trip finances efficiently</p>
        </div>
        <Dialog open={addTripOpen} onOpenChange={setAddTripOpen}>
          <DialogTrigger asChild>
            <Button>New Trip Budget</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Trip Budget</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col gap-4 pt-4">
              <div>
                <Label htmlFor="tripName">Trip Name</Label>
                <Input id="tripName" placeholder="e.g. Goa Vacation" value={newTripName} onChange={(e) => setNewTripName(e.target.value)} className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="tripBudget">Total Budget (Rs.)</Label>
                <Input id="tripBudget" type="number" placeholder="e.g. 25000" value={newTripBudget} onChange={(e) => setNewTripBudget(e.target.value)} className="mt-1.5" />
              </div>
              <Button onClick={handleAddTrip}>Create Budget</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {userExpenses.length === 0 ? (
        <div className="py-20 text-center">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mx-auto text-muted-foreground/50">
            <rect x="2" y="3" width="20" height="18" rx="2" />
            <line x1="2" y1="9" x2="22" y2="9" />
            <line x1="9" y1="3" x2="9" y2="21" />
          </svg>
          <p className="mt-4 text-lg text-muted-foreground">No trip budgets yet.</p>
          <p className="text-sm text-muted-foreground">Create a trip budget to start tracking your expenses.</p>
        </div>
      ) : (
        <div className="mt-8 flex flex-col gap-6">
          {userExpenses.map((trip) => {
            const totalSpent = trip.expenses.reduce((sum, e) => sum + e.amount, 0)
            const remaining = trip.budget - totalSpent
            const percentSpent = Math.min((totalSpent / trip.budget) * 100, 100)

            return (
              <Card key={trip.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl">{trip.tripName}</CardTitle>
                    <Dialog open={addExpenseOpen === trip.id} onOpenChange={(open) => setAddExpenseOpen(open ? trip.id : null)}>
                      <DialogTrigger asChild>
                        <Button size="sm" variant="outline" className="bg-transparent">Add Expense</Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Add Expense to {trip.tripName}</DialogTitle>
                        </DialogHeader>
                        <div className="flex flex-col gap-4 pt-4">
                          <div>
                            <Label>Description</Label>
                            <Input placeholder="e.g. Lunch at beach shack" value={expDesc} onChange={(e) => setExpDesc(e.target.value)} className="mt-1.5" />
                          </div>
                          <div>
                            <Label>Amount (Rs.)</Label>
                            <Input type="number" placeholder="e.g. 500" value={expAmount} onChange={(e) => setExpAmount(e.target.value)} className="mt-1.5" />
                          </div>
                          <div>
                            <Label>Category</Label>
                            <Select value={expCategory} onValueChange={setExpCategory}>
                              <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
                              <SelectContent>
                                {expenseCategories.map((cat) => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}
                              </SelectContent>
                            </Select>
                          </div>
                          <Button onClick={() => handleAddExpense(trip.id)}>Add Expense</Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardHeader>
                <CardContent>
                  {/* Budget overview */}
                  <div className="mb-4 grid grid-cols-3 gap-4 rounded-lg bg-muted/50 p-4">
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground">Budget</p>
                      <p className="text-lg font-bold text-foreground">Rs. {trip.budget.toLocaleString()}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground">Spent</p>
                      <p className="text-lg font-bold text-accent">Rs. {totalSpent.toLocaleString()}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground">Remaining</p>
                      <p className={`text-lg font-bold ${remaining >= 0 ? "text-primary" : "text-destructive"}`}>
                        Rs. {remaining.toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <Progress value={percentSpent} className="h-2" />
                  <p className="mt-1 text-xs text-muted-foreground">{percentSpent.toFixed(0)}% of budget used</p>

                  {/* Expense list */}
                  {trip.expenses.length > 0 && (
                    <div className="mt-4 divide-y divide-border">
                      {trip.expenses.map((item) => (
                        <div key={item.id} className="flex items-center justify-between py-3">
                          <div className="flex items-center gap-3">
                            <Badge variant="secondary" className="text-xs">{item.category}</Badge>
                            <div>
                              <p className="text-sm font-medium text-foreground">{item.description}</p>
                              <p className="text-xs text-muted-foreground">{item.date}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold text-foreground">Rs. {item.amount.toLocaleString()}</span>
                            <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-destructive hover:text-destructive" onClick={() => deleteExpenseItem(trip.id, item.id)}>
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /></svg>
                              <span className="sr-only">Delete expense</span>
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
