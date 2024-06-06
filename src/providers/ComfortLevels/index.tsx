import React, { createContext, useContext, useState } from "react";
import { usePlayer } from "../Players";
import { IComfortLevelCreate } from "../../types/form-types";
import api from "../../services/api";
import { toast } from "react-toastify";
import { IComfortLevel } from "../../types/entity-types";

export interface IComfortLevelContext {
  comfortLevels: IComfortLevel[];
  eventPlayerComfortLevel: IComfortLevel | undefined;
  createComfortLevel: (comfortlevelInput: IComfortLevelCreate) => void;
  getComfortLevels: () => void;
  getEventPlayerComfortLevel: (event_id: number) => void
}

const ComfortLevelContext = createContext<IComfortLevelContext>(
  {} as IComfortLevelContext
);

export const ComfortLevelProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { accToken } = usePlayer();

  const [comfortLevels, setComfortLevels] = useState<IComfortLevel[]>([]);

  const [eventPlayerComfortLevel, setEventPlayerComfortLevel] = useState<IComfortLevel>()

  const createComfortLevel = async (
    comfortLevelInput: IComfortLevelCreate
  ) => {
    try {
      const res = await api.post(
        `/comfort-levels`,
        { ...comfortLevelInput },
        {
          headers: {
            Authorization: `Bearer ${accToken}`,
          },
        }
      );

      if (res.status === 201) {
        toast.success("Nível de Conforto criado com sucesso");
      }
    } catch (err: any) {
      console.log(err);
    }
  };

  const getComfortLevels = async () => {
    try {
      const res = await api.get(`/comfort-levels`);

      setComfortLevels(res.data);
    } catch (err: any) {
      console.log(err);
    }
  };

  const getEventPlayerComfortLevel = async (event_id: number) => {
    try {
      const res = await api.get(`/comfort-levels/events/${event_id}`, {
        headers: {
          Authorization: `Bearer ${accToken}`
        }
      })

      if (res.status === 200) {
        setEventPlayerComfortLevel(res.data)
      }

    } catch (err: any) {
      console.log(err)
    }
  }

  return (
    <ComfortLevelContext.Provider
      value={{
        comfortLevels,
        eventPlayerComfortLevel,
        createComfortLevel,
        getComfortLevels,
        getEventPlayerComfortLevel,
      }}
    >
      {children}
    </ComfortLevelContext.Provider>
  );
};

export const useComfortLevel = () => useContext(ComfortLevelContext);
