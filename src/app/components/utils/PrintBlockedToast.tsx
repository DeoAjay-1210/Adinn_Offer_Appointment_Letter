/* eslint-disable */
// @ts-nocheck
"use client";

import React, { useEffect, useState } from "react";

function PrintBlockedToast() {
  const [message, setMessage] = useState("");
  const [show, setShow] = useState(false);

  useEffect(() => {
    let timer;

    const handleBlockedPrint = (event) => {
      const notifyMessage =
        event?.detail?.message ||
        "Normal browser print is disabled. Please use the Download PDF button.";

      setMessage(notifyMessage);
      setShow(true);

      clearTimeout(timer);
      timer = setTimeout(() => {
        setShow(false);
      }, 3200);
    };

    window.addEventListener("adinn-print-blocked", handleBlockedPrint);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("adinn-print-blocked", handleBlockedPrint);
    };
  }, []);

  if (!show) return null;

  return (
    <div className="adinn-print-toast">
      <div className="adinn-print-toast-icon">
        <i className="fa-solid fa-circle-exclamation"></i>
      </div>

      <div>
        <h4>Print Restricted</h4>
        <p>{message}</p>
      </div>
    </div>
  );
}

export default PrintBlockedToast;