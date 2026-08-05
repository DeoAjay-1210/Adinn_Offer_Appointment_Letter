import React from "react";
import InternshipApprovalMain from "../components/internship-approval-letter/InternshipApprovalMain";
import { ProtectedLetterPage } from "../components/utils/ProtectedLetterPage";

function InternshipApprovalLetterPage() {
  return (
    <ProtectedLetterPage>
      <div
        style={{
          maxWidth: "820px", margin: "0 auto", padding: "32px 24px", fontFamily: "system-ui, sans-serif", height: 'max-content',
        }}>
        <main className="offer-page-shell">
          <InternshipApprovalMain />
        </main>
      </div>
    </ProtectedLetterPage>
  );
}

export default InternshipApprovalLetterPage;
