<template>
    <div class="navbar">
        <nav>
            <img src="@/assets/logo.png" alt="logo" />
            <h1><router-link :to="{ name: 'Home' }">Music</router-link></h1>
            <div class="links">
                <router-link v-if="user" :to="{ name: 'CreatePlaylist' }"
                    >Create Playlist</router-link
                >
                <button v-if="user" @click="handleClick">Log Out</button>

                <router-link v-if="!user" class="btn" :to="{ name: 'Signup' }"
                    >Sign Up</router-link
                >

                <router-link v-if="!user" class="btn" :to="{ name: 'Login' }"
                    >Log In</router-link
                >
            </div>
        </nav>
    </div>
</template>

<script>

import useLogout from "../composables/useLogout";
import getUser from "../composables/getUser";
import { useRouter } from "vue-router";

export default {
    setup() {
        const { logout, error } = useLogout();
        const { user } = getUser();

        const router = useRouter();

        const handleClick = async () => {
            await logout();
            if (!error.value) {
                console.log("Пользователь вышел");
            }
            router.push({ name: "Login" });
        };

        return { handleClick, user };
    },
};
</script>

<style scoped>
.navbar {
    padding: 16px 10px;
    margin-bottom: 60px;
    background: white;
}
nav {
    display: flex;
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;
}
nav img {
    max-height: 60px;
    object-fit: contain;
}
nav h1 {
    margin-left: 20px;
}
nav .links {
    margin-left: auto;
}
nav .links a,
button {
    margin-left: 16px;
    font-size: 14px;
}
</style>
