import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, type FieldValues, type UseFormProps } from 'react-hook-form';
import type { ObjectSchema } from 'yup';

const useSchemaForm = <T extends FieldValues, C = any>(
  schema: ObjectSchema<T>,
  props?: UseFormProps<T, C>
) => {
  const form = useForm<T, C>({
    mode: 'onChange',
    // @ts-ignore
    resolver: yupResolver(schema),
    defaultValues: schema.getDefault(),
    ...props,
  });

  return form;
};

export default useSchemaForm;
