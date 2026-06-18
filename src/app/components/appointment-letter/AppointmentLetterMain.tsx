// /* eslint-disable */
// // @ts-nocheck
// "use client";

// import React, { useRef, useState } from "react";
// import { flushSync } from "react-dom";

// import AppointmentPage1 from "./AppointmentPage1";
// import AppointmentPage2 from "./AppointmentPage2";
// import AppointmentPage3 from "./AppointmentPage3";
// import AppointmentPage4 from "./AppointmentPage4";
// import AppointmentPage5 from "./AppointmentPage5";

// // keep your same DEFAULT_APPOINTMENT_DATA here
// const DEFAULT_APPOINTMENT_DATA = {
//   letterDate: "01/07/2026",
//   employeeName: "Soundarapandian M",
//   employeeId: "1449",

//   addressLine1: "1A, Thiyagarajan Nagar,",
//   addressLine2: "Sourashtra Teachers Colony,",
//   addressLine3: "Anuppaady, Madurai.",

//   designation: "Senior Graphic Designer",
//   department: "Arts & Creative",
//   branch: "Head Office",
//   reportingTo: "Sathish Kumar L",
//   dateOfJoining: "02-08-2023",
//   confirmationDate: "01-07-2026",
//   employmentType: "Full-Time",
//   effectiveDateText: "1st July 2026",

//   hrName: "Gayathri S",

//   salaryRows: [
//     { type: "heading", label: "A. EARNINGS (GROSS SALARY COMPONENTS)", monthly: "", annual: "" },
//     { type: "normal", label: "Basic", monthly: "19,085.00", annual: "2,29,020.00" },
//     { type: "normal", label: "House Rent Allowance (HRA)", monthly: "4,580.00", annual: "54,960.00" },
//     { type: "normal", label: "Children Education Allowance", monthly: "200.00", annual: "2,400.00" },
//     { type: "normal", label: "Other Allowance", monthly: "6,143.00", annual: "73,716.00" },
//     { type: "total", label: "TOTAL GROSS SALARY", monthly: "30,008.00", annual: "3,60,096.00" },

//     { type: "heading", label: "B. EMPLOYER CONTRIBUTIONS", monthly: "", annual: "" },
//     { type: "normal", label: "Employer EPF Contribution", monthly: "1,800.00", annual: "21,600.00" },
//     { type: "total", label: "TOTAL COST TO COMPANY (CTC)", monthly: "31,808.00", annual: "3,81,696.00" },

//     { type: "heading", label: "C. EMPLOYEE STATUTORY DEDUCTIONS", monthly: "", annual: "" },
//     { type: "normal", label: "Employee EPF Contribution", monthly: "1,800.00", annual: "21,600.00" },
//     { type: "normal", label: "Professional Tax (PT)", monthly: "208.00", annual: "2,496.00" },
//     { type: "total", label: "TOTAL EMPLOYEE DEDUCTIONS", monthly: "2,008.00", annual: "24,096.00" },
//     { type: "total", label: "D. NET TAKE-HOME SALARY", monthly: "28,000.00", annual: "3,36,000.00" },
//   ],
// };

// const STEPS = [
//   "Page 1",
//   "Page 2",
//   "Page 3",
//   "Salary Annexure",
//   "Salary T&C",
//   "Preview",
// ];

// export default function AppointmentLetterMain() {
//   const [data, setData] = useState(DEFAULT_APPOINTMENT_DATA);
//   const [currentStep, setCurrentStep] = useState(0);
//   const [isPdfDownloading, setIsPdfDownloading] = useState(false);

//   const pdfRef = useRef(null);

//   const update = (field, value) => {
//     setData((prev) => ({
//       ...prev,
//       [field]: value,
//     }));
//   };

//   const updateSalaryRow = (index, field, value) => {
//     setData((prev) => {
//       const updatedRows = [...prev.salaryRows];

//       updatedRows[index] = {
//         ...updatedRows[index],
//         [field]: value,
//       };

//       return {
//         ...prev,
//         salaryRows: updatedRows,
//       };
//     });
//   };

