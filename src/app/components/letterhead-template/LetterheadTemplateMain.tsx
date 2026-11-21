/* eslint-disable */
// @ts-nocheck
"use client";

// ============================================================
// LetterheadTemplateMain.tsx
// One blank A4 page carrying only the Adinn header + footer.
// Download as DOCX (editable template), PDF, or both.
// ============================================================

import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { flushSync } from "react-dom";

import useBlockBrowserPrint from "../utils/useBlockBrowserPrint";
import PrintBlockedToast from "../utils/PrintBlockedToast";
import {
  waitForNextPaint,
  waitForImages,
  createA4PdfBlob,
  triggerBlobDownload,
} from "../utils/letterPdfExport";
import { generateLetterheadDocx } from "../utils/generateOfferDocx";
import OfferPageLayout from "../OfferPageLayout";

import "../../pages/Page1.css";
import "./LetterheadTemplate.css";

const FILE_BASE = "Adinn-letterhead-template";

function LetterheadTemplateMain() {
  const router = useRouter();

  useBlockBrowserPrint(
    "Normal Chrome print is disabled. Please use the download buttons."
  );

  // "" | "docx" | "pdf" | "both"
  const [busy, setBusy] = useState("");
  const [isPdfExportMode, setIsPdfExportMode] = useState(false);
  const [message, setMessage] = useState("");
  const pdfRef = useRef(null);

  const makePdf = async () => {
    flushSync(() => setIsPdfExportMode(true));
    await waitForNextPaint();
    if (document.fonts) await document.fonts.ready;
    await waitForImages(pdfRef.current || document);
    await new Promise((r) => setTimeout(r, 300));

    try {
      const blob = await createA4PdfBlob(pdfRef.current);
      triggerBlobDownload(blob, `${FILE_BASE}.pdf`);
    } finally {
      setIsPdfExportMode(false);
    }
  };

  const run = async (kind) => {
    if (busy) return;
    setBusy(kind);
    setMessage("");

    try {
      if (kind === "docx" || kind === "both") {
        await generateLetterheadDocx(FILE_BASE, 1);
      }
      if (kind === "pdf" || kind === "both") {
        await makePdf();
      }
      setMessage(
        kind === "both"
          ? "Downloaded DOCX and PDF."
          : `Downloaded ${kind.toUpperCase()}.`
      );
    } catch (error) {
      console.error("Letterhead download failed:", error);
      setMessage("Download failed. Please try again.");
    } finally {
      setBusy("");
    }
  };

  const label = (kind, idle, working) => (
    <>
      {busy === kind && <span className="btn-spinner"></span>}
      <span>{busy === kind ? working : idle}</span>
    </>
  );

  return (
    <div className={busy ? "letter-ui-busy" : ""}>
      <PrintBlockedToast />

      <div className="lh-panel no-print">
        <h2>Letterhead Template</h2>
        <p>
          A blank A4 page with the Adinn header and footer. Download the
          <strong> DOCX</strong> to type your own letter in Word (the header and
          footer repeat on every new page), or the <strong>PDF</strong> to print
          on plain paper.
        </p>

        <div className="lh-actions">
          <button
            type="button"
            className="lh-btn lh-btn-docx"
            onClick={() => run("docx")}
            disabled={!!busy}
          >
            {label("docx", "Download DOCX", "Preparing DOCX...")}
          </button>

          <button
            type="button"
            className="lh-btn lh-btn-pdf"
            onClick={() => run("pdf")}
            disabled={!!busy}
          >
            {label("pdf", "Download PDF", "Preparing PDF...")}
          </button>

          <button
            type="button"
            className="lh-btn lh-btn-both"
            onClick={() => run("both")}
            disabled={!!busy}
          >
            {label("both", "Download Both", "Preparing files...")}
          </button>

          <button
            type="button"
            className="lh-btn lh-btn-home"
            onClick={() => router.push("/")}
            disabled={!!busy}
          >
            Home
          </button>
        </div>

        {message && <div className="lh-message">{message}</div>}
      </div>

      <div
        ref={pdfRef}
        className={`print-preview-pages ${isPdfExportMode ? "pdf-export-content" : ""}`}
      >
        <OfferPageLayout showLetterhead={true}>
          <div className="lh-empty-body" />
        </OfferPageLayout>
      </div>
    </div>
  );
}

export default LetterheadTemplateMain;
