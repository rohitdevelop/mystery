"use client"
import React from 'react'
import { Card, CardContent, CardHeader } from "@/src/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/src/components/ui/carousel"
import Autoplay from 'embla-carousel-autoplay'
import messages from '@/message.json'

const Home = () => {
  // Initialize the Autoplay plugin outside of the JSX for clarity
  const autoplayPlugin = Autoplay({ delay: 2000, stopOnInteraction: false });

  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <section>
        <h1 className=' '>Dive into the world of anonymous Conversations</h1>
        <p>Explore Mystery Messages - when your identity remains a secret</p>
      </section>

      {/* FIX: The 'plugins' prop must be passed as an attribute to the Carousel component.
        It was incorrectly placed inside the component's body.
      */}
      <Carousel
        className="w-full max-w-xs"
        // Correctly pass the plugins array as a prop:
        plugins={[autoplayPlugin]}
      >
        <CarouselContent>
          {/*
            NOTE: Your messages.map still uses 'val.author' and 'val.price' 
            from a previous example. Ensure your message.json uses 
            the correct keys like 'content', 'received', and 'title'.
            I've kept the original keys for now, but you might need to adjust them.
          */}
          {messages.map((val, index) => (
            <CarouselItem key={index}>
              <div className="p-1">
                <Card>
                  <CardHeader>
                    {/* Assuming the message title is stored here */}
                    {val.title}
                  </CardHeader>
                  <CardContent className="flex aspect-square flex-col items-center justify-center p-6 text-center">
                    {/* Placeholder content from your previous request */}
                    <span className="text-xl font-medium mb-2">{val.author || 'Anonymous'}</span>
                    <span className="text-4xl font-semibold">{val.price || val.content}</span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </main>
  )
}

export default Home