import Box from '@mui/material/Box';
import PageBreadcrumbs from 'components/Page/PageBreadcrumbs';
import PageWrapper from 'components/Page/PageWrapper';
import { useTranslation } from 'react-i18next';

const Overview = () => {
  const { t } = useTranslation();

  return (
    <PageWrapper title={t('Overview')}>
      <PageBreadcrumbs
        page={t('Overview')}
        items={[{ title: t('Home'), href: '/' }]}
      />
      <Box>Overview</Box>
    </PageWrapper>
  );
};

export default Overview;
