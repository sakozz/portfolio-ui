import { Outlet } from 'react-router-dom';

export default function Auth() {
  return (
    <div className="container mx-auto flex flex-col grow ">
      <Outlet />
    </div>
  );
}
