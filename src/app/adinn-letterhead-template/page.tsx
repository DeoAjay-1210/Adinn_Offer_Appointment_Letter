import React from "react";
import LetterheadTemplateMain from "../components/letterhead-template/LetterheadTemplateMain";
import { ProtectedLetterPage } from "../components/utils/ProtectedLetterPage";

function LetterheadTemplatePage() {
  return (
    <ProtectedLetterPage>
      <div
        style={{
          maxWidth: "820px", margin: "0 auto", padding: "32px 24px", fontFamily: "system-ui, sans-serif", height: 'max-content',
        }}>
        <main className="offer-page-shell">
          <LetterheadTemplateMain />
        </main>
      </div>
    </ProtectedLetterPage>
  );
}

export default LetterheadTemplatePage;
