import React,{createContext, useState} from 'react';
import auth from '@react-native-firebase/auth';


export const AuthContext = createContext({});

export const AuthProvider = ({children}) => {

    
    return(
        <AuthContext.Provider
            value={{
                config:'config'
            }}
            >
                {children}
            </AuthContext.Provider>
    )
};