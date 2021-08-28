export interface INotification{
    _id: string;
    description: string;
    is_read: boolean;
    url: string;
    user: string;
    created_date?: Date | Number;
    updated_date?: Date | Number;
  }