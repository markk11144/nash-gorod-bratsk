import type { Metadata, Viewport } from "next";
import "./globals.css";
import { company } from "@/data/company";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Metrika } from "@/components/layout/Metrika";
import { MobileBar } from "@/components/layout/MobileBar";
import { getSiteUrl } from "@/lib/contacts";

export const metadata: Metadata = {
  metadataBase: getSiteUrl(),
  title: {
    default: "Агентство недвижимости «Наш Город» — Братск",
    template: "%s | Наш Город",
  },
  description:
    "Покупка, продажа, аренда и сопровождение сделок с недвижимостью в Братске. Офис агентства «Наш Город» на улице Мира, 27.",
  keywords: [
    "агентство недвижимости Братск",
    "риелтор Братск",
    "купить квартиру в Братске",
    "продать квартиру в Братске",
    "недвижимость Братск",
    "сопровождение сделки с недвижимостью",
  ],
  applicationName: company.name,
  category: "real estate",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    title: "Наш Город — агентство недвижимости в Братске",
    description: "Понятное сопровождение сделки: от первого вопроса до оформления и передачи объекта.",
    siteName: company.name,
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Наш Город — недвижимость в Братске",
    description: "Покупка, продажа, аренда, ипотека и сопровождение документов.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#FEED01",
  colorScheme: "light",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body>
        <a className="skip-link" href="#content">
          Перейти к содержанию
        </a>
        <Header />
        {children}
        <Footer />
        <MobileBar />
        <Metrika />
      </body>
    </html>
  );
}
