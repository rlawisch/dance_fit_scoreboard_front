import { createContext, useState, useContext } from "react";
import api from "../../services/api";
import * as React from "react";

export interface IScoreContext {

}

const ScoreContext = createContext<IScoreContext>({} as IScoreContext);

export const ScoreProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {

    // Create Score (logged in player)

    // Find All (logged in player)

    // Find By Id (maybe useless... Maybe a URL State filter is better using above route)

    // Update Score (admin only, validation)

    // Delete Score (admin only)

  return (
    <ScoreContext.Provider
      value={{
  
      }}
    >
      {children}
    </ScoreContext.Provider>
  );
};

export const useScore = () => useContext(ScoreContext);
