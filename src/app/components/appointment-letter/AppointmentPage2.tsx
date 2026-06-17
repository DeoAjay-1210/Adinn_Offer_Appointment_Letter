/* eslint-disable */
// @ts-nocheck
"use client";

import React from "react";
import "../../pages/Page1.css";
import "../appointment-letter/AppointmentLetter.css";
import OfferHeader from "../OfferHead";
import OfferFooter from "../OfferFooter";
import EditableField from "../appointment-letter/AppointmentEditableField";

function AppointmentPage2() {
  return (
    <div className="a4-page appointment-a4-page">
      <OfferHeader />

      <div className="appointmentContent90" style={{ flex: 1 }}>
        <div className="pageSideHeadingsMain">
          <div className="offerBoldLetters pagesSideHeading">
            Terms of Employment
          </div>

          <ol className="appointmentNumberList">
            <li>
              Your employment shall continue subject to satisfactory performance,
              conduct, attendance, discipline, and compliance with Company
              policies.
            </li>
            <li>
              You shall faithfully perform the duties, responsibilities, and
              functions assigned to you and shall act in the best interests of
              the Company at all times.
            </li>
            <li>
              You shall devote your full working time, attention, and abilities
              to the business and affairs of the Company during your employment.
            </li>
            <li>
              You shall maintain strict confidentiality regarding all Company
              information, business operations, client details, financial
              information, pricing, contracts, internal communications, and any
              confidential data obtained during your employment.
            </li>
            <li>
              You shall not engage in any other employment, business,
              consultancy, freelance work, or professional activity that may
              conflict with the interests of the Company without prior written
              approval from Management.
            </li>
          </ol>
        </div>

        <div className="pageSideHeadingsMain">
          <div className="offerBoldLetters pagesSideHeading">Compensation</div>
          <div className="pagesParaContent">
            Your compensation shall be governed by the salary structure
            communicated by the Company and may be revised, reviewed, or modified
            from time to time based on Company policy, performance, business
            requirements, and applicable laws. All statutory deductions,
            recoveries, and other authorised deductions shall be made as
            applicable.
          </div>
        </div>

        <div className="pageSideHeadingsMain">
          <div className="offerBoldLetters pagesSideHeading">
            Transfer & Assignment
          </div>
          <div className="pagesParaContent">
            The Company reserves the right to transfer, assign, or deploy you to
            any department, branch office, project location, client location,
            site location, or business unit based on operational requirements.
          </div>
        </div>

        <div className="pageSideHeadingsMain">
          <div className="offerBoldLetters pagesSideHeading">
            Company Policies
          </div>
          <div className="pagesParaContent">
            You shall be governed by all Company policies, rules, regulations,
            SOPs, codes of conduct, HR policies, IT policies, safety policies,
            and any amendments issued from time to time. Failure to comply with
            Company policies may result in disciplinary action.
          </div>
        </div>

        <div className="pageSideHeadingsMain">
          <div className="offerBoldLetters pagesSideHeading">
            Separation of Employment
          </div>
          <div className="pagesParaContent">
            Your employment may be terminated by either party by providing notice
            or salary in lieu of notice as prescribed under Company policy or
            applicable employment terms prevailing at the time. The Company
            reserves the right to initiate disciplinary action,
          </div>
        </div>
      </div>

      {/* <div className="offerPageFooterMain appointmentFooterFull"> */}
      <div>
        <OfferFooter />
      </div>
    </div>
  );
}

export default AppointmentPage2;