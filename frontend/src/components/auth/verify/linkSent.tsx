import emailIcon from "@/assets/icons/email-icon.svg";

export default function LinkSent() {
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-4 text-center">
        <img width={"50px"} src={emailIcon}></img>
        <h2 className="text-lg font-bold text-primBlue">
          Please Check Your Inbox
        </h2>
        <div className="flex flex-col gap-1 text-sm">
          <p>We've sent verification account link to your email</p>
          <p>If you don't see it, please check in the spam folder</p>
        </div>
      </div>
    </>
  );
}
