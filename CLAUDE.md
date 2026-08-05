# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Repository layout

The git repo root and the npm project root are both `offer-letter-app/` (the outer `Adinn_OfferLetter/` folder is just a container). Run every command from `offer-letter-app/`. All paths below are relative to it.

## Commands

```bash
npm run dev      # next dev — http://localhost:3000
npm run build    # next build
npm run start    # serve the production build
npm run lint     # eslint (flat config, eslint-config-next core-web-vitals + typescript)
```

There is no test framework, no env vars, and no API routes — the whole app is client-side.

## What this app is

An internal HR tool for Adinn Advertising Services that renders two multi-page letters (Offer Letter, Appointment Letter) as on-screen A4 pages with click-to-edit fields, then rasterises them to PDF. There is no backend: all state lives in React state and `localStorage`.

Routes:
- `/` → `src/app/components/MainPage.tsx` — letter picker + secret-code gate
- `/adinn-offer-letter` → `src/app/pages/PagesMain.tsx` (5 pages)
- `/adinn-appointment-letter` → `src/app/components/appointment-letter/AppointmentLetterMain.tsx` (5 pages)
- `/adinn-internship-approval-letter` → `src/app/components/internship-approval-letter/InternshipApprovalMain.tsx` (1 page)
- `/adinn-internship-completion-certificate` → `src/app/components/internship-completion-certificate/InternshipCompletionMain.tsx` (1 page)
- `/adinn-relieving-experience-certificate` → `src/app/components/relieving-experience-certificate/RelievingExperienceMain.tsx` (1 page)
- `/adinn-employment-acceptance-declaration` → `src/app/components/employment-acceptance-declaration/EmploymentAcceptanceMain.tsx` (2 pages, **Tamil**)

Every letter folder holds a `*Main.tsx` controller, a `*Page1.tsx` (…`Page5.tsx`) body, and its own scoped `.css`.

## Architecture

### Multi-page vs single-page letters

The two five-page letters (Offer, Appointment) carry a step wizard and jump to a hidden "all pages mounted" step before exporting. The three single-page letters have no wizard — their one page is always mounted inside `pdfRef`, and the toolbar is just *Letterhead / Download PDF / Home*. They also share `src/app/components/utils/letterPdfExport.tsx` instead of inlining the export helpers; the two older flows keep their own inline copies.

### The two multi-page letter flows are near-clones

`PagesMain.tsx` (offer) and `AppointmentLetterMain.tsx` (appointment) are independent copies of the same controller: a flat `data` object in `useState`, a `currentStep` wizard (5 editable pages + a "Preview" step), the same `renderAllPagesBeforeExport` / `createA4PdfBlob` / `triggerBlobDownload` trio, and the same letterhead toggle. Their page components (`src/app/pages/Page1–5.tsx` vs `src/app/components/appointment-letter/AppointmentPage1–5.tsx`) are likewise parallel. **A change to one side almost always needs the mirrored change on the other** — most notably `buildSalaryRows`, which is duplicated verbatim in `src/app/pages/Page4.tsx` and `AppointmentPage4.tsx`.

Both flows share the same layout/primitive components: `OfferPageLayout`, `OfferHead`, `OfferFooter`, `EditableField`, and the stylesheet `src/app/pages/Page1.css`.

### Tanglish → Tamil input

The Tamil letter (வேலை நியமன ஒப்புதல் மற்றும் உறுதிமொழி) edits through `TamilEditableField` instead of `EditableField`. It is a small IME: type Latin letters, get a ranked list of Tamil candidates, commit with Space/Enter/Tab or `1`–`9`, `Esc` to keep the Latin spelling, and a `தமிழ்/ABC` chip to disable it per field.

`src/app/components/utils/tanglishToTamil.tsx` is the engine — entirely offline, no API calls. Candidate order is: exact dictionary hit → **fuzzy** dictionary hit → rule-based reading → dictionary prefix matches → alternate readings → the raw Latin word (always last). Three things carry most of the accuracy:

- **`fuzzyKey`** squashes spellings to a skeleton (long vowels shortened, digraphs folded, voiced/voiceless merged, doubles collapsed), so one dictionary entry catches `Karthiyayini` / `Kaarthiyaayini` / `Kartiyayini`. This is what makes names work — English spellings of Tamil names drop long vowels and doubled consonants unpredictably.
- **`WORD_INITIAL_SOFTENING`** — no Tamil word begins with ட/ண/ற/ழ/ள/ன, so the first letter softens (this is what makes `tamil` → தமிழ், not டமிழ்). Loanwords that genuinely start hard (டாக்டர்) are offered via the `__initial: "hard"` variant.
- **`resolveNasal`** picks between ந/ண/ங/ஞ/ன from the following letter, and doubled consonants reuse whatever the first one resolved to (`enna` → என்ன).

If you touch the engine, re-check accuracy — the mappings are interdependent and a change to one rule shifts unrelated words.

The Tamil letter does **not** seed from `adinnOfferLetterData` the way the other letters do: that data is English and would overwrite the Tamil sample defaults.

### Page data flow

Each step page receives `{ data, setData, showLetterhead }` and mutates fields through a local `update(field, value)` that spreads into `setData`. Fields are edited inline via `EditableField` (offer side: click → `<input>` swap) or `AppointmentEditableField` (appointment side: `contentEditable` span). Adding a letter field means adding it to the flow's `DEFAULT_DATA`/`DEFAULT_APPOINTMENT_DATA` and wiring an `EditableField` — nothing else.

The offer flow persists `data` to `localStorage["adinnOfferLetterData"]` on every change; the appointment flow reads that key once on mount to pre-fill shared fields (name, address, designation, joining date, …) while keeping its own appointment-specific fields.

