import React, { createContext, useContext, useState } from "react";
import "./style.css";

interface NavTabProps {
  value: string;
  onChange: (value: string) => void;
  children: React.ReactNode;
}

const NavTab: React.FC<NavTabProps> = ({ value, onChange, children }) => {
  return (
    <TabsContext.Provider value={{ value, onChange }}>
      <div className="tabs">{children}</div>
    </TabsContext.Provider>
  );
};

export default NavTab;

interface TabProps {
  value: string;
  label: string;
}

interface TabsContextValue {
  value: string;
  onChange: (value: string) => void;
}

const TabsContext = createContext<TabsContextValue | null>(null);

export function Tab({ value, label }: TabProps) {
  const ctx = useContext(TabsContext);
  if (!ctx) {
    throw new Error("Tab must be used inside <Tabs>");
  }

  const active = ctx.value === value;

  return (
    <button
      className={`tab ${active ? "active" : ""}`}
      onClick={() => ctx.onChange(value)}
    >
      {label}
    </button>
  );
}
