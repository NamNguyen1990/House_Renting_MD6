import {House} from "./house";
import {User} from "./user";

export interface Message {
  id: string,
  house: House,
  user: User,
  content: string,
}
