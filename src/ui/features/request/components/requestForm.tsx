'use client';

import { useState } from 'react';
import { userProvider, useUserProvider } from '@/src/ui/providers/user.provider';
import { affiliates } from '@/src/ui/utils/mockedData';
import Spinner from '@/src/ui/components/loading';
import { useRouter } from 'next/navigation';
import { usePersistStore } from '@/src/ui/hooks/usePersistStore';

export default function RequestForm() {
  const router = useRouter();
  const userRoles = usePersistStore(userProvider, (state) => state)?.roles;
  const addRole = useUserProvider((state) => state.addRole);
  const missingRoles = affiliates.filter(
    (affiliate) => userRoles && !userRoles.includes(affiliate),
  );
  const [selectedRole, setSelectedRole] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFormSent, setIsFormSent] = useState<boolean>(false);

  if (missingRoles.length === 0) {
    return (
      <div className="font-semibold text-center">
        <p> You already have all the roles available.</p>
        <button
          className="bg-black text-white py-2 px-4 rounded-md mt-4"
          onClick={() => {
            router.push('/');
          }}
        >
          <span>Return to home page</span>
        </button>
      </div>
    );
  }

  if (isFormSent) {
    return (
      <div className="text-center">
        <p className="font-semibold  text-green-600">
          You have granted acces to the role {selectedRole}
        </p>
        <div className="flex flex-col max-w-xs gap-4 items-center mt-4 mx-auto px-4">
          <button
            className="bg-black text-white py-2 px-4 rounded-md w-full"
            onClick={() => {
              if (selectedRole) {
                setSelectedRole('');
                setIsFormSent(false);
              }
            }}
          >
            <span>Request acces to another role </span>
          </button>
          <button
            className="bg-black text-white py-2 px-4 rounded-md w-full"
            onClick={() => {
              router.back();
            }}
          >
            <span>Go back</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        setIsLoading(true);

        setTimeout(() => {
          setIsFormSent(true);
          setIsLoading(false);
          addRole(selectedRole);
        }, 1500);
      }}
    >
      <div className="flex flex-col wrapper items-center">
        <div className="flex gap-4">
          <label htmlFor="role" className="text-sm font-semibold">
            Role:
          </label>
          <select
            id="role"
            name="role"
            className="w-min"
            value={selectedRole}
            onChange={(event) => {
              setSelectedRole(event.target.value);
            }}
          >
            <option value="" disabled />
            {missingRoles.map((role, index) => (
              <option key={index} value={role} className="capitalize text-sm">
                {role}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-4">
          {isLoading ? (
            <Spinner />
          ) : (
            <button
              type="submit"
              className="bg-black text-white py-2 px-4 rounded-md disabled:bg-opacity-80 disabled:cursor-not-allowed"
              disabled={!selectedRole}
            >
              <span>Request role</span>
            </button>
          )}
        </div>
      </div>
    </form>
  );
}
