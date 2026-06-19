//page 1 
/* eslint-disable */
// @ts-nocheck
"use client";

import React from "react";
import "./Page1.css";
import EditableField from "../components/EditableField";
import OfferPageLayout from "../components/OfferPageLayout";

function Page1({ data, setData }) {
  const update = (field, value) =>
    setData((prev) => ({ ...prev, [field]: value }));

  return (
    <OfferPageLayout>
      <div className="offerPage1OverallMain">
        <div className="offerDateSection">
          <span className="offerBoldLetters">Date: </span>
          <EditableField
            value={data.offerDate}
            onChange={(val) => update("offerDate", val)}
          />
        </div>

        <div>
          <div className="offerBoldLetters offerPage1To">To,</div>

          <div className="offerBoldLetters offerPage1Name">
            <EditableField
              value={data.employeeName}
              onChange={(val) => update("employeeName", val)}
              bold
            />
          </div>

          <div className="offerPage1PersonAddress">
            <EditableField
              value={data.addressLine1}
              onChange={(val) => update("addressLine1", val)}
            />
          </div>

          <div className="offerPage1PersonAddress">
            <EditableField
              value={data.addressLine2}
              onChange={(val) => update("addressLine2", val)}
            />
          </div>

          <div className="offerPage1PersonAddress">
            <EditableField
              value={data.addressLine3}
              onChange={(val) => update("addressLine3", val)}
            />
          </div>
        </div>

        <div className="offerBoldLetters offerPage1Subject">
          Subject: Offer of Employment
        </div>

        <div className="offerPagePersonContents">
          <div className="offerPersonContentsName">
            Dear {" "}
            <span className="offerBoldLetters">
              <EditableField
                value={data.employeeName}
                onChange={(val) => update("employeeName", val)}
                bold
              />
              ,
            </span>
          </div>

          <div className="offerPersonContentsPara">
            We are pleased to offer you the position of{" "}
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
            at Adinn Advertising Services Limited,{" "}
            <span className="offerBoldLetters">
              <EditableField
                value={data.branch}
                onChange={(val) => update("branch", val)}
                bold
              />
            </span>
            , subject to the terms and conditions mentioned in this letter.
          </div>

          <div>
            Your proposed date of joining will be{" "} 
            <span className="offerBoldLetters">
              <EditableField
                value={data.dateOfJoining}
                onChange={(val) => update("dateOfJoining", val)}
                bold
              />
              .
            </span>
          </div>
        </div>

        <div className="offerPagePersonContents">
          <div className="offerBoldLetters offerPage1EmpDetails">
            Employment Details
          </div>

          <table>
            <tbody>
              {[
                ["Employee Name", "employeeName"],
                ["Designation", "designation"],
                ["Department", "department"],
                ["Branch / Location", "branch"],
                ["Reporting To", "reportingTo"],
                ["Date of Joining", "dateOfJoining"],
                ["Employment Type", "employmentType"],
                ["Probation Period", "probationPeriod"],
              ].map(([label, field]) => (
                <tr className="offerPageEmployeeDetailsContent" key={field}>
                  <td className="offerBoldLetters">{label}</td>
                  <td>:</td>
                  <td>
                    <EditableField
                      value={data[field]}
                      onChange={(val) => update(field, val)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </OfferPageLayout>
  );
}

export default Page1;