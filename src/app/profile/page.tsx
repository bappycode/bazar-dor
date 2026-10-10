"use client";

import { authClient, useSession } from "@/lib/auth-client";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";

const Profile = () => {
  const { data: session, isPending } = useSession();
  const [isUpdating, setIsUpdating] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);

  const onSignOut = async () => {
    setIsSigningOut(true);

    try {
      const { error } = await authClient.signOut();

      if (error) {
        toast.error(error.message ?? "সাইন আউট করা যায়নি। আবার চেষ্টা করুন।");
        return;
      }

      toast.success("সাইন আউট সম্পন্ন হয়েছে");
    } catch (error) {
      console.error("Sign out failed:", error);
      toast.error("সাইন আউট করা যায়নি। আবার চেষ্টা করুন।");
    } finally {
      setIsSigningOut(false);
    }
  };

  const onNameUpdate = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") ?? "").trim();

    if (!name) {
      toast.error("আপনার নাম লিখুন।");
      return;
    }

    setIsUpdating(true);

    try {
      const { error } = await authClient.updateUser({ name });

      if (error) {
        toast.error(error.message ?? "নাম হালনাগাদ করা যায়নি। আবার চেষ্টা করুন।");
        return;
      }

      toast.success("আপনার নাম হালনাগাদ হয়েছে");
    } catch (error) {
      console.error("Profile name update failed:", error);
      toast.error("নাম হালনাগাদ করা যায়নি। আবার চেষ্টা করুন।");
    } finally {
      setIsUpdating(false);
    }
  };

  if (isPending) {
    return (
      <section className="flex flex-1 items-center justify-center bg-[#f5f8f5] px-4 py-16">
        <span className="loading loading-spinner loading-lg text-green-700" />
      </section>
    );
  }

  if (!session) return null;

  const user = session.user;
  const initial = user.name?.trim().charAt(0).toUpperCase() || "U";

  return (
    <section className="flex-1 bg-[#f5f8f5] px-4 py-10 text-[#253129] sm:px-6 sm:py-14">
      <div className="mx-auto w-full max-w-5xl">
        <div className="mb-8">
          <p className="text-sm font-semibold tracking-wide text-green-700">
            আপনার অ্যাকাউন্ট
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            আমার প্রোফাইল
          </h1>
          <p className="mt-2 text-sm leading-6 text-[#748078] sm:text-base">
            আপনার ব্যক্তিগত তথ্য দেখুন এবং প্রয়োজন হলে হালনাগাদ করুন।
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
          <section className="overflow-hidden rounded-3xl border border-[#e1e9e1] bg-white shadow-sm">
            <div className="h-2 bg-gradient-to-r from-green-700 via-green-500 to-lime-300" />
            <div className="p-6 sm:p-8">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                <div
                  aria-hidden="true"
                  className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-green-100 text-3xl font-bold text-green-800 ring-4 ring-green-50"
                >
                  {initial}
                </div>
                <div className="min-w-0">
                  <p className="text-sm text-[#879188]">স্বাগতম</p>
                  <h2 className="mt-1 break-words text-2xl font-bold text-[#253129]">
                    {user.name}
                  </h2>
                  <p className="mt-1 break-all text-sm text-[#748078]">
                    {user.email}
                  </p>
                </div>
              </div>

              <div className="my-7 border-t border-[#edf1ed]" />

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl bg-[#f7faf7] p-4">
                  <p className="text-xs font-medium text-[#879188]">
                    অ্যাকাউন্টের নাম
                  </p>
                  <p className="mt-1 break-words font-semibold text-[#344239]">
                    {user.name}
                  </p>
                </div>
                <div className="rounded-2xl bg-[#f7faf7] p-4">
                  <p className="text-xs font-medium text-[#879188]">
                    ইমেইল ঠিকানা
                  </p>
                  <p className="mt-1 break-all font-semibold text-[#344239]">
                    {user.email}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={onSignOut}
                disabled={isSigningOut}
                className="mt-7 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 transition hover:border-red-300 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSigningOut ? (
                  <span className="loading loading-spinner loading-xs" />
                ) : (
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    className="h-4 w-4"
                    aria-hidden="true"
                  >
                    <path
                      d="M10 17l5-5-5-5M15 12H3m9-8h6a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
                {isSigningOut ? "সাইন আউট হচ্ছে..." : "সাইন আউট"}
              </button>
            </div>
          </section>

          <section className="rounded-3xl border border-[#e1e9e1] bg-white p-6 shadow-sm sm:p-8">
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-green-50 text-green-700">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="h-6 w-6"
                aria-hidden="true"
              >
                <path
                  d="M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L8 18l-4 1 1-4Z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h2 className="text-xl font-bold">নাম হালনাগাদ করুন</h2>
            <p className="mt-2 text-sm leading-6 text-[#748078]">
              আপনার প্রোফাইলে যে নামটি দেখানো হবে, সেটি এখানে পরিবর্তন করুন।
            </p>

            <form onSubmit={onNameUpdate} className="mt-7">
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-semibold text-[#344239]"
              >
                আপনার নাম
              </label>
              <input
                id="name"
                type="text"
                name="name"
                defaultValue={user.name}
                autoComplete="name"
                maxLength={100}
                required
                className="h-12 w-full rounded-xl border border-[#dfe7df] bg-white px-4 text-sm outline-none transition placeholder:text-[#a0aaa1] focus:border-green-600 focus:ring-4 focus:ring-green-100"
                placeholder="যেমন: রহিম উদ্দিন"
              />
              <button
                type="submit"
                disabled={isUpdating}
                className="mt-4 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-green-700 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isUpdating && (
                  <span className="loading loading-spinner loading-xs" />
                )}
                {isUpdating ? "হালনাগাদ হচ্ছে..." : "পরিবর্তন সংরক্ষণ করুন"}
              </button>
            </form>
          </section>
        </div>
      </div>
    </section>
  );
};

export default Profile;
