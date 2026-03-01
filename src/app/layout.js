import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "./components/Sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

async function getAlbums() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/albums`, {
    cache: 'no-store',
  });
  return res.json();
}

export const metadata = {
  title: "My Portfolio",
  description: "A photography portfolio",
};

export default async function RootLayout({ children }) {
  const albums = await getAlbums();

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Sidebar albums={albums} />
        <div className="lg:ml-64 min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}
