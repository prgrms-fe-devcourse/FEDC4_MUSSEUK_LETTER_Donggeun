import Header from '@/components/header';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <>
      <Header userId="frong123" />
      <Outlet />
    </>
  );
};

export default MainLayout;
