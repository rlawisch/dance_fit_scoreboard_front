
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
  name: string
}