import "jwt-decode";

declare module "jwt-decode" {
  export interface JwtPayload {
    nickname: string;
    player_id: string;
    role: string;
    iat: number;
    exp: number;
  }
}
