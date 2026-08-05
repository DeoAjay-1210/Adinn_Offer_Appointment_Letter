/* eslint-disable */
// @ts-nocheck
"use client";

// ============================================================
// InternshipApprovalMain.tsx
// Controller for the Internship Approval Letter.
// Single A4 page, so there is no step wizard - just the
// letterhead toggle, the PDF download and Home.
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

import InternshipApprovalPage1 from "./InternshipApprovalPage1";

import "../../pages/Page1.css";
import "./InternshipApprovalLetter.css";

const STORAGE_KEY = "adinnInternshipApprovalData";
const LETTERHEAD_KEY = "adinn_offer_pdf_letterhead";

const getTodayDate = () => {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const year = today.getFullYear();
  return `${day}-${month}-${year}`;
};

const DEFAULT_APPROVAL_DATA = {
  letterDate: getTodayDate(),

  addresseeDesignation: "The Principal / Head of Department,",
  courseName: "BE Computer Science and Engineering",
  collegeName: "RVS School of Engineering and Technology",

  studentName: "Mr. Jeziel Praise Son M",
  internshipRole: "AI Developer - Intern",
  internshipFromDate: "22/06/2026",
  internshipToDate: "22/09/2026",

  hrName: "Gayathri S",
  hrDesignation: "HR Manager",
};

function InternshipApprovalMain() {
  const router = useRouter();

  // Normal chrome print blocked
  useBlockBrowserPrint(
    "Normal Chrome print is disabled for the Internship Approval Letter. Please use the Download PDF button."
  );

  const [data, setData] = useState(DEFAULT_APPROVAL_DATA);
  const [isPdfDownloading, setIsPdfDownloading] = useState(false);
  const [isPdfExportMode, setIsPdfExportMode] = useState(false);
  const [includeLetterhead, setIncludeLetterhead] = useState(true);

  const pdfRef = useRef(null);

  // Restore the last edited letter
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) return;

    try {
      const parsed = JSON.parse(saved);
      setData((prev) => ({ ...prev, ...parsed }));
    } catch (error) {
      console.error("Invalid internship approval data in localStorage:", error);
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

  const renderBeforeExport = async () => {
    flushSync(() => {
      setIsPdfDownloading(true);
      setIsPdfExportMode(true);
    });

    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }

    await waitForNextPaint();

    if (document.fonts) {
      await document.fonts.ready;
    }

    await waitForImages(pdfRef.current || document);

    await new Promise((resolve) => setTimeout(resolve, 300));
  };

  const downloadPDF = async () => {
    if (isPdfDownloading) return;

    try {
      await renderBeforeExport();

      if (!pdfRef.current) {
        alert("PDF content not found. Please try again.");
        return;
      }

      const fileName = `Internship-approval-letter-${cleanPersonName(
        data.studentName
      )}-${includeLetterhead ? "with-letterhead" : "without-letterhead"}.pdf`;

      const pdfBlob = await createA4PdfBlob(pdfRef.current);

      triggerBlobDownload(pdfBlob, fileName);
    } catch (error) {
      console.error("Internship approval PDF download failed:", error);
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
    <div className={isBusy ? "letter-ui-busy" : ""}>
      <PrintBlockedToast />

      <div
        ref={pdfRef}
        className={`print-preview-pages ${
          isPdfExportMode
            ? "pdf-export-content approval-pdf-export-content"
            : ""
        }`}
      >
        <InternshipApprovalPage1
          data={data}
          setData={setData}
          showLetterhead={includeLetterhead}
        />
      </div>

      <div className="step-wizard">
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

export default InternshipApprovalMain;
