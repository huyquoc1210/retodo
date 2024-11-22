import {
  TimePicker,
  type TimePickerProps,
} from '@mui/x-date-pickers/TimePicker';
import type { Dayjs } from 'dayjs';
import { isEmpty } from 'lodash';
import { useController, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

interface Props extends TimePickerProps<Dayjs> {
  name: string;
}

const FormTime = (props: Props) => {
  const { name, ...rest } = props;

  const { t } = useTranslation();
  const { control } = useFormContext();

  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  return (
    <TimePicker
      slotProps={{
        textField: {
          error: !isEmpty(error),
          helperText: error?.message && t(error.message),
        },
      }}
      value={value}
      onChange={(date: Dayjs | null) => {
        onChange(date);
      }}
      onError={(error, value) => {
        console.log(error, value);
      }}
      {...rest}
    />
  );
};

export default FormTime;