//   const getCleanEmployeeName = () => {
//     return data.employeeName
//       .replaceAll("Mr.", "")
//       .replaceAll("Ms.", "")
//       .replaceAll("Mrs.", "")
//       .replaceAll(".", "")
//       .trim()
//       .toLowerCase()
//       .replace(/\s+/g, "-");
//   };

//   const waitForImages = async () => {
//     const images = Array.from(document.images);

//     await Promise.all(
//       images.map((img) => {
//         if (img.complete) return Promise.resolve();

//         return new Promise((resolve) => {
//           img.onload = resolve;
//           img.onerror = resolve;
//         });
//       })
//     );
//   };

//   // Opens default Chrome print preview
//   const openChromePrintPreview = async () => {
//     flushSync(() => {
//       setCurrentStep(5);
//     });

//     if (document.fonts) {
//       await document.fonts.ready;
//     }

//     await waitForImages();

//     setTimeout(() => {
//       window.print();
//     }, 300);
//   };

//   // Direct PDF download
//   const downloadPDF = async () => {
//     try {
//       setIsPdfDownloading(true);

//       flushSync(() => {
//         setCurrentStep(5);
//       });

//       if (document.fonts) {
//         await document.fonts.ready;
//       }

//       await waitForImages();

//       await new Promise((resolve) => setTimeout(resolve, 400));

//       const html2pdf = (await import("html2pdf.js")).default;

//       const fileName = `appointment-letter-${getCleanEmployeeName()}.pdf`;

//       const options = {
//         margin: 0,
//         filename: fileName,
//         image: {
//           type: "jpeg",
//           quality: 0.98,
//         },
//         html2canvas: {
//           scale: 2,
//           useCORS: true,
//           letterRendering: true,
//           scrollY: 0,
//           backgroundColor: "#ffffff",
//         },
//         jsPDF: {
//           unit: "mm",
//           format: "a4",
//           orientation: "portrait",
//         },
//         pagebreak: {
//           mode: ["css", "legacy"],
//         },
//       };

//       if (!pdfRef.current) {
//         alert("PDF content not found. Please try again.");
//         return;
//       }

//       await html2pdf().set(options).from(pdfRef.current).save();
//     } catch (error) {
//       console.error("Appointment PDF download failed:", error);
//       alert("PDF download failed. Please check console.");
//     } finally {
//       setIsPdfDownloading(false);
//     }
//   };

//   const pageProps = {
//     data,
//     update,
//     updateSalaryRow,
//   };

//   return (
//     <div className={isPdfDownloading ? "apt-pdf-downloading" : ""}>
//       {/* Single page edit mode */}
//       {currentStep === 0 && <AppointmentPage1 {...pageProps} />}
//       {currentStep === 1 && <AppointmentPage2 {...pageProps} />}
//       {currentStep === 2 && <AppointmentPage3 {...pageProps} />}
//       {currentStep === 3 && <AppointmentPage4 {...pageProps} />}
//       {currentStep === 4 && <AppointmentPage5 {...pageProps} />}

//       {/* Preview mode — all 5 pages */}
//       {currentStep === 5 && (
//         <div ref={pdfRef} className="apt-print-preview-pages">
//           <AppointmentPage1 {...pageProps} />
//           <AppointmentPage2 {...pageProps} />
//           <AppointmentPage3 {...pageProps} />
//           <AppointmentPage4 {...pageProps} />
//           <AppointmentPage5 {...pageProps} />
//         </div>
//       )}

//       {/* Wizard bar */}
//       <div className="apt-step-wizard">
//         <button
//           className="apt-step-btn"
//           disabled={currentStep === 0 || isPdfDownloading}
//           onClick={() => setCurrentStep((prev) => Math.max(0, prev - 1))}
//         >
//           ← Back
//         </button>

//         {STEPS.map((step, index) => (
//           <button
//             key={step}
//             className={`apt-step-btn ${currentStep === index ? "active" : ""}`}
//             onClick={() => setCurrentStep(index)}
//             disabled={isPdfDownloading}
//           >
//             {index + 1}. {step}
//           </button>
//         ))}

