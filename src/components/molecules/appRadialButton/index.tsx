import React, { useEffect, useState } from "react";
import { AppButton } from "../appButton";

export interface RadioButtonItem {
  text: string;
  icon?: (className: string) => React.ReactNode;
  value: string;
}

interface RadioButtonTabsProps {
  items: RadioButtonItem[];
  onActiveItemChange: (value: string) => void;
}

const AppRadioButtonTabs: React.FC<RadioButtonTabsProps> = ({
  items,
  onActiveItemChange,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    onActiveItemChange(items[activeIndex].value);
  }, [activeIndex]);
  return (
    <div className="flex rounded-sm overflow-hidden">
      {items.map((item, index) => (
        <AppButton
          onClick={() => setActiveIndex(index)}
          outline={index !== activeIndex}
          text={item.text}
          iconRight={(className) => item.icon && item.icon(className)}
          variant="primary"
        />
      ))}
    </div>
  );
};

export default AppRadioButtonTabs;
