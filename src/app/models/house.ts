import {Category} from "./category";
import {User} from "./user";

export interface House {
id?: String;
name?:String;
category :Category;
address?: String;
bedroom?:String;
bathroom?:String;
description?:String;
price?:String;
owner:User;
status?:String;

}
