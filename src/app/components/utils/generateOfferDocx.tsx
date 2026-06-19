// generateOfferDocx.js  — v2  (real header/footer images, matching layout)
// Place in:  src/components/utils/generateOfferDocx.js
// Usage:     import { generateOfferDocx } from ".../generateOfferDocx";
//            <button onClick={() => generateOfferDocx(data)}>Download DOCX</button>
//
// Requires:  npm install docx
// ─────────────────────────────────────────────────────────────────────────────

import {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  ImageRun, Header, Footer,
  AlignmentType, BorderStyle, WidthType, ShadingType, VerticalAlign,
  PageBreak, LevelFormat, UnderlineType, TabStopType, TabStopPosition,
} from "docx";

// ─── Helpers ──────────────────────────────────────────────────────────────────

const toNumber = (v) => Number(String(v || "0").replace(/,/g, "")) || 0;
const round    = (v) => Math.round(Number(v || 0));
const annual   = (m) => round(m) * 12;
const fmtINR   = (v) =>
  Number(v || 0).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const run  = (text, opts = {}) => new TextRun({ text: String(text ?? ""), font: "Arial", size: 23, ...opts });
const bold = (text, opts = {}) => run(text, { bold: true, ...opts });
const para = (children, opts = {}) =>
  new Paragraph({ children: Array.isArray(children) ? children : [children], ...opts });
const blank = (space = 60) => para([run("")], { spacing: { after: space } });

// A4 dimensions in DXA  (1 inch = 1440 DXA)
// CSS: left/right margin 16mm ≈ 908 DXA | top 8mm ≈ 454 | bottom 6mm ≈ 340
// Header area = 22mm ≈ 1247 DXA | Footer area = 16mm ≈ 907 DXA
const PAGE_W        = 11906;
const PAGE_H        = 16838;
const MARGIN_LR     = 908;
const MARGIN_TOP    = 1247;   // reserves space for header (22mm)
const MARGIN_BOTTOM = 907;    // reserves space for footer (16mm)
const HEADER_H      = 700;    // header distance from top edge
const FOOTER_H      = 400;    // footer distance from bottom edge
const CONTENT_W     = PAGE_W - MARGIN_LR * 2; // 10090 DXA

