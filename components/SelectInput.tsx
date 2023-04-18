import React, { FC, useState } from 'react';
import { Listbox } from '@headlessui/react';
import CheckIcon from '@/public/check.svg';

export interface Option {
  label: string;
  value: string | number;
}

interface SelectInputProps<T = Option> {
  options: Array<T>;
  defaultValue: T;
  onChange?: (option: T, name: string) => void;
  name?: string;
}

const SelectInput: FC<SelectInputProps> = ({ options, defaultValue, onChange, name = '' }) => {
  const [selected, setSelected] = useState(defaultValue.value ? defaultValue : options[0]);

  const handleChange = (option: Option) => {
    setSelected(option);
    onChange?.(option, name);
  };

  return (
    <Listbox value={selected} onChange={handleChange}>
      <div className="relative w-[300px]  font-semibold text-base-700">
        <Listbox.Label className="capitalize text-base-50 tracking-wide my-2">{name}</Listbox.Label>
        <Listbox.Button className="relative bg-base-50 w-full rounded-md py-1 px-4 text-left shadow-md">
          {selected.label}
        </Listbox.Button>
        <Listbox.Options className="custom-scroll absolute top-full mt-1 max-h-60 w-full overflow-auto rounded-md py-1 px-2 shadow-lg bg-base-50">
          {options.map((option) => (
            <Listbox.Option
              key={option.value}
              className="py-1 rounded-md px-2 cursor-pointer flex justify-between items-center hover:bg-base-100"
              value={option}
            >
              <span>{option.label}</span>
              {selected.value === option.value && <CheckIcon />}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </div>
    </Listbox>
  );
};

export default SelectInput;
