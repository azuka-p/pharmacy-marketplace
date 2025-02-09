import emptyDrugIcon from "@/assets/icons/empty-drug-icon.svg";
export default function NotFound() {
  return (
    <>
      <div className="jus w-screens m-auto flex h-screen min-w-[200px] flex-col">
        <div className="mx-auto my-auto text-center">
          <h1 className="text-9xl">404</h1>
          <p className="text-lg lg:text-xl">Opps, This Page Not Found!</p>
          <p className="text-md my-6 lg:text-lg">
            You must have mistyped the address.
          </p>
          <img
            src={emptyDrugIcon}
            className="my-8 aspect-auto w-full xl:max-w-[300px]"
            alt="empty drug icon"
          />
        </div>
      </div>
    </>
  );
}
