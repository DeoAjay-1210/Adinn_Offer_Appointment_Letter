/* eslint-disable */
// @ts-nocheck
"use client";
import React, { useState } from 'react';
import Page1 from './Page1';
import Page2 from './Page2';
import Page3 from './Page3';
import Page4 from './Page4';
import Page5 from './Page5';

import './Page1.css';

// ── DEFAULT DATA ─────────────────────────────────────────────
// Change these defaults to pre-fill the letter for a new employee.
const DEFAULT_DATA = {
  employeeName:    'Veerasanjay V',
  offerDate:       '01/07/2026',
  addressLine1:    '3/232A, Star Street,',
  addressLine2:    'Krishna Nagar, Thiruppalai,',
  addressLine3:    'Madurai - 625014',
  designation:     'Executive - MIS Analyst',
  department:      "Director's Office",
  branch:          'Head Office',
  reportingTo:     'Ramesh P',
  dateOfJoining:   '30-05-2026',
  employmentType:  'Full-Time',
  probationPeriod: '3 Months',
  hrName : 'Gayathri S'
};

// Step labels shown in the wizard bar
const STEPS = ['Page 1 — Details', 'Page 2 — Policies','Page 3 — Emp Acceptace1','Page 4 — Salary / T &C','Page 5 — Emp Acceptace2', 'Preview', 'Export PDF'];

function PagesMain() {
  // ── Shared editable data ──────────────────────────────────
  const [data, setData] = useState(DEFAULT_DATA);

  // ── Current wizard step (0-indexed) ──────────────────────
  const [currentStep, setCurrentStep] = useState(0);

  // ── PDF Export ───────────────────────────────────────────
  // window.print() triggers the browser's print dialog.
  // The @media print CSS in Page1.css hides the wizard bar
  // and formats .a4-page divs as individual printed pages.
  // User can then choose "Save as PDF" in the print dialog.
  const handleExportPDF = () => {
    window.print();
  };

  return (
    <div>
      

      {/* ══════════════════════════════════════════════════
          PAGE RENDERING
          ══════════════════════════════════════════════════ */}

      {/* STEP 0: Show Page 1 only (editable) */}
      {currentStep === 0 && (
        <Page1 data={data} setData={setData} />
      )}

      {/* STEP 1: Show Page 2 only (editable) */}
      {currentStep === 1 && (
        <Page2 data={data} setData={setData} />
      )}


       {/* STEP 2: Show Page 3 only (editable) */}
      {currentStep === 2 && (
        <Page3 data={data} setData={setData} />
      )}

       {/* STEP 3: Show Page 4 only (editable) */}
      {currentStep === 3 && (
        <Page4 data={data} setData={setData} />
      )}

       {/* STEP 4: Show Page 5 only (editable) */}
      {currentStep === 4 && (
        <Page5 data={data} setData={setData} />
      )}

      {/* STEP 5 & 6: Show both pages (full preview + export) */}
      {(currentStep === 5 || currentStep === 6) && (
        <>
          {/* Preview info banner (hidden in print) */}
          <div style={{
            textAlign: 'center',
            padding: '10px',
            background: '#fff3cd',
            color: '#856404',
            fontSize: '13px',
            fontFamily: 'Inter, sans-serif',
          }}
            className="step-wizard" // reuses .step-wizard's display:none in print
          >
            📄 Preview — Click "Download PDF" to export. Use your browser's
            print dialog and select "Save as PDF".
          </div>

          {/* Render both A4 pages — they'll be separated by page-break in print */}
          <Page1 data={data} setData={setData} />
          <Page2 data={data} setData={setData} />
          <Page3 data={data} setData={setData} />
          <Page4 data={data} setData={setData} />
          <Page5 data={data} setData={setData} />

        </>
      )}



      {/* ══════════════════════════════════════════════════
          STEP WIZARD BAR
          Sticky at the top. Hidden during print (@media print).
          ══════════════════════════════════════════════════ */}
      <div className="step-wizard">

        {/* Previous button */}
        <button
          className="step-btn"
          onClick={() => setCurrentStep(s => Math.max(0, s - 1))}
          disabled={currentStep === 0}
        >
          ← Back
        </button>

        {/* Step indicators */}
        {STEPS.map((label, i) => (
          <button
            key={i}
            className={`step-btn ${currentStep === i ? 'active' : ''}`}
            onClick={() => setCurrentStep(i)}
          >
            {i + 1}. {label}
          </button>
        ))}

        {/* Next button */}
        <button
          className="step-btn"
          onClick={() => setCurrentStep(s => Math.min(STEPS.length - 1, s + 1))}
          disabled={currentStep === STEPS.length - 1}
        >
          Next →
        </button>

        {/* Export button — only visible on last step or preview */}
        {(currentStep === 5 || currentStep === 6) && (
          <button className="step-btn-download" onClick={handleExportPDF}>
            ⬇ Download PDF
          </button>
        )}
      </div>
    </div>
  );
}

export default PagesMain;