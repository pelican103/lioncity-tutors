import React from 'react';
import { Star, Award, Clock, Shield } from 'lucide-react';

// This version is perfect for a new agency, focusing on core promises instead of media features.
export default function TrustBar() {
  return (
    <section className="bg-slate-50 border-y border-slate-200">
      <div className="max-w-6xl mx-auto px-4 py-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-4 items-center">

        {/* The Three Core Promises */}
        <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-3 text-center sm:text-left gap-y-4">
          <div className="flex justify-center sm:justify-start items-center gap-3">
            <Award className="w-6 h-6 text-blue-600 flex-shrink-0" />
            <div>
              <p className="font-bold text-slate-800">Expert Tutors</p>
              <p className="text-sm text-slate-600">MOE-trained & top uni grads</p>
            </div>
          </div>
          
          <div className="flex justify-center sm:justify-start items-center gap-3">
            <Clock className="w-6 h-6 text-blue-600 flex-shrink-0" />
            <div>
              <p className="font-bold text-slate-800">Fast Matching</p>
              <p className="text-sm text-slate-600">Profiles sent in 24 hours</p>
            </div>
          </div>

          <div className="flex justify-center sm:justify-start items-center gap-3">
            <Shield className="w-6 h-6 text-blue-600 flex-shrink-0" />
            <div>
              <p className="font-bold text-slate-800">Zero Agency Fees</p>
              <p className="text-sm text-slate-600">100% free for parents, always</p>
            </div>
          </div>
        </div>

        {/* Keep the Verifiable Google Rating - this is crucial! */}
        <a 
          href="https://search.google.com/local/reviews?placeid=ChIJz5sczNYR2jERc_4Ka3tDwyY" 
          target="_blank" 
          rel="noreferrer"
          className="flex items-center gap-2 group justify-center lg:justify-end"
        >
          <div className="flex items-center">
            {/* You can manually set stars to reflect your current rating */}
            <Star className="w-5 h-5 text-amber-500 fill-current" />
            <Star className="w-5 h-5 text-amber-500 fill-current" />
            <Star className="w-5 h-5 text-amber-500 fill-current" />
            <Star className="w-5 h-5 text-amber-500 fill-current" />
            <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
          </div>
          <div className="font-semibold text-slate-700 group-hover:text-blue-600 transition-colors">
            4.8/5 Google Rating
          </div>
        </a>

      </div>
    </section>
  );
}