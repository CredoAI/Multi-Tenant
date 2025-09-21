// src/store/authAtoms.ts
import { atom, useSetRecoilState, useRecoilValue } from 'recoil';
import uuid from 'react-uuid';
import type { User } from '../types/users';
import type { IOrganization } from '../types/organization';

export const userAtom = atom<User | null>({
  key: uuid(),
  default: null,
});

export const orgAtom = atom<IOrganization | null>({
  key: uuid(),
  default: null,
});

// Read values
export const useUserValue = (): User | null => useRecoilValue(userAtom);
export const useOrgValue = (): IOrganization | null => useRecoilValue(orgAtom);

// Set values
export const useUserSetRecoilState = () => useSetRecoilState(userAtom);
export const useOrgSetRecoilState = () => useSetRecoilState(orgAtom);
