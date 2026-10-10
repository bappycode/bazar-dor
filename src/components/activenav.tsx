'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Product {
  id: string;
  slug: string;
  icon: string;
  nameBn: string;
}

interface ActiveNavLinksProps {
  category: Product[];
}

const ActiveNav = ({category}: ActiveNavLinksProps) => {
    const pathname = usePathname()

    return (
        <nav className="mt-5 flex w-full min-w-0 flex-nowrap justify-start gap-2 overflow-x-auto overscroll-x-contain sm:justify-center sm:gap-5">
      {category.map((n) => {
        const href = `/category/${n.slug}`;
        const isActive =
          pathname === href || pathname.startsWith(`${href}/`);

        return (
          <Link
            href={href}
            key={n.id}
            aria-current={isActive ? "page" : undefined}
            className={`shrink-0 whitespace-nowrap rounded-md px-3 py-2 transition-colors ${
              isActive
                ? "bg-green-700 font-semibold text-white"
                : "text-neutral-700 hover:bg-red-50 hover:text-green-700"
            }`}
          >
            {n.icon} {n.nameBn}
          </Link>
        );
      })}
    </nav>
    );
};

export default ActiveNav;
