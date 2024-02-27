import { createContext, useState, useContext } from "react";
import api from "../../services/api";
import * as React from "react";
import { toast } from "react-toastify";
import { usePlayer } from "../Players";
import { IEvent } from "../../types/entity-types";
import { IEventCreate } from "../../types/form-types";
import { useNavigate } from "react-router-dom";

export interface IEventsContext {
  events: IEvent[];
  createEvent: (formData: IEventCreate) => void;
  getEvents: () => void;
  joinEvent: (event_id: number | undefined) => void;
  deleteEvent: (event_id: number) => void
}

const EventsContext = createContext<IEventsContext>({} as IEventsContext);

export const EventsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {

  const navigate = useNavigate()

  // Player States
  const { accToken, hasValidSession, hasAdminRights } = usePlayer();

  // Event States
  const [events, setEvents] = useState([]);

  // CreateEvent (admin only)
  const createEvent = (formData: IEventCreate) => {
    hasAdminRights();

    api
      .post(
        "/events",
        { ...formData, status: true },
        {
          headers: {
            Authorization: `Bearer ${accToken}`,
          },
        }
      )
      .then((res) => {
        if (res.status === 201) {
          toast.success("Evento criado com sucesso");
          navigate('/admin/events')
          
        } 
      })
      .catch((err) => {
        toast.error("Algo deu errado");
        navigate('/admin/events')

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

        if (
          err.response.data.message === "Player already assigned to this event"
        ) {
          toast.error("Você já faz parte deste evento");
        }
      });
  };

  const deleteEvent = (event_id: number) => {
    hasAdminRights();

    api
      .delete(`/events/${event_id}`, {
        headers: {
          Authorization: `Bearer ${accToken}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          toast.success("Evento deletado com sucesso");
          navigate("/admin/events");
        }
      })
      .catch((err: any) => {
        console.log(err);
        if (err.response.data.message === "Internal server error") {
          toast.error("Algo deu errado");
          navigate("/admin/events");
        }
        navigate("/admin/events");
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
        deleteEvent,
      }}
    >
      {children}
    </EventsContext.Provider>
  );
};

export const useEvents = () => useContext(EventsContext);
