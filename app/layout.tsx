import type { Metadata, Viewport } from 'next'
import { Analytics } from "@vercel/analytics/react"
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from 'next-themes'
import { SidebarProvider } from '@/components/ui/sidebar'
import { AppSidebar } from "@/components/app-sidebar"
import {
  SidebarInset,
} from "@/components/ui/sidebar"
import PageHeader from "@/components/page-header"
import { cn } from "@/lib/utils"
import { Toaster } from 'sonner'
import Script from 'next/script'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#ffffff',
}

export const metadata: Metadata = {
  title: "Yaps World by @abdibrokhim",
  description: "Yaps World - The Most Viral Open Source Things by @abdibrokhim",
  metadataBase: new URL("https://yaps.gg/"),
  keywords: ["ai builder", "youtube creator", "open-source builder", "open-source"],
  
  alternates: {
    canonical: "/",
  },

  authors: [
    {
      name: "Ibrohim Abdivokhidov",
      url: "https://github.com/abdibrokhim",
    },
  ],

  openGraph: {
    title: "Yaps World by @abdibrokhim",
    description: "Yaps World - The Most Viral Open Source Things by @abdibrokhim",
    type: "website",
    url: "/",
    images: [
      {
        url: "/images/yapsdotgg.png",
        width: 1200,
        height: 630,
        alt: "OG Image",
      },
    ],
  },
  
  icons: {
    icon: '/favicon.ico',
  },

  twitter: {
    card: 'summary_large_image',
    title: "Yaps World by @abdibrokhim",
    description: "Yaps World - The Most Viral Open Source Things by @abdibrokhim",
    images: ['/images/yapsdotgg.png'],
    site: '@abdibrokhim',
    creator: '@abdibrokhim',
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
    },
  },

  appleWebApp: {
    title: 'Yaps World by @abdibrokhim',
    statusBarStyle: 'black-translucent',
  },
  
  appLinks: {
    web: {
      url: 'https://yaps.gg',
      should_fallback: true,
    },
  },
};

const geist = Geist({
  variable: '--font-geist',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html className='bg-sidebar' lang="en" suppressHydrationWarning>
      <Script
        async
        src="https://cloud.umami.is/script.js"
        data-website-id="d9adca9d-30eb-482f-8f5f-d515dc203c67"
      />
      <head />
      <body className={cn('min-h-screen bg-sidebar font-sans antialiased overflow-x-hidden', geist.variable, geistMono.variable)}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <SidebarProvider defaultOpen={false}>
            <AppSidebar />
            <SidebarInset>
              <PageHeader />
              <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                {children}
              </div>
            </SidebarInset>
          </SidebarProvider>
        </ThemeProvider>
        <Analytics />
        <Toaster theme='dark' />
        <elevenlabs-convai agent-id="agent_8101k4a55mcgeywv1hkjthwy0x7h"></elevenlabs-convai><script src="https://unpkg.com/@elevenlabs/convai-widget-embed" async type="text/javascript"></script>
      </body>
    </html>
  )
}
