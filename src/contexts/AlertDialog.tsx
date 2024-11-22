import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import LoadingButton from '@mui/lab/LoadingButton';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import config from 'config';
import useNotification from 'hooks/useNotification';
import {
  createContext,
  useCallback,
  useState,
  type ReactNode,
  type SyntheticEvent,
} from 'react';
import type { FCC } from 'types/react';
import { noop, sleep } from 'utils/misc';

interface Options {
  title: string;
  content: ReactNode;
  onSubmit?: () => void | Promise<void>;
}

type ContextValue = (option: Options) => void;

const AlertDialogContext = createContext<ContextValue | null>(null);

if (config.__DEV__) {
  AlertDialogContext.displayName = 'AlertDialogContext';
}

const initialOption: Options = {
  title: '',
  content: null,
  onSubmit: noop,
};

const AlertDialogProvider: FCC = (props) => {
  const { children } = props;

  const setNotification = useNotification();
  const [open, setOpen] = useState<boolean>(false);
  const [options, setOptions] = useState<Options>(initialOption);
  const [loading, setLoading] = useState<boolean>(false);

  const { title, content, onSubmit } = options;

  const setAlertDialog = useCallback((payload: Options) => {
    setOptions(payload);
    setOpen(true);
  }, []);

  const handleReset = async () => {
    await sleep(450);
    setOptions(initialOption);
  };

  const handleClose = (event: SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') return;
    setOpen(false);
    handleReset();
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      await onSubmit?.();
      handleReset();
    } catch (error: any) {
      setNotification({
        error: error.message,
      });
    } finally {
      setLoading(false);
      setOpen(false);
      handleReset();
    }
  };

  return (
    <AlertDialogContext.Provider value={setAlertDialog}>
      {children}
      <Dialog open={open} onClose={handleClose} maxWidth="sm">
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{content}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} startIcon={<CloseIcon />}>
            Cancel
          </Button>
          <LoadingButton
            type="submit"
            loading={loading}
            loadingPosition="start"
            color="error"
            startIcon={<SaveIcon />}
            onClick={handleSubmit}
          >
            Confirm
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </AlertDialogContext.Provider>
  );
};

export { AlertDialogProvider };
export default AlertDialogContext;
