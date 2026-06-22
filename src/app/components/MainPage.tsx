/* eslint-disable */
// @ts-nocheck
"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "./Mainpage.css";

const SECRET_CODE = "ADINN_OfferLetter$June2026"; // Change your secret code here
const LETTER_ACCESS_KEY = "adinn_letter_access";

function MainPage() {
  const router = useRouter();

  const [selectedLetter, setSelectedLetter] = useState(null);
  const [secretCode, setSecretCode] = useState("");
  const [error, setError] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // ✅ NEW: Toggle password visibility

  const typesOfLetter = [
    {
      id: 1,
      title: "Offer Letter",
      description: "Generate, edit, preview, and download employee offer letters.",
      icon: "fa-regular fa-envelope-open",
      navigation: "/adinn-offer-letter",
    },
    {
      id: 2,
      title: "Appointment Letter",
      description: "Prepare official appointment letters with employee details.",
      icon: "fa-regular fa-file-lines",
      navigation: "/adinn-appointment-letter",
    },
  ];

  useEffect(() => {
    const access = localStorage.getItem(LETTER_ACCESS_KEY);
    setIsUnlocked(access === "true");
  }, []);

  const handleLetterClick = (letter) => {
    const access = localStorage.getItem(LETTER_ACCESS_KEY);

    if (access === "true") {
      router.push(letter.navigation);
      return;
    }

    setSelectedLetter(letter);
    setSecretCode("");
    setError("");
    setShowPassword(false); // ✅ Reset password visibility when popup opens
  };

  const closePopup = () => {
    setSelectedLetter(null);
    setSecretCode("");
    setError("");
    setShowPassword(false); // ✅ Reset password visibility when popup closes
  };

  const handleUnlock = (e) => {
    e.preventDefault();

    if (!selectedLetter) return;

    if (secretCode.trim() === SECRET_CODE) {
      localStorage.setItem(LETTER_ACCESS_KEY, "true");
      localStorage.setItem("adinn_selected_letter", selectedLetter.title);
      localStorage.setItem("adinn_letter_unlocked_at", new Date().toISOString());

      setIsUnlocked(true);
      setSelectedLetter(null);

      router.push(selectedLetter.navigation);
      return;
    }

    setError("Invalid secret code. Please check and try again.");
  };

  return (
    <main className="adinn-main-page">
      <nav className="adinn-main-nav">
        <img
          src="/Images/AdinnLogo.png"
          alt="Adinn Advertising Services Ltd."
          className="adinn-main-logo"
          crossOrigin="anonymous"
        />
      </nav>

      <section className={`adinn-main-content ${selectedLetter ? "is-blurred" : ""}`}>
        <p className="adinn-eyebrow">
          ADINN People Systems Hub
        </p>

        <div className="adinn-hero">
          <h1>ADINN Letter Workspace</h1>
          <p>
            Create, manage, and access official HR letters with a clean and secure workflow.
          </p>
        </div>

        <div className="adinn-letter-grid">
          {typesOfLetter.map((item) => (
            <button
              key={item.id}
              type="button"
              className="adinn-letter-card"
              onClick={() => handleLetterClick(item)}
            >
              <div className="adinn-card-icon">
                <i className={item.icon}></i>
              </div>

              <h3>{item.title}</h3>
              <p>{item.description}</p>

              <span className="adinn-card-action">
                {isUnlocked ? "Open Letter" : "Enter Secret Code"}
              </span>
            </button>
          ))}
        </div>
      </section>

      {selectedLetter && (
        <div className="adinn-access-backdrop">
          <form className="adinn-access-popup" onSubmit={handleUnlock}>
            <button
              type="button"
              className="adinn-popup-close"
              onClick={closePopup}
              aria-label="Close popup"
            >
              ×
            </button>

            <div className="adinn-popup-icon">
              <i className="fa-solid fa-lock"></i>
            </div>

            <h2>Protected Access</h2>

            <p>
              Enter the secret code to open{" "}
              <strong>{selectedLetter.title}</strong>.
            </p>

            {/* ✅ UPDATED: Password input with eye toggle */}
            <div className="adinn-password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                value={secretCode}
                onChange={(e) => {
                  setSecretCode(e.target.value);
                  setError("");
                }}
                placeholder="Enter secret code"
                className="adinn-secret-input"
                autoFocus
              />
              <button
                type="button"
                className="adinn-eye-toggle"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                <i className={showPassword ? "fa-regular fa-eye" : "fa-regular fa-eye-slash"}></i>
              </button>
            </div>

            {error && <div className="adinn-error-message">{error}</div>}

            <button type="submit" className="adinn-unlock-btn">
              Unlock & Continue
            </button>
          </form>
        </div>
      )}
    </main>
  );
}

export default MainPage;