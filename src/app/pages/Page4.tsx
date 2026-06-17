/* eslint-disable */
// @ts-nocheck
"use client";
import React from 'react';
import './Page1.css'; // shared CSS
import OfferHeader from '../components/OfferHead';
import OfferFooter from '../components/OfferFooter';
import EditableField from '../components/EditableField';


function Page4({ data, setData }) {
    const update = (field, value) => setData(prev => ({ ...prev, [field]: value }));

    return (
        // Second A4 page — gets page-break-after in print
        <div className="a4-page">

            {/* ── HEADER ─────────────────────────────────────── */}
            <OfferHeader />

            {/* ── MAIN CONTENT ────────────────────────────────── */}
            <div style={{ flex: 1 }}>
                {/* ── MAIN CONTENT ───────────────────────── */}
                <div className="offerPage1OverallMain">

                    {/* Title — "Mr." is static, name is editable */}
                    <h1 className="offerBoldLetters OfferMainHeading">
                        SALARY ANNEXTURE
                    </h1>

                    {/* Date — right aligned */}
                    <div className="offerDateSection">
                        <span className="offerBoldLetters">Date: </span>
                        <EditableField
                            value={data.offerDate}
                            onChange={(val) => update('offerDate', val)}
                        />
                    </div>
                </div>

                {/* ── EMPLOYMENT DETAILS TABLE ─────────── */}
                <div className="offerPagePersonContents">
                    <table>
                        <tbody>

                            <tr className="offerPageEmployeeDetailsContent">
                                <td className="offerBoldLetters">Employee Name</td>
                                <td>:</td>
                                <td>
                                    <EditableField
                                        value={data.employeeName}
                                        onChange={(val) => update('employeeName', val)}
                                    />
                                </td>
                            </tr>

                            <tr className="offerPageEmployeeDetailsContent">
                                <td className="offerBoldLetters">Designation</td>
                                <td>:</td>
                                <td>
                                    <EditableField
                                        value={data.designation}
                                        onChange={(val) => update('designation', val)}
                                    />
                                </td>
                            </tr>

                            <tr className="offerPageEmployeeDetailsContent">
                                <td className="offerBoldLetters">Department</td>
                                <td>:</td>
                                <td>
                                    <EditableField
                                        value={data.department}
                                        onChange={(val) => update('department', val)}
                                    />
                                </td>
                            </tr>

                            <tr className="offerPageEmployeeDetailsContent">
                                <td className="offerBoldLetters">Branch / Location</td>
                                <td>:</td>
                                <td>
                                    <EditableField
                                        value={data.branch}
                                        onChange={(val) => update('branch', val)}
                                    />
                                </td>
                            </tr>

                            <tr className="offerPageEmployeeDetailsContent">
                                <td className="offerBoldLetters">Reporting To</td>
                                <td>:</td>
                                <td>
                                    <EditableField
                                        value={data.reportingTo}
                                        onChange={(val) => update('reportingTo', val)}
                                    />
                                </td>
                            </tr>

                            <tr className="offerPageEmployeeDetailsContent">
                                <td className="offerBoldLetters">Date of Joining</td>
                                <td>:</td>
                                <td>
                                    <EditableField
                                        value={data.dateOfJoining}
                                        onChange={(val) => update('dateOfJoining', val)}
                                    />
                                </td>
                            </tr>

                        </tbody>
                    </table>
                </div>



                <div className='offerPage4TCMain'>
                    <div className="offerBoldLetters pagesSideHeading">Terms & Conditions</div>

                    <ol style={{listStyleType:'number', padding:'0px 6%'}}>
                        <li>Salary shall be paid on or before the scheduled salary disbursement date as per company policy.</li>
                        <li>Statutory deductions such as PF, ESI, Professional Tax, Income Tax, or any other applicable deductions shall be made as per prevailing laws.</li>
                        <li>Salary structure and benefits are confidential and should not be disclosed to unauthorized persons.</li>
                        <li>The Company reserves the right to revise, restructure, or modify compensation components in accordance with business requirements and applicable laws.</li>
                        <li>Any excess payment, erroneous payment, or policy-related recovery may be adjusted from future salary or final settlement.</li>

                    
                    </ol>

                </div>
            </div>

            <OfferFooter />
        </div>
    );
}

export default Page4;