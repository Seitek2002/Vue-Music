<template>
    <div class="add-song">
        <button v-if="!showForm" @click="showForm = true">Add Songs</button>
        <form v-if="showForm" @submit.prevent="handleSubmit">
            <h4>Add A New Song</h4>
            <input
                type="text"
                placeholder="Song Title"
                required
                v-model="title"
            />
            <input type="text" placeholder="Artist" required v-model="artist" />
            <input type="file" @change="handleChange" />
            <button v-if="!isPending">Add</button>
            <button v-else disabled>Saving...</button>
        </form>
    </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import useDocument from "../composables/useDocument";
import useStorage from "../composables/useStorage";
export default {
    props: ["playlist"],
    setup(props) {
        const { updateDoc } = useDocument("playlists", props.playlist.id);
        const { filePath, url, uploadSong, error } = useStorage();
        const title = ref("");
        const artist = ref("");
        const showForm = ref(false);
        const song = ref("");
        const songError = ref("");
        const isPending = ref(false);

        const handleSubmit = async () => {
            isPending.value = true;
            await uploadSong(song.value);
            const newSong = {
                title: title.value,
                artist: artist.value,
                id: Math.floor(Math.random() * 1000000000000),
                songUrl: url.value,
                filePath: filePath.value,
            };
            await updateDoc({
                songs: [...props.playlist.songs, newSong],
            });
            isPending.value = false;
            if (!error.value) {
                title.value = "";
                artist.value = "";
                song.value = "";
            }
        };

        const handleChange = (event) => {
            const selectedFile = event.target.files[0];
            if (selectedFile && "MP3") {
                song.value = selectedFile;
                songError.value = null;
            } else {
                songError.value = "Please select an image file (MP3)";
                song.value = null;
            }
        };

        return {
            title,
            artist,
            showForm,
            handleSubmit,
            handleChange,
            isPending,
        };
    },
};
</script>

<style scoped>
.add-song {
    text-align: center;
    margin-top: 40px;
}
form {
    max-width: 100%;
    text-align: left;
}
</style>
