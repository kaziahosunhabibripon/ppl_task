type OptionChoiceProps = {
  checked: boolean;
  label: string;
  name: string;
  onChange: () => void;
};

export function OptionChoice({ checked, label, name, onChange }: OptionChoiceProps) {
  return (
    <label
      className={`flex cursor-pointer items-center gap-3 rounded-md border p-3 text-sm transition ${
        checked
          ? "border-sky-500 bg-sky-50 text-sky-950"
          : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
      }`}
    >
      <input
        checked={checked}
        className="h-4 w-4 accent-sky-600"
        name={name}
        onChange={onChange}
        type="radio"
      />
      <span>{label}</span>
    </label>
  );
}
