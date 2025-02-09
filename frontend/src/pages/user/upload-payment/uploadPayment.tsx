import Footer from "@/components/reusables/footer";
import { Input } from "@/components/ui/input";
import Navbar from "../navbar/navbar";
import useDocumentTitle from "@/hooks/useDocumentTitle";

export default function UploadPayment() {
  useDocumentTitle("Pharmacy | User Upload Payment");
  return (
    <>
      <Navbar />
      <div className="flex justify-center">
        <div>
          <p className="text-xl font-bold">Finish your payment in</p>
          <p>Upload your payment</p>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Input id="picture" type="file" />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
