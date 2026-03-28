"use client"

import React, { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useApp } from "@/lib/store"

export default function RegisterPage() {

 const router = useRouter()
 const { register, currentUser } = useApp()

 const [name,setName] = useState("")
 const [email,setEmail] = useState("")
 const [phone,setPhone] = useState("")
 const [password,setPassword] = useState("")
 const [error,setError] = useState("")
 const [loading,setLoading] = useState(false)

 // Track whether this component triggered the registration
 const didRegister = useRef(false)

 // Redirect once auth state updates after user action
 useEffect(() => {
   if (didRegister.current && currentUser) {
     didRegister.current = false
     router.push("/")
   }
 }, [currentUser, router])

 const handleRegister = async (e:React.FormEvent) => {
   e.preventDefault()
   setError("")
   setLoading(true)

   const success = await register(name, email, phone, password)

   setLoading(false)

   if(success){
     didRegister.current = true
   } else {
     setError("Registration failed. Email may already be in use.")
   }
 }

 return (
 <div className="flex min-h-[80vh] items-center justify-center px-4 py-16">
  <Card className="w-full max-w-md">
   <CardHeader className="text-center">
    <CardTitle>Create Account</CardTitle>
    <CardDescription>Join SmartTravels</CardDescription>
   </CardHeader>

   <CardContent>
    <form onSubmit={handleRegister} className="flex flex-col gap-4">

     {error && (
       <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
         {error}
       </div>
     )}

     <div className="flex flex-col gap-2">
      <Label htmlFor="name">Full Name</Label>
      <Input
        id="name"
        placeholder="John Doe"
        value={name}
        onChange={(e)=>setName(e.target.value)}
        required
      />
     </div>

     <div className="flex flex-col gap-2">
      <Label htmlFor="email">Email</Label>
      <Input
        id="email"
        type="email"
        placeholder="john@example.com"
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
        required
      />
     </div>

     <div className="flex flex-col gap-2">
      <Label htmlFor="phone">Phone</Label>
      <Input
        id="phone"
        placeholder="9876543210"
        value={phone}
        onChange={(e)=>setPhone(e.target.value)}
      />
     </div>

     <div className="flex flex-col gap-2">
      <Label htmlFor="password">Password</Label>
      <Input
        id="password"
        type="password"
        placeholder="Create a password"
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
        required
      />
     </div>

     <Button type="submit" disabled={loading} className="w-full">
      {loading ? "Creating Account..." : "Create Account"}
     </Button>

    </form>

    <p className="mt-6 text-center text-sm text-muted-foreground">
      {"Already have an account? "}
      <Link href="/login" className="text-primary hover:underline">
        Login
      </Link>
    </p>
   </CardContent>
  </Card>
 </div>
 )
}
