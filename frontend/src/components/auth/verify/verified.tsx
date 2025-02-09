import verifiedIcon from "@/assets/icons/verified-icon.svg";

const VerifiedMessage= () => {
  return (
    <>
      <div className="flex w-full flex-col items-center justify-center gap-4">
        <img width={"50px"} src={verifiedIcon} alt="verfied icon"></img>
        You've already verified
      </div>
    </>
  );
};

export default VerifiedMessage;
