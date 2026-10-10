"use client";

const BackButton = () => (
  <button
    type="button"
    onClick={() => window.history.back()}
    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-[#dce6dc] bg-white px-6 py-3 text-sm font-semibold text-[#344239] transition hover:bg-[#f7faf7] focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path d="m12 19-7-7 7-7" />
      <path d="M5 12h14" />
    </svg>
    আগের পৃষ্ঠায় ফিরে যান
  </button>
);

export default BackButton;
