type OptionChoiceProps = {
  checked: boolean;
  label: string;
  name: string;
  onChange: () => void;
};

export function OptionChoice({ checked, label, name, onChange }: OptionChoiceProps) {
  return (
    <label
      className={`flex min-h-11 cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-sm font-medium transition ${
        checked
          ? "border-emerald-300 bg-white text-slate-950"
          : "border-white bg-white text-slate-700 hover:border-slate-200"
      }`}
    >
      <input
        checked={checked}
        className="h-4 w-4 accent-emerald-500"
        name={name}
        onChange={onChange}
        type="radio"
      />
      <span>{label}</span>
    </label>
  );
}
