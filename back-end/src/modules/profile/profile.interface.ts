export interface IProfile {
  _id: string;
  user: string;
  fullname: string;
  email: string;
  introduction: string;
  phonenumber: string;
  created_date?: Date | Number;
  updated_date?: Date | Number;
  created_user: string;
  updated_userid: string;
}