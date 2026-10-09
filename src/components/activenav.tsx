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
        <nav className="mt-5 flex justify-center gap-5">
      {category.map((n) => {
        const href = `/category/${n.slug}`;
        const isActive =
          pathname === href || pathname.startsWith(`${href}/`);

        return (
          <Link
            href={href}
            key={n.id}
            aria-current={isActive ? "page" : undefined}
            className={`rounded-md px-3 py-2 transition-colors ${
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
