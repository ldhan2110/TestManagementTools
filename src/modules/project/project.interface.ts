export default interface IProject {
    _id: string;
    description: string;
    color: string;
    active: boolean;
    option_reqs: string;
    option_priority: string;
    options: string;
    prefix: string;
    tc_counter: number;
    is_public: boolean;
    create_date: Date;
    update_date: Date;
    create_user: string;
    update_userid: string;
  }