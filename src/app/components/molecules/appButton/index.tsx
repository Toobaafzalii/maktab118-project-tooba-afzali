import { CustomFlowbiteTheme, Button as FlowbiteButton } from "flowbite-react";
import React from "react";

type AppButtonProps = {
  fullWidth?: boolean;
  variant?: "primary" | "secondary";
  size?: "xs" | "sm" | "base" | "l" | "xl";
  isDisabled?: boolean;
  outline?: boolean;
  text: string;
  iconLeft?: (className: string) => React.ReactNode;
  iconRight?: (className: string) => React.ReactNode;
};

const customTheme: CustomFlowbiteTheme["button"] = {
  color: {
    primary:
      "bg-light-primary-surface-negative-subtle hover:bg-light-primary-surface-negative text-light-primary-text-negative active:border-[3px] active:border-light-primary-border-default-subtle active:scale-100 ",
    secondary:
      "bg-light-primary-surface-default-subtle text-light-primary-text-title hover:bg-light-primary-surface-default active:border-[3px] active:border-light-primary-border-default-subtle active:scale-100 ",
  },
  outline: {
    color: {
      primary:
        "border-[1px] border-light-primary-border-negative bg-transparent text-light-primary-text-title hover:bg-dark-primary-surface-negative active:border-[3px] active:border-light-primary-border-default-subtle active:scale-100",
      secondary:
        "border-[1px] border-light-primary-border-default-subtle bg-transparent text-dark-primary-text-title hover:bg-dark-primary-surface-object active:border-[3px] active:border-dark-primary-border-default-subtle active:scale-100",
    },
  },
  size: {
    xs: "py-2 px-3 text-subtitle-12 ",
    sm: "py-2 px-3 text-subtitle-14",
    base: "py-2.5 px-5 text-subtitle-14",
    l: "py-3 px-5 text-subtitle-16",
    xl: "py-[14px] px-6 text-subtitle-16",
  },
};

const disabledStyle = {
  primary:
    "bg-light-gray-surface-default text-light-gray-text-caption hover:bg-light-gray-surface-default hover:text-light-gray-text-caption",
  secondary:
    "bg-light-gray-surface-default-subtle text-dark-gray-text-caption hover:bg-light-gray-surface-default-subtle hover:text-dark-gray-text-caption ",
  outline: {
    primary:
      "bg-light-primary-surface-default text-light-primary-text-title border-[1px] border-light-primary-border-default hover:bg-light-primary-surface-default",
    secondary:
      "bg-dark-primary-surface-default text-light-primary-text-caption border-[1px] border-dark-primary-border-default hover:bg-dark-primary-surface-default",
  },
};

const iconColor = {
  color: {
    primary:
      "fill-light-primary-text-negative stroke-light-primary-text-negative",
    secondary: "fill-light-primary-text-title stroke-light-primary-text-title",
  },
  outline: {
    primary: "fill-light-primary-text-title stroke-light-primary-text-title",
    secondary: "fill-dark-primary-text-title stroke-dark-primary-text-title",
  },
  disabled: "fill-light-primary-text-caption stroke-light-primary-text-caption",
};

const iconSize = {
  xs: "w-4 h-4",
  sm: "w-4 h-4",
  base: "w-5 h-5",
  l: "w-5 h-5",
  xl: "w-5 h-5",
};

export const AppButton: React.FC<AppButtonProps> = ({
  size = "base",
  variant = "primary",
  text,
  iconLeft,
  iconRight,
  isDisabled,
  outline,
  fullWidth,
}) => {
  const getDisabledStyle = () => {
    if (isDisabled) {
      if (outline) {
        return disabledStyle.outline[variant];
      }
      return disabledStyle[variant];
    }
    return "";
  };

  const getIconColor = () => {
    if (isDisabled) {
      return iconColor.disabled;
    } else if (outline) {
      return iconColor.outline[variant];
    }
    return iconColor.color[variant];
  };

  const getIconProps = () => {
    const iconColor = getIconColor();
    return `${iconSize[size]} fill:${iconColor}`;
  };

  return (
    <FlowbiteButton
      theme={customTheme}
      color={variant}
      size={size}
      outline={outline}
      disabled={isDisabled}
      className={`rounded-sm transition-all items-center ${
        fullWidth ? "w-full" : ""
      } ${getDisabledStyle()}`}
    >
      {iconRight && (
        <div className={`ml-2 ${iconSize[size]} ${getIconColor()}`}>
          {iconRight(getIconProps())}
        </div>
      )}
      {text}
      {iconLeft && (
        <div className={`mr-2 ${iconSize[size]} ${getIconColor()}`}>
          {iconLeft(getIconProps())}
        </div>
      )}
    </FlowbiteButton>
  );
};
