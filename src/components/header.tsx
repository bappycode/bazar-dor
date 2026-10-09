import Image from "next/image";
import Link from "next/link";
import { connection } from "next/server";
import NavLinks from "./navlinks";

const Header = async () => {
  await connection();

  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });

  return (
    <header className="relative mx-auto w-full max-w-7xl px-4 py-5 sm:px-8 gap-10">
      <div className="flex gap-2">
        <Link href={'/'}>
        <div className="flex h-16 w-16 items-center justify-center rounded-md bg-green-700">
          <Image
            src="/logo-icon.png"
            width={40}
            height={40}
            alt="বাজার দর লোগো"
            className="h-10 w-10 object-contain"
          />
        </div>
        </Link>
        <div>
          <h2>বাজার দর</h2>
          <p>{date}</p>
        </div>
        <div className="absolute right-4 top-4 flex items-center gap-3 text-sm sm:right-8">
          <Link href={'/sign-in'}>
          <button className="btn btn-ghost text-neutral-700 transition-colors hover:text-green-700">
            সাইন ইন
          </button>
          </Link>
          <Link href={'/sign-up'}>
          <button className="btn bg-green-700 px-3 py-1.5 font-semibold text-white transition-colors hover:bg-green-800">
            সাইন আপ
          </button>
          </Link>
        </div>
      </div>
      <NavLinks/>
    </header>
  );
};

export default Header;
