// /* eslint-disable */
// // @ts-nocheck
// "use client";
// import React, { useState } from 'react';
// import Page1 from './Page1';
// import Page2 from './Page2';
// import Page3 from './Page3';
// import Page4 from './Page4';
// import Page5 from './Page5';

// import './Page1.css';

// // ── DEFAULT DATA ─────────────────────────────────────────────
// // Change these defaults to pre-fill the letter for a new employee.
// const DEFAULT_DATA = {
//   employeeName:    'Mr. Veerasanjay V',
//   offerDate:       '01/07/2026',
//   addressLine1:    '3/232A, Star Street,',
//   addressLine2:    'Krishna Nagar, Thiruppalai,',
//   addressLine3:    'Madurai - 625014',
//   designation:     'Executive - MIS Analyst',
//   department:      "Director's Office",
//   branch:          'Head Office',
//   reportingTo:     'Ramesh P',
//   dateOfJoining:   '30-05-2026',
//   employmentType:  'Full-Time',
//   probationPeriod: '3 Months',
//   hrName : 'Gayathri S'
// };

// // Step labels shown in the wizard bar
// const STEPS = ['Page 1 — Details', 'Page 2 — Policies','Page 3 — Emp Acceptace1','Page 4 — Salary / T &C','Page 5 — Emp Acceptace2', 'Preview', 'Export PDF'];

// function PagesMain() {
//   // ── Shared editable data ──────────────────────────────────
//   const [data, setData] = useState(DEFAULT_DATA);

//   // ── Current wizard step (0-indexed) ──────────────────────
//   const [currentStep, setCurrentStep] = useState(0);

//   // ── PDF Export ───────────────────────────────────────────
//   // window.print() triggers the browser's print dialog.
//   // The @media print CSS in Page1.css hides the wizard bar
//   // and formats .a4-page divs as individual printed pages.
//   // User can then choose "Save as PDF" in the print dialog.
//   const handleExportPDF = () => {
//     window.print();
//   };

//   return (
//     <div>
      

//       {/* ══════════════════════════════════════════════════
//           PAGE RENDERING
//           ══════════════════════════════════════════════════ */}

//       {/* STEP 0: Show Page 1 only (editable) */}
//       {currentStep === 0 && (
//         <Page1 data={data} setData={setData} />
//       )}

//       {/* STEP 1: Show Page 2 only (editable) */}
//       {currentStep === 1 && (
//         <Page2 data={data} setData={setData} />
//       )}


//        {/* STEP 2: Show Page 3 only (editable) */}
//       {currentStep === 2 && (
//         <Page3 data={data} setData={setData} />
//       )}

//        {/* STEP 3: Show Page 4 only (editable) */}
//       {currentStep === 3 && (
//         <Page4 data={data} setData={setData} />
//       )}

//        {/* STEP 4: Show Page 5 only (editable) */}
//       {currentStep === 4 && (
//         <Page5 data={data} setData={setData} />
//       )}

//       {/* STEP 5 & 6: Show both pages (full preview + export) */}
//       {(currentStep === 5 || currentStep === 6) && (
//         <>
//           {/* Preview info banner (hidden in print) */}
//           <div style={{
//             textAlign: 'center',
//             padding: '10px',
//             background: '#fff3cd',
//             color: '#856404',
//             fontSize: '13px',
//             fontFamily: 'Inter, sans-serif',
//           }}
//             className="step-wizard" // reuses .step-wizard's display:none in print
//           >
//             📄 Preview — Click "Download PDF" to export. Use your browser's
//             print dialog and select "Save as PDF".
//           </div>

//           {/* Render both A4 pages — they'll be separated by page-break in print */}
//           <Page1 data={data} setData={setData} />
//           <Page2 data={data} setData={setData} />
//           <Page3 data={data} setData={setData} />
//           <Page4 data={data} setData={setData} />
//           <Page5 data={data} setData={setData} />

//         </>
//       )}



//       {/* ══════════════════════════════════════════════════
//           STEP WIZARD BAR
//           Sticky at the top. Hidden during print (@media print).
//           ══════════════════════════════════════════════════ */}
//       <div className="step-wizard">

//         {/* Previous button */}
//         <button
//           className="step-btn"
//           onClick={() => setCurrentStep(s => Math.max(0, s - 1))}
//           disabled={currentStep === 0}
//         >
//           ← Back
//         </button>

//         {/* Step indicators */}
//         {STEPS.map((label, i) => (
//           <button
//             key={i}
//             className={`step-btn ${currentStep === i ? 'active' : ''}`}
//             onClick={() => setCurrentStep(i)}
//           >
//             {i + 1}. {label}
//           </button>
//         ))}

//         {/* Next button */}
//         <button
//           className="step-btn"
//           onClick={() => setCurrentStep(s => Math.min(STEPS.length - 1, s + 1))}
//           disabled={currentStep === STEPS.length - 1}
//         >
//           Next →
//         </button>

//         {/* Export button — only visible on last step or preview */}
//         {(currentStep === 5 || currentStep === 6) && (
//           <button className="step-btn-download" onClick={handleExportPDF}>
//             ⬇ Download PDF
//           </button>
//         )}
//       </div>
//     </div>
//   );
// }

// export default PagesMain;
/* eslint-disable */
// @ts-nocheck
"use client";

import React, { useRef, useState } from "react";
import { flushSync } from "react-dom";

