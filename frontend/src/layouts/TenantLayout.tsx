import type { ReactNode } from 'react';

type TenantLayoutProps = {
  children: ReactNode;
};
export const TenantLayout = ({ children }: TenantLayoutProps) => {
  return (
    <main>
      <h1>welcome to tenant layout</h1>
      <div>{children}</div>
    </main>
  );
};
