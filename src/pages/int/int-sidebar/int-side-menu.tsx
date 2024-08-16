import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";
import styles from "./nav-menu.module.scss";

export default function IntSideMenu() {
  return (
    <nav>
      <ul className="flex flex-col gap-4">
        <li>
          <NavLink
            to="/int"
            className={({ isActive }) => (isActive ? styles.active : undefined)}
            end
          >
            <div className={"flex flex-col gap-2 items-center text-md"}>
              <FontAwesomeIcon icon="user" className="me-2" />
              <span>Overview</span>
            </div>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/settings"
            className={({ isActive }) => (isActive ? styles.active : undefined)}
          >
            <div className={"flex flex-col gap-2 items-center text-md"}>
              <FontAwesomeIcon icon="id-card" className="me-2" />
              <span>Settings</span>
            </div>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
