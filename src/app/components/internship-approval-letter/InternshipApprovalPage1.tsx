/* eslint-disable */
// @ts-nocheck
"use client";

// ============================================================
// InternshipApprovalPage1.tsx
// Single A4 page - Internship Approval Letter addressed to the
// college Principal / HOD.
// ============================================================

import React from "react";
import "../../pages/Page1.css";
import "./InternshipApprovalLetter.css";
import EditableField from "../EditableField";
import OfferPageLayout from "../OfferPageLayout";

function InternshipApprovalPage1({ data, setData, showLetterhead = true }) {
  const update = (field, value) =>
    setData((prev) => ({ ...prev, [field]: value }));

  return (
    <OfferPageLayout showLetterhead={showLetterhead}>
      <div className="approvalLetterMain">
        {/* ── DATE ─────────────────────────────── */}
        <div className="approvalDateSection">
          <span className="offerBoldLetters">Date: </span>
          <EditableField
            value={data.letterDate}
            onChange={(val) => update("letterDate", val)}
          />
        </div>

        {/* ── ADDRESSEE ────────────────────────── */}
        <div className="approvalToBlock">
          <div className="offerBoldLetters approvalToLabel">To</div>

          <div className="approvalToLine">
            <EditableField
              value={data.addresseeDesignation}
              onChange={(val) => update("addresseeDesignation", val)}
            />
          </div>

          <div className="approvalToLine">
            <EditableField
              value={data.courseName}
              onChange={(val) => update("courseName", val)}
            />
          </div>

          <div className="approvalToLine">
            <EditableField
              value={data.collegeName}
              onChange={(val) => update("collegeName", val)}
            />
          </div>
        </div>

        {/* ── SUBJECT ──────────────────────────── */}
        <div className="offerBoldLetters approvalSubject">
          Subject: Internship Approval Letter
        </div>

        {/* ── SALUTATION ───────────────────────── */}
        <div className="approvalSalutation">Dear Sir/Madam,</div>

        {/* ── BODY ─────────────────────────────── */}
        <div className="approvalParaContent">
          This is to certify that{" "}
          <span className="offerBoldLetters">
            <EditableField
              value={data.studentName}
              onChange={(val) => update("studentName", val)}
              bold
            />
          </span>
          , pursuing{" "}
          <span className="offerBoldLetters">
            <EditableField
              value={data.courseName}
              onChange={(val) => update("courseName", val)}
              bold
            />
          </span>{" "}
          at{" "}
          <EditableField
            value={data.collegeName}
            onChange={(val) => update("collegeName", val)}
          />
          <span className="offerBoldLetters">,</span> has been permitted to
          undergo an{" "}
          <span className="offerBoldLetters">
            <EditableField
              value={data.internshipRole}
              onChange={(val) => update("internshipRole", val)}
              bold
            />
          </span>{" "}
          at{" "}
          <span className="offerBoldLetters">
            Adinn Advertising Services Limited
          </span>{" "}
          from{" "}
          <span className="offerBoldLetters">
            <EditableField
              value={data.internshipFromDate}
              onChange={(val) => update("internshipFromDate", val)}
              bold
            />
          </span>{" "}
          to{" "}
          <span className="offerBoldLetters">
            <EditableField
              value={data.internshipToDate}
              onChange={(val) => update("internshipToDate", val)}
              bold
            />
          </span>
          .
        </div>

        <div className="approvalParaContent">
          We support the participant&apos;s involvement in this internship
          program as part of their academic and professional development.
        </div>

        <div className="approvalThanks">Thank you.</div>

        {/* ── SIGNATURE ────────────────────────── */}
        <div className="approvalSignOffCompany">
          For Adinn Advertising Services Limited
        </div>

        <div className="approvalHrDetails">
          <div>
            <EditableField
              value={data.hrName}
              onChange={(val) => update("hrName", val)}
            />
          </div>

          <div className="approvalHrDesignation">
            <EditableField
              value={data.hrDesignation}
              onChange={(val) => update("hrDesignation", val)}
              bold
            />
          </div>
        </div>
      </div>
    </OfferPageLayout>
  );
}

export default InternshipApprovalPage1;
