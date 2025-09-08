import React from 'react';
import { Star, Award, Clock, Shield } from 'lucide-react';

export default function ReviewStrip() {
  return (
    <section className="bg-primary">
      <div className="max-w-6xl mx-auto px-4 py-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-4 items-center">

        <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-3 text-center sm:text-left gap-y-4">
          
          <div className="flex justify-center sm:justify-start items-center gap-3">
            <Award className="w-6 h-6 text-text-inverse flex-shrink-0" />
            <div>
              <p className="font-bold text-text-inverse">Expert Tutors</p>
              <p className="text-sm text-text-inverse/80">MOE-trained & top uni grads</p>
            </div>
          </div>
          
          <div className="flex justify-center sm:justify-start items-center gap-3">
            <Clock className="w-6 h-6 text-text-inverse flex-shrink-0" />
            <div>
              <p className="font-bold text-text-inverse">Fast Matching</p>
              <p className="text-sm text-text-inverse/80">Profiles sent in 24 hours</p>
            </div>
          </div>

          <div className="flex justify-center sm:justify-start items-center gap-3">
            <Shield className="w-6 h-6 text-text-inverse flex-shrink-0" />
            <div>
              <p className="font-bold text-text-inverse">Zero Agency Fees</p>
              <p className="text-sm text-text-inverse/80">100% free for parents, always</p>
            </div>
          </div>
        </div>

        <a 
          href="https://search.google.com/local/reviews?placeid=ChIJz5sczNYR2jERc_4Ka3tDwyY" 
          target="_blank" 
          rel="noreferrer"
          className="flex items-center gap-2 group justify-center lg:justify-end hover:opacity-80 transition-opacity"
        >
          <div className="flex items-center">
            <Star className="w-5 h-5 text-rating fill-current" />
            <Star className="w-5 h-5 text-rating fill-current" />
            <Star className="w-5 h-5 text-rating fill-current" />
            <Star className="w-5 h-5 text-rating fill-current" />
            <Star className="w-5 h-5 text-rating fill-current opacity-50" />
          </div>
          <div className="font-semibold text-text-inverse">
            4.8/5 Google Rating
          </div>
        </a>

      </div>
    </section>
  );
}