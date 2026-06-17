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
  icons: {
    icon: '/icon.jpg',
    shortcut: '/icon.jpg',
    apple: '/icon.jpg',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/icon.jpg" type="image/jpeg" />
        <link rel="apple-touch-icon" href="/icon.jpg" />
        <meta name="google-site-verification" content="ba4L_TA6pYg5hd0p5Z6R_tCbrORyuZovoMevBc4Um8k" />
        <meta name="google-site-verification" content="google24d069add37978b6" />
        <meta name="monetag" content="19d17d38a8688b2fef16668c8a642bc6" />
        <Script
          id="effective-cpm-1"
          src="https://pl29764955.effectivecpmnetwork.com/e9/eb/fc/e9ebfc4cec81c26e2278b17833180c2f.js"
          strategy="afterInteractive"
        />
        <Script
          id="effective-cpm-2"
          src="https://pl29764958.effectivecpmnetwork.com/59/82/00/598200a94d4b6167abccb483d4a68df0.js"
          strategy="afterInteractive"
          data-cfasync="false"
        />
        <Script
          id="quge-tag"
          src="https://quge5.com/88/tag.min.js"
          strategy="afterInteractive"
          data-zone="249982"
          data-cfasync="false"
        />
        <Script
          id="zone-tag-1"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(s){s.dataset.zone='11155060',s.src='https://al5sm.com/tag.min.js'})([document.documentElement, document.body].filter(Boolean).pop().appendChild(document.createElement('script')))`
          }}
        />
        <Script
          id="zone-tag-2"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(s){s.dataset.zone='11155082',s.src='https://n6wxm.com/vignette.min.js'})([document.documentElement, document.body].filter(Boolean).pop().appendChild(document.createElement('script')))`
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                // 1. Intercept and silent third-party / monetization errors to prevent preview or hydration breaks
                if (typeof window !== 'undefined') {
                  window.addEventListener('error', function(e) {
                    var msg = e.message || '';
                    if (
                      msg.indexOf('fetch') !== -1 || 
                      msg.indexOf('getter') !== -1 || 
                      msg.indexOf('effectivecpmnetwork') !== -1 || 
                      msg.indexOf('al5sm') !== -1 || 
                      msg.indexOf('n6wxm') !== -1 || 
                      msg.indexOf('quge') !== -1 ||
                      msg.indexOf('ads') !== -1
                    ) {
                      try {
                        e.stopImmediatePropagation();
                        e.preventDefault();
                      } catch(err) {}
                      return true;
                    }
                  }, true);

                  window.addEventListener('unhandledrejection', function(e) {
                    var reason = e.reason && e.reason.message || '';
                    if (
                      reason.indexOf('fetch') !== -1 || 
                      reason.indexOf('getter') !== -1 ||
                      reason.indexOf('ads') !== -1
                    ) {
                      try {
                        e.stopImmediatePropagation();
                        e.preventDefault();
                      } catch(err) {}
                    }
                  }, true);
                }

                // 2. Fetch polyfill / interceptor
                try {
                  var target = typeof window !== 'undefined' ? window : (typeof self !== 'undefined' ? self : null);
                  if (target) {
                    var desc = Object.getOwnPropertyDescriptor(target, 'fetch');
                    if (desc && !desc.configurable) {
                      try {
                        Object.defineProperty(Object.getPrototypeOf(target), 'fetch', {
                          get: function() { return target.fetch; },
                          set: function(val) { console.log('Prototype fetch setter bypassed'); },
                          configurable: true
                        });
                      } catch(e1) {}
                    } else {
                      var originalFetch = target.fetch;
                      var currentFetch = originalFetch;
                      Object.defineProperty(target, 'fetch', {
                        get: function() { return currentFetch; },
                        set: function(val) { currentFetch = val; },
                        configurable: true,
                        enumerable: true
                      });
                    }
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
