export interface IPlayer {
  player_id: string;
  nickname: string;
  password: string;
  profilePicture?: string;
  role: string;
}

export interface ISession {
  session_id: string;
  token: string;
  player_id: number;
}

export interface IMusic {
  music_id: string;
  name: string;
  level: number;
  mode: string;
  scores?: IScore[];
  phases?: IPhase[];
}

export interface IEvent {
  event_id: string;
  name: string;
  status: boolean;
  event_type: IEventType
  categories?: ICategory[];
  players?: IPlayer[];
  scores?: IScore[];
  song_list?: ISongList
}

export interface IEventType {
  event_type_id: number
  name: string
  events: Event[]
}

export interface ICategory {
  category_id: string;
  name: string;
  level_min: number;
  level_max: number;
  number_of_phases: number;
  event: IEvent;
  players?: IPlayer[];
  phases?: IPhase[];
  scores?: IScore[];
}

export interface IPhase {
  phase_id: string;
  phase_number: number;
  music_number: number;
  modes_available: string[];
  passing_players: number;
  category: ICategory;
  musics?: IMusic[];
  scores?: IScore[];
}

export interface IComfortLevel {
  comfort_level_id: number
  level_single: number 
  level_double: number
  player: IPlayer
  event: IEvent
}

export interface ISongList {
  song_list_id: number
  event: IEvent
  musics: IMusic[]
}

export interface IScore {
  score_id: string;
  perfect: number;
  great: number;
  good: number;
  bad: number;
  miss: number;
  max_combo: number;
  stage_pass: boolean;
  value: number;
  grade: string;
  plate: string;
  validated: boolean;
  created_at: Date;
  player: IPlayer;
  event: IEvent;
  category: ICategory;
  music: IMusic;
  phase: IPhase;
}
