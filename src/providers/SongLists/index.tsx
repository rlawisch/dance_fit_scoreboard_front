import React, { createContext, useContext } from "react";

export interface ISongListContext {}

const SongListContext = createContext<ISongListContext>({} as ISongListContext);

export const SongListProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <SongListContext.Provider value={{}}>{children}</SongListContext.Provider>
  );
};

export const useSongList = () => useContext(SongListContext);
