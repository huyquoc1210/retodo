import Box, { type BoxProps } from '@mui/material/Box';
import type {
  FieldValues,
  SubmitErrorHandler,
  SubmitHandler,
  UseFormReturn,
} from 'react-hook-form';
import { FormProvider } from 'react-hook-form';

interface Props<T extends FieldValues, C = any>
  extends Omit<BoxProps<'form'>, 'onSubmit' | 'onError'> {
  form: UseFormReturn<T, C>;
  onSubmit: SubmitHandler<T>;
  onError?: SubmitErrorHandler<T>;
}

const Form = <T extends FieldValues, C = any>(props: Props<T, C>) => {
  const { form, onSubmit, onError, ...rest } = props;

  return (
    <FormProvider {...form}>
      <Box
        component="form"
        noValidate
        onSubmit={form.handleSubmit(onSubmit, onError)}
        {...rest}
      />
    </FormProvider>
  );
};

export default Form;
