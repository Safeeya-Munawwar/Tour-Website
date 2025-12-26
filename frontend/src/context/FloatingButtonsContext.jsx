import React, { createContext, useContext, useState } from "react";

const FloatingButtonsContext = createContext();

export function FloatingButtonsProvider({ children }) {
  const [isWhatsAppOpen, setIsWhatsAppOpen] = useState(false);

  return (
    <FloatingButtonsContext.Provider
      value={{ isWhatsAppOpen, setIsWhatsAppOpen }}
    >
      {children}
    </FloatingButtonsContext.Provider>
  );
}

export function useFloatingButtons() {
  return useContext(FloatingButtonsContext);
}
