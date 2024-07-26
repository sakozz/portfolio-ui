import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMutation } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { ErrorResponse, NavLink } from "react-router-dom";
import { ClearCookie, LogoutUser } from "../../dao/session.dao.ts";
import { sessionActions } from "../../store/session.store.ts";
import { RootState } from "../../store/store.ts";
import NavMenu from "./nav-menu.tsx";

function Sidebar() {
  const { currentUser } = useSelector((state: RootState) => state.session);
  const dispatch =useDispatch()
  const {mutate} = useMutation({
    mutationFn: LogoutUser,
    onMutate: ()=>{
      // Any modifications before api call
    },
    onSuccess: ()=>{
      dispatch(sessionActions.clearSession());
      ClearCookie()
       window.location.href = '/';
    },
    onError: (error: ErrorResponse) => {
      console.log(error);
    }
  })

  function handleLogout(){
    mutate();
  }

  const authLink = currentUser?.id ? (
    <button className="btn btn-outline btn-rounded" onClick={handleLogout}>
      <FontAwesomeIcon icon="arrow-right-to-bracket" className="me-2" />
      <span>Logout</span>
    </button>
  ) : (
    <NavLink to="/auth">
      <button className="btn btn-outline btn-rounded w-full">
        <FontAwesomeIcon icon="arrow-right-to-bracket" className="me-2" />
        <span>Login</span>
      </button>
    </NavLink>
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
      {authLink}
    </div>
  );
}

export default Sidebar;
