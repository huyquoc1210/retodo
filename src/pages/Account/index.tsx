import Box from '@mui/material/Box';
import PageBreadcrumbs from 'components/Page/PageBreadcrumbs';
import PageWrapper from 'components/Page/PageWrapper';
import useAuth from 'hooks/useAuth';
import { useTranslation } from 'react-i18next';

const Account = () => {
  const { t } = useTranslation();
  const auth = useAuth();

  return (
    <PageWrapper title={t('Account')}>
      <PageBreadcrumbs
        page={t('Account')}
        items={[{ title: t('Home'), href: '/' }]}
      />
      <Box>
        <pre>{JSON.stringify(auth, null, 2)}</pre>
      </Box>
    </PageWrapper>
  );
};

export default Account;
