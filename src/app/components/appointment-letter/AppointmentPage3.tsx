/* eslint-disable */
// @ts-nocheck
"use client";

import React from "react";
import "../../pages/Page1.css";
import "../appointment-letter/AppointmentLetter.css";
import OfferHeader from "../OfferHead";
import OfferFooter from "../OfferFooter";
import EditableField from "../appointment-letter/AppointmentEditableField";

function AppointmentPage3({ data, setData }) {
  const update = (field, value) =>
    setData((prev) => ({ ...prev, [field]: value }));

  return (
    <div className="a4-page appointment-a4-page">
      <OfferHeader />

      <div className="appointmentContent90">
        <div className="pageSideHeadingsMain">
          <div className="pagesParaContent">
            suspension, or termination in cases of misconduct, policy violation,
            fraud, breach of confidentiality, unauthorised disclosure of
            information, or any act prejudicial to the interests of the Company.
          </div>
        </div>

        <div className="pageSideHeadingsMain">
          <div className="offerBoldLetters pagesSideHeading">
            Return of Company Property
          </div>

          <div className="pagesParaContent">
            Upon resignation, termination, retirement, or separation from
            employment, you shall immediately return all Company assets,
            documents, records, ID cards, devices, access credentials, and any
            other Company property in your possession.
          </div>
        </div>

        <div className="pageSideHeadingsMain">
          <div className="offerBoldLetters pagesSideHeading">Acceptance</div>

          <div className="pagesParaContent">
            Please sign and return a copy of this Appointment Letter as
            confirmation of your acceptance of the terms and conditions of
            employment.
          </div>

          <div className="pagesParaContent">
            We congratulate you on your confirmation and wish you a successful
            and rewarding career with{" "}
            <span className="offerBoldLetters">
              Adinn Advertising Services Limited
            </span>
            .
          </div>
        </div>

        <div className="offerPage3CmpyName">
          For Adinn Advertising Services Limited
        </div>

        <div className="appointmentHrDetails">
          <div className="offerBoldLetters">
            <EditableField
              value={data.hrName}
              onChange={(val) => update("hrName", val)}
            />
          </div>
          <div>HR Manager</div>
        </div>

        <div className="appointmentAcceptanceMain">
          <div className="offerBoldLetters pagesSideHeading">
            Employee Acceptance
          </div>

          <div className="pagesParaContent">
            I, <span className="offerBoldLetters">Mr./Ms.</span>{" "}
            ____________________________________________, acknowledge receipt of
            this Appointment Letter and accept the terms and conditions of
            employment with{" "}
            <span className="offerBoldLetters">
              Adinn Advertising Services Limited
            </span>
            .
          </div>

          <div className="pagesParaContent">
            I agree to comply with all Company policies, rules, regulations,
            procedures, and instructions issued by the Company from time to time.
          </div>

          <table>
            <tbody>
              <tr className="offerPageEmployeeDetailsContentPg35">
                <td className="offerBoldLetters">Employee Name</td>
                <td>:</td>
                <td></td>
              </tr>

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
      <div>
        <OfferFooter />
      </div>
    </div>
  );
}

export default AppointmentPage3;