//         <button
//           className="apt-step-btn"
//           disabled={currentStep === STEPS.length - 1 || isPdfDownloading}
//           onClick={() =>
//             setCurrentStep((prev) => Math.min(STEPS.length - 1, prev + 1))
//           }
//         >
//           Next →
//         </button>

//         {/* Opens default Chrome preview */}
//         <button
//           className="apt-download-btn"
//           onClick={openChromePrintPreview}
//           disabled={isPdfDownloading}
//         >
//           Chrome Preview / Save PDF
//         </button>

//         {/* Direct PDF download */}
//         <button
//           className="apt-download-btn"
//           onClick={downloadPDF}
//           disabled={isPdfDownloading}
//         >
//           {isPdfDownloading ? "Preparing PDF..." : "Download PDF"}
//         </button>
//       </div>
//     </div>
//   );
// }

// /* eslint-disable */
// // @ts-nocheck
// "use client";

// import React, { useRef, useState } from "react";
// import { flushSync } from "react-dom";

// import AppointmentPage1 from "./AppointmentPage1";
// import AppointmentPage2 from "./AppointmentPage2";
// import AppointmentPage3 from "./AppointmentPage3";
// import AppointmentPage4 from "./AppointmentPage4";
// import AppointmentPage5 from "./AppointmentPage5";

// /*
//   IMPORTANT:
//   Use your existing common offer CSS.
//   If this file is inside appointment/pages and Page1.css is inside offer/pages,
//   change this import path based on your folder.
// */
// import "../../pages/Page1.css";
// import "../appointment-letter/AppointmentLetter.css";

// const DEFAULT_APPOINTMENT_DATA = {
//   letterDate: "01/07/2026",
//   employeeName: "Soundarapandian M",
//   employeeId: "1449",

//   addressLine1: "1A, Thiyagarajan Nagar,",
//   addressLine2: "Sourashtra Teachers colony,",
//   addressLine3: "Anuppaady, Madurai.",

//   designation: "Senior Graphic Designer",
//   department: "Arts & Creative",
//   branch: "Head Office",
//   reportingTo: "Sathish Kumar L",
//   dateOfJoining: "02-08-2023",
//   confirmationDate: "01-07-2026",
//   employmentType: "Full-Time",
//   effectiveDateText: "1st July 2026",
//   hrName: "Gayathri S",

//   salaryRows: [
//     {
//       type: "heading",
//       label: "A. EARNINGS (GROSS SALARY COMPONENTS)",
//       monthly: "",
//       annual: "",
//     },
//     {
//       type: "normal",
//       label: "Basic",
//       monthly: "19,085.00",
//       annual: "2,29,020.00",
//     },
//     {
//       type: "normal",
//       label: "House Rent Allowance (HRA)",
//       monthly: "4,580.00",
//       annual: "54,960.00",
//     },
//     {
//       type: "normal",
//       label: "Children Education Allowance",
//       monthly: "200.00",
//       annual: "2,400.00",
//     },
//     {
//       type: "normal",
//       label: "Other Allowance",
//       monthly: "6,143.00",
//       annual: "73,716.00",
//     },
//     {
//       type: "total",
//       label: "TOTAL GROSS SALARY",
//       monthly: "30,008.00",
//       annual: "3,60,096.00",
//     },

//     {
//       type: "heading",
//       label: "B. EMPLOYER CONTRIBUTIONS",
//       monthly: "",
//       annual: "",
//     },
//     {
//       type: "normal",
//       label: "Employer EPF Contribution",
//       monthly: "1,800.00",
//       annual: "21,600.00",
//     },
//     {
//       type: "total",
//       label: "TOTAL COST TO COMPANY (CTC)",
//       monthly: "31,808.00",
//       annual: "3,81,696.00",
//     },

//     {
//       type: "heading",
//       label: "C. EMPLOYEE STATUTORY DEDUCTIONS",
//       monthly: "",
//       annual: "",
//     },
//     {
//       type: "normal",
//       label: "Employee EPF Contribution",
//       monthly: "1,800.00",
//       annual: "21,600.00",
//     },
//     {
//       type: "normal",
//       label: "Professional Tax (PT)",
//       monthly: "208.00",
//       annual: "2,496.00",
//     },
//     {
//       type: "total",
//       label: "TOTAL EMPLOYEE DEDUCTIONS",
//       monthly: "2,008.00",
//       annual: "24,096.00",
//     },
//     {
//       type: "total",
//       label: "D. NET TAKE-HOME SALARY",
//       monthly: "28,000.00",
//       annual: "3,36,000.00",
//     },
//   ],
// };

