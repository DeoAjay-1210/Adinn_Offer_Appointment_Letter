import React from "react";
import EmploymentAcceptanceMain from "../components/employment-acceptance-declaration/EmploymentAcceptanceMain";
import { ProtectedLetterPage } from "../components/utils/ProtectedLetterPage";

function EmploymentAcceptanceDeclarationPage() {
  return (
    <ProtectedLetterPage>
      <div
        style={{
          maxWidth: "820px", margin: "0 auto", padding: "32px 24px", fontFamily: "system-ui, sans-serif", height: 'max-content',
        }}>
        <main className="offer-page-shell">
          <EmploymentAcceptanceMain />
        </main>
      </div>
    </ProtectedLetterPage>
  );
}

export default EmploymentAcceptanceDeclarationPage;
