import Footer from "@/components/reusables/footer";
import Navbar from "@/pages/user/navbar/navbar";
import Cart from "@/components/user/cart";
import useDocumentTitle from "@/hooks/useDocumentTitle";

export default function CartPage() {
  useDocumentTitle("Pharmacy | User Cart");
  return (
    <>
      <Navbar />
      <Cart />
      <Footer />
    </>
  );
}
