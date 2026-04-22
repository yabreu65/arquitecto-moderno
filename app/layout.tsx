import type { Metadata } from "next";
import { Head, Search } from "nextra/components";
import { getPageMap } from "nextra/page-map";
import { Footer, Layout, Navbar } from "nextra-theme-docs";
import "./globals.css";
import "nextra-theme-docs/style.css";
import themeConfig from "../theme.config";
import { REPO_URL, SITE_URL } from "../lib/site-config";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "El Arquitecto Moderno",
    template: "%s | El Arquitecto Moderno",
  },
  description:
    "Diseno de Plataformas SaaS Enterprise y Ecosistemas de IA Agentica.",
  openGraph: {
    title: "El Arquitecto Moderno",
    description:
      "Diseno de Plataformas SaaS Enterprise y Ecosistemas de IA Agentica.",
    type: "website",
    locale: "es_AR",
    siteName: "El Arquitecto Moderno",
  },
  twitter: {
    card: "summary_large_image",
    title: "El Arquitecto Moderno",
    description:
      "Diseno de Plataformas SaaS Enterprise y Ecosistemas de IA Agentica.",
  },
  alternates: {
    canonical: "/",
  },
};

const navbar = (
  <Navbar
    logo={<span style={{ fontWeight: 700 }}>El Arquitecto Moderno</span>}
    projectLink={REPO_URL ?? undefined}
  />
);

const footer = (
  <Footer>MIT {new Date().getFullYear()} | El Arquitecto Moderno</Footer>
);

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pageMap = await getPageMap();

  return (
    <html lang="es" dir="ltr" suppressHydrationWarning>
      <Head>
        <meta name="theme-color" content="#0f172a" />
      </Head>
      <body>
        <Layout
          {...themeConfig}
          pageMap={pageMap}
          navbar={navbar}
          footer={footer}
          search={<Search placeholder="Buscar en el libro..." />}
        >
          {children}
        </Layout>
      </body>
    </html>
  );
}
