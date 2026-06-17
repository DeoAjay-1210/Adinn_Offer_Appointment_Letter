// /* eslint-disable */
// // @ts-nocheck
// "use client";

// import React from "react";
// import AppointmentA4Page from "./AppointmentA4Page";
// import E from "./AppointmentEditableField";

// export default function AppointmentPage1({ data, update }) {
//   return (
//     <AppointmentA4Page>
//       <h1 className="apt-main-heading">
//         APPOINTMENT LETTER -{" "}
//         <E
//           value={data.employeeName}
//           onChange={(val) => update("employeeName", val)}
//           bold
//         />
//       </h1>

//       <div className="apt-date-section">
//         <span className="apt-bold">Date: </span>
//         <E value={data.letterDate} onChange={(val) => update("letterDate", val)} />
//       </div>

//       <div className="apt-address-block">
//         <div className="apt-bold">To,</div>

//         <div className="apt-bold">
//           Mr.{" "}
//           <E
//             value={data.employeeName}
//             onChange={(val) => update("employeeName", val)}
//             bold
//           />
//         </div>

//         <div>
//           <E value={data.addressLine1} onChange={(val) => update("addressLine1", val)} />
//         </div>

//         <div>
//           <E value={data.addressLine2} onChange={(val) => update("addressLine2", val)} />
//         </div>

//         <div>
//           <E value={data.addressLine3} onChange={(val) => update("addressLine3", val)} />
//         </div>
//       </div>

//       <div className="apt-subject apt-bold">
//         Subject: Appointment as{" "}
//         <E value={data.designation} onChange={(val) => update("designation", val)} bold />
//       </div>

//       <div className="apt-para-block">
//         <p>
//           Dear Mr.{" "}
//           <span className="apt-bold">
//             <E value={data.employeeName} onChange={(val) => update("employeeName", val)} bold />,
//           </span>
//         </p>

//         <p>
//           We are pleased to inform you that upon successful completion of your
//           probation period, you are hereby appointed as{" "}
//           <span className="apt-bold">
//             <E value={data.designation} onChange={(val) => update("designation", val)} bold />
//           </span>{" "}
//           in the{" "}
//           <span className="apt-bold">
//             <E value={data.department} onChange={(val) => update("department", val)} bold />
//           </span>{" "}
//           Department of Adinn Advertising Services Limited, effective from{" "}
//           <span className="apt-bold">
//             <E value={data.effectiveDateText} onChange={(val) => update("effectiveDateText", val)} bold />.
//           </span>
//         </p>

//         <p>
//           Your services during the probation period have been reviewed and found
//           satisfactory. Accordingly, your employment is hereby confirmed subject
//           to the terms and conditions mentioned in this Appointment Letter and
//           the Company's policies in force from time to time.
//         </p>
//       </div>

//       <div className="apt-table-block">
//         <table className="apt-details-table">
//           <tbody>
//             <tr>
//               <td className="apt-bold">Employee Name</td>
//               <td>:</td>
//               <td>
//                 <E value={data.employeeName} onChange={(val) => update("employeeName", val)} />
//               </td>
//             </tr>

//             <tr>
//               <td className="apt-bold">Employee ID</td>
//               <td>:</td>
//               <td>
//                 <E value={data.employeeId} onChange={(val) => update("employeeId", val)} />
//               </td>
//             </tr>

//             <tr>
//               <td className="apt-bold">Designation</td>
//               <td>:</td>
//               <td>
//                 <E value={data.designation} onChange={(val) => update("designation", val)} />
//               </td>
//             </tr>

//             <tr>
//               <td className="apt-bold">Department</td>
//               <td>:</td>
//               <td>
//                 <E value={data.department} onChange={(val) => update("department", val)} />
//               </td>
//             </tr>

//             <tr>
//               <td className="apt-bold">Branch / Location</td>
//               <td>:</td>
//               <td>
//                 <E value={data.branch} onChange={(val) => update("branch", val)} />
//               </td>
//             </tr>

//             <tr>
//               <td className="apt-bold">Reporting To</td>
//               <td>:</td>
//               <td>
//                 <E value={data.reportingTo} onChange={(val) => update("reportingTo", val)} />
//               </td>
//             </tr>

//             <tr>
//               <td className="apt-bold">Date of Joining</td>
//               <td>:</td>
//               <td>
//                 <E value={data.dateOfJoining} onChange={(val) => update("dateOfJoining", val)} />
//               </td>
//             </tr>

//             <tr>
//               <td className="apt-bold">Confirmation Date</td>
//               <td>:</td>
//               <td>
//                 <E value={data.confirmationDate} onChange={(val) => update("confirmationDate", val)} />
//               </td>
//             </tr>

//             <tr>
//               <td className="apt-bold">Employment Type</td>
//               <td>:</td>
//               <td>
//                 <E value={data.employmentType} onChange={(val) => update("employmentType", val)} />
//               </td>
//             </tr>
//           </tbody>
//         </table>
//       </div>
//     </AppointmentA4Page>
//   );
// }



/* eslint-disable */
// @ts-nocheck
"use client";

import React from "react";
import "../appointment-letter/AppointmentLetter.css";
import OfferHeader from "../OfferHead";
import OfferFooter from "../OfferFooter";
import EditableField from "../appointment-letter/AppointmentEditableField";

function AppointmentPage1({ data, setData }) {
    const update = (field, value) =>
        setData((prev) => ({ ...prev, [field]: value }));

    return (
        <div className="a4-page appointment-a4-page">
            <OfferHeader />
            <div className="" style={{ flex: 1 }}>
                <div className="appointmentPageContent">
                    <h1 className="offerBoldLetters OfferMainHeading">
                        APPOINTMENT LETTER -{" "}
                        <EditableField
                            value={data.employeeName}
                            onChange={(val) => update("employeeName", val)}
                            bold
                        />
                    </h1>

                    <div className="offerDateSection">
                        <span className="offerBoldLetters">Date: </span>
                        <EditableField
                            value={data.letterDate}
                            onChange={(val) => update("letterDate", val)}
                        />
                    </div>

                    <div>
                        <div className="offerBoldLetters offerPage1To">To,</div>

                        <div className="offerBoldLetters offerPage1Name">
                            Mr.{" "}
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
                        Subject: Appointment as{" "}
                        <EditableField
                            value={data.designation}
                            onChange={(val) => update("designation", val)}
                            bold
                        />
                    </div>

                    <div className="offerPagePersonContents">
                        <div className="offerPersonContentsName">
                            Dear Mr.{" "}
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
                </div>
            </div>
            {/* <div className="offerPageFooterMain appointmentFooterFull"> */}
            <div>
                <OfferFooter />
            </div>
        </div>
    );
}

export default AppointmentPage1;
