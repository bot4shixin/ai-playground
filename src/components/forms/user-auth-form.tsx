import React from "react";
import GoogleSignInButton from "./google-auth-button";
import OktaSignInButton from "./okta-auth-button";
export default function UserAuthForm() {
  return (
    <>
      <GoogleSignInButton />
      <OktaSignInButton />
    </>
  );
}
