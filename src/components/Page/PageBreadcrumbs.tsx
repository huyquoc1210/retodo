import Box from '@mui/material/Box';
import Breadcrumbs, { breadcrumbsClasses } from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { Link as RouteLink } from 'react-router-dom';

interface BreadCrumb {
  title: string;
  href: string;
}

interface Props {
  items: BreadCrumb[];
  page: string;
}

const PageBreadcrumbs = (props: Props) => {
  const { page, items } = props;

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Breadcrumbs
        separator={
          <Typography
            component="span"
            variant="body2"
            sx={{ color: 'text.secondary' }}
          >
            /
          </Typography>
        }
        sx={{
          [`& > .${breadcrumbsClasses.ol}`]: {
            alignItems: 'baseline',
          },
        }}
      >
        {items.map((item, i) => {
          const { title, href } = item;
          return (
            <Link
              key={i}
              component={RouteLink}
              to={href}
              variant="subtitle2"
              sx={{ color: 'grey.500' }}
            >
              {title}
            </Link>
          );
        })}
        <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
          {page}
        </Typography>
      </Breadcrumbs>
    </Box>
  );
};

export default PageBreadcrumbs;
