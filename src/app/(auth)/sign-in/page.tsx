"use client";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import toast from "react-hot-toast";

const SignIn = () => {
  const onSubmit = async (e: React.SubmitEvent<HTMLElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const user = Object.fromEntries(formData.entries()) as {
      email: string;
      password: string;
    };

    console.log(user);

    const { data, error } = await authClient.signIn.email({
      email: user.email,
      password: user.password,
      callbackURL: "/",
    });

    if (data) {
      toast.success('Successfully Logged in')
      console.log(data);
    }

    if (error) {
      toast.error(error.message ?? "Sign in failed")
      console.log(error);
    }
  };
  const onGoogleSignIn = async () => {
    const data = await authClient.signIn.social({
      provider: "google",
    });
  };
  const onGitHubSignIn = async () => {
    const data = await authClient.signIn.social({
      provider: "github",
    });
  };
  return (
    <div className="min-h-screen bg-[#f1f6f1] px-4 py-8 text-[#253129] sm:py-10 mt-5">
      <div className="mx-auto w-full max-w-[388px]">
        {/* Heading */}
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold tracking-tight">সাইন ইন</h1>
          <p className="mt-2 text-sm leading-relaxed text-[#7b857d]">
            বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
          </p>
        </div>

        {/* Sign In Card */}
        <div className="rounded-2xl border border-[#e0e8e0] bg-[#fbfdfb] p-5 sm:p-[22px]">
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="mb-1.5 block text-sm font-medium"
              >
                ইমেইল
              </label>
              <input
                id="email"
                type="email"
                name="email"
                className="input h-[38px] w-full rounded-lg border border-[#dfe7df] bg-transparent px-3 text-sm outline-none focus:border-green-600 focus:outline-none"
                placeholder="you@example.com"
                autoComplete="email"
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-1.5 block text-sm font-medium"
              >
                পাসওয়ার্ড
              </label>
              <input
                id="password"
                type="password"
                name="password"
                className="input h-[38px] w-full rounded-lg border border-[#dfe7df] bg-transparent px-3 text-sm outline-none focus:border-green-600 focus:outline-none"
                placeholder="কমপক্ষে ৮ অক্ষর"
                autoComplete="current-password"
                required
              />
            </div>

            <button
              type="submit"
              className="btn mt-1 h-[38px] min-h-0 w-full rounded-lg border-0 bg-[#07883f] text-sm font-semibold text-white shadow-[0_3px_3px_rgba(0,0,0,0.2)] hover:bg-[#067535]"
            >
              সাইন ইন
            </button>
          </form>

          {/* Divider */}
          <div className="my-5 flex items-center gap-4">
            <div className="h-px flex-1 bg-[#dce4dc]" />
            <span className="text-xs text-[#6f786f]">অথবা</span>
            <div className="h-px flex-1 bg-[#dce4dc]" />
          </div>

          {/* Social Login Buttons */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={onGoogleSignIn}
              type="button"
              className="btn h-[38px] min-h-0 rounded-lg border border-[#dfe7df] bg-transparent px-2 text-xs font-semibold text-[#263229] shadow-none hover:bg-[#f0f5f0] sm:text-sm"
            >
              <svg viewBox="0 0 48 48" className="h-4 w-4 shrink-0">
                <path
                  fill="#4285F4"
                  d="M43.6 24.5c0-1.4-.1-2.8-.4-4.1H24v7.8h11a9.4 9.4 0 0 1-4.1 6.2v5.1h6.6c3.9-3.6 6.1-8.8 6.1-15Z"
                />
                <path
                  fill="#34A853"
                  d="M24 44c5.5 0 10.1-1.8 13.5-4.9l-6.6-5.1c-1.8 1.2-4.1 2-6.9 2-5.3 0-9.8-3.6-11.4-8.4H5.8v5.3A20 20 0 0 0 24 44Z"
                />
                <path
                  fill="#FBBC05"
                  d="M12.6 27.6a12 12 0 0 1 0-7.2v-5.3H5.8a20 20 0 0 0 0 17.8l6.8-5.3Z"
                />
                <path
                  fill="#EA4335"
                  d="M24 12c3 0 5.7 1 7.8 3l5.8-5.8A19.4 19.4 0 0 0 24 4 20 20 0 0 0 5.8 15.1l6.8 5.3C14.2 15.6 18.7 12 24 12Z"
                />
              </svg>
              Google দিয়ে চালিয়ে যান
            </button>

            <button
              onClick={onGitHubSignIn}
              type="button"
              className="btn h-[38px] min-h-0 rounded-lg border border-[#dfe7df] bg-transparent px-2 text-xs font-semibold text-[#263229] shadow-none hover:bg-[#f0f5f0] sm:text-sm"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4 shrink-0 fill-current"
                aria-hidden="true"
              >
                <path d="M12 .7a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2.17c-3.22.7-3.9-1.36-3.9-1.36-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.26.73-1.55-2.57-.29-5.28-1.29-5.28-5.72 0-1.26.45-2.3 1.19-3.11-.12-.29-.52-1.47.11-3.07 0 0 .97-.31 3.16 1.19a10.98 10.98 0 0 1 5.75 0c2.2-1.5 3.16-1.19 3.16-1.19.63 1.6.23 2.78.11 3.07.74.81 1.19 1.85 1.19 3.11 0 4.44-2.71 5.42-5.29 5.71.42.36.78 1.06.78 2.14v3.2c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .7Z" />
              </svg>
              GitHub দিয়ে চালিয়ে যান
            </button>
          </div>

          {/* Sign Up Link */}
          <p className="mt-5 text-center text-sm">
            অ্যাকাউন্ট নেই?{" "}
            <a
              href="/sign-up"
              className="font-medium text-[#07883f] hover:underline"
            >
              সাইন আপ করুন
            </a>
          </p>
        </div>

        {/* Back to Home */}
        <div className="mt-6 text-center">
          <Link
            href="/"
            className="text-sm text-[#8a948b] transition hover:text-green-700"
          >
            ← হোম পেজে ফিরে যান
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
