import { ReactNode } from 'react';

export default function SwitchInput({
  children,
  register,
  error,
}: {
  children: ReactNode;
  register: Record<string, unknown>;
  error: string;
}) {
  const handleChange = (event: React.ChangeEvent) => {
    console.log(event);
  };
  return (
    <>
      <label className={'flex flex-row gap-2 items-center'}>
        <div className={'switch'}>
          <input
            {...register}
            className="switch-input"
            type="checkbox"
            onChange={(event) => handleChange(event)}
          />
          <span className="slider"></span>
        </div>
        <span className="description">{children}</span>
      </label>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </>
  );
}
