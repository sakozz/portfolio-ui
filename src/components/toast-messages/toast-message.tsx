import {
  faCheck,
  faCircleExclamation,
  faCircleInfo,
  faTriangleExclamation,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { uiActions } from '../../store/ui.store.ts';
import { Toast } from './toast-messages.tsx';

export default function ToastMessage({ toast }: { toast: Toast }) {
  const messages = () => {
    const message = toast.message || 'general.default_error';

    if (Array.isArray(message)) {
      return (
        <ul>
          {message.map((message) => (
            <li className="message">{message}</li>
          ))}
        </ul>
      );
    }

    if (typeof message === 'string') {
      return <p className="message">{message}</p>;
    }
  };

  const iconName = () => {
    switch (toast.type) {
      case 'success':
        return faCheck;
      case 'warning':
        return faCircleExclamation;
      case 'error':
        return faTriangleExclamation;
      default:
        return faCircleInfo;
    }
  };

  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      dispatch(uiActions.clearToast({ id: toast.id }));
    }, 3000);
  }, [dispatch, toast.id]);

  return (
    <div className={`toast-message ${toast.type}`}>
      <FontAwesomeIcon size="xl" icon={iconName()} className="me-2" />
      <div className="flex flex-col">
        <h4 className="title">{toast.title}</h4>
        {messages()}
      </div>
    </div>
  );
}
