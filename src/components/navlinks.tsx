import { API_BASE_URL, ApiResponseError, fetchApiJson } from "@/lib/api";
import ActiveNav from "./activenav";


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
        <ActiveNav category={data}/>
    );
};

export default NavLinks;