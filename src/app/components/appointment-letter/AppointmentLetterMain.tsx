/* eslint-disable */
// @ts-nocheck
"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
// import useBlockBrowserPrint from "../components/utils/useBlockBrowserPrint";
// import PrintBlockedToast from "../components/utils/PrintBlockedToast";
import useBlockBrowserPrint from "../utils/useBlockBrowserPrint";
import PrintBlockedToast from "../utils/PrintBlockedToast";

import { flushSync } from "react-dom";

import AppointmentPage1 from "./AppointmentPage1";
import AppointmentPage2 from "./AppointmentPage2";
import AppointmentPage3 from "./AppointmentPage3";
import AppointmentPage4 from "./AppointmentPage4";
import AppointmentPage5 from "./AppointmentPage5";

import "../../pages/Page1.css";
import "../appointment-letter/AppointmentLetter.css";

const DEFAULT_APPOINTMENT_DATA = {
  letterDate: "01/07/2026",
  employeeName: "Mr. Soundarapandian M",
  employeeId: "1449",

  addressLine1: "1A, Thiyagarajan Nagar,",
  addressLine2: "Sourashtra Teachers colony,",
  addressLine3: "Anuppaady, Madurai.",

  designation: "Senior Graphic Designer",
  department: "Arts & Creative",
  branch: "Head Office",
  reportingTo: "Sathish Kumar L",
  dateOfJoining: "02-08-2023",
  confirmationDate: "01-07-2026",
  employmentType: "Full-Time",
  effectiveDateText: "1st July 2026",
  hrName: "Gayathri S",

  salaryType: "WITH_PF",
  monthlyCTC: "31808",
  variablePay: "0",
};

const STEPS = [
  "Page 1 — Details",
  "Page 2 — Terms",
  "Page 3 — Acceptance",
  "Page 4 — Salary Annexure",
  "Page 5 — Salary T&C",
  "Preview",
];

