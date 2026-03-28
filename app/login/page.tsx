"use client"

import React from "react"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useApp } from "@/lib/store"

export default function LoginPage() {
  const { currentUser, isAdmin, login, loginAsAdmin } = useApp()
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [adminPassword, setAdminPassword] = useState("")
  const [showAdminInput, setShowAdminInput] = useState(false)
  const [adminError, setAdminError] = useState("")

  // Track whether this component triggered the login
  const didLogin = useRef(false)
  const didAdminLogin = useRef(false)

  // Single effect: redirect once auth state updates after user action
  useEffect(() => {
    if (didLogin.current && currentUser) {
      didLogin.current = false
      router.push("/")
    }
  }, [currentUser, router])

  useEffect(() => {
    if (didAdminLogin.current && isAdmin) {
      didAdminLogin.current = false
      router.push("/admin")
    }
  }, [isAdmin, router])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    const success = await login(email, password)
    if (success) {
      didLogin.current = true
    } else {
      setError("Invalid email or password. Please register if you don't have an account.")
    }
  }

  const handleAdminLogin = async () => {
    if (!showAdminInput) {
      setShowAdminInput(true)
      return
    }
    
    if (!adminPassword) {
      setAdminError("Please enter admin password")
      return
    }
    
    const success = await loginAsAdmin(adminPassword)
    if (success) {
      didAdminLogin.current = true
      setAdminError("")
      setAdminPassword("")
      setShowAdminInput(false)
    } else {
      setAdminError("Invalid admin password")
    }
  }

  const handleAdminKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleAdminLogin()
    }
  }

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4 py-16">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="font-serif text-2xl">Welcome Back</CardTitle>
          <CardDescription>
            Login to your SmartTravels account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            {error && (
              <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
                {error}
              </div>
            )}
            <div className="flex flex-col gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>

          <div className="mt-4 flex flex-col gap-3">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">Or</span>
              </div>
            </div>
            {!showAdminInput ? (
              <Button
                variant="outline"
                className="w-full bg-transparent"
                onClick={handleAdminLogin}
              >
                Login as Admin
              </Button>
            ) : (
              <div className="flex flex-col gap-2 rounded-md border p-4">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="admin-password">Admin Password</Label>
                  <Input
                    id="admin-password"
                    type="password"
                    placeholder="Enter admin password"
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    onKeyDown={handleAdminKeyPress}
                  />
                </div>
                {adminError && (
                  <p className="text-sm text-destructive">{adminError}</p>
                )}
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="flex-1 bg-transparent"
                    onClick={() => {
                      setShowAdminInput(false)
                      setAdminError("")
                      setAdminPassword("")
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="flex-1"
                    onClick={handleAdminLogin}
                  >
                    Submit
                  </Button>
                </div>
              </div>
            )}
          </div>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            {"Don't have an account? "}
            <Link href="/register" className="text-primary hover:underline">
              Sign Up
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
