import { yupResolver } from '@hookform/resolvers/yup';
import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Form from 'components/Form/Form';
import FormSpacing from 'components/Form/FormSpacing';
import FormTextField from 'components/Form/FormTextField';
import { useFieldArray, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import Validator from 'utils/Validator';
import type { ObjectSchema } from 'yup';

interface FormValues {
  firstName: string;
  properties: {
    name: string;
    value: string;
  }[];
}

const schema: ObjectSchema<FormValues> = Validator.shape({
  firstName: Validator.string().required(),
  properties: Validator.array()
    .of(
      Validator.shape({
        name: Validator.string().required(),
        value: Validator.string().required(),
      })
    )
    .required(),
});

const CreateUser = () => {
  const { t } = useTranslation();

  const form = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: schema.getDefault(),
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'properties',
  });

  const handleSubmit = (data: FormValues) => {
    console.log(data);
  };

  const handleAddRow = () => {
    append({
      name: '',
      value: '',
    });
  };

  const handleDeleteRow = (index: number) => () => {
    remove(index);
  };

  return (
    <Card sx={{ p: 2 }}>
      <Form form={form} onSubmit={handleSubmit}>
        <FormSpacing>
          <FormTextField name="firstName" required label={t('First Name')} />
          <FormSpacing>
            {fields.map((field, index, self) => {
              return (
                <Box key={field.id}>
                  <Grid container spacing={2}>
                    <Grid item xs={4}>
                      <FormTextField
                        name={`properties.${index}.name`}
                        required
                        label={t('Name')}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <FormTextField
                        name={`properties.${index}.value`}
                        required
                        label={t('Value')}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <IconButton onClick={handleDeleteRow(index)}>
                        <ClearIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                </Box>
              );
            })}
          </FormSpacing>
          <Box>
            <Button startIcon={<AddIcon />} onClick={handleAddRow}>
              Add row
            </Button>
          </Box>
        </FormSpacing>
        <Box sx={{ mt: 3 }}>
          <LoadingButton fullWidth loading={false} size="medium" type="submit">
            Submit
          </LoadingButton>
        </Box>
      </Form>
    </Card>
  );
};

export default CreateUser;
