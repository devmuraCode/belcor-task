import { Suspense, useEffect } from 'react';

import { Outlet, useNavigate } from 'react-router-dom';

import {
  useAppDispatch,
  useAppSelector,
} from '@/app/providers/storeProvider/store';
import { currentUserService } from '@/entities/user/service/currentUserService';
import { RoutePath } from '@/shared/config/routeConfig/routes';
import { Navbar } from '@/widgets/Navbar';
import { Sidebar } from '@/widgets/Sidebar';
import LoadingSpinner from '@/shared/ui/Loading/Loading';

const MainLayout = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { currentUser, loading } = useAppSelector((state) => state.currentUser);
  console.log('currentUser', currentUser);

  useEffect(() => {
    dispatch(currentUserService());
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  if (!currentUser) {
    navigate(RoutePath.login);
  }

  return (
    <div className=" flex-col h-screen">
      <Navbar />
      <div className="flex h-screen">
        <Sidebar />
        <div className="grow p-4">
          <Suspense fallback={<div>Loading...</div>}>
            <Outlet />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
