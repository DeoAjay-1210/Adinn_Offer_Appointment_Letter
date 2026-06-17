/* eslint-disable */
// @ts-nocheck
"use client";

import React, { useEffect, useRef } from "react";

export default function AppointmentEditableField({
  value,
  onChange,
  bold = false,
  className = "",
}) {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current && document.activeElement !== ref.current) {
      ref.current.innerText = value || "";
    }
  }, [value]);

  const handleBlur = () => {
    const newValue = ref.current?.innerText || "";
    onChange(newValue.trim());
  };

  const handleKeyDown = (e) => {
    // Enter saves the inline edit
    if (e.key === "Enter") {
      e.preventDefault();
      e.currentTarget.blur();
    }
  };

  return (
    <span
      ref={ref}
      contentEditable
      suppressContentEditableWarning
      spellCheck={false}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      className={`apt-editable-field ${bold ? "apt-editable-bold" : ""} ${className}`}
      title="Click to edit"
    >
      {value}
    </span>
  );
}