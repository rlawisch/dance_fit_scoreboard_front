import React, { createContext, useContext } from "react";

export interface IComfortLevelContext {}

const ComfortLevelContext = createContext<IComfortLevelContext>(
  {} as IComfortLevelContext
);

export const ComfortLevelProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {

    // TODO:
    // createComfortLevel => POST /comfort-levels/
    // 
    // 


  return (
    <ComfortLevelContext.Provider value={{}}>
      {children}
    </ComfortLevelContext.Provider>
  );
};

export const useComfortLevel = () => useContext(ComfortLevelContext)
