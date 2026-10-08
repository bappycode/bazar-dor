import Image from "next/image";
import DateDisplay from "./DateDisplay";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="mx-auto max-w-7xl rounded-2xl bg-base-200 px-6 py-6">
      <div className="flex flex-col items-center justify-between gap-6 lg:flex-row-reverse">

        <div className="flex-shrink-0">
          <Image
            src="/bazar-hero.png"
            alt="বাজারের পণ্যের ঝুড়ি"
            width={220}
            height={180}
            priority
            className="h-auto w-52 lg:w-56"
          />
        </div>

        <div className="flex-1">
          <DateDisplay />

          <h1 className="text-3xl font-bold text-neutral-800 lg:text-4xl">
            আজকের বাজারের দাম এক নজরে
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-6 text-neutral-500 lg:text-base">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
            বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
          </p>

          <Link href='/#সব পণ্য'><button className="mt-5 rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-md transition hover:bg-green-700">
            সব পণ্য দেখুন
          </button></Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;