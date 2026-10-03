import React from "react";
import Navbar from "@/components/shared/navbar";
import { getMe } from "@/service/getMe";

const PublicLayout = async ({ children }: { children: React.ReactNode }) => {
  const profileRes = await getMe();
  const userData = profileRes?.success ? profileRes.data.user : null;
  return (
    <div>
      <Navbar user={userData} />
      <main>{children}</main>
    </div>
  );
};

export default PublicLayout;
