// // 1 page 
// /* eslint-disable */
// // @ts-nocheck
// "use client";
// import React from 'react';
// import './Page1.css';
// import OfferHeader from '../components/OfferHead';
// import OfferFooter from '../components/OfferFooter';
// import EditableField from '../components/EditableField';

// function Page1({ data, setData }) {
//   // Helper to update one field in shared data
//   const update = (field, value) => setData(prev => ({ ...prev, [field]: value }));

//   return (
//     <>
//       <div className="a4-page">

//         {/* ── HEADER ─────────────────────────────── */}
//         <OfferHeader />
//         <div style={{ flex: 1 }}>
//           {/* ── MAIN CONTENT ───────────────────────── */}
//           <div className="offerPage1OverallMain">

//             {/* Title — "Mr." is static, name is editable */}
//             {/* <h1 className="offerBoldLetters OfferMainHeading">
//             Offer Letter -{' '}
//             <EditableField
//               value={data.employeeName}
//               onChange={(val) => update('employeeName', val)}
//               bold
//             />
//           </h1> */}

//             {/* Date — right aligned */}
//             <div className="offerDateSection">
//               <span className="offerBoldLetters">Date: </span>
//               <EditableField
//                 value={data.offerDate}
//                 onChange={(val) => update('offerDate', val)}
//               />
//             </div>

//             {/* ── ADDRESS BLOCK ───────────────────── */}
//             <div>
//               {/* "To," is fully static */}
//               <div className="offerBoldLetters offerPage1To">To,</div>

//               {/* "Mr." is STATIC — only the name after it is editable */}
//               <div className="offerBoldLetters offerPage1Name">
//                 {' '}
//                 <EditableField
//                   value={data.employeeName}
//                   onChange={(val) => update('employeeName', val)}
//                   bold
//                 />
//               </div>

//               <div className="offerPage1PersonAddress">
//                 <EditableField
//                   value={data.addressLine1}
//                   onChange={(val) => update('addressLine1', val)}
//                 />
//               </div>
//               <div className="offerPage1PersonAddress">
//                 <EditableField
//                   value={data.addressLine2}
//                   onChange={(val) => update('addressLine2', val)}
//                 />
//               </div>
//               <div className="offerPage1PersonAddress">
//                 <EditableField
//                   value={data.addressLine3}
//                   onChange={(val) => update('addressLine3', val)}
//                 />
//               </div>
//             </div>

//             {/* Subject — fully static */}
//             <div className="offerBoldLetters offerPage1Subject">
//               Subject: Offer of Employment
//             </div>

//             {/* ── GREETING & BODY ─────────────────── */}
//             <div className="offerPagePersonContents">

//               {/* "Dear Mr." is STATIC — only name is editable */}
//               <div className="offerPersonContentsName">
//                 Dear Mr.{' '}
//                 <span className="offerBoldLetters">
//                   <EditableField
//                     value={data.employeeName}
//                     onChange={(val) => update('employeeName', val)}
//                     bold
//                   />
//                   ,
//                 </span>
//               </div>

//               <div className="offerPersonContentsPara">
//                 We are pleased to offer you the position of{' '}
//                 <span className="offerBoldLetters">
//                   <EditableField
//                     value={data.designation}
//                     onChange={(val) => update('designation', val)}
//                     bold
//                   />
//                 </span>{' '}
//                 in the{' '}
//                 <span className="offerBoldLetters">
//                   <EditableField
//                     value={data.department}
//                     onChange={(val) => update('department', val)}
//                     bold
//                   />
//                 </span>{' '}
//                 at Adinn Advertising Services Limited,{' '}
//                 <span className="offerBoldLetters">
//                   <EditableField
//                     value={data.branch}
//                     onChange={(val) => update('branch', val)}
//                     bold
//                   />
//                 </span>
//                 , subject to the terms and conditions mentioned in this letter.
//               </div>

//               <div>
//                 Your proposed date of joining will be{' '}
//                 <span className="offerBoldLetters">
//                   <EditableField
//                     value={data.dateOfJoining}
//                     onChange={(val) => update('dateOfJoining', val)}
//                     bold
//                   />
//                   .
//                 </span>
//               </div>
//             </div>

//             {/* ── EMPLOYMENT DETAILS TABLE ─────────── */}
//             <div className="offerPagePersonContents">
//               <div className="offerBoldLetters offerPage1EmpDetails">
//                 Employment Details
//               </div>

//               <table>
//                 <tbody>

//                   <tr className="offerPageEmployeeDetailsContent">
//                     <td className="offerBoldLetters">Employee Name</td>
//                     <td>:</td>
//                     <td>
//                       <EditableField
//                         value={data.employeeName}
//                         onChange={(val) => update('employeeName', val)}
//                       />
//                     </td>
//                   </tr>

//                   <tr className="offerPageEmployeeDetailsContent">
//                     <td className="offerBoldLetters">Designation</td>
//                     <td>:</td>
//                     <td>
//                       <EditableField
//                         value={data.designation}
//                         onChange={(val) => update('designation', val)}
//                       />
//                     </td>
//                   </tr>

//                   <tr className="offerPageEmployeeDetailsContent">
//                     <td className="offerBoldLetters">Department</td>
//                     <td>:</td>
//                     <td>
//                       <EditableField
//                         value={data.department}
//                         onChange={(val) => update('department', val)}
//                       />
//                     </td>
//                   </tr>

//                   <tr className="offerPageEmployeeDetailsContent">
//                     <td className="offerBoldLetters">Branch / Location</td>
//                     <td>:</td>
//                     <td>
//                       <EditableField
//                         value={data.branch}
//                         onChange={(val) => update('branch', val)}
//                       />
//                     </td>
//                   </tr>

//                   <tr className="offerPageEmployeeDetailsContent">
//                     <td className="offerBoldLetters">Reporting To</td>
//                     <td>:</td>
//                     <td>
//                       <EditableField
//                         value={data.reportingTo}
//                         onChange={(val) => update('reportingTo', val)}
//                       />
//                     </td>
//                   </tr>

//                   <tr className="offerPageEmployeeDetailsContent">
//                     <td className="offerBoldLetters">Date of Joining</td>
//                     <td>:</td>
//                     <td>
//                       <EditableField
//                         value={data.dateOfJoining}
//                         onChange={(val) => update('dateOfJoining', val)}
//                       />
//                     </td>
//                   </tr>

//                   <tr className="offerPageEmployeeDetailsContent">
//                     <td className="offerBoldLetters">Employment Type</td>
//                     <td>:</td>
//                     <td>
//                       <EditableField
//                         value={data.employmentType}
//                         onChange={(val) => update('employmentType', val)}
//                       />
//                     </td>
//                   </tr>

//                   <tr className="offerPageEmployeeDetailsContent">
//                     <td className="offerBoldLetters">Probation Period</td>
//                     <td>:</td>
//                     <td>
//                       <EditableField
//                         value={data.probationPeriod}
//                         onChange={(val) => update('probationPeriod', val)}
//                       />
//                     </td>
//                   </tr>

//                 </tbody>
//               </table>
//             </div>
//           </div>
//           {/* ── END MAIN CONTENT ── */}
//         </div>
//         {/* ── FOOTER ─────────────────────────────── */}
//         {/* <div className='offerPageFooterMain' > */}
//         <OfferFooter />
//         {/* </div> */}
//       </div>
//     </>

//   );
// }

// export default Page1;


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