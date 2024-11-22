import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import LoadingButton from '@mui/lab/LoadingButton';
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
import { useGetTodo, useUpdateTodo } from 'queries/todo';
import { useEffect } from 'react';
import type { Todo } from 'types/todo';
import { schema, type FormValues } from './utils/schema';

interface Props {
  open: boolean;
  onClose: VoidFunction;
  onRefresh?: VoidFunction;
  todo?: Todo | null;
}

const EditTodo = (props: Props) => {
  const { open, onClose, onRefresh, todo } = props;

  const setNotification = useNotification();

  const form = useSchemaForm(schema);

  const handleReset = () => {
    form.reset(schema.getDefault());
  };

  const updateTodo = useUpdateTodo();
  const { data: todoDetail } = useGetTodo({
    id: todo?.id,
    enabled: Boolean(todo),
  });

  useEffect(() => {
    if (!todoDetail) return;
    form.reset({
      title: todoDetail.title || '',
      description: todoDetail.description || '',
      isCompleted: todoDetail.isCompleted || false,
    });
  }, [form, todoDetail]);

  const handleSubmit = async (values: FormValues) => {
    if (!todoDetail) return;

    updateTodo.mutate(
      {
        id: todoDetail.id,
        payload: values,
      },
      {
        onSuccess: () => {
          onRefresh?.();
          onClose();
          setNotification({
            message: 'Todo was successfully updated',
          });
        },
        onError: () => {
          setNotification({
            error: 'Todo could not be updated, please try again later',
          });
        },
        onSettled: () => {
          handleReset();
        },
      }
    );
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      disableRestoreFocus
      PaperProps={{
        component: Form,
        form: form,
        onSubmit: handleSubmit,
      }}
    >
      <DialogTitle>Edit Todo</DialogTitle>
      <Box sx={{ p: 2.5 }}>
        <FormSpacing>
          <FormTextField name="title" required label="Title" autoFocus />
          <FormTextField
            name="description"
            label="Description"
            multiline
            rows={3}
          />
          <FormCheckbox name="isCompleted" label="Is completed" />
        </FormSpacing>
      </Box>
      <DialogActions>
        <Button onClick={onClose} startIcon={<CloseIcon />}>
          Cancel
        </Button>
        <LoadingButton
          type="submit"
          loading={updateTodo.isPending}
          loadingPosition="start"
          startIcon={<SaveIcon />}
        >
          Save
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default EditTodo;
