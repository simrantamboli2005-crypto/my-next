"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { blogPosts } from "@/lib/data"

const categories = [
  { key: "all", label: "All" },
  { key: "tips", label: "Travel Tips" },
  { key: "safety", label: "Safety" },
  { key: "packing", label: "Packing" },
  { key: "culture", label: "Culture" },
]

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("all")

  const filtered = activeCategory === "all"
    ? blogPosts
    : blogPosts.filter((p) => p.category === activeCategory)

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-bold text-foreground md:text-4xl">Travel Blog & Guides</h1>
        <p className="mt-2 text-muted-foreground">Tips, insights, and inspiration for your next trip</p>
      </div>

      {/* Category filter */}
      <div className="mb-8 flex flex-wrap gap-2">
        {categories.map((cat) => (
          <Button
            key={cat.key}
            variant={activeCategory === cat.key ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveCategory(cat.key)}
            className={activeCategory !== cat.key ? "bg-transparent" : ""}
          >
            {cat.label}
          </Button>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {filtered.map((post) => (
          <Link key={post.id} href={`/blog/${post.id}`}>
            <Card className="group h-full overflow-hidden border-0 shadow-sm transition-shadow hover:shadow-md">
              <div className="relative aspect-[16/9] overflow-hidden">
                <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                <Badge className="absolute right-3 top-3 bg-background/90 text-foreground capitalize backdrop-blur-sm">{post.category}</Badge>
              </div>
              <CardContent className="p-5">
                <h2 className="text-xl font-semibold text-foreground">{post.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground line-clamp-2">{post.excerpt}</p>
                <div className="mt-4 flex items-center justify-between">
                  <p className="text-xs text-muted-foreground">
                    By {post.author} &middot; {new Date(post.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                  </p>
                  <span className="text-sm font-medium text-primary">Read More</span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
