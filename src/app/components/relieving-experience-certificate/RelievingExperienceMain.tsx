/* eslint-disable */
// @ts-nocheck
"use client";

// ============================================================
// RelievingExperienceMain.tsx
// Controller for the Relieving cum Experience Certificate.
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

import RelievingExperiencePage1 from "./RelievingExperiencePage1";

import "../../pages/Page1.css";
import "./RelievingExperienceCertificate.css";

const STORAGE_KEY = "adinnRelievingExperienceData";
const LETTERHEAD_KEY = "adinn_offer_pdf_letterhead";

const getTodayDate = () => {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const year = today.getFullYear();
  return `${day}/${month}/${year}`;
};

const DEFAULT_RELIEVING_DATA = {
  letterDate: getTodayDate(),

  employeeName: "Mr. Vignesh Mohan",
  employeeId: "1757",
  designation: "Senior Executive - Client Service",
  department: "Events & Activations",

  dateOfJoining: "26/11/2025",
  relievingDate: "15/07/2026",

  hrName: "Gayathri S",
  hrDesignation: "HR Manager",
};

function RelievingExperienceMain() {
  const router = useRouter();

  // Normal chrome print blocked
  useBlockBrowserPrint(
    "Normal Chrome print is disabled for the Relieving cum Experience Certificate. Please use the Download PDF button."
  );

  const [data, setData] = useState(DEFAULT_RELIEVING_DATA);
  const [isPdfDownloading, setIsPdfDownloading] = useState(false);
  const [isPdfExportMode, setIsPdfExportMode] = useState(false);
  const [includeLetterhead, setIncludeLetterhead] = useState(true);

  const pdfRef = useRef(null);

  // Seed the shared employee fields from the Offer Letter, then let
  // any previously saved relieving certificate win over that.
  useEffect(() => {
    const savedOfferData = localStorage.getItem("adinnOfferLetterData");

    if (savedOfferData) {
      try {
        const offerData = JSON.parse(savedOfferData);

        setData((prev) => ({
          ...prev,
          employeeName: offerData.employeeName || prev.employeeName,
          designation: offerData.designation || prev.designation,
          department: offerData.department || prev.department,
          dateOfJoining: offerData.dateOfJoining || prev.dateOfJoining,
          hrName: offerData.hrName || prev.hrName,
        }));
      } catch (error) {
        console.error("Invalid offer letter data in localStorage:", error);
      }
    }

    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) return;

    try {
      const parsed = JSON.parse(saved);
      setData((prev) => ({ ...prev, ...parsed }));
    } catch (error) {
      console.error("Invalid relieving certificate data in localStorage:", error);
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

      const fileName = `Relieving-experience-certificate-${cleanPersonName(
        data.employeeName
      )}-${includeLetterhead ? "with-letterhead" : "without-letterhead"}.pdf`;

      const pdfBlob = await createA4PdfBlob(pdfRef.current);

      triggerBlobDownload(pdfBlob, fileName);
    } catch (error) {
      console.error("Relieving certificate PDF download failed:", error);
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
            ? "pdf-export-content relieving-pdf-export-content"
            : ""
        }`}
      >
        <RelievingExperiencePage1
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

export default RelievingExperienceMain;
