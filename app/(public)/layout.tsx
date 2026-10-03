import React from "react";
import Navbar from "@/components/shared/navbar";

const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navbar />
      <main>{children}</main>
    </div>
  );
};

export default PublicLayout;
