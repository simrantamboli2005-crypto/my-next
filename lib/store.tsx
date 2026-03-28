"use client"

import type React from "react"
import { createContext, useContext, useState, useCallback, useEffect } from "react"
import type { User, Booking, Review, Expense, Destination, TourPackage, BlogPost } from "./data"
import { defaultReviews, destinations as defaultDestinations, tourPackages as defaultTourPackages, blogPosts as defaultBlogPosts } from "./data"
import { supabase } from "./supabase"

interface AppState {
  currentUser: User | null
  users: User[]
  bookings: Booking[]
  reviews: Review[]
  expenses: Expense[]
  destinations: Destination[]
  tourPackages: TourPackage[]
  blogPosts: BlogPost[]
  isAdmin: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  register: (name: string, email: string, phone: string, password: string) => Promise<boolean>
  logout: () => Promise<void>
  loginAsAdmin: (password: string) => Promise<boolean>
  updateProfile: (updates: Partial<User>) => Promise<void>
  toggleFavorite: (destId: string) => Promise<void>
  setTravelPersonality: (personality: string) => Promise<void>
  addBooking: (booking: Omit<Booking, "id" | "createdAt">) => Promise<void>
  updateBookingStatus: (id: string, status: Booking["status"]) => Promise<void>
  addReview: (review: Omit<Review, "id" | "date">) => Promise<void>
  addExpenseTrip: (trip: Omit<Expense, "id">) => Promise<void>
  addExpenseItem: (tripId: string, item: Omit<Expense["expenses"][0], "id">) => Promise<void>
  deleteExpenseItem: (tripId: string, itemId: string) => Promise<void>
  blockUser: (userId: string) => Promise<void>
  // Admin edit functions
  updateDestination: (id: string, updates: Partial<Destination>) => Promise<void>
  updatePackage: (id: string, updates: Partial<TourPackage>) => Promise<void>
  deletePackage: (id: string) => Promise<void>
  updateBlogPost: (id: string, updates: Partial<BlogPost>) => Promise<void>
  deleteBlogPost: (id: string) => Promise<void>
  updateUser: (id: string, updates: Partial<User>) => Promise<void>
  deleteUser: (id: string) => Promise<void>
}

const AppContext = createContext<AppState | null>(null)

