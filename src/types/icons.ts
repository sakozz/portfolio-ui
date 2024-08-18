import {
  faArrowRightToBracket,
  faBlog,
  faCalendarDays,
  faCheck,
  faCircleExclamation,
  faCircleInfo,
  faContactBook,
  faContactCard,
  faEnvelope,
  faIdCard,
  faMapLocationDot,
  faPassport,
  faPhone,
  faTriangleExclamation,
  faUser,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import {
  faGithub,
  faLinkedin,
  faStackOverflow,
} from "@fortawesome/free-brands-svg-icons";

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
  faEnvelope,
  faPhone,
  faMapLocationDot,
  faGithub,
  faLinkedin,
  faStackOverflow,
  faPassport,
  faCalendarDays,
  faXmark,
] as const;

export type FaIconType = (typeof faIconsList)[number];
