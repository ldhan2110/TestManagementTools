export interface IMilestone{
    _id: string;
    name: string;
    target_date?: Date | Number;
    start_date?: Date | Number;
    created_date?: Date | Number;
    updated_date?: Date | Number;
    created_user: string;
    updated_user: string;
  }