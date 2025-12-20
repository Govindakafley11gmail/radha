'use client';

import * as React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Slide {
  icon: React.ReactNode;
  title: string;
  description: string;
  number: string;
}

const slides: Slide[] = [
  {
    icon: (
      <svg
        className="w-8 h-8"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M9.5 12a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z" />
        <path d="M14.5 6.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z" />
        <path d="M14.5 17.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z" />
        <path d="M19.5 12a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z" />
      </svg>
    ),
    title: 'Innovation & Digital Transformation',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Cras vehicula magna eget lectus varius, at finibus massa condimentum.',
    number: '04',
  },
  {
    icon: (
      <svg
        className="w-8 h-8"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: 'Talent Management Strategy',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Cras vehicula magna eget lectus varius, at finibus massa condimentum.',
    number: '05',
  },
  {
    icon: (
      <svg
        className="w-8 h-8"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M3 3h18v18H3z" />
        <path d="M21 9H3" />
        <path d="M21 15H3" />
        <path d="M9 3v18" />
        <path d="M15 3v18" />
      </svg>
    ),
    title: 'Financial Strategy Development',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Cras vehicula magna eget lectus varius, at finibus massa condimentum.',
    number: '01',
  },
  // Add more slides if needed
];

export default function ServicesCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'start',
    slidesToScroll: 1,
    breakpoints: {
      '(min-width: 768px)': { slidesToScroll: 2 },
      '(min-width: 1024px)': { slidesToScroll: 3 },
    },
  });

  const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
  const scrollNext = () => emblaApi && emblaApi.scrollNext();

  React.useEffect(() => {
    if (emblaApi) {
      // Optional: sync button states, etc.
    }
  }, [emblaApi]);

  return (
    <div className="relative max-w-7xl mx-auto px-4 py-12">
      {/* Embla container */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-8">
          {slides.map((slide, index) => (
            <div
              key={index}
              className="flex-none w-full md:w-1/2 lg:w-1/3 p-2" // Add padding for shadow
            >
              {/* Shadow wrapper */}
              <div className="shadow-lg hover:shadow-xl transition-shadow rounded-2xl">
                <Card className="h-full bg-white border-0 rounded-2xl overflow-hidden">
                  <CardContent className="p-8 flex flex-col items-center text-center">
                    <div className="mb-6 w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center text-white">
                      {slide.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      {slide.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-8">
                      {slide.description}
                    </p>
                    <div className="mt-auto">
                      <div className="w-16 h-px bg-orange-500 mx-auto"></div>
                      <span className="block text-2xl font-bold text-orange-500 mt-2">
                        {slide.number}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-end mt-8 gap-4">
        <Button
          onClick={scrollPrev}
          size="icon"
          variant="outline"
          className="rounded-full border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <Button
          onClick={scrollNext}
          size="icon"
          variant="outline"
          className="rounded-full border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
