// 5 page 
/* eslint-disable */
// @ts-nocheck
"use client";
import React from 'react';
import './Page1.css'; // shared CSS
import OfferHeader from '../components/OfferHead';
import OfferFooter from '../components/OfferFooter';
import EditableField from '../components/EditableField';

function Page5({ data, setData }) {
    const update = (field, value) => setData(prev => ({ ...prev, [field]: value }));

    return (
        // Second A4 page — gets page-break-after in print
        <div className="a4-page">

            {/* ── HEADER ─────────────────────────────────────── */}
            <OfferHeader />

            {/* ── MAIN CONTENT ────────────────────────────────── */}
            <div style={{ flex: 1 }}>
                <div className='offerPage3CmpyName'>For Adinn Advertising Services Limited</div>

                <div className='offerPage5HrDetails'>
                    <div className='offerPage3HrDetailsContent1 offerBoldLetters'>
                        <EditableField
                            value={data.hrName}
                            onChange={(val) => update('hrName', val)}
                        />
                    </div>
                    <div className='offerPage3HrDetailsContent1'>HR Manager</div>
                </div>


                <div className='offerPage5Acceptance1Main'>
                    <div className='offerBoldLetters offerPage5Acceptance1Main'>Employee Acceptance</div>
                    <div>
                        I have read and understood the compensation structure mentioned above and accept the same.
                    </div>
                </div>


                {/* ── EMPLOYMENT DETAILS TABLE ─────────── */}
                <div className="offerPagePersonContentsPg5">
                    <table>
                        <tbody>
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

export default Page5;