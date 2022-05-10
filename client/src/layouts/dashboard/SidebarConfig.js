import { Icon } from '@iconify/react';
import pieChart2Fill from '@iconify/icons-eva/pie-chart-2-fill';
// import peopleFill from '@iconify/icons-eva/people-fill';
// import shoppingBagFill from '@iconify/icons-eva/shopping-bag-fill';
// import fileTextFill from '@iconify/icons-eva/file-text-fill';
// import lockFill from '@iconify/icons-eva/lock-fill';
// import personAddFill from '@iconify/icons-eva/person-add-fill';
// import alertTriangleFill from '@iconify/icons-eva/alert-triangle-fill';
import starFill from '@iconify/icons-eva/star-fill';
import briefcaseFill from '@iconify/icons-eva/briefcase-fill';
import activityFill from '@iconify/icons-eva/activity-fill';
import clockFill from '@iconify/icons-eva/clock-fill';
import flashFill from '@iconify/icons-eva/flash-fill';
// ----------------------------------------------------------------------

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

const sidebarConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: getIcon(pieChart2Fill)
  },
  {
    title: 'watchlist',
    path: '/dashboard/watchlist',
    icon: getIcon(starFill)
  },
  {
    title: 'courses',
    path: '/dashboard/products',
    icon: getIcon(briefcaseFill)
  },
  {
    title: 'top-rated',
    path: '/dashboard/recommend',
    icon: getIcon(flashFill)
  },
  {
    title: 'analytics',
    path: '/dashboard/invest',
    icon: getIcon(activityFill)
  },
  {
    title: 'activity',
    path: '/dashboard/activity',
    icon: getIcon(clockFill)
  }
];

export default sidebarConfig;
