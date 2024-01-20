import { doc, getDocs, updateDoc } from "firebase/firestore";
import { FIREBASE_FIRESTORE } from "../config/firebase";


const RegisterUser = async (query, auth) => {
    const querySnapshotUser = await getDocs(query);
    querySnapshotUser.forEach((document) => {
        const data = document.data();
        const docId = document.id;
        console.log(docId);
        if (!data.register) {
            const vendorRef = doc(FIREBASE_FIRESTORE, "users", docId);
            updateDoc(vendorRef, {
                id: auth.uid,
                register: true
            });
            console.log("Successfully registered user")
        }
    });

}

export default RegisterUser;