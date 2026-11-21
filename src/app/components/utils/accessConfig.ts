// ============================================================
// accessConfig.ts  -  THE ONE PLACE TO CHANGE THE SECRET CODE
//
// To rotate the code: edit SECRET_CODE below, commit, deploy.
// Every browser that unlocked with the old code is asked for
// the new one on its next visit (the stored token no longer
// matches), so no one needs to clear their browser data.
//
// NOTE: this is UI-level gating only. The code ships in the
// client bundle, so it is not a substitute for real auth.
// ============================================================

export const SECRET_CODE = "ADINN_OfficialLetters$Nov2026";

export const LETTER_ACCESS_KEY = "adinn_letter_access";

// Token saved after a successful unlock. Derived from the code, so it
// changes whenever the code changes (and the plain code is not stored).
export const getAccessToken = (): string => {
  let hash = 5381;
  for (let i = 0; i < SECRET_CODE.length; i++) {
    hash = ((hash << 5) + hash + SECRET_CODE.charCodeAt(i)) | 0;
  }
  return `v-${(hash >>> 0).toString(36)}`;
};

export const hasValidAccess = (): boolean => {
  try {
    return localStorage.getItem(LETTER_ACCESS_KEY) === getAccessToken();
  } catch {
    return false;
  }
};
