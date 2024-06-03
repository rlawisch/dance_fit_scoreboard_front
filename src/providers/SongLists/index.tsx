import React, { createContext, useContext, useState } from "react";
import api from "../../services/api";
import { usePlayer } from "../Players";
import { toast } from "react-toastify";
import { ISongList } from "../../types/entity-types";

export interface ISongListContext {
  songListData: ISongList | undefined;
  songListRefreshTrigger: boolean;
  createSongList: (event_id: number) => void;
  getSongListData: (song_list_id: number) => void;
  addSongToList: (song_list_id: number, music_id: number) => void;
  removeSongFromList: (song_list_id: number, music_id: number) => void;
}

const SongListContext = createContext<ISongListContext>({} as ISongListContext);

export const SongListProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { accToken } = usePlayer();

  const [songListData, setSongListData] = useState<ISongList>();

  const [songListRefreshTrigger, setSongListRefreshTrigger] =
    useState<boolean>(true);

  const createSongList = async (event_id: number) => {
    try {
      const res = await api.post(
        "/song-lists",
        { event_id: event_id },
        {
          headers: {
            Authorization: `Bearer ${accToken}`,
          },
        }
      );

      if (res.status === 201) {
        toast.success("Lista de Músicas criada com sucesso");
        setSongListRefreshTrigger(!songListRefreshTrigger);
      }
    } catch (err: any) {
      console.log(err);

      if (err.response.data.message === 'Event already has a song list') {
        toast.error("O Evento já possui uma lista de músicas")
      }
    }
  };

  const getSongListData = async (song_list_id: number) => {
    try {
      const res = await api.get(`/song-lists/${song_list_id}`);
      setSongListData(res.data);
    } catch (err: any) {
      console.log(err);
    }
  };

  const addSongToList = async (song_list_id: number, music_id: number) => {
    try {
      const res = await api.patch(
        `/song-lists/${song_list_id}/add-song`,
        {
          music_id: music_id,
        },
        {
          headers: {
            Authorization: `Bearer ${accToken}`,
          },
        }
      );

      if (res.status === 200) {
        toast.success("Música adicionada com sucesso");
        setSongListRefreshTrigger(!songListRefreshTrigger)
      }
    } catch (err: any) {
      console.log(err);

      if (
        err.response.data.message ===
        "Music is already assigned to this song list"
      ) {
        toast.error("Esta Música já foi adicionada à lista");
      }

      if (
        err.response.data.message ===
        "A music with the same mode and level was already assigned to this song list"
      ) {
        toast.error(
          "Uma música com o mesmo nível e modo já foi adicionada à lista"
        );
      }
    }
  };

  const removeSongFromList = async (song_list_id: number, music_id: number) => {
    try {
      const res = await api.patch(
        `/song-lists/${song_list_id}/remove-song`,
        { music_id: music_id },
        {
          headers: {
            Authorization: `Bearer ${accToken}`,
          },
        }
      );

      if (res.status === 200) {
        toast.success("Música removida da lista com sucesso")
        setSongListRefreshTrigger(!songListRefreshTrigger)
      }
    } catch (err: any) {
      console.log(err);
    }
  };

  return (
    <SongListContext.Provider
      value={{
        songListData,
        songListRefreshTrigger,
        createSongList,
        getSongListData,
        addSongToList,
        removeSongFromList,
      }}
    >
      {children}
    </SongListContext.Provider>
  );
};

export const useSongList = () => useContext(SongListContext);
