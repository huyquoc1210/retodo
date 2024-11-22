import {
  DatePicker,
  type DatePickerProps,
} from '@mui/x-date-pickers/DatePicker';
import type { Dayjs } from 'dayjs';
import { isEmpty } from 'lodash';
import { useController, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

interface Props extends DatePickerProps<Dayjs> {
  name: string;
  onSelect?: (date: Dayjs | null) => void;
}

const FormDate = (props: Props) => {
  const { name, onSelect, ...rest } = props;

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
    <DatePicker
      slotProps={{
        textField: {
          error: !isEmpty(error),
          helperText: error?.message && t(error.message),
        },
      }}
      value={value}
      onChange={(date: Dayjs | null) => {
        onChange(date);
        onSelect?.(date);
      }}
      onError={(error, value) => {
        console.log(error, value);
      }}
      {...rest}
    />
  );
};

export default FormDate;
