import Link from "next/link";
import { API_BASE_URL, ApiResponseError, fetchApiJson } from "@/lib/api";

interface Product {
    id: string
    slug: string
    icon: string
    nameBn: string
}

const NavLinks = async () => {
    let data: Product[];
    try {
        data = await fetchApiJson<Product[]>(`${API_BASE_URL}/api/bazardor/categories`);
    } catch (error) {
        if (!(error instanceof ApiResponseError)) {
            throw error;
        }

        return (
            <p className="mt-5 text-center text-sm text-neutral-500" role="status">
                বিভাগগুলোর তালিকা এখন লোড করা যাচ্ছে না।
            </p>
        );
    }

    return (
        <div className="flex gap-5 justify-center mt-5">
            {data.map((n) => <Link href={`/category/${n.slug}`} key={n.id}>{n.icon}{n.nameBn}</Link>)}
        </div>
    );
};

export default NavLinks;