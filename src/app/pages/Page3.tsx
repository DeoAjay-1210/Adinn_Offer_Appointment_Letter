// 3 page 
/* eslint-disable */
// @ts-nocheck
"use client";
import React from 'react';
import './Page1.css'; // shared CSS
import OfferHeader from '../components/OfferHead';
import OfferFooter from '../components/OfferFooter';
import EditableField from '../components/EditableField';

function Page3({ data, setData }) {
    // Helper to update one field in shared data
    const update = (field, value) => setData(prev => ({ ...prev, [field]: value }));
    return (
        // Second A4 page — gets page-break-after in print
        <div className="a4-page">

            {/* ── HEADER ─────────────────────────────────────── */}
            <OfferHeader />

            {/* ── MAIN CONTENT ────────────────────────────────── */}
            <div style={{ flex: 1 }}>
                {/* ── Probation Period ──────────────────────────── */}
                <div className="pageSideHeadingsMain">
                    <div className="offerBoldLetters pagesSideHeading">Acceptance of Offer</div>

                    <div className="pagesParaContent">
                        Please sign and return a copy of this letter as a token of your acceptance of the offer and agreement to abide by the Company's terms, conditions, policies, rules, and regulations.
                    </div>
                    <div className="pagesParaContent">
                        We look forward to welcoming you to <span className="offerBoldLetters">Adinn Advertising Services Limited</span> and wish you a successful career with us.
                    </div>



                </div>



                <div className='offerPage3CmpyName'>For Adinn Advertising Services Limited</div>

                <div className='offerPage3HrDetails'>
                    <div className='offerPage3HrDetailsContent1 offerBoldLetters'>
                        <EditableField
                            value={data.hrName}
                            onChange={(val) => update('hrName', val)}
                        />
                    </div>
                    <div className='offerPage3HrDetailsContent1'>HR Manager</div>
                </div>


                <div className='offerPage3Acceptance1Main'>
                    <div className='offerBoldLetters offerPage3Acceptance1Main'>Employee Acceptance</div>
                    <div>
                        <span className='offerBoldLetters'> I, Mr./Ms. &nbsp; </span> __________________________________________, &nbsp; <label className='offerPage3Acceptance1'></label>
                        hereby accept the offer of employment with <span className='offerBoldLetters'> Adinn Advertising Services Limited </span>
                        and agree to comply with all Company policies, rules, regulations, terms, and conditions applicable from time to time.

                    </div>
                </div>


                {/* ── EMPLOYMENT DETAILS TABLE ─────────── */}
                <div className="offerPagePersonContents">


                    <table>
                        <tbody>

                            <tr className="offerPageEmployeeDetailsContentPg35">
                                <td className="offerBoldLetters">Employee Name</td>
                                <td>:</td>
                                <td>

                                </td>
                            </tr>

                            <tr className="offerPageEmployeeDetailsContentPg35">
                                <td className="offerBoldLetters">Signature</td>
                                <td>:</td>
                                <td>

                                </td>
                            </tr>

                            <tr className="offerPageEmployeeDetailsContentPg35">
                                <td className="offerBoldLetters">Date</td>
                                <td>:</td>
                                <td>

                                </td>
                            </tr>

                        </tbody>
                    </table>
                </div>

            </div>

            <OfferFooter />
        </div>
    );
}

export default Page3;