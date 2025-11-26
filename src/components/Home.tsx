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
   const autoplayPlugin = Autoplay({ delay: 2000, stopOnInteraction: false });

  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <section>
        <h1 className=' '>Dive into the world of anonymous Conversations</h1>
        <p>Explore Mystery Messages - when your identity remains a secret</p>
      </section>
 
      <Carousel
        className="w-full max-w-xs"
         plugins={[autoplayPlugin]}
      >
        <CarouselContent>
 
          {messages.map((val, index) => (
            <CarouselItem key={index}>
              <div className="p-1">
                <Card>
                  <CardHeader>
                     {val.title}
                  </CardHeader>
                  <CardContent className="flex aspect-square flex-col items-center justify-center p-6 text-center">
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