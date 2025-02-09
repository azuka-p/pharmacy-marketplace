export default function OnEnterKey(
  e: React.KeyboardEvent<HTMLInputElement>,
  func: () => void,
) {
  if (e.key === "Enter") {
    func();
  }
}
