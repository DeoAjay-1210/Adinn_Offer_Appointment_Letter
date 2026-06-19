// 2 page 
/* eslint-disable */
// @ts-nocheck
"use client";
import React from 'react';
import './Page1.css'; // shared CSS
import OfferHeader from '../components/OfferHead';
import OfferFooter from '../components/OfferFooter';

function Page2({ data }) {
    return (
        // Second A4 page — gets page-break-after in print
        <div className="a4-page">

            {/* ── HEADER ─────────────────────────────────────── */}
            <OfferHeader />

            {/* ── MAIN CONTENT ────────────────────────────────── */}
            <div style={{ flex: 1 }}>

                {/* ── Probation Period ──────────────────────────── */}
                <div className="pageSideHeadingsMain">
                    <div className="offerBoldLetters pagesSideHeading">Probation Period</div>
                    <div className="pagesParaContent">
                        You will be on probation for a period of{' '}
                        {/* Reads probationPeriod from shared data (set on Page 1) */}
                        <strong>{data.probationPeriod}</strong> from your date of joining.
                        During the probation period, your performance, conduct, attendance,
                        discipline, and suitability for the role will be evaluated.
                    </div>
                    <div className="pagesParaContent">
                        Upon successful completion of the probation period and subject to
                        management approval, you may be confirmed as a permanent employee and
                        issued an <span className="offerBoldLetters">Appointment Letter</span>.
                    </div>
                    <div className="pagesParaContent">
                        The Company reserves the right to extend the probation period if deemed
                        necessary based on performance or business requirements.
                    </div>
                </div>

                {/* ── Compensation ─────────────────────────────── */}
                <div className="pageSideHeadingsMain">
                    <div className="offerBoldLetters pagesSideHeading">Compensation</div>
                    <div className="pagesParaContent">
                        Your compensation structure will be communicated separately through the
                        Salary Annexure attached to this offer letter. All statutory deductions
                        and other deductions, wherever applicable, shall be made as per Company
                        policy and applicable laws.
                    </div>
                </div>

                {/* ── Company Policies ──────────────────────────── */}
                <div className="pageSideHeadingsMain">
                    <div className="offerBoldLetters pagesSideHeading">Company Policies</div>
                    <div className="pagesParaContent">
                        You shall be governed by all Company rules, regulations, policies,
                        procedures, code of conduct, HR policies, IT policies, safety policies,
                        and any amendments issued from time to time. Any violation of Company
                        policies may result in disciplinary action as per Company rules.
                    </div>
                </div>

                {/* ── Documents Required at Joining ─────────────── */}
                <div className="pageSideHeadingsMain">
                    <div className="offerBoldLetters pagesSideHeading">
                        Documents Required at Joining
                    </div>
                    <div className="pagesParaContent">
                        You will be required to submit the following documents at the time of
                        joining:
                    </div>
                    <ul className="offerDocsList">
                        <li>Aadhaar Card</li>
                        <li>PAN Card</li>
                        <li>Educational Certificates (12<sup style={{fontSize:'12px', paddingTop:'2px'}}>th</sup>, UG, PG)</li>
                        <li>Passport Size Photographs</li>
                        <li>Bank Account Details</li>
                        <li>
                            Previous Employment Documents (if applicable)
                            <ul className="offerDocsSubList">
                                <li>Experience letter</li>
                                <li>Last 3 months payslips</li>
                                <li>Bank statement</li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
            {/* ── END MAIN CONTENT ── */}

            {/* ── FOOTER ─────────────────────────────────────── */}
            <OfferFooter />
        </div>
    );
}

export default Page2;