function AppointmentPagesMain() {
  const router = useRouter();

  // Normal chrome print blocked 
  useBlockBrowserPrint(
    "Normal Chrome print is disabled for Offer Letter. Please use the Download PDF button."
  );
  const [data, setData] = useState(DEFAULT_APPOINTMENT_DATA);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPdfDownloading, setIsPdfDownloading] = useState(false);
  const [isPdfExportMode, setIsPdfExportMode] = useState(false);

  const pdfRef = useRef(null);

  useEffect(() => {
    const savedOfferData = localStorage.getItem("adinnOfferLetterData");

    if (!savedOfferData) return;

    try {
      const offerData = JSON.parse(savedOfferData);

      setData((prev) => ({
        ...prev,

        employeeName: offerData.employeeName || prev.employeeName,
        letterDate: offerData.offerDate || prev.letterDate,
        addressLine1: offerData.addressLine1 || prev.addressLine1,
        addressLine2: offerData.addressLine2 || prev.addressLine2,
        addressLine3: offerData.addressLine3 || prev.addressLine3,
        designation: offerData.designation || prev.designation,
        department: offerData.department || prev.department,
        branch: offerData.branch || prev.branch,
        reportingTo: offerData.reportingTo || prev.reportingTo,
        dateOfJoining: offerData.dateOfJoining || prev.dateOfJoining,
        employmentType: offerData.employmentType || prev.employmentType,
        hrName: offerData.hrName || prev.hrName,

        confirmationDate: prev.confirmationDate,
        effectiveDateText: prev.effectiveDateText,
        employeeId: prev.employeeId,
        salaryType: prev.salaryType,
        monthlyCTC: prev.monthlyCTC,
        variablePay: prev.variablePay,
      }));
    } catch (error) {
      console.error("Invalid offer letter data in localStorage:", error);
    }
  }, []);

  const getCleanEmployeeName = () => {
    return data.employeeName
      .replaceAll("Mr.", "")
      .replaceAll("Ms.", "")
      .replaceAll("Mrs.", "")
      .replaceAll(".", "")
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "-");
  };

  const waitForNextPaint = async () => {
    await new Promise((resolve) => {
      requestAnimationFrame(() => {
        requestAnimationFrame(resolve);
      });
    });
  };

  const waitForImages = async (root = document) => {
    const images = Array.from(root.querySelectorAll("img"));

    await Promise.all(
      images.map((img) => {
        if (img.complete && img.naturalWidth !== 0) {
          return Promise.resolve();
        }

        return new Promise((resolve) => {
          img.onload = resolve;
          img.onerror = resolve;
        });
      })
    );
  };

  // const renderAllPagesBeforeExport = async (type?: "pdf") => {
  //   flushSync(() => {
  //     setCurrentStep(5);

  //     if (type === "pdf") {
  //       setIsPdfDownloading(true);
  //     }
  //   });

  //   if (document.activeElement instanceof HTMLElement) {
  //     document.activeElement.blur();
  //   }

  //   await waitForNextPaint();

  //   if (document.fonts) {
  //     await document.fonts.ready;
  //   }

  //   await waitForImages(pdfRef.current || document);

  //   await new Promise((resolve) => setTimeout(resolve, 300));
  // };


  const renderAllPagesBeforeExport = async (type?: "pdf") => {
    flushSync(() => {
      setCurrentStep(5);

      if (type === "pdf") {
        setIsPdfDownloading(true);
        setIsPdfExportMode(true);
      }
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

  const createA4PdfBlob = async (rootElement) => {
    const html2canvasModule = await import("html2canvas");
    const jsPdfModule = await import("jspdf");

    const html2canvas = html2canvasModule.default;
    const { jsPDF } = jsPdfModule;

    const pages = Array.from(rootElement.querySelectorAll(".a4-page"));

    if (!pages.length) {
      throw new Error("No A4 pages found for PDF export.");
    }

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
      compress: true,
    });

    for (let index = 0; index < pages.length; index++) {
      const page = pages[index] as HTMLElement;

      const canvas = await html2canvas(page, {
        scale: 2.5,
        useCORS: true,
        allowTaint: false,
        backgroundColor: "#ffffff",
        logging: false,

        width: page.offsetWidth,
        height: page.offsetHeight,

        scrollX: 0,
        scrollY: 0,

        windowWidth: page.offsetWidth,
        windowHeight: page.offsetHeight,
      });

      const imageData = canvas.toDataURL("image/png");

      if (index > 0) {
        pdf.addPage("a4", "portrait");
      }

      pdf.addImage(imageData, "PNG", 0, 0, 210, 297, undefined, "FAST");
    }

    return pdf.output("blob");
  };

  const triggerBlobDownload = (blob, fileName) => {
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();

    link.remove();
    URL.revokeObjectURL(url);
  };

  const openChromePrintPreview = async () => {
    if (isPdfDownloading) return;

    await renderAllPagesBeforeExport();

    setTimeout(() => {
      window.print();
    }, 250);
  };

  // const downloadPDF = async () => {
  //   if (isPdfDownloading) return;

  //   try {
  //     await renderAllPagesBeforeExport("pdf");

  //     if (!pdfRef.current) {
  //       alert("PDF content not found. Please try again.");
  //       return;
  //     }

  //     const fileName = `appointment-letter-${getCleanEmployeeName()}.pdf`;
  //     const pdfBlob = await createA4PdfBlob(pdfRef.current);

  //     triggerBlobDownload(pdfBlob, fileName);
  //   } catch (error) {
  //     console.error("Appointment PDF download failed:", error);
  //     alert(
  //       error instanceof Error
  //         ? `PDF download failed: ${error.message}`
  //         : "PDF download failed. Please check console."
  //     );
  //   } finally {
  //     setIsPdfDownloading(false);
  //   }
  // };


  const downloadPDF = async () => {
    if (isPdfDownloading) return;

    try {
      await renderAllPagesBeforeExport("pdf");

      if (!pdfRef.current) {
        alert("PDF content not found. Please try again.");
        return;
      }

      const fileName = `appointment-letter-${getCleanEmployeeName()}.pdf`;
      const pdfBlob = await createA4PdfBlob(pdfRef.current);

      triggerBlobDownload(pdfBlob, fileName);
    } catch (error) {
      console.error("Appointment PDF download failed:", error);
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


  // const isExporting = isPdfDownloading;

  // return (
  //   <div
  //     className={
  //       isExporting
  //         ? "appointment-exporting appointment-pdf-downloading offer-pdf-downloading"
  //         : ""
  //     }
  //   >
  //     {currentStep === 0 && <AppointmentPage1 data={data} setData={setData} />}
  //     {currentStep === 1 && <AppointmentPage2 data={data} setData={setData} />}
  //     {currentStep === 2 && <AppointmentPage3 data={data} setData={setData} />}
  //     {currentStep === 3 && <AppointmentPage4 data={data} setData={setData} />}
  //     {currentStep === 4 && <AppointmentPage5 data={data} setData={setData} />}

  //     {currentStep === 5 && (
  //       <div ref={pdfRef} className="appointment-print-preview-pages print-preview-pages">
  //         <AppointmentPage1 data={data} setData={setData} />
  //         <AppointmentPage2 data={data} setData={setData} />
  //         <AppointmentPage3 data={data} setData={setData} />
  //         <AppointmentPage4 data={data} setData={setData} />
  //         <AppointmentPage5 data={data} setData={setData} />
  //       </div>
  //     )}

  //     <div className="step-wizard appointment-step-wizard">
  //       <button
  //         className="step-btn"
  //         onClick={() => setCurrentStep((s) => Math.max(0, s - 1))}
  //         disabled={currentStep === 0 || isPdfDownloading}
  //       >
  //         ← Back
  //       </button>

  //       {STEPS.map((label, i) => (
  //         <button
  //           key={i}
  //           className={`step-btn ${currentStep === i ? "active" : ""}`}
  //           onClick={() => setCurrentStep(i)}
  //           disabled={isPdfDownloading}
  //         >
  //           {i + 1}. {label}
  //         </button>
  //       ))}

  //       <button
  //         className="step-btn"
  //         onClick={() =>
  //           setCurrentStep((s) => Math.min(STEPS.length - 1, s + 1))
  //         }
  //         disabled={currentStep === STEPS.length - 1 || isPdfDownloading}
  //       >
  //         Next →
  //       </button>

  //       {/* <button
  //         className="appointment-print-btn"
  //         onClick={openChromePrintPreview}
  //         disabled={isPdfDownloading}
  //       >
  //         Chrome Preview / Save PDF
  //       </button> */}

  //       <button
  //         className="step-btn-download"
  //         onClick={downloadPDF}
  //         disabled={isPdfDownloading}
  //       >
  //         {isPdfDownloading ? "Preparing PDF..." : "Download PDF"}
  //       </button>
  //     </div>
  //   </div>
  // );



  const isBusy = isPdfDownloading;

  return (
    <div className={isBusy ? "letter-ui-busy" : ""}>
         <PrintBlockedToast />
      {currentStep === 0 && <AppointmentPage1 data={data} setData={setData} />}
      {currentStep === 1 && <AppointmentPage2 data={data} setData={setData} />}
      {currentStep === 2 && <AppointmentPage3 data={data} setData={setData} />}
      {currentStep === 3 && <AppointmentPage4 data={data} setData={setData} />}
      {currentStep === 4 && <AppointmentPage5 data={data} setData={setData} />}

      {currentStep === 5 && (
        <div
          ref={pdfRef}
          className={`appointment-print-preview-pages print-preview-pages ${isPdfExportMode ? "pdf-export-content appointment-pdf-export-content" : ""
            }`}
        >
          <AppointmentPage1 data={data} setData={setData} />
          <AppointmentPage2 data={data} setData={setData} />
          <AppointmentPage3 data={data} setData={setData} />
          <AppointmentPage4 data={data} setData={setData} />
          <AppointmentPage5 data={data} setData={setData} />
        </div>
      )}

      <div className="step-wizard appointment-step-wizard">
        <button
          className="step-btn"
          onClick={() => setCurrentStep((s) => Math.max(0, s - 1))}
          disabled={currentStep === 0 || isBusy}
        >
          ← Back
        </button>

        {STEPS.map((label, i) => (
          <button
            key={i}
            className={`step-btn ${currentStep === i ? "active" : ""}`}
            onClick={() => setCurrentStep(i)}
            disabled={isBusy}
          >
            {i + 1}. {label}
          </button>
        ))}

        <button
          className="step-btn"
          onClick={() =>
            setCurrentStep((s) => Math.min(STEPS.length - 1, s + 1))
          }
          disabled={currentStep === STEPS.length - 1 || isBusy}
        >
          Next →
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

export default AppointmentPagesMain;