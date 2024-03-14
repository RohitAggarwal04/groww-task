"use client";
// TotalAmountContext.js
import React, { createContext, useState, useContext } from "react";

// Create the context
const TotalAmountContext = createContext();

// Custom hook to consume the context
export const useTotalAmount = () => {
  const context = useContext(TotalAmountContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
};

// Context provider component
export const TotalAmountProvider = ({ children }) => {
  const [totalAmount, settotalAmount] = useState(0);

  return (
    <TotalAmountContext.Provider value={{ totalAmount, settotalAmount }}>
      {children}
    </TotalAmountContext.Provider>
  );
};
