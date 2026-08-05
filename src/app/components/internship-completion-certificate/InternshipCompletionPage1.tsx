/* eslint-disable */
// @ts-nocheck
"use client";

// ============================================================
// InternshipCompletionPage1.tsx
// Single A4 page - "To Whomsoever It May Concern" internship
// completion certificate issued to the student.
// ============================================================

import React from "react";
import "../../pages/Page1.css";
import "./InternshipCompletionCertificate.css";
import EditableField from "../EditableField";
import OfferPageLayout from "../OfferPageLayout";

function InternshipCompletionPage1({ data, setData, showLetterhead = true }) {
  const update = (field, value) =>
    setData((prev) => ({ ...prev, [field]: value }));

  return (
    <OfferPageLayout showLetterhead={showLetterhead}>
      <div className="completionCertificateMain">
        {/* ── CERTIFICATE NO + DATE ────────────── */}
        <div className="completionMetaRow">
          <div className="completionMetaItem">
            <span className="offerBoldLetters">CERTIFICATE NO: </span>
            <EditableField
              value={data.certificateNo}
              onChange={(val) => update("certificateNo", val)}
            />
          </div>

          <div className="completionMetaItem completionMetaDate">
            <span className="offerBoldLetters">Date: </span>
            
              <EditableField
                value={data.certificateDate}
                onChange={(val) => update("certificateDate", val)}
              />
  
          </div>
        </div>

        {/* ── HEADINGS ─────────────────────────── */}
        <h1 className="completionMainHeading">TO WHOMSOEVER IT MAY CONCERN</h1>

        <h2 className="completionSubHeading">
          INTERNSHIP COMPLETION CERTIFICATE
        </h2>

        {/* ── BODY ─────────────────────────────── */}
        <div className="completionParaContent">
          This is to certify that{" "}
          <span className="offerBoldLetters">
            <EditableField
              value={data.studentName}
              onChange={(val) => update("studentName", val)}
              bold
            />
          </span>
          , a student of{" "}
          <span className="offerBoldLetters">
            <EditableField
              value={data.collegeName}
              onChange={(val) => update("collegeName", val)}
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
          </span>
          , bearing Register Number{" "}
          <span className="offerBoldLetters">
            <EditableField
              value={data.registerNumber}
              onChange={(val) => update("registerNumber", val)}
              bold
            />
          </span>
          , has successfully completed an internship with{" "}
          <span className="completionCompanyName">
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
          , for a period of{" "}
          <span className="offerBoldLetters">
            <EditableField
              value={data.internshipDuration}
              onChange={(val) => update("internshipDuration", val)}
              bold
            />
          </span>
          .
        </div>

        <div className="completionParaContent">
          During the internship period, the student was attached to the{" "}
          <span className="offerBoldLetters">
            <EditableField
              value={data.department}
              onChange={(val) => update("department", val)}
              bold
            />
          </span>{" "}
          and was exposed to various practical aspects of the
          department&apos;s operations, processes, and work environment.
        </div>

        <div className="completionParaContent">
          During the internship period, the intern exhibited professionalism,
          dedication, punctuality, and a strong willingness to learn. The
          assigned responsibilities and internship requirements were completed
          satisfactorily, and the intern actively participated in all assigned
          tasks and learning activities.
        </div>

        <div className="completionParaContent">
          We appreciate the intern&apos;s commitment and contribution during the
          internship and extend our best wishes for continued success in future
          academic and professional endeavours.
        </div>

        {/* ── SIGNATURE ────────────────────────── */}
        <div className="completionSignOffCompany">
          For Adinn Advertising Services Limited
        </div>

        <div className="completionHrDetails">
          <div className="completionHrName">
            <EditableField
              value={data.hrName}
              onChange={(val) => update("hrName", val)}
              bold
            />
          </div>

          <div>
            <EditableField
              value={data.hrDesignation}
              onChange={(val) => update("hrDesignation", val)}
            />
          </div>
        </div>
      </div>
    </OfferPageLayout>
  );
}

export default InternshipCompletionPage1;
