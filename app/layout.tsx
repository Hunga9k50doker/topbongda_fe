import "@/styles/main.scss";
import ThemeProvider from "@/context/ThemeContext";
import { Barlow } from "next/font/google";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { BRAND_NAME, OG_TITLE, SITE_BASE_URL } from "@/constants";

export const barlow = Barlow({
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-barlow",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

export const metadata: Metadata = {
  title: BRAND_NAME,
  metadataBase: new URL(`${SITE_BASE_URL}`),
  description: "Mạng xã hội đỉnh cao về bóng đá",
  openGraph: {
    type: "website",
    siteName: BRAND_NAME,
    title: OG_TITLE,
    url: SITE_BASE_URL,
    images: [
      {
        url: `${SITE_BASE_URL}/images/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: BRAND_NAME,
      },
    ],
  },
  icons: {
    icon: "/favicon/favicon-16x16.png",
    apple: "/favicon/apple-icon-180x180.png",
  },
  twitter: {
    card: "summary_large_image",
  },
  verification: {
    other: {
      ["facebook"]: 112276442265938,
      ["msapplication-TileColor"]: "#995611",
      ["msapplication-TileImage"]: "/favicon/ms-icon-144x144.png",
      ["theme-color"]: "#995611",
    },
  },
  manifest: "/favicon/manifest.json",
};

export default async function RootLayout({
  children,
  auth,
  cookiePolicy,
}: {
  children: React.ReactNode;
  auth: React.ReactNode;
  cookiePolicy: React.ReactNode;
}) {
  const modeInit: any = cookies().get("theme")?.value || "dark";

  return (
    <html lang="vi" className={barlow.className} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ThemeProvider modeInit={modeInit}>
          {children}
          {auth}
          {cookiePolicy}
        </ThemeProvider>
      </body>
    </html>
  );
}
