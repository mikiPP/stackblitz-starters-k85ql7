import { create, useStore } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { UserStateViewModel } from '../viewModels/userState';
import { persist, createJSONStorage } from 'zustand/middleware';

export const userProvider = create<UserStateViewModel>()(
  persist(
    immer((set) => ({
      roles: ['admin'],
      addRole(role: string) {
        set((state) => {
          state.roles.push(role);
        });
      },
    })),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);

export function useUserProvider(): UserStateViewModel;
export function useUserProvider<T>(
  selector: (state: UserStateViewModel) => T,
  equals?: (a: T, b: T) => boolean,
): T;
export function useUserProvider(selector?: any) {
  return useStore(userProvider, selector);
}
