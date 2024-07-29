import { ReactNode } from "react";

export default function FormField({
  label,
  error,
  children,
}: {
  label: string;
  error: string;
  children: ReactNode;
}) {
  return (
    <fieldset className={`${error ? "invalid" : undefined}`}>
      <label className="form-label mb-2 text-sm text-dark-50" htmlFor={label}>
        {label}
      </label>
      <div className={"input-group"}>{children}</div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </fieldset>
  );
}
