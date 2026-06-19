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

function AppointmentPage1({ data, setData }) {
    const update = (field, value) =>
        setData((prev) => ({ ...prev, [field]: value }));

    return (
        // <div className="a4-page appointment-a4-page">
        //     <OfferHeader />
        //     <div className="" style={{ flex: 1 }}>

            <OfferPageLayout>

                {/* <div className=""> */}
                    {/* <h1 className="offerBoldLetters OfferMainHeading">
                        APPOINTMENT LETTER -{" "}
                        <EditableField
                            value={data.employeeName}
                            onChange={(val) => update("employeeName", val)}
                            bold
                        />
                    </h1> */}

                    <div className="offerDateSectionAppPg1">
                        <span className="offerBoldLetters">Date: </span>
                        <EditableField
                            value={data.letterDate}
                            onChange={(val) => update("letterDate", val)}
                        />
                    </div>

                    <div>
                        <div className="offerBoldLetters offerPage1To">To,</div>

                        <div className="offerBoldLetters offerPage1Name">
                            {" "}
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

                    <div className="offerBoldLetters offerPage1SubjectAppPg1">
                        Subject: Appointment as{" "}
                        <EditableField
                            value={data.designation}
                            onChange={(val) => update("designation", val)}
                            bold
                        />
                    </div>

                    <div className="offerPagePersonContentsAppPg1">
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
                            We are pleased to inform you that upon successful completion of your
                            probation period, you are hereby appointed as{" "}
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
                            Department of Adinn Advertising Services Limited, effective from{" "}
                            <span className="offerBoldLetters">
                                <EditableField
                                    value={data.effectiveDateText}
                                    onChange={(val) => update("effectiveDateText", val)}
                                    bold
                                />
                                .
                            </span>
                        </div>

                        <div className="offerPersonContentsPara">
                            Your services during the probation period have been reviewed and
                            found satisfactory. Accordingly, your employment is hereby confirmed
                            subject to the terms and conditions mentioned in this Appointment
                            Letter and the Company's policies in force from time to time.
                        </div>
                    </div>

                    <div className="offerPagePersonContentsAppPg1">
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
                                    ["Employment Type", "employmentType"],
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
                    </OfferPageLayout>

    );
}

export default AppointmentPage1;
