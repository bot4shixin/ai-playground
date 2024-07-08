import "@/styles/globals.css";
import Providers from "@/components/layout/providers";
import { Toaster } from "@/components/ui/sonner";
import { Inter } from "next/font/google";
import { cookies } from "next/headers";
import { TRPCReactProvider } from "@/trpc/react";
import { auth } from "@/auth";
import StoreProvider from '@/lib/store/StoreProvider';
import {TooltipProvider} from "@/components/ui/tooltip";
import { TailwindIndicator } from '@/components/tailwind-indicator'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "AI tools",
  description: "AI tools",
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png'
  }
};

export const viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' }
  ]
}


export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable}`}>
        <TooltipProvider>
          <TRPCReactProvider cookies={cookies().toString()}>
            <StoreProvider>
              <Providers session={session}>
                {children}
                <Toaster />
              </Providers>
              <TailwindIndicator />
            </StoreProvider>
          </TRPCReactProvider>
        </TooltipProvider>
      </body>
    </html>
  );
}
