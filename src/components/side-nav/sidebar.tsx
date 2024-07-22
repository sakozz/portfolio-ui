import { NavLink } from "react-router-dom";

import classes from "./sidebar.module.css";

function Sidebar() {
  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              end
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/resume"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Resume
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/blogs"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Blogs
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Sidebar;
