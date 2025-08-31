import Script from 'next/script'; // 1. Make sure this import is here
import { Toaster } from 'sonner';
import Navbar from '../components/Navbar';
import Footer from './Footer';
import Whatsapp from './Whatsapp';
import './globals.css';

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

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Script
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-BRCN6DHYT1"
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-BRCN6DHYT1', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
      <body>
        <Toaster />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <Whatsapp />
      </body>
    </html>
  );
}