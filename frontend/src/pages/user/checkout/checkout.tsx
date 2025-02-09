import Navbar from "@/pages/user/navbar/navbar";
import Checkout from "./component/checkout";
import Footer from "@/components/reusables/footer";
import useDocumentTitle from "@/hooks/useDocumentTitle";

export default function CheckoutPage() {
  useDocumentTitle("Pharmacy | User Checkout");
  return (
    <>
      <Navbar />
      <Checkout />
      <Footer />
    </>
  );
}
