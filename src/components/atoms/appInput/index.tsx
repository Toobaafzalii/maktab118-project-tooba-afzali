import React, { useState } from "react";
import {
  Label,
  TextInput as FlowbiteTextInput,
  TextInputProps,
  CustomFlowbiteTheme,
} from "flowbite-react";

type AppInputProps = {
  label?: string;
  labelValue?: string;
  placeholder?: string;
  color?: "base" | "disabled" | "value" | "failure" | "success";
  id: string;
  type: "text" | "password";
  rightIcon?: (className?: string) => React.ReactNode;
  icon?: (className?: string) => React.ReactNode;
  isDisabled?: boolean;
  hasError?: boolean;
  isSuccess?: boolean;
  sizing: "sm" | "lg";
  helperText?: string;
  iconFunctionality?: IconFunctionality;
} & TextInputProps;

interface IconFunctionality {
  type: "toggleFocus" | "toggleVisibility";
  callback: (
    currentState: boolean,
    setState: React.Dispatch<React.SetStateAction<boolean>>
  ) => void;
}

const customTheme: CustomFlowbiteTheme["textInput"] = {
  field: {
    base: "relative w-full flex items-center text-subtitle-14 ",
    input: {
      base: "pr-10 my-2 w-full",
      sizes: {
        sm: "py-2 px-4 gap-2 text-subtitle-14",
        lg: "py-[14px] px-4 gap-2.5 text-subtitle-14",
      },
      colors: {
        base: "!bg-light-primary-surface-default-subtle border-[1px] border-light-primary-border-default-subtle focus:border-light-primary-border-negative text-light-primary-text-subtitle",
        disabled:
          "!bg-light-gray-surface-default-subtle border-[1px] border-light-primary-border-default-subtle text-light-primary-text-caption",
        value:
          "!bg-light-primary-surface-default-subtle border-[1px] border-light-primary-border-default-subtle focus:border-light-primary-border-negative text-light-primary-text-title",
        failure:
          "!bg-light-primary-surface-default-subtle border-[1px] text-dark-error-text-negative border-dark-error-text-negative",
        success:
          "!bg-light-primary-surface-default-subtle border-[1px] border-dark-success-border-default text-dark-success-text-negative-subtle",
      },
      withAddon: {
        on: "rounded-none",
        off: "rounded-none",
      },
    },
    icon: {
      svg: "w-6 h-6",
      base: "absolute inset-y-0 left-0 flex items-center pl-4",
    },
    rightIcon: {
      svg: "w-6 h-6",
      base: "absolute inset-y-0 right-0 flex items-center pr-4",
    },
  },
};

const labelCustomTheme = {
  root: {
    base: "text-subtitle-14 ",
    disabled: "opacity-50",
  },
};

const helperColor = {
  base: "fill-light-primary-text-subtitle stroke-light-primary-text-subtitle text-light-primary-text-subtitle text-body-12 ",
  disabled:
    "fill-light-primary-text-caption stroke-light-primary-text-caption text-light-primary-text-subtitle text-body-12",
  success:
    "fill-dark-success-text-negative stroke-dark-success-text-negative text-dark-success-text-negative-subtle text-body-12",
  failure:
    "fill-dark-error-text-negative stroke-dark-error-text-negative text-dark-error-text-negative text-body-12 ",
};

export const AppInput: React.FC<AppInputProps> = ({
  label,
  labelValue,
  placeholder,
  id,
  color = "base",
  icon,
  rightIcon,
  type,
  isDisabled = false,
  hasError = false,
  isSuccess = false,
  helperText,
  sizing,
  iconFunctionality,
  ...rest
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleIconClick = () => {
    if (iconFunctionality) {
      const { type, callback } = iconFunctionality;

      if (type === "toggleFocus") {
        setIsFocused((prev) => !prev);
        callback(isFocused, setIsFocused);
      } else if (type === "toggleVisibility") {
        setIsPasswordVisible((prevState) => !prevState);
        callback(isPasswordVisible, setIsPasswordVisible);
      }
    }
  };

  const renderHelperStyle = () => {
    if (isDisabled) return helperColor.disabled;
    if (hasError) return helperColor.failure;
    if (isSuccess) return helperColor.success;
    return helperColor.base;
  };

  const renderColor = () => {
    if (hasError) return "failure";
    if (isSuccess) return "success";
    return color;
  };

  return (
    <div className=" min-h-[100px]">
      {labelValue && (
        <div className="block">
          <Label
            theme={labelCustomTheme}
            htmlFor={id}
            value={labelValue}
            className="!text-light-primary-text-title !text-subtitle-14"
          />
        </div>
      )}
      {label && <div>{label}</div>}
      <FlowbiteTextInput
        {...rest}
        theme={customTheme}
        id={id}
        color={renderColor()}
        type={type === "password" && isPasswordVisible ? "text" : type}
        sizing={sizing}
        placeholder={placeholder}
        disabled={isDisabled}
        icon={({ className }) =>
          icon && (
            <div
              className={`cursor-pointer ${className} ${renderHelperStyle()} fill-current`}
              onClick={handleIconClick}
            >
              {icon(className)}
            </div>
          )
        }
        helperText={<span className={renderHelperStyle()}>{helperText}</span>}
        rightIcon={({ className }) =>
          rightIcon ? (
            <div
              className={`cursor-pointer ${className} ${renderHelperStyle()} fill-current`}
              onClick={handleIconClick}
            >
              {rightIcon(className)}
            </div>
          ) : null
        }
      />
    </div>
  );
};
