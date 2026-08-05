/* eslint-disable */
// @ts-nocheck
"use client";

// ============================================================
// EmploymentAcceptancePage2.tsx
// A4 page 2 - உறுதிமொழி (the five undertakings), the employee
// declaration, and the signature / date table.
//
// The five clauses are the binding text of the document, so they
// are fixed. The signature and date cells are editable - leave them
// blank to sign by hand after printing, or fill them in here.
// ============================================================

import React from "react";
import "../../pages/Page1.css";
import "./EmploymentAcceptanceDeclaration.css";
import TamilEditableField from "../utils/TamilEditableField";
import OfferPageLayout from "../OfferPageLayout";

function EmploymentAcceptancePage2({ data, setData, showLetterhead = true }) {
  const update = (field, value) =>
    setData((prev) => ({ ...prev, [field]: value }));

  return (
    <OfferPageLayout showLetterhead={showLetterhead}>
      <div className="tamilLetterMain">
        {/* ── UNDERTAKING ──────────────────────── */}
        <div className="tamilSectionHeading tamilSectionHeading1">உறுதிமொழி</div>

        {/* The numbers are plain spans, not list markers. html2canvas
            paints ::marker itself at li.top + line-height / 2 instead of
            on the first line's baseline, so with line-height: 2 and a
            Tamil face the digits floated above their text in the PDF
            while looking fine on screen. Real text can't drift. */}
        <ol className="tamilDeclarationList">
          <li>
            <span className="tamilDeclarationNo">1.</span>
            <span className="tamilDeclarationText">
              நிறுவனத்தின் அனைத்து{" "}
              <span className="tamilBold">
                விதிமுறைகள், கொள்கைகள், நடைமுறைகள் மற்றும் ஒழுங்கு விதிகளை
              </span>{" "}
              நான் கடைப்பிடிப்பேன்.
            </span>
          </li>

          <li>
            <span className="tamilDeclarationNo">2.</span>
            <span className="tamilDeclarationText">
              நிறுவனம் அவ்வப்போது வெளியிடும் புதிய விதிமுறைகள், திருத்தங்கள்
              மற்றும் சுற்றறிக்கைகளையும் பின்பற்ற ஒப்புக்கொள்கிறேன்.
            </span>
          </li>

          <li>
            <span className="tamilDeclarationNo">3.</span>
            <span className="tamilDeclarationText">
              எனக்கு ஒப்படைக்கப்படும் நிறுவனத்தின்{" "}
              <span className="tamilBold">
                சொத்துக்கள், கருவிகள், ஆவணங்கள் மற்றும் ரகசிய தகவல்களை
              </span>{" "}
              பாதுகாப்பது எனது பொறுப்பாகும்.
            </span>
          </li>

          <li>
            <span className="tamilDeclarationNo">4.</span>
            <span className="tamilDeclarationText">
              பணிநேரம், பாதுகாப்பு நடைமுறைகள், ஒழுக்கம் மற்றும் தொழில்முறை
              நடத்தை ஆகியவற்றை முழுமையாகப் பின்பற்றுவேன்.
            </span>
          </li>

          <li>
            <span className="tamilDeclarationNo">5.</span>
            <span className="tamilDeclarationText">
              நிறுவனத்தின் விதிமுறைகள் மற்றும் கொள்கைகளை மீறுவது ஒழுங்கு
              நடவடிக்கைக்கு உட்பட்டதாக இருக்கும் என்பதை நான்
              புரிந்துகொள்கிறேன்.
            </span>
          </li>
        </ol>

        {/* ── EMPLOYEE DECLARATION ─────────────── */}
        <div className="tamilSectionHeading">பணியாளர் அறிவிப்பு</div>

        <div className="tamilParaContent">
          மேற்கண்ட அனைத்து நிபந்தனைகளையும் நான் படித்து, புரிந்துகொண்டு, என்
          முழு சம்மதத்துடன் ஏற்றுக்கொள்கிறேன்.
        </div>

        {/* ── SIGNATURE ROWS ─────────────────────
            Borderless label / : / value rows, matching page 1.
            Labels stay fixed - only the value column is editable. */}
        <div className="tamilDetailBlock">
          <table>
            <tbody>
              <tr className="tamilDetailRow">
                <td className="tamilDetailLabel tamilDetailLabelWide">
                  Employee Signature / Thumb Impression
                </td>
                <td className="tamilDetailColon">:</td>
                <td className="tamilDetailValue">
                  <TamilEditableField
                    value={data.employeeSignature}
                    onChange={(val) => update("employeeSignature", val)}
                  />
                </td>
              </tr>

              <tr className="tamilDetailRow">
                <td className="tamilDetailLabel tamilDetailLabelWide">Date</td>
                <td className="tamilDetailColon">:</td>
                <td className="tamilDetailValue">
                  <TamilEditableField
                    value={data.declarationDate}
                    onChange={(val) => update("declarationDate", val)}
                    tamilByDefault={false}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </OfferPageLayout>
  );
}

export default EmploymentAcceptancePage2;
