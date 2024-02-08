import { createContext, useState, useContext, useEffect } from "react";
import api from "../../services/api";
import * as React from "react";
import { toast } from "react-toastify";
import { IPlayer, usePlayer } from "../Players";

export interface IEventContext {
  events: IEvent[];
  createEvent: (formData: IEventCreate) => void;
  getEvents: () => void;
}

export interface IEventCreate {
  name: string;
  status: boolean;
}

export interface IEvent {
  event_id: string;
  name: string;
  status: boolean;
  players: IPlayer[];
}

const EventContext = createContext<IEventContext>({} as IEventContext);

export const EventProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Player States
  const { accToken } = usePlayer();

  // Event States
  const [events, setEvents] = useState([]);

  // CreateEvent (admin only)
  const createEvent = (formData: IEventCreate) => {
    api
      .post("/events", formData)
      .then(() => {
        toast.success("Evento criado com sucesso");
      })
      .catch((err) => {
        toast.error("Algo deu errado");
        console.log(err);
      });
  };

  // Find All Events (logged in player)
  const getEvents = () => {
    api
      .get("/events")
      .then((res) => {
        setEvents(res.data);
      })
      .catch((err) => {
        toast.error("Erro ao carregar Eventos");
        console.log(err);
      });
  };

  // on Log in:
  // fetch Events to be available for rendering in dashboard/events
  useEffect(() => {
    if (accToken !== "") {
      getEvents();
    }
  }, [accToken]);

  // Join Event (logged in player)

  // Update Events (admin only)

  // Delete Event (admin only)

  return (
    <EventContext.Provider
      value={{
        events,
        createEvent,
        getEvents,
      }}
    >
      {children}
    </EventContext.Provider>
  );
};

export const useEvent = () => useContext(EventContext);
