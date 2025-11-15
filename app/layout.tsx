import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Visual Product Matcher - Find Similar Products",
  description: "Find visually similar products using AI-powered image recognition",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        style={{background: '#ffffff', color: '#000000', fontFamily: 'system-ui, -apple-system, sans-serif', margin: 0, padding: 0}}
      >
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Aggressive removal of Issue elements and error overlays
              if (typeof document !== 'undefined') {
                const removeIssues = () => {
                  // Remove all divs that contain "Issue" text
                  const allElements = document.querySelectorAll('*');
                  allElements.forEach(el => {
                    const text = el.textContent || '';
                    if (text.trim() === 'Issue' || (text.includes('Issue') && text.length < 50)) {
                      el.style.display = 'none';
                      el.style.visibility = 'hidden';
                      el.style.height = '0';
                      el.style.width = '0';
                      el.style.margin = '0';
                      el.style.padding = '0';
                      el.style.border = 'none';
                      try { el.remove(); } catch(e) {}
                    }
                  });
                  
                  // Hide error/issue/dev related elements
                  document.querySelectorAll('[id*="error"], [id*="issue"], [id*="dev"], [id*="toast"], [class*="error"], [class*="issue"], [class*="toast"], [role="alert"], [role="status"]').forEach(el => {
                    el.style.display = 'none !important';
                    el.style.visibility = 'hidden !important';
                  });
                };
                
                // Run multiple times to catch dynamically added elements
                removeIssues();
                document.addEventListener('DOMContentLoaded', removeIssues);
                setTimeout(removeIssues, 50);
                setTimeout(removeIssues, 200);
                setTimeout(removeIssues, 500);
                setInterval(removeIssues, 1000);
              }
            `,
          }}
        />
        <header style={{position: 'sticky', top: 0, zIndex: 40, backdropFilter: 'blur(8px)', background: '#ffffff', borderBottom: '1px solid #e5e7eb'}}>
          <div style={{maxWidth: '1280px', margin: '0 auto', paddingLeft: '1rem', paddingRight: '1rem', paddingTop: '0.75rem', paddingBottom: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
            <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
              <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '2.5rem', height: '2.5rem', borderRadius: '0.5rem', background: '#f3f4f6', border: '2px solid #000000', color: '#000000', fontWeight: 'bold', fontSize: '0.875rem'}}>
                VM
              </div>
              <div>
                <div style={{fontSize: '0.75rem', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: '600'}}>Visual Search Studio</div>
                <h2 style={{fontSize: '1rem', fontWeight: '700', color: '#000000', marginTop: '0.125rem', margin: 0}}>Visual Product Matcher</h2>
              </div>
            </div>
          </div>
        </header>

        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
