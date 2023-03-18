import React from "react";
import AuthButtons from "./AuthButtons";
import UserMenu from "./UserMenu";
import AuthModal from "@/app/modals/auth";

const RightContent = () => {
  return (
    <>
      <AuthModal />
      <div className="flex space-x-2 items-center">
        {/* Icons */}
        <AuthButtons />

        {/* UserMenu */}
        <UserMenu />
      </div>
    </>
  );
};

export default RightContent;
