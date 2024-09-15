import { ReactNode, useEffect, useRef } from 'react';
import { randomId } from '../../lib/misc.ts';

export default function FormField({
  label,
  hint,
  prefix,
  error,
  children,
  className,
}: {
  label: string;
  hint?: string;
  prefix?: string;
  error?: string;
  className?: string;
  children: ReactNode;
}) {
  const controlRef = useRef();
  const id = randomId();
  useEffect(() => {
    const controlEl = controlRef.current;
    let control = controlEl.getElementsByTagName('input');
    if (control?.length < 1) {
      control = controlEl.getElementsByTagName('textarea');
    }
    if (control.length > 0) control[0].id = id;
  }, [id, controlRef]);

  return (
    <fieldset className={`${error ? 'invalid' : undefined} ${className}`}>
      <label className="form-label" htmlFor={id}>
        {label}
      </label>
      <div className={'input-group'} ref={controlRef}>
        {prefix && (
          <span className="bg-primary-50 rounded-s border-e border-primary-100 p-2 text-primary-500 text-sm font-light">
            {prefix}
          </span>
        )}
        {children}
      </div>
      {hint && <span className="text-sm text-primary-400">{hint}</span>}
      {error && <p className="text-red-600 text-sm">{error}</p>}
    </fieldset>
  );
}
