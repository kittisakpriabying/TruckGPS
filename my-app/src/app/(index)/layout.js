import MiniDrawer from "./components/NavBar";
import * as React from "react";
import Button from "@mui/material/Button";

export const metadata = {
  title: "Dashboard Page",
  description: "By Next.js",
};

export default async function IndexLayout({ children }) {
  return (
    <html lang="en">
      <body>
          <MiniDrawer>{children}</MiniDrawer>
      </body>
    </html>
  );
}
