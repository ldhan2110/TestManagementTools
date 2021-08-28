export interface IMilestone{
    _id: string;
    milestone_id: string;
    milestonetitle: string;
    description: string;
    is_completed: boolean;
    project: string;
    start_date?: Date | Number;
    end_date?: Date | Number;
    created_date?: Date | Number;
    updated_date?: Date | Number;
    created_user: string;
    updated_user: string;
  }