import Box from '@mui/material/Box';
import PageBreadcrumbs from 'components/Page/PageBreadcrumbs';
import PageWrapper from 'components/Page/PageWrapper';
import CreateUser from './CreateUser';

const User = () => {
  return (
    <PageWrapper>
      <PageBreadcrumbs page="User" items={[{ title: 'Home', href: '/' }]} />
      <Box>
        <CreateUser />
      </Box>
    </PageWrapper>
  );
};

export default User;
