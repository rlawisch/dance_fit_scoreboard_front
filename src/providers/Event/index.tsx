import { createContext, useState, useContext } from "react";
import api from "../../services/api";
import * as React from "react";
import { usePlayer } from "../Players";
import { IEvent } from "../../types/entity-types";
import { IUpdateEventFormData } from "../../types/form-types";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export interface IEventContext {
  getEventData: (event_id: number) => void;
  eventData: IEvent | undefined;
  updateEventData: (event_id: number, formData: IUpdateEventFormData) => void;
}

const EventContext = createContext<IEventContext>({} as IEventContext);

export const EventProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const navigate = useNavigate();

  const { accToken, hasValidSession, hasAdminRights } = usePlayer();

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

  const updateEventData = (
    event_id: number,
    formData: IUpdateEventFormData,
  ) => {
    hasAdminRights();

    api
      .patch(`/events/${event_id}`, formData, {
        headers: {
          Authorization: `Bearer ${accToken}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          toast.success("Informações do evento atualizadas com sucesso");
          navigate("/admin/events");
        } else {
          toast.error("Algo deu errado");
        }
      })
      .catch((err: any) => {
        toast.error("Algo deu errado");
        console.log(err);
      });
  };

  return (
    <EventContext.Provider
      value={{
        getEventData,
        eventData,
        updateEventData,
      }}
    >
      {children}
    </EventContext.Provider>
  );
};

export const useEvent = () => useContext(EventContext);
