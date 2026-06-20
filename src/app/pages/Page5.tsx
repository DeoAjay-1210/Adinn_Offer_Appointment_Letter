/* eslint-disable */
// @ts-nocheck
"use client";

import React from "react";
import "./Page1.css";
import OfferHeader from "../components/OfferHead";
import OfferFooter from "../components/OfferFooter";
import EditableField from "../components/EditableField";
import OfferPageLayout from "../components/OfferPageLayout";
function Page5({ data, setData, showLetterhead = true }) {
  const update = (field, value) =>
    setData((prev) => ({ ...prev, [field]: value }));

  return (
    // <div className="a4-page">
    //   <OfferHeader />

    //   <div className="offer-page-body offerPage5Body">

     <OfferPageLayout showLetterhead={showLetterhead}>

  
        <div className="offerPage4TCMain">
                    <div className="offerBoldLetters pagesSideHeading">Terms & Conditions</div>

          <ol className="offerTermsList" style={{ "--term-start": 0 }}>
                        <li>Salary shall be paid on or before the scheduled salary disbursement date as per company policy.</li>

                        <li>Statutory deductions such as PF, ESI, Professional Tax, Income Tax, or any other applicable deductions shall be made as per prevailing laws.</li>

            <li>
              Salary structure and benefits are confidential and should not be
              disclosed to unauthorized persons.
            </li>
            <li>
              The Company reserves the right to revise, restructure, or modify
              compensation components in accordance with business requirements
              and applicable laws.
            </li>
            <li>
              Any excess payment, erroneous payment, or policy-related recovery
              may be adjusted from future salary or final settlement.
            </li>
          </ol>
        </div>

        <div className="offerPage3CmpyName">
          For Adinn Advertising Services Limited
        </div>

        <div className="offerPage5HrDetails">
          <div className="offerPage3HrDetailsContent1 offerBoldLetters">
            <EditableField
              value={data.hrName}
              onChange={(val) => update("hrName", val)}
            />
          </div>
          <div className="offerPage3HrDetailsContent1">HR Manager</div>
        </div>

        <div className="offerPage5Acceptance1Main">
          <div className="offerBoldLetters" style={{marginBottom:'2%'}}>Employee Acceptance</div>
          <div>
            I have read and understood the compensation structure mentioned
            above and accept the same.
          </div>
        </div>

        <div className="offerPagePersonContentsPg5">
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
      {/* </div> */}
{/* 
    //   <OfferFooter />
    // </div> */}
    </OfferPageLayout>
  );
}

export default Page5;