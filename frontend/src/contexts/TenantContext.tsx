import React from 'react';
import { OrganizationService } from '../services/organizationService';
import { UserService } from '../services/userService';
import { useUserSetRecoilState, useOrgSetRecoilState, useWhatsappSetRecoilState } from '../store/authAtoms';
import { useNavigate } from 'react-router';
import { PageRoutes } from '../routes';
import type { User } from '../types/users';
import type { OrganizationPayload } from '../types/organization';

export async function contextLoader() {
  try {
    const { getOrganization } = new OrganizationService();
    const { fetchCurrentUser } = new UserService();
    const [userResult, orgResult] = await Promise.allSettled([fetchCurrentUser(), getOrganization()]);

    const user = userResult.status === 'fulfilled' ? userResult.value : null;
    const org = orgResult.status === 'fulfilled' ? orgResult.value : null;

    return { user: user?.data, org: org?.data };
  } catch (error: any) {
    console.error('error in Tenant contextLoader:', error.message);
  }
}

export const RootLoaderWrapper = ({
  data,
  children,
}: {
  data: { user: User; org: OrganizationPayload };
  children: React.ReactNode;
}) => {
  const setUser = useUserSetRecoilState();
  const setOrg = useOrgSetRecoilState();
  const setWhatsapp = useWhatsappSetRecoilState();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!data) return;
    if (data.user) {
      setUser(data.user);
    }

    if (data.org) {
      setOrg(data.org);
      if (data.org.whatsappsettings) {
        setWhatsapp(data.org.whatsappsettings[0]);
      }
    }

    // 🔑 Handle redirects once, based on missing data
    if (!data.user) {
      navigate(`/app/auth/${PageRoutes.LOGIN}`, { replace: true });
    } else if (!data.org) {
      navigate(`/app/auth/${PageRoutes.CREATE_ORGANIZATION}`, { replace: true });
    }
  }, [data, setUser, setOrg]);

  return <>{children}</>;
};
