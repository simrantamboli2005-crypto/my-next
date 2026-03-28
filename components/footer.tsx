import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t border-border bg-foreground text-background">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center gap-2">
              <svg width="24" height="24" viewBox="0 0 28 28" fill="none" className="text-primary">
                <circle cx="14" cy="14" r="13" stroke="currentColor" strokeWidth="2" />
                <path d="M8 14C8 14 11 8 14 8C17 8 20 14 20 14C20 14 17 20 14 20C11 20 8 14 8 14Z" fill="currentColor" />
                <circle cx="14" cy="14" r="2" fill="hsl(var(--foreground))" />
              </svg>
              <span className="text-lg font-bold">
                Smart<span className="text-primary">Travels</span>
              </span>
            </Link>
            <p className="mt-3 text-sm leading-relaxed opacity-70">
              Your personalized travel companion. Discover destinations, plan trips, and create unforgettable memories with SmartTravels.
            </p>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider opacity-60">Explore</h3>
            <ul className="flex flex-col gap-2 text-sm">
              <li><Link href="/destinations" className="opacity-70 transition-opacity hover:opacity-100">Destinations</Link></li>
              <li><Link href="/packages" className="opacity-70 transition-opacity hover:opacity-100">Tour Packages</Link></li>
              <li><Link href="/quiz" className="opacity-70 transition-opacity hover:opacity-100">Travel Quiz</Link></li>
              <li><Link href="/offers" className="opacity-70 transition-opacity hover:opacity-100">Offers & Deals</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider opacity-60">Resources</h3>
            <ul className="flex flex-col gap-2 text-sm">
              <li><Link href="/blog" className="opacity-70 transition-opacity hover:opacity-100">Travel Blog</Link></li>
              <li><Link href="/contact" className="opacity-70 transition-opacity hover:opacity-100">Contact Us</Link></li>
              <li><Link href="/contact#faq" className="opacity-70 transition-opacity hover:opacity-100">FAQ</Link></li>
              <li><Link href="/expenses" className="opacity-70 transition-opacity hover:opacity-100">Expense Tracker</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider opacity-60">Contact</h3>
            <ul className="flex flex-col gap-2 text-sm opacity-70">
              <li>contact@smarttravels.com</li>
              <li>+91 98765 43210</li>
              <li>123 Travel Street, Mumbai, India</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-background/20 pt-6 md:flex-row">
          <p className="text-xs opacity-50">2026 SmartTravels. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/admin" className="text-xs opacity-50 transition-opacity hover:opacity-100">Admin</Link>
            <span className="text-xs opacity-30">|</span>
            <span className="text-xs opacity-50">Privacy Policy</span>
            <span className="text-xs opacity-30">|</span>
            <span className="text-xs opacity-50">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
