import { UserModel } from "./user_model";

export interface FanModel {
  current: number;
  numPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
  items: UserModel[];
}
