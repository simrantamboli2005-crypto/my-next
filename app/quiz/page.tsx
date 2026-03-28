"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { quizQuestions, personalityTypes, destinations } from "@/lib/data"
import { useApp } from "@/lib/store"

export default function QuizPage() {
  const { currentUser, setTravelPersonality } = useApp()
  const [currentQ, setCurrentQ] = useState(0)
  const [answers, setAnswers] = useState<string[]>([])
  const [result, setResult] = useState<string | null>(currentUser?.travelPersonality || null)
  const [started, setStarted] = useState(false)

  const handleAnswer = (value: string) => {
    const newAnswers = [...answers, value]
    setAnswers(newAnswers)

    if (currentQ < quizQuestions.length - 1) {
      setCurrentQ(currentQ + 1)
    } else {
      // Calculate result
      const counts: Record<string, number> = {}
      for (const a of newAnswers) {
        counts[a] = (counts[a] || 0) + 1
      }
      const top = Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0]
      setResult(top)
      if (currentUser) {
        setTravelPersonality(top)
      }
    }
  }

  const restart = () => {
    setCurrentQ(0)
    setAnswers([])
    setResult(null)
    setStarted(false)
  }

  const personality = result ? personalityTypes[result] : null
  const recommendedDests = personality
    ? personality.recommendedDestinations.map((id) => destinations.find((d) => d.id === id)).filter(Boolean)
    : []

  if (result && personality) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <Badge className="mb-4 bg-primary text-primary-foreground px-4 py-1 text-sm">Your Travel Personality</Badge>
        <h1 className="font-serif text-4xl font-bold text-foreground md:text-5xl">{personality.name}</h1>
        <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-muted-foreground">{personality.description}</p>

        <div className="mt-12">
          <h2 className="mb-6 text-xl font-semibold text-foreground">Recommended Destinations for You</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {recommendedDests.map((dest) =>
              dest ? (
                <Link key={dest.id} href={`/destinations/${dest.id}`}>
                  <Card className="group overflow-hidden border-0 shadow-sm transition-shadow hover:shadow-md">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image src={dest.image || "/placeholder.svg"} alt={dest.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-foreground">{dest.name}</h3>
                      <p className="text-sm text-muted-foreground">{dest.state}</p>
                    </CardContent>
                  </Card>
                </Link>
              ) : null,
            )}
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Button onClick={restart} variant="outline">Retake Quiz</Button>
          <Link href="/packages"><Button>Browse Packages</Button></Link>
        </div>
      </div>
    )
  }

  if (!started) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <Badge className="mb-4 bg-primary/10 text-primary px-4 py-1 text-sm">Unique Feature</Badge>
        <h1 className="font-serif text-4xl font-bold text-foreground md:text-5xl">
          <span className="text-balance">Travel Personality Quiz</span>
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-muted-foreground">
          Answer {quizQuestions.length} simple questions and discover what kind of traveler you are.
          Get personalized destination recommendations tailored just for you!
        </p>
        <div className="mx-auto mt-8 grid max-w-md gap-3 text-left">
          {Object.values(personalityTypes).map((p) => (
            <div key={p.name} className="flex items-center gap-3 rounded-lg border border-border p-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold">
                {p.name.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{p.name}</p>
                <p className="text-xs text-muted-foreground line-clamp-1">{p.description}</p>
              </div>
            </div>
          ))}
        </div>
        <Button size="lg" className="mt-8" onClick={() => setStarted(true)}>
          Start the Quiz
        </Button>
        {!currentUser && (
          <p className="mt-3 text-sm text-muted-foreground">
            <Link href="/login" className="text-primary hover:underline">Login</Link> to save your results!
          </p>
        )}
      </div>
    )
  }

  const question = quizQuestions[currentQ]
  const progress = ((currentQ) / quizQuestions.length) * 100

  return (
    <div className="mx-auto max-w-2xl px-4 py-16">
      <div className="mb-8">
        <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
          <span>Question {currentQ + 1} of {quizQuestions.length}</span>
          <span>{Math.round(progress)}% complete</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <h2 className="text-2xl font-semibold text-foreground md:text-3xl">{question.question}</h2>

      <div className="mt-8 flex flex-col gap-3">
        {question.options.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => handleAnswer(option.value)}
            className="group rounded-lg border-2 border-border p-5 text-left transition-all hover:border-primary hover:bg-primary/5"
          >
            <p className="text-base font-medium text-foreground group-hover:text-primary">{option.text}</p>
          </button>
        ))}
      </div>
    </div>
  )
}
