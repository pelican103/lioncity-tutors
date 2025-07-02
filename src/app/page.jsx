export const metadata = {
  title: 'LionCity Tutors: #1 Home Tuition Agency in Singapore',
  description: "Singapore's trusted home tuition agency. Private tutors for PSLE, O-Level, A-Level. Free tutor matching, 100+ successful matches. Contact us today!",
  keywords: [
    'home tutor singapore',
    'private tutor singapore',
    'tuition teacher',
    'math tutor',
    'english tutor',
    'science tutor',
    'PSLE tuition',
    'O level tuition',
    'A level tuition',
    'JC tuition',
    'primary school tuition',
    'secondary school tuition'
  ],
  openGraph: {
    type: 'website',
    url: 'https://www.lioncitytutors.com/',
    title: 'LionCity Tutors: #1 Home Tuition Agency in Singapore',
    description: "Singapore's trusted home tuition agency. Private tutors for PSLE, O-Level, A-Level. Free tutor matching, 100+ successful matches. Contact us today!",
    images: [
      {
        url: 'https://www.lioncitytutors.com/final.png',
        alt: 'LionCity Tutors',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    url: 'https://www.lioncitytutors.com/',
    title: 'LionCity Tutors: #1 Home Tuition Agency in Singapore',
    description: "Singapore's trusted home tuition agency. Private tutors for PSLE, O-Level, A-Level. Free tutor matching, 100+ successful matches. Contact us today!",
    images: [
      {
        url: 'https://www.lioncitytutors.com/final.png',
        alt: 'LionCity Tutors',
      }
    ],
  },
  alternates: {
    canonical: 'https://www.lioncitytutors.com/',
  },
  robots: 'index, follow',
  language: 'English',
  author: 'LionCity Tutors',
  geo: {
    region: 'SG',
    placename: 'Singapore',
  },
};

import HomePageClient from './home-page/HomePageClient';

export default function HomePage(props) {
  return <HomePageClient {...props} />;
}
