"use client";
import React, { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";
import { Label } from "flowbite-react";
import ReactQuill, { DeltaStatic, EmitterSource } from "react-quill-new";

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
  onChange?: (text: string, length: number) => void;
};

const labelCustomTheme = {
  root: {
    base: "text-subtitle-14 ",
    disabled: "opacity-50",
  },
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

const helperColor = {
  base: "fill-light-primary-text-subtitle stroke-light-primary-text-subtitle text-light-primary-text-subtitle text-body-12 ",
  failure:
    "fill-dark-error-text-negative stroke-dark-error-text-negative text-dark-error-text-negative text-body-12 ",
};

const AppTextEditor: React.FC<AppTextEditorProps> = ({
  defaultValue,
  placeholder,
  onChange = (t) => t,
  label,
  labelValue,
  helperText,
  hasError,
}) => {
  const handleChange = (
    value: string,
    delta: DeltaStatic,
    source: EmitterSource,
    editor: ReactQuill.UnprivilegedEditor
  ) => {
    onChange(value, editor.getLength() - 1);
  };

  const renderHelperStyle = () => {
    if (hasError) return helperColor.failure;
    return helperColor.base;
  };

  return (
    <div className="w-full mt-1 flex flex-col justify-between items-start">
      {labelValue && (
        <div className="block">
          <Label
            theme={labelCustomTheme}
            value={labelValue}
            className="!text-light-primary-text-title !text-subtitle-14"
          />
        </div>
      )}
      {label && <div>{label}</div>}
      <ReactQuill
        className="w-full align-right"
        defaultValue={defaultValue}
        onChange={handleChange}
        theme="snow" // Default theme
        modules={modules} // Custom toolbar options
        placeholder={placeholder}
      />
      {<span className={renderHelperStyle()}>{helperText}</span>}
    </div>
  );
};

export default AppTextEditor;
