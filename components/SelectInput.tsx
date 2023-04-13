import React, { FC, useState } from 'react';
import { Listbox } from '@headlessui/react';
import Check from '@/public/check.svg';
import useAuth from '@/hooks/use-auth';

interface Option {
  label: string;
  value: string | number;
}

interface SelectInputProps<T = Option> {
  values: Array<T>;
  defaultValue: T;
}

const SelectInput: FC<SelectInputProps> = ({ values, defaultValue }) => {
  const [selected, setSelected] = useState(defaultValue);
  const { data: session } = useAuth();
  return (
    <Listbox value={selected} onChange={setSelected}>
      <div className="relative w-[300px] text-sm font-semibold text-base-700">
        <Listbox.Button className="relative bg-base-50 w-full rounded-md py-1 px-4 text-left shadow-md">
          {selected.label}
        </Listbox.Button>
        <Listbox.Options className="custom-scroll absolute top-full mt-1 max-h-60 w-full overflow-auto rounded-md py-1 px-2 shadow-lg bg-base-50">
          {values.map((item) => (
            <Listbox.Option
              key={item.value}
              className="py-1 rounded-md px-2 cursor-pointer flex justify-between items-center hover:bg-base-100"
              value={item}
            >
              <span>{item.label}</span>
              {selected.value === item.value && <Check />}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </div>
    </Listbox>
  );
};

export default SelectInput;
