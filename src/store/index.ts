import { create } from 'zustand';
import { Account, AccountType } from '../types';

interface AuthStore {
  accounts: Account[];
  addAccount: (account: Omit<Account, 'id' | 'createdAt'>) => void;
  removeAccount: (id: string) => void;
  updateAccount: (id: string, data: Partial<Account>) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  accounts: [
    {
      id: '1',
      issuer: 'Demo Service',
      accountName: 'user@example.com',
      secret: 'JBSWY3DPEHPK3PXP', // Base32 for 'Hello!'
      type: AccountType.TOTP,
      createdAt: Date.now(),
    },
  ],
  addAccount: (account) =>
    set((state) => ({
      accounts: [
        ...state.accounts,
        {
          ...account,
          id: crypto.randomUUID(),
          createdAt: Date.now(),
        },
      ],
    })),
  removeAccount: (id) =>
    set((state) => ({
      accounts: state.accounts.filter((a) => a.id !== id),
    })),
  updateAccount: (id, data) =>
    set((state) => ({
      accounts: state.accounts.map((a) => (a.id === id ? { ...a, ...data } : a)),
    })),
}));
