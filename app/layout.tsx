import type { Metadata } from "next";
import Header from "@/components/layout/header";
import "./globals.css";

export const metadata: Metadata = {
  title: "StudentHub — College Student Management System",
  description:
    "A streamlined platform for managing student records, enrollment, and academic tracking for Indian colleges and universities.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <body className="font-sans antialiased min-h-full bg-white text-gray-900 leading-relaxed">
        <Header />
        {children}
      </body>
    </html>
  );
}
