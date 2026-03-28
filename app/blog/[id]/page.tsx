"use client"

import { use } from "react"
import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { blogPosts } from "@/lib/data"

export default function BlogDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const post = blogPosts.find((p) => p.id === id)

  if (!post) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground">Post Not Found</h1>
          <Link href="/blog"><Button className="mt-4">Back to Blog</Button></Link>
        </div>
      </div>
    )
  }

  const otherPosts = blogPosts.filter((p) => p.id !== id).slice(0, 2)

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <Link href="/blog" className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5" /><path d="M12 19l-7-7 7-7" /></svg>
        Back to Blog
      </Link>

      <article>
        <Badge className="capitalize">{post.category}</Badge>
        <h1 className="mt-3 font-serif text-3xl font-bold leading-tight text-foreground md:text-4xl">
          <span className="text-balance">{post.title}</span>
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          By {post.author} &middot; {new Date(post.date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
        </p>

        <div className="relative mt-6 aspect-[16/9] overflow-hidden rounded-lg">
          <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
        </div>

        <div className="mt-8 text-base leading-relaxed text-foreground/90 whitespace-pre-line">
          {post.content}
        </div>
      </article>

      {/* Related posts */}
      {otherPosts.length > 0 && (
        <div className="mt-16">
          <h2 className="font-serif text-2xl font-bold text-foreground">More Articles</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {otherPosts.map((p) => (
              <Link key={p.id} href={`/blog/${p.id}`}>
                <Card className="group h-full overflow-hidden border-0 shadow-sm transition-shadow hover:shadow-md">
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Image src={p.image || "/placeholder.svg"} alt={p.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-foreground">{p.title}</h3>
                    <p className="mt-1 text-xs text-muted-foreground">By {p.author}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
