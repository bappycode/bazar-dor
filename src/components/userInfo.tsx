
"use client";

import { authClient, useSession } from "@/lib/auth-client";
import Link from "next/link";
import { useState } from "react";

const UserInfo = () => {
  const { data: session, isPending } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  const onSignOut = async () => {
    const { error } = await authClient.signOut();

    if (error) {
      console.error("Sign out failed:", error);
      return;
    }

    setIsOpen(false);
  };

  if (isPending) {
    return (
      <div className="absolute right-4 top-4 sm:right-8">
        <span className="loading loading-spinner loading-sm text-green-700" />
      </div>
    );
  }

  return (
    <div className="absolute right-4 top-4 z-50 sm:right-8">
      {session ? (
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-expanded={isOpen}
            aria-haspopup="true"
            className="flex items-center gap-2 rounded-full border border-green-100 bg-white px-3 py-2 shadow-sm transition hover:border-green-300 hover:bg-green-50"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-100 text-lg font-bold text-green-800">
              {session.user.name?.charAt(0).toUpperCase() || "U"}
            </div>

            <div className="hidden text-left sm:block">
              <p className="max-w-32 truncate text-sm font-semibold text-gray-800">
                {session.user.name}
              </p>
            </div>

            <svg
              className={`h-4 w-4 text-gray-500 transition-transform ${
                isOpen ? "rotate-180" : ""
              }`}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path
                d="m6 9 6 6 6-6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {isOpen && (
            <>
              <button
                type="button"
                aria-label="Close account menu"
                className="fixed inset-0 z-40 cursor-default"
                onClick={() => setIsOpen(false)}
              />

              <div className="absolute right-0 top-full z-50 mt-3 w-64 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl">
                <div className="border-b border-gray-100 bg-green-50 px-4 py-4">
                  <p className="font-semibold text-gray-800">
                    {session.user.name}
                  </p>
                  <p className="mt-1 break-all text-xs text-gray-500">
                    {session.user.email}
                  </p>
                </div>

                <div className="p-2">
                  <Link
                    href="/profile"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-gray-700 transition hover:bg-green-50 hover:text-green-800"
                  >
                    <span className="text-lg" aria-hidden="true">👤</span>
                    আমার প্রোফাইল
                  </Link>

                  <button
                    type="button"
                    onClick={onSignOut}
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm text-red-600 transition hover:bg-red-50"
                  >
                    <span className="text-lg" aria-hidden="true">↩</span>
                    সাইন আউট
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <Link
            href="/sign-in"
            className="rounded-lg px-3 py-2 text-sm font-semibold text-gray-700 transition hover:bg-green-50 hover:text-green-800"
          >
            সাইন ইন
          </Link>

          <Link
            href="/sign-up"
            className="rounded-lg bg-green-700 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-green-800"
          >
            সাইন আপ
          </Link>
        </div>
      )}
    </div>
  );
};

export default UserInfo;
