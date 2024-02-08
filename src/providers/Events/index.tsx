import { createContext, useState, useContext } from "react";
import api from "../../services/api";
import * as React from "react";

export interface IEventContext {

}

const EventContext = createContext<IEventContext>({} as IEventContext);

export const EventProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  

  return (
    <EventContext.Provider
      value={{
  
      }}
    >
      {children}
    </EventContext.Provider>
  );
};

export const useEvent = () => useContext(EventContext);
