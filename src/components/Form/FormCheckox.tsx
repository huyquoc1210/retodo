import Checkbox from '@mui/material/Checkbox';
import FormControl, { type FormControlProps } from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import type { ReactNode } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

interface Props extends FormControlProps {
  name: string;
  label?: ReactNode;
}

const FormCheckbox = (props: Props) => {
  const { name, label, ...rest } = props;
  const { control } = useFormContext();
  const { t } = useTranslation();

  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  return (
    <FormControl error={Boolean(error)} variant="standard" {...rest}>
      <FormControlLabel
        control={<Checkbox checked={value} onChange={onChange} name={name} />}
        label={label}
      />
      {error?.message && <FormHelperText>{t(error.message)}</FormHelperText>}
    </FormControl>
  );
};

export default FormCheckbox;
