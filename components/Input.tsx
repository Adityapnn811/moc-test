import React, { ChangeEvent } from "react";

interface InputProps {
  value: any;
  setValue: React.Dispatch<React.SetStateAction<any>>;
  id: string;
  type?: React.HTMLInputTypeAttribute | "phone";
  label?: string;
  placeholder?: string;
  required?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  message?: string;
}

const Input: React.FC<InputProps> = ({
  value,
  setValue,
  id,
  type = "text",
  label,
  placeholder,
  required = false,
  onChange = null,
  message = "",
}) => {
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <div className="flex flex-col">
      {label && (
        <label
          htmlFor={id}
          className={`block mb-2 text-sm font-semibold text-gray-900`}
        >
          {label}
        </label>
      )}
      <div className="flex flex-row">
        {type === "phone" && (
          <p className="border border-r-0  border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 inline-flex rounded-tr-none rounded-br-none font-semibold">
            +62
          </p>
        )}
        <input
          id={id}
          type={type === "phone" ? "number" : type}
          min={type === "phone" ? "10000000" : undefined}
          max={type === "phone" ? "999999999999" : undefined}
          value={value}
          onChange={onChange ?? onChangeHandler}
          placeholder={placeholder}
          className={`block border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 w-full ${
            type === "phone" && "rounded-l-none"
          }`}
          required={required}
        />
      </div>
      <p className="mt-2 text-sm text-red-600 dark:text-red-500">{message}</p>
    </div>
  );
};

export default Input;
