/* eslint-disable */
// @ts-nocheck
"use client";

// ============================================================
// EmploymentAcceptancePage1.tsx
// A4 page 1 - வேலை நியமன ஒப்புதல் மற்றும் உறுதிமொழி
// Title, employee detail table, acceptance paragraph, signature.
//
// The three detail fields use TamilEditableField, so the HR user
// can type "paniyalar" and pick பணியாளர் from the suggestions.
// ============================================================

import React from "react";
import "../../pages/Page1.css";
import "./EmploymentAcceptanceDeclaration.css";
import TamilEditableField from "../utils/TamilEditableField";
import OfferPageLayout from "../OfferPageLayout";

function EmploymentAcceptancePage1({ data, setData, showLetterhead = true }) {
  const update = (field, value) =>
    setData((prev) => ({ ...prev, [field]: value }));

  return (
    <OfferPageLayout showLetterhead={showLetterhead}>
      <div className="tamilLetterMain">
        {/* ── SCREEN ONLY TYPING HINT ──────────── */}
        <div className="tamilTypingHelp no-print">
          <strong>Tanglish typing:</strong>
          <span>
            click any field and type in English letters -
            e.g. <code>paniyalar</code> gives பணியாளர். Pick with
            <code>Space</code>, <code>Enter</code> or <code>1-9</code>.
            <code>Esc</code> keeps the English spelling, and the
            <code>தமிழ் / ABC</code> chip turns it off.
          </span>
        </div>

        {/* ── TITLE ────────────────────────────── */}
        <h1 className="tamilDocTitle">
          வேலை நியமன ஒப்புதல் மற்றும் உறுதிமொழி
        </h1>

        <div className="tamilDocSubTitle">
          (Employment Acceptance &amp; Declaration)
        </div>

        {/* ── EMPLOYEE DETAILS ───────────────────
            Borderless label / : / value rows, same shape as the
            Employment Details block on Offer Letter page 1. */}
        <div className="tamilDetailBlock">
          <table>
            <tbody>
              <tr className="tamilDetailRow">
                <td className="tamilDetailLabel">Name</td>
                <td className="tamilDetailColon">:</td>
                <td className="tamilDetailValue">
                  <TamilEditableField
                    value={data.employeeName}
                    onChange={(val) => update("employeeName", val)}
                  />
                </td>
              </tr>

              <tr className="tamilDetailRow">
                <td className="tamilDetailLabel">Designation</td>
                <td className="tamilDetailColon">:</td>
                <td className="tamilDetailValue">
                  <TamilEditableField
                    value={data.designation}
                    onChange={(val) => update("designation", val)}
                  />
                </td>
              </tr>

              <tr className="tamilDetailRow">
                <td className="tamilDetailLabel">Date of Joining</td>
                <td className="tamilDetailColon">:</td>
                <td className="tamilDetailValue">
                  <TamilEditableField
                    value={data.dateOfJoining}
                    onChange={(val) => update("dateOfJoining", val)}
                    tamilByDefault={false}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* ── ACCEPTANCE ───────────────────────── */}
        <div className="tamilSectionHeading">வேலை நியமன ஒப்புதல்</div>

        <div className="tamilParaContent">
          நான், மேற்கண்ட விவரங்களில் குறிப்பிடப்பட்டுள்ள பணியாளர்,{" "}
          <span className="tamilInlineLatin">
            Adinn Advertising Services Limited
          </span>{" "}
          நிறுவனத்தில் வழங்கப்பட்டுள்ள பணியை ஏற்றுக்கொண்டு, நிறுவனத்தில்
          பணியில் சேர்வதற்கு எனது முழுமையான சம்மதத்தை இதன் மூலம் தெரிவித்துக்
          கொள்கிறேன்.
        </div>

        {/* ── SIGNATURE ────────────────────────── */}
        <div className="tamilSignOffCompany">
          For Adinn Advertising Services Limited
        </div>

        <div className="tamilHrDetails">
          <div className="tamilHrName">
            <TamilEditableField
              value={data.hrName}
              onChange={(val) => update("hrName", val)}
              bold
              tamilByDefault={false}
            />
          </div>

          <div>
            <TamilEditableField
              value={data.hrDesignation}
              onChange={(val) => update("hrDesignation", val)}
              tamilByDefault={false}
            />
          </div>
        </div>
      </div>
    </OfferPageLayout>
  );
}

export default EmploymentAcceptancePage1;
