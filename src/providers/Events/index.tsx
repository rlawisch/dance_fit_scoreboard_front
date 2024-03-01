import { createContext, useState, useContext } from "react";
import api from "../../services/api";
import * as React from "react";
import { toast } from "react-toastify";
import { usePlayer } from "../Players";
import { IEvent } from "../../types/entity-types";
import { IEventCreate } from "../../types/form-types";

export interface IEventsContext {
  events: IEvent[];
  createEvent: (formData: IEventCreate) => void;
  getEvents: () => void;
  joinEvent: (event_id: number) => void;
  deleteEvent: (event_id: number) => void;
}

const EventsContext = createContext<IEventsContext>({} as IEventsContext);

export const EventsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {

  const { accToken, hasValidSession, hasAdminRights } =
    usePlayer();

  const [events, setEvents] = useState([]);

  const createEvent = async (formData: IEventCreate) => {
    try {
      hasAdminRights();
      const res = await api.post(
        "/events",
        { ...formData, status: true },
        {
          headers: {
            Authorization: `Bearer ${accToken}`,
          },
        }
      );

      if (res.status === 201) {
        toast.success("Evento criado com sucesso");
      }
    } catch (err) {
      toast.error("Algo deu errado");
      console.log(err);
    }
  };

  const getEvents = async () => {
    try {
      hasValidSession();
      const res = await api.get("/events", {
        headers: {
          Authorization: `Bearer ${accToken}`,
        },
      });
      setEvents(res.data);
    } catch (err) {
      toast.error("Erro ao carregar Eventos");
      console.log(err);
    }
  };

  const joinEvent = async (event_id: number) => {
    try {
      hasValidSession();
      const res = await api.patch(`/events/${event_id}/join`, null, {
        headers: {
          Authorization: `Bearer ${accToken}`,
        },
      });

      if (res.status === 200) {
        toast.success("Você agora faz parte do Evento:");
      }
    } catch (err: any) {
      console.log(err);

      if (
        err.response.data.message === "Player already assigned to this event"
      ) {
        toast.error("Você já faz parte deste evento");
      }
    }
  };

  const deleteEvent = async (event_id: number) => {
    try {
      hasAdminRights();
      const res = await api.delete(`/events/${event_id}`, {
        headers: {
          Authorization: `Bearer ${accToken}`,
        },
      });

      if (res.status === 200) {
        toast.success("Evento deletado com sucesso");
      }
    } catch (err: any) {
      console.log(err);
      if (err.response?.data?.message === "Internal server error") {
        toast.error("Algo deu errado");
      }
    }
  };

  return (
    <EventsContext.Provider
      value={{
        events,
        createEvent,
        getEvents,
        joinEvent,
        deleteEvent,
      }}
    >
      {children}
    </EventsContext.Provider>
  );
};

export const useEvents = () => useContext(EventsContext);
