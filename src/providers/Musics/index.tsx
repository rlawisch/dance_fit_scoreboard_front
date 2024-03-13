import { createContext, useState, useContext } from "react";
import api from "../../services/api";
import * as React from "react";
import { usePlayer } from "../Players";
import { toast } from "react-toastify";
import { IMusic } from "../../types/entity-types";
import { IMusicCreate, IMusicUpdate } from "../../types/form-types";

export interface IMusicsContext {
  musicsData: IMusic[] | undefined;
  musicRefreshTrigger: boolean;
  setMusicRefreshTrigger: (musicRefreshTrigger: boolean) => void;
  getMusicsData: () => void;
  createMusic: (formData: IMusicCreate) => void;
  updateMusic: (formData: IMusicUpdate, music_id: number) => void;
  deleteMusic: (music_id: number) => void;
}

const MusicsContext = createContext<IMusicsContext>({} as IMusicsContext);

export const MusicsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { accToken } = usePlayer();

  const [musicsData, setMusicsData] = useState<IMusic[]>();

  const [musicRefreshTrigger, setMusicRefreshTrigger] = useState<boolean>(true);

  const getMusicsData = async () => {
    try {
      const res = await api.get("/musics", {
        headers: {
          Authorization: `Bearer ${accToken}`,
        },
      });
      setMusicsData(res.data);
    } catch (err: any) {
      console.log(err);
    }
  };

  const createMusic = async (formData: IMusicCreate) => {
    try {
      const res = await api.post("/musics", formData, {
        headers: {
          Authorization: `Bearer ${accToken}`,
        },
      });
      if (res.status === 201) {
        toast.success("Música criada com sucesso");
        setMusicRefreshTrigger(!musicRefreshTrigger);
      }
    } catch (err: any) {
      if (
        err.response.data.message ===
        "Music with exact same data already exists"
      ) {
        toast.error("Música com os mesmos dados já existe no sistema");
      }
      console.log(err);
    }
  };

  const updateMusic = async (formData: IMusicUpdate, music_id: number) => {
    try {
      const res = await api.patch(`/musics/${music_id}`, formData, {
        headers: {
          Authorization: `Bearer ${accToken}`,
        },
      });
      if (res.status === 200) {
        toast.success("Informações da música atualizadas");
        setMusicRefreshTrigger(!musicRefreshTrigger);
      }
    } catch (err: any) {
      console.log(err);
      if (
        err.response.data.message === "Updating would result in duplicate music"
      ) {
        toast.error("A atualização resultaria em músicas duplicadas");
      } else if (err.response.data.message === "Internal server error") {
        toast.error("Algo deu errado");
      }
    }
  };

  const deleteMusic = async (music_id: number) => {
    try {
      const res = await api.delete(`musics/${music_id}`, {
        headers: {
          Authorization: `Bearer ${accToken}`,
        },
      });
      if (res.status === 200) {
        toast.success("Música deletada com sucesso");
        setMusicRefreshTrigger(!musicRefreshTrigger);
      }
    } catch (err: any) {
      console.log(err);
    }
  };

  return (
    <MusicsContext.Provider
      value={{
        musicsData,
        musicRefreshTrigger,
        setMusicRefreshTrigger,
        getMusicsData,
        createMusic,
        updateMusic,
        deleteMusic,
      }}
    >
      {children}
    </MusicsContext.Provider>
  );
};

export const useMusics = () => useContext(MusicsContext);
