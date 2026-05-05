import { Input } from "@/components/atoms/Input";
import { Label } from "@/components/atoms/Label";

type FormFieldProps = {
  id: string;
  label: string;
  name: string;
  type?: string;
  value: string;
  error?: string;
  placeholder?: string;
  onChange: (value: string) => void;
};

export function FormField({
  id,
  label,
  name,
  type = "text",
  value,
  error,
  placeholder,
  onChange,
}: FormFieldProps) {
  return (
    <div className="grid gap-2">
      <Label htmlFor={id}>{label}</Label>
      <Input
        aria-describedby={error ? `${id}-error` : undefined}
        aria-invalid={Boolean(error)}
        hasError={Boolean(error)}
        id={id}
        name={name}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        type={type}
        value={value}
      />
      {error ? (
        <p className="text-sm font-medium text-red-600" id={`${id}-error`}>
          {error}
        </p>
      ) : null}
    </div>
  );
}
