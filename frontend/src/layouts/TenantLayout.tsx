import type { ReactNode } from 'react';

type TenantLayoutProps = {
  children: ReactNode;
};
export const TenantLayout = ({ children }: TenantLayoutProps) => {
  return (
    <main>
      <div>{children}</div>
    </main>
  );
};
