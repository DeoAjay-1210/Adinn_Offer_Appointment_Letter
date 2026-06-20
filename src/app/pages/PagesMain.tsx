// main pages 
/* eslint-disable */
// @ts-nocheck
"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import UseBlockBrowserPrint from "../components/utils/useBlockBrowserPrint.tsx";
import PrintBlockedToast from "../components/utils/PrintBlockedToast.tsx";

import { flushSync } from "react-dom";

import Page1 from "./Page1";
import Page2 from "./Page2";
import Page3 from "./Page3";
import Page4 from "./Page4";
import Page5 from "./Page5";

import "./Page1.css";
import { generateOfferDocx } from "../components/utils/generateOfferDocx";

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
  salaryType: "WITH_PF",
  monthlyCTC: "31808",
  variablePay: "0",
};

const STEPS = [
  "Page 1 - Details",
  "Page 2 - Policies",
  "Page 3 - Emp Acceptance 1",
  "Page 4 - Salary / T&C",
  "Page 5 - Emp Acceptance 2",
  "Preview",
];

function PagesMain() {
  const router = useRouter();

  // Normal chrome print blocked 
  UseBlockBrowserPrint(
    "Normal Chrome print is disabled for Offer Letter. Please use the Download PDF button."
  );

  const [data, setData] = useState(DEFAULT_DATA);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPdfDownloading, setIsPdfDownloading] = useState(false);
  const [isDocxDownloading, setIsDocxDownloading] = useState(false);
  const [isPdfExportMode, setIsPdfExportMode] = useState(false);


  const pdfRef = useRef(null);

  useEffect(() => {
    localStorage.setItem("adinnOfferLetterData", JSON.stringify(data));
  }, [data]);

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


  // const renderAllPagesBeforeExport = async (type?: "pdf" | "docx") => {
  //   flushSync(() => {
  //     setCurrentStep(5);

  //     if (type === "pdf") {
  //       setIsPdfDownloading(true);
  //     }

  //     if (type === "docx") {
  //       setIsDocxDownloading(true);
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



  const renderAllPagesBeforeExport = async (type?: "pdf" | "docx") => {
    flushSync(() => {
      setCurrentStep(5);

      if (type === "pdf") {
        setIsPdfDownloading(true);
        setIsPdfExportMode(true);
      }

      if (type === "docx") {
        setIsDocxDownloading(true);
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
      const rect = page.getBoundingClientRect();

      const canvas = await html2canvas(page, {
        scale: 2.5,
        useCORS: true,
        allowTaint: false,
        backgroundColor: "#ffffff",
        logging: false,

        //       width: Math.ceil(rect.width),
        //       height: Math.ceil(rect.height),

        //       scrollX: -window.scrollX,
        //       scrollY: -window.scrollY,

        //      windowWidth: window.document.documentElement.scrollWidth,
        // windowHeight: window.document.documentElement.scrollHeight,


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
    await renderAllPagesBeforeExport();

    setTimeout(() => {
      window.print();
    }, 250);
  };

  // const downloadPDF = async () => {
  //   if (isPdfDownloading || isDocxDownloading) return;

  //   try {
  //     // setIsPdfDownloading(true);
  //     // await renderAllPagesBeforeExport();
  //     await renderAllPagesBeforeExport("pdf");

  //     if (!pdfRef.current) {
  //       alert("PDF content not found. Please try again.");
  //       return;
  //     }

  //     const fileName = `offer-letter-${getCleanEmployeeName()}.pdf`;
  //     const pdfBlob = await createA4PdfBlob(pdfRef.current);

  //     triggerBlobDownload(pdfBlob, fileName);
  //   } catch (error) {
  //     console.error("Offer PDF download failed:", error);
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
    if (isPdfDownloading || isDocxDownloading) return;

    try {
      await renderAllPagesBeforeExport("pdf");

      if (!pdfRef.current) {
        alert("PDF content not found. Please try again.");
        return;
      }

      const fileName = `offer-letter-${getCleanEmployeeName()}.pdf`;
      const pdfBlob = await createA4PdfBlob(pdfRef.current);

      triggerBlobDownload(pdfBlob, fileName);
    } catch (error) {
      console.error("Offer PDF download failed:", error);
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



  const downloadDOCX = async () => {
    if (isPdfDownloading || isDocxDownloading) return;

    try {
      setIsDocxDownloading(true);

      const docx = await import("docx");
      const fileSaver = await import("file-saver");

      const {
        Document,
        Packer,
        Paragraph,
        TextRun,
        AlignmentType,
        HeadingLevel,
        PageBreak,
        Header,
        Footer,
        Table,
        TableRow,
        TableCell,
        WidthType,
        ShadingType,
        BorderStyle,
      } = docx;

      const run = (text, options = {}) =>
        new TextRun({
          text: String(text ?? ""),
          size: options.size || 22,
          bold: options.bold || false,
          break: options.break || 0,
        });

      const para = (children, options = {}) =>
        new Paragraph({
          children: Array.isArray(children) ? children : [run(children)],
          alignment: options.alignment,
          heading: options.heading,
          spacing: {
            after: options.after ?? 140,
            line: 276,
          },
        });

      const detail = (label, value) =>
        para([
          run(label, { bold: true }),
          run(` : ${value}`),
        ]);

      const pageBreak = () =>
        new Paragraph({
          children: [new PageBreak()],
        });

      const children = [
        para([run(`Date: ${data.offerDate}`, { bold: true })], {
          alignment: AlignmentType.RIGHT,
          after: 300,
        }),

        para("To,", { after: 100 }),
        para(data.employeeName, { after: 160 }),
        para(data.addressLine1, { after: 80 }),
        para(data.addressLine2, { after: 80 }),
        para(data.addressLine3, { after: 300 }),

        para([run("Subject: Offer of Employment", { bold: true })], {
          after: 260,
        }),

        para([
          run("Dear Mr. "),
          run(data.employeeName, { bold: true }),
          run(","),
        ]),

        para([
          run("We are pleased to offer you the position of "),
          run(data.designation, { bold: true }),
          run(" in the "),
          run(data.department, { bold: true }),
          run(" at Adinn Advertising Services Limited, "),
          run(data.branch, { bold: true }),
          run(", subject to the terms and conditions mentioned in this letter."),
        ]),

        para([
          run("Your proposed date of joining will be "),
          run(data.dateOfJoining, { bold: true }),
          run("."),
        ]),

        para([run("Employment Details", { bold: true })], { after: 160 }),
        detail("Employee Name", data.employeeName),
        detail("Designation", data.designation),
        detail("Department", data.department),
        detail("Branch / Location", data.branch),
        detail("Reporting To", data.reportingTo),
        detail("Date of Joining", data.dateOfJoining),
        detail("Employment Type", data.employmentType),
        detail("Probation Period", data.probationPeriod),

        pageBreak(),

        para([run("Probation Period", { bold: true })], {
          heading: HeadingLevel.HEADING_2,
        }),
        para(
          `You will be on probation for a period of ${data.probationPeriod} from your date of joining. During the probation period, your performance, conduct, attendance, discipline, and suitability for the role will be evaluated.`
        ),
        para(
          "Upon successful completion of the probation period and subject to management approval, you may be confirmed as a permanent employee and issued an Appointment Letter."
        ),
        para(
          "The Company reserves the right to extend the probation period if deemed necessary based on performance or business requirements."
        ),

        para([run("Compensation", { bold: true })], {
          heading: HeadingLevel.HEADING_2,
        }),
        para(
          "Your compensation structure will be communicated separately through the Salary Annexure attached to this offer letter. All statutory deductions and other deductions, wherever applicable, shall be made as per Company policy and applicable laws."
        ),

        para([run("Company Policies", { bold: true })], {
          heading: HeadingLevel.HEADING_2,
        }),
        para(
          "You shall be governed by all Company rules, regulations, policies, procedures, code of conduct, HR policies, IT policies, safety policies, and any amendments issued from time to time."
        ),

        para([run("Documents Required at Joining", { bold: true })], {
          heading: HeadingLevel.HEADING_2,
        }),
        para("Aadhaar Card"),
        para("PAN Card"),
        para("Educational Certificates (12th, UG, PG)"),
        para("Passport Size Photographs"),
        para("Bank Account Details"),
        para("Previous Employment Documents, if applicable"),

        pageBreak(),

        para([run("Acceptance of Offer", { bold: true })], {
          heading: HeadingLevel.HEADING_2,
        }),
        para(
          "Please sign and return a copy of this letter as a token of your acceptance of the offer and agreement to abide by the Company's terms, conditions, policies, rules, and regulations."
        ),
        para(
          "We look forward to welcoming you to Adinn Advertising Services Limited and wish you a successful career with us."
        ),
        para("For Adinn Advertising Services Limited", { after: 900 }),
        para([run(data.hrName, { bold: true })]),
        para("HR Manager", { after: 700 }),
        para([run("Employee Acceptance", { bold: true })]),
        para(
          "I, Mr./Ms. ________________________________, hereby accept the offer of employment with Adinn Advertising Services Limited and agree to comply with all Company policies, rules, regulations, terms, and conditions applicable from time to time."
        ),
        detail("Employee Name", ""),
        detail("Signature", ""),
        detail("Date", ""),

        pageBreak(),

        para([run("SALARY ANNEXURE", { bold: true })], {
          alignment: AlignmentType.CENTER,
          heading: HeadingLevel.HEADING_1,
        }),
        para([run(`Date: ${data.offerDate}`, { bold: true })], {
          alignment: AlignmentType.RIGHT,
        }),
        detail("Employee Name", data.employeeName),
        detail("Designation", data.designation),
        detail("Department", data.department),
        detail("Branch / Location", data.branch),
        detail("Reporting To", data.reportingTo),
        detail("Date of Joining", data.dateOfJoining),

        para([run("Terms & Conditions", { bold: true })], {
          heading: HeadingLevel.HEADING_2,
        }),
        para("1. Salary shall be paid on or before the scheduled salary disbursement date as per company policy."),
        para("2. Statutory deductions such as PF, ESI, Professional Tax, Income Tax, or any other applicable deductions shall be made as per prevailing laws."),
        para("3. Salary structure and benefits are confidential and should not be disclosed to unauthorized persons."),
        para("4. The Company reserves the right to revise, restructure, or modify compensation components in accordance with business requirements and applicable laws."),
        para("5. Any excess payment, erroneous payment, or policy-related recovery may be adjusted from future salary or final settlement."),

        pageBreak(),

        para("For Adinn Advertising Services Limited", { after: 900 }),
        para([run(data.hrName, { bold: true })]),
        para("HR Manager", { after: 900 }),
        para([run("Employee Acceptance", { bold: true })]),
        para(
          "I have read and understood the compensation structure mentioned above and accept the same."
        ),
        detail("Signature", ""),
        detail("Date", ""),
      ];

      const document = new Document({
        sections: [
          {
            properties: {
              page: {
                size: {
                  width: 11906,
                  height: 16838,
                },
                margin: {
                  top: 720,
                  right: 900,
                  bottom: 720,
                  left: 900,
                },
              },
            },
            headers: {
              default: new Header({
                children: [
                  para([run("Adinn Advertising Services Ltd.", { bold: true, size: 18 })], {
                    alignment: AlignmentType.RIGHT,
                  }),
                ],
              }),
            },
            footers: {
              default: new Footer({
                children: [
                  para(
                    [
                      run("REGISTERED OFFICE : ", { bold: true, size: 14 }),
                      run(
                        "29, 1st Cross street, Vanamamalai nagar, Bypass road, Madurai - 625016.",
                        { size: 14 }
                      ),
                    ],
                    { alignment: AlignmentType.CENTER, after: 40 }
                  ),
                  para(
                    [
                      run("BRANCH OFFICE : ", { bold: true, size: 14 }),
                      run(
                        "Chennai | Bengaluru | Kerala | Tel: 91 452 4344800 - 801. Email: info@adinn.co.in. www.adinn.com",
                        { size: 14 }
                      ),
                    ],
                    { alignment: AlignmentType.CENTER, after: 0 }
                  ),
                ],
              }),
            },
            children,
          },
        ],
      });

      const blob = await Packer.toBlob(document);
      fileSaver.saveAs(blob, `offer-letter-${getCleanEmployeeName()}.docx`);
    } catch (error) {
      console.error("DOCX download failed:", error);
      alert(
        error instanceof Error
          ? `DOCX download failed: ${error.message}`
          : "DOCX download failed. Please check console."
      );
    } finally {
      setIsDocxDownloading(false);
    }
  };


  // const downloadDOCX = async () => {
  //   if (isPdfDownloading || isDocxDownloading) return;

  //   try {
  //     await renderAllPagesBeforeExport("docx");

  //     if (!pdfRef.current) {
  //       alert("DOCX content not found. Please try again.");
  //       return;
  //     }

  //     const html2canvasModule = await import("html2canvas");
  //     const docx = await import("docx");
  //     const fileSaver = await import("file-saver");

  //     const html2canvas = html2canvasModule.default;

  //     const {
  //       Document,
  //       Packer,
  //       Paragraph,
  //       ImageRun,
  //       AlignmentType,
  //       SectionType,
  //     } = docx;

  //     const pages = Array.from(pdfRef.current.querySelectorAll(".a4-page"));

  //     if (!pages.length) {
  //       throw new Error("No A4 pages found for DOCX export.");
  //     }

  //     const sections = [];

  //     for (let index = 0; index < pages.length; index++) {
  //       const page = pages[index] as HTMLElement;
  //       const rect = page.getBoundingClientRect();

  //       const canvas = await html2canvas(page, {
  //         scale: 2.5,
  //         useCORS: true,
  //         allowTaint: false,
  //         backgroundColor: "#ffffff",
  //         logging: false,

  //         width: Math.ceil(rect.width),
  //         height: Math.ceil(rect.height),

  //         scrollX: -window.scrollX,
  //         scrollY: -window.scrollY,

  //         windowWidth: document.documentElement.scrollWidth,
  //         windowHeight: document.documentElement.scrollHeight,
  //       });

  //       const imageBlob = await new Promise<Blob>((resolve, reject) => {
  //         canvas.toBlob((blob) => {
  //           if (blob) resolve(blob);
  //           else reject(new Error("Failed to create DOCX page image."));
  //         }, "image/png");
  //       });

  //       const imageBuffer = await imageBlob.arrayBuffer();

  //       sections.push({
  //         properties: {
  //           type: SectionType.NEXT_PAGE,
  //           page: {
  //             size: {
  //               width: 11906,
  //               height: 16838,
  //             },
  //             margin: {
  //               top: 0,
  //               right: 0,
  //               bottom: 0,
  //               left: 0,
  //               header: 0,
  //               footer: 0,
  //               gutter: 0,
  //             },
  //           },
  //         },
  //         children: [
  //           new Paragraph({
  //             children: [
  //               new ImageRun({
  //                 data: imageBuffer,
  //                 type: "png",
  //                 transformation: {
  //                   width: Math.round(rect.width),
  //                   height: Math.round(rect.height),
  //                 },
  //               }),
  //             ],
  //             alignment: AlignmentType.CENTER,
  //             spacing: {
  //               before: 0,
  //               after: 0,
  //               line: 240,
  //             },
  //           }),
  //         ],
  //       });
  //     }

  //     // const document = new Document({
  //     //   sections,
  //     // });

  //     // const blob = await Packer.toBlob(document);
  //     // fileSaver.saveAs(blob, `offer-letter-${getCleanEmployeeName()}.docx`);

  //     const docxDocument = new Document({
  //   sections,
  // });

  // const blob = await Packer.toBlob(docxDocument);

  // const saveAs =
  //   fileSaver.saveAs || fileSaver.default?.saveAs || fileSaver.default;

  // saveAs(blob, `offer-letter-${getCleanEmployeeName()}.docx`);
  //   } catch (error) {
  //     console.error("DOCX download failed:", error);
  //     alert(
  //       error instanceof Error
  //         ? `DOCX download failed: ${error.message}`
  //         : "DOCX download failed. Please check console."
  //     );
  //   } finally {
  //     setIsDocxDownloading(false);
  //   }
  // };

  // const isExporting = isPdfDownloading || isDocxDownloading;

  // return (
  //   // <div className={isPdfDownloading ? "offer-pdf-downloading" : ""}>
  //   <div
  //     className={
  //       isExporting
  //         ? "offer-exporting offer-pdf-downloading appointment-pdf-downloading"
  //         : ""
  //     }
  //   >
  //     {currentStep === 0 && <Page1 data={data} setData={setData} />}
  //     {currentStep === 1 && <Page2 data={data} setData={setData} />}
  //     {currentStep === 2 && <Page3 data={data} setData={setData} />}
  //     {currentStep === 3 && <Page4 data={data} setData={setData} />}
  //     {currentStep === 4 && <Page5 data={data} setData={setData} />}

  //     {currentStep === 5 && (
  //       <div ref={pdfRef} className="print-preview-pages">
  //         <Page1 data={data} setData={setData} />
  //         <Page2 data={data} setData={setData} />
  //         <Page3 data={data} setData={setData} />
  //         <Page4 data={data} setData={setData} />
  //         <Page5 data={data} setData={setData} />
  //       </div>
  //     )}

  //     <div className="step-wizard">
  //       <button
  //         className="step-btn"
  //         onClick={() => setCurrentStep((s) => Math.max(0, s - 1))}
  //         disabled={currentStep === 0 || isPdfDownloading || isDocxDownloading}
  //       >
  //         Back
  //       </button>

  //       {STEPS.map((label, index) => (
  //         <button
  //           key={index}
  //           className={`step-btn ${currentStep === index ? "active" : ""}`}
  //           onClick={() => setCurrentStep(index)}
  //           disabled={isPdfDownloading || isDocxDownloading}
  //         >
  //           {index + 1}. {label}
  //         </button>
  //       ))}

  //       <button
  //         className="step-btn"
  //         onClick={() =>
  //           setCurrentStep((s) => Math.min(STEPS.length - 1, s + 1))
  //         }
  //         disabled={
  //           currentStep === STEPS.length - 1 ||
  //           isPdfDownloading ||
  //           isDocxDownloading
  //         }
  //       >
  //         Next
  //       </button>

  //       {/* <button
  //         className="step-btn-download"
  //         onClick={openChromePrintPreview}
  //         disabled={isPdfDownloading || isDocxDownloading}
  //       >
  //         Chrome Preview / Save PDF
  //       </button> */}

  //       <button
  //         className="step-btn-download"
  //         onClick={downloadPDF}
  //         disabled={isPdfDownloading || isDocxDownloading}
  //       >
  //         {isPdfDownloading ? "Preparing PDF..." : "Download PDF"}
  //       </button>


  //        <button className="step-btn-download" > Home </button>

  //       {/* <button
  //         // className="step-btn-download"
  //         // onClick={downloadDOCX}
  //         // disabled={isPdfDownloading || isDocxDownloading}
  //         className="step-btn-download"
  //         disabled={isPdfDownloading || isDocxDownloading}
  //         onClick={() => generateOfferDocx(data)}
  //       >
  //         {isDocxDownloading ? "Preparing DOCX..." : "Download DOCX"}
  //       </button> */}
  //     </div>
  //   </div>
  // );

  const isBusy = isPdfDownloading || isDocxDownloading;

  return (
    <div className={isBusy ? "letter-ui-busy" : ""}>
       <PrintBlockedToast />
      {currentStep === 0 && <Page1 data={data} setData={setData} />}
      {currentStep === 1 && <Page2 data={data} setData={setData} />}
      {currentStep === 2 && <Page3 data={data} setData={setData} />}
      {currentStep === 3 && <Page4 data={data} setData={setData} />}
      {currentStep === 4 && <Page5 data={data} setData={setData} />}

      {currentStep === 5 && (
        <div
          ref={pdfRef}
          className={`print-preview-pages ${isPdfExportMode ? "pdf-export-content offer-pdf-export-content" : ""
            }`}
        >
          <Page1 data={data} setData={setData} />
          <Page2 data={data} setData={setData} />
          <Page3 data={data} setData={setData} />
          <Page4 data={data} setData={setData} />
          <Page5 data={data} setData={setData} />
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

        {/* DOCX button if needed later */}
        {/* 
      <button
        className={`step-btn-download ${isDocxDownloading ? "is-loading" : ""}`}
        disabled={isBusy}
        onClick={() => generateOfferDocx(data)}
      >
        {isDocxDownloading && <span className="btn-spinner"></span>}
        <span>{isDocxDownloading ? "Preparing DOCX..." : "Download DOCX"}</span>
      </button>
      */}
      </div>
    </div>
  );


}

export default PagesMain;