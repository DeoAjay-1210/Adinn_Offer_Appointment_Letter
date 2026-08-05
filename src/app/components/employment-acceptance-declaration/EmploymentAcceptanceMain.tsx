/* eslint-disable */
// @ts-nocheck
"use client";

// ============================================================
// EmploymentAcceptanceMain.tsx
// Controller for வேலை நியமன ஒப்புதல் மற்றும் உறுதிமொழி
// (Employment Acceptance & Declaration).
//
// Two A4 pages, so it carries a small step wizard like the Offer
// and Appointment letters: Page 1 / Page 2 / Preview, with the
// export always driven from the Preview step.
// ============================================================

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { flushSync } from "react-dom";

import useBlockBrowserPrint from "../utils/useBlockBrowserPrint";
import PrintBlockedToast from "../utils/PrintBlockedToast";
import {
  waitForNextPaint,
  waitForImages,
  createA4PdfBlob,
  triggerBlobDownload,
  cleanPersonName,
} from "../utils/letterPdfExport";

import EmploymentAcceptancePage1 from "./EmploymentAcceptancePage1";
import EmploymentAcceptancePage2 from "./EmploymentAcceptancePage2";

import "../../pages/Page1.css";
import "./EmploymentAcceptanceDeclaration.css";

// Versioned: the first cut of this form defaulted to empty fields, so
// anyone who opened it then has blanks saved. Those blanks would be
// restored over the Tamil sample data below and the page would look
// empty. Bump this suffix whenever the sample data changes shape.
const STORAGE_KEY = "adinnEmploymentAcceptanceData_v2";
const LETTERHEAD_KEY = "adinn_offer_pdf_letterhead";

const STEPS = ["Page 1 - ஒப்புதல்", "Page 2 - உறுதிமொழி", "Preview"];

const PREVIEW_STEP = 2;

// Sample data, same idea as DEFAULT_DATA in the Offer Letter.
// This one ships in Tamil because the document is Tamil - the HR user
// clicks a field and retypes in Tanglish ("karthiyayini" ->
// கார்த்தியாயினி) rather than starting from an empty box.
const DEFAULT_ACCEPTANCE_DATA = {
  employeeName: "கார்த்தியாயினி",
  designation: "மூத்த வடிவமைப்பாளர்",
  dateOfJoining: "30-05-2026",

  hrName: "Gayathri S",
  hrDesignation: "HR Manager",

  // Page 2 signature table - labels are fixed, these are the values
  employeeSignature: "கார்த்தியாயினி",
  declarationDate: "13-12-2026",
};

// Screen-only Tanglish guide, opened from the "Tamil Typing Guide"
// button in the step wizard.
//
// This started as a block at the top of page 1's body. .a4-page is a
// fixed 297mm with overflow: hidden, so the space it took pushed the HR
// name and designation off the bottom of the sheet - they could not be
// clicked or edited on screen, yet reappeared in the PDF, which drops
// .no-print and gave that space back. It lives outside pdfRef now and
// is a centred overlay, so the letter body has identical geometry on
// screen and in the export, and nothing sits over the page uninvited.
function TamilTypingGuide({ onClose }) {
  // Esc closes, same as the × and a click on the backdrop
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div className="tamilGuideBackdrop no-print" onClick={onClose}>
      <div
        className="tamilGuidePanel"
        role="dialog"
        aria-modal="true"
        aria-label="Tamil Typing Guide"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className="tamilGuideClose"
          onClick={onClose}
          aria-label="Close guide"
        >
          ×
        </button>

        <h2 className="tamilGuideTitle">Tamil Typing Guide</h2>

        <p className="tamilGuideText">
          Click on any input field and start typing using English letters
          (Tanglish). The text will be automatically converted into Tamil as
          you type.
        </p>

        <div className="tamilGuideExample">
          <span className="tamilGuideExampleLabel">Example</span>
          <span className="tamilGuideExampleRow">
            <code>paniyalar</code>
            <span className="tamilGuideArrow">→</span>
            <span className="tamilGuideTamilWord">பணியாளர்</span>
          </span>
        </div>

        <h3 className="tamilGuideSubTitle">How to Use</h3>

        <ul className="tamilGuideList">
          <li>
            <code>Space</code>, <code>Enter</code>, or <code>1-9</code> - select
            the suggested Tamil word.
          </li>
          <li>
            <code>Esc</code> - keep the English spelling without converting it
            to Tamil.
          </li>
          <li>
            Click the <code>தமிழ் / ABC</code> toggle to switch Tamil typing On
            or Off at any time.
          </li>
        </ul>
      </div>
    </div>
  );
}

