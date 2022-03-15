import React from "react";

interface AuthContextIf {
  state?: {
    errorMsg: string,
    isLoading: boolean,
    isSignout: boolean,
    userToken: string
  },
  authContext?: {
    signIn: (credentials: {    username: string;    password: string;}) => Promise<void>,
    signOut: () => void,
    signUp: (data: any) => Promise<void>
  }, 
}

export const AuthContext = React.createContext<AuthContextIf>({});