export interface ILogin {
  nickname: string;
  password: string;
}

export interface ISignup {
  nickname: string;
  password: string;
  confirmPassword: string;
}

export interface IProfilePicFormData {
  file: FileList;
}

export interface IEventCreate {
  name: string;
  event_type_id: number
}

export interface IUpdateEventFormData {
  name: string;
}

export interface ICategoryCreate {
  name: string;
  level_min: number;
  level_max: number;
  number_of_phases: number;
}

export interface ICategoryUpdate {
  name?: string;
  level_min?: number;
  level_max?: number;
  number_of_phases?: number;
}

export interface IPhaseFormCreate {
  phase_number: number;
  music_number: number;
  modes_available: string;
  passing_players: number;
}

export interface IPhaseRealCreate {
  phase_number: number;
  music_number: number;
  modes_available: string[];
  passing_players: number;
  category_id: number;
}

export interface IPhaseFormUpdate {
  music_number?: number;
  modes_available?: string;
  passing_players?: number;
}

export interface IPhaseRealUpdate {
  music_number?: number;
  modes_available?: string[] | string;
  passing_players?: number;
}

export interface IMusicCreate {
  name: string;
  level: number;
  mode: string;
}

export interface IMusicUpdate {
  name?: string;
  level?: number;
  mode?: string;
}

export interface IComfortLevelFormCreate {
  level_single: number
  level_double: number
}

export interface IComfortLevelCreate {
  level_single: number
  level_double: number
  player_id: number
  event_id: number
}

export interface IComfortLevelFormUpdate {
  level_single?: number
  level_double?: number
}

export interface IScoreFormCreate {
  perfect: number;
  great: number;
  good: number;
  bad: number;
  miss: number;
  max_combo: number;
  stage_pass: boolean
}

export interface IScoreCreate {
  value: number;
  perfect: number;
  great: number;
  good: number;
  bad: number;
  miss: number;
  max_combo: number;
  grade: string;
  plate?: string | null;
  event_id: number;
  category_id?: number;
  phase_id?: number;
  music_id: number;
}

export interface IScoreCreateByAdmin {
  value: number;
  perfect: number;
  great: number;
  good: number;
  bad: number;
  miss: number;
  max_combo: number;
  grade: string;
  plate?: string | null;
  event_id: number;
  category_id: number;
  phase_id: number;
  music_id: number;
  player_id: number;
}

export interface IScoreUpdate {
  value?: number;
  perfect?: number;
  great?: number;
  good?: number;
  bad?: number;
  miss?: number;
  max_combo?: number;
  grade?: string;
  plate?: string | null;
}