// Border helpers
const brd = (color = "D5DCE9") => ({
  top:    { style: BorderStyle.SINGLE, size: 6, color },
  bottom: { style: BorderStyle.SINGLE, size: 6, color },
  left:   { style: BorderStyle.SINGLE, size: 6, color },
  right:  { style: BorderStyle.SINGLE, size: 6, color },
});
const noBorder = () => ({
  top:    { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
  bottom: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
  left:   { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
  right:  { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
});
const cellPad  = { top: 55, bottom: 55, left: 100, right: 100 };
const cellPad0 = { top: 55, bottom: 55, left: 0,   right: 80  };

// ─── Fetch image → ArrayBuffer (works in browser) ────────────────────────────
async function fetchImageBuffer(src) {
  try {
    const res  = await fetch(src);
    const blob = await res.blob();
    return await blob.arrayBuffer();
  } catch {
    return null;
  }
}

// Detect image type from URL
function imgType(src) {
  if (src.match(/\.png/i))  return "png";
  if (src.match(/\.jpe?g/i)) return "jpg";
  if (src.match(/\.gif/i))  return "gif";
  return "png";
}

// ─── Build Word HEADER (logo top-right, matches your OfferHeader.jsx) ────────
function buildHeader(logoBuffer, logoType) {
  const children = [];

  if (logoBuffer) {
    // Logo right-aligned, max-height 18mm ≈ 68px → scale to ~102pt wide
    children.push(
      new Paragraph({
        alignment: AlignmentType.RIGHT,
        spacing: { before: 0, after: 0 },
        children: [
          new ImageRun({
            type:  logoType || "png",
            data:  logoBuffer,
            transformation: { width: 120, height: 55 }, // px → roughly 18mm height
            altText: { title: "Adinn Logo", description: "Adinn Logo", name: "AdinnLogo" },
          }),
        ],
      })
    );
  } else {
    // Fallback text if image fails
    children.push(
      para(bold("Adinn Advertising Services Ltd.", { size: 20 }), {
        alignment: AlignmentType.RIGHT,
      })
    );
  }

  return new Header({ children });
}

// ─── Build Word FOOTER (logos + divider + address, matches your OfferFooter.jsx) ─
function buildFooter(footerImages) {
  // footerImages = { ins, rural, outdoor, m3 }  each is { buffer, type } | null
  // We'll lay this out as a table: [logos] | [divider col] | [address]
  // because Word doesn't support true inline-block flow like CSS

  const FOOTER_W   = CONTENT_W;
  const LOGO_COL   = 1600;  // ~logos area
  const DIV_COL    = 120;   // thin divider
  const ADDR_COL   = FOOTER_W - LOGO_COL - DIV_COL;

  const logoImages = [];

  const addImg = (key, w, h) => {
    const img = footerImages?.[key];
    if (img?.buffer) {
      logoImages.push(
        new ImageRun({
          type: img.type,
          data: img.buffer,
          transformation: { width: w, height: h },
          altText: { title: key, description: key, name: key },
        })
      );
    }
  };

  addImg("ins",     50, 38);
  addImg("rural",   50, 29);
  addImg("outdoor", 58, 38);
  addImg("m3",      28, 23);

  const logoPara = new Paragraph({
    alignment: AlignmentType.LEFT,
    spacing: { before: 0, after: 0 },
    children: logoImages.length > 0 ? logoImages : [run("")],
  });

  const dividerCell = new TableCell({
    width:   { size: DIV_COL, type: WidthType.DXA },
    margins: { top: 0, bottom: 0, left: 80, right: 80 },
    borders: {
      top:   { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
      bottom:{ style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
      left:  { style: BorderStyle.SINGLE, size: 12, color: "000000" },
      right: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
    },
    children: [para([run("")])],
  });

  const footerTable = new Table({
    width: { size: FOOTER_W, type: WidthType.DXA },
    columnWidths: [LOGO_COL, DIV_COL, ADDR_COL],
    borders: {
      top:           { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
      bottom:        { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
      left:          { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
      right:         { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
      insideH:       { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
      insideV:       { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
    },
    rows: [
      new TableRow({
        children: [
          new TableCell({
            width:   { size: LOGO_COL, type: WidthType.DXA },
            margins: { top: 0, bottom: 0, left: 0, right: 60 },
            borders: noBorder(),
            verticalAlign: VerticalAlign.BOTTOM,
            children: [logoPara],
          }),
          dividerCell,
          new TableCell({
            width:   { size: ADDR_COL, type: WidthType.DXA },
            margins: { top: 0, bottom: 0, left: 100, right: 0 },
            borders: noBorder(),
            verticalAlign: VerticalAlign.BOTTOM,
            children: [
              para([
                bold("REGISTERED OFFICE : ", { size: 16 }),
                run("29, 1st Cross street, Vanamamalai nagar, Bypass road, Madurai - 625016.", { size: 16 }),
              ], { spacing: { after: 30 } }),
              para([
                bold("BRANCH OFFICE : ", { size: 16 }),
                run("Chennai | Bengaluru | Kerala | Tel: 91 452 4344800 - 801. Email: info@adinn.co.in. www.adinn.com", { size: 16 }),
              ], { spacing: { after: 0 } }),
            ],
          }),
        ],
      }),
    ],
  });

  return new Footer({ children: [footerTable] });
}

// ─── Salary rows ─────────────────────────────────────────────────────────────
function buildSalaryRows(data) {
  const salaryType      = data.salaryType || "WITH_PF";
  const monthlyCTC      = round(toNumber(data.monthlyCTC));
  const variablePay     = round(toNumber(data.variablePay));
  const childrenAllow   = 200;
  const professionalTax = 208;
  const pfLimit         = 15000;

  const rows = [];
  const sec  = (l)         => ({ t: "section", label: l });
  const norm = (l, r, m)  => ({ t: "normal",  label: l, rule: r, monthly: round(m),   annual: annual(m) });
  const tot  = (l, r, m)  => ({ t: "total",   label: l, rule: r, monthly: round(m),   annual: annual(m) });
  const net  = (l, r, m)  => ({ t: "net",     label: l, rule: r, monthly: round(m),   annual: annual(m) });

  if (salaryType === "WITHOUT_PF") {
    const basic = round(monthlyCTC * 0.6), hra = round(basic * 0.24);
    const other = monthlyCTC - basic - hra - childrenAllow;
    rows.push(sec("A. EARNINGS (GROSS SALARY COMPONENTS)"));
    rows.push(norm("Basic",                        "60.00% of CTC",       basic));
    rows.push(norm("House Rent Allowance (HRA)",   "24.00% of Basic",     hra));
    rows.push(norm("Children Education Allowance", "Fixed Allowance",     childrenAllow));
    rows.push(norm("Other Allowance",              "Balancing Figure",    other));
    rows.push(tot ("TOTAL GROSS SALARY",           "Sum of Earnings",     monthlyCTC));
    rows.push(tot ("TOTAL COST TO COMPANY (CTC)",  "Gross Salary",        monthlyCTC));
    rows.push(net ("D. NET TAKE-HOME SALARY",      "No Deductions",       monthlyCTC));
    return rows;
  }
  if (salaryType === "WITH_PF") {
    const basic = round(monthlyCTC * 0.6), hra = round(basic * 0.24);
    const ePF   = round(Math.min(basic, pfLimit) * 0.12);
    const gross = monthlyCTC - ePF, other = gross - basic - hra - childrenAllow;
    const totalDed = ePF + professionalTax, net_ = gross - totalDed;
    rows.push(sec("A. EARNINGS (GROSS SALARY COMPONENTS)"));
    rows.push(norm("Basic",                        "60.00% of CTC",                   basic));
    rows.push(norm("House Rent Allowance (HRA)",   "24.00% of Basic",                 hra));
    rows.push(norm("Children Education Allowance", "Fixed Allowance",                 childrenAllow));
    rows.push(norm("Other Allowance",              "Balancing Figure (Gross Pool)",   other));
    rows.push(tot ("TOTAL GROSS SALARY",           "CTC minus Employer EPF",          gross));
    rows.push(sec("B. EMPLOYER CONTRIBUTIONS"));
    rows.push(norm("Employer EPF Contribution",    "12.00% of Restricted PF Wages",  ePF));
    rows.push(tot ("TOTAL COST TO COMPANY (CTC)",  "Gross Salary + Employer EPF",    monthlyCTC));
    rows.push(sec("C. EMPLOYEE STATUTORY DEDUCTIONS"));
    rows.push(norm("Employee EPF Contribution",    "Deducted from Gross",            ePF));
    rows.push(norm("Professional Tax (PT)",        "Fixed Monthly Deduction",        professionalTax));
    rows.push(tot ("TOTAL EMPLOYEE DEDUCTIONS",    "EPF + PT Outflows",              totalDed));
    rows.push(net ("D. NET TAKE-HOME SALARY",      "Remaining Net Cash",             net_));
    return rows;
  }
  if (salaryType === "WITH_PF_ESI") {
    const basic = round(monthlyCTC * 0.6), hra = round(basic * 0.24), other = 2500;
    const gross = basic + hra + childrenAllow + other;
    const ePF   = round(Math.min(basic, pfLimit) * 0.12);
    const eESI  = Math.max(0, monthlyCTC - gross - ePF);
    const eeESI = round(eESI * (0.75 / 3.25));
    const totalDed = ePF + eeESI + professionalTax, net_ = gross - totalDed;
    rows.push(sec("A. EARNINGS (GROSS SALARY COMPONENTS)"));
    rows.push(norm("Basic",                             "60.00% of CTC",                  basic));
    rows.push(norm("House Rent Allowance",              "24.00% of Basic",                hra));
    rows.push(norm("Children Education Allowance",      "Fixed Allowance",                childrenAllow));
    rows.push(norm("Other Allowance",                   "Fixed / Balancing Allowance",    other));
    rows.push(tot ("TOTAL GROSS SALARY (A)",            "Sum of Earnings",                gross));
    rows.push(sec("B. EMPLOYER CONTRIBUTIONS"));
    rows.push(norm("EPF - Employer Contribution",       "12.00% of Restricted PF Wages", ePF));
    rows.push(norm("ESI - Employer Contribution",       "3.25% of ESI Wages",            eESI));
    rows.push(tot ("TOTAL COST TO COMPANY (CTC) (A+B)","Gross + Employer Benefits",      gross + ePF + eESI));
    rows.push(sec("C. EMPLOYEE STATUTORY DEDUCTIONS"));
    rows.push(norm("EPF - Employee Contribution",       "12.00% of Restricted PF Wages", ePF));
    rows.push(norm("ESI - Employee Contribution",       "0.75% of ESI Wages",            eeESI));
    rows.push(norm("Professional Tax (PT)",             "Fixed Monthly Deduction",        professionalTax));
    rows.push(tot ("TOTAL EMPLOYEE DEDUCTIONS (C)",     "Sum of Deductions",              totalDed));
    rows.push(net ("D. NET TAKE-HOME SALARY (A - C)",   "Gross Salary minus Deductions",  net_));
    return rows;
  }
  if (salaryType === "VARIABLE_PAY") {
    const fixed = Math.max(0, monthlyCTC - variablePay);
    const basic = round(fixed * 0.6), hra = round(basic * 0.24);
    const other = fixed - basic - hra - childrenAllow;
    rows.push(sec("A. EARNINGS (FIXED SALARY COMPONENTS)"));
    rows.push(norm("Basic",                        "60.00% of Fixed CTC",    basic));
    rows.push(norm("House Rent Allowance (HRA)",   "24.00% of Basic",        hra));
    rows.push(norm("Children Education Allowance", "Fixed Allowance",        childrenAllow));
    rows.push(norm("Other Allowance",              "Balancing Figure",       other));
    rows.push(tot ("TOTAL FIXED GROSS SALARY",     "Sum of Fixed Earnings",  fixed));
    rows.push(sec("B. VARIABLE PAY"));
    rows.push(norm("Variable Pay",                 "As per Company Policy",  variablePay));
    rows.push(tot ("TOTAL COST TO COMPANY (CTC)",  "Fixed CTC + Variable Pay", monthlyCTC));
    rows.push(net ("D. NET TAKE-HOME SALARY",      "Fixed + Variable Pay",   monthlyCTC));
    return rows;
  }
  return rows;
}

// ─── Salary table ────────────────────────────────────────────────────────────
function makeSalaryTable(salaryRows) {
  const cols = [
    Math.round(CONTENT_W * 0.31),
    Math.round(CONTENT_W * 0.29),
    Math.round(CONTENT_W * 0.20),
    Math.round(CONTENT_W * 0.20),
  ];

  const hCell = (text, idx) => new TableCell({
    borders: brd("244898"), width: { size: cols[idx], type: WidthType.DXA },
    margins: cellPad, shading: { fill: "244898", type: ShadingType.CLEAR },
    verticalAlign: VerticalAlign.CENTER,
    children: [para(bold(text, { color: "FFFFFF", size: 16 }))],
  });

  const thead = new TableRow({
    tableHeader: true,
    children: [
      hCell("SALARY COMPONENTS", 0),
      hCell("PERCENTAGE / RULE BASIS", 1),
      hCell("MONTHLY AMOUNT (\u20B9)", 2),
      hCell("ANNUAL AMOUNT (\u20B9)", 3),
    ],
  });

  const dataRows = salaryRows.map((row) => {
    if (row.t === "section") {
      return new TableRow({ children: [
        new TableCell({
          columnSpan: 4, borders: brd("47586D"),
          width: { size: CONTENT_W, type: WidthType.DXA }, margins: cellPad,
          shading: { fill: "47586D", type: ShadingType.CLEAR },
          children: [para(bold(row.label, { color: "FFFFFF", size: 16 }))],
        }),
      ]});
    }
    const isNet = row.t === "net", isTotal = row.t === "total";
    const fill     = isNet ? "D8F5E4" : isTotal ? "EAF2FF" : "FFFFFF";
    const txtColor = isNet ? "0A7A3B" : isTotal ? "0F233D" : "222222";
    const isBold   = isNet || isTotal;

    const mkCell = (text, idx, align = AlignmentType.LEFT) => new TableCell({
      borders: brd(), width: { size: cols[idx], type: WidthType.DXA },
      margins: cellPad, shading: { fill, type: ShadingType.CLEAR },
      children: [new Paragraph({
        alignment: align,
        children: [new TextRun({ text, bold: isBold, color: txtColor,
          italics: idx === 1 && !isBold, size: 16, font: "Arial" })],
      })],
    });

    return new TableRow({ children: [
      mkCell(row.label,           0, AlignmentType.LEFT),
      mkCell(row.rule,            1, AlignmentType.LEFT),
      mkCell(fmtINR(row.monthly), 2, AlignmentType.RIGHT),
      mkCell(fmtINR(row.annual),  3, AlignmentType.RIGHT),
    ]});
  });

  return new Table({
    width: { size: CONTENT_W, type: WidthType.DXA },
    columnWidths: cols,
    rows: [thead, ...dataRows],
  });
}

// ─── Details table (label : value) ───────────────────────────────────────────
function makeDetailsTable(rows) {
  const COL = [Math.round(CONTENT_W * 0.36), 190, Math.round(CONTENT_W * 0.59)];
  return new Table({
    width: { size: CONTENT_W, type: WidthType.DXA }, columnWidths: COL,
    rows: rows.map(({ label, value }) => new TableRow({ children: [
      new TableCell({ borders: noBorder(), width: { size: COL[0], type: WidthType.DXA },
        margins: cellPad0, children: [para(bold(label))] }),
      new TableCell({ borders: noBorder(), width: { size: COL[1], type: WidthType.DXA },
        margins: { top: 55, bottom: 55, left: 0, right: 0 }, children: [para(run(":"))] }),
      new TableCell({ borders: noBorder(), width: { size: COL[2], type: WidthType.DXA },
        margins: { top: 55, bottom: 55, left: 80, right: 0 }, children: [para(run(value || ""))] }),
    ]})),
  });
}

// ─── Acceptance paragraph with underlined blank ───────────────────────────────
function acceptanceLine() {
  return para([
    run("I, Mr./Ms. "),
    new TextRun({
      text: "\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0",
      underline: { type: UnderlineType.SINGLE, color: "000000" },
      font: "Arial", size: 23,
    }),
    run(" , hereby accept the offer of employment with "),
    bold("Adinn Advertising Services Limited"),
    run(" and agree to comply with all Company policies, rules, regulations, terms, and conditions applicable from time to time."),
  ], { alignment: AlignmentType.LEFT, spacing: { after: 120 } });
}

const secHead = (text) =>
  para(bold(text, { size: 24 }), { spacing: { before: 200, after: 100 } });

// ─── PAGE 1 ───────────────────────────────────────────────────────────────────
function buildPage1(d) {
  return [
    para([bold("Date: "), run(d.offerDate || "")], {
      alignment: AlignmentType.RIGHT, spacing: { before: 120, after: 240 },
    }),
    para([bold("To,")], { spacing: { after: 60 } }),
    para(bold(d.employeeName || ""), { spacing: { after: 40 } }),
    para(run(d.addressLine1 || ""), { spacing: { after: 40 } }),
    para(run(d.addressLine2 || ""), { spacing: { after: 40 } }),
    para(run(d.addressLine3 || ""), { spacing: { after: 220 } }),

    para([bold("Subject: "), run("Offer of Employment")], { spacing: { after: 200 } }),

    para(run(`Dear ${d.employeeName || "Candidate"},`), { spacing: { after: 120 } }),

    para([
      run("We are pleased to offer you the position of "),
      bold(d.designation || ""), run(" in the "), bold(d.department || ""),
      run(" at Adinn Advertising Services Limited, "), bold(d.branch || ""),
      run(", subject to the terms and conditions mentioned in this letter."),
    ], { alignment: AlignmentType.JUSTIFIED, spacing: { after: 100 } }),

    para([
      run("Your proposed date of joining will be "),
      bold(d.dateOfJoining || ""), run("."),
    ], { spacing: { after: 200 } }),

    secHead("Employment Details"),

    makeDetailsTable([
      { label: "Employee Name",    value: d.employeeName   || "" },
      { label: "Designation",      value: d.designation    || "" },
      { label: "Department",       value: d.department     || "" },
      { label: "Branch / Location",value: d.branch         || "" },
      { label: "Reporting To",     value: d.reportingTo    || "" },
      { label: "Date of Joining",  value: d.dateOfJoining  || "" },
      { label: "Employment Type",  value: d.employmentType || "Full-Time" },
      { label: "Probation Period", value: d.probationPeriod|| "" },
    ]),

    blank(80),
  ];
}

// ─── PAGE 2 ───────────────────────────────────────────────────────────────────
function buildPage2(d) {
  const bullet = (text) => para(run(text), {
    numbering: { reference: "bullets", level: 0 }, spacing: { after: 60 },
  });

  return [
    para([new TextRun({ break: 1 })], { pageBreakBefore: true, spacing: { after: 0 } }),

    secHead("Probation Period"),
    para([
      run("You will be on probation for a period of "), bold(d.probationPeriod || ""),
      run(" from your date of joining. During the probation period, your performance, conduct, attendance, discipline, and suitability for the role will be evaluated."),
    ], { alignment: AlignmentType.JUSTIFIED, spacing: { after: 100 } }),
    para(run("Upon successful completion of the probation period and subject to management approval, you may be confirmed as a permanent employee and issued an Appointment Letter."), { alignment: AlignmentType.JUSTIFIED, spacing: { after: 100 } }),
    para(run("The Company reserves the right to extend the probation period if deemed necessary based on performance or business requirements."), { alignment: AlignmentType.JUSTIFIED, spacing: { after: 140 } }),

    secHead("Compensation"),
    para(run("Your compensation structure will be communicated separately through the Salary Annexure attached to this offer letter. All statutory deductions and other deductions, wherever applicable, shall be made as per Company policy and applicable laws."), { alignment: AlignmentType.JUSTIFIED, spacing: { after: 140 } }),

    secHead("Company Policies"),
    para(run("You shall be governed by all Company rules, regulations, policies, procedures, code of conduct, HR policies, IT policies, safety policies, and any amendments issued from time to time. Any violation of Company policies may result in disciplinary action as per Company rules."), { alignment: AlignmentType.JUSTIFIED, spacing: { after: 140 } }),

    secHead("Documents Required at Joining"),
    para(run("You will be required to submit the following documents at the time of joining:"), { spacing: { after: 80 } }),
    bullet("Aadhaar Card"),
    bullet("PAN Card"),
    bullet("Educational Certificates (12th, UG, PG)"),
    bullet("Passport Size Photographs"),
    bullet("Bank Account Details"),
    bullet("Previous Employment Documents — Experience letter, Last 3 months payslips, Bank statement (if applicable)"),

    blank(80),
  ];
}

// ─── PAGE 3 ───────────────────────────────────────────────────────────────────
function buildPage3(d) {
  return [
    para([new TextRun({ break: 1 })], { pageBreakBefore: true, spacing: { after: 0 } }),

    secHead("Acceptance of Offer"),
    para(run("Please sign and return a copy of this letter as a token of your acceptance of the offer and agreement to abide by the Company\u2019s terms, conditions, policies, rules, and regulations."), { alignment: AlignmentType.JUSTIFIED, spacing: { after: 100 } }),
    para([
      run("We look forward to welcoming you to "), bold("Adinn Advertising Services Limited"),
      run(" and wish you a successful career with us."),
    ], { alignment: AlignmentType.JUSTIFIED, spacing: { after: 400 } }),

    para(run("For Adinn Advertising Services Limited"), { spacing: { after: 1200 } }),
    para(bold(d.hrName || ""), { spacing: { after: 60 } }),
    para(run("HR Manager"), { spacing: { after: 560 } }),

    secHead("Employee Acceptance"),
    acceptanceLine(),
    blank(80),

    makeDetailsTable([
      { label: "Employee Name", value: "" },
      { label: "Signature",     value: "" },
      { label: "Date",          value: "" },
    ]),

    blank(80),
  ];
}

// ─── PAGE 4 ───────────────────────────────────────────────────────────────────
function buildPage4(d) {
  const salaryRows = buildSalaryRows(d);
  const tc = (text, ref) => para(run(text), {
    numbering: { reference: ref, level: 0 },
    alignment: AlignmentType.JUSTIFIED, spacing: { after: 80 },
  });

  return [
    para([new TextRun({ break: 1 })], { pageBreakBefore: true, spacing: { after: 0 } }),

    para(bold("SALARY ANNEXURE", { size: 28 }), {
      alignment: AlignmentType.CENTER, spacing: { before: 100, after: 160 },
    }),
    para([bold("Date: "), run(d.offerDate || "")], {
      alignment: AlignmentType.RIGHT, spacing: { after: 180 },
    }),

    makeDetailsTable([
      { label: "Employee Name",    value: d.employeeName  || "" },
      { label: "Designation",      value: d.designation   || "" },
      { label: "Department",       value: d.department    || "" },
      { label: "Branch / Location",value: d.branch        || "" },
      { label: "Reporting To",     value: d.reportingTo   || "" },
      { label: "Date of Joining",  value: d.dateOfJoining || "" },
    ]),

    blank(120),
    makeSalaryTable(salaryRows),
    blank(120),

    secHead("Terms & Conditions"),
    tc("Salary shall be paid on or before the scheduled salary disbursement date as per company policy.", "terms2"),
    tc("Statutory deductions such as PF, ESI, Professional Tax, Income Tax, or any other applicable deductions shall be made as per prevailing laws.", "terms2"),

    blank(80),
  ];
}

// ─── PAGE 5 ───────────────────────────────────────────────────────────────────
function buildPage5(d) {
  const tc = (text) => para(run(text), {
    numbering: { reference: "terms3", level: 0 },
    alignment: AlignmentType.JUSTIFIED, spacing: { after: 80 },
  });

  return [
    para([new TextRun({ break: 1 })], { pageBreakBefore: true, spacing: { after: 0 } }),

    secHead("Terms & Conditions (continued)"),
    tc("Salary structure and benefits are confidential and should not be disclosed to unauthorized persons."),
    tc("The Company reserves the right to revise, restructure, or modify compensation components in accordance with business requirements and applicable laws."),
    tc("Any excess payment, erroneous payment, or policy-related recovery may be adjusted from future salary or final settlement."),

    blank(200),
    para(run("For Adinn Advertising Services Limited"), { spacing: { after: 1200 } }),
    para(bold(d.hrName || ""), { spacing: { after: 60 } }),
    para(run("HR Manager"), { spacing: { after: 500 } }),

    secHead("Employee Acceptance"),
    para(run("I have read and understood the compensation structure mentioned above and accept the same."), { spacing: { after: 120 } }),
    blank(80),

    makeDetailsTable([
      { label: "Signature", value: "" },
      { label: "Date",      value: "" },
    ]),
  ];
}

// ─── Main export ──────────────────────────────────────────────────────────────
export async function generateOfferDocx(data) {
  // Fetch all images in parallel
  const [logoBuffer, insBuffer, ruralBuffer, outdoorBuffer, m3Buffer] = await Promise.all([
    fetchImageBuffer("/Images/AdinnLogo.png"),
    fetchImageBuffer("/Images/Adinn_INSLogo1.png"),
    fetchImageBuffer("/Images/Adinn_RuralLogo1.png"),
    fetchImageBuffer("/Images/Adinn_IndianOutdoorLogo1.jpg"),
    fetchImageBuffer("/Images/Adinn_3mLogo1.png"),
  ]);

  const sharedHeader = buildHeader(logoBuffer, "png");
  const sharedFooter = buildFooter({
    ins:     insBuffer     ? { buffer: insBuffer,     type: "png" } : null,
    rural:   ruralBuffer   ? { buffer: ruralBuffer,   type: "png" } : null,
    outdoor: outdoorBuffer ? { buffer: outdoorBuffer, type: "jpg" } : null,
    m3:      m3Buffer      ? { buffer: m3Buffer,      type: "png" } : null,
  });

  const doc = new Document({
    numbering: {
      config: [
        { reference: "bullets", levels: [{ level: 0, format: LevelFormat.BULLET, text: "\u2022",
            alignment: AlignmentType.LEFT,
            style: { paragraph: { indent: { left: 480, hanging: 240 } } } }] },
        { reference: "terms2", levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.",
            alignment: AlignmentType.LEFT,
            style: { paragraph: { indent: { left: 480, hanging: 240 } } } }] },
        { reference: "terms3", levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.",
            alignment: AlignmentType.LEFT,
            style: { paragraph: { indent: { left: 480, hanging: 240 } } } }] },
      ],
    },

    styles: {
      default: {
        document: {
          run:       { font: "Arial", size: 23, color: "222222" },
          paragraph: { spacing: { after: 80 }, line: 276, lineRule: "auto" },
        },
      },
    },

    sections: [{
      properties: {
        page: {
          size:   { width: PAGE_W, height: PAGE_H },
          margin: {
            top:    MARGIN_TOP,
            bottom: MARGIN_BOTTOM,
            left:   MARGIN_LR,
            right:  MARGIN_LR,
            header: HEADER_H,
            footer: FOOTER_H,
          },
        },
      },
      headers: { default: sharedHeader },
      footers: { default: sharedFooter },
      children: [
        ...buildPage1(data),
        ...buildPage2(data),
        ...buildPage3(data),
        ...buildPage4(data),
        ...buildPage5(data),
      ],
    }],
  });

  const blob = await Packer.toBlob(doc);
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement("a");
  a.href     = url;
  a.download = `OfferLetter_${(data.employeeName || "Employee").replace(/\s+/g, "_")}.docx`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}