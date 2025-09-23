// src/store/authAtoms.ts
import { atom, useSetRecoilState, useRecoilValue } from 'recoil';
import uuid from 'react-uuid';
import type { User } from '../types/users';
import type { IOrganization } from '../types/organization';
import type { IWhatSappSettings } from '../types/whatsapp';

export const userAtom = atom<User | null>({
  key: uuid(),
  default: null,
});

export const orgAtom = atom<IOrganization>({
  key: uuid(),
  default: {
    id: '',
    name: '',
    brandTone: '',
    businessType: 'bakery',
    AIAssistantName: '',
  },
});

export const whatsappAtom = atom<IWhatSappSettings | null>({
  key: uuid(),
  default: null,
});

// Read values
export const useUserValue = (): User | null => useRecoilValue(userAtom);
export const useOrgValue = (): IOrganization => useRecoilValue(orgAtom);
export const useWhatsappValue = (): IWhatSappSettings | null => useRecoilValue(whatsappAtom);

// Set values
export const useUserSetRecoilState = () => useSetRecoilState(userAtom);
export const useOrgSetRecoilState = () => useSetRecoilState(orgAtom);
export const useWhatsappSetRecoilState = () => useSetRecoilState(whatsappAtom);
