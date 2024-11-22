import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DashboardIcon from '@mui/icons-material/Dashboard';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import PeopleIcon from '@mui/icons-material/People';
import Paths from 'constants/paths';
import type { ReactNode } from 'react';

interface Section {
  href: string;
  title: ReactNode;
  icon: ReactNode;
}

const sections: Section[] = [
  {
    title: 'Overview',
    href: Paths.overview.index,
    icon: <DashboardIcon />,
  },
  {
    title: 'Todo',
    href: Paths.todo.index,
    icon: <FormatListBulletedIcon />,
  },
  {
    title: 'Account',
    href: Paths.account.index,
    icon: <AccountCircleIcon />,
  },
  {
    title: 'User',
    href: Paths.user.index,
    icon: <PeopleIcon />,
  },
];

export default sections;
