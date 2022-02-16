<template>
  <form @submit.prevent="handleSubmit">
    <h3>Login</h3>
    <input v-model="email" type="email" placeholder="Email" />
    <input v-model="password" type="password" placeholder="Password" />
    <div v-if="error" class="error">{{ error }}</div>
    <button v-if="!isPending">Log In</button>
    <button v-else disabled>Loading</button>
  </form>
</template>

<script>
import { ref } from "@vue/reactivity";
import useLogin from "@/composables/useLogin";
import { useRouter } from 'vue-router';
export default {
  setup() {
    const { error, login, isPending } = useLogin();
    const router = useRouter()

    const email = ref("");isPending
    const password = ref("");

    const handleSubmit = async () => {
      await login(email.value, password.value);
      if (!error.value) {
        console.log("user logged in");
        router.push({ name: 'Home' })
      }
    };

    return { email, password, error, handleSubmit, isPending };
  },
};
</script>

<style></style>
