export interface IPlayer {
  player_id: number;
  nickname: string;
  password: string;
  role: string;
}

export interface ISession {
  session_id: number;
  token: string;
  player_id: number;
}

export interface IMusic {
  music_id: number;
  name: string;
  level: number;
  mode: string;
  scores?: IScore[]
  phases?: IPhase[]
}

export interface IEvent {
  event_id: number
  name: string;
  status: boolean;
  categories: ICategory[];
  players: IPlayer[];
  scores: IScore[]
}

export interface ICategory {
  category_id: number;
  name: string;
  level_min: number;
  level_max: number;
  number_of_phases: number;
  event: IEvent;
  players?: IPlayer[]
  phases?: IPhase[]
  scores?: IScore[]
}

export interface IPhase {
  phase_id: number;
  phase_number: number;
  music_number: number;
  modes_available: string[];
  passing_players: number;
  category: ICategory;
  musics?: IMusic[];
}

export interface IScore {
  score_id: number;
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
