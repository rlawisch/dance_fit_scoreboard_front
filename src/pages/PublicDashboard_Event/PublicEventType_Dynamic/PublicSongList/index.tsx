import React, { FunctionComponent, useEffect } from "react";
import { useSongList } from "../../../../providers/SongLists";
import { useParams } from "react-router-dom";
import { useEvents } from "../../../../providers/Events";
import {
  MusicLevelMiniature,
  MusicWrapper,
  Table,
  TableHeaderWrapper,
} from "../../../../styles/global";
import { IMusic } from "../../../../types/entity-types";


interface PublicSongListProps {}

const PublicSongList: FunctionComponent<PublicSongListProps> = () => {
  const { event_id } = useParams();

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
    getSongListData(Number(eventData?.song_list?.song_list_id))
  }, [eventData])

  useEffect(() => {
    getSongListData(Number(eventData?.song_list?.song_list_id))
  }, [songListRefreshTrigger])

  useEffect(() => {
    return () => {
      setSongListData(undefined)
    }
  }, [])

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
        <tbody>
          {Object.keys(groupedMusics).map((mode) => (
            <React.Fragment key={mode}>
              <tr>
                <th colSpan={2}>
                  {mode.charAt(0).toUpperCase() + mode.slice(1)}s
                </th>
              </tr>
              {groupedMusics[mode].map((music) => (
                <tr key={music.music_id}>
                  <td>
                    <TableHeaderWrapper>
                      <MusicWrapper>
                        <MusicLevelMiniature
                          src={`/static/musics/${music.mode}/${music.mode.charAt(0).toUpperCase()}${music.level
                            .toString()
                            .padStart(2, "0")}.png`}
                        />
                        {music.name}
                      </MusicWrapper>
                    </TableHeaderWrapper>
                  </td>
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default PublicSongList;
