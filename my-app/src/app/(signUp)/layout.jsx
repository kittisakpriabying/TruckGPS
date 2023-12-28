import * as React from "react";
import SignUp from "./components/SignUp";

export const metadata = {
  title: "signUp",
  description: "By Next.js",
};

export default async function SignUpLayout( {children}) {
  return (
    <html lang="en">
      <body>
      <SignUp> {children}</SignUp>
      </body>
    </html>
  );
}
