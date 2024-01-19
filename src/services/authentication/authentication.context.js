import React, { createContext, useState } from "react";
import { FIREBASE_AUTH } from "../../config/firebase";
import { emailVerified, onAuthStateChanged, signOut } from "firebase/auth";
import { loginRequest, registerRequest } from "./authentication.service";

const auth = FIREBASE_AUTH;

export const AuthenticationContext = createContext();

export const AuthenticationContextProvider = ({children}) => {
    
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    onAuthStateChanged(auth, (usr) => {
        if(usr) {
            setUser(usr);
            setIsLoading(false);
        } else {
            setIsLoading(false);
        }
    })

    const onLogin = (email, password) => {

        loginRequest(email, password).then((u) => {
            setUser(u);
            setIsLoading(false);
        }).catch((e) => {
            setIsLoading(false);
            setError(e.toString());
        });
    };

    //student
    const onRegisterStudent = async (email,password, repeatedPassword) => {
        setIsLoading(true);
        if (password !== repeatedPassword) {
            setError("Error: Passwords do not match");
            return;
        }
    
        registerRequest(email, password).then(async (u) => {
            // Update the user's display name and photo URL     
           
    
            setUser(u);
            setIsLoading(false);
        }).catch((e) => {
            setIsLoading(false);
            setError(e.toString());
        });
    };

    //vendor
    const onRegisterVendor = async (email,password, repeatedPassword) => {
        setIsLoading(true);
        if (password !== repeatedPassword) {
            setError("Error: Passwords do not match");
            return;
        }
    
        registerRequest(email, password).then(async (u) => {
    
            setUser(u);
            setIsLoading(false);
        }).catch((e) => {
            setIsLoading(false);
            setError(e.toString());
        });
    };

    //volunteer
    const onRegisterVolunteer = async (email, password, repeatedPassword) => {
        setIsLoading(true);
        if (password !== repeatedPassword) {
            setError("Error: Passwords do not match");
            return;
        }
    
        registerRequest(email, password).then(async (u) => {

            if (user.emailVerified) {
                setUser(user);
                setIsLoading(false);
              } else {
                // Handle unverified email (e.g., display a message or redirect)
                console.log("User's email is not verified yet.");
                // ... your logic for handling unverified email
              }
        }).catch((e) => {
            setIsLoading(false);
            setError(e.toString());
        });
    };

    

    const onLogout = () => {
        signOut(auth).then(() => {
            setUser(null);
            console.log("Logout");
        }).catch((error) => {
            console.log(error);
            throw error;
        });
    };

    return (
        <AuthenticationContext.Provider
            value={{
                isAuthenticated:!!user,
                user,
                isLoading,
                error,
                onLogin,
                onRegisterStudent,
                onRegisterVolunteer,
                onRegisterVendor,
                onLogout,
            }}
        >
            {children}
        </AuthenticationContext.Provider>
    )
}