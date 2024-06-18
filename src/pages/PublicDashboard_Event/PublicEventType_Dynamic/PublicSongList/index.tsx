import React, { FunctionComponent, useEffect, useState } from "react";
import { useSongList } from "../../../../providers/SongLists";
import { useParams } from "react-router-dom";
import { useEvents } from "../../../../providers/Events";
import {
  MusicLevelMiniature,
  MusicListDataWrapper,
  MusicWrapper,
  Table,
} from "../../../../styles/global";
import { IMusic } from "../../../../types/entity-types";
import { stringShortener } from "../../../../utils/stringShortener";

interface PublicSongListProps {}

const PublicSongList: FunctionComponent<PublicSongListProps> = () => {
  const { event_id } = useParams();

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const {
    songListData,
    getSongListData,
    setSongListData,
    songListRefreshTrigger,
  } = useSongList();

  const { getEventData, eventData } = useEvents();

  useEffect(() => {
    getEventData(Number(event_id));
  }, []);

  useEffect(() => {
    getSongListData(Number(eventData?.song_list?.song_list_id));
  }, [eventData]);

  useEffect(() => {
    getSongListData(Number(eventData?.song_list?.song_list_id));
  }, [songListRefreshTrigger]);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);

      setSongListData(undefined);
    };

    return () => {};
  }, []);

  // Group musics by mode
  const groupedMusics: { [mode: string]: IMusic[] } = {};
  songListData?.musics.forEach((music) => {
    if (!groupedMusics[music.mode]) {
      groupedMusics[music.mode] = [];
    }
    groupedMusics[music.mode].push(music);
  });

  // Sort each group by level
  Object.keys(groupedMusics).forEach((mode) => {
    groupedMusics[mode].sort((a, b) => a.level - b.level);
  });

  return (
    <>
      <Table>
        {Object.keys(groupedMusics).map((mode) => (
          <React.Fragment key={mode}>
            <thead>
              <th>{mode.charAt(0).toUpperCase() + mode.slice(1)}s</th>
            </thead>
            <tbody>
              {groupedMusics[mode].map((music) => (
                <tr key={music.music_id}>
                  <td>
                    <MusicListDataWrapper>
                      <MusicWrapper>
                        <MusicLevelMiniature
                          src={`/static/musics/${music.mode}/${music.mode.charAt(0).toUpperCase()}${music.level
                            .toString()
                            .padStart(2, "0")}.png`}
                        />
                        <p>{stringShortener(windowWidth, music.name)}</p>
                      </MusicWrapper>
                    </MusicListDataWrapper>
                  </td>
                </tr>
              ))}
            </tbody>
          </React.Fragment>
        ))}
      </Table>
    </>
  );
};

export default PublicSongList;
