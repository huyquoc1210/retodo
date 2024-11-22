import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Form from 'components/Form/Form';
import FormCheckbox from 'components/Form/FormCheckox';
import FormSpacing from 'components/Form/FormSpacing';
import FormTextField from 'components/Form/FormTextField';
import useNotification from 'hooks/useNotification';
import useSchemaForm from 'hooks/useSchemaForm';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { getTodo } from 'services/todo';
import type { Todo } from 'types/todo';
import { schema } from './utils/schema';

interface Props {
  open: boolean;
  onClose: VoidFunction;
  onEdit: (todo: Todo) => VoidFunction;
  todo?: Todo | null;
}

const DetailTodo = (props: Props) => {
  const { open, onClose, onEdit, todo } = props;

  const setNotification = useNotification();
  const { t } = useTranslation();

  const form = useSchemaForm(schema);

  const handleReset = () => {
    onClose();
    form.reset(schema.getDefault());
  };

  useEffect(() => {
    if (!todo) return;
    getTodo(todo.id)
      .then((response) => {
        const { data } = response;
        form.reset({
          title: data.title || '',
          description: data.description || '',
          isCompleted: data.isCompleted || false,
        });
      })
      .catch((error: any) => {
        setNotification({
          error: t(error.messageCode, { ns: 'todo' }),
        });
      });
  }, [form, todo, t, setNotification]);

  const handleEditTodo = () => {
    if (!todo) return;
    handleReset();
    onEdit(todo)();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        component: Form,
        form: form,
        onSubmit: async () => {},
      }}
    >
      <DialogTitle>Create Todo</DialogTitle>
      <Box sx={{ p: 2.5 }}>
        <FormSpacing>
          <FormTextField name="title" required label="Title" disabled />
          <FormTextField
            name="description"
            label="Description"
            multiline
            rows={3}
            disabled
          />
          <FormCheckbox name="isCompleted" label="Is completed" disabled />
        </FormSpacing>
      </Box>
      <DialogActions>
        <Button onClick={handleReset} startIcon={<CloseIcon />}>
          Close
        </Button>
        <Button startIcon={<EditIcon />} onClick={handleEditTodo}>
          Edit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DetailTodo;
