// src/store/authAtoms.ts
import { atom } from 'recoil';
import type { User } from '../types/users';
import type { OrganizationService } from '../services/organizationService';

export const userAtom = atom<User | null>({
  key: 'userAtom',
  default: null,
});

export const orgAtom = atom<OrganizationService | null>({
  key: 'orgAtom',
  default: null,
});
