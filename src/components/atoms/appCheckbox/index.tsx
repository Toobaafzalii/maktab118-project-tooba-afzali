import { Checkbox, Label } from "flowbite-react";

type AppCheckboxProps = {
  text: string;
  value: string;
  onSelect?: (value: string) => void;
} & React.ComponentProps<typeof Checkbox>;

const AppCheckbox: React.FC<AppCheckboxProps> = ({
  onSelect,
  text,
  value,
  ...props
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onSelect) {
      onSelect(e.target.value);
    }
  };
  return (
    <div className="w-full flex justify-between items-center hover:bg-light-primary-surface-default focus:bg-dark-primary-surface-object focus:text-light-primary-text-negative !text-light-primary-text-title dark:text-light-primary-text-title gap-2 py-2 px-3">
      <Label
        htmlFor={`checkbox-${value}`}
        className="w-full justify-between items-center flex cursor-pointer text-body-16 !text-light-primary-text-title dark:text-light-primary-text-title"
      >
        {text}
        <Checkbox
          id={`checkbox-${value}`}
          onChange={handleChange}
          value={value}
          {...props}
        />
      </Label>
    </div>
  );
};

export default AppCheckbox;
