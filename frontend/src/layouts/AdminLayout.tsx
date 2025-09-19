import type { ReactNode } from 'react';

type AdminLayoutProps = {
  children: ReactNode;
};
export const AdminLayout = ({ children }: AdminLayoutProps) => {
  return (
    <main>
      <h1>welcome to admin layout</h1>
      <div>{children}</div>
    </main>
  );
};
