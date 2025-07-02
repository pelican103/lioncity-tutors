export const metadata = {
  metadataBase: new URL('https://lioncitytutors.com'),
  title: 'LionCity Tutors',
  description: 'Best tuition in Singapore',
  openGraph: {
    title: 'LionCity Tutors',
    description: 'Best tuition in Singapore',
    url: 'https://lioncitytutors.com',
    images: [
      {
        url: '/final.png',
        width: 800,
        height: 600,
        alt: 'LionCity Tutors',
      },
    ],
    type: 'website',
  },
};

import Navbar from '../components/Navbar';
import Footer from './Footer';
import './globals.css';
import { Toaster } from 'sonner';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Toaster />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}