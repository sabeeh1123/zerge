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
    google: 'ba4L_TA6pYg5hd0p5Z6R_tCbrORyuZovoMevBc4Um8k',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <head>
        <meta name="google-site-verification" content="ba4L_TA6pYg5hd0p5Z6R_tCbrORyuZovoMevBc4Um8k" />
        <meta name="google-site-verification" content="google24d069add37978b6" />
        <meta name="monetag" content="19d17d38a8688b2fef16668c8a642bc6" />
        <script src="https://quge5.com/88/tag.min.js" data-zone="249982" async data-cfasync="false" />
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
