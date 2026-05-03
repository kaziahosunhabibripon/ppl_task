type OptionChoiceProps = {
  checked: boolean;
  label: string;
  name: string;
  onChange: () => void;
};

export function OptionChoice({ checked, label, name, onChange }: OptionChoiceProps) {
  return (
    <label
      className={`flex min-h-12 cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-sm transition ${
        checked
          ? "border-fuchsia-500 bg-white text-slate-950 shadow-[inset_0_-2px_0_rgba(162,0,255,0.18)]"
          : "border-white bg-white text-slate-700 hover:border-fuchsia-200"
      }`}
    >
      <input
        checked={checked}
        className="h-4 w-4 accent-fuchsia-700"
        name={name}
        onChange={onChange}
        type="radio"
      />
      <span>{label}</span>
    </label>
  );
}