// Admin password
const ADMIN_PASSWORD = "admin123"

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [users, setUsers] = useState<User[]>([])
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [bookings, setBookings] = useState<Booking[]>([])
  const [reviews, setReviews] = useState<Review[]>([])
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [destinations, setDestinations] = useState<Destination[]>(defaultDestinations)
  const [tourPackages, setTourPackages] = useState<TourPackage[]>(defaultTourPackages)
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(defaultBlogPosts)
  const [isAdmin, setIsAdmin] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Initialize with sample data
  useEffect(() => {
    // Load sample data
    setBookings([
      { id: "bk-1", userId: "user-1", packageId: "pkg-1", travelers: 2, date: "2026-03-15", status: "confirmed", totalPrice: 31998, createdAt: "2026-01-20", invoiceNumber: "INV-2026-001", invoiceDate: "2026-01-20", numberOfDays: 4 },
      { id: "bk-2", userId: "user-1", packageId: "pkg-3", travelers: 4, date: "2026-04-10", status: "pending", totalPrice: 39996, createdAt: "2026-02-01", invoiceNumber: "INV-2026-002", invoiceDate: "2026-02-01", numberOfDays: 3 },
    ])
    setReviews(defaultReviews)
    setDestinations(defaultDestinations)
    setTourPackages(defaultTourPackages)
    setBlogPosts(defaultBlogPosts)
    
    // Add some sample users
    setUsers([
      {
        id: "user-1",
        name: "John Doe",
        email: "john@example.com",
        phone: "9876543210",
        password: "password123",
        favorites: ["dest-1", "dest-3"],
        travelPersonality: "adventure",
        blocked: false,
      },
      {
        id: "user-2",
        name: "Jane Smith",
        email: "jane@example.com",
        phone: "9876543211",
        password: "password123",
        favorites: ["dest-2"],
        travelPersonality: "beach",
        blocked: false,
      }
    ])
    
    setIsLoading(false)
  }, [])

  const login = useCallback(
    async (email: string, password: string) => {
      try {
        // Try Supabase first
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password
        })

        if (error) {
          console.error('Supabase login error:', error.message)
          // Fallback to local users
          const user = users.find((u) => u.email === email && u.password === password && !u.blocked)
          if (user) {
            setCurrentUser(user)
            setIsAdmin(false)
            return true
          }
          return false
        }

        if (data.user) {
          const metadata = data.user.user_metadata || {}
          const isAdminUser = metadata.role === "admin" || email === "admin@example.com"
          
          const supabaseUser: User = {
            id: data.user.id,
            name: metadata.name || data.user.email?.split('@')[0] || 'User',
            email: data.user.email || '',
            phone: metadata.phone || '',
            password: '',
            favorites: [],
            travelPersonality: null,
            blocked: false,
          }
          
          setCurrentUser(supabaseUser)
          setIsAdmin(isAdminUser)
          return true
        }
      } catch (error) {
        console.error('Login error:', error)
      }
      
      return false
    },
    [users],
  )

  const register = useCallback(
    async (name: string, email: string, phone: string, password: string) => {
      try {
        // Try Supabase first
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { name, phone, role: "user" }
          }
        })

        if (error) {
          console.error('Supabase register error:', error.message)
          // Fallback to local store
          if (users.find((u) => u.email === email)) return false
          const newUser: User = {
            id: `user-${Date.now()}`,
            name,
            email,
            phone,
            password,
            favorites: [],
            travelPersonality: null,
            blocked: false,
          }
          setUsers((prev) => [...prev, newUser])
          setCurrentUser(newUser)
          setIsAdmin(false)
          return true
        }

        if (data.user) {
          const supabaseUser: User = {
            id: data.user.id,
            name,
            email,
            phone: phone || '',
            password: '',
            favorites: [],
            travelPersonality: null,
            blocked: false,
          }
          
          setUsers((prev) => [...prev, supabaseUser])
          setCurrentUser(supabaseUser)
          setIsAdmin(false)
          return true
        }
      } catch (error) {
        console.error('Register error:', error)
      }
      
      return false
    },
    [users],
  )

  const logout = useCallback(async () => {
    try {
      await supabase.auth.signOut()
    } catch (error) {
      console.error('Supabase logout error:', error)
    }
    setCurrentUser(null)
    setIsAdmin(false)
  }, [])

  const loginAsAdmin = useCallback(async (password: string) => {
    // Simple admin login with hardcoded password
    if (password === ADMIN_PASSWORD) {
      setIsAdmin(true)
      setCurrentUser(null)
      return true
    }
    return false
  }, [])

  const updateProfile = useCallback(async (updates: Partial<User>) => {
    setCurrentUser((prev) => {
      if (!prev) return null
      const updated = { ...prev, ...updates }
      setUsers((prevUsers) => prevUsers.map((u) => (u.id === prev.id ? updated : u)))
      return updated
    })
  }, [])

  const toggleFavorite = useCallback(async (destId: string) => {
    setCurrentUser((prev) => {
      if (!prev) return null
      const favs = prev.favorites.includes(destId)
        ? prev.favorites.filter((f) => f !== destId)
        : [...prev.favorites, destId]
      const updated = { ...prev, favorites: favs }
      setUsers((prevUsers) => prevUsers.map((u) => (u.id === prev.id ? updated : u)))
      return updated
    })
  }, [])

  const setTravelPersonality = useCallback(async (personality: string) => {
    setCurrentUser((prev) => {
      if (!prev) return null
      const updated = { ...prev, travelPersonality: personality }
      setUsers((prevUsers) => prevUsers.map((u) => (u.id === prev.id ? updated : u)))
      return updated
    })
  }, [])

