'use client';
import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import AutoScroll from 'embla-carousel-auto-scroll';
import { NextButton, PrevButton, usePrevNextButtons } from './EmblaCarouselArrowButtons';
import { Quote, Star } from 'lucide-react';

// Enhanced TestimonialCard with premium styling
const TestimonialCard = ({ t }) => (
    <article className="group bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl border border-border/50 flex flex-col h-full transition-all duration-500 hover:-translate-y-2 relative overflow-hidden">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative z-10">
        <div className="flex items-center gap-1 mb-4">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-5 h-5 text-rating fill-current drop-shadow-sm" />
          ))}
        </div>
        
        <div className="flex-grow mb-6">
          <p className="testimonial-text text-text-default text-lg leading-relaxed relative">
            <Quote className="w-10 h-10 text-primary/20 absolute -top-3 -left-4" />
            <span className="relative z-10 italic">{t.text}</span>
          </p>
        </div>
        
        <div className="flex items-center gap-4 pt-6 border-t border-border/50">
          <div className="w-14 h-14 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center text-primary font-bold text-xl shadow-md group-hover:scale-110 transition-transform duration-300">
            {t.initials}
          </div>
          <div>
            <h4 className="font-semibold text-text-default text-lg">{t.name}</h4>
            <div className="text-sm text-text-default/70 mt-1">{t.relation}</div>
            <div className="text-xs text-primary/70 mt-0.5 flex items-center gap-1">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              {t.location}
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-primary to-accent group-hover:w-full transition-all duration-700" />
    </article>
);


export default function TestimonialAutoScroller({ testimonials }) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true }, 
    [AutoScroll({ speed: 1, playOnInit: true, stopOnInteraction: false, stopOnMouseEnter: true })]
  );
  const [isPlaying, setIsPlaying] = useState(true);

  // --- ADD THIS useEffect HOOK ---
  // This hook will run once the emblaApi is available
  useEffect(() => {
    if (emblaApi) {
      // Re-initialize Embla to ensure it has the correct dimensions
      emblaApi.reInit();
    }
  }, [emblaApi]); // The dependency array ensures this runs when emblaApi is ready

  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } = usePrevNextButtons(emblaApi);

  const onButtonAutoplayClick = useCallback((callback) => {
      const autoScroll = emblaApi?.plugins()?.autoScroll;
      if (!autoScroll) return;
      const resetOrStop = autoScroll.options.stopOnInteraction === false ? autoScroll.reset : autoScroll.stop;
      resetOrStop();
      callback();
    }, [emblaApi]);

  const toggleAutoplay = useCallback(() => {
    const autoScroll = emblaApi?.plugins()?.autoScroll;
    if (!autoScroll) return;
    const playOrStop = autoScroll.isPlaying() ? autoScroll.stop : autoScroll.play;
    playOrStop();
  }, [emblaApi]);

  useEffect(() => {
    const autoScroll = emblaApi?.plugins()?.autoScroll;
    if (!autoScroll) return;
    setIsPlaying(autoScroll.isPlaying());
    emblaApi
      .on('autoScroll:play', () => setIsPlaying(true))
      .on('autoScroll:stop', () => setIsPlaying(false))
      .on('reInit', () => setIsPlaying(autoScroll.isPlaying()));
  }, [emblaApi]);

  return (
    <div className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {testimonials.map((testimonial, index) => (
            <div className="embla__slide" key={index}>
              <TestimonialCard t={testimonial} />
            </div>
          ))}
        </div>
      </div>

      <div className="embla__controls">
        <div className="embla__buttons">
          <PrevButton
            onClick={() => onButtonAutoplayClick(onPrevButtonClick)}
            disabled={prevBtnDisabled}
          />
          <NextButton
            onClick={() => onButtonAutoplayClick(onNextButtonClick)}
            disabled={nextBtnDisabled}
          />
        </div>
        <button className="embla__play" onClick={toggleAutoplay} type="button">
          {isPlaying ? 'Stop' : 'Start'}
        </button>
      </div>
    </div>
  );
}