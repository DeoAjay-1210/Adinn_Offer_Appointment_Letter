/* eslint-disable */
// @ts-nocheck
"use client";

import React from "react";
import "../../pages/Page1.css";
import "../appointment-letter/AppointmentLetter.css";
import OfferHeader from "../OfferHead";
import OfferFooter from "../OfferFooter";
import EditableField from "../appointment-letter/AppointmentEditableField";
function AppointmentPage4({ data, setData }) {
  const update = (field, value) =>
    setData((prev) => ({ ...prev, [field]: value }));

  const updateSalaryRow = (index, field, value) => {
    setData((prev) => {
      const updatedRows = [...prev.salaryRows];

      updatedRows[index] = {
        ...updatedRows[index],
        [field]: value,
      };

      return {
        ...prev,
        salaryRows: updatedRows,
      };
    });
  };

  return (
    <div className="a4-page appointment-a4-page">
      <OfferHeader />

      <div className="appointmentContent90">
        <h1 className="offerBoldLetters OfferMainHeading">
          REVISED SALARY ANNEXURE
        </h1>

        <div className="offerDateSection">
          <span className="offerBoldLetters">Date: </span>
          <EditableField
            value={data.letterDate}
            onChange={(val) => update("letterDate", val)}
          />
        </div>

        <div className="offerPagePersonContents">
          <table>
            <tbody>
              {[
                ["Employee Name", "employeeName"],
                ["Employee ID", "employeeId"],
                ["Designation", "designation"],
                ["Department", "department"],
                ["Branch / Location", "branch"],
                ["Reporting To", "reportingTo"],
                ["Date of Joining", "dateOfJoining"],
                ["Confirmation Date", "confirmationDate"],
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

        <div className="offerPage1Subject">
          <span className="offerBoldLetters">Subject:</span> Revision of
          Compensation upon Confirmation of Employment
        </div>

        <div className="offerPagePersonContents">
          <div className="offerPersonContentsName">
            Dear Mr.{" "}
            <span className="offerBoldLetters">
              <EditableField
                value={data.employeeName}
                onChange={(val) => update("employeeName", val)}
              />
              ,
            </span>
          </div>

          <div className="offerPersonContentsPara">
            We are pleased to inform you that upon successful completion of your
            probation period and confirmation of your employment with Adinn
            Advertising Services Limited, your compensation has been revised as
            detailed below.
          </div>

          <div className="offerPersonContentsPara">
            The revised compensation shall be effective from{" "}
            <span className="offerBoldLetters">
              <EditableField
                value={data.letterDate}
                onChange={(val) => update("letterDate", val)}
              />
              .
            </span>
          </div>
        </div>

        <table className="appointmentSalaryTable">
          <thead>
            <tr>
              <th>SALARY COMPONENTS</th>
              <th>MONTHLY AMOUNT (₹)</th>
              <th>ANNUAL AMOUNT (₹)</th>
            </tr>
          </thead>

          <tbody>
            {data.salaryRows.map((row, index) => (
              <tr
                key={index}
                className={
                  row.type === "heading"
                    ? "salaryHeadingRow"
                    : row.type === "total"
                    ? "salaryTotalRow"
                    : ""
                }
              >
                <td>
                  {row.type === "heading" ? (
                    row.label
                  ) : (
                    <EditableField
                      value={row.label}
                      onChange={(val) => updateSalaryRow(index, "label", val)}
                    />
                  )}
                </td>

                <td>
                  {row.type !== "heading" && (
                    <EditableField
                      value={row.monthly}
                      onChange={(val) => updateSalaryRow(index, "monthly", val)}
                    />
                  )}
                </td>

                <td>
                  {row.type !== "heading" && (
                    <EditableField
                      value={row.annual}
                      onChange={(val) => updateSalaryRow(index, "annual", val)}
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
  {/* <div className="offerPageFooterMain appointmentFooterFull"> */}
      <div>
        <OfferFooter />
      </div>
    </div>
  );
}

export default AppointmentPage4;