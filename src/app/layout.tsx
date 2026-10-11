import type { Metadata } from "next";
import { Noto_Serif_Bengali } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Marquee from "@/components/marquee";
import { Suspense } from "react";
import Footer from "@/components/footer";
import { Toaster } from "react-hot-toast";

const notoSerifBengali = Noto_Serif_Bengali({
  subsets: ["latin", "bengali"],
});

export const metadata: Metadata = {
  title: "বাজার দর",
  description: "'বাজারদর' (BazarDor) হলো একটি ওয়েব অ্যাপ্লিকেশন, যা ব্যবহারকারীদের বাংলাদেশের নিত্যপ্রয়োজনীয় পণ্যের বাজারদর যাচাই ও তুলনা করতে সহায়তা করার জন্য তৈরি করা হয়েছে। এটি পণ্যের দাম দেখা, বিভিন্ন বাজারের মধ্যে দামের তুলনা করা এবং সঠিক তথ্য জেনে কেনাকাটার সিদ্ধান্ত নেওয়ার একটি সহজ উপায় প্রদান করে।",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-theme='light'
      className={`${notoSerifBengali.className} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Suspense fallback={<div className="mx-auto h-28 w-full max-w-7xl animate-pulse bg-white" />}>
          <Header />
        </Suspense>
        <Suspense fallback={<div className="h-10 bg-white-700" />}>
          <Marquee />
        </Suspense>
        <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col">
        {children}
        </main>
        <Toaster/>
        <Footer/>
        </body>
    </html>
  );
}
