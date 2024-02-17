import { createContext, useState, useContext } from "react";
import api from "../../services/api";
import * as React from "react";
import { usePlayer } from "../Players";
import { IEvent } from "../../types";

export interface IEventContext {
  getEventData: (event_id: number) => void;
  eventData: IEvent | undefined;
}

const EventContext = createContext<IEventContext>({} as IEventContext);

export const EventProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { accToken, hasValidSession } = usePlayer();

  const [eventData, setEventData] = useState<IEvent>();

  const getEventData = (event_id: number) => {
    hasValidSession();

    api
      .get(`/events/${event_id}`, {
        headers: {
          Authorization: `Bearer ${accToken}`,
        },
      })
      .then((res) => {
        setEventData(res.data);
      })
      .catch((err: any) => {
        console.log(err);
      });
  };

  return (
    <EventContext.Provider
      value={{
        getEventData,
        eventData,
      }}
    >
      {children}
    </EventContext.Provider>
  );
};

export const useEvent = () => useContext(EventContext);
