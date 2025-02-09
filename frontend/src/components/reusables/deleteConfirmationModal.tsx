import { CancelButton, SubmitButton } from "./formButton";
import warningIcon from "../../assets/icons/warning.svg";
import { useState } from "react";

interface propsSubmit {
  onSubmit: () => void;
}

export default function DeleteConfirmationModal(props: propsSubmit) {
  const [show, setShow] = useState(true);
  return (
    <>
      {show && (
        <div className="fixed left-0 top-0 flex h-screen w-screen items-center justify-center">
          <div className="fixed left-0 top-0 z-10 flex h-screen w-screen items-center justify-center bg-black opacity-80"></div>
          <div className="z-20 flex h-72 w-96 items-center justify-center rounded-xl bg-white p-5">
            <div className="flex h-full flex-col items-center justify-center gap-4">
              <img width={"64px"} src={warningIcon} alt="" />
              <div>
                <p className="text-center text-xl font-bold text-black">
                  Are you sure you want to delete?
                </p>
                <p className="text-center font-normal text-darkGray">
                  this will permanently delete the data and cannot be undone
                </p>
              </div>
              <div className="flex gap-8">
                <CancelButton onClick={() => setShow(false)} />
                <SubmitButton
                  className="bg-green-500 hover:bg-green-700"
                  child="Confirm"
                  onClick={props.onSubmit}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
