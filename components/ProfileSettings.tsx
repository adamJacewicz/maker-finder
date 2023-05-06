import React, { FC } from 'react';
import SelectInput, { Option } from '@/components/SelectInput';
import { professions, timezones } from '@/utils/constants';
import { UserData } from '@/types/model';

const professionMap = new Map(Object.entries(professions));
const timezoneList = timezones.map((timezone) => ({ value: timezone, label: timezone }));
const professionOptions = Array.from(professionMap).map(([value, label]) => ({ value, label }));
const ProfileSettings: FC<{
  settings: Pick<UserData, 'profession' | 'timezone'>;
  onChange: (payload: Option, name: string) => Promise<void>;
}> = ({ settings, onChange }) => {
  const profession = professionMap.get(settings.profession);

  return (
    <div className="flex items-center gap-5 justify-center my-5 rounded-md p-8 bg-theme-primary">
      <SelectInput
        name="profession"
        onChange={onChange}
        options={professionOptions}
        defaultValue={{ value: settings.profession, label: profession! }}
      />
      <SelectInput
        name="timezone"
        onChange={onChange}
        options={timezoneList}
        defaultValue={{ value: settings.timezone, label: settings.timezone! }}
      />
    </div>
  );
};

export default ProfileSettings;
