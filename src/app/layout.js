import { Roboto_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "./components/Sidebar";

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
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
      <body className={`${robotoMono.variable} font-[var(--font-roboto-mono)] antialiased`}>
        <Sidebar albums={albums} />
        <div className="lg:ml-64 min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}
