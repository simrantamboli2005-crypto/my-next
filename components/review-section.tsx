"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useApp } from "@/lib/store"

export function ReviewSection({ targetId, targetType }: { targetId: string; targetType: "destination" | "package" }) {
  const { reviews, currentUser, addReview } = useApp()
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState("")
  const [hoveredStar, setHoveredStar] = useState(0)

  const targetReviews = reviews.filter((r) => r.targetId === targetId && r.targetType === targetType)

  const handleSubmit = () => {
    if (!currentUser || !comment.trim()) return
    addReview({
      userId: currentUser.id,
      userName: currentUser.name,
      targetId,
      targetType,
      rating,
      comment: comment.trim(),
    })
    setComment("")
    setRating(5)
  }

  return (
    <div>
      <h2 className="text-xl font-semibold text-foreground">Reviews & Ratings</h2>

      {currentUser && (
        <div className="mt-4 rounded-lg border border-border p-4">
          <p className="mb-2 text-sm font-medium text-foreground">Write a Review</p>
          <div className="mb-3 flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoveredStar(star)}
                onMouseLeave={() => setHoveredStar(0)}
                className="p-0.5"
                aria-label={`Rate ${star} stars`}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill={star <= (hoveredStar || rating) ? "currentColor" : "none"}
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-accent"
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              </button>
            ))}
            <span className="ml-2 text-sm text-muted-foreground">{rating}/5</span>
          </div>
          <Textarea
            placeholder="Share your experience..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="mb-3"
            rows={3}
          />
          <Button onClick={handleSubmit} disabled={!comment.trim()} size="sm">
            Submit Review
          </Button>
        </div>
      )}

      <div className="mt-6 flex flex-col gap-4">
        {targetReviews.length === 0 ? (
          <p className="text-sm text-muted-foreground">No reviews yet. Be the first to review!</p>
        ) : (
          targetReviews.map((review) => (
            <div key={review.id} className="rounded-lg border border-border p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-medium text-primary-foreground">
                    {review.userName.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{review.userName}</p>
                    <p className="text-xs text-muted-foreground">{new Date(review.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</p>
                  </div>
                </div>
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <svg key={s} width="14" height="14" viewBox="0 0 24 24" fill={s <= review.rating ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" className="text-accent">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{review.comment}</p>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