// const STEPS = [
//   "Page 1 — Details",
//   "Page 2 — Terms",
//   "Page 3 — Acceptance",
//   "Page 4 — Salary Annexure",
//   "Page 5 — Salary T&C",
//   "Preview",
// ];

// function AppointmentPagesMain() {
//   const [data, setData] = useState(DEFAULT_APPOINTMENT_DATA);
//   const [currentStep, setCurrentStep] = useState(0);
//   const [isPdfDownloading, setIsPdfDownloading] = useState(false);

//   const pdfRef = useRef(null);

//   const getCleanEmployeeName = () => {
//     return data.employeeName
//       .replaceAll("Mr.", "")
//       .replaceAll("Ms.", "")
//       .replaceAll("Mrs.", "")
//       .replaceAll(".", "")
//       .trim()
//       .toLowerCase()
//       .replace(/\s+/g, "-");
//   };

//   const waitForImages = async () => {
//     const images = Array.from(document.images);

//     await Promise.all(
//       images.map((img) => {
//         if (img.complete) return Promise.resolve();

//         return new Promise((resolve) => {
//           img.onload = resolve;
//           img.onerror = resolve;
//         });
//       })
//     );
//   };

//   const openChromePrintPreview = async () => {
//     flushSync(() => {
//       setCurrentStep(5);
//     });

//     if (document.fonts) {
//       await document.fonts.ready;
//     }

//     await waitForImages();

//     setTimeout(() => {
//       window.print();
//     }, 300);
//   };

//   const downloadPDF = async () => {
//     try {
//       setIsPdfDownloading(true);

//       flushSync(() => {
//         setCurrentStep(5);
//       });

//       if (document.fonts) {
//         await document.fonts.ready;
//       }

//       await waitForImages();

//       await new Promise((resolve) => setTimeout(resolve, 400));

//       const html2pdf = (await import("html2pdf.js")).default;

//       const fileName = `appointment-letter-${getCleanEmployeeName()}.pdf`;

//       const options = {
//         margin: 0,
//         filename: fileName,
//         image: {
//           type: "jpeg",
//           quality: 0.98,
//         },
//         html2canvas: {
//           scale: 2,
//           useCORS: true,
//           letterRendering: true,
//           scrollY: 0,
//           backgroundColor: "#ffffff",
//         },
//         jsPDF: {
//           unit: "mm",
//           format: "a4",
//           orientation: "portrait",
//         },
//         pagebreak: {
//           mode: ["css", "legacy"],
//         },
//       };

//       if (!pdfRef.current) {
//         alert("PDF content not found. Please open preview and try again.");
//         return;
//       }

//       await html2pdf().set(options).from(pdfRef.current).save();
//     } catch (error) {
//       console.error("Appointment PDF download failed:", error);
//       alert("PDF download failed. Please check browser console.");
//     } finally {
//       setIsPdfDownloading(false);
//     }
//   };

//   return (
//     <div className={isPdfDownloading ? "appointment-pdf-downloading" : ""}>
//       {currentStep === 0 && <AppointmentPage1 data={data} setData={setData} />}
//       {currentStep === 1 && <AppointmentPage2 data={data} setData={setData} />}
//       {currentStep === 2 && <AppointmentPage3 data={data} setData={setData} />}
//       {currentStep === 3 && <AppointmentPage4 data={data} setData={setData} />}
//       {currentStep === 4 && <AppointmentPage5 data={data} setData={setData} />}

//       {currentStep === 5 && (
//         <div ref={pdfRef} className="appointment-print-preview-pages">
//           <AppointmentPage1 data={data} setData={setData} />
//           <AppointmentPage2 data={data} setData={setData} />
//           <AppointmentPage3 data={data} setData={setData} />
//           <AppointmentPage4 data={data} setData={setData} />
//           <AppointmentPage5 data={data} setData={setData} />
//         </div>
//       )}

