import emptyDrugIcon from "../../../assets/icons/empty-drug-icon.svg";
export default function NoProduct() {
  return (
    <>
      <div className="jus w-screens m-auto flex min-w-[200px] flex-col">
        <div className="mx-auto my-auto text-center">
          <p className="text-lg font-bold lg:text-xl">
            Oops, no product found 25km from you!
          </p>
          <p className="text-md my-4 lg:text-lg">Try changing the address</p>
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
