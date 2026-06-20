/* eslint-disable */
// @ts-nocheck
"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import '../Mainpage.css'

const LETTER_ACCESS_KEY = "adinn_letter_access";

export function ProtectedLetterPage({ children }) {
  const router = useRouter();

  const [checking, setChecking] = useState(true);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const access = localStorage.getItem(LETTER_ACCESS_KEY);

    if (access !== "true") {
      setAllowed(false);
      setChecking(false);
      router.replace("/");
      return;
    }

    setAllowed(true);
    setChecking(false);
  }, [router]);

//   if (checking) {
//     return <div className="adinn-protected-loader">Checking access...</div>;
//   }


if (checking) {
  return (
    <div className="adinn-protected-loader">
      <div className="adinn-loader-card">
        <div className="adinn-loader-ring">
          <div className="adinn-loader-orbit">
            <span></span>
          </div>

          <div className="adinn-loader-center">
            <i className="fa-solid fa-lock"></i>
          </div>
        </div>

        <h2>Verifying Access</h2>
        <p>Preparing your secure letter workspace...</p>

        <div className="adinn-loader-progress">
          <span></span>
        </div>
      </div>
    </div>
  );
}
  if (!allowed) {
    return null;
  }

  return <>{children}</>;
}