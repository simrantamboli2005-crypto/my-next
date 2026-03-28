"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { destinations, tourPackages, offers, blogPosts } from "@/lib/data"

const categories = [
{ key: "beach", label: "Beaches", image: "/images/dest-goa.jpg" },
  { key: "hill_station", label: "Hill Stations", image: "/images/dest-mountain.jpg" },
  { key: "heritage", label: "Heritage", image: "/images/dest-heritage.jpg" },
  { key: "wildlife", label: "Wildlife", image: "/images/dest-wildlife.jpg" },
  { key: "city", label: "Cities", image: "/images/dest-city.jpg" },
]

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill={star <= Math.round(rating) ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="2"
          className="text-accent"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
      <span className="ml-1 text-sm text-muted-foreground">{rating}</span>
    </div>
  )
}

export default function HomePage() {
  const featuredPackages = tourPackages.filter((p) => p.featured).slice(0, 3)
  const topDestinations = destinations.slice(0, 4)

  return (
    <div>
      {/* Hero Section */}
      <section className="relative flex min-h-[85vh] items-center justify-center overflow-hidden">
        <Image
src="/images/hero-travel-new.jpg"
          alt="Breathtaking tropical coastline"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-foreground/50" />
        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
          <Badge variant="secondary" className="mb-4 bg-primary/20 text-primary-foreground backdrop-blur-sm">
            Personalized Travel Planning
          </Badge>
          <h1 className="font-serif text-4xl font-bold leading-tight tracking-tight text-background md:text-6xl lg:text-7xl">
            <span className="text-balance">Discover Your Perfect Journey</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-background/80 md:text-xl">
            Smart recommendations, personalized itineraries, and seamless booking.
            Your dream trip starts here.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link href="/quiz">
              <Button size="lg" className="text-base">
                Take Travel Quiz
              </Button>
            </Link>
            <Link href="/destinations">
              <Button size="lg" variant="outline" className="border-background/30 bg-transparent text-base text-background hover:bg-background/10 hover:text-background">
                Explore Destinations
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="mx-auto max-w-7xl px-4 py-16 md:py-24">
        <div className="mb-10 text-center">
          <h2 className="font-serif text-3xl font-bold text-foreground md:text-4xl">
            <span className="text-balance">Browse by Category</span>
          </h2>
          <p className="mt-2 text-muted-foreground">Find destinations that match your travel style</p>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
          {categories.map((cat) => (
            <Link key={cat.key} href={`/destinations?category=${cat.key}`}>
              <div className="group relative aspect-[3/4] overflow-hidden rounded-lg">
                <Image
                  src={cat.image || "/placeholder.svg"}
                  alt={cat.label}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-foreground/40 transition-colors group-hover:bg-foreground/50" />
                <div className="absolute inset-0 flex items-end p-4">
                  <span className="text-lg font-semibold text-background">{cat.label}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="bg-secondary/50 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <h2 className="font-serif text-3xl font-bold text-foreground md:text-4xl">
                Popular Destinations
              </h2>
              <p className="mt-2 text-muted-foreground">Handpicked places loved by travelers</p>
            </div>
            <Link href="/destinations" className="hidden md:block">
              <Button variant="outline">View All</Button>
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {topDestinations.map((dest) => (
              <Link key={dest.id} href={`/destinations/${dest.id}`}>
                <Card className="group overflow-hidden border-0 shadow-sm transition-shadow hover:shadow-md">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={dest.image || "/placeholder.svg"}
                      alt={dest.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <Badge className="absolute right-3 top-3 bg-background/90 text-foreground backdrop-blur-sm">
                      {dest.category.replace("_", " ")}
                    </Badge>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="text-lg font-semibold text-foreground">{dest.name}</h3>
                    <p className="text-sm text-muted-foreground">{dest.state}, {dest.country}</p>
                    <div className="mt-2 flex items-center justify-between">
                      <StarRating rating={dest.rating} />
                      <span className="text-xs text-muted-foreground">{dest.reviewCount} reviews</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          <div className="mt-6 text-center md:hidden">
            <Link href="/destinations">
              <Button variant="outline">View All Destinations</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Packages */}
      <section className="mx-auto max-w-7xl px-4 py-16 md:py-24">
        <div className="mb-10 text-center">
          <h2 className="font-serif text-3xl font-bold text-foreground md:text-4xl">
            <span className="text-balance">Featured Tour Packages</span>
          </h2>
          <p className="mt-2 text-muted-foreground">Curated experiences at unbeatable prices</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredPackages.map((pkg) => {
            const dest = destinations.find((d) => d.id === pkg.destinationId)
            return (
              <Link key={pkg.id} href={`/packages/${pkg.id}`}>
                <Card className="group overflow-hidden border-0 shadow-sm transition-shadow hover:shadow-md">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image src={pkg.image || "/placeholder.svg"} alt={pkg.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute left-3 top-3 flex gap-2">
                      <Badge className="bg-accent text-accent-foreground">{Math.round(((pkg.originalPrice - pkg.price) / pkg.originalPrice) * 100)}% OFF</Badge>
                    </div>
                  </div>
                  <CardContent className="p-5">
                    <h3 className="text-lg font-semibold text-foreground">{pkg.name}</h3>
                    <p className="text-sm text-muted-foreground">{dest?.name} &middot; {pkg.duration}</p>
                    <div className="mt-3 flex items-end justify-between">
                      <div>
                        <span className="text-sm text-muted-foreground line-through">Rs. {pkg.originalPrice.toLocaleString()}</span>
                        <p className="text-xl font-bold text-primary">Rs. {pkg.price.toLocaleString()}</p>
                        <span className="text-xs text-muted-foreground">per person</span>
                      </div>
                      <StarRating rating={pkg.rating} />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
        <div className="mt-8 text-center">
          <Link href="/packages">
            <Button variant="outline" size="lg">Browse All Packages</Button>
          </Link>
        </div>
      </section>

      {/* Travel Quiz CTA */}
      <section className="relative overflow-hidden bg-primary py-16 md:py-24">
        <div className="absolute inset-0 opacity-10">
          <svg viewBox="0 0 400 400" className="h-full w-full">
            <circle cx="200" cy="200" r="180" stroke="currentColor" strokeWidth="1" fill="none" className="text-primary-foreground" />
            <circle cx="200" cy="200" r="120" stroke="currentColor" strokeWidth="1" fill="none" className="text-primary-foreground" />
            <circle cx="200" cy="200" r="60" stroke="currentColor" strokeWidth="1" fill="none" className="text-primary-foreground" />
          </svg>
        </div>
        <div className="relative z-10 mx-auto max-w-3xl px-4 text-center">
          <h2 className="font-serif text-3xl font-bold text-primary-foreground md:text-4xl">
            <span className="text-balance">Discover Your Travel Personality</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-primary-foreground/80">
            Take our unique psychology-based quiz to find out what kind of traveler you are.
            Get personalized destination recommendations based on your results!
          </p>
          <Link href="/quiz">
            <Button size="lg" variant="secondary" className="mt-8 text-base">
              Start the Quiz
            </Button>
          </Link>
        </div>
      </section>

      {/* Current Offers */}
      <section className="mx-auto max-w-7xl px-4 py-16 md:py-24">
        <div className="mb-10 text-center">
          <h2 className="font-serif text-3xl font-bold text-foreground md:text-4xl">
            Seasonal Offers & Deals
          </h2>
          <p className="mt-2 text-muted-foreground">Limited-time discounts you do not want to miss</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {offers.map((offer) => (
            <Card key={offer.id} className="border-2 border-dashed border-accent/30 bg-accent/5">
              <CardContent className="flex flex-col items-center p-6 text-center">
                <Badge className="bg-accent text-accent-foreground text-lg px-4 py-1">{offer.discount}% OFF</Badge>
                <h3 className="mt-3 text-lg font-semibold text-foreground">{offer.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{offer.description}</p>
                <p className="mt-3 rounded-md bg-muted px-4 py-1.5 font-mono text-sm font-semibold tracking-wider text-foreground">
                  {offer.code}
                </p>
                <p className="mt-2 text-xs text-muted-foreground">Valid until {new Date(offer.validUntil).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Blog Preview */}
      <section className="bg-secondary/50 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <h2 className="font-serif text-3xl font-bold text-foreground md:text-4xl">Travel Blog & Guides</h2>
              <p className="mt-2 text-muted-foreground">Tips, insights, and inspiration for your next trip</p>
            </div>
            <Link href="/blog" className="hidden md:block">
              <Button variant="outline">Read All</Button>
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {blogPosts.map((post) => (
              <Link key={post.id} href={`/blog/${post.id}`}>
                <Card className="group overflow-hidden border-0 shadow-sm transition-shadow hover:shadow-md h-full">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                    <Badge className="absolute right-3 top-3 bg-background/90 text-foreground backdrop-blur-sm capitalize">{post.category}</Badge>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="line-clamp-2 text-base font-semibold text-foreground">{post.title}</h3>
                    <p className="mt-1 text-xs text-muted-foreground">By {post.author} &middot; {new Date(post.date).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="mx-auto max-w-7xl px-4 py-16 md:py-24">
        <div className="grid grid-cols-2 gap-8 text-center md:grid-cols-4">
          {[
            { value: "50+", label: "Destinations" },
            { value: "200+", label: "Tour Packages" },
            { value: "10K+", label: "Happy Travelers" },
            { value: "4.8", label: "Average Rating" },
          ].map((stat) => (
            <div key={stat.label}
             className="border rounded-lg p-6" // <-- outline added here
            >
              <p className="font-serif text-4xl font-bold text-primary md:text-5xl">{stat.value}</p>
              <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
