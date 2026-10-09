import MarqueeText from "react-marquee-text";
import Link from "next/link";
import { API_BASE_URL, ApiResponseError, fetchApiJson } from "@/lib/api";

interface Product {
  id: number;
  slug: string;
  nameBn: string;
  unit: string;
  image: string;
  today: number;
  change: {
    dir: "up" | "down";
    pct: number;
  };
}

const Marquee = async () => {
  let data: Product[];
  try {
    data = await fetchApiJson<Product[]>(
      `${API_BASE_URL}/api/bazardor/products`,
    );
  } catch (error) {
    if (!(error instanceof ApiResponseError)) {
      throw error;
    }
    return null;
  }

  return (
    <div className="bg-white px-4 py-2 text-black">
      <div className="mx-auto flex max-w-full">
        <MarqueeText direction="right" duration={10} pauseOnHover>
          {data.map((n) => (
            <Link
              className="hover:not-focus:"
              href={`/product/${n.slug}`}
              key={n.id}
            >
              <span>
                {n.image} {n.nameBn}
              </span>

              <span className="mx-5">
                {n.today.toLocaleString("bn-BD")} টাকা/
                {{
                  dozen: "ডজন",
                  kg: "কেজি",
                  litre: "লিটার",
                  piece: "পিস",
                }[n.unit] ?? n.unit}
              </span>

              <span
                className={
                  n.change.dir === "up" ? "text-red-600" : "text-green-600"
                }
              >
                {n.change.dir === "up" ? "▲" : "▼"} {n.change.pct.toLocaleString("bn-BD")}%
              </span>

              <span className="mx-5">|</span>
            </Link>
          ))}
        </MarqueeText>
      </div>
    </div>
  );
};

export default Marquee;
