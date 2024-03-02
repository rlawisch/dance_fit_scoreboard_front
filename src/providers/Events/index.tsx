import { createContext, useState, useContext } from "react";
import api from "../../services/api";
import * as React from "react";
import { toast } from "react-toastify";
import { usePlayer } from "../Players";
import { IEvent } from "../../types/entity-types";
import { IEventCreate, IUpdateEventFormData } from "../../types/form-types";

export interface IEventsContext {
  events: IEvent[];
  eventData: IEvent | undefined;
  eventRefreshTrigger: boolean;
  setEventRefreshTrigger: (eventRefreshTrigger: boolean) => void
  createEvent: (formData: IEventCreate) => void;
  getEvents: () => void;
  getEventData: (event_id: number) => void;
  updateEventData: (event_id: number, formData: IUpdateEventFormData) => void;
  deleteEvent: (event_id: number) => void;
  joinEvent: (event_id: number) => void;
  leaveEvent: (event_id: number) => void;
  adminAddPlayer: (event_id: number, player_id: number) => void;
  adminRemovePlayer: (event_id: number, player_id: number) => void;
}

const EventsContext = createContext<IEventsContext>({} as IEventsContext);

export const EventsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { accToken, hasValidSession, hasAdminRights } = usePlayer();

  const [events, setEvents] = useState([]);

  const [eventData, setEventData] = useState<IEvent>();

  const [eventRefreshTrigger, setEventRefreshTrigger] = useState<boolean>(true);

  const getEventData = async (event_id: number) => {
    try {
      hasValidSession();
      const res = await api.get(`/events/${event_id}`, {
        headers: {
          Authorization: `Bearer ${accToken}`,
        },
      });
      setEventData(res.data);
    } catch (err: any) {
      console.log(err);
    }
  };

  const updateEventData = async (
    event_id: number,
    formData: IUpdateEventFormData
  ) => {
    try {
      hasAdminRights();
      const res = await api.patch(`/events/${event_id}`, formData, {
        headers: {
          Authorization: `Bearer ${accToken}`,
        },
      });
      if (res.status === 200) {
        toast.success("Informações do evento atualizadas com sucesso");
        setEventRefreshTrigger(!eventRefreshTrigger)
      }
    } catch (err: any) {
      toast.error("Algo deu errado");
      console.log(err);
    }
  };

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
        setEventRefreshTrigger(!eventRefreshTrigger)
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
        setEventRefreshTrigger(!eventRefreshTrigger)
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

  const leaveEvent = async (event_id: number) => {
    try {
      hasValidSession();
      const res = await api.patch(`/events/${event_id}/leave`, null, {
        headers: {
          Authorization: `Bearer ${accToken}`,
        },
      });

      if (res.status === 200) {
        toast.success("Você deixou o evento com sucesso");
        setEventRefreshTrigger(!eventRefreshTrigger)

      }
    } catch (err: any) {
      if (err.response.data.message === "Player not assigned to this event") {
        toast.error("Você não faz parte deste evento");
      }
    }
  };

  const adminAddPlayer = async (event_id: number, player_id: number) => {
    try {
      hasAdminRights();

      const res = await api.patch(
        `/events/${event_id}/admin/add_player`,
        {
          player_id: player_id,
        },
        {
          headers: {
            Authorization: `Bearer ${accToken}`,
          },
        }
      );

      if (res.status === 200) {
        toast.success("Jogador adicionado ao evento com sucesso");
        setEventRefreshTrigger(!eventRefreshTrigger)

      }
    } catch (err: any) {
      if (
        err.response.data.message === "Player already assigned to this event"
      ) {
        toast.error("Jogador já faz parte deste evento");
      }
    }
  };

  const adminRemovePlayer = async (event_id: number, player_id: number) => {
    try {
      hasAdminRights();

      const res = await api.patch(
        `/events/${event_id}/admin/remove_player`,
        {
          player_id: player_id,
        },
        {
          headers: {
            Authorization: `Bearer ${accToken}`,
          },
        }
      );

      if (res.status === 200) {
        toast.success("Jogador removido do evento com sucesso");
        setEventRefreshTrigger(!eventRefreshTrigger)

      }
    } catch (err: any) {
      if (err.response.data.message === "Player not assigned to this event") {
        toast.error("Jogador não faz parte deste evento");
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
        setEventRefreshTrigger(!eventRefreshTrigger)
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
        eventData,
        eventRefreshTrigger,
        setEventRefreshTrigger,
        createEvent,
        getEvents,
        getEventData,
        updateEventData,
        deleteEvent,
        joinEvent,
        leaveEvent,
        adminAddPlayer,
        adminRemovePlayer,
      }}
    >
      {children}
    </EventsContext.Provider>
  );
};

export const useEvents = () => useContext(EventsContext);
