import { Outlet } from 'react-router-dom';
import { TestError } from '../entities/TestError';
import { Search } from '../widgets/Search';

export const Home = () => {
  return (
    <>
      <div className="flex">
        <div className="grow p-2 space-y-3">
          <Search />
        </div>
        <Outlet />
      </div>
      <TestError />
    </>
  );
};
