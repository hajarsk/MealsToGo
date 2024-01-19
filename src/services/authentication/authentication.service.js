import { FIREBASE_AUTH } from "../../config/firebase";
import { 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendEmailVerification,
    getAuth,
} from "firebase/auth";


export const loginRequest = async (email, password) => {
    const auth = FIREBASE_AUTH;
    const user = getAuth().currentUser;

    try {
        const response = await signInWithEmailAndPassword(auth, email, password);
        console.log(response);

        if (!response.user.emailVerified) {
            throw new Error('Email not verified');
        }else{
            return response.user;
        }
        return response.user;
    } catch (error){
        console.log(error);
        throw error;
    }
};

export const registerRequest = async (email, password) => {
    const auth = FIREBASE_AUTH;
  
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const authForVerification = getAuth();
  
      // Send verification email
      await sendEmailVerification(authForVerification.currentUser);
      console.log("Verification email sent!");
  
      return user; // Return the user object (whether verified or not)
    } catch (error) {
      // Handle specific error cases
      if (error.code === "auth/weak-password") {
        throw new Error("The password is too weak.");
      } else if (error.code === "auth/email-already-in-use") {
        throw new Error("The email address is already in use.");
      } else {
        // Handle other errors or generic error message
        console.log(error);
        throw error;
      }
    }
  };