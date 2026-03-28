"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useApp } from "@/lib/store"
import { personalityTypes, destinations } from "@/lib/data"

export default function ProfilePage() {
  const { currentUser, updateProfile, bookings } = useApp()
  const [editing, setEditing] = useState(false)
  const [name, setName] = useState(currentUser?.name || "")
  const [phone, setPhone] = useState(currentUser?.phone || "")
  const [saved, setSaved] = useState(false)

  // Sync local state when currentUser changes (e.g. after login redirect)
  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name)
      setPhone(currentUser.phone)
    }
  }, [currentUser])

  if (!currentUser) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground">Please Login</h1>
          <p className="mt-2 text-muted-foreground">You need to be logged in to view your profile.</p>
          <Link href="/login"><Button className="mt-4">Login</Button></Link>
        </div>
      </div>
    )
  }

  const personality = currentUser.travelPersonality ? personalityTypes[currentUser.travelPersonality] : null
  const userBookings = bookings.filter((b) => b.userId === currentUser.id)
  const favDests = currentUser.favorites.map((id) => destinations.find((d) => d.id === id)).filter(Boolean)

  const handleSave = () => {
    updateProfile({ ...currentUser, name, phone })
    setEditing(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="font-serif text-3xl font-bold text-foreground">My Profile</h1>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Personal Information</CardTitle>
          </CardHeader>
          <CardContent>
            {saved && <div className="mb-3 rounded-md bg-primary/10 p-2 text-sm text-primary">Profile updated!</div>}
            <div className="mb-6 flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
                {currentUser.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="text-lg font-semibold text-foreground">{currentUser.name}</p>
                <p className="text-sm text-muted-foreground">{currentUser.email}</p>
              </div>
            </div>
            {editing ? (
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <Label>Name</Label>
                  <Input value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="flex flex-col gap-2">
                  <Label>Phone</Label>
                  <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleSave} size="sm">Save</Button>
                  <Button variant="outline" size="sm" onClick={() => setEditing(false)}>Cancel</Button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                <div className="flex justify-between text-sm"><span className="text-muted-foreground">Email</span><span className="text-foreground">{currentUser.email}</span></div>
                <div className="flex justify-between text-sm"><span className="text-muted-foreground">Phone</span><span className="text-foreground">{currentUser.phone}</span></div>
                <Button variant="outline" size="sm" className="mt-2 w-fit bg-transparent" onClick={() => setEditing(true)}>Edit Profile</Button>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Travel Personality</CardTitle>
          </CardHeader>
          <CardContent>
            {personality ? (
              <div>
                <Badge className="bg-primary text-primary-foreground text-base px-3 py-1">{personality.name}</Badge>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{personality.description}</p>
                <Link href="/quiz"><Button variant="outline" size="sm" className="mt-4 bg-transparent">Retake Quiz</Button></Link>
              </div>
            ) : (
              <div>
                <p className="text-sm text-muted-foreground">You have not taken the quiz yet.</p>
                <Link href="/quiz"><Button size="sm" className="mt-3">Take Quiz</Button></Link>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Separator className="my-8" />

      {/* Booking History */}
      <h2 className="text-xl font-semibold text-foreground">Booking History</h2>
      {userBookings.length === 0 ? (
        <p className="mt-3 text-sm text-muted-foreground">No bookings yet.</p>
      ) : (
        <div className="mt-4 flex flex-col gap-3">
          {userBookings.map((b) => (
            <div key={b.id} className="flex items-center justify-between rounded-lg border border-border p-4">
              <div>
                <p className="font-medium text-foreground">{b.packageId}</p>
                <p className="text-sm text-muted-foreground">{b.travelers} travelers &middot; {b.date}</p>
              </div>
              <div className="text-right">
                <Badge variant={b.status === "confirmed" ? "default" : b.status === "pending" ? "secondary" : "destructive"} className="capitalize">{b.status}</Badge>
                <p className="mt-1 text-sm font-bold text-primary">Rs. {b.totalPrice.toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      <Separator className="my-8" />

      {/* Favorites */}
      <h2 className="text-xl font-semibold text-foreground">Saved Destinations</h2>
      {favDests.length === 0 ? (
        <p className="mt-3 text-sm text-muted-foreground">No saved destinations yet.</p>
      ) : (
        <div className="mt-4 flex flex-wrap gap-3">
          {favDests.map((d) => d && (
            <Link key={d.id} href={`/destinations/${d.id}`}>
              <Badge variant="secondary" className="px-3 py-2 text-sm">{d.name}, {d.state}</Badge>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
