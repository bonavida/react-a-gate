import ModalPage from 'pages/ModalPage';
import TooltipPage from 'pages/TooltipPage';
import PopoverPage from 'pages/PopoverPage';

const routes = [
  {
    id: 1,
    path: '/',
    exact: true,
    RouteComponent: ModalPage,
  },
  {
    id: 2,
    path: '/modal',
    exact: true,
    RouteComponent: ModalPage,
  },
  {
    id: 3,
    path: '/tooltip',
    exact: true,
    RouteComponent: TooltipPage,
  },
  {
    id: 4,
    path: '/popover',
    exact: true,
    RouteComponent: PopoverPage,
  },
];

export default routes;