function EmploymentAcceptanceMain() {
  const router = useRouter();

  // Normal chrome print blocked
  useBlockBrowserPrint(
    "Normal Chrome print is disabled for the Employment Acceptance & Declaration. Please use the Download PDF button."
  );

  const [data, setData] = useState(DEFAULT_ACCEPTANCE_DATA);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPdfDownloading, setIsPdfDownloading] = useState(false);
  const [isPdfExportMode, setIsPdfExportMode] = useState(false);
  const [includeLetterhead, setIncludeLetterhead] = useState(true);
  const [showTypingGuide, setShowTypingGuide] = useState(false);

  const pdfRef = useRef(null);

  // Deliberately NOT seeded from adinnOfferLetterData like the other
  // letters are: that data is in English and would overwrite the Tamil
  // sample above. Only a previously saved Tamil form is restored.
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) return;

    try {
      const parsed = JSON.parse(saved);
      setData((prev) => ({ ...prev, ...parsed }));
    } catch (error) {
      console.error("Invalid acceptance form data in localStorage:", error);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  // Letterhead choice is shared with the other letters
  useEffect(() => {
    const saved = localStorage.getItem(LETTERHEAD_KEY);

    if (saved !== null) {
      setIncludeLetterhead(saved === "true");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LETTERHEAD_KEY, String(includeLetterhead));
  }, [includeLetterhead]);

  const renderAllPagesBeforeExport = async () => {
    flushSync(() => {
      setCurrentStep(PREVIEW_STEP);
      setIsPdfDownloading(true);
      setIsPdfExportMode(true);
    });

    // Closes any open Tanglish suggestion list before the screenshot
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }

    await waitForNextPaint();

    // The Tamil webfont must be ready or html2canvas draws boxes
    if (document.fonts) {
      await document.fonts.ready;
    }

    await waitForImages(pdfRef.current || document);

    await new Promise((resolve) => setTimeout(resolve, 300));
  };

  const downloadPDF = async () => {
    if (isPdfDownloading) return;

    try {
      await renderAllPagesBeforeExport();

      if (!pdfRef.current) {
        alert("PDF content not found. Please try again.");
        return;
      }

      const fileName = `Employment-acceptance-declaration-${cleanPersonName(
        data.employeeName || "employee"
      )}-${includeLetterhead ? "with-letterhead" : "without-letterhead"}.pdf`;

      const pdfBlob = await createA4PdfBlob(pdfRef.current);

      triggerBlobDownload(pdfBlob, fileName);
    } catch (error) {
      console.error("Employment acceptance PDF download failed:", error);
      alert(
        error instanceof Error
          ? `PDF download failed: ${error.message}`
          : "PDF download failed. Please check console."
      );
    } finally {
      setIsPdfDownloading(false);
      setIsPdfExportMode(false);
    }
  };

  const isBusy = isPdfDownloading;

  return (
    <div className={`tamilLetterShell ${isBusy ? "letter-ui-busy" : ""}`}>
      <PrintBlockedToast />

      {/* Fixed strip above the sheet - the shell reserves its height so
          it never covers the letterhead. */}
      <div className="tamilGuideBar no-print">
        <button
          type="button"
          className="step-btn-guide"
          onClick={() => setShowTypingGuide(true)}
          disabled={isBusy}
        >
          Tamil Typing Guide
        </button>
      </div>

      {showTypingGuide && (
        <TamilTypingGuide onClose={() => setShowTypingGuide(false)} />
      )}

      {currentStep === 0 && (
        <EmploymentAcceptancePage1
          data={data}
          setData={setData}
          showLetterhead={includeLetterhead}
        />
      )}

      {currentStep === 1 && (
        <EmploymentAcceptancePage2
          data={data}
          setData={setData}
          showLetterhead={includeLetterhead}
        />
      )}

      {currentStep === PREVIEW_STEP && (
        <div
          ref={pdfRef}
          className={`print-preview-pages ${
            isPdfExportMode
              ? "pdf-export-content acceptance-pdf-export-content"
              : ""
          }`}
        >
          <EmploymentAcceptancePage1
            data={data}
            setData={setData}
            showLetterhead={includeLetterhead}
          />
          <EmploymentAcceptancePage2
            data={data}
            setData={setData}
            showLetterhead={includeLetterhead}
          />
        </div>
      )}

      <div className="step-wizard">
        <button
          className="step-btn"
          onClick={() => setCurrentStep((s) => Math.max(0, s - 1))}
          disabled={currentStep === 0 || isBusy}
        >
          Back
        </button>

        {STEPS.map((label, index) => (
          <button
            key={index}
            className={`step-btn ${currentStep === index ? "active" : ""}`}
            onClick={() => setCurrentStep(index)}
            disabled={isBusy}
          >
            {index + 1}. {label}
          </button>
        ))}

        <button
          className="step-btn"
          onClick={() =>
            setCurrentStep((s) => Math.min(STEPS.length - 1, s + 1))
          }
          disabled={currentStep === STEPS.length - 1 || isBusy}
        >
          Next
        </button>

        <button
          type="button"
          className={`step-btn-letterhead ${includeLetterhead ? "active" : ""}`}
          onClick={() => setIncludeLetterhead((prev) => !prev)}
          disabled={isBusy}
        >
          {includeLetterhead ? "Letterhead: ON" : "Letterhead: OFF"}
        </button>

        <button
          className={`step-btn-download ${isPdfDownloading ? "is-loading" : ""}`}
          onClick={downloadPDF}
          disabled={isBusy}
        >
          {isPdfDownloading && <span className="btn-spinner"></span>}
          <span>{isPdfDownloading ? "Preparing PDF..." : "Download PDF"}</span>
        </button>

        <button
          type="button"
          className="step-btn-home"
          onClick={() => router.push("/")}
          disabled={isBusy}
        >
          Home
        </button>
      </div>
    </div>
  );
}

export default EmploymentAcceptanceMain;
