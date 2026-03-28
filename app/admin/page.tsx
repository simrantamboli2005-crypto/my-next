"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useApp } from "@/lib/store"
import { type Destination, type TourPackage, type BlogPost, type User, type Booking, type Review } from "@/lib/data"

// Admin Login Component
function AdminLogin({ onLogin }: { onLogin: (password: string) => Promise<boolean> }) {
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    
    try {
      const success = await onLogin(password)
      if (!success) {
        setError("Invalid admin password")
      }
    } catch (err) {
      setError("An error occurred. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
<Card className="w-full max-w-sm sm:max-w-md shadow-lg hover:shadow-xl transition-shadow duration-200">
        <CardContent className="p-8 text-center">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mx-auto text-primary">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          <h1 className="mt-4 text-2xl font-bold text-foreground">Admin Access</h1>
          <p className="mt-2 text-sm text-muted-foreground">Enter your admin password to manage the platform.</p>
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div className="text-left">
              <Label htmlFor="admin-password">Admin Password</Label>
              <Input
                id="admin-password"
                type="password"
                placeholder="Enter admin password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1"
                disabled={loading}
              />
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Verifying..." : "Login"}
            </Button>
          </form>
          
        </CardContent>
      </Card>
    </div>
  )
}

// Edit Destination Dialog
function EditDestinationDialog({ destination, onSave, onCancel }: { destination: Destination; onSave: (id: string, updates: Partial<Destination>) => Promise<void>; onCancel: () => void }) {
  const [formData, setFormData] = useState({
    name: destination.name,
    state: destination.state,
    country: destination.country,
    category: destination.category,
    description: destination.description,
    bestTimeToVisit: destination.bestTimeToVisit,
    rating: destination.rating.toString(),
    reviewCount: destination.reviewCount.toString(),
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await onSave(destination.id, {
        name: formData.name,
        state: formData.state,
        country: formData.country,
        category: formData.category as Destination["category"],
        description: formData.description,
        bestTimeToVisit: formData.bestTimeToVisit,
        rating: parseFloat(formData.rating) || destination.rating,
        reviewCount: parseInt(formData.reviewCount) || destination.reviewCount,
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open onOpenChange={onCancel}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Destination</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Name</Label>
              <Input 
                value={formData.name} 
                onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
                required
              />
            </div>
            <div>
              <Label>State</Label>
              <Input 
                value={formData.state} 
                onChange={(e) => setFormData({ ...formData, state: e.target.value })} 
                required
              />
            </div>
            <div>
              <Label>Country</Label>
              <Input 
                value={formData.country} 
                onChange={(e) => setFormData({ ...formData, country: e.target.value })} 
                required
              />
            </div>
            <div>
              <Label>Category</Label>
              <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value as Destination["category"] })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="beach">Beach</SelectItem>
                  <SelectItem value="hill_station">Hill Station</SelectItem>
                  <SelectItem value="heritage">Heritage</SelectItem>
                  <SelectItem value="wildlife">Wildlife</SelectItem>
                  <SelectItem value="city">City</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Best Time to Visit</Label>
              <Input 
                value={formData.bestTimeToVisit} 
                onChange={(e) => setFormData({ ...formData, bestTimeToVisit: e.target.value })} 
                required
              />
            </div>
            <div>
              <Label>Rating</Label>
              <Input 
                type="number" 
                step="0.1" 
                min="0" 
                max="5"
                value={formData.rating} 
                onChange={(e) => setFormData({ ...formData, rating: e.target.value })} 
                required
              />
            </div>
            <div>
              <Label>Review Count</Label>
              <Input 
                type="number" 
                min="0"
                value={formData.reviewCount} 
                onChange={(e) => setFormData({ ...formData, reviewCount: e.target.value })} 
                required
              />
            </div>
          </div>
          <div>
            <Label>Description</Label>
            <Textarea 
              value={formData.description} 
              onChange={(e) => setFormData({ ...formData, description: e.target.value })} 
              rows={4} 
              required
            />
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onCancel} disabled={loading}>Cancel</Button>
            <Button type="submit" disabled={loading}>{loading ? "Saving..." : "Save Changes"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

// Edit Package Dialog
function EditPackageDialog({ pkg, destinations, onSave, onCancel }: { pkg: TourPackage; destinations: Destination[]; onSave: (id: string, updates: Partial<TourPackage>) => Promise<void>; onCancel: () => void }) {
  const [formData, setFormData] = useState({
    name: pkg.name,
    destinationId: pkg.destinationId,
    price: pkg.price.toString(),
    originalPrice: pkg.originalPrice.toString(),
    duration: pkg.duration,
    featured: pkg.featured,
    active: pkg.active,
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await onSave(pkg.id, {
        name: formData.name,
        destinationId: formData.destinationId,
        price: parseInt(formData.price) || pkg.price,
        originalPrice: parseInt(formData.originalPrice) || pkg.originalPrice,
        duration: formData.duration,
        featured: formData.featured,
        active: formData.active,
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open onOpenChange={onCancel}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Package</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Package Name</Label>
              <Input 
                value={formData.name} 
                onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
                required
              />
            </div>
            <div>
              <Label>Destination</Label>
              <Select value={formData.destinationId} onValueChange={(value) => setFormData({ ...formData, destinationId: value })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {destinations.map((dest) => (
                    <SelectItem key={dest.id} value={dest.id}>{dest.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Price (Rs.)</Label>
              <Input 
                type="number" 
                min="0"
                value={formData.price} 
                onChange={(e) => setFormData({ ...formData, price: e.target.value })} 
                required
              />
            </div>
            <div>
              <Label>Original Price (Rs.)</Label>
              <Input 
                type="number" 
                min="0"
                value={formData.originalPrice} 
                onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })} 
                required
              />
            </div>
            <div>
              <Label>Duration</Label>
              <Input 
                value={formData.duration} 
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })} 
                required
              />
            </div>
            <div className="flex items-center gap-4 pt-6">
              <label className="flex items-center gap-2">
                <input 
                  type="checkbox" 
                  checked={formData.featured} 
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })} 
                />
                <span>Featured</span>
              </label>
              <label className="flex items-center gap-2">
                <input 
                  type="checkbox" 
                  checked={formData.active} 
                  onChange={(e) => setFormData({ ...formData, active: e.target.checked })} 
                />
                <span>Active</span>
              </label>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onCancel} disabled={loading}>Cancel</Button>
            <Button type="submit" disabled={loading}>{loading ? "Saving..." : "Save Changes"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

// Edit Blog Post Dialog
function EditBlogPostDialog({ post, onSave, onCancel }: { post: BlogPost; onSave: (id: string, updates: Partial<BlogPost>) => Promise<void>; onCancel: () => void }) {
  const [formData, setFormData] = useState({
    title: post.title,
    excerpt: post.excerpt,
    content: post.content,
    category: post.category,
    author: post.author,
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await onSave(post.id, {
        title: formData.title,
        excerpt: formData.excerpt,
        content: formData.content,
        category: formData.category as BlogPost["category"],
        author: formData.author,
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open onOpenChange={onCancel}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Blog Post</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <Label>Title</Label>
              <Input 
                value={formData.title} 
                onChange={(e) => setFormData({ ...formData, title: e.target.value })} 
                required
              />
            </div>
            <div>
              <Label>Category</Label>
              <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value as BlogPost["category"] })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="tips">Tips</SelectItem>
                  <SelectItem value="safety">Safety</SelectItem>
                  <SelectItem value="packing">Packing</SelectItem>
                  <SelectItem value="culture">Culture</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Author</Label>
              <Input 
                value={formData.author} 
                onChange={(e) => setFormData({ ...formData, author: e.target.value })} 
                required
              />
            </div>
            <div className="col-span-2">
              <Label>Excerpt</Label>
              <Input 
                value={formData.excerpt} 
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })} 
                required
              />
            </div>
            <div className="col-span-2">
              <Label>Content</Label>
              <Textarea 
                value={formData.content} 
                onChange={(e) => setFormData({ ...formData, content: e.target.value })} 
                rows={6} 
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onCancel} disabled={loading}>Cancel</Button>
            <Button type="submit" disabled={loading}>{loading ? "Saving..." : "Save Changes"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

// Edit User Dialog
function EditUserDialog({ user, onSave, onCancel }: { user: User; onSave: (id: string, updates: Partial<User>) => Promise<void>; onCancel: () => void }) {
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone || "",
    travelPersonality: user.travelPersonality || "",
    blocked: user.blocked || false,
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await onSave(user.id, {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        travelPersonality: formData.travelPersonality || null,
        blocked: formData.blocked,
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open onOpenChange={onCancel}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label>Name</Label>
            <Input 
              value={formData.name} 
              onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
              required
            />
          </div>
          <div>
            <Label>Email</Label>
            <Input 
              type="email"
              value={formData.email} 
              onChange={(e) => setFormData({ ...formData, email: e.target.value })} 
              required
            />
          </div>
          <div>
            <Label>Phone</Label>
            <Input 
              value={formData.phone} 
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })} 
            />
          </div>
          <div>
            <Label>Travel Personality</Label>
            <Input 
              value={formData.travelPersonality} 
              onChange={(e) => setFormData({ ...formData, travelPersonality: e.target.value })} 
              placeholder="e.g., adventure, beach, city" 
            />
          </div>
          <div>
            <label className="flex items-center gap-2">
              <input 
                type="checkbox" 
                checked={formData.blocked} 
                onChange={(e) => setFormData({ ...formData, blocked: e.target.checked })} 
              />
              <span>Blocked</span>
            </label>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onCancel} disabled={loading}>Cancel</Button>
            <Button type="submit" disabled={loading}>{loading ? "Saving..." : "Save Changes"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

// Delete Confirmation Dialog
function DeleteConfirmDialog({ title, itemName, onConfirm, onCancel, open }: { title: string; itemName: string; onConfirm: () => Promise<void>; onCancel: () => void; open: boolean }) {
  const [loading, setLoading] = useState(false)

  const handleConfirm = async () => {
    setLoading(true)
    try {
      await onConfirm()
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onCancel}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Delete</DialogTitle>
        </DialogHeader>
        <p>Are you sure you want to delete "{itemName}"? This action cannot be undone.</p>
        <DialogFooter>
          <Button variant="outline" onClick={onCancel} disabled={loading}>Cancel</Button>
          <Button variant="destructive" onClick={handleConfirm} disabled={loading}>
            {loading ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default function AdminPage() {
  const { 
    isAdmin, 
    loginAsAdmin, 
    users, 
    bookings, 
    reviews, 
    updateBookingStatus, 
    blockUser, 
    destinations, 
    tourPackages, 
    blogPosts,
    updateDestination,
    updatePackage,
    deletePackage,
    updateBlogPost,
    deleteBlogPost,
    updateUser,
    deleteUser
  } = useApp()
  
  const [activeTab, setActiveTab] = useState("dashboard")
  const [searchUsers, setSearchUsers] = useState("")
  
  // Edit dialog states
  const [editingDestination, setEditingDestination] = useState<Destination | null>(null)
  const [editingPackage, setEditingPackage] = useState<TourPackage | null>(null)
  const [editingBlogPost, setEditingBlogPost] = useState<BlogPost | null>(null)
  const [editingUser, setEditingUser] = useState<User | null>(null)
  
  // Delete dialog states
  const [deletingItem, setDeletingItem] = useState<{ type: string; id: string; name: string } | null>(null)

  // If not admin, show login
  if (!isAdmin) {
    return <AdminLogin onLogin={loginAsAdmin} />
  }

  // Calculate stats
  const totalRevenue = bookings?.filter((b: Booking) => b.status !== "cancelled").reduce((s: number, b: Booking) => s + b.totalPrice, 0) || 0
  const confirmedBookings = bookings?.filter((b: Booking) => b.status === "confirmed").length || 0
  const pendingBookings = bookings?.filter((b: Booking) => b.status === "pending").length || 0

  // Filter users
  const filteredUsers = users?.filter((u: User) =>
    u.name.toLowerCase().includes(searchUsers.toLowerCase()) ||
    u.email.toLowerCase().includes(searchUsers.toLowerCase())
  ) || []

  // Handlers for saving edits
  const handleSaveDestination = async (id: string, updates: Partial<Destination>) => {
    await updateDestination(id, updates)
    setEditingDestination(null)
  }

  const handleSavePackage = async (id: string, updates: Partial<TourPackage>) => {
    await updatePackage(id, updates)
    setEditingPackage(null)
  }

  const handleSaveBlogPost = async (id: string, updates: Partial<BlogPost>) => {
    await updateBlogPost(id, updates)
    setEditingBlogPost(null)
  }

  const handleSaveUser = async (id: string, updates: Partial<User>) => {
    await updateUser(id, updates)
    setEditingUser(null)
  }

  const handleDelete = async () => {
    if (!deletingItem) return
    
    try {
      if (deletingItem.type === "package") {
        await deletePackage(deletingItem.id)
      } else if (deletingItem.type === "blog") {
        await deleteBlogPost(deletingItem.id)
      } else if (deletingItem.type === "user") {
        await deleteUser(deletingItem.id)
      }
      setDeletingItem(null)
    } catch (error) {
      console.error('Error deleting item:', error)
    }
  }

  return (
<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      {/* Edit Dialogs */}
      {editingDestination && (
        <EditDestinationDialog
          destination={editingDestination}
          onSave={handleSaveDestination}
          onCancel={() => setEditingDestination(null)}
        />
      )}
      {editingPackage && (
        <EditPackageDialog
          pkg={editingPackage}
          destinations={destinations || []}
          onSave={handleSavePackage}
          onCancel={() => setEditingPackage(null)}
        />
      )}
      {editingBlogPost && (
        <EditBlogPostDialog
          post={editingBlogPost}
          onSave={handleSaveBlogPost}
          onCancel={() => setEditingBlogPost(null)}
        />
      )}
      {editingUser && (
        <EditUserDialog
          user={editingUser}
          onSave={handleSaveUser}
          onCancel={() => setEditingUser(null)}
        />
      )}
      {deletingItem && (
        <DeleteConfirmDialog
          title="Delete Item"
          itemName={deletingItem.name}
          open={true}
          onConfirm={handleDelete}
          onCancel={() => setDeletingItem(null)}
        />
      )}

      <div className="mb-8 flex items-center justify-between">
<div>
          <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">Admin Dashboard</h1>
          <p className="mt-1 text-muted-foreground">Manage destinations, packages, bookings, and users</p>
        </div>
        <Badge variant="secondary" className="text-sm">Admin Mode</Badge>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6 w-full justify-start overflow-x-auto">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="bookings">Bookings</TabsTrigger>
          <TabsTrigger value="destinations">Destinations</TabsTrigger>
          <TabsTrigger value="packages">Packages</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
        </TabsList>

        {/* Dashboard Tab */}
        <TabsContent value="dashboard">
          {/* Stats cards */}
<div className="grid gap-6 sm:gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
<CardContent className="p-6 sm:p-8">
                <p className="text-sm text-muted-foreground">Total Revenue</p>
                <p className="mt-1 text-2xl font-bold text-foreground">Rs. {totalRevenue.toLocaleString()}</p>
                <p className="mt-1 text-xs text-green-600">+12% from last month</p>
              </CardContent>
            </Card>
            <Card>
<CardContent className="p-6 sm:p-8">
                <p className="text-sm text-muted-foreground">Total Bookings</p>
                <p className="mt-1 text-2xl font-bold text-foreground">{bookings?.length || 0}</p>
                <p className="mt-1 text-xs text-muted-foreground">{confirmedBookings} confirmed, {pendingBookings} pending</p>
              </CardContent>
            </Card>
            <Card>
<CardContent className="p-6 sm:p-8">
                <p className="text-sm text-muted-foreground">Destinations</p>
                <p className="mt-1 text-2xl font-bold text-foreground">{destinations?.length || 0}</p>
                <p className="mt-1 text-xs text-muted-foreground">Across 5 categories</p>
              </CardContent>
            </Card>
            <Card>
<CardContent className="p-6 sm:p-8">
                <p className="text-sm text-muted-foreground">Registered Users</p>
                <p className="mt-1 text-2xl font-bold text-foreground">{users?.length || 0}</p>
                <p className="mt-1 text-xs text-muted-foreground">{reviews?.length || 0} reviews posted</p>
              </CardContent>
            </Card>
          </div>

          {/* Simple Stats Display (without charts) */}
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Popular Destinations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Goa</span>
                    <span className="font-semibold">42 bookings</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Manali</span>
                    <span className="font-semibold">35 bookings</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Jaipur</span>
                    <span className="font-semibold">28 bookings</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Kerala</span>
                    <span className="font-semibold">24 bookings</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Category Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Beach</span>
                    <span className="font-semibold">38%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Hill Station</span>
                    <span className="font-semibold">25%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Heritage</span>
                    <span className="font-semibold">22%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Wildlife</span>
                    <span className="font-semibold">15%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Bookings Tab */}
        <TabsContent value="bookings">
          <Card>
            <CardHeader>
              <CardTitle>All Bookings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Package</TableHead>
                      <TableHead>Travelers</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {!bookings || bookings.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center text-muted-foreground py-8">No bookings yet</TableCell>
                      </TableRow>
                    ) : bookings.map((booking: Booking) => {
                      const pkg = tourPackages?.find((p: TourPackage) => p.id === booking.packageId)
                      return (
                        <TableRow key={booking.id}>
                          <TableCell className="font-mono text-xs">{booking.id}</TableCell>
                          <TableCell className="font-medium">{pkg?.name || booking.packageId}</TableCell>
                          <TableCell>{booking.travelers}</TableCell>
                          <TableCell>{booking.date}</TableCell>
                          <TableCell>Rs. {booking.totalPrice.toLocaleString()}</TableCell>
                          <TableCell>
                            <Badge variant={booking.status === "confirmed" ? "default" : booking.status === "pending" ? "secondary" : "destructive"} className="capitalize">
                              {booking.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-1">
                              {booking.status === "pending" && (
                                <>
                                  <Button size="sm" variant="outline" className="h-7 bg-transparent text-xs" onClick={() => updateBookingStatus(booking.id, "confirmed")}>Approve</Button>
                                  <Button size="sm" variant="destructive" className="h-7 text-xs" onClick={() => updateBookingStatus(booking.id, "cancelled")}>Cancel</Button>
                                </>
                              )}
                              {booking.status === "confirmed" && (
                                <Button size="sm" variant="destructive" className="h-7 text-xs" onClick={() => updateBookingStatus(booking.id, "cancelled")}>Cancel</Button>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Destinations Tab */}
        <TabsContent value="destinations">
          <Card>
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle>Manage Destinations</CardTitle>
              <Badge variant="secondary">{destinations?.length || 0} destinations</Badge>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>State</TableHead>
                      <TableHead>Country</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Rating</TableHead>
                      <TableHead>Reviews</TableHead>
                      <TableHead>Best Time</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {!destinations || destinations.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={8} className="text-center text-muted-foreground py-8">No destinations found</TableCell>
                      </TableRow>
                    ) : destinations.map((dest: Destination) => (
                      <TableRow key={dest.id}>
                        <TableCell className="font-medium">{dest.name}</TableCell>
                        <TableCell>{dest.state}</TableCell>
                        <TableCell>{dest.country}</TableCell>
                        <TableCell><Badge variant="secondary" className="capitalize">{dest.category.replace("_", " ")}</Badge></TableCell>
                        <TableCell>{dest.rating}</TableCell>
                        <TableCell>{dest.reviewCount}</TableCell>
                        <TableCell className="text-xs">{dest.bestTimeToVisit}</TableCell>
                        <TableCell>
                          <Button size="sm" variant="outline" className="h-7 text-xs" onClick={() => setEditingDestination(dest)}>Edit</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Packages Tab */}
        <TabsContent value="packages">
          <Card>
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle>Manage Packages</CardTitle>
              <Badge variant="secondary">{tourPackages?.length || 0} packages</Badge>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Destination</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Original</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Featured</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {!tourPackages || tourPackages.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={8} className="text-center text-muted-foreground py-8">No packages found</TableCell>
                      </TableRow>
                    ) : tourPackages.map((pkg: TourPackage) => {
                      const dest = destinations?.find((d: Destination) => d.id === pkg.destinationId)
                      return (
                        <TableRow key={pkg.id}>
                          <TableCell className="font-medium">{pkg.name}</TableCell>
                          <TableCell>{dest?.name || 'Unknown'}</TableCell>
                          <TableCell>{pkg.duration}</TableCell>
                          <TableCell className="font-semibold">Rs. {pkg.price.toLocaleString()}</TableCell>
                          <TableCell className="text-muted-foreground line-through">Rs. {pkg.originalPrice.toLocaleString()}</TableCell>
                          <TableCell>
                            <Badge variant={pkg.active ? "default" : "secondary"}>{pkg.active ? "Active" : "Inactive"}</Badge>
                          </TableCell>
                          <TableCell>{pkg.featured ? <Badge className="bg-accent text-accent-foreground">Featured</Badge> : <span className="text-muted-foreground">-</span>}</TableCell>
                          <TableCell>
                            <div className="flex gap-1">
                              <Button size="sm" variant="outline" className="h-7 text-xs" onClick={() => setEditingPackage(pkg)}>Edit</Button>
                              <Button size="sm" variant="destructive" className="h-7 text-xs" onClick={() => setDeletingItem({ type: "package", id: pkg.id, name: pkg.name })}>Delete</Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Users Tab */}
        <TabsContent value="users">
          <Card>
            <CardHeader className="flex-row items-center justify-between gap-4">
              <CardTitle>Manage Users</CardTitle>
              <Input 
                placeholder="Search users..." 
                value={searchUsers} 
                onChange={(e) => setSearchUsers(e.target.value)} 
                className="max-w-xs" 
              />
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Personality</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center text-muted-foreground py-8">No users found</TableCell>
                      </TableRow>
                    ) : filteredUsers.map((user: User) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.phone || '-'}</TableCell>
                        <TableCell>
                          {user.travelPersonality ? 
                            <Badge variant="secondary" className="capitalize">{user.travelPersonality}</Badge> : 
                            <span className="text-muted-foreground">-</span>
                          }
                        </TableCell>
                        <TableCell>
                          <Badge variant={user.blocked ? "destructive" : "default"}>
                            {user.blocked ? "Blocked" : "Active"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button size="sm" variant="outline" className="h-7 text-xs" onClick={() => setEditingUser(user)}>Edit</Button>
                            <Button 
                              size="sm" 
                              variant={user.blocked ? "outline" : "destructive"} 
                              className={`h-7 text-xs ${user.blocked ? "bg-transparent" : ""}`} 
                              onClick={() => blockUser(user.id)}
                            >
                              {user.blocked ? "Unblock" : "Block"}
                            </Button>
                            <Button 
                              size="sm" 
                              variant="destructive" 
                              className="h-7 text-xs" 
                              onClick={() => setDeletingItem({ type: "user", id: user.id, name: user.name })}
                            >
                              Delete
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Content Tab */}
        <TabsContent value="content">
          <div className="flex flex-col gap-6">
            <Card>
              <CardHeader className="flex-row items-center justify-between">
                <CardTitle>Blog Posts</CardTitle>
                <Badge variant="secondary">{blogPosts?.length || 0} posts</Badge>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Author</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {!blogPosts || blogPosts.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center text-muted-foreground py-8">No blog posts found</TableCell>
                        </TableRow>
                      ) : blogPosts.map((post: BlogPost) => (
                        <TableRow key={post.id}>
                          <TableCell className="font-medium">{post.title}</TableCell>
                          <TableCell><Badge variant="secondary" className="capitalize">{post.category}</Badge></TableCell>
                          <TableCell>{post.author}</TableCell>
                          <TableCell>{post.date}</TableCell>
                          <TableCell>
                            <div className="flex gap-1">
                              <Button size="sm" variant="outline" className="h-7 text-xs" onClick={() => setEditingBlogPost(post)}>Edit</Button>
                              <Button 
                                size="sm" 
                                variant="destructive" 
                                className="h-7 text-xs" 
                                onClick={() => setDeletingItem({ type: "blog", id: post.id, name: post.title })}
                              >
                                Delete
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex-row items-center justify-between">
                <CardTitle>User Reviews</CardTitle>
                <Badge variant="secondary">{reviews?.length || 0} reviews</Badge>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>User</TableHead>
                        <TableHead>Target</TableHead>
                        <TableHead>Rating</TableHead>
                        <TableHead>Comment</TableHead>
                        <TableHead>Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {!reviews || reviews.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center text-muted-foreground py-8">No reviews found</TableCell>
                        </TableRow>
                      ) : reviews.map((rev: Review) => {
                        const target = rev.targetType === "destination"
                          ? destinations?.find((d: Destination) => d.id === rev.targetId)?.name
                          : tourPackages?.find((p: TourPackage) => p.id === rev.targetId)?.name
                        return (
                          <TableRow key={rev.id}>
                            <TableCell className="font-medium">{rev.userName}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Badge variant="secondary" className="capitalize text-xs">{rev.targetType}</Badge>
                                {target || 'Unknown'}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-0.5">
                                {Array.from({ length: 5 }).map((_, i) => (
                                  <svg key={i} width="12" height="12" viewBox="0 0 24 24" fill={i < rev.rating ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" className="text-accent">
                                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                  </svg>
                                ))}
                              </div>
                            </TableCell>
                            <TableCell className="max-w-[200px] truncate">{rev.comment}</TableCell>
                            <TableCell>{rev.date}</TableCell>
                          </TableRow>
                        )
                      })}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}