import emptyDrugIcon from "../../assets/icons/empty-drug-icon.svg";
export default function NoOrders() {
  return (
    <>
      <div className="jus w-screens m-auto my-4 flex min-w-[200px] flex-col">
        <div className="mx-auto my-auto text-center">
          <p className="text-lg font-bold lg:text-xl">No orders</p>
          <p className="text-md lg:text-lg">Browse our catalogs!</p>
          <div className="flex w-full justify-center">
            <img
              src={emptyDrugIcon}
              className="my-4 aspect-auto xl:max-w-[300px]"
              alt="empty drug icon"
            />
          </div>
        </div>
      </div>
    </>
  );
}
