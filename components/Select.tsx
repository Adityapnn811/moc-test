import React, { ChangeEvent } from "react";

interface SelectProps {
  id: string;
  options: Array<{ id: string; nama: string }>;
  value: string;
  label: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

const Select: React.FC<SelectProps> = ({
  id,
  options,
  value,
  label,
  onChange,
}) => {

  return (
    <div className="flex flex-col">
      <label
        htmlFor={id}
        className={`block mb-2 text-sm font-semibold text-gray-900`}
      >
        {label}
      </label>
      <select
        value={value}
        onChange={onChange}
        className="block border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 w-full bg-white"
      >
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.nama}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
