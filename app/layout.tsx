import type { Metadata } from 'next';
import { Inter, Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import './globals.css'; // Global styles
import Script from 'next/script';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Zerge Discover - Premium Movies & Podcasts recommendation Engine',
  description: 'The ultimate tech-forward entertainment recommendation hub, featuring curated reviews of movies and podcasts, generated dynamically via Gemini.',
  verification: {
    google: 'd7SpZcfEj8Z1yH5BVXX-d-bykVqabX3MCEf961LVjHw',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
      <head>
        <meta name="monetag" content="19d17d38a8688b2fef16668c8a642bc6" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var target = typeof window !== 'undefined' ? window : (typeof self !== 'undefined' ? self : null);
                  if (target && target.fetch) {
                    var originalFetch = target.fetch;
                    var currentFetch = originalFetch;
                    Object.defineProperty(target, 'fetch', {
                      get: function() { return currentFetch; },
                      set: function(val) { currentFetch = val; },
                      configurable: true,
                      enumerable: true
                    });
                  }
                } catch (e) {
                  console.warn('Polyfill fetch setter fail:', e);
                }
              })();
            `
          }}
        />
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3725227998686442"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body className="font-sans antialiased bg-stone-950 text-stone-100 selection:bg-pink-500 selection:text-white" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
