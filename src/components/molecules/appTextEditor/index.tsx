"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";

// Dynamically import ReactQuill for SSR
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

type AppTextEditorProps = {
  defaultValue?: string;
  helperText?: string;
  labelValue?: string;
  placeholder?: string;
  label?: string;
  id: string;
  hasError?: boolean;
  onChange?: (_: string) => void;
};

// Custom toolbar configuration
const modules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }], // Header levels
    ["bold", "italic", "underline", "strike"], // Text styles
    [{ align: [] }], // Alignment options (includes RTL)
    [{ direction: "rtl" }], // RTL support
    ["clean"], // Clear formatting
  ],
};

const AppTextEditor: React.FC<AppTextEditorProps> = ({
  id,
  defaultValue,
  hasError,
  helperText,
  label,
  labelValue,
  placeholder,
  onChange,
}) => {
  //   const [value, setValue] = useState("");

  //   useEffect(() => {
  //     if (defaultValue) {
  //       setValue(defaultValue);
  //     }
  //   }, [defaultValue]);

  const handleChange = (content: string) => {
    onChange && onChange(content);
  };

  return (
    <div className="w-full mt-5">
      <ReactQuill
        className="h-full"
        defaultValue={defaultValue}
        // onChange={handleChange}
        theme="snow" // Default theme
        modules={modules} // Custom toolbar options
        placeholder={placeholder}
      />
    </div>
  );
};

export default AppTextEditor;
