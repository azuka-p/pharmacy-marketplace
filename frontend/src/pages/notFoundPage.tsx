import NotFound from "@/components/reusables/notFound";
import useDocumentTitle from "@/hooks/useDocumentTitle";

function NotFoundPage() {
  useDocumentTitle("Not Found");
  return (
    <>
      <NotFound />
    </>
  );
}

export default NotFoundPage;
