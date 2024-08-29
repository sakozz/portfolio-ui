import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";
import styles from "./nav-menu.module.scss";

export default function NavMenu() {
  return (
    <nav>
      <ul className="flex flex-col gap-2">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? styles.active : undefined)}
            end
          >
            <FontAwesomeIcon icon="user" className="me-2" />
            <span>About Me</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/resume"
            className={({ isActive }) => (isActive ? styles.active : undefined)}
          >
            <FontAwesomeIcon icon="id-card" className="me-2" />
            <span>Resume</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/blogs"
            className={({ isActive }) => (isActive ? styles.active : undefined)}
          >
            <FontAwesomeIcon icon="blog" className="me-2" />
            <span>Blogs</span>
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/contact"
            className={({ isActive }) => (isActive ? styles.active : undefined)}
          >
            <FontAwesomeIcon icon="contact-book" className="me-2" />
            <span>Contact Me</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
