import MultipleSearchSelector from "@/components/reusables/multipleSearchSelector";

const data = [
  {
    label: "pharmacist11111111111111111111111111111111",
    value: "Pharmacist1",
    group: "pharmacyZ",
  },
  { label: "pharmacist2", value: "Pharmacist2", group: "pharmacy,Z" },
  { label: "pharmacist3", value: "Pharmacist3", group: "pharmacy,X" },
  { label: "pharmacist4", value: "Pharmacist4", group: "pharmacy,X" },
  { label: "pharmacist5", value: "Pharmacist5", group: "pharmacy,K" },
  { label: "pharmacist6", value: "Pharmacist6", group: "pharmacy,L" },
  { label: "pharmacist7", value: "Pharmacist7", group: "pharmacy,Q" },
  { label: "pharmacist8", value: "Pharmacist8", group: "pharmacy,Q" },
  { label: "pharmacist9", value: "Pharmacist9", group: "pharmacy,W" },
  { label: "pharmacist10", value: "Pharmacist10", group: "pharmacy,W" },
];
export function ExampleMultipleSelector() {
  return (
    <>
      <div className="w-[500px] bg-slate-100">
        <MultipleSearchSelector
          options={data}
          groupBy="group"
          searchPlaceholder="What do you want to search?"
          maxSelected={2}
        />
      </div>
    </>
  );
}
