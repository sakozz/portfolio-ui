import {
  faArrowRightToBracket,
  faBlog,
  faContactBook,
  faContactCard,
  faIdCard,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

export const faIconsList = [
  faUser,
  faIdCard,
  faContactCard,
  faBlog,
  faContactBook,
  faArrowRightToBracket,
] as const;

export type FaIconType = (typeof faIconsList)[number];
