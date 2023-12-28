import * as React from "react";
import SignIn from "./components/SignIn";
export const metadata = {
  title: "signIn Page",
  description: "By Next.js",
};

export default async function SignInLayout( {children}) {
  return (
    <html lang="en">
      <body>
      <SignIn> {children}</SignIn>
      </body>
    </html>
  );
}
