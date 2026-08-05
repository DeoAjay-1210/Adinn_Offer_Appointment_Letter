/* eslint-disable */
// @ts-nocheck
"use client";

// ============================================================
// TamilEditableField.tsx
// PURPOSE: Same click-to-edit behaviour as EditableField, but the
//          input is a Tanglish -> Tamil IME.
//
// Type "vanakkam" and a suggestion list opens under the field:
//
//     1 வணக்கம்      <- highlighted
//     2 வநக்கம்
//     3 வனக்கம்
//     ...
//     6 vanakkam     <- the English word, always last
//
// KEYS while the list is open
//   Space / Enter / Tab  commit the highlighted suggestion
//   1 - 9                commit that numbered suggestion
//   Up / Down            move the highlight
//   Esc                  keep the English spelling for this word
//
// The "தமிழ் / ABC" chip turns the IME off completely for fields
// that hold English names.
//
// Everything is offline - see tanglishToTamil.tsx.
// ============================================================

import React, { useEffect, useRef, useState } from "react";
import { getTamilSuggestions } from "./tanglishToTamil";
import "./TamilEditableField.css";

const MAX_SUGGESTIONS = 6;

function TamilEditableField({
  value,
  onChange,
  bold = false,
  className = "",
  minWidth = 90,
  tamilByDefault = true,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(value || "");
  const [suggestions, setSuggestions] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [tamilMode, setTamilMode] = useState(tamilByDefault);
  const [dropUp, setDropUp] = useState(false);

  // The word the user pressed Esc on - do not re-open the list for it
  const dismissedTokenRef = useRef(null);
  const inputRef = useRef(null);
  const wrapperRef = useRef(null);
  const caretTargetRef = useRef(null);

  // Keep the draft in step with the parent while not editing
  useEffect(() => {
    if (!isEditing) {
      setDraft(value || "");
    }
  }, [value, isEditing]);

  // Restore the caret after a suggestion has been swapped in
  useEffect(() => {
    if (caretTargetRef.current === null) return;
    if (!inputRef.current) return;

    const position = caretTargetRef.current;
    caretTargetRef.current = null;

    inputRef.current.setSelectionRange(position, position);
  }, [draft]);

  // The run of English letters immediately before the caret
  const readActiveToken = (text, caret) => {
    const upToCaret = text.slice(0, caret);
    const match = upToCaret.match(/[A-Za-z]+$/);

    return match ? match[0] : "";
  };

  const refreshSuggestions = (text, caret) => {
    if (!tamilMode) {
      setSuggestions([]);
      return;
    }

    const token = readActiveToken(text, caret);

    if (!token || token === dismissedTokenRef.current) {
      setSuggestions([]);
      return;
    }

    setSuggestions(getTamilSuggestions(token, MAX_SUGGESTIONS));
    setActiveIndex(0);
  };

  const handleChange = (event) => {
    const text = event.target.value;
    const caret = event.target.selectionStart ?? text.length;

    setDraft(text);
    onChange(text);

    // A new word clears any earlier Esc
    const token = readActiveToken(text, caret);
    if (token !== dismissedTokenRef.current) {
      dismissedTokenRef.current = null;
    }

    refreshSuggestions(text, caret);
  };

  // Swap the token before the caret for the chosen suggestion
  const commitSuggestion = (candidate, trailing = "") => {
    const input = inputRef.current;

    if (!input) return;

    const caret = input.selectionStart ?? draft.length;
    const token = readActiveToken(draft, caret);

    if (!token) return;

    const before = draft.slice(0, caret - token.length);
    const after = draft.slice(caret);
    const next = before + candidate + trailing + after;

    caretTargetRef.current = before.length + candidate.length + trailing.length;

    setDraft(next);
    onChange(next);
    setSuggestions([]);
    dismissedTokenRef.current = null;
  };

  const handleKeyDown = (event) => {
    const listOpen = suggestions.length > 0;

    if (listOpen) {
      // Numbered pick
      if (/^[1-9]$/.test(event.key)) {
        const picked = suggestions[Number(event.key) - 1];

        if (picked) {
          event.preventDefault();
          commitSuggestion(picked);
          return;
        }
      }

      if (event.key === "ArrowDown") {
        event.preventDefault();
        setActiveIndex((i) => (i + 1) % suggestions.length);
        return;
      }

      if (event.key === "ArrowUp") {
        event.preventDefault();
        setActiveIndex((i) => (i - 1 + suggestions.length) % suggestions.length);
        return;
      }

      if (event.key === " " || event.key === "Tab" || event.key === "Enter") {
        event.preventDefault();
        commitSuggestion(
          suggestions[activeIndex],
          event.key === " " ? " " : ""
        );
        return;
      }

      if (event.key === "Escape") {
        event.preventDefault();
        dismissedTokenRef.current = readActiveToken(
          draft,
          inputRef.current?.selectionStart ?? draft.length
        );
        setSuggestions([]);
        return;
      }

      return;
    }

    // No list open - behave like the plain EditableField
    if (event.key === "Enter") {
      event.preventDefault();
      setIsEditing(false);
    }

    if (event.key === "Escape") {
      setIsEditing(false);
    }
  };

  const handleClick = () => {
    setIsEditing(true);
    dismissedTokenRef.current = null;

    setTimeout(() => {
      const input = inputRef.current;

      if (!input) return;

      input.focus();
      input.setSelectionRange(input.value.length, input.value.length);

      // Open upwards when the field sits low on the page
      const rect = input.getBoundingClientRect();
      setDropUp(window.innerHeight - rect.bottom < 240);
    }, 0);
  };

  const handleBlur = () => {
    // Let a click on a suggestion land before closing
    setTimeout(() => {
      if (
        wrapperRef.current &&
        wrapperRef.current.contains(document.activeElement)
      ) {
        return;
      }

      setIsEditing(false);
      setSuggestions([]);
    }, 120);
  };

  const baseStyle = {
    fontWeight: bold ? "800" : "inherit",
    display: "inline",
  };

  // An empty field collapses to nothing inside a table cell, which
  // leaves the user with nothing to click. Give it a strip to aim at.
  const displayStyle = value
    ? baseStyle
    : { ...baseStyle, display: "inline-block", minWidth: "130px" };

  // ---- DISPLAY MODE ----
  if (!isEditing) {
    return (
      <span
        onClick={handleClick}
        className={`editable-field tamil-editable-field ${className}`}
        style={{
          ...baseStyle,
          cursor: "text",
          borderBottom: "1px dashed transparent",
          transition: "border-color 0.2s",
        }}
        title="Click to edit - type in Tanglish for Tamil suggestions"
      >
        {value || " "}
      </span>
    );
  }

  // ---- EDIT MODE ----
  return (
    <span className="tamilFieldWrapper" ref={wrapperRef}>
      <input
        ref={inputRef}
        type="text"
        value={draft}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        className="tamilFieldInput"
        style={{
          ...baseStyle,
          width: Math.max(String(draft).length * 11, minWidth) + "px",
        }}
      />

      <button
        type="button"
        className={`tamilModeChip no-print ${tamilMode ? "is-tamil" : ""}`}
        title={
          tamilMode
            ? "Tanglish to Tamil is ON - click for plain English"
            : "Plain English - click for Tanglish to Tamil"
        }
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => {
          setTamilMode((prev) => !prev);
          setSuggestions([]);
          inputRef.current?.focus();
        }}
      >
        {tamilMode ? "தமிழ்" : "ABC"}
      </button>

      {suggestions.length > 0 && (
        <span
          className={`tamilSuggestBox no-print ${dropUp ? "is-dropUp" : ""}`}
        >
          <span className="tamilSuggestHint">
            Space / Enter to pick &nbsp;·&nbsp; Esc to keep English
          </span>

          {suggestions.map((candidate, index) => (
            <button
              key={candidate + index}
              type="button"
              className={`tamilSuggestItem ${
                index === activeIndex ? "is-active" : ""
              }`}
              onMouseDown={(e) => e.preventDefault()}
              onMouseEnter={() => setActiveIndex(index)}
              onClick={() => {
                commitSuggestion(candidate);
                inputRef.current?.focus();
              }}
            >
              <span className="tamilSuggestIndex">{index + 1}</span>
              <span className="tamilSuggestText">{candidate}</span>
              {index === suggestions.length - 1 && (
                <span className="tamilSuggestTag">English</span>
              )}
            </button>
          ))}
        </span>
      )}
    </span>
  );
}

export default TamilEditableField;
