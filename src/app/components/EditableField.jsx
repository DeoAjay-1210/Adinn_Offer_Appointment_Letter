// ============================================================
// EditableField.jsx
// PURPOSE: Shows content normally in the document.
//          On hover → cursor changes to indicate it's editable.
//          On click → turns into an inline text input.
//          On blur/Enter → saves and goes back to display mode.
// USAGE:
//   <EditableField
//     value={data.employeeName}
//     onChange={(val) => setData({ ...data, employeeName: val })}
//     bold       ← optional: makes text bold
//     className  ← optional: pass extra CSS classes
//   />
// ============================================================

import React, { useState, useRef } from 'react';

function EditableField({ value, onChange, bold = false, className = '', style = {} }) {
  // Track whether this field is being edited right now
  const [isEditing, setIsEditing] = useState(false);

  // Ref to auto-focus the input when editing starts
  const inputRef = useRef(null);

  // When user clicks the displayed text → switch to edit mode
  const handleClick = () => {
    setIsEditing(true);
    // Wait for re-render, then focus the input
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  // When input loses focus → save and switch back to display mode
  const handleBlur = () => {
    setIsEditing(false);
  };

  // Allow pressing Enter to confirm edit (Shift+Enter = newline if needed)
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      setIsEditing(false);
    }
  };

  // Shared style for both display and edit mode
  const baseStyle = {
    fontWeight: bold ? '800' : 'inherit',
    display: 'inline',
    ...style,
  };

  // ---- EDIT MODE: show a plain text input ----
  if (isEditing) {
    return (
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        style={{
          ...baseStyle,
          border: 'none',
          borderBottom: '1.5px solid #c0392b', // subtle red underline while editing
          outline: 'none',
          background: 'transparent',
          fontFamily: 'inherit',
          fontSize: 'inherit',
          width: Math.max(value.length * 10, 80) + 'px', // auto-size roughly
          padding: '0',
          margin: '0',
          color: 'inherit',
        }}
      />
    );
  }

  // ---- DISPLAY MODE: looks like normal document text ----
  return (
    <span
      onClick={handleClick}
      className={`editable-field ${className}`}
      style={{
        ...baseStyle,
        cursor: 'text',           // shows text cursor on hover — signals editability
        borderBottom: '1px dashed transparent', // hidden border, appears on hover via CSS
        transition: 'border-color 0.2s',
      }}
      title="Click to edit"       // tooltip on hover
    >
      {value || '\u00A0' /* non-breaking space so empty fields still have height */}
    </span>
  );
}

export default EditableField;
