import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
// import Header from "@/components/common/Header";
// import Footer from "@/components/common/Footer";
import Header02 from "@/components/common/Header02";
import Footer02 from "@/components/common/Footer02";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "GhoonaGoods｜機構部品メーカーの高品質オリジナルグッズ製作",
    template: "%s | GhoonaGoods"
  },
  description: "機構部品メーカーとして培った技術力で、オリジナル缶バッジ・アクリルスタンド・アクリルキーホルダーを高品質で製作。1個から対応可能な小ロット生産で、お客様のアイディアを最高品質のグッズとして形にします。",
  keywords: [
    "オリジナルグッズ製作",
    "缶バッジ",
    "アクリルスタンド", 
    "アクリルキーホルダー",
    "機構部品メーカー",
    "小ロット生産",
    "高品質",
    "カスタマイズ",
    "オリジナル製作",
    "GhoonaGoods"
  ],
  authors: [{ name: "GhoonaGoods" }],
  creator: "GhoonaGoods",
  publisher: "GhoonaGoods",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://ghoonagoods.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    url: 'https://ghoonagoods.com',
    title: 'GhoonaGoods｜機構部品メーカーの高品質オリジナルグッズ製作',
    description: '機構部品メーカーとして培った技術力で、オリジナル缶バッジ・アクリルスタンド・アクリルキーホルダーを高品質で製作。1個から対応可能な小ロット生産。',
    siteName: 'GhoonaGoods',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'GhoonaGoods - 機構部品メーカーの高品質オリジナルグッズ製作'
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GhoonaGoods｜機構部品メーカーの高品質オリジナルグッズ製作',
    description: '機構部品メーカーとして培った技術力で、オリジナル缶バッジ・アクリルスタンド・アクリルキーホルダーを高品質で製作。',
    images: ['/og-image.png'],
    creator: '@ghoonagoods',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
  },
  category: 'technology',
  classification: 'オリジナルグッズ製作・機構部品',
  other: {
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0f172a" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header02 />
        {children}
        <Footer02 />
      </body>
    </html>
  );
}