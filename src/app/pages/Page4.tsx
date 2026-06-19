// 4 page 
/* eslint-disable */
// @ts-nocheck
"use client";
import React from 'react';
import './Page1.css'; // shared CSS
import OfferHeader from '../components/OfferHead';
import OfferFooter from '../components/OfferFooter';
import EditableField from '../components/EditableField';
import "../components/appointment-letter/AppointmentLetter.css";

const toNumber = (value) => {
  return Number(String(value || "0").replace(/,/g, "")) || 0;
};

const round = (value) => {
  return Math.round(Number(value || 0));
};

const formatINR = (value) => {
  return Number(value || 0).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

const annual = (monthly) => {
  return round(monthly) * 12;
};

function buildSalaryRows(data) {
  const salaryType = data.salaryType || "WITH_PF";
  const monthlyCTC = round(toNumber(data.monthlyCTC));
  const variablePay = round(toNumber(data.variablePay));

  const childrenAllowance = 200;
  const professionalTax = 208;
  const pfLimit = 15000;

  const rows = [];

  const addSection = (label) => {
    rows.push({
      rowType: "section",
      label,
      rule: "",
      monthly: "",
      annual: "",
    });
  };

  const addNormal = (label, rule, monthly) => {
    rows.push({
      rowType: "normal",
      label,
      rule,
      monthly: round(monthly),
      annual: annual(monthly),
    });
  };

  const addTotal = (label, rule, monthly) => {
    rows.push({
      rowType: "total",
      label,
      rule,
      monthly: round(monthly),
      annual: annual(monthly),
    });
  };

  const addNet = (label, rule, monthly) => {
    rows.push({
      rowType: "net",
      label,
      rule,
      monthly: round(monthly),
      annual: annual(monthly),
    });
  };

  /*
    TYPE 1: WITHOUT PF
    Example:
    CTC 25,000
    Basic = 60% of CTC
    HRA = 24% of Basic
    Children = 200
    Other = balance
    No deductions
  */
  if (salaryType === "WITHOUT_PF") {
    const grossSalary = monthlyCTC;
    const basic = round(monthlyCTC * 0.6);
    const hra = round(basic * 0.24);
    const otherAllowance = grossSalary - basic - hra - childrenAllowance;

    addSection("A. EARNINGS (GROSS SALARY COMPONENTS)");
    addNormal("Basic", "60.00% of CTC", basic);
    addNormal("House Rent Allowance (HRA)", "24.00% of Basic", hra);
    addNormal("Children Education Allowance", "Fixed Allowance", childrenAllowance);
    addNormal("Other Allowance", "Balancing Figure", otherAllowance);
    addTotal("TOTAL GROSS SALARY", "Sum of Earnings", grossSalary);

    addTotal("TOTAL COST TO COMPANY (CTC)", "Gross Salary", monthlyCTC);
    addNet("D. NET TAKE-HOME SALARY", "No Deductions", grossSalary);

    return rows;
  }

  /*
    TYPE 2: WITH PF
    Example:
    CTC 31,808
    Basic = 60% of CTC
    HRA = 24% of Basic
    Employer PF = 12% restricted to 15,000 PF wage cap = 1,800
    Gross = CTC - Employer PF
    Other = balance
    Employee PF = Employer PF
    PT = 208
  */
  if (salaryType === "WITH_PF") {
    const basic = round(monthlyCTC * 0.6);
    const hra = round(basic * 0.24);
    const employerPF = round(Math.min(basic, pfLimit) * 0.12);
    const grossSalary = monthlyCTC - employerPF;
    const otherAllowance = grossSalary - basic - hra - childrenAllowance;

    const employeePF = employerPF;
    const totalDeductions = employeePF + professionalTax;
    const netSalary = grossSalary - totalDeductions;

    addSection("A. EARNINGS (GROSS SALARY COMPONENTS)");
    addNormal("Basic", "60.00% of CTC", basic);
    addNormal("House Rent Allowance (HRA)", "24.00% of Basic", hra);
    addNormal("Children Education Allowance", "Fixed Allowance", childrenAllowance);
    addNormal("Other Allowance", "Balancing Figure (Gross Pool)", otherAllowance);
    addTotal("TOTAL GROSS SALARY", "CTC minus Employer EPF", grossSalary);

    addSection("B. EMPLOYER CONTRIBUTIONS");
    addNormal("Employer EPF Contribution", "12.00% of Restricted PF Wages", employerPF);
    addTotal("TOTAL COST TO COMPANY (CTC)", "Gross Salary + Employer EPF", monthlyCTC);

    addSection("C. EMPLOYEE STATUTORY DEDUCTIONS");
    addNormal("Employee EPF Contribution", "Deducted from Gross", employeePF);
    addNormal("Professional Tax (PT)", "Fixed Monthly Deduction", professionalTax);
    addTotal("TOTAL EMPLOYEE DEDUCTIONS", "EPF + PT Outflows", totalDeductions);

    addNet("D. NET TAKE-HOME SALARY", "Remaining Net Cash", netSalary);

    return rows;
  }

  /*
    TYPE 3: WITH PF + ESI
    Example:
    CTC 17,403
    Basic = 60% of CTC
    HRA = 24% of Basic
    Children = 200
    Other = fixed 2,500
    Gross = Basic + HRA + Children + Other
    Employer PF = 12% restricted PF wages
    Employer ESI = CTC - Gross - Employer PF
    Employee ESI = Employer ESI * 0.75 / 3.25
    PT = 208
  */
  if (salaryType === "WITH_PF_ESI") {
    const basic = round(monthlyCTC * 0.6);
    const hra = round(basic * 0.24);
    const otherAllowance = 2500;

    const grossSalary = basic + hra + childrenAllowance + otherAllowance;
    const employerPF = round(Math.min(basic, pfLimit) * 0.12);

    const employerESI = Math.max(0, monthlyCTC - grossSalary - employerPF);
    const employeePF = employerPF;
    const employeeESI = round(employerESI * (0.75 / 3.25));

    const totalEmployeeDeductions =
      employeePF + employeeESI + professionalTax;

    const netSalary = grossSalary - totalEmployeeDeductions;

    addSection("A. EARNINGS (GROSS SALARY COMPONENTS)");
    addNormal("Basic", "60.00% of CTC", basic);
    addNormal("House Rent Allowance", "24.00% of Basic", hra);
    addNormal("Children Education Allowance", "Fixed Allowance", childrenAllowance);
    addNormal("Other Allowance", "Fixed / Balancing Allowance", otherAllowance);
    addTotal("TOTAL GROSS SALARY (A)", "Sum of Earnings", grossSalary);

    addSection("B. EMPLOYER CONTRIBUTIONS");
    addNormal("EPF - Employer Contribution", "12.00% of Restricted PF Wages", employerPF);
    addNormal("ESI - Employer Contribution", "3.25% of ESI Wages", employerESI);
    addTotal(
      "TOTAL COST TO COMPANY (CTC) (A + B)",
      "Gross + Employer Benefits",
      grossSalary + employerPF + employerESI
    );

    addSection("C. EMPLOYEE STATUTORY DEDUCTIONS");
    addNormal("EPF - Employee Contribution", "12.00% of Restricted PF Wages", employeePF);
    addNormal("ESI - Employee Contribution", "0.75% of ESI Wages", employeeESI);
    addNormal("Professional Tax (PT)", "Fixed Monthly Deduction", professionalTax);
    addTotal(
      "TOTAL EMPLOYEE DEDUCTIONS (C)",
      "Sum of Deductions",
      totalEmployeeDeductions
    );

    addNet("D. NET TAKE-HOME SALARY (A - C)", "Gross Salary minus Deductions", netSalary);

    return rows;
  }

  /*
    TYPE 4: VARIABLE PAY
    Here monthly CTC = fixed CTC + variable pay.
    PF/ESI not applied in this simple variable-pay structure.
  */
  if (salaryType === "VARIABLE_PAY") {
    const fixedCTC = Math.max(0, monthlyCTC - variablePay);

    const basic = round(fixedCTC * 0.6);
    const hra = round(basic * 0.24);
    const otherAllowance = fixedCTC - basic - hra - childrenAllowance;

    addSection("A. EARNINGS (FIXED SALARY COMPONENTS)");
    addNormal("Basic", "60.00% of Fixed CTC", basic);
    addNormal("House Rent Allowance (HRA)", "24.00% of Basic", hra);
    addNormal("Children Education Allowance", "Fixed Allowance", childrenAllowance);
    addNormal("Other Allowance", "Balancing Figure", otherAllowance);
    addTotal("TOTAL FIXED GROSS SALARY", "Sum of Fixed Earnings", fixedCTC);

    addSection("B. VARIABLE PAY");
    addNormal("Variable Pay", "As per Company Policy", variablePay);

    addTotal("TOTAL COST TO COMPANY (CTC)", "Fixed CTC + Variable Pay", monthlyCTC);
    addNet("D. NET TAKE-HOME SALARY", "Fixed + Variable Pay", monthlyCTC);

    return rows;
  }

  return rows;
}


function Page4({ data, setData }) {
    const update = (field, value) => setData(prev => ({ ...prev, [field]: value }));
  const salaryRows = buildSalaryRows(data);

    return (
        // Second A4 page — gets page-break-after in print
        <div className="a4-page">

            {/* ── HEADER ─────────────────────────────────────── */}
            <OfferHeader />

            {/* ── MAIN CONTENT ────────────────────────────────── */}
      <div className="offer-page-body offerPage4Body">
                {/* ── MAIN CONTENT ───────────────────────── */}
                <div className="offerPage1OverallMain">

                    {/* Title — "Mr." is static, name is editable */}
                    <h1 className="offerBoldLetters OfferMainHeading">
                        SALARY ANNEXTURE
                    </h1>

                    {/* Date — right aligned */}
                    <div className="offerDateSectionPg4">
                        <span className="offerBoldLetters">Date: </span>
                        <EditableField
                            value={data.offerDate}
                            onChange={(val) => update('offerDate', val)}
                        />
                    </div>
                </div>

                {/* ── EMPLOYMENT DETAILS TABLE ─────────── */}
                <div className="offerPagePersonContentsPg4">
                    <table>
                        <tbody>

                            <tr className="offerPageEmployeeDetailsContentPg4">
                                <td className="offerBoldLetters">Employee Name</td>
                                <td>:</td>
                                <td>
                                    <EditableField
                                        value={data.employeeName}
                                        onChange={(val) => update('employeeName', val)}
                                    />
                                </td>
                            </tr>

                            <tr className="offerPageEmployeeDetailsContentPg4">
                                <td className="offerBoldLetters">Designation</td>
                                <td>:</td>
                                <td>
                                    <EditableField
                                        value={data.designation}
                                        onChange={(val) => update('designation', val)}
                                    />
                                </td>
                            </tr>

                            <tr className="offerPageEmployeeDetailsContentPg4">
                                <td className="offerBoldLetters">Department</td>
                                <td>:</td>
                                <td>
                                    <EditableField
                                        value={data.department}
                                        onChange={(val) => update('department', val)}
                                    />
                                </td>
                            </tr>

                            <tr className="offerPageEmployeeDetailsContentPg4">
                                <td className="offerBoldLetters">Branch / Location</td>
                                <td>:</td>
                                <td>
                                    <EditableField
                                        value={data.branch}
                                        onChange={(val) => update('branch', val)}
                                    />
                                </td>
                            </tr>

                            <tr className="offerPageEmployeeDetailsContentPg4">
                                <td className="offerBoldLetters">Reporting To</td>
                                <td>:</td>
                                <td>
                                    <EditableField
                                        value={data.reportingTo}
                                        onChange={(val) => update('reportingTo', val)}
                                    />
                                </td>
                            </tr>

                            <tr className="offerPageEmployeeDetailsContentPg4">
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




 {/* Salary input section - hidden in print/PDF */}
        <div className="salaryInputPanel no-print">
          <div className="salaryInputGroup">
            <select
              value={data.salaryType}
              onChange={(e) => update("salaryType", e.target.value)}
            >
              <option value="WITHOUT_PF">Without PF</option>
              <option value="WITH_PF">With PF</option>
              <option value="WITH_PF_ESI">With PF + ESI</option>
              <option value="VARIABLE_PAY">Variable Pay</option>
            </select>
          </div>

          <div className="salaryInputGroup">
            <input
              type="number"
              value={data.monthlyCTC}
              onChange={(e) => update("monthlyCTC", e.target.value)}
              placeholder="Enter monthly CTC"
            />
          </div>

          {data.salaryType === "VARIABLE_PAY" && (
            <div className="salaryInputGroup">
              <label>Variable Pay</label>
              <input
                type="number"
                value={data.variablePay}
                onChange={(e) => update("variablePay", e.target.value)}
                placeholder="Enter variable pay"
              />
            </div>
          )}
        </div>

        {/* <table className="appointmentSalaryTable">
            
          <thead>
            <tr>
              <th>SALARY COMPONENTS</th>
              <th>PERCENTAGE / RULE BASIS</th>
              <th>MONTHLY AMOUNT (₹)</th>
              <th>ANNUAL AMOUNT (₹)</th>
            </tr>
          </thead>

          <tbody>
            {salaryRows.map((row, index) => {
              if (row.rowType === "section") {
                return (
                  <tr key={index} className="salaryHeadingRow">
                    <td colSpan={4}>{row.label}</td>
                  </tr>
                );
              }

              return (
                <tr
                  key={index}
                  className={
                    row.rowType === "net"
                      ? "salaryNetRow"
                      : row.rowType === "total"
                      ? "salaryTotalRow"
                      : ""
                  }
                >
                  <td>{row.label}</td>
                  <td className="salaryRuleCell">{row.rule}</td>
                  <td>{formatINR(row.monthly)}</td>
                  <td>{formatINR(row.annual)}</td>
                </tr>
              );
            })}
          </tbody>
        </table> */}


<table className="appointmentSalaryTable">
  <colgroup>
    <col style={{ width: "31%" }} />
    <col style={{ width: "29%" }} />
    <col style={{ width: "20%" }} />
    <col style={{ width: "20%" }} />
  </colgroup>

  <thead>
    <tr>
      <th>SALARY COMPONENTS</th>
      <th>PERCENTAGE / RULE BASIS</th>
      <th>MONTHLY AMOUNT (₹)</th>
      <th>ANNUAL AMOUNT (₹)</th>
    </tr>
  </thead>

  <tbody>
    {salaryRows.map((row, index) => {
      if (row.rowType === "section") {
        return (
          <tr key={index} className="salaryHeadingRow">
            <td colSpan={4}>{row.label}</td>
          </tr>
        );
      }

      return (
        <tr
          key={index}
          className={
            row.rowType === "net"
              ? "salaryNetRow"
              : row.rowType === "total"
              ? "salaryTotalRow"
              : ""
          }
        >
          <td>{row.label}</td>
          <td className="salaryRuleCell">{row.rule}</td>
          <td>{formatINR(row.monthly)}</td>
          <td>{formatINR(row.annual)}</td>
        </tr>
      );
    })}
  </tbody>
</table>


                <div className='offerPage4TCMain'>
                    <div className="offerBoldLetters pagesSideHeading">Terms & Conditions</div>

                    <ol className="offerTermsList" style={{ "--term-start": 0 }}>
                        <li>Salary shall be paid on or before the scheduled salary disbursement date as per company policy.</li>
                        <li>Statutory deductions such as PF, ESI, Professional Tax, Income Tax, or any other applicable deductions shall be made as per prevailing laws.</li>
                        {/* <li>Salary structure and benefits are confidential and should not be disclosed to unauthorized persons.</li>
                        <li>The Company reserves the right to revise, restructure, or modify compensation components in accordance with business requirements and applicable laws.</li>
                        <li>Any excess payment, erroneous payment, or policy-related recovery may be adjusted from future salary or final settlement.</li> */}

                    
                    </ol>

                </div>
            </div>

            <OfferFooter />
        </div>
    );
}

export default Page4;