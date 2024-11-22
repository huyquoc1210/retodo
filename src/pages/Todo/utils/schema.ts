import Validator from 'utils/Validator';
import type { ObjectSchema } from 'yup';

export interface FormValues {
  title: string;
  description: string | null;
  isCompleted: boolean;
}

export const schema: ObjectSchema<FormValues> = Validator.shape({
  title: Validator.string().required(),
  description: Validator.string().optional(),
  isCompleted: Validator.boolean().default(false).required(),
});
