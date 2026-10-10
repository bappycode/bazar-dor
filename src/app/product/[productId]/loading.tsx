export default function Loading() {
  return (
    <main
      className="mx-auto max-w-7xl px-4 py-6 sm:py-8"
      aria-label="পণ্যের তথ্য লোড হচ্ছে"
      aria-busy="true"
    >
      <div className="mb-6 flex gap-2">
        <div className="h-4 w-12 animate-pulse rounded bg-neutral-100" />
        <div className="h-4 w-3 animate-pulse rounded bg-neutral-100" />
        <div className="h-4 w-24 animate-pulse rounded bg-neutral-100" />
        <div className="h-4 w-3 animate-pulse rounded bg-neutral-100" />
        <div className="h-4 w-28 animate-pulse rounded bg-neutral-100" />
      </div>

      <section className="rounded-2xl border border-neutral-200 bg-white px-5 py-5 sm:px-6 sm:py-5">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex min-w-0 items-center gap-4">
            <div className="h-20 w-20 shrink-0 animate-pulse rounded-2xl bg-neutral-100" />
            <div className="min-w-0 flex-1">
              <div className="h-8 w-48 max-w-full animate-pulse rounded bg-neutral-100" />
              <div className="mt-3 h-4 w-40 max-w-full animate-pulse rounded bg-neutral-100" />
              <div className="mt-3 h-4 w-56 max-w-full animate-pulse rounded bg-neutral-100" />
            </div>
          </div>
          <div className="h-24 w-full animate-pulse rounded-2xl bg-neutral-100 sm:w-32" />
        </div>
      </section>

      <section className="mt-6 overflow-hidden rounded-2xl border border-neutral-200 bg-white">
        <div className="border-b border-neutral-200 px-5 py-4">
          <div className="h-6 w-40 animate-pulse rounded bg-neutral-100" />
          <div className="mt-2 h-4 w-56 max-w-full animate-pulse rounded bg-neutral-100" />
        </div>
        <div className="divide-y divide-neutral-100">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="flex items-center justify-between gap-4 px-5 py-4"
            >
              <div className="h-4 w-28 animate-pulse rounded bg-neutral-100" />
              <div className="h-4 w-32 animate-pulse rounded bg-neutral-100" />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
