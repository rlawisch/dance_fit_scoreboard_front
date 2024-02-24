import { createContext, useState, useContext } from "react";
import api from "../../services/api";
import * as React from "react";
import { toast } from "react-toastify";
import { usePlayer } from "../Players";
import { IPlayer } from "../../types/entity-types";

export interface IEventsContext {
  events: IEvent[];
  createEvent: (formData: IEventsCreate) => void;
  getEvents: () => void;
  joinEvent: (event_id: number | undefined) => void;
}

export interface IEventsCreate {
  name: string;
  status: boolean;
}

export interface IEvent {
  event_id: string;
  name: string;
  status: boolean;
  players: IPlayer[];
}

const EventsContext = createContext<IEventsContext>({} as IEventsContext);

export const EventsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Player States
  const { accToken, hasValidSession } = usePlayer();

  // Event States
  const [events, setEvents] = useState([]);

  // CreateEvent (admin only)
  const createEvent = (formData: IEventsCreate) => {
    hasValidSession();

    api
      .post("/events", formData, {
        headers: {
          Authorization: `Bearer ${accToken}`,
        },
      })
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
    hasValidSession();

    api
      .get("/events", {
        headers: {
          Authorization: `Bearer ${accToken}`,
        },
      })
      .then((res) => {
        setEvents(res.data);
      })
      .catch((err) => {
        toast.error("Erro ao carregar Eventos");
        console.log(err);
      });
  };

  // Join Event (logged in player)
  const joinEvent = (event_id: number | undefined) => {
    hasValidSession();

    api
      .patch(`/events/${event_id}/join`, null, {
        headers: {
          Authorization: `Bearer ${accToken}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        toast.success("Voce agora faz parte do Evento:");
      })
      .catch((err: any) => {
        console.log(err);

        if (err.response.data.message === "Player already assigned to this event") {
          toast.error("Você já faz parte deste evento");
        }
      });
  };

  // Update Events (admin only)

  // Delete Event (admin only)

  return (
    <EventsContext.Provider
      value={{
        events,
        createEvent,
        getEvents,
        joinEvent,
      }}
    >
      {children}
    </EventsContext.Provider>
  );
};

export const useEvents = () => useContext(EventsContext);
