import type { Metadata } from "next";
import { Nunito_Sans, Roboto } from "next/font/google";  
import "./globals.css";

const nunitoSans = Nunito_Sans({
  variable: "--font-nunito-sans",
  subsets: ["latin"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["300","400","500","700"], 
});

export const metadata: Metadata = {
  title: "tracksure",
  description: "inventory tracking System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${nunitoSans.variable} ${roboto.variable} antialiased`}  
      >
        {children}
      </body>
    </html>
  );
}
