'use client';

import { colors } from '@/src/ui/utils/colors';
import { useState } from 'react';
import faker from 'faker';
import LinearChart from '@/src/ui/components/linearChart';
import { useUserProvider } from '@/src/ui/providers/user.provider';
import { affiliates } from '@/src/ui/utils/mockedData';
import NextLink from 'next/link';

const kpis = [
  {
    name: 'Today viewed',
    min: 50,
    max: 100,
  },
  {
    name: 'Today favourites?',
    min: 0,
    max: 25,
  },
  {
    name: 'Today interactions',
    min: 25,
    max: 50,
  },
  {
    name: 'Total assets',
    min: 120,
    max: 150,
  },
];

export default function Storyboards() {
  const [selectedAffiliate, setSelectedAffiliate] = useState(affiliates[0]);
  const userRoles = useUserProvider((state) => state.roles);

  return (
    <div>
      <h3 className="subtitle">Storyboards</h3>
      <p className="description">
        Storyboards are used to visualize data in a more interactive way.
      </p>
      <div className="mt-8">
        <h4 className="subtitle">Affiliates</h4>
        <div className="flex mt-4 gap-4">
          <label htmlFor="affiliate" className="font-medium">
            Select an affiliate:
          </label>
          <select
            className="capitalize"
            name="affiliate"
            id="affiliate"
            onChange={(event) => {
              setSelectedAffiliate(event.target.value);
            }}
          >
            {affiliates.map((affiliate, index) => (
              <option key={index} value={affiliate} className="capitalize text-sm">
                {affiliate}
              </option>
            ))}
          </select>
        </div>
      </div>
      {userRoles.includes(selectedAffiliate) ? (
        <>
          <div className="mt-8 flex gap-4">
            {kpis.map((kpi, index) => (
              <div
                key={index}
                className="grow px-2 py-4 border rounded-lg"
                style={{ backgroundColor: colors[index].backgroundColor }}
              >
                <div className="flex justify-between items-center mb-4 flex-col">
                  <span className="text-gray-700">{kpi.name}</span>
                  <span className="text-2xl font-bold mt-4">
                    {faker.datatype.number({ min: kpi.min, max: kpi.max })}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="py-8">
            <LinearChart
              chartTitle={'Total views per asset ' + selectedAffiliate}
              time="year"
              datasets={['Total views']}
            />
          </div>
        </>
      ) : (
        <div className="mt-8">
          <p className="text-red-500">You do not have access to this data</p>
          <NextLink href="/request">
            <div className="outline-btn mt-4 w-fit">
              <span>Request access</span>
            </div>
          </NextLink>
        </div>
      )}
    </div>
  );
}
