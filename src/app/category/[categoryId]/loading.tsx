export default function Loading() {
  return (
    <main
      className="mx-auto max-w-7xl px-4 py-6 sm:py-8"
      aria-label="বিভাগের পণ্য লোড হচ্ছে"
      aria-busy="true"
    >
      <section className="rounded-2xl border border-neutral-200 bg-white px-5 py-5 shadow-sm sm:px-6">
        <div className="flex items-center gap-4">
          <div className="h-14 w-14 shrink-0 animate-pulse rounded-xl bg-neutral-100" />
          <div className="flex-1">
            <div className="h-7 w-48 max-w-full animate-pulse rounded bg-neutral-100" />
            <div className="mt-2 h-4 w-56 max-w-full animate-pulse rounded bg-neutral-100" />
          </div>
        </div>
      </section>

      <div className="mt-6 flex items-center justify-between gap-4">
        <div className="h-5 w-32 animate-pulse rounded bg-neutral-100" />
        <div className="h-9 w-32 animate-pulse rounded-lg bg-neutral-100" />
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="h-[170px] animate-pulse rounded-2xl border border-neutral-200 bg-neutral-100"
          />
        ))}
      </div>
    </main>
  );
}
