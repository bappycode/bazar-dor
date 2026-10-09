import Image from "next/image";
import Link from "next/link";
import { connection } from "next/server";
import NavLinks from "./navlinks";
import UserInfo from "./userInfo";

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
        <UserInfo/>
      </div>
      <NavLinks/>
    </header>
  );
};

export default Header;
