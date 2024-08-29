import { useDispatch } from 'react-redux';
import { useMutation } from '@tanstack/react-query';
import { ClearCookie, LogoutUser } from '../dao/session.dao.ts';
import { sessionActions } from '../store/session.store.ts';
import { uiActions } from '../store/ui.store.ts';
import { Toast } from './toast-messages/toast-messages.tsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function LogoutBtn() {
  const dispatch = useDispatch();
  const { mutate } = useMutation({
    mutationFn: LogoutUser,
    onMutate: () => {
      // Any modifications before api call
    },
    onSuccess: () => {
      dispatch(sessionActions.clearSession());
      ClearCookie();

      dispatch(
        uiActions.addToast({
          toast: new Toast('Logged Out', 'Successfully logged out.', 'success'),
        }),
      );
      setTimeout(() => {
        window.location.href = '/';
      }, 1000);
    },
    onError: () => {
      dispatch(
        uiActions.addToast({
          toast: new Toast(
            'Failed to log out',
            'Sorry, Failed to log you out from the system.',
            'error',
          ),
        }),
      );
    },
  });

  function handleLogout() {
    mutate();
  }

  return (
    <button className="btn btn-primary btn-rounded" onClick={handleLogout}>
      <span>Logout</span>
      <FontAwesomeIcon icon="arrow-right-to-bracket" className="ms-2" />
    </button>
  );
}
