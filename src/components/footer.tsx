const Footer = () => {
  return (
    <footer className="mt-12 bg-white-900 text-white">
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="flex flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left">
          <div>
            <h2 className="text-lg font-bold">
              বাজার দর
            </h2>

            <p className="mt-2 text-sm text-neutral-400">
              প্রয়োজনীয় পণ্যের দাম এক নজরে।
            </p>
          </div>

          <div className="max-w-md">
            <p className="text-sm leading-6 text-neutral-400">
              সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে
              পরিবর্তিত হতে পারে।
            </p>
          </div>
        </div>

        <div className="mt-8 border-t border-neutral-800 pt-5 text-center">
          <p className="text-xs text-neutral-500">
            © 2026 বাজার দর. সর্বস্বত্ব সংরক্ষিত।
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;