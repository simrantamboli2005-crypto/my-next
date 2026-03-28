"use client"

import React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { faqs } from "@/lib/data"

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim() || !email.trim() || !message.trim()) return
    setSubmitted(true)
    setName("")
    setEmail("")
    setSubject("")
    setMessage("")
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <div className="mb-10 text-center">
        <h1 className="font-serif text-3xl font-bold text-foreground md:text-4xl">Contact Us</h1>
        <p className="mt-2 text-muted-foreground">Have a question or need help? We are here for you.</p>
      </div>

      <div className="grid gap-10 lg:grid-cols-2">
        {/* Contact Form */}
        <div>
          <Card>
            <CardContent className="p-6">
              {submitted ? (
                <div className="py-10 text-center">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mx-auto text-primary">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                  <h2 className="mt-4 text-xl font-bold text-foreground">Message Sent!</h2>
                  <p className="mt-2 text-muted-foreground">Thank you for reaching out. We will get back to you within 24 hours.</p>
                  <Button className="mt-6" onClick={() => setSubmitted(false)}>Send Another Message</Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} className="mt-1.5" required />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" placeholder="you@email.com" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1.5" required />
                  </div>
                  <div>
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" placeholder="How can we help?" value={subject} onChange={(e) => setSubject(e.target.value)} className="mt-1.5" />
                  </div>
                  <div>
                    <Label htmlFor="message">Message</Label>
                    <Textarea id="message" placeholder="Tell us more about your query..." value={message} onChange={(e) => setMessage(e.target.value)} rows={5} className="mt-1.5" required />
                  </div>
                  <Button type="submit" className="w-full">Send Message</Button>
                </form>
              )}
            </CardContent>
          </Card>

          {/* Contact info */}
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <Card>
              <CardContent className="flex flex-col items-center p-4 text-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                <p className="mt-2 text-xs text-muted-foreground">Email</p>
                <p className="text-sm font-medium text-foreground">contact@smarttravels.com</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex flex-col items-center p-4 text-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <p className="mt-2 text-xs text-muted-foreground">Phone</p>
                <p className="text-sm font-medium text-foreground">+91 98765 43210</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex flex-col items-center p-4 text-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <p className="mt-2 text-xs text-muted-foreground">Address</p>
                <p className="text-sm font-medium text-foreground">Mumbai, India</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <div id="faq">
          <h2 className="font-serif text-2xl font-bold text-foreground">Frequently Asked Questions</h2>
          <p className="mt-2 text-sm text-muted-foreground">Find quick answers to common queries</p>
          <Accordion type="single" collapsible className="mt-6">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`}>
                <AccordionTrigger className="text-left text-foreground">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  )
}
