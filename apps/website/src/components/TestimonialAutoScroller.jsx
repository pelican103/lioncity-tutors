'use client';
import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import AutoScroll from 'embla-carousel-auto-scroll';
import { NextButton, PrevButton, usePrevNextButtons } from './EmblaCarouselArrowButtons';
import { Quote, Star } from 'lucide-react';

// The TestimonialCard component (no changes needed here)
const TestimonialCard = ({ t }) => (
    <article className="bg-background-card p-6 rounded-2xl shadow-lg border border-border flex flex-col h-full">
      <div className="flex items-center gap-2 mb-3">
        {[...Array(5)].map((_, i) => (<Star key={i} className="w-5 h-5 text-rating fill-current" />))}
      </div>
      <div className="flex-grow">
        <p className="text-text-default text-base leading-relaxed relative">
          <Quote className="w-8 h-8 text-border absolute -top-2 -left-3" />
          <span className="relative z-10">{t.text}</span>
        </p>
      </div>
      <div className="mt-4 flex items-center gap-4 pt-4 border-t border-border">
        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-lg">{t.initials}</div>
        <div>
          <h4 className="font-semibold text-text-default">{t.name}</h4>
          <div className="text-sm text-text-default/70">{t.relation} • {t.location}</div>
        </div>
      </div>
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