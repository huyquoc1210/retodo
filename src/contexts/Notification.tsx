import Alert, { type AlertProps } from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import config from 'config';
import {
  createContext,
  useCallback,
  useState,
  type SyntheticEvent,
} from 'react';
import type { FCC } from 'types/react';
import { sleep } from 'utils/misc';

type Message =
  | {
      message: string | null;
      error?: string | null;
      type?: AlertProps['severity'];
    }
  | {
      error: string | null;
      message?: string | null;
      type?: AlertProps['severity'];
    };

type ContextValue = (message: Message) => void;

const NotificationContext = createContext<ContextValue | null>(null);

if (config.__DEV__) {
  NotificationContext.displayName = 'NotificationContext';
}

const initialMessage: Message = {
  message: null,
  error: null,
  type: 'success',
};

const NotificationProvider: FCC = (props) => {
  const { children } = props;

  const [open, setOpen] = useState<boolean>(false);
  const [content, setContent] = useState<Message>(initialMessage);

  const setNotification = useCallback((payload: Message) => {
    const { message, error } = payload;
    if (!message && !error) return;

    setContent(payload);
    setOpen(true);
  }, []);

  const handleReset = async () => {
    await sleep(450);
    setContent(initialMessage);
  };

  const handleClose = (event: SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') return;
    setOpen(false);
    handleReset();
  };

  const { message, error, type } = content;

  return (
    <NotificationContext.Provider value={setNotification}>
      {children}
      <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleClose}
          severity={error ? 'error' : type}
          sx={{ width: 1 }}
        >
          {error || message}
        </Alert>
      </Snackbar>
    </NotificationContext.Provider>
  );
};

export { NotificationProvider };
export default NotificationContext;