//       <div className="step-wizard appointment-step-wizard">
//         <button
//           className="step-btn"
//           onClick={() => setCurrentStep((s) => Math.max(0, s - 1))}
//           disabled={currentStep === 0 || isPdfDownloading}
//         >
//           ← Back
//         </button>

//         {STEPS.map((label, i) => (
//           <button
//             key={i}
//             className={`step-btn ${currentStep === i ? "active" : ""}`}
//             onClick={() => setCurrentStep(i)}
//             disabled={isPdfDownloading}
//           >
//             {i + 1}. {label}
//           </button>
//         ))}

//         <button
//           className="step-btn"
//           onClick={() => setCurrentStep((s) => Math.min(STEPS.length - 1, s + 1))}
//           disabled={currentStep === STEPS.length - 1 || isPdfDownloading}
//         >
//           Next →
//         </button>

//         <button
//           className="appointment-print-btn"
//           onClick={openChromePrintPreview}
//           disabled={isPdfDownloading}
//         >
//           Chrome Preview / Save PDF
//         </button>

//         <button
//           className="step-btn-download"
//           onClick={downloadPDF}
//           disabled={isPdfDownloading}
//         >
//           {isPdfDownloading ? "Preparing PDF..." : "Download PDF"}
//         </button>
//       </div>
//     </div>
//   );
// }

// export default AppointmentPagesMain;



/* eslint-disable */
// @ts-nocheck
"use client";

import React, { useRef, useState } from "react";
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
  employeeName: "Soundarapandian M",
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

  /*
    Salary calculation controls
    salaryType options:
    WITHOUT_PF
    WITH_PF
    WITH_PF_ESI
    VARIABLE_PAY
  */
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
  const [data, setData] = useState(DEFAULT_APPOINTMENT_DATA);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPdfDownloading, setIsPdfDownloading] = useState(false);

  const pdfRef = useRef(null);

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

  const waitForDomPaint = async () => {
    await new Promise((resolve) => {
      requestAnimationFrame(() => {
        requestAnimationFrame(resolve);
      });
    });
  };

  const openChromePrintPreview = async () => {
    flushSync(() => {
      setCurrentStep(5);
    });

    await waitForDomPaint();

    if (document.fonts) {
      await document.fonts.ready;
    }

    await waitForImages();

    setTimeout(() => {
      window.print();
    }, 300);
  };

  const downloadPDF = async () => {
    try {
      setIsPdfDownloading(true);

      flushSync(() => {
        setCurrentStep(5);
      });

      await waitForDomPaint();

      if (document.fonts) {
        await document.fonts.ready;
      }

      await waitForImages();

      await new Promise((resolve) => setTimeout(resolve, 400));

      if (!pdfRef.current) {
        alert("PDF content not found. Please open preview and try again.");
        return;
      }

      const html2pdfModule = await import("html2pdf.js");
      const html2pdf = html2pdfModule.default || html2pdfModule;

      const fileName = `appointment-letter-${getCleanEmployeeName()}.pdf`;

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

      await html2pdf().set(options).from(pdfRef.current).save();
    } catch (error) {
      console.error("Appointment PDF download failed:", error);
      alert("PDF download failed. Please check browser console.");
    } finally {
      setIsPdfDownloading(false);
    }
  };

  return (
    <div className={isPdfDownloading ? "appointment-pdf-downloading" : ""}>
      {currentStep === 0 && <AppointmentPage1 data={data} setData={setData} />}
      {currentStep === 1 && <AppointmentPage2 data={data} setData={setData} />}
      {currentStep === 2 && <AppointmentPage3 data={data} setData={setData} />}
      {currentStep === 3 && <AppointmentPage4 data={data} setData={setData} />}
      {currentStep === 4 && <AppointmentPage5 data={data} setData={setData} />}

      {currentStep === 5 && (
        <div ref={pdfRef} className="appointment-print-preview-pages">
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

        <button
          className="appointment-print-btn"
          onClick={openChromePrintPreview}
          disabled={isPdfDownloading}
        >
          Chrome Preview / Save PDF
        </button>

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

export default AppointmentPagesMain;