import { HelperText, Label, Select, TextInputProps } from "flowbite-react";
import { ChangeEvent, InputHTMLAttributes } from "react";

interface AppSelectBoxProps {
  options: Array<{ name: string; value: string }>;
  id: string;
  labelValue?: string;
  label?: string;
  helperText?: string;
  hasError?: boolean;
  isSuccess?: boolean;
  isDisabled?: boolean;
  sizing: "sm" | "lg";
  defaultValue?: { name?: string; value?: string };
  onValueChange?: (value: string) => void;
}

const customTheme = {
  base: "!rounded-[0px] !bg-light-primary-surface-default-subtle w-full",
  field: {
    base: "relative w-full flex items-center text-subtitle-14 !rounded-0",
    input: {
      base: "pr-10  my-2 w-full !rounded-none",
      sizes: {
        sm: "py-2 px-4 gap-2 text-subtitle-14 !rounded-none",
        lg: "py-[14px] px-4 gap-2.5 text-subtitle-14 !rounded-none",
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
        on: "!rounded-none",
        off: "!rounded-none",
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

const helperColor = {
  base: "fill-light-primary-text-subtitle stroke-light-primary-text-subtitle text-light-primary-text-subtitle text-body-12 ",
  disabled:
    "fill-light-primary-text-caption stroke-light-primary-text-caption text-light-primary-text-subtitle text-body-12",
  success:
    "fill-dark-success-text-negative stroke-dark-success-text-negative text-dark-success-text-negative-subtle text-body-12",
  failure:
    "fill-dark-error-text-negative stroke-dark-error-text-negative text-dark-error-text-negative text-body-12 ",
};

const AppSelectBox: React.FC<AppSelectBoxProps> = ({
  options,
  id,
  label,
  labelValue,
  helperText,
  hasError,
  isSuccess,
  isDisabled,
  defaultValue,
  onValueChange,
  ...rest
}) => {
  const renderHelperStyle = () => {
    if (isDisabled) return helperColor.disabled;
    if (hasError) return helperColor.failure;
    if (isSuccess) return helperColor.success;
    return helperColor.base;
  };

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    if (onValueChange) {
      onValueChange(event.target.value);
    }
  };

  return (
    <div className="w-full flex flex-col justify-start items-start gap-2 ">
      <div className="mb-2 block">
        <Label htmlFor={id} value={labelValue} />
        {label && <div>{label}</div>}
      </div>
      <Select
        onChange={handleChange}
        {...rest}
        id={id}
        theme={customTheme}
        required
        disabled={isDisabled}
        defaultValue={defaultValue?.value}
      >
        {options &&
          options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.name}
            </option>
          ))}
      </Select>
      {helperText && (
        <span className={`block ${renderHelperStyle()}`}>{helperText}</span>
      )}
    </div>
  );
};

export default AppSelectBox;
