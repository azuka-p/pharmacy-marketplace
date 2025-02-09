import emptyBox from "../../../assets/icons/empty-box.svg";

export default function EmptyData() {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-4 p-20">
      <img className="w-60" src={emptyBox} alt="" />
      <h2 className="text-center text-3xl">No Data Found</h2>
    </div>
  );
}
