import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import LoadingButton from '@mui/lab/LoadingButton';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useNotification from 'hooks/useNotification';
import { useState } from 'react';
import { deleteTodo } from 'services/todo';
import type { Todo } from 'types/todo';

interface Props {
  open: boolean;
  onClose: VoidFunction;
  onRefresh?: VoidFunction;
  todo?: Todo | null;
}

const DeleteTodo = (props: Props) => {
  const { open, onClose, onRefresh, todo } = props;

  const setNotification = useNotification();
  const [loading, setLoading] = useState<boolean>(false);

  const handleDelete = async () => {
    if (!todo) return;

    try {
      setLoading(true);

      await deleteTodo(todo.id);

      onRefresh?.();
      onClose();
      setNotification({
        message: 'Todo was successfully deleted',
      });
    } catch (error) {
      console.log(error);
      setNotification({
        error: 'Todo could not be deleted, please try again later',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm">
      <DialogTitle>Delete Todo</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete <strong>{todo?.title}</strong>?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} startIcon={<CloseIcon />}>
          Cancel
        </Button>
        <LoadingButton
          type="submit"
          loading={loading}
          loadingPosition="start"
          color="error"
          startIcon={<SaveIcon />}
          onClick={handleDelete}
        >
          Confirm
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteTodo;
