import { ref, listAll, getDownloadURL } from "firebase/storage";
import { FIREBASE_STORAGE } from "../config/firebase";

const getAnnouncement = async () => {
    try {
        const storageRef = ref(FIREBASE_STORAGE);
        const fileList = await listAll(storageRef);

        const downloadURLPromises = fileList.items.map(async (item, index) => {
            const url = await getDownloadURL(item);
            return {
                id: index + 1,
                name: `ImageSlider ${index + 1}`,
                imageId: url,
            };
        });

        return Promise.all(downloadURLPromises);
    } catch (error) {
        console.error("Error listing files:", error);
        return [];
    }
};

export default getAnnouncement;