const addBooking = useCallback(async (booking: Omit<Booking, "id" | "createdAt">) => {
    const newBooking: Booking = {
      ...booking,
      id: `bk-${Date.now()}`,
      createdAt: new Date().toISOString().split("T")[0],
      paymentMethod: booking.paymentMethod || "card",
      paymentStatus: booking.paymentStatus || "success",
    }
    setBookings((prev) => [...prev, newBooking])
  }, [])

  const updateBookingStatus = useCallback(async (id: string, status: Booking["status"]) => {
    setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status } : b)))
  }, [])

  const addReview = useCallback(
    async (review: Omit<Review, "id" | "date">) => {
      const newReview: Review = {
        ...review,
        id: `rev-${Date.now()}`,
        date: new Date().toISOString().split("T")[0],
      }
      setReviews((prev) => [...prev, newReview])
    },
    [],
  )

  const addExpenseTrip = useCallback(async (trip: Omit<Expense, "id">) => {
    setExpenses((prev) => [...prev, { ...trip, id: `exp-${Date.now()}` }])
  }, [])

  const addExpenseItem = useCallback(async (tripId: string, item: Omit<Expense["expenses"][0], "id">) => {
    setExpenses((prev) =>
      prev.map((e) =>
        e.id === tripId ? { ...e, expenses: [...e.expenses, { ...item, id: `item-${Date.now()}` }] } : e,
      ),
    )
  }, [])

  const deleteExpenseItem = useCallback(async (tripId: string, itemId: string) => {
    setExpenses((prev) =>
      prev.map((e) =>
        e.id === tripId ? { ...e, expenses: e.expenses.filter((ex) => ex.id !== itemId) } : e,
      ),
    )
  }, [])

  const blockUser = useCallback(async (userId: string) => {
    setUsers((prev) => prev.map((u) => (u.id === userId ? { ...u, blocked: !u.blocked } : u)))
  }, [])

  // Admin edit functions
  const updateDestination = useCallback(async (id: string, updates: Partial<Destination>) => {
    setDestinations((prev) => prev.map((d) => (d.id === id ? { ...d, ...updates } : d)))
  }, [])

  const updatePackage = useCallback(async (id: string, updates: Partial<TourPackage>) => {
    setTourPackages((prev) => prev.map((p) => (p.id === id ? { ...p, ...updates } : p)))
  }, [])

  const deletePackage = useCallback(async (id: string) => {
    setTourPackages((prev) => prev.filter((p) => p.id !== id))
  }, [])

  const updateBlogPost = useCallback(async (id: string, updates: Partial<BlogPost>) => {
    setBlogPosts((prev) => prev.map((b) => (b.id === id ? { ...b, ...updates } : b)))
  }, [])

  const deleteBlogPost = useCallback(async (id: string) => {
    setBlogPosts((prev) => prev.filter((b) => b.id !== id))
  }, [])

  const updateUser = useCallback(async (id: string, updates: Partial<User>) => {
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, ...updates } : u)))
  }, [])

  const deleteUser = useCallback(async (id: string) => {
    setUsers((prev) => prev.filter((u) => u.id !== id))
  }, [])

  const value: AppState = {
    currentUser,
    users,
    bookings,
    reviews,
    expenses,
    destinations,
    tourPackages,
    blogPosts,
    isAdmin,
    isLoading,
    login,
    register,
    logout,
    loginAsAdmin,
    updateProfile,
    toggleFavorite,
    setTravelPersonality,
    addBooking,
    updateBookingStatus,
    addReview,
    addExpenseTrip,
    addExpenseItem,
    deleteExpenseItem,
    blockUser,
    updateDestination,
    updatePackage,
    deletePackage,
    updateBlogPost,
    deleteBlogPost,
    updateUser,
    deleteUser,
  }

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error("useApp must be used within AppProvider")
  return ctx
}