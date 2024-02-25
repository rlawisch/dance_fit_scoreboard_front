export interface IEventCreate {
  name: string;
  status: boolean;
}

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

export interface IUpdateEventFormData {
  name: string;
}

export interface ICategoryCreate {
  name: string;
  level_min: number;
  level_max: number;
  number_of_phases: number;
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
  music_number?: number
  modes_available?: string 
  passing_players?: number 
}

export interface IPhaseRealUpdate {
  music_number?: number 
  modes_available?: string[] 
  passing_players?: number 
}

export interface IMusicCreate {
  name: string,
  level: number,
  mode: string
}