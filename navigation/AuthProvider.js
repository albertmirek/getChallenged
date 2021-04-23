import React,{createContext, useState} from 'react';
import auth from '@react-native-firebase/auth';


export const AuthContext = createContext({});

export const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null);
    const [error, setError] = useState('');

    return(
        <AuthContext.Provider
            value={{
                user,
                setUser,
                error,
                setError,
                login: async (email,password) =>{
                    try{
                        await auth().signInWithEmailAndPassword(email,password);
                        console.log(email);
                    }catch(e){
                        console.log(e);
                        setError(e);
                    }
                },
                register: async (email,password) => {
                    try{
                        await auth().createUserWithEmailAndPassword(email, password);
                    }catch(e){
                        setError(e);
                        console.log(e);
                    }
                },
                logout: async () => {
                    try{
                        await auth().signOut();
                    }catch(e){
                        console.log(e);
                        setError(e);
                    }
                }
            }}
            >
                {children}
            </AuthContext.Provider>
    )
};