/* eslint-disable */
// @ts-nocheck
"use client";

// ============================================================
// BlankLetterheadMenu.tsx
// Toolbar dropdown shared by every letter: downloads a blank
// A4 page (Adinn header + footer, no content) as DOCX or PDF.
// The blank page is mounted off-screen only while exporting.
// ============================================================

import React, { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";

import OfferPageLayout from "../OfferPageLayout";
import { generateLetterheadDocx } from "./generateOfferDocx";
import {
  waitForNextPaint,
  waitForImages,
  createA4PdfBlob,
  triggerBlobDownload,
} from "./letterPdfExport";

import "./BlankLetterheadMenu.css";

const FILE_BASE = "Adinn-letterhead-template";

function BlankLetterheadMenu({ disabled = false }) {
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(""); // "" | "docx" | "pdf" | "both"
  const [mountBlank, setMountBlank] = useState(false);

  const menuRef = useRef(null);
  const blankRef = useRef(null);

  // close the menu on outside click
  useEffect(() => {
    if (!open) return;
    const onDown = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  const makePdf = async () => {
    flushSync(() => setMountBlank(true));
    try {
      await waitForNextPaint();
      if (document.fonts) await document.fonts.ready;
      await waitForImages(blankRef.current || document);
      await new Promise((r) => setTimeout(r, 300));

      const blob = await createA4PdfBlob(blankRef.current);
      triggerBlobDownload(blob, `${FILE_BASE}.pdf`);
    } finally {
      setMountBlank(false);
    }
  };

  const run = async (kind) => {
    if (busy) return;
    setOpen(false);
    setBusy(kind);

    try {
      if (kind === "docx" || kind === "both") await generateLetterheadDocx(FILE_BASE, 1);
      if (kind === "pdf" || kind === "both") await makePdf();
    } catch (error) {
      console.error("Blank letterhead download failed:", error);
      alert("Blank letterhead download failed. Please try again.");
    } finally {
      setBusy("");
    }
  };

  return (
    <div className="blm-wrap no-print" ref={menuRef}>
      <button
        type="button"
        className={`step-btn-letterhead blm-trigger ${busy ? "is-loading" : ""}`}
        onClick={() => setOpen((v) => !v)}
        disabled={disabled || !!busy}
        aria-haspopup="menu"
        aria-expanded={open}
      >
        {busy && <span className="btn-spinner"></span>}
        <span>{busy ? "Preparing..." : "Blank Letterhead ▾"}</span>
      </button>

      {open && (
        <div className="blm-menu" role="menu">
          <div className="blm-title">Header &amp; footer only, no content</div>
          <button type="button" role="menuitem" onClick={() => run("docx")}>
            Download DOCX <small>editable Word template</small>
          </button>
          <button type="button" role="menuitem" onClick={() => run("pdf")}>
            Download PDF <small>ready to print</small>
          </button>
          <button type="button" role="menuitem" onClick={() => run("both")}>
            Download Both
          </button>
        </div>
      )}

      {mountBlank && (
        <div className="blm-offscreen" aria-hidden="true">
          <div ref={blankRef} className="print-preview-pages pdf-export-content">
            <OfferPageLayout showLetterhead={true}>
              <div />
            </OfferPageLayout>
          </div>
        </div>
      )}
    </div>
  );
}

export default BlankLetterheadMenu;
