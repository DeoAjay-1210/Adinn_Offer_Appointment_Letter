/* eslint-disable */
// @ts-nocheck
"use client";

// ============================================================
// letterPdfExport.tsx
// PURPOSE: Shared A4 -> PDF export helpers for the single page
//          letters (Internship Approval, Internship Completion,
//          Relieving cum Experience).
//
// NOTE: The Offer Letter and Appointment Letter flows keep their
//       own inline copies of this logic. This file only exists so
//       the newer letters do not have to repeat it again. The
//       behaviour is intentionally identical:
//       html2canvas each ".a4-page" -> paste full bleed into jsPDF.
// ============================================================

// Wait two animation frames so React has actually painted
export const waitForNextPaint = async () => {
  await new Promise((resolve) => {
    requestAnimationFrame(() => {
      requestAnimationFrame(resolve);
    });
  });
};

// html2canvas cannot capture images that have not finished loading
export const waitForImages = async (root = document) => {
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

// "Mr. Vignesh Mohan" -> "vignesh-mohan" (used for the file name)
export const cleanPersonName = (name) => {
  return String(name || "letter")
    .replaceAll("Mr.", "")
    .replaceAll("Ms.", "")
    .replaceAll("Mrs.", "")
    .replaceAll(".", "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-");
};

// Screenshot every .a4-page inside rootElement into a single A4 PDF
export const createA4PdfBlob = async (rootElement) => {
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

export const triggerBlobDownload = (blob, fileName) => {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();

  link.remove();
  URL.revokeObjectURL(url);
};
