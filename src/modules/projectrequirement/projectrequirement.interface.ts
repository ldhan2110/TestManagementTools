export interface IProjectRequirement {
    _id: string;
    name: string;
    description: string;
    scope: string;
    type: string;
    created_date?: Date | Number;
    updated_date?: Date | Number;
    created_user: string;
    updated_user: string;
  }