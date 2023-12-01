import {
  HookFormPage,
  MainPage,
  NotFound,
  UncontrolledFormPage,
} from '@/pages';
import { createBrowserRouter } from 'react-router-dom';

export const routerPaths = {
  main: '/',
  hookForm: '/hook-form',
  uncontrolledForm: '/uncontrolled-form',
};

export const router = createBrowserRouter([
  {
    path: routerPaths.main,
    element: <MainPage />,
  },
  {
    path: routerPaths.hookForm,
    element: <HookFormPage />,
  },
  {
    path: routerPaths.uncontrolledForm,
    element: <UncontrolledFormPage />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);
