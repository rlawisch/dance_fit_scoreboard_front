import { createContext, useState, useContext } from "react";
import api from "../../services/api";
import * as React from "react";
import { usePlayer } from "../Players";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { IMusic } from "../../types/entity-types";
import { IMusicCreate } from "../../types/form-types";

export interface IMusicsContext {
  musicsData: IMusic[] | undefined;
  getMusicsData: () => void
  createMusic: (formData: IMusicCreate) => void
}

const MusicsContext = createContext<IMusicsContext>({} as IMusicsContext);

export const MusicsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const navigate = useNavigate();

  const { accToken, hasValidSession, hasAdminRights } = usePlayer();

  const [musicsData, setMusicsData] = useState<IMusic[]>();

  const getMusicsData = () => {
    hasValidSession();

    api
      .get("/musics", {
        headers: {
          Authorization: `Bearer ${accToken}`,
        },
      })

      .then((res) => {
        setMusicsData(res.data);
      })
      .catch((err: any) => {
        console.log(err);
      });
  };

  // create music
  const createMusic = (formData: IMusicCreate) => {
    hasAdminRights() 

    api
      .post('/musics', formData, {
        headers: {
          Authorization: `Bearer ${accToken}`
        }
      })
      .then((res) => {

        if (res.status === 201) {
          toast.success('Música criada com sucesso')
        }
        navigate('/admin/musics')

      })
      .catch((err: any) => {

        if (err.response.data.message === 'Music with exact same data already exists') {
          toast.error('Música com os mesmos dados já existe no sistema')
        } 
        console.log(err)
        navigate('/admin/musics')

      })
  }

  // update music

  // delete music

  return (
    <MusicsContext.Provider
      value={{
        musicsData,
        getMusicsData,
        createMusic
      }}
    >
      {children}
    </MusicsContext.Provider>
  );
};

export const useMusics = () => useContext(MusicsContext);
