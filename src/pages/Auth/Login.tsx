import { yupResolver } from '@hookform/resolvers/yup';
import LockIcon from '@mui/icons-material/Lock';
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Form from 'components/Form/Form';
import FormSpacing from 'components/Form/FormSpacing';
import FormTextField from 'components/Form/FormTextField';
import PageTitle from 'components/Page/PageTitle';
import useAuth from 'hooks/useAuth';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Link as RouteLink } from 'react-router-dom';
import { useTypedSelector } from 'store';
import Validator from 'utils/Validator';
import * as yup from 'yup';

interface FormValues {
  username: string;
  password: string;
}

const schema = yup.object({
  username: Validator.string().required(),
  password: Validator.string().required(),
});

const Login = () => {
  const { t } = useTranslation();
  const { login } = useAuth();

  const notification = useTypedSelector((state) => state.notification);

  useEffect(() => {
    console.log(notification);
  }, [notification]);

  const form = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: schema.getDefault(),
  });

  const handleSubmit = async (data: FormValues) => {
    try {
      await login(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <PageTitle title={t('Login')}>
      <Card>
        <CardContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <LockIcon fontSize="medium" color="primary" />
          <Typography variant="h6" sx={{ mt: 1 }}>
            Retodo
          </Typography>
        </CardContent>
        <CardContent>
          <Form form={form} onSubmit={handleSubmit}>
            <FormSpacing>
              <FormTextField
                name="username"
                required
                label={t('Username')}
                autoFocus
              />
              <FormTextField name="password" required label={t('Password')} />
            </FormSpacing>
            <Box sx={{ mt: 3 }}>
              <LoadingButton
                fullWidth
                loading={false}
                size="medium"
                type="submit"
              >
                Sign In
              </LoadingButton>
            </Box>
          </Form>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              mt: 3,
            }}
          >
            <Link
              component={RouteLink}
              to="/auth/forgot-password"
              variant="body2"
            >
              Forgot password?
            </Link>
            <Link component={RouteLink} to="/auth/register" variant="body2">
              Don't have an account? Sign Up
            </Link>
          </Box>
        </CardContent>
      </Card>
      <CopyRight />
    </PageTitle>
  );
};

const CopyRight = () => {
  return (
    <Box sx={{ mt: 3, textAlign: 'center' }}>
      <Typography variant="subtitle2">
        Retodo{' '}
        <Typography variant="body2" component="span">
          is developed by{' '}
        </Typography>
        <Link
          href="#"
          target="_blank"
          variant="inherit"
          sx={{ color: 'error.main', fontWeight: 'medium' }}
        >
          Quốc Huy
        </Link>
      </Typography>
    </Box>
  );
};

export default Login;
