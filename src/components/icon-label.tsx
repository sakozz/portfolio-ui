import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

export default function IconLabel({ icon, label }: { icon: IconProp; label: string }) {
  const labelText = () => {
    return label.startsWith('https') ? (
      <a href={label} className="font-light text-secondary-50" target="_blank">
        {label}
      </a>
    ) : (
      <span>{label}</span>
    );
  };
  return (
    label && (
      <div className="flex flex-row items-center leading-tight">
        <FontAwesomeIcon icon={icon} className="me-2" />
        {labelText()}
      </div>
    )
  );
}
