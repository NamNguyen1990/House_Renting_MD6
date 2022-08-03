import {House} from "./house";
import {User} from "./user";

export interface Orderr {
  id?: String;
  house: House;
  customer: User;
  startTime?: String;
  endTime?: String;
  total?: String;
  status?:String;
}