import Page1 from "./Page1";
import Page2 from "./Page2";
import Page3 from "./Page3";
import Page4 from "./Page4";
import Page5 from "./Page5";

import "./Page1.css";

const DEFAULT_DATA = {
  employeeName: "Mr. Veerasanjay V",
  offerDate: "01/07/2026",
  addressLine1: "3/232A, Star Street,",
  addressLine2: "Krishna Nagar, Thiruppalai,",
  addressLine3: "Madurai - 625014",
  designation: "Executive - MIS Analyst",
  department: "Director's Office",
  branch: "Head Office",
  reportingTo: "Ramesh P",
  dateOfJoining: "30-05-2026",
  employmentType: "Full-Time",
  probationPeriod: "3 Months",
  hrName: "Gayathri S",
};

const STEPS = [
  "Page 1 — Details",
  "Page 2 — Policies",
  "Page 3 — Emp Acceptance 1",
  "Page 4 — Salary / T&C",
  "Page 5 — Emp Acceptance 2",
  "Preview",
];

function PagesMain() {
  const [data, setData] = useState(DEFAULT_DATA);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPdfDownloading, setIsPdfDownloading] = useState(false);

  const pdfRef = useRef(null);

  // Convert employee name into safe PDF file name
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

  // Wait until all images are loaded before print/pdf
  const waitForImages = async () => {
    const images = Array.from(document.images);

    await Promise.all(
      images.map((img) => {
        if (img.complete) return Promise.resolve();

        return new Promise((resolve) => {
          img.onload = resolve;
          img.onerror = resolve;
        });
      })
    );
  };

  // Button 1: Opens default Chrome print preview
  const openChromePrintPreview = async () => {
    // First render all 5 pages
    flushSync(() => {
      setCurrentStep(5);
    });

    if (document.fonts) {
      await document.fonts.ready;
    }

    await waitForImages();

    setTimeout(() => {
      window.print();
    }, 300);
  };

  // Button 2: Directly downloads PDF with filename
  const downloadPDF = async () => {
    try {
      setIsPdfDownloading(true);

      // First render all 5 pages
      flushSync(() => {
        setCurrentStep(5);
      });

      if (document.fonts) {
        await document.fonts.ready;
      }

      await waitForImages();

      await new Promise((resolve) => setTimeout(resolve, 400));

      const html2pdf = (await import("html2pdf.js")).default;

      const fileName = `offer-letter-${getCleanEmployeeName()}.pdf`;

      const options = {
        margin: 0,
        filename: fileName,
        image: {
          type: "jpeg",
          quality: 0.98,
        },
        html2canvas: {
          scale: 2,
          useCORS: true,
          letterRendering: true,
          scrollY: 0,
          backgroundColor: "#ffffff",
        },
        jsPDF: {
          unit: "mm",
          format: "a4",
          orientation: "portrait",
        },
        pagebreak: {
          mode: ["css", "legacy"],
        },
      };

      if (!pdfRef.current) {
        alert("PDF content not found. Please try again.");
        return;
      }

      await html2pdf().set(options).from(pdfRef.current).save();
    } catch (error) {
      console.error("Offer PDF download failed:", error);
      alert("PDF download failed. Please check console.");
    } finally {
      setIsPdfDownloading(false);
    }
  };

  return (
    <div className={isPdfDownloading ? "offer-pdf-downloading" : ""}>
      {/* Single page edit mode */}
      {currentStep === 0 && <Page1 data={data} setData={setData} />}
      {currentStep === 1 && <Page2 data={data} setData={setData} />}
      {currentStep === 2 && <Page3 data={data} setData={setData} />}
      {currentStep === 3 && <Page4 data={data} setData={setData} />}
      {currentStep === 4 && <Page5 data={data} setData={setData} />}

      {/* Preview mode — all 5 pages */}
      {currentStep === 5 && (
        <div ref={pdfRef} className="print-preview-pages">
          <Page1 data={data} setData={setData} />
          <Page2 data={data} setData={setData} />
          <Page3 data={data} setData={setData} />
          <Page4 data={data} setData={setData} />
          <Page5 data={data} setData={setData} />
        </div>
      )}

      {/* Wizard bar */}
      <div className="step-wizard">
        <button
          className="step-btn"
          onClick={() => setCurrentStep((s) => Math.max(0, s - 1))}
          disabled={currentStep === 0 || isPdfDownloading}
        >
          ← Back
        </button>

        {STEPS.map((label, i) => (
          <button
            key={i}
            className={`step-btn ${currentStep === i ? "active" : ""}`}
            onClick={() => setCurrentStep(i)}
            disabled={isPdfDownloading}
          >
            {i + 1}. {label}
          </button>
        ))}

        <button
          className="step-btn"
          onClick={() =>
            setCurrentStep((s) => Math.min(STEPS.length - 1, s + 1))
          }
          disabled={currentStep === STEPS.length - 1 || isPdfDownloading}
        >
          Next →
        </button>

        {/* Opens default Chrome preview */}
        <button
          className="step-btn-download"
          onClick={openChromePrintPreview}
          disabled={isPdfDownloading}
        >
          Chrome Preview / Save PDF
        </button>

        {/* Direct PDF download */}
        <button
          className="step-btn-download"
          onClick={downloadPDF}
          disabled={isPdfDownloading}
        >
          {isPdfDownloading ? "Preparing PDF..." : "Download PDF"}
        </button>
      </div>
    </div>
  );
}

export default PagesMain;