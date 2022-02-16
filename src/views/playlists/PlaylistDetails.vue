<template>
    <div v-if="playlist" class="error">{{ error }}</div>
    <div v-if="playlist" class="playlist-details">
        <div class="playlist-info">
            <div class="cover">
                <img :src="playlist.coverUrl" :alt="playlist.title" />
            </div>
            <h2>{{ playlist.title }}</h2>
            <p class="username">Created by {{ playlist.userName }}</p>
            <div class="description">{{ playlist.description }}</div>
            <button v-if="ownership" @click="handleDelete">
                Delete playlist
            </button>
        </div>
        <div class="song-list">
            <p>Song List Here</p>
            <div v-for="song in playlist.songs" :key="song.id">
                <h2> {{ song.artist }} - {{ song.title }}</h2>
                <audio controls> <source :src="song.songUrl"></audio>
            </div>
            <AddSong key="" v-if="ownership" :playlist="playlist" />
        </div>
    </div>
</template>

<script>
import AddSong from "@/components/AddSong.vue";
import { computed } from "@vue/runtime-core";
import getDocument from "../../composables/getDocument";
import useDocument from "../../composables/useDocument";
import useStorage from "../../composables/useStorage";
import getUser from "../../composables/getUser";
export default {
    props: ["id"],
    components: { AddSong },
    setup(props) {
        const { user } = getUser();
        const { deleteImage } = useStorage();
        const { deleteDoc } = useDocument("playlists", props.id);
        const { document: playlist, error } = getDocument(
            "playlists",
            props.id
        );

        const ownership = computed(() => {
            return (
                playlist.value &&
                user.value &&
                user.value.uid === playlist.value.userId
            );
        });

        const handleDelete = async () => {
            await deleteDoc();
            await deleteImage(playlist.value.filePath);
        };
        return { playlist, error, ownership, handleDelete };
    },
};
</script>

<style>
.playlist-details {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 80px;
}
.cover {
    overflow: hidden;
    border-radius: 20px;
    position: relative;
    padding: 160px;
}
.cover img {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
.playlist-info {
    text-align: center;
}
.playlist-info h2 {
    text-transform: capitalize;
    font-size: 28px;
    margin-top: 20px;
}
.playlist-info p {
    margin-bottom: 20px;
}
.username {
    color: #999;
}
.description {
    text-align: left;
}
.single-song {
    padding: 10px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px dashed var(--secondary);
    margin-bottom: 20px;
}
</style>
