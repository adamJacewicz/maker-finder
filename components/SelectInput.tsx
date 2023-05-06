import React, { FC, useMemo, useState } from 'react';
import { Listbox } from '@headlessui/react';
import CheckIcon from '@/public/check.svg';

export interface Option {
  label: string;
  value: string | number;
}

interface SelectInputProps<T = Option> {
  options: Array<T>;
  defaultValue?: T;
  onChange?: (option: T, name: string) => void;
  name?: string;
}

const SelectInput: FC<SelectInputProps> = ({ options, defaultValue, onChange, name = '' }) => {
  const [selected, setSelected] = useState(defaultValue);

  const handleChange = (option: Option) => {
    setSelected(option);
    onChange?.(option, name);
  };

  return (
    <Listbox value={selected} onChange={handleChange}>
      <div className="relative w-[300px] font-semibold text-white">
        <Listbox.Label className="capitalize text-base-50 tracking-wide block mb-1">
          {name}
        </Listbox.Label>
        <Listbox.Button className="relative bg-theme-secondary  border-gray-500 border w-full rounded-md py-1 px-4 text-left shadow-md">
          {selected?.label}
        </Listbox.Button>
        <Listbox.Options className="scrollbar-hidden absolute top-full mt-2 max-h-60 w-full overflow-auto bg-theme-secondary rounded-md py-1 shadow-lg  border-gray-500 border ">
          {options.map((option) => (
            <Listbox.Option
              key={option.value}
              className="py-1 px-2 cursor-pointer flex justify-between items-center hover:bg-theme-accent hover:text-white"
              value={option}
            >
              <span>{option.label}</span>
              {selected?.value === option.value && <CheckIcon />}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </div>
    </Listbox>
  );
};

export default SelectInput;
