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
import { useState } from 'react';
import { createTodo } from 'services/todo';
import { schema, type FormValues } from './utils/schema';

interface Props {
  open: boolean;
  onClose: VoidFunction;
  onRefresh?: VoidFunction;
}

const CreateTodo = (props: Props) => {
  const { open, onClose, onRefresh } = props;

  const setNotification = useNotification();
  const [loading, setLoading] = useState<boolean>(false);

  const form = useSchemaForm(schema);

  const handleReset = () => {
    form.reset(schema.getDefault());
  };

  const handleSubmit = async (values: FormValues) => {
    try {
      setLoading(true);
      await createTodo(values);

      onRefresh?.();
      onClose();
      setNotification({
        message: 'Todo was successfully created',
      });
    } catch (error) {
      console.log(error);
      setNotification({
        error: 'Todo could not be deleted, please try again later',
      });
    } finally {
      setLoading(false);
      handleReset();
    }
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
      <DialogTitle>Create Todo</DialogTitle>
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
          loading={loading}
          loadingPosition="start"
          startIcon={<SaveIcon />}
        >
          Save
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default CreateTodo;
