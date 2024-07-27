import {
  faArrowRightToBracket,
  faBlog, faCheck,
  faCircleExclamation,
  faCircleInfo,
  faContactBook,
  faContactCard,
  faIdCard,
  faTriangleExclamation,
  faUser,
  faXmark
} from "@fortawesome/free-solid-svg-icons";

export const faIconsList = [
  faUser,
  faIdCard,
  faContactCard,
  faBlog,
  faContactBook,
  faArrowRightToBracket,
  faCircleInfo,
  faXmark,
  faTriangleExclamation,
  faCircleExclamation,
  faCheck,
] as const;

export type FaIconType = (typeof faIconsList)[number];
