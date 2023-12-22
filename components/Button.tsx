import React from "react";

type ButtonProps = {
  text: string;
  type: "button" | "submit" | "reset" | undefined;
  className?: string;
  onClick: () => void;
  disabled?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  text,
  onClick,
  type = "button",
  className,
  disabled = false,
}) => {
  return (
    <button
      type={type}
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
      className={`text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 ${className}${
        disabled ? " opacity-50 cursor-not-allowed" : ""
      }`}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;
