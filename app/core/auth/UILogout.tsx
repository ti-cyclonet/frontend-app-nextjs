"use client";
import React, { useState } from "react";
import { signOut } from "next-auth/react";
import { BiLogOut } from 'react-icons/bi';

import { UIConfirmationDialog } from "@core/infrastructure/ui/components/UIConfirmationDialog";

export default function UILogout() {
  const [showConfirmation, setShowConfirmation] = useState(false);

  return (
    <>
      <a 
        id="log-out"
        className="sidebar-link align-middle"
        onClick={() => setShowConfirmation(true)}
      >
        <BiLogOut size={30} className="align-middle" />
      </a >
      <UIConfirmationDialog
                show={showConfirmation}
                title="Cerrar sesión"
                message="Está seguro de que quiere cerrar sesión?"
                onHide={() => setShowConfirmation(false)}
                onConfirm={() => {
                  signOut();
                }}
                onCancel={() => setShowConfirmation(false)}
              />
    </>
  );
}
