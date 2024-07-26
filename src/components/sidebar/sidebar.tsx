import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { RootState } from "../../store/store.ts";
import NavMenu from "./nav-menu.tsx";

function Sidebar() {
  const {currentUser } = useSelector(
    (state: RootState) =>  state.session
  );

  return (
    <div className="flex flex-col  justify-between min-w-60 bg-yellow-500 px-4 py-8 gap-4">
      <div className="flex flex-col items-center gap-2">
        {currentUser?.avatarUrl && (
          <img
            src={currentUser.avatarUrl}
            alt="avatar image"
            className="w-32 rounded-full"
          />
        )}
        <h2 className="text-3xl">
          {`${currentUser?.firstName} ${currentUser?.lastName}`}
        </h2>
        <NavMenu />
      </div>
      <NavLink to="/auth">
        <FontAwesomeIcon icon="arrow-right-to-bracket" className="me-2" />
        <span>Login</span>
      </NavLink>
    </div>
  );
}

export default Sidebar;
