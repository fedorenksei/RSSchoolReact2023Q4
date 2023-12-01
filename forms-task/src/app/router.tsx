import { HookFormPage } from '@/pages/HookFormPage';
import { MainPage } from '@/pages/MainPage';
import { NotFound } from '@/pages/NotFound';
import { UncontrolledFormPage } from '@/pages/UncontrolledFormPage';
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
