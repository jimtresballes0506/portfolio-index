import './globals.css';

export const metadata = {
  title: 'RE:THREAD — Curated Vintage & Secondhand Studio',
  description:
    'Clean, curated 1-of-1 vintage and secondhand clothing storefront. Filter by category, size, condition grade, era, and price.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-white text-zinc-900 antialiased selection:bg-zinc-900 selection:text-white">
        {children}
      </body>
    </html>
  );
}
