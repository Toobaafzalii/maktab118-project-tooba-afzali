import {
  CustomFlowbiteTheme,
  DarkThemeToggle,
  Button as FlowbiteButton,
} from "flowbite-react";
import React, { ReactNode } from "react";

type AppFabButtonProps = {
  variant?: "primary" | "secondary";
  size?: "xs" | "sm" | "base" | "l" | "xl";
  isDisabled?: boolean;
  outline?: boolean;
  icon: (className: string) => React.ReactNode;
};

const customTheme: CustomFlowbiteTheme["button"] = {
  color: {
    primary:
      "bg-light-primary-surface-negative-subtle hover:bg-light-primary-surface-negative  active:border-[3px] active:border-light-primary-border-default-subtle active:scale-100 ",
    secondary:
      "bg-light-primary-surface-default-subtle  hover:bg-light-primary-surface-default active:border-[3px] active:border-light-primary-border-default-subtle active:scale-100 ",
  },
  outline: {
    color: {
      primary:
        "border-[1px] border-light-primary-border-negative bg-transparent hover:bg-dark-primary-surface-negative active:border-[3px] active:border-light-primary-border-default-subtle active:scale-100",
      secondary:
        "border-[1px] border-light-primary-border-default-subtle bg-transparent hover:bg-dark-primary-surface-object active:border-[3px] active:border-Dark-primary-border-default-subtle active:scale-100",
    },
  },
  size: {
    xs: "p-1",
    sm: "p-2",
    base: "p-2.5",
    l: "p-3",
    xl: "p-[14px]",
  },
};

const disabledStyle = {
  primary:
    "bg-light-gray-surface-default  hover:bg-light-gray-surface-default cursor-not-allowed ",
  secondary:
    "bg-light-gray-surface-default-subtle  hover:bg-light-gray-surface-default-subtle cursor-not-allowed ",
  outline: {
    primary:
      "bg-light-primary-surface-default  border-[1px] border-light-primary-border-default hover:bg-light-primary-surface-default cursor-not-allowed ",
    secondary:
      "bg-dark-primary-surface-default  border-[1px] border-dark-primary-border-default hover:bg-dark-primary-surface-default cursor-not-allowed ",
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

export const AppFabButton: React.FC<AppFabButtonProps> = ({
  size = "base",
  variant = "primary",
  icon,
  isDisabled,
  outline,
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

  const getIconProps = () => {
    if (isDisabled) {
      return iconColor.disabled;
    } else if (outline) {
      return iconColor.outline[variant];
    } else {
      return iconColor.color[variant];
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      <FlowbiteButton
        theme={customTheme}
        color={variant}
        size={size}
        outline={outline}
        className={`
          rounded-sm transition-all flex justify-center items-center fill-current
          ${getDisabledStyle()}
          `}
      >
        <div className={getIconProps()}>{icon(getIconProps())}</div>
      </FlowbiteButton>
    </div>
  );
};
