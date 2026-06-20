/* eslint-disable */
// @ts-nocheck
"use client";

import { useEffect } from "react";

function UseBlockBrowserPrint(message = "Normal browser print is disabled. Please use the Download PDF button.") {
  useEffect(() => {
    const showPrintBlockedMessage = () => {
      window.dispatchEvent(
        new CustomEvent("adinn-print-blocked", {
          detail: { message },
        })
      );
    };

    const handleKeyDown = (event) => {
      const key = String(event.key || "").toLowerCase();

      if ((event.ctrlKey || event.metaKey) && key === "p") {
        event.preventDefault();
        event.stopPropagation();
        showPrintBlockedMessage();
        return false;
      }
    };

    const originalPrint = window.print;

    window.print = () => {
      showPrintBlockedMessage();
    };

    const handleBeforePrint = () => {
      document.body.classList.add("adinn-print-restricted");
      showPrintBlockedMessage();
    };

    const handleAfterPrint = () => {
      document.body.classList.remove("adinn-print-restricted");
    };

    window.addEventListener("keydown", handleKeyDown, true);
    window.addEventListener("beforeprint", handleBeforePrint);
    window.addEventListener("afterprint", handleAfterPrint);

    return () => {
      window.removeEventListener("keydown", handleKeyDown, true);
      window.removeEventListener("beforeprint", handleBeforePrint);
      window.removeEventListener("afterprint", handleAfterPrint);
      window.print = originalPrint;
      document.body.classList.remove("adinn-print-restricted");
    };
  }, [message]);
}

export default UseBlockBrowserPrint;