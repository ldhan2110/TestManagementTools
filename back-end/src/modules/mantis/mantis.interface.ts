export interface IMantis {
  _id: string;
  mantisname: string;
  project: string;
  project_id_mantis: string;
  url: string;
  members: IMemberMantis[];
  categories: ICategory[];
  created_date?: Date | Number;
  updated_date?: Date | Number;
  created_user: string;
  updated_userid: string;

}

export interface IMemberMantis {
  _id: string;
  username_mantis: string;
  usermantis_id: string;
  username: string;
  email: string;
  role_mantis: string;
  is_active_backend: boolean;
  token_mantis: string;
  enable_mantis: boolean;
  protected_mantis: boolean;
  url: string;
  created_date?: Date | Number; 
}

export interface ICategory {
  categoryname: string;
  created_date?: Date | Number; 
}

export interface IListProjectMantis {
  project_mantis_id: string;
  project_mantis_name: string; 
}

export interface IIssue {
  summary: string,
  description: string,
  category: string,
  reporter: string
}

export interface IFile {
  name: string;
  content: string;
}