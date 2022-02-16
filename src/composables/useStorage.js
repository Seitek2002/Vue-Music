import { ref } from "vue";
import { storage } from "../firebase/config";
import getUser from "./getUser";

const { user } = getUser();

const useStorage = () => {
    const error = ref(null);
    const url = ref(null);
    const filePath = ref(null);

    const uploadImage = async (file) => {
        filePath.value = `covers/${user.value.uid}/${file.name}`;
        const storageRef = storage.ref(filePath.value);
        try {
            const res = await storageRef.put(file);
            url.value = await res.ref.getDownloadURL();
        } catch (err) {
            console.log(err.message);
            error.value = err.message;
        }
    };

    const deleteImage = async (path) => {
        const storageRef = storage.ref(path);
        try {
            await storageRef.delete();
        } catch (err) {
            console.log(err.message);
        }
    };

    const uploadSong = async (song) => {
        filePath.value = `covers/${user.value.uid}/${song.name}`;
        const storageRef = storage.ref(filePath.value);
        try {
            const res = await storageRef.put(song);
            url.value = await res.ref.getDownloadURL();
        } catch (err) {
            console.log(err.message);
            error.value = err.message;
        }
    };

    return { error, url, filePath, uploadImage, deleteImage, uploadSong };
};

export default useStorage;
