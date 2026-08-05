/* eslint-disable */
// @ts-nocheck
"use client";

// ============================================================
// RelievingExperiencePage1.tsx
// Single A4 page - "To Whomsoever It May Concern" relieving cum
// experience certificate issued on separation.
// ============================================================

import React from "react";
import "../../pages/Page1.css";
import "./RelievingExperienceCertificate.css";
import EditableField from "../EditableField";
import OfferPageLayout from "../OfferPageLayout";

function RelievingExperiencePage1({ data, setData, showLetterhead = true }) {
  const update = (field, value) =>
    setData((prev) => ({ ...prev, [field]: value }));

  return (
    <OfferPageLayout showLetterhead={showLetterhead}>
      <div className="relievingCertificateMain">
        {/* ── DATE ─────────────────────────────── */}
        <div className="relievingDateSection">
          <span className="offerBoldLetters">Date: </span>
          <EditableField
            value={data.letterDate}
            onChange={(val) => update("letterDate", val)}
          />
        </div>

        {/* ── HEADINGS ─────────────────────────── */}
        <h1 className="relievingMainHeading">TO WHOMSOEVER IT MAY CONCERN</h1>

        <h2 className="relievingSubHeading">
          RELIEVING CUM EXPERIENCE CERTIFICATE
        </h2>

        {/* ── BODY ─────────────────────────────── */}
        <div className="relievingParaContent">
          This is to certify that{" "}
          <span className="offerBoldLetters">
            <EditableField
              value={data.employeeName}
              onChange={(val) => update("employeeName", val)}
              bold
            />
          </span>
          <span className="offerBoldLetters"> - </span>
          <span className="offerBoldLetters">
            <EditableField
              value={data.employeeId}
              onChange={(val) => update("employeeId", val)}
              bold
            />
          </span>{" "}
          was employed with{" "}
          <span className="offerBoldLetters">
            Adinn Advertising Services Limited
          </span>{" "}
          as{" "}
          <span className="offerBoldLetters">
            <EditableField
              value={data.designation}
              onChange={(val) => update("designation", val)}
              bold
            />
          </span>{" "}
          in the{" "}
          <span className="offerBoldLetters">
            <EditableField
              value={data.department}
              onChange={(val) => update("department", val)}
              bold
            />
          </span>{" "}
          <span className="offerBoldLetters">Department</span> from{" "}
          <span className="offerBoldLetters">
            <EditableField
              value={data.dateOfJoining}
              onChange={(val) => update("dateOfJoining", val)}
              bold
            />
          </span>{" "}
          to{" "}
          <span className="offerBoldLetters">
            <EditableField
              value={data.relievingDate}
              onChange={(val) => update("relievingDate", val)}
              bold
            />
          </span>
          .
        </div>

        <div className="relievingParaContent">
          During the tenure of employment, the employee discharged the assigned
          duties and responsibilities with sincerity and dedication.
        </div>

        <div className="relievingParaContent">
          The resignation submitted by the employee has been accepted by the
          Management, and has{" "}
          <span className="offerBoldLetters">
            been relieved from the services of the Company with effect from the
            close of business hours on{" "}
            <EditableField
              value={data.relievingDate}
              onChange={(val) => update("relievingDate", val)}
              bold
            />
          </span>
          , after completing the applicable notice period and fulfilling all
          exit formalities, including the handover of responsibilities and
          company assets.
        </div>

        <div className="relievingParaContent">
          We appreciate the contributions made during the tenure of employment
          and wish{" "}
          <span className="offerBoldLetters">
            <EditableField
              value={data.employeeName}
              onChange={(val) => update("employeeName", val)}
              bold
            />
          </span>{" "}
          success in all future professional endeavours.
        </div>

        {/* ── SIGNATURE ────────────────────────── */}
        <div className="relievingSignOffCompany">
          For Adinn Advertising Services Limited
        </div>

        <div className="relievingHrDetails">
          <div className="relievingHrName">
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

export default RelievingExperiencePage1;
