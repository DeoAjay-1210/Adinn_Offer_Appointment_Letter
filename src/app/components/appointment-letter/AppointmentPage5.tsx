/* eslint-disable */
// @ts-nocheck
"use client";

import React from "react";

import "../appointment-letter/AppointmentLetter.css";
import OfferHeader from "../OfferHead";
import OfferFooter from "../OfferFooter";
// import EditableField from "../appointment-letter/AppointmentEditableField";
import EditableField from "../EditableField";
import OfferPageLayout from "../../components/OfferPageLayout";

function AppointmentPage5({ data, setData, showLetterhead={includeLetterhead} }) {
  const update = (field, value) =>
    setData((prev) => ({ ...prev, [field]: value }));

  return (
    // <div className="a4-page appointment-a4-page">
    //   <OfferHeader />
<OfferPageLayout showLetterhead={showLetterhead}>
      <div className="">
        <div className="pageSideHeadingsMainAppPg5">
          <div className="offerBoldLetters pagesSideHeading">
            Terms & Conditions
          </div>

          <ol className="appointmentNumberList">
            <li>
              This revised compensation shall be effective from the date
              mentioned above and shall supersede the compensation structure
              communicated at the time of joining.
            </li>
            <li>
              Statutory deductions such as PF, ESI, Professional Tax, Income
              Tax, or any other applicable deductions shall continue to be made
              as per prevailing laws and Company policy.
            </li>
            <li>
              The revised compensation shall remain confidential and must not be
              disclosed to unauthorised persons.
            </li>
            <li>
              This revision does not alter any other terms and conditions of
              employment, which shall continue to remain in force.
            </li>
            <li>
              The Company reserves the right to review, revise, restructure, or
              modify compensation components based on performance, business
              requirements, policy changes, or applicable laws.
            </li>
            <li>
              Any excess payment, erroneous payment, or policy-related recovery
              may be adjusted against future salary payments or final settlement.
            </li>
          </ol>
        </div>

        <div className="offerPage3CmpyNameAppPg5">
          For Adinn Advertising Services Limited
        </div>

        <div className="appointmentSalaryHrDetailsAppPg5">
          <div className="offerBoldLetters">
            <EditableField
              value={data.hrName}
              onChange={(val) => update("hrName", val)}
            />
          </div>
          <div>HR Manager</div>
        </div>

        <div className="appointmentSalaryAcceptanceMain">
          <div className="offerBoldLetters pagesSideHeadingAppPg5">
            Employee Acceptance
          </div>

          <div className="pagesParaContent">
            I acknowledge receipt of this Revised Salary Annexure and accept the
            revised compensation structure effective from the date mentioned
            above.
          </div>

          <table>
            <tbody>
              <tr className="offerPageEmployeeDetailsContentPg35">
                <td className="offerBoldLetters">Signature</td>
                <td>:</td>
                <td></td>
              </tr>

              <tr className="offerPageEmployeeDetailsContentPg35">
                <td className="offerBoldLetters">Date</td>
                <td>:</td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

       {/* <div className="offerPageFooterMain appointmentFooterFull"> */}
      {/* <div>
        <OfferFooter />
      </div>
    </div> */}

    </OfferPageLayout>
  );
}

export default AppointmentPage5;