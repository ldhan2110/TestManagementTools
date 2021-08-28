  export interface DataStoredInToken {
    id: string;
  }
  
  export interface TokenData {
    token: string;
    refreshToken: string;
  }

  export interface LoginData {
    token: string;
    refreshtoken: string;
    fullname: string;
    username: string;
  }