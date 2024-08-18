import { ReactNode, useEffect, useRef } from "react";
import { randomId } from "../../lib/misc.ts";

export default function FormField({
  label,
  hint,
  error,
  children,
}: {
  label: string;
  hint?: string;
  error: string;
  children: ReactNode;
}) {
  const controlRef = useRef();
  const id = randomId();
  useEffect(() => {
    const controlEl = controlRef.current;
    let control = controlEl.getElementsByTagName("input");
    if (control?.length < 1) {
      control = controlEl.getElementsByTagName("textarea");
    }
    if (control.length > 0) control[0].id = id;
  }, [id, controlRef]);

  return (
    <fieldset className={`${error ? "invalid" : undefined}`}>
      <label className="form-label mb-2 text-dark-50" htmlFor={id}>
        {label}
      </label>
      <div className={"input-group"} ref={controlRef}>
        {children}
      </div>
      {hint && <span className="text-sm text-dark-60">{hint}</span>}
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </fieldset>
  );
}
