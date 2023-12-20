import React, { createContext, useState } from "react";
import { FIREBASE_AUTH } from "../../config/firebase";
import { onAuthStateChanged, signOut, updateProfile } from "firebase/auth";
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
    const onRegisterStudent = async (name, email, college, password, repeatedPassword) => {
        setIsLoading(true);
        if (password !== repeatedPassword) {
            setError("Error: Passwords do not match");
            return;
        }
    
        registerRequest(email, password).then(async (u) => {
            // Update the user's display name and photo URL
            await updateProfile(u, {
                displayName: name,
                displayCollege: college
            });
    
            setUser(u);
            setIsLoading(false);
        }).catch((e) => {
            setIsLoading(false);
            setError(e.toString());
        });
    };

    //vendor
    const onRegisterVendor = async (vendorName, email, phoneNumber, brn,password, repeatedPassword) => {
        setIsLoading(true);
        if (password !== repeatedPassword) {
            setError("Error: Passwords do not match");
            return;
        }
    
        registerRequest(email, password).then(async (u) => {
            // Update the user's display name and photo URL
            await updateProfile(u, {
                displayName: vendorName,
                displayPhoneNumber: phoneNumber,
                displayBrn: brn
            });
    
            setUser(u);
            setIsLoading(false);
        }).catch((e) => {
            setIsLoading(false);
            setError(e.toString());
        });
    };

    //volunteer
    const onRegisterVolunteer = async (volunteerName, email, phoneNumber, password, repeatedPassword) => {
        setIsLoading(true);
        if (password !== repeatedPassword) {
            setError("Error: Passwords do not match");
            return;
        }
    
        registerRequest(email, password).then(async (u) => {
            // Update the user's display name and photo URL
            await updateProfile(u, {
                displayName: volunteerName,
                displayPhoneNumber: phoneNumber,
            });
    
            setUser(u);
            setIsLoading(false);
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