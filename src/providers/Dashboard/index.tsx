import { createContext, useContext } from "react";
import * as React from "react";
import usePersistedState from "../../utils/usePersistedState";

export interface IDashboardContext {
  sideBarStatus: boolean;
  toggleSidebar: () => void
}

const DashboardContext = createContext<IDashboardContext>(
  {} as IDashboardContext
);

export const DashboardProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [sideBarStatus, setSidebarStatus] = usePersistedState("sideBarStatus", false);

  const toggleSidebar = () => {
    setSidebarStatus(!sideBarStatus)
  }

  return (
    <DashboardContext.Provider
      value={{
        sideBarStatus,
        toggleSidebar
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => useContext(DashboardContext);
