import { IProject } from "@modules/project";

export default interface IUser {
    _id: string;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    avatar: string;
    members: IProject[];
    date: Date;
  }