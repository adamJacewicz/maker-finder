import React, { FC } from 'react';
import SelectInput, { Option } from '@/components/SelectInput';
import { skills, timezones } from '@/utils/constants';
import restClient from '@/rest-client';
import { Filter } from '@/types/model';
import { useRouter } from 'next/router';

const skillsList = Object.entries(skills).map(([value, label]) => ({ value, label }));
const timezoneList = timezones.map((timezone) => ({ value: timezone, label: timezone }));

const ProfileFilter: FC<{ filter: Filter }> = ({ filter }) => {
  const router = useRouter();
  const onChange = async (payload: Option, name: string) => {
    await restClient.user.filter.update({ [name]: payload.value });
    router.push('/profiles/browse');
  };

  return (
    <div className="flex items-center gap-5 justify-center my-5">
      <SelectInput
        name="skill"
        onChange={onChange}
        options={skillsList}
        defaultValue={{ value: filter?.skill, label: skills[filter?.skill] }}
      />
      <SelectInput
        name="timezone"
        onChange={onChange}
        options={timezoneList}
        defaultValue={{ value: filter?.timezone, label: filter?.timezone }}
      />
    </div>
  );
};

export default ProfileFilter;
