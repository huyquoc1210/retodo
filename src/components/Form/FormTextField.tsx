import TextField, { type TextFieldProps } from '@mui/material/TextField';
import isEmpty from 'lodash.isempty';
import { useController, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

interface Props extends Omit<TextFieldProps<'outlined'>, 'variant'> {
  name: string;
}

const FormTextField = (props: Props) => {
  const { name, ...rest } = props;
  const { control } = useFormContext();
  const { t } = useTranslation();

  const {
    field: { ref, ...others },
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  return (
    <TextField
      inputRef={ref}
      error={!isEmpty(error)}
      helperText={error?.message && t(error.message)}
      {...others}
      {...rest}
    />
  );
};

export default FormTextField;