### PDF export (the load-bearing part)

`downloadPDF` is not a print dialog — it is a screenshot pipeline, and the CSS is built around it:

1. `renderAllPagesBeforeExport` uses `flushSync` to jump to step 5 (all five pages mounted inside `pdfRef`) and set `isPdfExportMode`, which adds `.pdf-export-content` to the container.
2. It blurs the active element, waits two `requestAnimationFrame`s, `document.fonts.ready`, all `<img>` load events, then a further 300 ms.
3. `createA4PdfBlob` dynamically imports `html2canvas` + `jspdf`, queries `.a4-page` elements, canvases each at `scale: 2.5`, and pastes each as a full-bleed 210×297 mm image.

Consequences to respect when editing letter markup or CSS:
- Every renderable page must be wrapped in `OfferPageLayout`, which emits the `.a4-page` element. A page that doesn't produce `.a4-page` is silently missing from the PDF.
- `.a4-page` is a fixed `210mm × 297mm` grid (`22mm` header / `1fr` body / `16mm` footer) with `overflow: hidden`, and `.pdf-export-content .a4-page` pins it to `794 × 1134 px`. Content that grows past the page is **clipped without warning** — verify visually after adding content.
- Images use plain `<img crossOrigin="anonymous">` from `/public/Images`, not `next/image`, because html2canvas must be able to read them. Keep it that way.
- Anything that should not appear in the PDF gets `className="no-print"` (see the salary input panel in `Page4.tsx`).

### Letterhead toggle

The `Letterhead: ON/OFF` button flows down as the `showLetterhead` prop and toggles `.letterhead-visible` / `.letterhead-hidden` on `.a4-page`. These use `visibility`, not `display`, so the header/footer keep occupying their grid rows and page geometry never shifts. The choice is persisted in `localStorage["adinn_offer_pdf_letterhead"]` and shared by both flows; it also becomes part of the downloaded filename.

### Access gate

`MainPage.tsx` holds a hardcoded `SECRET_CODE`. On success it sets `localStorage["adinn_letter_access"] = "true"`; `ProtectedLetterPage` (wrapping both letter routes) checks that key on mount and `router.replace("/")` otherwise. This is UI-level gating only — there is no server-side check.

### Browser print is deliberately disabled

`useBlockBrowserPrint` (called by both controllers) overrides `window.print`, swallows Ctrl/Cmd+P, and hooks `beforeprint`. Instead of printing it dispatches an `adinn-print-blocked` `CustomEvent`, which `PrintBlockedToast` renders. `@media print` rules in `Page1.css` additionally blank the page via `body.adinn-print-restricted`. Users are meant to go through *Download PDF*. Don't "fix" a broken print stylesheet by re-enabling `window.print`.

## Conventions in this codebase

- Almost every letter component starts with `/* eslint-disable */` and `// @ts-nocheck` despite `strict: true` in tsconfig — `data` is untyped and indexed dynamically. Match the surrounding file rather than introducing partial typing into one of these.
- Superseded implementations are kept in place as large commented-out blocks (whole prior versions of `Page1`, `downloadDOCX`, layout variants). The live code is normally the *last* definition in the file.
- CSS is global, hand-written, and imported for side effects (`Page1.css`, `Mainpage.css`, `AppointmentLetter.css`, `OfferFooter.css`, and one stylesheet per newer letter). Class names are global and shared across flows — `Page1.css` is the shared letter stylesheet, not page-1-specific. Tailwind v4 is installed and used only for a few utility classes in the root layout.
- `Page1.css` opens with `* { font-size: 16px }`, which wins over any class that only sets `font-weight`. A `<span class="offerBoldLetters">` wrapping literal text therefore renders at 16px even inside a smaller paragraph — the newer letters' stylesheets each re-assert a font size on the spans inside their text blocks to work around it.
- DOCX export is dormant: `src/app/components/utils/generateOfferDocx.tsx` and an inline `downloadDOCX` in `PagesMain.tsx` both exist, but the buttons that call them are commented out. PDF is the only live export path.

## Salary calculation (`buildSalaryRows`)

Shared shape: rows are `{ rowType: "section" | "normal" | "total" | "net", label, rule, monthly, annual }`, annual = `round(monthly) * 12`, amounts formatted with `en-IN` locale.

Fixed constants: children education allowance `200`, professional tax `208`, PF wage cap `15000`, HRA = `24%` of Basic. Basic defaults to `60%` of CTC and is user-adjustable via `data.basicPercentage`.

Four `salaryType` modes:
- `WITHOUT_PF` — gross = CTC, no deductions.
- `WITH_PF` — employer EPF = 12% of `min(basic, 15000)`; gross = CTC − employer EPF; employee EPF mirrors employer.
- `WITH_PF_ESI` — employer ESI 3.25% / employee ESI 0.75% of ESI wages (gross minus children allowance). Gross and employer ESI are mutually dependent, so it runs a **5-iteration fixed-point loop** then forces `gross = CTC − employerPF − employerESI` so the total exactly matches the entered CTC. Don't replace the loop with a single-pass formula without re-checking that identity.
- `VARIABLE_PAY` — `monthlyCTC` is the *total*; fixed CTC = total − variable pay, and components are computed off the fixed portion.

In every mode "Other Allowance" is the balancing figure, so a change to any other component silently shifts it.

## localStorage keys

`adinn_letter_access`, `adinn_selected_letter`, `adinn_letter_unlocked_at`, `adinnOfferLetterData`, `adinn_offer_pdf_letterhead`.
