import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header/header";
import { Footer } from "@/components/footer/footer";
import { Toaster } from "@/components/ui/sonner";
import { Session } from "next-auth";
import { SessionProviderWrapper } from "@/session/session-provider-wrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cookie",
  description:
    "Cookie ist eine moderne Web App, die das Kochen zu einem interaktiven und inspirierenden Erlebnis macht. Die App richtet sich an alle, die gerne kochen, sei es für die Familie, für sich selbst oder um die neuesten Food-Trends zu teilen. Sie bietet eine Plattform, auf der Nutzer Rezepte entdecken bewerten und eigene Kreationen speichern können.",
};

export default function RootLayout({
  children,
  modal,
  session,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
  session: Session;
}>) {
  return (
    <html lang="de">
      <head>
        <link
          rel="icon"
          type="image/png"
          href="/favicon-96x96.png"
          sizes="96x96"
        />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </head>

      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <SessionProviderWrapper session={session}>
          <Header />
          <div className="flex-grow px-8 py-16">
            {children}
            {modal}
          </div>
          <Footer />
          <Toaster />
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
